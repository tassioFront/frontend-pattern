import { useEffect, lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import BaseScreen from '@/components/BaseScreen/BaseScreen';
import { ITodo, ITodoBoard, ITodoUser } from '@/models/Todo';
import BtnLink from '@/components/BtnLink/BtnLink';
import { todoUsersResolvedRouter } from '@/routes/resolvedRoutes';
import { todoSelectedUser } from '@/store/todoUsers';

import Styles from './styles';
import { postBoard, getBoards } from '@/services/board.service';
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
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Task from './components/Task/Task';
const Board = lazy(async () => await import('./components/Board/Board'));
const UserSelect = lazy(
  async () => await import('./components/UserSelect/UserSelect')
);

// Nice drag and drop example
// https://www.youtube.com/watch?v=CYKDtVZr_Jw
const Todo = (): JSX.Element => {
  const selectedUser = useSelector(todoSelectedUser) as ITodoUser;

  const navigate = useNavigate();
  const [boards, setBoards] = useState<ITodoBoard[]>([]);
  // const [baseState, setBaseState] = useState<
  //   'isLoading' | 'isError' | 'isEmpty' | 'hasData'
  // >('isLoading');
  const fetchBoardsUiState = useDescriptiveRequest({
    handleOnSuccess: async () => {
      const response = await getBoards();
      setBoards(response);
      return response.length === 0 ? 'isEmpty' : 'hasData';
    },
    initialState: 'isLoading',
  });

  const createBoardUiState = useDescriptiveRequest({
    handleOnSuccess: async () => {
      const response = await postBoard({
        title: '',
        todoItems: [],
      });
      setBoards([...boards, response]);
      !boards.length && fetchBoardsUiState.setUiStateStatus('hasData');
    },
  });

  const updateBoards = {
    todoItems: ({
      todoItems,
      boardToUpdateId,
    }: {
      todoItems: ITodo[];
      boardToUpdateId: string;
    }) => {
      const copyBoards: ITodoBoard[] = JSON.parse(JSON.stringify(boards));
      const boardToUpdate = copyBoards.find(
        (copyBoard) => copyBoard.id === boardToUpdateId
      ) as ITodoBoard;
      boardToUpdate.todoItems = todoItems;

      setBoards(copyBoards);
    },
    item: ({
      itemEdit,
      currentStatus,
    }: {
      itemEdit: ITodo;
      currentStatus: string;
    }) => {
      const copyBoards: ITodoBoard[] = JSON.parse(JSON.stringify(boards));

      const board = copyBoards.find(
        (board) => board.id === currentStatus
      ) as ITodoBoard;
      const todo = board.todoItems.findIndex((item) => {
        return item.id === itemEdit.id;
      });

      const hasChangedStatus = currentStatus !== itemEdit.status;
      if (hasChangedStatus) {
        board.todoItems = board.todoItems.filter(
          (item: ITodo) => item.id !== itemEdit.id
        );
        const boardToUpdate = copyBoards.find(
          (board) => board.id === itemEdit.status
        ) as ITodoBoard;
        boardToUpdate.todoItems.unshift(itemEdit);
      } else {
        board.todoItems[todo] = { ...itemEdit };
      }
      setBoards(copyBoards);
    },
    deleteTodo: ({
      boardToUpdateId,
      todoId,
    }: {
      boardToUpdateId: string;
      todoId: string;
    }) => {
      const copyBoards: ITodoBoard[] = JSON.parse(JSON.stringify(boards));
      const boardIdx = copyBoards.findIndex(
        (board) => board.id === boardToUpdateId
      );
      copyBoards[boardIdx].todoItems = copyBoards[boardIdx].todoItems.filter(
        (todo) => todo.id !== todoId
      );
      setBoards(copyBoards);
    },
    deleteBoard: ({ boardToUpdateId }: { boardToUpdateId: string }) => {
      let copyBoards: ITodoBoard[] = JSON.parse(JSON.stringify(boards));
      copyBoards = copyBoards.filter((board) => board.id !== boardToUpdateId);
      setBoards(copyBoards);
    },
    title: async ({
      boardToUpdateId,
      newTitle,
    }: {
      boardToUpdateId: string;
      newTitle: string;
    }) => {
      const copyBoards: ITodoBoard[] = JSON.parse(JSON.stringify(boards));
      const boardToUpdate = copyBoards.find(
        (copyBoard) => copyBoard.id === boardToUpdateId
      ) as ITodoBoard;
      boardToUpdate.title = newTitle;
      setBoards(copyBoards);
    },
  };

  useEffect(() => {
    void fetchBoardsUiState.requestData();
  }, []);

  const sensors = useSensors(
    // useSensor(PointerSensor, {
    //   activationConstraint: { delay: 100, tolerance: 100 },
    // }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(MouseSensor, {
      activationConstraint: { delay: 100, tolerance: 100 },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const copyBoards: ITodoBoard[] = JSON.parse(JSON.stringify(boards));
      const boardIdx = copyBoards.findIndex(
        (item) => item.id === active.data.current.status
      );

      const oldIndex = copyBoards[boardIdx].todoItems.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = copyBoards[boardIdx].todoItems.findIndex(
        (item) => item.id === over.id
      );

      copyBoards[boardIdx].todoItems = arrayMove(
        copyBoards[boardIdx].todoItems,
        oldIndex,
        newIndex
      );
      // setActiveId(
      //   // copyBoards[1].todoItems.find((item) => item.id === active.id) as ITodo
      //   active.data.current.task
      // );
      setBoards(copyBoards);
    }
  };

  const [activeId, setActiveId] = useState<ITodo>();
  function handleDragStart(event: any) {
    // const { active } = event;
    // const { id } = active;

    // setActiveId(id);
    setActiveId(event.active.data.current.task);
  }

  function handleDragOver(event: any) {
    const { active, over } = event;
    const id = active.data?.current?.status;
    const overId = over.data?.current?.status ?? over.id;

    const activeContainer = boards.findIndex((item) => item.id === id);
    const overContainer = boards.findIndex((item) => item.id === overId);
    if (
      activeContainer === -1 ||
      overContainer === -1 ||
      activeContainer === overContainer
    ) {
      return;
    }
    updateBoards.item({
      itemEdit: { ...active.data.current.task, status: overId },
      currentStatus: active.data.current.task.status,
    });

    // setBoards((prev) => {
    //   const activeItems = prev[activeContainer];
    //   const overItems = prev[overContainer];

    //   //   // Find the indexes for the items
    //   const activeIndex = activeItems.todoItems.indexOf(id);
    //   const overIndex = overItems.todoItems.indexOf(overId);

    //   let newIndex;
    //   const has = prev.findIndex((item) => item.id === overId);
    //   if (has > 0) {
    //     // We're at the root droppable of a container
    //     newIndex = overItems.todoItems.length + 1;
    //   } else {
    //     const isBelowLastItem =
    //       over &&
    //       overIndex === overItems.todoItems.length - 1 &&
    //       draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

    //     const modifier = isBelowLastItem ? 1 : 0;

    //     newIndex =
    //       overIndex >= 0
    //         ? overIndex + modifier
    //         : overItems.todoItems.length + 1;
    //   }

    //   return {
    //     ...prev,
    //     [activeContainer]: {
    //       ...prev[activeContainer],
    //       todoItems: prev[activeContainer].todoItems.filter(
    //         (item) => item !== active.id
    //       ),
    //     },
    //     [overContainer]: {
    //       ...prev[overContainer],
    //       todoItems: [
    //         ...prev[overContainer].todoItems.slice(0, newIndex),
    //         boards[activeContainer].todoItems[activeIndex],
    //         ...prev[overContainer].todoItems.slice(
    //           newIndex,
    //           prev[overContainer].todoItems.length
    //         ),
    //       ],
    //     },
    //   };
    // });
  }
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
                    status={board.id}
                    heading={board.title}
                    selectedUser={selectedUser}
                    todoEntities={board.todoItems || []}
                    color="var(--color-brand-primary-light-1)"
                    updateBoards={updateBoards}
                    statusOptions={boards.map(({ id, title }) => {
                      return {
                        label: title,
                        id,
                      };
                    })}
                  />
                ))}
                <DragOverlay>
                  {activeId ? (
                    <Task
                      id={activeId.id}
                      item={activeId}
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
