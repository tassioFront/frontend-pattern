import { useCallback, useEffect } from 'react';
import Styles from './styles';
import { isPRD } from '@/enums/envs';

interface ChipGroupTypes {
  className?: string;
  children: JSX.Element[];
}

const ChipGroup = ({ children, className }: ChipGroupTypes): JSX.Element => {
  const validateComponentByName = useCallback(() => {
    const hasNotAllowedComponent =
      !isPRD &&
      children.some((child) => {
        const name = child.type.name ?? child.type.displayName;
        return name?.includes?.('Chip');
      });
    if (hasNotAllowedComponent) {
      console.error(
        'Please, just use Chip components inside ChipGroup components only!'
      );
    }
    return hasNotAllowedComponent;
  }, [children]);
  useEffect(() => {
    validateComponentByName();
  }, []);
  return <Styles.ChipGroup className={className}>{children}</Styles.ChipGroup>;
};

export default ChipGroup;
