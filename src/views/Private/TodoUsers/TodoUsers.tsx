import { useMemo, useRef, useState, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseScreen from '@/components/BaseScreen/BaseScreen';
import Btn from '@/components/Btn/Btn';
import { postTodoUser, editTodoUser } from '@/services/todoUsers.service';
import { AppDispatch, RootState } from '@/store';
import BtnLink from '@/components/BtnLink/BtnLink';
import {
  selectAllTodoUsers,
  updateTodoUser,
  todoUsersStatus,
  selectTodoUserById,
  saveTodoUser,
  setSelectedUser,
} from '@/store/todoUsers';
import { todoResolvedRouter } from '@/routes/resolvedRoutes';
import { ITodoUser } from '@/models/Todo';

import Styles from './styles';

const TextInput = lazy(
  async () => await import('@/components/TextInput/TextInput')
);

const TodoUsers = (): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');
  const [onSaveUiState, setOnSaveUiState] = useState<
    'isLoading' | 'isError' | 'idle' | 'isEdit'
  >('idle');
  const [selectedUserId, setSelectedUserId] = useState<ITodoUser['id']>('');
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllTodoUsers);
  const userByIdToEdit = useSelector((state: RootState) =>
    selectTodoUserById(state, selectedUserId)
  );
  const statusOnLoad = useSelector(todoUsersStatus);

  const handleFirstSelectedUser = (id: string) => {
    dispatch(setSelectedUser(id));
  };
  const handleChangeInput = (value: string): void => {
    setText(value);
  };
  const handleEdit = (id: string) => {
    setSelectedUserId(id);
  };
  const handleFocus = () => ref?.current?.focus?.();
  const handleReset = () => {
    setSelectedUserId('');
    setOnSaveUiState('idle');
    setText('');
  };

  const onSave = async (isFirstUser: boolean = false) => {
    const isInvalid = text === '' && statusOnLoad !== 'isEmpty';
    if (isInvalid) return;
    try {
      setOnSaveUiState('isLoading');
      const userName = isFirstUser ? 'Chuck Norris' : text;
      if (onSaveUiState === 'isEdit') {
        const user = await editTodoUser({
          name: userName,
          id: userByIdToEdit?.id as string,
        });
        dispatch(updateTodoUser(user));
      } else {
        const user = await postTodoUser(userName);
        dispatch(saveTodoUser(user));
        if (isFirstUser) {
          handleEdit(user.id);
          handleFirstSelectedUser(user.id);
        }
      }
    } catch (error) {
      setOnSaveUiState('isError');
    } finally {
      !isFirstUser && handleReset();
    }
  };

  const startEditMode =
    userByIdToEdit !== undefined && text === '' && onSaveUiState !== 'isEdit';
  if (startEditMode) {
    setOnSaveUiState('isEdit');
    setText(userByIdToEdit.name);
    handleFocus();
  }

  const renderedUsers = useMemo(
    () =>
      users.map((user) => (
        <li key={user.id}>
          {user.name}{' '}
          <Btn
            onClick={() => handleEdit(user.id)}
            disabled={onSaveUiState === 'isEdit'}
            shape="text"
            className="secondary"
          >
            <i className="fa fa-edit"></i>
          </Btn>
        </li>
      )),
    [users, onSaveUiState]
  );

  return (
    <BaseScreen
      isErrorMessage={'Sorry, something went wrong'}
      heading="Todo Users (Beta)"
      description="Todo creators"
      uiCurrentState={statusOnLoad}
      onEmpty={async () => await onSave(true)}
    >
      <Styles.Section>
        <Styles.Creation>
          <TextInput
            error={
              onSaveUiState === 'isError' ? 'Sorry, something went wrong' : ''
            }
            value={text}
            ref={ref}
            label={'Create a new user'}
            placeholder={'Chuck Norris'}
            onChange={(e) => handleChangeInput(e?.target?.value)}
            disabled={onSaveUiState === 'isLoading'}
          />
          <Btn
            isLoading={onSaveUiState === 'isLoading'}
            onClick={async () => await onSave()}
            disabled={text === ''}
          >
            Save it!
          </Btn>
          {users.length > 0 && (
            <BtnLink
              style={{ alignSelf: 'center' }}
              className="secondary"
              to={todoResolvedRouter}
            >
              Create to-dos!
            </BtnLink>
          )}
        </Styles.Creation>
        <ul>{renderedUsers}</ul>
      </Styles.Section>
    </BaseScreen>
  );
};

export default TodoUsers;
