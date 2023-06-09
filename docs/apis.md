# APIs

## Users

- **Methods**: `POST`, `GET`, `PUT`
- **Paths**: `/api/users`, `/api/users/<str:username>`

`POST` INPUT:

```json
{
  "email": "string",
  "profile_picture": "string",
  "display_name": "string",
  "header_image": "string",
  "first_name": "string",
  "last_name": "string",
  "password": "string",
  "username": "string",
  "category": "string",
  "about": "string"
}
```

`POST` OUTPUT:

```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "user": {
    "user_id": 1,
    "email": "string",
    "profile_picture": "string",
    "display_name": "string",
    "header_image": "string",
    "first_name": "string",
    "last_name": "string",
    "username": "string",
    "category": "string",
    "about": "string"
  }
}
```

ALL OTHER OUTPUTS:

```json
{
  "user_id": 0,
  "email": "string",
  "profile_picture": "string",
  "display_name": "string",
  "header_image": "string",
  "first_name": "string",
  "last_name": "string",
  "username": "string",
  "category": "string",
  "about": "string"
}
```

creating a new user also sends a post request to `/token` which automatically logs you which returns your access token and the user's info

## Token

- **Methods**: `GET`, `POST`, `DELETE`
- **Paths**: `/token`

Input:

```json
{
  "username": "string",
  "password": "string"
}
```

Output:

```json
{
  "access_token": "string",
  "token_type": "Bearer"
}
```

`GET` /token Output:

```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "user": {
    "user_id": 1,
    "email": "string",
    "profile_picture": "string",
    "display_name": "string",
    "header_image": "string",
    "first_name": "string",
    "last_name": "string",
    "username": "string",
    "category": "string",
    "about": "string"
  }
}
```

these methods just logs a user in and out, and get's the `token` and the userdata associated with that `token`
and gets handled automatically by jwt-down-fastapi and jwt-down-for-react

## Socials

- **Methods**: `GET`, `PUT`, `POST`, `DELETE`
- **Paths**: `/api/socials`, `/api/socials/<ink:id>`

Input:

```json
{
  "user_id": 0, <---- this is the user id of the person logged in and creating a link
  "link": "string"
}
```

Output:

```json
{
  "id": 0,
  "user_id": 0, <---- this is the user id of the person logged in and creating a link
  "link": "string"
}
```

this creates a link that goes on a user's profile, that can removed by hovering and clicking the red button the user_id is for the front end to filter who it belongs to

## Connections

- **Methods**: `GET`, `PUT`, `POST`, `DELETE`
- **Paths**: `/api/connections`, `/api/connections/<ink:id>`

Input:

```json
{
  "user_id": 0, <---- this is the user id of the person logged in and following someone
  "following_id": 0 <---- this is the user id of the person getting followed
}
```

Output:

```json
{
  "id": 0, <---- the id of the table row
  "user_id": 0, <---- this is the user id of the person logged in and following someone
  "following_id": 0 <---- this is the user id of the person getting followed
}
```

this is used for the follower count and follow button (we originally planned to create a connections page that shows a list of their followers and who they are following, but that got cut due to DB issues)

## carousels

- **Methods**: `GET`, `PUT`, `POST`, `DELETE`
- **Paths**: `/api/carousels`, `/api/carousels/<ink:id>`

Input:

```json
{
  "user_id": 0,
  "link": "string"
}
```

Output:

```json
{
  "id": 0,
  "user_id": 0,
  "link": "string"
}
```

this is a an image that will go inside the image carousel made in bootstrap on the front end

## posts

- **Methods**: `GET`, `PUT`, `POST`, `DELETE`
- **Paths**: `/api/posts`, `/api/posts/<ink:id>`

Input:

```json
{
  "username": "string",
  "text": "string",
  "image": "string"
}
```

Output:

```json
{
  "id": 0,
  "username": "string",
  "text": "string",
  "image": "string",
  "created": "2023-06-09T19:05:08.731Z"
}
```

the post automatically creates a datetime at the current time (unfortunately in UTC) and when we get all posts our queries automatically order it by created date/time
(we aren't using websockets so without a refresh we can't update the posts when another user creates a post)

## comments

- **Methods**: `GET`, `PUT`, `POST`, `DELETE`
- **Paths**: `/api/comments`, `/api/comments/<ink:id>`

Input:

```json
{
  "post_id": 0,
  "username": "string",
  "text": "string"
}
```

Output:

```json
{
  "id": 0,
  "post_id": 0,
  "username": "string",
  "text": "string",
  "created": "2023-06-09T19:08:26.347Z"
}
```

shows up below the post with on screen forms that automatically update when you send your comment (we aren't using websockets so without a refresh we can't update the comment section when another user creates a comment)

## likes

- **Methods**: `GET`, `PUT`, `POST`, `DELETE`
- **Paths**: `/api/likes`, `/api/likes/<ink:id>`

Input:

```json
{
  "post_id": 0,
  "username": "string" <---- the username of the person liking the post
}
```

Output:

```json
{
  "id": 0,
  "post_id": 0,
  "username": "string"
}
```

the front end grabs the username from the logged in user and when you click it passes that to the json body use to toggle a like button
