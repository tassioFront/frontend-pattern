import { useScroll } from '@/hooks/useScroll/useScroll';
import { useState } from 'react';
import { BtnTypes } from '../Btn/Btn';
import { goToTop } from '@/helpers/goTo';

import Styles from './styles';
import { btn } from '@/enums/dataCy';

interface BtnFloatTypes extends Omit<BtnTypes, 'onClick'> {
  showNumber?: number;
  dataTestid?: string;
  label?: string;
  onClick?: () => void;
}
const BtnFloat = (props: BtnFloatTypes): JSX.Element => {
  const [isShowBtn, setIsShowBtn] = useState(false);
  const showNumber = props.showNumber ?? 700;
  useScroll(() => setIsShowBtn(window.scrollY > showNumber));

  return (
    <Styles.Btn
      className={isShowBtn ? 'show' : ''}
      onClick={props.onClick ?? goToTop}
      data-testid={props.dataTestid}
      isLoading={props.isLoading}
      data-cy={btn.float}
    >
      {props.label ?? 'Go to top'}
    </Styles.Btn>
  );
};

export default BtnFloat;
