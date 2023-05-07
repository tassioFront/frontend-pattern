import { useCallback, useEffect } from 'react';
import Styles from './styles';

interface ChipGroupTypes {
  children: JSX.Element[];
}

const ChipGroup = ({ children, ...rest }: ChipGroupTypes): JSX.Element => {
  const validateComponentByName = useCallback(() => {
    const hasNotAllowedComponent = children.some(
      (child) => child.type.name !== 'Chip'
    );
    console.log(children.map((children) => children.type.name));
    if (hasNotAllowedComponent) {
      console.error(
        'Please, just use Chip components inside ChipGroup components!'
      );
    }
  }, [children]);
  useEffect(() => {
    validateComponentByName();
  }, []);
  return <Styles.ChipGroup {...rest}>{children}</Styles.ChipGroup>;
};

export default ChipGroup;
