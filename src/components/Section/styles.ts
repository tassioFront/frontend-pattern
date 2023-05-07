import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Wrapper: styled.section<{ space: number }>`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    margin: var(--spacing-xlarge) 0;
    flex-direction: column;

    ${media.greaterThan('tablet')`
      margin: var(--spacing-xxxlarge) 0;
    `}

    &:not(header) > * {
      margin: ${(props) => String(props.space) + 'px'} 0;

      ${media.greaterThan<{ space: number }>('tablet')`
        margin: ${(props) => String(props.space * 1.5)}px 0;
      `}
    }
  `,
  Header: styled.header`
    margin-bottom: var(--spacing-large);
    text-align: left;
    width: 100%;

    ${media.greaterThan('tablet')`
      margin-bottom: var(--spacing-xlarge);
    `}
  `,
};

export default Styles;
