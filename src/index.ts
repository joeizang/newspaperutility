
import express from 'express';
import * as bodyparser from 'body-parser';

const app = express();

app.use(bodyparser.urlencoded({ extended : false }));
app.use(bodyparser.json());

app.use(express.static('/public'));


export { app };
