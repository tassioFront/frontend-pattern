interface LinkedList {
  value: string;
  next: LinkedList | null;
}
interface initLinkedListResponse {
  display: () => string[];
  append: (value: string) => void;
}
export const initLinkedListByText = () => {
  let linkedList: LinkedList | null = null;

  const display: initLinkedListResponse['display'] = () => {
    let cachedList = linkedList;
    const arrayList: string[] = [];
    while (cachedList !== null) {
      arrayList.push(cachedList.value);
      cachedList = cachedList.next;
    }
    return arrayList;
  };

  const append: initLinkedListResponse['append'] = (value) => {
    const newNode: LinkedList = { value, next: null };
    const shouldBeTheFIrstItem =
      linkedList === null || value.localeCompare(linkedList.value) < 0;
    if (shouldBeTheFIrstItem) {
      newNode.next = linkedList;
      linkedList = newNode;
      return;
    }
    let current = linkedList as LinkedList;
    while (
      current.next !== null &&
      value.localeCompare(current.next.value) > 0
    ) {
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
