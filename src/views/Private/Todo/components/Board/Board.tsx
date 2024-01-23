import { Suspense, lazy, memo, useEffect, useRef, useState } from 'react';
import { ITodo, ITodoBoard, ITodoUser } from '@/models/Todo';

import Styles from './styles';
import Task from '../Task/Task';

import { todoCy } from '@/enums/dataCy';
import { useDescriptiveRequest } from '@/hooks/useDescriptiveRequest/useDescriptiveRequest';
import Spinner from '@/components/Spinner/Spinner';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

import {
  readTodosByBoardId,
  removeBoardById,
  removeTodoById,
  updateBoardTitle,
} from '@/services/todo.service';
import { IBoardActions } from '../../types';
const TaskModal = lazy(async () => await import('../TaskModal/TaskModal'));
export interface BoardTypes {
  className?: string;
  heading: string;
  boardId: string;
  color?: string;
  todoEntities: ITodo[];
  selectedUser: ITodoUser;
  boardActions: IBoardActions;
  statusOptions: any;
}

const Board = memo(function Board({
  heading,
  boardId,
  selectedUser,
  todoEntities,
  boardActions,
  statusOptions,
}: BoardTypes) {
  const initState = {
    title: '',
    description: '',
    boardId,
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
      const response = await readTodosByBoardId({ boardId });
      boardActions.replaceBoardTodos({
        todoItems: response,
        currentStatus: boardId,
      });
      return response.length > 0 ? 'hasData' : 'isEmpty';
    },
    initialState: 'isLoading',
  });

  const deleteBoardUiState = useDescriptiveRequest({
    handleOnSuccess: async () => {
      await removeBoardById({
        boardId,
      });
      boardActions.deleteBoard({
        boardToUpdateId: boardId,
      });
    },
  });

  const deleteTodoUiState = useDescriptiveRequest({
    handleOnSuccess: async () => {
      await removeTodoById({
        todoId: taskToDeleteId.current,
        boardId,
      });
      boardActions.deleteTodo({
        todoId: taskToDeleteId.current,
        boardToUpdateId: boardId,
      });
    },
  });

  const handleEditTask = (todoToEdit: ITodo) => {
    setTask({ ...todoToEdit });
    setIsOpen(true);
  };
  const handleEditTitleBoard = async (value: ITodoBoard['title']) => {
    try {
      await updateBoardTitle({
        boardId,
        title: value,
      });
      boardActions.updateBoardTitle({
        newTitle: value,
        currentStatus: boardId,
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
  }, [todoEntities, boardActions.replaceBoardTodos]);

  const { setNodeRef } = useDroppable({
    id: boardId,
  });

  return (
    <SortableContext
      id={boardId}
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
          data-cy={todoCy.droppableArea + boardId}
          id={boardId}
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
          data-cy={todoCy.createTask + boardId}
          disabled={heading === ''}
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
          data-cy={todoCy.deleteBoard + boardId}
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
              boardId={boardId}
            />
          )}
        </Suspense>
      </Styles.Wrapper>
    </SortableContext>
  );
});

export default Board;
