import { memo } from 'react';
import Styles from './styles';
import Btn from '@/components/Btn/Btn';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
export interface DragOverlayTypes {
  className?: string;
  id: string;
}

const DragOverlay = memo(function DragOverlay({ id }: DragOverlayTypes) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Styles.Wrapper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Styles.Header>
        <strong></strong>
        <Btn className="secondary" shape="text" onClick={() => null}>
          <i
            title="Delete task"
            className={`fa fa-times-circle`}
            aria-label="Delete taskl"
          ></i>
        </Btn>
      </Styles.Header>
      <hr />
      <Styles.Content title="Click to edit the task"></Styles.Content>
      <Styles.Footer>
        <Styles.Avatar></Styles.Avatar>
      </Styles.Footer>
    </Styles.Wrapper>
  );
});

export default DragOverlay;
