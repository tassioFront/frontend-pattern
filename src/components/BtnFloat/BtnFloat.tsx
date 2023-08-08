import { useScroll } from '@/hooks/useScroll/useScroll';
import { useState } from 'react';
import { BtnTypes } from '../Btn/Btn';
import { goToTop } from '@/helpers/goTo';

import Styles from './styles';

interface BtnFloatTypes extends Omit<BtnTypes, 'onClick'> {
  showNumber?: number;
}
const BtnFloat = (props: BtnFloatTypes): JSX.Element => {
  const [isShowBtn, setIsShowBtn] = useState(false);
  const showNumber = props.showNumber ?? 700;
  useScroll(() => setIsShowBtn(window.scrollY > showNumber));

  return (
    <Styles.Btn className={isShowBtn ? 'show' : ''} onClick={goToTop}>
      Go to top
    </Styles.Btn>
  );
};

export default BtnFloat;
