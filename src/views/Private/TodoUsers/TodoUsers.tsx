import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseScreen from '@/components/BaseScreen/BaseScreen';
import Btn from '@/components/Btn/Btn';
import TextInput from '@/components/TextInput/TextInput';
import { postTodoUser, editTodoUser } from '@/services/todoUsers.service';
import { AppDispatch, RootState } from '@/store';
import {
  selectAllTodoUsers,
  updateTodoUser,
  todoUsersStatus,
  selectTodoUserById,
  saveTodoUser,
} from '@/store/todoUsers';
import Styles from './styles';

const TodoUsers = (): JSX.Element => {
  const ref = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [onSaveUiState, setOnSaveUiState] = useState<
    'isLoading' | 'hasError' | 'idle' | 'isEdit'
  >('idle');
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllTodoUsers);
  const userById = useSelector((state: RootState) =>
    selectTodoUserById(state, selectedUser)
  );

  const statusOnLoad = useSelector(todoUsersStatus);

  const handleChangeInput = (value: string): void => {
    setText(value);
  };
  const handleEdit = (id: string) => {
    setSelectedUser(id);
  };
  const handleFocus = () => ref?.current?.focus?.();
  const handleReset = () => {
    setSelectedUser('');
    setOnSaveUiState('idle');
    setText('');
  };

  const onSave = async (isEmpty: boolean = false) => {
    const isInvalid = text === '' && statusOnLoad !== 'isEmpty';
    if (isInvalid) return;
    try {
      setOnSaveUiState('isLoading');
      const userName = isEmpty ? 'Chuck Norris' : text;
      if (onSaveUiState === 'isEdit') {
        const user = await editTodoUser({
          name: userName,
          id: userById?.id as string,
        });
        dispatch(updateTodoUser(user));
      } else {
        const user = await postTodoUser(userName);
        dispatch(saveTodoUser(user));
        isEmpty && handleEdit(user.id);
      }
    } catch (error) {
      setOnSaveUiState('hasError');
    } finally {
      !isEmpty && handleReset();
    }
  };

  const startEditMode =
    userById !== undefined && text === '' && onSaveUiState !== 'isEdit';
  if (startEditMode) {
    setOnSaveUiState('isEdit');
    setText(userById.name);
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
              onSaveUiState === 'hasError' ? 'Sorry, something went wrong' : ''
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
        </Styles.Creation>
        <ul>{renderedUsers}</ul>
      </Styles.Section>
    </BaseScreen>
  );
};

export default TodoUsers;
