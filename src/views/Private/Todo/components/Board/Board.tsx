import { lazy, memo, useEffect, useRef, useState } from 'react';
import { ITodo, ITodoBoard, ITodoUser } from '@/models/Todo';
import { deleteTodo } from '@/services/todo.service';

import Styles from './styles';
import Task from '../Task/Task';
import {
  deleteBoard,
  getTodoByBoardId,
  patchBoardTitle,
} from '@/services/board.service';
import { todoCy } from '@/enums/dataCy';
import { useDescriptiveRequest } from '@/hooks/useDescriptiveRequest/useDescriptiveRequest';
import Spinner from '@/components/Spinner/Spinner';
const TaskModal = lazy(async () => await import('../TaskModal/TaskModal'));
export interface BoardTypes {
  className?: string;
  heading: string;
  status: string;
  color?: string;
  todoEntities: ITodoBoard['todoItems'];
  selectedUser: ITodoUser;
  updateBoards: any;
  statusOptions: any;
}

const Board = memo(function Board({
  heading,
  status,
  selectedUser,
  todoEntities,
  updateBoards,
  statusOptions,
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
  const taskToDeleteId = useRef('');

  const fetchTodoUiState = useDescriptiveRequest({
    handleOnSuccess: async () => {
      const response = await getTodoByBoardId(status);
      updateBoards.todoItems({
        todoItems: response,
        boardToUpdateId: status,
      });
      return response.length > 0 ? 'hasData' : 'isEmpty';
    },
    initialState: 'isLoading',
  });

  const deleteBoardUiState = useDescriptiveRequest({
    handleOnSuccess: async () => {
      await deleteBoard({
        boardId: status,
      });
      updateBoards.deleteBoard({
        boardToUpdateId: status,
      });
    },
  });

  const deleteTodoUiState = useDescriptiveRequest({
    handleOnSuccess: async () => {
      await deleteTodo({
        todoId: taskToDeleteId.current,
        boardId: status,
      });
      updateBoards.deleteTodo({
        todoId: taskToDeleteId.current,
        boardToUpdateId: status,
      });
    },
  });

  const handleEditTask = (todoToEdit: ITodo) => {
    setTask({ ...todoToEdit });
    setIsOpen(true);
  };
  const handleEditTitleBoard = async (value: ITodoBoard['title']) => {
    try {
      await patchBoardTitle({
        id: status,
        title: value,
      });
      updateBoards.title({
        newTitle: value,
        boardToUpdateId: status,
      });
    } catch (error) {
      alert('Sorry, We got an error on update the board title');
    }
  };

  const handleDeleteTodo = async (todoToDelete: ITodo) => {
    taskToDeleteId.current = todoToDelete.id;
    await deleteTodoUiState.requestData();
  };
  const handleReset = () => {
    setIsOpen(false);
    setTask({
      ...initState,
    });
  };

  useEffect(() => {
    void fetchTodoUiState.requestData();
  }, []);

  useEffect(() => {
    const updateUiStateToShowData =
      fetchTodoUiState.uiStateStatus === 'isEmpty' && todoEntities.length > 0;
    const updateUiStateToShowEmptyState =
      fetchTodoUiState.uiStateStatus === 'hasData' && todoEntities.length === 0;
    updateUiStateToShowData && fetchTodoUiState.setUiStateStatus('hasData');
    updateUiStateToShowEmptyState &&
      fetchTodoUiState.setUiStateStatus('isEmpty');
  }, [todoEntities]);

  return (
    <Styles.Wrapper>
      <Styles.EditableTypography
        tag="h1"
        id={heading}
        label={heading}
        updateText={async (value) => await handleEditTitleBoard(value)}
      />
      <Styles.Content>
        {fetchTodoUiState.uiStateStatus === 'hasData' &&
          todoEntities?.map?.((item) => (
            <Task
              key={item.id}
              item={item}
              onClick={() => handleEditTask(item)}
              handleDelete={async () => await handleDeleteTodo(item)}
              isDeleteLoading={
                deleteTodoUiState.uiStateStatus === 'isLoading' &&
                taskToDeleteId.current === item.id
              }
            />
          ))}
        {fetchTodoUiState.uiStateStatus === 'isEmpty' && (
          <p>Sorry, there is nothing here yet</p>
        )}
        {fetchTodoUiState.uiStateStatus === 'isLoading' && <Spinner />}
      </Styles.Content>
      <Styles.BtnCreate
        onClick={() => setIsOpen(true)}
        shape="text"
        data-cy={todoCy.createTask + status}
      >
        <i
          title="click to create the task"
          className="fa fa-plus"
          aria-label="Create a new task"
        ></i>
      </Styles.BtnCreate>
      <Styles.BtnDelete
        onClick={deleteBoardUiState.requestData}
        className="danger"
        shape="text"
        isLoading={deleteBoardUiState.uiStateStatus === 'isLoading'}
        data-cy={todoCy.deleteBoard + status}
      >
        <i
          title="click to delete the board"
          className="fa fa-times-circle"
          aria-label="Delete board"
        ></i>
      </Styles.BtnDelete>
      {isOpen && (
        <TaskModal
          selectedUser={selectedUser}
          isOpen={isOpen}
          task={task}
          setTask={setTask}
          handleReset={handleReset}
          updateBoards={updateBoards}
          statusOptions={statusOptions}
          status={status}
          // setUiStateStatus={fetchTodoUiState.setUiStateStatus}
        />
      )}
    </Styles.Wrapper>
  );
});

export default Board;
