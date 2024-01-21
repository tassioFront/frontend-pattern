export interface ITodoUser {
  name: string;
  id: string;
}

export interface ITodo {
  title: string;
  description: string;
  authorId: string;
  assignedId: string;
  boardId: string;
  id: string;
}

export interface ITodoBoard {
  title: string;
  id: string;
  todosOrder: Array<ITodo['id']>;
  todoItems: ITodo[];
}
