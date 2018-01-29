export default `
  type LoginLog {
    uuid: String
    token: String
    ipAddress: String
    loginAt: String
  }
  type UserRole {
    admin: Boolean!
    member: Boolean!
    staff: Boolean!
  }
  type User {
    socialID: String!
    socialType: String!
    roles: UserRole
    loginLogs: [LoginLog]
  }
  type Query {
    User(socialID: String!, socialType: String!): User!
    loginUser: User!
  }
  type Mutation {
    addStaffRole(socialID: String!, socialType: String!): User
    removeStaffRole(socialID: String!, socialType: String!): User
  }
`