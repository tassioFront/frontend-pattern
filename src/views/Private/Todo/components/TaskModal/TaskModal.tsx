import { memo, useState, lazy } from 'react';
import { ITodo, ITodoUser } from '@/models/Todo';
import Modal from '@/components/Modal/Modal';
import { useSelector } from 'react-redux';
import { selectAllTodoUsers } from '@/store/todoUsers';
import { createTodo, updateTodoById } from '@/services/todo.service';
import { todoCy } from '@/enums/dataCy';
import Styles from './styles';
import TextareaInput from '@/components/TextareaInput/TextareaInput';
import { IBoardActions } from '../../types';

const TextInput = lazy(
  async () => await import('@/components/TextInput/TextInput')
);

export interface TaskModalTypes {
  isOpen: boolean;
  selectedUser: ITodoUser;
  task: ITodo;
  setTask: (task: ITodo) => void;
  handleReset: () => void;
  boardActions: IBoardActions;
  statusOptions: any;
  boardId: string;
}

const TaskModal = memo(function TaskModal({
  isOpen,
  selectedUser,
  task,
  setTask,
  handleReset,
  statusOptions,
  boardActions,
  boardId,
}: TaskModalTypes) {
  const [onSubmitUiState, setOnSubmitUiState] = useState<
    'isLoading' | 'isError' | 'idle' | 'isEdit'
  >('idle');
  const users = useSelector(selectAllTodoUsers);

  const handleChange = (value: string, key: keyof ITodo) => {
    setTask({ ...task, [key]: value });
  };
  const handleResetModal = () => {
    setOnSubmitUiState('idle');
    handleReset();
  };
  const handleClose = () => {
    handleResetModal();
  };

  const isEditModel = !!task.id;

  const onSubmit = async () => {
    const isInvalid = task.title === '' && task.description === '';
    if (isInvalid) return;

    try {
      setOnSubmitUiState('isLoading');
      if (isEditModel) {
        const response = await updateTodoById({
          updatedTodo: task,
          todoId: task.id,
        });
        boardActions.updateTodoByBoardId({
          itemEdit: response,
          currentStatus: boardId,
        });
      } else {
        const response = await createTodo({
          todo: { ...task, authorId: selectedUser.id },
          boardId,
        });
        boardActions.replaceBoardTodos({
          todoItems: response,
          currentStatus: boardId,
        });
      }
      handleResetModal();
    } catch (error) {
      setOnSubmitUiState('isError');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={isEditModel ? 'Task edition' : 'Create a new task'}
      onClose={handleClose}
      onSubmit={onSubmit}
      onSubmitText="Save it!"
      isSubmitLoading={onSubmitUiState === 'isLoading'}
    >
      <TextInput
        value={task.title}
        label={'Task title'}
        onChange={(e) => handleChange(e.target.value, 'title')}
        maxLength={20}
        data-cy={todoCy.modalTitle}
      ></TextInput>

      <Styles.SelectInput
        data-cy={todoCy.modalStatus}
        options={statusOptions}
        value={task.boardId}
        label="Select the task status!"
        onChange={(e) => handleChange(e.target.value, 'boardId')}
      />

      <Styles.SelectInput
        data-cy={todoCy.modalAssigned}
        value={task.assignedId}
        options={users.map((user) => {
          return { id: user.id, label: user.name };
        })}
        label="Select who is gonna solve it!"
        onChange={(e) => handleChange(e.target.value, 'assignedId')}
      />
      <TextareaInput
        label="Type a nice description"
        placeholder="A nice description"
        data-cy={todoCy.modalDesc}
        value={task.description}
        maxLength={200}
        onChange={(e) => handleChange(e.target.value, 'description')}
      />
    </Modal>
  );
});

export default TaskModal;
