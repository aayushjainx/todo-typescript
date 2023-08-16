import express, { Express, Request, Response } from 'express';

const app: Express = express();

const port = process.env.PORT || 3200;

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!');
});

app.listen(port);
