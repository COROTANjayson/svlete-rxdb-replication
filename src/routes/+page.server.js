import { addRxPlugin } from 'rxdb';
import { ObjectID } from 'bson';
import { db } from '$lib/rxdb/db/createDB';
import { heroesSchema } from '$lib/rxdb/db/heroesSchema';
import { Database } from '$lib/rxdb/db/database';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';
import { GraphQLReplicator } from '$lib/rxdb/graphQlReplicator';
import { pullQueryBuilder } from '$lib/rxdb/pullQueryBuilder';
import { pushQueryBuilder } from '$lib/rxdb/pushQueryBuilder';
import { pullStreamQueryBuilder } from '$lib/rxdb/pullStreamQueryBuilder';
import { createHeroes, heroesQuery } from '$lib/graphQl';

// add plugins
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBJsonDumpPlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

// create collection before replication start
if (!db.heroes) {
	const newCollection = new Database({
		heroes: {
			schema: heroesSchema
		}
	});
	await newCollection.createCollection();
	console.log('create collection');
}

// start replication after collection is created
const createReplication = new GraphQLReplicator(
	db.heroes,
	pullQueryBuilder,
	pushQueryBuilder,
	pullStreamQueryBuilder
);
const replicationState = await createReplication.setupGraphQLReplication();

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	/**
	 * @type {any[]}
	 */
	let graphQuery = [];
	let offline = false;

	// ---GRAPHQL SERVER QUERY---
	const heroes = await heroesQuery();
	console.log('heroes', heroes);
	graphQuery = [...heroes.query];
	if (heroes.error) {
		offline = true;
	}

	const query = db.heroes.find();
	/**
	 * @type {any[]}
	 */
	let rxQuery = [];

	// ---RxDB query---
	query.$.subscribe((results) => {
		results.map((r) => (rxQuery = [...rxQuery, r.toJSON()]));
	});

	let error = false;
	// check for replication errors/server is down
	replicationState.error$.subscribe((/** @type {any} */ err) => {
		// console.error('replication error:');
		error = true;
	});

	return {
		offline: offline,
		heroes: graphQuery,
		rxHeroes: rxQuery
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	createHero: async ({ request }) => {
		const data = await request.formData();
		const formProps = Object.fromEntries(data);

		const { name, color } = formProps;

		// Create hero through graphql server
		const heroes = await createHeroes(name, color);

		// Create hero through rxdb if server is down
		if (heroes.error) {
			console.log('error, rxdbsave');
			const id = new ObjectID();
			await db.heroes.insert({
				id: id.toString(),
				name: name,
				color: color,
				updatedAt: Date.now()
			});
		}
	},
	updateHero: async ({ request, url }) => {
		const data = await request.formData();
		const formProps = Object.fromEntries(data);
		const id = url.searchParams.get('id');
		const { name, color } = formProps;
		console.log(name, color, typeof id);

		const error = false;
		const hero = {
			name: name,
			color: color
		};

		// Update hero through graphql server
		// const updateHero = await updateHeroes(hero, id)

		// replicationState.reSync();

		// Update hero through rxdb if server is down
		// if (heroes.error) {
		await db.heroes.upsert({
			id: id,
			name: name,
			color: color,
			updatedAt: Date.now()
		});
		// }
	}
};
