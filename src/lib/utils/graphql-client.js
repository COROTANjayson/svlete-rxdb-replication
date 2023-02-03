import { request, gql, GraphQLClient } from 'graphql-request';


const endpoint = 'http://localhost:5000/'
	
export const useClient = ()  =>{
    // const token = localStorage.getItem('token')
    // const headers = {
    //     authorization: token ? `Bearer ${token}` : ''

        return new GraphQLClient(endpoint, { headers: {} })

}

