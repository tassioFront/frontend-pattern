import ImgLazyLoad from '@/components/ImgLazyLoad/ImgLazyLoad';
import styled from 'styled-components';

export const imageSize = '200';

export default {
  ImgLazyLoad: styled(ImgLazyLoad)`
    border-radius: 50%;
  `,
  Content: styled.div`
    min-height: ${imageSize}px;
    min-width: ${imageSize}px;
  `,
};
