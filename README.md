
# glovo-wrapper

Unofficial glovo courier app API wrapper


## Features

- Authorization using Glovo Courier app credentials
- Profile Informations
- Challenges
- Deliveries
- CheckIn method
- Raports
- Calendar & Slots Info



## Installation

Using NPM

```bash
  npm install glovo-wrapper
```
## Usage

Authorization
```typescript
import { oauth, isHttpError } from 'glovo-wrapper';

oauth.authenticate({
    grantType: "password",
    password: "<PASSWORD TO ACCOUNT>",
    termsAndConditionsChecked: false,
    userType: "courier",
    username: "<EMAIL TO ACCOUNT>"
}).then(data => {
    if (data === undefined) {
        console.log("No data found!");
        return;
    }
    if (isHttpError(data)) {
        console.log(`Error: ${JSON.stringify(data.error)}`);
        return;
    }

    // Save `accessToken` and execute other requests from `courier` module
    console.log(`Logged In with token: ${data.accessToken}`);
}).catch(console.error);
```

Get courier eg. profile data after authorization
```typescript
import { courier, isHttpError } from 'glovo-wrapper';

const accessToken = // Get access token from authenticate() function (`oauth` module);

courier.getProfile(accessToken).then(profile => {
    if (isHttpError(profile)) {
        throw new Error(profile.error);
    }

    console.log(`Excellence Score: ${profile.header.excellenceScore}`);
}).catch(console.error);
```

Logout
```typescript
import { oauth } from 'glovo-wrapper';

const accessToken = // Get access token from authenticate() function (`oauth` module);

oauth.logout(accessToken).then(success => console.log(`Success: ${success}`));
```
## API Reference

#### Authorization

```typescript
  OAuth authorize(authData: IAuthData)
```

| Parameter | Type     | Possible Values | Description                |
| :-------- | :------- | :------ | :------------------ |
| `grantType` | `string` | PASSWORD | **Required**. Authorization method |
| `password` | `string` |  | **Required**. User password |
| `termsAndConditionsChecked` | `boolean` | True / False | **Required**.  Are terms and conditions accepted|
| `userType` | `string` | courier | **Required**.  User account type|
| `username` | `string` |  | **Required**.  User account email|

Return type: **IToken** | **IError** | **undefined**

#### IToken Interface

```typescript
  OAuth interface IToken
```

| Parameter | Type     | Possible Values | Description                |
| :-------- | :------- | :------ | :------------------ |
| `accessToken` | `string` | Bearer Token | Generated user access bearer token |
| `expiresIn` | `number` | Seconds | Number of seconds to token expire |
| `refreshToken` | `string` | Refresh Token | Refresh token to renew accessToken after expire time |
| `scope` | `object or null` | Unknown | Contains unknown data |
| `twoFactorToken` | `boolean` | True / False | Determinate if user has 2FA |

#### IError Interface

```typescript
  Http interface IError
```

| Parameter | Type     | Possible Values | Description                |
| :-------- | :------- | :------ | :------------------ |
| `error` | `object` | Error JSON structure | Contains error JSON structure, each error has probably own structure |