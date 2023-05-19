import { useCallback, useEffect } from 'react';
import Styles from './styles';
import { isPRD } from '@/enums/envs';

interface ChipGroupTypes {
  className?: string;
  children: JSX.Element[];
}

const ChipGroup = ({
  children,
  className,
  ...rest
}: ChipGroupTypes): JSX.Element => {
  const validateComponentByName = useCallback(() => {
    const hasAllowedComponent =
      !isPRD &&
      children.some((child) => {
        const name = child.type.name ?? child.type.displayName;
        return name?.includes?.('Chip');
      });
    if (!hasAllowedComponent) {
      console.error(
        'Please, just use Chip components inside ChipGroup components!'
      );
    }
    return hasAllowedComponent;
  }, [children]);
  useEffect(() => {
    validateComponentByName();
  }, []);
  return (
    <Styles.ChipGroup className={className} {...rest}>
      {children}
    </Styles.ChipGroup>
  );
};

export default ChipGroup;
