import axios from "axios";
import * as cheerio from "cheerio";

interface PageData {
  title: string;
  metaAttrs: Record<string, any>;
  oembedData: Record<string, any>;
}

export function scrape(url: string): Promise<PageData> {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get(url);

    const body: PageData = {
      title: '',
      metaAttrs: {},
      oembedData: {}
    };

    const cheerioAPI = cheerio.load(res.data);

    body.title = cheerioAPI('title').text();
    body.metaAttrs = cheerioAPI('meta').get().map((el) => el.attribs);

    const oembedLinkAttrs =  cheerioAPI('link')
      .get()
      .find((el)=> el.attribs.type?.includes('oembed'))?.attribs

    if (oembedLinkAttrs?.href) {
      const res = await axios.get(oembedLinkAttrs?.href);

      body.oembedData = res.data;
    }

    resolve(body);
  })
}