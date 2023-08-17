import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Tasks } from './src/tasks/tasks.entity';
import { taskRouter } from './src/tasks/tasks.router';

const app: Express = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

export const AppDataStore = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  entities: [Tasks],
  synchronize: true,
});

const port = process.env.PORT;

AppDataStore.initialize()
  .then(() => {
    app.listen(port);
    console.log('Data Source has been initialized');
  })
  .catch((err) => {
    console.error(err);
  });

app.use('/', taskRouter);
