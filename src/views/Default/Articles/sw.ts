import { IArticle } from '@/models/Article';

self.onmessage = (e: MessageEvent<IArticle[]>) => {
  const map = new Map();
  for (const article of e.data) {
    for (const tag of article.tag_list) {
      map.set(tag, tag);
    }
  }
  // @todo[web-worker-article]: this is for teaching purposes. See the article here: https://dev.to/tassiofront/avoid-overloading-the-main-thread-with-web-workers-557c
  for (let idx = 0; idx < 1000000000; idx++) {
    idx++;
  }
  self.postMessage(Array.from(map.values()));
};
