# OpenID Connect (OIDC)

## Overview

This project is a demonstration of an OpenID Connect (OIDC) authorization flow, built using Node, Azure, Express, Axios and environments variables. Postman is used for testing the API endpoints.

## Structure

```
├── README.md
├── index.js
└── package.json
```

## Configuration

To configure the project, create a `.env` file and fill it with the following variables, which can be obtained from your Identity Provider (IdP):

```plaintext
CLIENT_ID=
CLIENT_SECRET=
GRANT_TYPE=authorization_code
PORT=
REDIRECT_URI=
RESPONSE_TYPE=code
SCOPE=openid
TENANT_ID=
```

## Running Locally

To run the project locally, follow these steps:

1. Install project dependencies:

```
npm install

```

2. Start the development server:

```
npm run start
```

## Endpoints

This project provides just one single endpoint for managing the OIDC authorization:

| Ednpoint  | Description                                                                                        | HTTP Method |
| --------- | -------------------------------------------------------------------------------------------------- | ----------- |
| /callback | Receives the IdP code, sends a POST request to IdP's /token endpoint, and receives the IdP's token | GET         |

## Terminology

Relying Party (RP) => abc.com

Identity Provider (IdP) => google.com

## Flow

- user wants to log in abc.com
- abc.com uses IdP's _POST /authorize_ endpoint
- the browser redirects the user to google.com's OIDC endpoint with parameters:
  - response_type: ['code', 'token', 'id_token']
  - client_id
  - redirect_uri
  - scope
  - state: random value to prevent CSRF
  - nonce: random to prevent OIDC attacks
  - prompt: ['none', 'login', 'consent']
  - max_age
  - acr_values: MFA
  - custom_parameters
- user logs in to google.com
- google.com generate a code
- google.com redirects user to `redirect_uri` with the code
- abc.com sends a POST request to IdP's _POST /token_ with the code
- IdP's _POST /token_ returns a token

## Notes

> OIDC primarily focuses on authentication (not authorization)

> abc.com can rely solely on its IdPs, without maintaining its own user database (not recommended).

> abc.com can allow users to log in with google.com and add them to its own user database. It can then provide users with the option to change their local password or unlink their google.com account (recommended hybrid approach).

## Images
