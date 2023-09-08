import { useEffect, lazy } from 'react';
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
  progressBar,
} from '@/store/todo';
import { todoSelectedUser } from '@/store/todoUsers';

import Styles from './styles';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
const Board = lazy(async () => await import('./components/Board/Board'));
const UserSelect = lazy(
  async () => await import('./components/UserSelect/UserSelect')
);

const Todo = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const todoEntities = useSelector(selectAllTodo);
  const selectedUser = useSelector(todoSelectedUser) as ITodoUser;
  const todoIdsList = useSelector(todoIds);
  const inprogressIdsList = useSelector(inprogressIds);
  const doneIdsList = useSelector(doneIds);
  const progress = useSelector(progressBar);
  const statusOnLoad = useSelector(todoStatus);

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
      <ProgressBar progress={String(progress)} />
      <Styles.Section>
        {selectedUser !== null ? (
          <>
            <UserSelect selectedUserId={selectedUser.id} />
            <Board
              key="todo"
              selectedUser={selectedUser}
              todoEntities={todoEntities}
              order={todoIdsList}
            />
            <Board
              key="inProgress"
              status="inProgress"
              heading="in progress"
              selectedUser={selectedUser}
              todoEntities={todoEntities}
              order={inprogressIdsList}
              color="var(--color-brand-primary-light-1)"
            />
            <Board
              key="done"
              status="done"
              heading="done"
              selectedUser={selectedUser}
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
