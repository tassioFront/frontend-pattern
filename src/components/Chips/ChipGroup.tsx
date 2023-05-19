import { useCallback, useEffect } from 'react';
import Styles from './styles';
import { isPRD } from '@/enums/envs';
import { chipsTexts } from './content';

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
      console.error(chipsTexts.onError);
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
