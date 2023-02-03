import { addRxPlugin } from 'rxdb';
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql';

import { db } from './db/createDB';
import { heroesSchema } from './db/heroesSchema';
import { pullQueryBuilder } from './pullQueryBuilder';
import { pushQueryBuilder } from './pushQueryBuilder';
import { pullStreamQueryBuilder } from './pullStreamQueryBuilder';


addRxPlugin(RxDBReplicationGraphQLPlugin);
// await db.addCollections({
//     heroes: {
//         schema: heroesSchema
//     },
// });
export const replicationState = db.heroes.syncGraphQL({
    // urls to the GraphQL endpoints
    url: {
        http: 'http://localhost:5000/'
    },
    push: {
        queryBuilder: pushQueryBuilder, // the queryBuilder from above
        /**
         * batchSize (optional)
         * Amount of document that will be pushed to the server in a single request.
         */
        batchSize: 5,
        /**
         * modifier (optional)
         * Modifies all pushed documents before they are send to the GraphQL endpoint.
         * Returning null will skip the document.
         */
        modifier: doc => doc
        
    },
    pull: {
        // @ts-ignore
        
        queryBuilder: pullQueryBuilder, // the queryBuilder from above
        modifier: doc => {
            //Wwe have to remove optional non-existend field values
            // they are set as null by GraphQL but should be undefined
            Object.entries(doc).forEach(([k, v]) => {
                if (v === null) {
                    delete doc[k];
                }
            });
            return doc;
        }, // (optional) modifies all pulled documents before they are handled by RxDB
        dataPath: undefined, // (optional) specifies the object path to access the document(s). Otherwise, the first result of the response data is used.
        /**
         * Amount of documents that the remote will send in one request.
         * If the response contains less then [batchSize] documents,
         * RxDB will assume there are no more changes on the backend
         * that are not replicated.
         * This value is the same as the limit in the pullHuman() schema.
         * [default=100]
         */
        
        batchSize: 50,
        streamQueryBuilder: pullStreamQueryBuilder
    },
    // headers which will be used in http requests against the server.
    // headers: {
    //     Authorization: 'Bearer abcde...'
    // },

    /**
     * Options that have been inherited from the RxReplication
     */
    deletedField: 'deleted',
    live: true,
    // retryTime = 1000 * 5,
    // waitForLeadership = true,
    // autoStart = true,
});
