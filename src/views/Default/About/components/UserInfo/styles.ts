import ImgLazyLoad from '@/components/ImgLazyLoad/ImgLazyLoad';
import styled from 'styled-components';

export const imageSize = '200';

export default {
  ImgLazyLoad: styled(ImgLazyLoad)`
    border-radius: 50%;
  `,
  Content: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    min-height: ${imageSize}px;
    min-width: ${imageSize}px;
    text-align: center;
    width: 100%;
  `,
};
