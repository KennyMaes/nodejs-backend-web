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
- Create a .env.docker file and use the same variables we see in the example file and change the POSTGRES_HOST from `localhost` to `db`
- Run `docker compose --env-file ../.env.docker up --build` from the ops folder
- This will start the database and if the health check is ok the application will start
- The application is mapped to run on [localhost:3005](http://localHost:3005)

I created a static page where you could find some basic interaction with the API

