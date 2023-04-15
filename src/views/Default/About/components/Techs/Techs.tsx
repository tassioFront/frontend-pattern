import ChipGroup from '@/components/Chips/ChipGroup';
import Chip from '@/components/Chips/Chip';
import { IContent } from '../../content';

const Techs = ({ techs }: { techs: IContent['techs'] }): JSX.Element => {
  return (
    <ChipGroup>
      {techs.map((tech) => (
        <Chip key={tech} label={tech} type="--color-brand-secondary-dark-1" />
      ))}
    </ChipGroup>
  );
};

export default Techs;
