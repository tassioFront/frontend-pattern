import { memo } from 'react';
import Styles from './styles';
import { ITodo } from '@/models/Todo';
import Btn from '@/components/Btn/Btn';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectTodoUserById } from '@/store/todoUsers';

export interface TaskTypes {
  className?: string;
  color: string;
  item: ITodo;
  onClick: () => void;
  handleDelete: () => void;
  isDeleteLoading: boolean;
}

const Task = memo(function Task({
  className,
  color,
  item,
  isDeleteLoading,
  onClick,
  handleDelete,
}: TaskTypes) {
  const assigned = useSelector((state: RootState) =>
    selectTodoUserById(state, item.assignedId)
  );

  return (
    <Styles.Wrapper className={className} color={color} onClick={onClick}>
      <Styles.Header onClick={(e) => e.stopPropagation()}>
        <strong>{item.title}</strong>
        <Btn
          className="secondary"
          shape="text"
          onClick={handleDelete}
          isLoading={isDeleteLoading}
        >
          <i className={`fa fa-times-circle`} aria-label="close modal"></i>
        </Btn>
      </Styles.Header>
      <hr />
      <Styles.Content>
        {item.description.length > 78
          ? item.description.slice(0, 78) + '...'
          : item.description}
      </Styles.Content>
      <Styles.Footer>
        <Styles.Avatar>{assigned?.name.slice(0, 1)}</Styles.Avatar>
      </Styles.Footer>
    </Styles.Wrapper>
  );
});

export default Task;
