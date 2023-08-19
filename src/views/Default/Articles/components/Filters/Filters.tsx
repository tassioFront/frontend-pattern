import { memo } from 'react';
import Btn from '@/components/Btn/Btn';
import Modal from '@/components/Modal/Modal';
import ChipGroup from '@/components/Chips/ChipGroup';
import { IArticle } from '@/models/Article';
import Chip from '@/components/Chips/Chip';
import Styles from './styles';

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
        <ChipGroup>
          {tags.map((tag) => (
            <Chip
              key={tag}
              color="--color-brand-secondary-light-1"
              label={tag}
              type="tag"
            />
          ))}
        </ChipGroup>
      </Modal>
    </Styles.Wrapper>
  );
});

export default Filters;
