import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { heroesSchema } from './heroesSchema';
import fakeIndexedDB from 'fake-indexeddb';
import fakeIDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
addRxPlugin(RxDBDevModePlugin);
// in the browser, we want to persist data in IndexedDB, so we use the indexeddb adapter.
import LokiIncrementalIndexedDBAdapter from 'lokijs/src/incremental-indexeddb-adapter';
import { getRxStorageLoki } from 'rxdb/plugins/lokijs';
import {
    getRxStorageMemory
} from 'rxdb/plugins/memory';
// export const db = await createRxDatabase({
//     name: 'heroesdb',                   // <- name
//     storage: getRxStorageDexie(
//         {
//             indexedDB: fakeIndexedDB,
//             IDBKeyRange: fakeIDBKeyRange
//         }
//     ),       // <- RxStorage
//     ignoreDuplicate: true,
//     multiInstance: true,  
//     eventReduce: true 

// });


export const db = await createRxDatabase({
    name: 'heroesdb',
    storage: getRxStorageMemory(),
    ignoreDuplicate: true,
    multiInstance: true,  
    eventReduce: true 
});

// export const  db =async () =>{
//     const db = await createRxDatabase({
//         name: 'heroesdb',
//         storage: getRxStorageMemory(),
//         ignoreDuplicate: true,
//         multiInstance: true,  
//         eventReduce: true 
//     });
//     return db;
// } 

