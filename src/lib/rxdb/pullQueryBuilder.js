export const pullQueryBuilder = (
	/** @type {{ id: string; updatedAt: number; }} */ checkpoint,
	/** @type {any} */ limit
) => {
	/**
	 * The first pull does not have a checkpoint
	 * so we fill it up with defaults
	 */
	if (!checkpoint) {
		checkpoint = {
			id: '',
			updatedAt: 0
		};
	}

	const query = `query PullHero($limit: Int!, $checkpoint: checkpointInput) {
        pullHero(limit: $limit, checkpoint: $checkpoint) {
          checkpoint {
            id
            updatedAt
          }
          documents {
            color
            deleted
            id
            name
            updatedAt
          }
        }
      }`;
	return {
		query,
		variables: {
			checkpoint: checkpoint,
			limit: limit
		}
	};
};
