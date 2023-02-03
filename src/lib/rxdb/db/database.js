// @ts-nocheck
import { db } from './createDB';

export class Database {
    constructor(collectionOBJ) {
        this.collectionOBJ = collectionOBJ;
    }
    async createCollection() {
        /* 
        ----collectionOBJ example----
                heroes: {
                    schema: heroesSchema
                } */
        // console.log('collection',this.collectionOBJ)
        await db.addCollections({
            ...this.collectionOBJ
        });
    }
}