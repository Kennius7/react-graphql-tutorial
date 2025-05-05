import { gql } from '@apollo/client';



export const flexCenter = {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center"
}
export const flexColCenter = {
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center"
}
export const flexColStart = {
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "flex-start"
}
export const flexAround = {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-around", 
    alignItems: "center"
}
export const flexAroundStart = {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-around", 
    alignItems: "flex-start",
}



export const GET_USERS = gql`
    query GetUsers {
        getUsers {
            id
            name 
            age
            isMarried
        }
    }
`

export const GET_USER_BY_ID = gql`
    query GetUserById($id: ID!) {
        getUserById(id: $id) {
            id
            name 
            age
            isMarried
        }
    }
`

export const CREATE_USERS = gql`
    mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
        createUser(name: $name, age: $age, isMarried: $isMarried) {
            id
            name 
            age
            isMarried
        }
    }
`




