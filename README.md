# NodeJS API
## Repository
[Repository](https://github.com/KennyMaes/nodejs-backend-web)

## Stack
- Typescript
- Postgres
- Express
- Docker

## Commands
### Manually (local)
- Run `npm install`
- Create .env file from .env-example
- Start the database: `npm run start-db`
- Start with the migration to create the tables in the database`npm run migrate`
- Run the application `npm start`
- The application should now run by default on [localhost:3000](http://localHost:3000)

### Docker container
- Create a .env.docker file like the example
- Replace the value localhost from 'POSTGRES_HOST' with db because this is pointing to the service in docker compose
- Other variables could stay the same
- ```
    POSTGRES_USER=user
    POSTGRES_PASSWORD=password
    POSTGRES_DB=nodejsehb
    POSTGRES_HOST=db  <-
    POSTGRES_PORT=5432
  ```
- Run `docker compose --env-file ../.env.docker up --build` from the ops folder
- This will start the database and if the health check is ok the application will start
- The application is mapped to run on [localhost:3005](http://localHost:3005)

I created a static page where you could find some basic interaction with the API

