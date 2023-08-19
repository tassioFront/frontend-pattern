import { IArticle } from '@/models/Article';

self.onmessage = (e: MessageEvent<IArticle[]>) => {
  const map = new Map();
  for (const article of e.data) {
    for (const tag of article.tag_list) {
      map.set(tag, tag);
    }
  }
  self.postMessage(Array.from(map.values()));
};
