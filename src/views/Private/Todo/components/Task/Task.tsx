import { memo } from 'react';
import Styles from './styles';
import { ITodo } from '@/models/Todo';
import Btn from '@/components/Btn/Btn';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectTodoUserById } from '@/store/todoUsers';
import { todoCy } from '@/enums/dataCy';

export interface TaskTypes {
  className?: string;
  item: ITodo;
  onClick: () => void;
  handleDelete: () => void;
  isDeleteLoading: boolean;
}

const Task = memo(function Task({
  className,
  item,
  isDeleteLoading,
  onClick,
  handleDelete,
}: TaskTypes) {
  const assigned = useSelector((state: RootState) =>
    selectTodoUserById(state, item.assignedId)
  );

  return (
    <Styles.Wrapper
      className={className}
      onClick={onClick}
      data-cy={todoCy.task + item.status}
    >
      <Styles.Header onClick={(e) => e.stopPropagation()}>
        <strong>{item.title}</strong>
        <Btn
          className="secondary"
          shape="text"
          onClick={handleDelete}
          isLoading={isDeleteLoading}
          data-cy={todoCy.taskBtn + item.status}
        >
          <i
            title="Delete task"
            className={`fa fa-times-circle`}
            aria-label="Delete taskl"
          ></i>
        </Btn>
      </Styles.Header>
      <hr />
      <Styles.Content title="Click to edit the task">
        {item.description.length > 78
          ? item.description.slice(0, 78) + '...'
          : item.description}
      </Styles.Content>
      <Styles.Footer>
        <Styles.Avatar title={assigned?.name}>
          {assigned?.name.slice(0, 1)}
        </Styles.Avatar>
      </Styles.Footer>
    </Styles.Wrapper>
  );
});

export default Task;
