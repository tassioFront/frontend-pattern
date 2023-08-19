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
  hasOffSw: boolean | null;
  onOpen: () => void;
  onClose: () => void;
}
const Filters = memo(function Filters({
  tags,
  isOpen,
  onOpen,
  onClose,
  hasOffSw,
}: FiltersTypes) {
  return (
    <Styles.Wrapper>
      {tags.length === 0 && hasOffSw !== null && <span>working...</span>}
      <Btn
        className="secondary"
        shape="text"
        onClick={onOpen}
        disabled={tags.length === 0}
      >
        <i className={`fa fa-filter`} aria-label="close modal"></i>
      </Btn>
      {/* @todo[web-worker-article]: this is for teaching purposes. See the article here: https://dev.to/tassiofront/avoid-overloading-the-main-thread-with-web-workers-557c */}
      {hasOffSw !== null && (
        <>
          <label htmlFor="click">Click!</label>
          <input type="checkbox" id="click" />
        </>
      )}
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
