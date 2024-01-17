import { Suspense, lazy, memo, useEffect, useRef, useState } from 'react';
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
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
const TaskModal = lazy(async () => await import('../TaskModal/TaskModal'));
export interface BoardTypes {
  className?: string;
  heading: string;
  status: string;
  color?: string;
  todoEntities: ITodoBoard['todoItems'];
  selectedUser: ITodoUser;
  boardActions: any;
  statusOptions: any;
}

const Board = memo(function Board({
  heading,
  status,
  selectedUser,
  todoEntities,
  boardActions,
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
      boardActions.replaceBoardTodos({
        todoItems: response,
        currentStatus: status,
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
      boardActions.deleteBoard({
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
      boardActions.deleteTodo({
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
      boardActions.updateBoardTitle({
        newTitle: value,
        currentStatus: status,
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

  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <SortableContext
      id={status}
      items={todoEntities}
      strategy={verticalListSortingStrategy}
    >
      <Styles.Wrapper>
        <Styles.EditableTypography
          tag="h1"
          id={heading}
          label={heading}
          updateText={async (value) => await handleEditTitleBoard(value)}
        />
        <Styles.Content
          ref={setNodeRef}
          data-cy={todoCy.droppableArea + status}
          id={status}
        >
          {fetchTodoUiState.uiStateStatus === 'hasData' &&
            todoEntities?.map?.((item) => (
              <Task
                key={item.id}
                item={item}
                id={item.id}
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
        <Suspense>
          {isOpen && (
            <TaskModal
              selectedUser={selectedUser}
              isOpen={isOpen}
              task={task}
              setTask={setTask}
              handleReset={handleReset}
              boardActions={boardActions}
              statusOptions={statusOptions}
              status={status}
            />
          )}
        </Suspense>
      </Styles.Wrapper>
    </SortableContext>
  );
});

export default Board;
