export default `
  type LoginLog {
    uuid: String
    token: String
    ipAddress: String
    loginAt: String
  }
  type UserRole {
    name: String!
  }
  type User {
    socialID: String!
    socialType: String!
    token: String
    roles: [UserRole]
    loginLogs: [LoginLog]
  }
  type Query {
    User(socialID: String!, socialType: String!): User!
  }
  type Mutation {
    signUp(socialID: String!, socialType: String!): User!
  }
`