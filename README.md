# lucidasian
lucidasian web app project

# API Reference

## Authenticate
Authenticate is need to access via RESTful API GET method, there are three choice of authenticate options.

1. Facebook (endpoint: /auth/facebook, port 10101)
2. Google (endpoint: /auth/google, port 10101)
3. Twitter (endpoint: /auth/twitter, port 10101)

If the authenticate is successful user information will automatically store in our database.

## GraphQL Schema
```
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
    signUp(socialID: String!, socialType: String!): User!
    addStaff(socialID: String!, socialType: String!): User
  }
```
Exclamation mark(!) represents the require field.

### GET LOGIN USER
```
  loginUser {
    socialID
    socialType
  }
```
### GET LOGIN USER WITH ROLES
```
  loginUser {
    socialID // required
    socialType // required
    roles {
      admin
      member
      staff
    }
  }
```
### LOGIN USER WITH LOGIN LOGS (admin role is required) 
```
  loginUser {
    socialID // required
    socialType // required
    loginLogs {
      uuid: String
      token: String
      ipAddress: String
      loginAt: String  
    }
  }
```
### LOGIN USER WITH ROLES AND LOGIN LOGS (admin role is required)
```
  loginUser {
    socialID // required
    socialType // required
    roles {
      admin
      member
      staff
    }
    loginLogs {
      uuid: String
      token: String
      ipAddress: String
      loginAt: String  
    }
  }
```
### ADD STAFF (admin role is required)
```
  mutation {
    addStaff(socialID: String!, socialType: String!) {
      socialID // required
      socialType // required
      roles {
        admin
        member
        staff
      }
      loginLogs {
        uuid: String
        token: String
        ipAddress: String
        loginAt: String  
      }
    }
  }
