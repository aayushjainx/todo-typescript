import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';

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
  synchronize: true,
});

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

AppDataStore.initialize()
  .then(() => {
    app.listen(port);
    console.log('Data Source has been initialized');
  })
  .catch((err) => {
    console.error(err);
  });
