import { memo } from 'react';
import Btn from '@/components/Btn/Btn';
import Modal from '@/components/Modal/Modal';
import { IArticle } from '@/models/Article';
import Styles from './styles';
import AssociatedChips from '@/components/AssociatedChips/AssociatedChips';

interface FiltersTypes {
  tags: IArticle['tag_list'];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const Filters = memo(function Filters({
  tags,
  isOpen,
  onOpen,
  onClose,
}: FiltersTypes) {
  return (
    <Styles.Wrapper>
      <Btn
        className="secondary"
        shape="text"
        onClick={onOpen}
        disabled={tags.length === 0}
      >
        <i className={`fa fa-filter`} aria-label="close modal"></i>
      </Btn>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Filter-ish by tag"
        description="These tags do not filter yet, it is for teaching purposes."
      >
        <AssociatedChips options={tags} />
      </Modal>
    </Styles.Wrapper>
  );
});

export default Filters;
