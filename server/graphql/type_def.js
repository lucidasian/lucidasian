export default `
  type Article {
    id: ID
    title: String!
    content: String
    publish: Boolean
    positions: ArticlePosition
    tags: [String]
    createdBy: String
    updatedBy: String
    createdAt: String
    updatedAt: String 
  }
  type Articles {
    cover: [Article]
    highlights: [Article]
    trips: [Article]
  }
  type ArticlePosition {
    cover: Boolean!
    highlights: Boolean!
    trips: Boolean!
  }
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
    displayName: String
    loginLogs: [LoginLog]
  }
  type Users {
    admin: [User]
    member: [User]
    staff: [User]
  }
  type Query {
    articles: Articles
    loginUser: User!
    user(socialID: String!, socialType: String!): User!
    users: Users
  }
  type Mutation {
    addStaffRole(socialID: String!, socialType: String!): User
    removeStaffRole(socialID: String!, socialType: String!): User
    createArticle(title: String!, content: String!, publish: Boolean = false, positions: [String], tags: [String]): Article
    modifyArticle(articleID: ID!, title: String!, content: String!, publish: Boolean = false, positions: [String], tags: [String]): Article
  }
`