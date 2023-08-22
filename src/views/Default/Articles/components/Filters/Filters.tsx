import { memo } from 'react';
import Btn from '@/components/Btn/Btn';
import Modal from '@/components/Modal/Modal';
import AssociatedChips from '@/components/AssociatedChips/AssociatedChips';
import { IArticle } from '@/models/Article';
import TextInput from '@/components/TextInput/TextInput';
import Styles from './styles';
import { ISearch } from '../../types';

interface FiltersTypes {
  tags: IArticle['tag_list'];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleSearchText: (value: string) => void;
  handleSearchTags: (value: string) => void;
  selectedTags: ISearch['byTags'];
}
const Filters = memo(function Filters({
  tags,
  isOpen,
  onOpen,
  onClose,
  handleSearchText,
  handleSearchTags,
  selectedTags,
}: FiltersTypes) {
  return (
    <Styles.Wrapper>
      <TextInput
        label="Search an article by title"
        onChange={(e) => handleSearchText(e.target.value)}
      />
      <Styles.Content>
        <Styles.Total>{selectedTags.length || ''}</Styles.Total>
        <Btn
          className="secondary"
          shape="text"
          onClick={onOpen}
          disabled={tags.length === 0}
        >
          <i className={`fa fa-filter`} aria-label="close modal"></i>
        </Btn>
        <span>{selectedTags.join(', ')}</span>
      </Styles.Content>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Filter-ish by tag"
        description="These tags do not filter yet, it is for teaching purposes."
      >
        <AssociatedChips
          options={tags}
          selected={selectedTags}
          onClick={(value: string) => handleSearchTags(value)}
        />
      </Modal>
    </Styles.Wrapper>
  );
});

export default Filters;
