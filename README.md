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
| | 101 | Staff role is required |
| | 102 | Member role is required |
| Content | 200 | There is not content on the database |
| Client Error | 300 | Input parameter is incorrect or missing |

## Authenticate
Authenticate is need to access via RESTful API GET method, there are three choice of authenticate options.

1. Facebook (endpoint: /auth/facebook, port: 10101)
2. Google (endpoint: /auth/google, port: 10101)
3. Twitter (endpoint: /auth/twitter, port: 10101)
4. Sign Out (endpoint: /auth/signout, port: 10101)

If the authenticate is successful user information will automatically store in our database.

## User

### Get all user
    endpoint: /api/user/all
    port: 10101
    caller role: Admin
    possible errCode: 100, 200
| Field | Type | Description |
|-------|------|-------------|
| token | String | Current access token provides by authenticator |
| socialType | String | Social media type |
| socialID | String | ID provides by authenticator |
| displayName | String | Name provides by authenticator |
| roles | Object | Object structure same as 'Get current user's roles' |
| loginLogs | Objects | Object structure same as 'Get current user's login logs' |
| createdAt | Datetime | signup date |

Array of Object structure on data field

### Get all user by role
    method: GET
    endpoint: /api/user/all/:role
    posible role: 'admin', 'staff', 'member'
    port: 10101
    caller role: Admin
    possible errCode: 100, 200
| Field | Type | Description |
|-------|------|-------------|
| token | String | Current access token provides by authenticator |
| socialType | String | Social media type |
| socialID | String | ID provides by authenticator |
| displayName | String | Name provides by authenticator |
| roles | Object | Object structure same as 'Get current user's roles' |
| loginLogs | Objects | Object structure same as 'Get current user's login logs' |
| createdAt | Datetime | signup date |

Array of Object structure on data field


### Get current user basic info
    method: GET
    endpoint: /api/user/basic/me
    port: 10101
    caller role: Member
    possible errCode: 102, 200
| Field | Type | Description |
|-------|------|-------------|
| socialType | String | Social media type |
| socialID | String | ID provides by authenticator |
| roles | Object | Object structure same as 'Get current user's roles' |
| displayName | String | Name provides by authenticator |

Object structure on data field


### Get a user basic info
    method: GET
    endpoint: /api/user/basic/:socialType/:socialID
    posible socialType: 'facebook', 'twitter', 'google'
    port: 10101
    caller role: Member
    possible errCode: 101, 200
| Field | Type | Description |
|-------|------|-------------|
| socialType | String | Social media type |
| socialID | String | ID provides by authenticator |
| roles | Object | Object structure same as 'Get current user's roles' |
| displayName | String | Name provides by authenticator |

Object structure on data field

### Get all user basic info
    method: GET
    endpoint: /api/user/basic/all
    port: 10101
    caller role: Member
    possible errCode: 101, 200
| Field | Type | Description |
|-------|------|-------------|
| socialType | String | Social media type |
| socialID | String | ID provides by authenticator |
| roles | Object | Object structure same as 'Get current user's roles' |
| displayName | String | Name provides by authenticator |

Array of Object structure on data field

### Get current user's login logs
    method: GET
    endpoint: /api/user/login/log
    port: 10101
    caller role: Member
    possible errCode: 102, 200
| Field | Type | Description |
|-------|------|-------------|
| uuid | String | Unique Identify which embeded on client browser |
| token | String | Access token provides by authenticator |
| ipAddress | String | |
| loginAt | Datetime | |

Array of object structure on data field

### Get a user's login logs
    method: GET
    endpoint: /api/user/login/log/:socialType/:socialID
    posible socialType: 'facebook', 'twitter', 'google'
    port: 10101
    caller role: Admin
    possible errCode: 100, 200
| Field | Type | Description |
|-------|------|-------------|
| uuid | String | Unique Identify which embeded on client browser |
| token | String | Access token provides by authenticator |
| ipAddress | String | |
| loginAt | Datetime | |

Array of object structure on data field

### Get current user's roles
    method: GET
    endpoint: /api/user/roles
    port: 10101
    caller role: Member
    possible errCode: 102, 200
| Field | Type | Description |
|-------|------|-------------|
| admin | Bool | true if user is an admin, false if not |
| member | Bool | true if user is an member, false if not |
| staff | Bool | true if user is an staff, false if not |

Object structure on data field
** User can be more than one role

### Get current user's roles
    method: GET
    endpoint: /api/user/roles/:socialType/:socialID
    posible socialType: 'facebook', 'twitter', 'google'
    port: 10101
    caller role: Admin
    possible errCode: 100, 200
| Field | Type | Description |
|-------|------|-------------|
| admin | Bool | true if user is an admin, false if not |
| member | Bool | true if user is an member, false if not |
| staff | Bool | true if user is an staff, false if not |

Object structure on data field
** User can be more than one role

### Promote an user to staff role
    method: PUT
    endpoint: /api/user/role/promote/staff
    port: 10101
    caller role: Member
    possible errCode: 100, 300
| Field | Type | Required? |
|-------|------|-------------|
| socialType | String | Yes |
| socialID | String | Yes |

Input Parameters structure

### Demote an staff to member role
    method: PUT
    endpoint: /api/user/role/demote/staff
    port: 10101
    caller role: Admin
    possible errCode: 100, 300
| Field | Type | Required? |
|-------|------|-------------|
| socialType | String | Yes |
| socialID | String | Yes |

Input Parameters structure
