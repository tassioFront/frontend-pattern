import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Wrapper: styled.article`
    align-items: center;
    border: 1px solid var(--color-neutral-light-5);
    border-radius: var(--spacing-small);
    display: flex;
    flex-direction: column;
    padding: var(--spacing-base);
    position: relative;
    justify-content: center;
    transition: 0.3s ease-in-out;
    will-change: border;

    ${media.greaterThan('tablet')`
      justify-content: space-between;
    `}

    &:hover {
      border: 1px solid var(--color-neutral-light-1);
    }
  `,
  Floating: styled.div`
    left: 0;
    padding: var(--spacing-small);
    position: absolute;
    top: 0;
  `,
  Content: styled.div`
    margin-top: var(--spacing-small);
    width: 100%;
  `,
  Actions: styled.div`
    display: flex;
    justify-content: end;
    flex-direction: column;
    width: 100%;

    hr {
      margin-bottom: var(--spacing-medium);
    }
  `,
};

export default Styles;
