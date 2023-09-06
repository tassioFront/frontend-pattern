import { memo, useState } from 'react';
import { ITodo, ITodoUser } from '@/models/Todo';
import Modal from '@/components/Modal/Modal';
import TextInput from '@/components/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTodoUsers } from '@/store/todoUsers';
import { postTodo, putTodo } from '@/services/todo.service';
import { saveTodo, updateTodo } from '@/store/todo';
import { AppDispatch } from '@/store';

export interface TaskModalTypes {
  isOpen: boolean;
  selectedUser: ITodoUser;
  task: ITodo;
  setIsOpen: (value: boolean) => void;
  setTask: (task: ITodo) => void;
  handleReset: () => void;
}

const TaskModal = memo(function TaskModal({
  isOpen,
  selectedUser,
  task,
  setTask,
  handleReset,
}: TaskModalTypes) {
  const [onSubmitUiState, setOnSubmitUiState] = useState<
    'isLoading' | 'hasError' | 'idle' | 'isEdit'
  >('idle');

  const dispatch = useDispatch<AppDispatch>();
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

    let hasSucceed = true;
    try {
      setOnSubmitUiState('isLoading');
      if (isEditModel) {
        const todo = await putTodo(task);
        dispatch(updateTodo(todo));
      } else {
        const response = await postTodo({ ...task, authorId: selectedUser.id });
        dispatch(saveTodo(response));
      }
    } catch (error) {
      hasSucceed = false;
      setOnSubmitUiState('hasError');
    } finally {
      hasSucceed && handleResetModal();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Create a new task"
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
      ></TextInput>
      {/* @todo[wrappers]: create custom components later */}
      <label>
        Type a nice description
        <textarea
          placeholder="A nice description"
          value={task.description}
          onChange={(e) => handleChange(e.target.value, 'description')}
          maxLength={200}
        />
      </label>
      <label>
        Select the task status!
        <select
          value={task.status}
          onChange={(e) => handleChange(e.target.value, 'status')}
        >
          <option value="todo">todo</option>
          <option value="inProgress">inProgress</option>
          <option value="done">done</option>
        </select>
      </label>

      <label>
        Select who is gonna solve it!
        <select
          value={task.assignedId}
          onChange={(e) => handleChange(e.target.value, 'assignedId')}
        >
          {users.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </label>
    </Modal>
  );
});

export default TaskModal;
