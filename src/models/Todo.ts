export interface ITodoUser {
  name: string;
  id: string;
}

export interface ITodo {
  title: string;
  description: string;
  authorId: string;
  assignedId: string;
  status: 'todo' | 'inProgress' | 'done';
  id: string;
}
