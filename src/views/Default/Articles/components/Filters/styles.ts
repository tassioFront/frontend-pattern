import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Wrapper: styled.div`
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    width: 100%;

    ${media.greaterThan('mobileMax')`
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
    `}

    input {
      max-width: 300px;
    }
  `,
  Content: styled.div`
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    position: relative;

    span {
      font-size: var(--spacing-small);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100px;
    }
  `,
  Total: styled.span`
    position: absolute;
    right: var(--spacing-small);
    top: var(--spacing-xxsmall);
    color: var(--color-brand-secondary-regular);
  `,
};

export default Styles;
