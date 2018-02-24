# lucidasian
lucidasian web app project

# API Reference

## Return Format
Each request will return the result upon the case
### Successful Case
| Field | Type | value | 
|-------|------|-------------|
| success | Bool | true |
### Successful with return content
| Field | Type | value | 
|-------|------|-------------|
| success | Bool | true |
| data | Object/Array | #upon the request# |
### Failure Case
| Field | Type | value | 
|-------|------|-------------|
| success | Bool | false |
| errCode | Integer | #3 digits integer# |

## Error Code Description
| Group | errCode | Description |
|------------|-----|-----------------------|
| Permission | 100 | Admin role is required |
| Content | 200 | There is not content on the database |

## Authenticate
Authenticate is need to access via RESTful API GET method, there are three choice of authenticate options.

1. Facebook (endpoint: /auth/facebook, port: 10101)
2. Google (endpoint: /auth/google, port: 10101)
3. Twitter (endpoint: /auth/twitter, port: 10101)
4. Sign Out (endpoint: /auth/signout, port: 10101)

If the authenticate is successful user information will automatically store in our database.

## User

### Get a user login logs
    endpoint: /api/user/login/log/:socialType/:socialID
    port: 10101
    possible errCode: 100, 200
| Field | Type | Description |
|-------|------|-------------|
| uuid | String | Unique Identify which embeded on client browser |
| token | String | Access token provides by authenticator |
| ipAddress | String | |
| loginAt | Datetime | |

Object structure on data field
