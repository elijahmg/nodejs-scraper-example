import express, {Express, Request, Response} from 'express';
import {scrape} from "./scrape";

const app: Express = express();

app.get('/', async (req: Request, res: Response) => {
  const {url} = req.query;

  if (!url) {
    return res.status(200).send({
      message: 'Looks like you are missing url as query parameter',
      example: 'http://localhost:8080?url=https://open.spotify.com/artist/6mdiAmATAx73kdxrNrnlao'
    })
  }

  const pageData = await scrape(url as string);
  res.status(200).send(pageData);
});

app.listen(8080, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${8080}`);
});