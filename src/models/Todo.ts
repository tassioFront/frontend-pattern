export interface ITodoUser {
  name: string;
  id: string;
}

export interface ITodo {
  title: string;
  description: string;
  authorId: string;
  assignedId: string;
  status: string;
  id: string;
}

export interface ITodoBoard {
  title: string;
  id: string;
  todoItems: ITodo[];
}
