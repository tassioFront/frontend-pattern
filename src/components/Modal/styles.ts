import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Wrapper: styled.div<{ isOpen: boolean }>`
    background-color: rgba(0, 0, 0, 0.75);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease-in-out;
    transform: ${({ isOpen }) =>
      isOpen ? 'translateY(0)' : 'translateY(-100%); visibility: hidden;'};
    z-index: var(--zindex-5);
  `,
  Header: styled.div`
    display: flex;
    flex-direction: column;
    padding: var(--spacing-base);
    position: relative;

    & button {
      position: absolute;
      right: 0;
      top: -10%;

      ${media.greaterThan('tablet')`
      top: 0;
    `}
    }
  `,
  Content: styled.article`
    background-color: var(--color-neutral-regular);
    display: flex;
    flex-direction: column;
    padding: var(--spacing-large) var(--spacing-base);
    height: 100%;
    position: absolute;
    width: 100%;

    ${media.greaterThan('tablet')`
      border-radius: var(--border-radius);
      left: 50%;
      height: 70%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
    `}
  `,
  Actions: styled.div`
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
    padding-top: var(--spacing-base);
    width: 100%;

    ${media.greaterThan('tablet')`
      padding-top: var(--spacing-large);
    `}
  `,
};

export default Styles;
