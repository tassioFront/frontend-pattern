import { media } from '@/styles/media';
import styled from 'styled-components';
import ImgLazyLoad from '@/components/ImgLazyLoad/ImgLazyLoad';
import Card from '@/components/Card/Card';

const Styles = {
  Wrapper: styled(Card)`
    width: 100%;
    max-width: 300px;

    ${media.greaterThan('tablet')`
      min-height: 500px;
    `}

    h3 {
      font: var(--title-headline-xsmall);
      letter-spacing: var(--title-headline-xsmall-letter);
      margin-top: var(--spacing-small);
    }
  `,
  Floating: styled.span`
    i {
      color: var(--color-contextual-error-regular);
      margin-right: var(--spacing-xxsmall);
    }
  `,
  Content: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  ImgLazyLoad: styled(ImgLazyLoad)`
    border-radius: 50%;
    object-fit: cover;
  `,
  BtnLink: styled.a`
    align-self: flex-end;
  `,
};

export default Styles;
