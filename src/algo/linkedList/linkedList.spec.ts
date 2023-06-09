import { initLinkedList } from './linkedListByNumber';
import { initLinkedListByText } from './linkedListByText';

describe('algo - linkedList', () => {
  it('should insert item by number and desc order', () => {
    const linkedList = initLinkedList();
    expect(linkedList.display()).toEqual([]);
    linkedList.append(5);
    expect(linkedList.display()).toEqual([5]);
    linkedList.append(10);
    linkedList.append(20);
    linkedList.append(15);
    linkedList.append(7);
    linkedList.append(40);
    linkedList.append(3);
    expect(linkedList.display()).toEqual([3, 5, 7, 10, 15, 20, 40]);
  });

  it('should insert item by string and desc order', () => {
    const linkedList = initLinkedListByText();
    expect(linkedList.display()).toEqual([]);
    linkedList.append('banana');
    expect(linkedList.display()).toEqual(['banana']);
    linkedList.append('abacaxi');
    linkedList.append('dado');
    expect(linkedList.display()).toEqual(['abacaxi', 'banana', 'dado']);
    linkedList.append('cenoura');
    linkedList.append('abacate');
    linkedList.append('mamao');
    linkedList.append('caramelo');
    expect(linkedList.display()).toEqual([
      'abacate',
      'abacaxi',
      'banana',
      'caramelo',
      'cenoura',
      'dado',
      'mamao',
    ]);
  });
});
