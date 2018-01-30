# lucidasian
lucidasian web app project

# API Reference

## Authenticate
Authenticate is need to access via RESTful API GET method, there are three choice of authenticate options.

1. Facebook (endpoint: /auth/facebook, port: 10101)
2. Google (endpoint: /auth/google, port: 10101)
3. Twitter (endpoint: /auth/twitter, port: 10101)
4. Sign Out (endpoint: /auth/signout, port: 10101)

If the authenticate is successful user information will automatically store in our database.

## GraphQL Schema
```
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
```
Exclamation mark(!) represents the require field.

### Admin role is required for these field
Query > Users
Mutation > addStaffRole
Mutation > removeStaffRole
User > loginLogs

### Staff role is required for these field
Mutation > createArticle
Mutation > modifyArticle
