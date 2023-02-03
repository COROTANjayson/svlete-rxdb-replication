import { createRxDatabase, addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
addRxPlugin(RxDBDevModePlugin);
import { getRxStorageMemory } from 'rxdb/plugins/memory';

export const db = await createRxDatabase({
	name: 'heroesdb',
	storage: getRxStorageMemory(),
	ignoreDuplicate: true,
	multiInstance: true,
	eventReduce: true
});
