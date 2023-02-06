import { useClient } from '$lib/utils/graphql-client';
import { gql } from 'graphql-request';

export const heroesQuery = async () => {
	// try {
	const client = useClient();
	const GET_MY_TODOS = gql`
		query GetHeroes($amount: Int) {
			getHeroes(amount: $amount) {
				color
				id
				name
				updatedAt
				deleted
			}
		}
	`;
	const variables = { amount: 10 };
	const heroes = await client.request(GET_MY_TODOS, variables);
	return {
		error: false,
		query: [...heroes.getHeroes]
	};
	// } catch (error) {
	// 	// console.log('page errorr', error)
	// 	return {
	// 		error: true,
	// 		query: []
	// 	};
	// }
};

// @ts-ignore
export const createHeroes = async (payload) => {
	const { id, name, color, updatedAt, deleted } = payload;
	try {
		const client = useClient();
		const CREATE_HERO = gql`
			mutation CreateHero(
				$id: String!
				$name: String!
				$color: String!
				$updatedAt: Int!
				$deleted: Int
			) {
				createHero(id: $id, name: $name, color: $color, updatedAt: $updatedAt, deleted: $deleted) {
					name
					color
				}
			}
		`;
		const variables = {
			id,
			color,
			name,
			updatedAt,
			deleted
		};
		await client.request(CREATE_HERO, variables);
		return {
			error: false
		};
	} catch (error) {
		console.log('action errorr', error);
		return {
			error: true
		};
	}
};

export const updateHeroes = async (
	/** @type {{ color: any; name: any; }} */ data,
	/** @type {any} */ id
) => {
	try {
		const client = useClient();
		const UPDATE_HERO = gql`
			mutation Mutation($id: String!, $heroInput: HeroInput) {
				updateHero(id: $id, heroInput: $heroInput) {
					name
					color
				}
			}
		`;
		const variables = {
			id: id,
			heroInput: {
				color: data.color,
				name: data.name,
				updatedAt: Math.floor(Date.now() / 1000),
				deleted: 0
			}
		};
		await client.request(UPDATE_HERO, variables);
		return {
			error: false
		};
	} catch (error) {
		console.log('action errorr', error);
		return {
			error: true
		};
	}
};
