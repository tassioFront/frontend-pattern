class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number, next: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

type sumListsParams = ListNode | undefined | null;
type sumLists = (
  n1: sumListsParams,
  n2: sumListsParams,
  rest?: number
) => ListNode | null;

export const addTwoNumbers = (l1: ListNode, l2: ListNode) => {
  const sumLists: sumLists = (n1, n2, rest = 0) => {
    if (!n1 && !n2 && !rest) return null;
    const newVal = (n1?.val ?? 0) + (n2?.val ?? 0) + rest;
    return new ListNode(
      newVal % 10,
      sumLists(n1?.next, n2?.next, Math.floor(newVal / 10))
    );
  };

  return sumLists(l1, l2);
};
