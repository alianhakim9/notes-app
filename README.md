![image](https://github.com/alianhakim9/notes-app/assets/51102459/fb578410-91c6-478f-a5c8-49ccb2750e1e)
# notes-app
The purpose of this project is to find out how to use the React JS framework which is integrated with the Express framework and Mongo DB which includes CRUD operation and authentication using TypeScript

## BE : Docker Compose
```
version: '3.1'
services:
  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: yoursecretpassword
      MONGO_INITDB_DATABASE: notedb
      MONGO_DB_URL: mongodb://localhost:27017/notedb
    ports:
      - 27017:27017
    volumes:
      - ./.docker/mongo-init-scripts:/docker-entrypoint-initdb.d
```

## BE Instalation
> npm install
> npm run dev

## FE Instalation
> npm install
> npm start
