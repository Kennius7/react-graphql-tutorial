import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";



const users = [
    { id: "1", name: "Ken Boggs", age: 32, isMarried: true },
    { id: "2", name: "Kara Tabor", age: 38, isMarried: false },
    { id: "3", name: "Shinju Briggs", age: 27, isMarried: true },
    { id: "4", name: "Joy Amareni", age: 23, isMarried: false },
]


const typeDefs = `
    type Query {
        getUsers: [User]
        getUserById(id: ID!): User 
    }

    type Mutation {
        createUser(name: String!, age: Int!, isMarried: Boolean!): User
        updateUser(id: ID!, name: String!, age: Int!, isMarried: Boolean!): User
    }

    type User {
        id: ID
        name: String
        age: Int
        isMarried: Boolean
    }
`

const resolvers = {
    Query: {
        getUsers: () => { 
            return users 
        },
        getUserById: (parent, args) => {
            const id = args.id
            return users.find(user => user.id === id) 
        },
    },
    Mutation: {
        createUser: (parent, args) => {
            const { name, age, isMarried } = args;
            const newUsers = {
                id: (users.length + 1).toString(),
                name,
                age,
                isMarried,
            }
            users.push(newUsers);
            return newUsers;
        },
        updateUser: (parent, args) => {
            const { id, name, age, isMarried } = args;
            const user = users.find(user => user.id === id);

            if (!user) return null;

            if (name !== undefined) user.name = name;
            if (age !== undefined) user.age = age;
            if (isMarried !== undefined) user.isMarried = isMarried;

            return user;
        }
    }
}

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    formatError: (error) => {
        console.error("GraphQL Error:", error);
        return error;
    }, }); 

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log("Server running at:", url);
