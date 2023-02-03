export const pullStreamQueryBuilder = (/** @type {any} */ headers) => {
    const query = `subscription StreamHero($headers: HeroInputHeaders) {
        streamHero(headers: $headers) {
          checkpoint {
            updatedAt
            id
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
            headers
        }
    };
};