
// import { createRxDatabase } from 'rxdb';
// import { getRxStorageDexie } from 'rxdb/plugins/dexie';
// import {heroesSchema} from './heroesSchema';
// import { getRxStorageLoki } from 'rxdb/plugins/lokijs';
// import LokiIncrementalIndexedDBAdapter from 'lokijs/src/incremental-indexeddb-adapter';
// import fakeIndexedDB  from 'fake-indexeddb';
// import fakeIDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';


// const myDatabase = await createRxDatabase({
//   name: 'heroesdb',
//   storage: getRxStorageDexie({
//     indexedDB: fakeIndexedDB,
//     IDBKeyRange: fakeIDBKeyRange
// })
// });

// export const myCollections = await myDatabase.addCollections({
//   heroes: {
//     schema: heroesSchema
//   },
// });


// ----------DBLOKI -----------------------
// const dbLoki = await createRxDatabase({
//   name: 'heroesdb',
//   storage: getRxStorageLoki({
//     adapter: new LokiIncrementalIndexedDBAdapter()
//   })
// });

// export const myCollections = await dbLoki.addCollections({
//   heroes: {
//     schema: heroesSchema
//   },
// });
