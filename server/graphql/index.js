import { makeExecutableSchema } from 'graphql-tools'

// app modules
import typeDefs from './type_def'
import resolvers from './resolver'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})