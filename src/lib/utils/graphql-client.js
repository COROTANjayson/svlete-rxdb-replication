import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:4000/graphql';

export const useClient = () => {
	return new GraphQLClient(endpoint, { headers: {} });
};
