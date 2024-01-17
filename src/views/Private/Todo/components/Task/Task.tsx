import { memo } from 'react';
import Styles from './styles';
import { ITodo } from '@/models/Todo';
import Btn from '@/components/Btn/Btn';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectTodoUserById } from '@/store/todoUsers';
import { todoCy } from '@/enums/dataCy';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
export interface TaskTypes {
  className?: string;
  item: ITodo;
  onClick: () => void;
  handleDelete: () => void;
  isDeleteLoading: boolean;
  id: string;
}

const Task = memo(function Task({
  className,
  item,
  isDeleteLoading,
  onClick,
  handleDelete,
  id,
}: TaskTypes) {
  const assigned = useSelector((state: RootState) =>
    selectTodoUserById(state, item.assignedId)
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        status: item.status,
        task: {
          ...item,
        },
      },
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Styles.Wrapper
      className={className}
      onClick={onClick}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-cy={todoCy.task + id}
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
