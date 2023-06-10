interface LinkedList {
  data: number;
  next: LinkedList | null;
}
interface initLinkedListResponse {
  display: () => number[];
  append: (value: number) => void;
}
export const initLinkedList = () => {
  let linkedList: LinkedList | null = null;

  const display: initLinkedListResponse['display'] = () => {
    let cachedList = linkedList;
    const arrayList: number[] = [];
    while (cachedList !== null) {
      arrayList.push(cachedList.data);
      cachedList = cachedList.next;
    }
    return arrayList;
  };

  const append: initLinkedListResponse['append'] = (data) => {
    const newNode: LinkedList = { data, next: null };
    const shouldBeTheFIrstItem = linkedList === null || linkedList.data > data; // check if it is the first item to insert or if it should the first item
    if (shouldBeTheFIrstItem) {
      newNode.next = linkedList;
      linkedList = newNode;
      return;
    }
    let current = linkedList as LinkedList;
    while (current.next !== null && data > current.next.data) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
  };

  return {
    display,
    append,
  };
};
