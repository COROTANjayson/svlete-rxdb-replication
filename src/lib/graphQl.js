import { useClient } from '$lib/utils/graphql-client'
import { gql, GraphQLClient } from 'graphql-request';

export const heroesQuery = async () => {
    try {
        const client = useClient()
        const GET_MY_TODOS = gql`
    query GetHeroes($amount: Int) {
        getHeroes(amount: $amount) {
            color
            id
            name
            updatedAt
            deleted
        }
    }
`;
        const variables = { amount: 10 }
        const heroes = await client.request(GET_MY_TODOS, variables)
        return {
            error: false,
            query: [...heroes.getHeroes]
        }

    } catch (error) {
        // console.log('page errorr', error)
        return {
            error: true,
            query: []
        }
    }
}

export const createHeroes = async (/** @type {FormDataEntryValue} */ name, /** @type {FormDataEntryValue} */ color) => {
    try {
        const client = useClient()
        const CREATE_HERO = gql`
                    mutation CreateHero($heroInput: HeroInput) {
                            createHero(heroInput: $heroInput) {
                                name
                                color
                        }
                    }`;
        const variables = {
            heroInput: {
                color: color,
                name: name
            }
        }
        await client.request(CREATE_HERO, variables)
        return {
            error: false
        }
    } catch (error) {
        console.log('action errorr')
        return {
            error: true
        }
    }
}

export const updateHeroes = async (/** @type {{ color: any; name: any; }} */ data, /** @type {any} */ id) => {
    try {
        const client = useClient()
        const UPDATE_HERO = gql`
            mutation Mutation($id: ID!, $heroInput: HeroInput) {
                editHero(ID: $id, heroInput: $heroInput)
            }`;
        const variables = {
            id: id,
            heroInput: {
                color: data.color,
                name: data.name,
                updatedAt: Date.now(),
                deleted: false
            }
        }
        await client.request(UPDATE_HERO, variables)
        return {
            error: false
        }
    } catch (error) {
        console.log('action errorr')
        return {
            error: true
        }
    }
}