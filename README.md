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
| Client Error | 300 | Some required input parameter is incorrect or missing |
| | 301 | Some required input parameter is missing |
| | 302 | File extension need to be image (jpg, jpeg, png, gif) |
| Server Error | 400 | Server can't process or something went wrong please try again |

## Authenticate
Authenticate is need to access via RESTful API GET method, there are three choice of authenticate options.

1. Facebook (endpoint: /auth/facebook, port: 10101)
2. Google (endpoint: /auth/google, port: 10101)
3. Twitter (endpoint: /auth/twitter, port: 10101)
4. Sign Out (endpoint: /auth/signout, port: 10101)

If the authenticate is successful user information will automatically store in our database.

## Ariticle

### Create an article
    method: POST
    endpoint: /api/article/create
    port: 10101
    caller role: staff
    posible errCode: 101, 301, 400
#### Input structure
| Field | Type | Sample | Description | Required? |
|-------|------|--------|-------------|-------------|
| title | String | | | Yes |
| content | String | | | Yes |
| publish | Bool | | | Yes |
| positions | Array | ['cover', 'highlight', 'trip'] | Value must only be the string in sameple list | Yes |
| tags | Array | ['Adventure', 'Night'] | Value can be any string | Yes |

#### Return structure (Object)
| Field | Type | Description |
|-------|------|-------------|
| id | String | Article ID |

### Get an article
    method: GET
    endpoint: /api/article/:id
    port: 10101
    caller role: Anyone
    possible errCode: 200
#### Return structure for Staff role (Object)
| Field | Type | Description |
|-------|------|-------------|
| title | String | |
| content | String | |
| tags | Array | |
| createdBy | String | |
| createdAt | Datetime | |
| updatedBy | String | The last person who edit content, return null if there is no any update |
| updatedAt | Datetime | The last time when the content was modify, return null if there is no any update |
| publish | Boolean | Return true if the content is ready to publish, return false if not |
| positions | Object | position on the webpage for this content(can be more than one position). The obejct structure is { cover: Bool, highlight: Bool, trip: Bool } show at position which the position value is true |

#### Return structure for other roles (Object)
| Field | Type | Description |
|-------|------|-------------|
| title | String | |
| content | String | |
| tags | Array | |
| createdBy | String | |
| createdAt | Datetime | |
| updatedBy | String | The last person who edit content, return null if there is no any update |
| updatedAt | Datetime | The last time when the content was modify, return null if there is no any update |

### Get all article
    method: GET
    endpoint: /api/articles
    port: 10101
    caller role: Anyone
    possible errCode: -
#### Return structure (Object)
| Field | Type | Description |
|-------|------|-------------|
| covers | Array of Object | All article which position cover is true |
| highlights | Array of Object | All article which position highlight is true |
| trips | Array of Object | All article which position trip is true |

#### Article's Array of Object structure
| Field | Type | Description |
|-------|------|-------------|
| id | String | |
| title | String | |

### Modify an Article
    method: PUT
    endpoint: /api/article/modify
    port: 10101
    caller role: staff
    posible errCode: 101, 301, 400
#### Input structure
| Field | Type | Sample | Description | Required? |
|-------|------|--------|-------------|-------------|
| id | String | '5a92b7b612b59d123af112fb' | Article ID | Yes |
| title | String | | | Yes |
| content | String | | | Yes |
| publish | Bool | | | Yes |
| positions | Array | ['cover', 'highlight', 'trip'] | Value must only be the string in sameple list | Yes |
| tags | Array | ['Adventure', 'Night'] | Value can be any string | Yes |

#### Return structure (Object)
| Field | Type | Description |
|-------|------|-------------|
| id | String | Article ID |

## Upload

### Get Image
    method: GET
    endpoint: /api/image/:filename
    port: 10101
    caller role: anyone
    posible errCode: None
#### Return the image if any 

### Upload image
    method: POST
    endpoint: /api/image/upload
    port: 10101
    caller role: staff
    posible errCode: 101, 302
#### Input structure
| Field | Type | Sample | Description | Required? |
|-------|------|--------|-------------|-------------|
| image | File | | Image file to upload | Yes |

#### Return structure (Object)
| Field | Type | Description |
|-------|------|-------------|
| filename | String | filename use to get image in the future |

## User

### Get all user
    method: GET
    endpoint: /api/users
    port: 10101
    caller role: Admin
    possible errCode: 100, 200
#### Return structure (Array of Objects)
| Field | Type | Description |
|-------|------|-------------|
| token | String | Current access token provides by authenticator |
| socialType | String | Social media type |
| socialID | String | ID provides by authenticator |
| displayName | String | Name provides by authenticator |
| roles | Object | Object structure same as 'Get current user's roles' |
| loginLogs | Objects | Object structure same as 'Get current user's login logs' |
| createdAt | Datetime | signup date |

### Get all user by role
    method: GET
    endpoint: /api/users/:role
    posible role: 'admin', 'staff', 'member'
    port: 10101
    caller role: Admin
    possible errCode: 100, 200
#### Return structure (Array of Objects)
| Field | Type | Description |
|-------|------|-------------|
| token | String | Current access token provides by authenticator |
| socialType | String | Social media type |
| socialID | String | ID provides by authenticator |
| displayName | String | Name provides by authenticator |
| roles | Object | Object structure same as 'Get current user's roles' |
| loginLogs | Objects | Object structure same as 'Get current user's login logs' |
| createdAt | Datetime | signup date |

### Get current user basic info
    method: GET
    endpoint: /api/user/me/basic
    port: 10101
    caller role: Member
    possible errCode: 102, 200
#### Return structure (Object)
| Field | Type | Description |
|-------|------|-------------|
| socialType | String | Social media type |
| socialID | String | ID provides by authenticator |
| roles | Object | Object structure same as 'Get current user's roles' |
| displayName | String | Name provides by authenticator |

### Get a user basic info
    method: GET
    endpoint: /api/user/basic/:socialType/:socialID
    posible socialType: 'facebook', 'twitter', 'google'
    port: 10101
    caller role: Member
    possible errCode: 101, 200
#### Return structure (Object)
| Field | Type | Description |
|-------|------|-------------|
| socialType | String | Social media type |
| socialID | String | ID provides by authenticator |
| roles | Object | Object structure same as 'Get current user's roles' |
| displayName | String | Name provides by authenticator |

### Get all user basic info
    method: GET
    endpoint: /api/users/basic
    port: 10101
    caller role: Member
    possible errCode: 101, 200
#### Return structure (Array of Objects)
| Field | Type | Description |
|-------|------|-------------|
| socialType | String | Social media type |
| socialID | String | ID provides by authenticator |
| roles | Object | Object structure same as 'Get current user's roles' |
| displayName | String | Name provides by authenticator |

### Get current user's login logs
    method: GET
    endpoint: /api/user/me/loginlog
    port: 10101
    caller role: Member
    possible errCode: 102, 200
#### Return structure (Array of Objects)
| Field | Type | Description |
|-------|------|-------------|
| uuid | String | Unique Identify which embeded on client browser |
| token | String | Access token provides by authenticator |
| ipAddress | String | |
| loginAt | Datetime | |

### Get a user's login logs
    method: GET
    endpoint: /api/user/loginlog/:socialType/:socialID
    posible socialType: 'facebook', 'twitter', 'google'
    port: 10101
    caller role: Admin
    possible errCode: 100, 200
#### Return structure (Array of Objects)
| Field | Type | Description |
|-------|------|-------------|
| uuid | String | Unique Identify which embeded on client browser |
| token | String | Access token provides by authenticator |
| ipAddress | String | |
| loginAt | Datetime | |

Array of object structure on data field

### Get current user's roles
    method: GET
    endpoint: /api/user/me/roles
    port: 10101
    caller role: Member
    possible errCode: 102, 200
#### Return structure (Object)
| Field | Type | Description |
|-------|------|-------------|
| admin | Bool | true if user is an admin, false if not |
| member | Bool | true if user is an member, false if not |
| staff | Bool | true if user is an staff, false if not |

** An user can be more than one role

### Get current user's roles
    method: GET
    endpoint: /api/user/roles/:socialType/:socialID
    posible socialType: 'facebook', 'twitter', 'google'
    port: 10101
    caller role: Admin
    possible errCode: 100, 200
#### Return structure (Object)
| Field | Type | Description |
|-------|------|-------------|
| admin | Bool | true if user is an admin, false if not |
| member | Bool | true if user is an member, false if not |
| staff | Bool | true if user is an staff, false if not |

** An user can be more than one role

### Promote an user to staff role
    method: PUT
    endpoint: /api/user/role/promote/staff
    port: 10101
    caller role: Member
    possible errCode: 100, 300
#### Input Structure
| Field | Type | Required? |
|-------|------|-------------|
| socialType | String | Yes |
| socialID | String | Yes |

### Demote an staff to member role
    method: PUT
    endpoint: /api/user/role/demote/staff
    port: 10101
    caller role: Admin
    possible errCode: 100, 300
#### Input Structure
| Field | Type | Required? |
|-------|------|-------------|
| socialType | String | Yes |
| socialID | String | Yes |
