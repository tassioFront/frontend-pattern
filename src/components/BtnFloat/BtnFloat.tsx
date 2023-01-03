import { useScroll } from '@/hooks/useScroll/useScroll';
import { useState } from 'react';
import { BtnTypes } from '../Btn/Btn';

import Styles from './styles';

interface BtnFloatTypes extends BtnTypes {
  showNumber: number;
}
const BtnFloat = (props: BtnFloatTypes): JSX.Element => {
  const [isShowBtn, setIsShowBtn] = useState(false);
  useScroll(() => setIsShowBtn(window.scrollY > props.showNumber));

  return <Styles.Btn className={isShowBtn ? 'show' : ''} {...props} />;
};

export default BtnFloat;
