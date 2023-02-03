export const heroesSchema = {
	title: 'heroschema',
	version: 0,
	primaryKey: 'id',
	type: 'object',
	properties: {
		id: {
			type: 'string',
			maxLength: 100 // <- the primary key must have set maxLength
		},
		name: {
			type: 'string'
		},
		color: {
			type: 'string'
		},
		updatedAt: {
			type: 'float'
		}
		// isDeleted: {
		//     type: 'boolean',
		// }
	},
	required: ['color', 'name', 'id'],
	additionalProperties: true
};
