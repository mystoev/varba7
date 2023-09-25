# Varba7

This repo currently includes:

- Varba7 web gateway. A GraphQL web service, which serves data for read-only (for now)
- Varba7 web client, to consume the data from the API
- Varna7 mobile client. Using React Native to have a unified interface for mobile and web

## Deploment

The web server and web client are both deployed via Github Actions.
NGINX is used to serve the UI, built by Vite.
The backend API (GraphQL) runs on a Linux service and it uses Node.

## Tasks TODO

- Add Unauthorized page
- Setup infra using Ansible
- Server should be Apollo GraphQL with Fastify integration. Set everything up without Fastify and then switch
- Move schema to gql/graphql file
- once the graphql server is deployed, rename the stats collection in mongo to BME280
