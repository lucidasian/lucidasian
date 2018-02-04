import gql from 'graphql-tag'

export const currentLoggedInUser = (variables) => {
    return {
        query: gql`{
                loginUser{
                    socialID,
                    socialType,
                    displayName,
                    roles {
                    admin,
                    staff,
                    member
                    }
                }
            }`,
        variables,
        forceFetch: true
    }
}