import { useEffect, lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import BaseScreen from '@/components/BaseScreen/BaseScreen';
import { ITodo, ITodoBoard, ITodoUser } from '@/models/Todo';
import BtnLink from '@/components/BtnLink/BtnLink';
import { todoUsersResolvedRouter } from '@/routes/resolvedRoutes';
import { todoSelectedUser } from '@/store/todoUsers';

import Styles from './styles';
import { createBoard, readBoards } from '@/services/todo.service';

import { useNavigate } from 'react-router-dom';
import BtnFloat from '@/components/BtnFloat/BtnFloat';
import { useDescriptiveRequest } from '@/hooks/useDescriptiveRequest/useDescriptiveRequest';
import {
  useSensor,
  useSensors,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragOverlay,
  MouseSensor,
  DragOverEvent,
  PointerSensor,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Task from './components/Task/Task';
import { IBoardActions } from './types';

const Board = lazy(async () => await import('./components/Board/Board'));
const UserSelect = lazy(
  async () => await import('./components/UserSelect/UserSelect')
);

const Todo = (): JSX.Element => {
  const selectedUser = useSelector(todoSelectedUser) as ITodoUser;
  const navigate = useNavigate();
  const [boards, setBoards] = useState<ITodoBoard[]>([]);

  const fetchBoardsUiState = useDescriptiveRequest({
    handleOnSuccess: async () => {
      const response = await readBoards();
      setBoards(response);
      return response.length === 0 ? 'isEmpty' : 'hasData';
    },
    initialState: 'isLoading',
  });

  const createBoardUiState = useDescriptiveRequest({
    handleOnSuccess: async () => {
      const response = await createBoard({
        title: '',
        todosOrder: [],
      });
      setBoards([...boards, response]);
      !boards.length && fetchBoardsUiState.setUiStateStatus('hasData');
    },
  });

  // drag and drop state [adjust]
  const [activeTaskDragged, setActiveTaskDragged] = useState<ITodo>();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance: 100 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, {
      activationConstraint: { delay: 100, tolerance: 100 },
    })
  );

  const copyBoardState = (): ITodoBoard[] => Object.assign([], boards);

  const handleDragEnd = (event: DragOverEvent) => {
    // const { active, over } = event;
    // if (active.id === over?.id) return;
    // const copyBoards = copyBoardState();
    // const boardIdx = copyBoards.findIndex(
    //   (item) => item.id === active?.data?.current?.boardId
    // );
    // if (!copyBoards[boardIdx].todoItems) return;
    // const oldIndex = copyBoards[boardIdx].todoItems.findIndex(
    //   (item) => item.id === active.id
    // );
    // const newIndex = copyBoards[boardIdx].todoItems.findIndex(
    //   (item) => item.id === over?.id
    // );
    // copyBoards[boardIdx].todoItems = arrayMove(
    //   copyBoards[boardIdx].todoItems,
    //   oldIndex,
    //   newIndex
    // );
    // setBoards(copyBoards);
  };

  const handleDragStart = (event: DragOverEvent) => {
    setActiveTaskDragged(event.active.data.current?.task);
  };

  const handleDragOver = async (event: DragOverEvent) => {
    // const { active, over } = event;
    // const activeBoardId = active.data?.current?.boardId;
    // const overId = over?.data?.current?.task.boardId ?? over.id;
    // // const taskOverdId = over?.data?.current?.task?.id;
    // const activeContainer = boards.findIndex(
    //   (item) => item.id === activeBoardId
    // );
    // const overContainer = boards.findIndex((item) => item.id === overId);
    // const taskOverdId = boards[overContainer].todosOrder.indexOf(over?.id);
    // if (
    //   activeContainer === -1 ||
    //   overContainer === -1 ||
    //   activeContainer === overContainer ||
    //   active?.data?.current?.task?.boardId === overId
    // ) {
    //   return;
    // }
    // const task = active?.data?.current?.task;
    // try {
    //   if (activeBoardId === overId) {
    //     // await updateTodoById({
    //     //   updatedTodo: { ...task, boardId: overId },
    //     //   todoId: task.id,
    //     // });
    //     // boardActions.updateTodoByBoardId({
    //     //   itemEdit: { ...task, boardId: overId },
    //     //   currentStatus: task?.boardId,
    //     // });
    //   } else {
    //     // await updateMoveTodoToAnotherBoard({
    //     //   sourceBoardId: task.boardId,
    //     //   targetBoardId: overId,
    //     //   todoId: task.id,
    //     //   newIndex: taskOverdId,
    //     // });
    //     boardActions.moveTodoToAnotherBoard({
    //       sourceBoardId: task.boardId,
    //       targetBoardId: overId,
    //       todoId: task.id,
    //       newIndex: taskOverdId === -1 ? 0 : taskOverdId,
    //     });
    //   }
    // } catch (error) {
    //   console.error('🚀 ~ handleDragOver ~ error:', error);
    // }
  };
  // drag and drop state [adjust]

  const boardActions: IBoardActions = {
    replaceBoardTodos: ({ todoItems, currentStatus }) => {
      const copyBoards = copyBoardState();
      const boardToUpdate = copyBoards.find(
        (copyBoard) => copyBoard.id === currentStatus
      ) as ITodoBoard;

      if ((todoItems as ITodo[])?.length !== undefined) {
        boardToUpdate.todoItems = todoItems as ITodo[];
      } else {
        boardToUpdate?.todoItems?.push?.(todoItems as ITodo);
      }
      setBoards(copyBoards);
    },
    updateTodoByBoardId: ({ itemEdit, currentStatus }) => {
      const copyBoards = copyBoardState();
      const sourceBoard = copyBoards.find(
        (board) => board.id === currentStatus
      ) as ITodoBoard;
      const todo = sourceBoard.todoItems.findIndex((item) => {
        return item.id === itemEdit.id;
      });
      const hasChangedStatus = currentStatus !== itemEdit.boardId;

      if (hasChangedStatus) {
        sourceBoard.todoItems = sourceBoard.todoItems.filter(
          (item: ITodo) => item.id !== itemEdit.id
        );
        const destinationBoard = copyBoards.find(
          (board) => board.id === itemEdit.boardId
        ) as ITodoBoard;
        destinationBoard.todoItems.unshift(itemEdit);
      } else {
        sourceBoard.todoItems[todo] = { ...itemEdit };
      }

      setBoards(copyBoards);
    },
    deleteTodo: ({ boardToUpdateId, todoId }) => {
      const copyBoards = copyBoardState();
      const boardIdx = copyBoards.findIndex(
        (board) => board.id === boardToUpdateId
      );
      copyBoards[boardIdx].todoItems = copyBoards[boardIdx].todoItems.filter(
        (todo) => todo.id !== todoId
      );

      setBoards(copyBoards);
    },
    deleteBoard: ({ boardToUpdateId }) => {
      let copyBoards = copyBoardState();
      copyBoards = copyBoards.filter((board) => board.id !== boardToUpdateId);
      setBoards(copyBoards);
    },
    updateBoardTitle: ({ currentStatus, newTitle }) => {
      const copyBoards = copyBoardState();
      const boardToUpdate = copyBoards.find(
        (copyBoard) => copyBoard.id === currentStatus
      ) as ITodoBoard;
      boardToUpdate.title = newTitle;
      setBoards(copyBoards);
    },
    // moveTodoToAnotherBoard: () =>
    //   // sourceBoardId,
    //   // targetBoardId,
    //   // todoId,
    //   // newIndex,
    //   {
    //     // const copyBoards = copyBoardState();
    //     // const sourceIndex = copyBoards.findIndex(
    //     //   (board) => board.id === sourceBoardId
    //     // );
    //     // const targetIndex = copyBoards.findIndex(
    //     //   (board) => board.id === targetBoardId
    //     // );
    //     // const todoIdx = copyBoards[sourceIndex].todoItems.findIndex((item) => {
    //     //   return item.id === todoId;
    //     // });
    //     // if (todoIdx === -1) return;
    //     // copyBoards[sourceIndex].todosOrder = copyBoards[
    //     //   sourceIndex
    //     // ].todosOrder.filter((todo) => todo !== todoId);
    //     // copyBoards[targetIndex].todosOrder.splice(newIndex, 0, todoId);
    //     // copyBoards[targetIndex].todoItems.splice(newIndex, 0, {
    //     //   ...copyBoards[sourceIndex].todoItems[todoIdx],
    //     //   boardId: targetBoardId,
    //     // });
    //     // copyBoards[sourceIndex].todoItems = copyBoards[
    //     //   sourceIndex
    //     // ].todoItems.filter((todo) => todo.id !== todoId);
    //     // setBoards(copyBoards);
    //   },
  };

  useEffect(() => {
    void fetchBoardsUiState.requestData();
  }, []);

  return (
    <BaseScreen
      heading="To-do List (Beta)"
      description="That to-do list you love ;). It's a Beta version - My to-do list is on a roll!"
      isErrorMessage={'Sorry, something went wrong'}
      isEmptyMessage={
        selectedUser !== null
          ? "Let's create the first board!"
          : "First, you need to create a user. Let's create them!"
      }
      uiCurrentState={fetchBoardsUiState.uiStateStatus}
      onEmpty={async () => {
        if (selectedUser === null) {
          return navigate(todoUsersResolvedRouter);
        }
        await createBoardUiState.requestData();
      }}
    >
      <Styles.Section>
        {selectedUser !== null ? (
          <>
            <UserSelect selectedUserId={selectedUser.id} />
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
            >
              <Styles.Boards>
                {boards.map((board) => (
                  <Board
                    key={board.id}
                    boardId={board.id}
                    heading={board.title}
                    selectedUser={selectedUser}
                    todoEntities={board.todoItems ?? []}
                    color="var(--color-brand-primary-light-1)"
                    boardActions={boardActions}
                    statusOptions={boards.map(({ id, title }) => {
                      return {
                        label: title,
                        id,
                      };
                    })}
                  />
                ))}
                <DragOverlay>
                  {activeTaskDragged ? (
                    <Task
                      id={activeTaskDragged.id}
                      item={activeTaskDragged}
                      onClick={() => {}}
                      handleDelete={() => {}}
                      isDeleteLoading={false}
                    />
                  ) : null}
                </DragOverlay>
              </Styles.Boards>
            </DndContext>

            <BtnFloat
              label="Create new board"
              showNumber={1}
              onClick={createBoardUiState.requestData}
              isLoading={createBoardUiState.uiStateStatus === 'isLoading'}
            />
          </>
        ) : (
          <Styles.NoUsers>
            <p>First, you need to create a user!</p>
            <BtnLink className="primary" to={todoUsersResolvedRouter}>
              Let&apos;s create them!
            </BtnLink>
          </Styles.NoUsers>
        )}
      </Styles.Section>
    </BaseScreen>
  );
};
export default Todo;
