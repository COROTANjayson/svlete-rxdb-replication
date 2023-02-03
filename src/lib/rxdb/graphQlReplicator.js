// @ts-nocheck
import { addRxPlugin } from 'rxdb';
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql';
addRxPlugin(RxDBReplicationGraphQLPlugin);
export class GraphQLReplicator {
	constructor(collection, pullQueryBuilder, pushQueryBuilder, pullStreamQueryBuilder) {
		this.collection = collection;
		this._replicationStates = null;
		this.subscriptionClient = null;
		this.pullQueryBuilder = pullQueryBuilder;
		this.pushQueryBuilder = pushQueryBuilder;
		this.pullStreamQueryBuilder = pullStreamQueryBuilder;
	}
	async restart(auth) {
		if (this.replicationState) {
			this.replicationState.cancel();
		}

		// if (this.subscriptionClient) {
		//     this.subscriptionClient.close()
		// }

		this.replicationState = await this.setupGraphQLReplication();
		// this.subscriptionClient = this.setupGraphQLSubscription(auth, this.replicationState)
	}

	async setupGraphQLReplication() {
		//
		// console.log(this.collection)
		try {
			const replicationState = this.collection.syncGraphQL({
				url: {
					http: 'http://localhost:4000/graphql'
				},
				push: {
					queryBuilder: this.pushQueryBuilder,
					batchSize: 1,
					modifier: (doc) => doc
				},
				pull: {
					queryBuilder: this.pullQueryBuilder,
					modifier: (doc) => {
						Object.entries(doc).forEach(([k, v]) => {
							if (v === null) {
								delete doc[k];
							}
						});
						return doc;
					},
					dataPath: undefined,

					batchSize: 50,
					streamQueryBuilder: this.pullStreamQueryBuilder
				},
				// headers: {
				//     Authorization: 'Bearer abcde...'
				// },
				live: true,
				deletedField: 'deleted',
				// autoStart: false,
				retryTime: 1000 * 5
				// waitForLeadership = true,
				// autoStart = true,
			});

			return replicationState;
		} catch (error) {
			console.log(error);
		}
	}
}
