import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseScreen from '@/components/BaseScreen/BaseScreen';
import { AppDispatch } from '@/store';
import { ITodoUser } from '@/models/Todo';
import BtnLink from '@/components/BtnLink/BtnLink';
import { todoUsersResolvedRouter } from '@/routes/resolvedRoutes';
import {
  getAllTodo,
  selectAllTodo,
  todoStatus,
  doneIds,
  inprogressIds,
  todoIds,
} from '@/store/todo';
import {
  selectAllTodoUsers,
  todoSelectedUser,
  setSelectedUser,
} from '@/store/todoUsers';

import Styles from './styles';
import Board from './components/Board/Board';
import UserSelect from './components/UserSelect/UserSelect';

const Todo = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const todoEntities = useSelector(selectAllTodo);
  const users = useSelector(selectAllTodoUsers);
  const selectedUser = useSelector(todoSelectedUser) as ITodoUser;
  const doneIdsList = useSelector(doneIds);
  const inprogressIdsList = useSelector(inprogressIds);
  const todoIdsList = useSelector(todoIds);
  const statusOnLoad = useSelector(todoStatus);

  const handleSelectedUser = (id: string) => {
    dispatch(setSelectedUser(id));
  };

  useEffect(() => {
    const isEmpty = Object.keys(todoEntities).length === 0;
    if (isEmpty) {
      void dispatch(getAllTodo());
    }
  }, []);

  return (
    <BaseScreen
      heading="To-do List (Beta)"
      description="That to-do list you love ;). It's a Beta version - My to-do list is on a roll!"
      isErrorMessage={'Sorry, something went wrong'}
      uiCurrentState={statusOnLoad}
    >
      <Styles.Section>
        {users.length > 0 ? (
          <>
            <UserSelect
              users={users}
              selectedUserId={selectedUser.id}
              handleSelectedUser={handleSelectedUser}
            />
            <Board
              key="todo"
              selectedUser={selectedUser}
              todoEntities={todoEntities}
              order={todoIdsList}
            />
            <Board
              status="inProgress"
              key="inProgress"
              selectedUser={selectedUser}
              heading="in progress"
              todoEntities={todoEntities}
              order={inprogressIdsList}
              color="var(--color-brand-primary-light-1)"
            />
            <Board
              status="done"
              key="done"
              selectedUser={selectedUser}
              heading="done"
              todoEntities={todoEntities}
              order={doneIdsList}
              color="var(--color-contextual-success-light-1)"
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
