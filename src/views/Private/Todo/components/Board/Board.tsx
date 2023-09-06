import { memo, useRef, useState } from 'react';
import Styles from './styles';
import Typography from '@/components/Typography/Typography';
import { ITodo, ITodoUser } from '@/models/Todo';
import Task from '../Task/Task';
import TaskModal from '../TaskModal/TaskModal';
import { Dictionary } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { deleteTodo } from '@/services/todo.service';
import { removeTodo } from '@/store/todo';

export interface BoardTypes {
  className?: string;
  heading?: string;
  status?: 'todo' | 'inProgress' | 'done';
  color?: string;
  todoEntities: Dictionary<ITodo>;
  selectedUser: ITodoUser;
  order: string[];
}

const Board = memo(function Board({
  heading = 'todo',
  color = 'var(--color-neutral-light-1)',
  status = 'todo',
  todoEntities,
  selectedUser,
  order,
}: BoardTypes) {
  const initState = {
    title: '',
    description: '',
    status,
    authorId: '',
    assignedId: selectedUser.id,
    id: '',
  };
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<ITodo>({
    ...initState,
  });
  const [onDeleteUiState, setOnDeleteUiState] = useState<
    'isLoading' | 'hasError' | 'idle'
  >('idle');
  const taskToDeleteId = useRef('');
  const dispatch = useDispatch<AppDispatch>();

  const handleEditTask = (todoToEdit: ITodo) => {
    setTask({ ...todoToEdit });
    setIsOpen(true);
  };
  const handleDelete = async (todoToDelete: ITodo) => {
    taskToDeleteId.current = todoToDelete.id;
    try {
      setOnDeleteUiState('isLoading');
      await deleteTodo(todoToDelete.id);
      dispatch(removeTodo(todoToDelete));
    } catch (error) {
      setOnDeleteUiState('hasError');
    } finally {
      setOnDeleteUiState('idle');
    }
  };
  const handleReset = () => {
    setIsOpen(false);
    setTask({
      ...initState,
    });
  };

  const currentState = order.length > 0 ? 'hasData' : 'isEmpty';

  return (
    <Styles.Wrapper>
      <Typography tag="h1" id={heading} label={heading} />
      <Styles.Content>
        {currentState === 'hasData' ? (
          order?.map?.((item) => (
            <Task
              key={(todoEntities[item] as ITodo).id}
              color={color}
              item={todoEntities[item] as ITodo}
              onClick={() => handleEditTask(todoEntities[item] as ITodo)}
              handleDelete={async () =>
                await handleDelete(todoEntities[item] as ITodo)
              }
              isDeleteLoading={
                onDeleteUiState === 'isLoading' &&
                taskToDeleteId.current === (todoEntities[item] as ITodo).id
              }
            />
          ))
        ) : (
          <p>Sorry, there is nothing here yet</p>
        )}
      </Styles.Content>
      <Styles.Btn
        onClick={() => setIsOpen(true)}
        className="secondary"
        shape="text"
      >
        <i className="fa fa-plus" aria-label="Create a new task"></i>
      </Styles.Btn>
      <TaskModal
        selectedUser={selectedUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        task={task}
        setTask={setTask}
        handleReset={handleReset}
      />
    </Styles.Wrapper>
  );
});

export default Board;
