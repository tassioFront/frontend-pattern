import styled from 'styled-components';

import { media } from '@/styles/media';

interface HandleMenu {
  open: boolean;
}

const Styles = {
  Burger: styled.div<HandleMenu>`
    cursor: pointer;
    display: flex;
    border: none;
    left: var(--spacing-base);
    flex-direction: column;
    justify-content: space-around;
    height: var(--spacing-large);
    width: var(--spacing-large);
    margin: var(--spacing-small);
    position: absolute;
    top: var(--spacing-small);
    z-index: var(--zindex-5);

    ${media.greaterThan('tablet')`
      display: none;
    `}

    span {
      width: 100%;
      height: var(--spacing-xxsmall);
      background: var(--color-brand-secondary-regular);
      border-radius: 10px;
      transition: all 0.3s linear;
      transform-origin: 1px;
      will-change: transform opacity;

      :first-child {
        transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
      }

      :nth-child(2) {
        opacity: ${({ open }) => (open ? '0' : '1')};
        transform: ${({ open }) =>
          open ? 'translateX(20px)' : 'translateX(0)'};
      }

      :nth-child(3) {
        transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
      }
    }
  `,
  Menu: styled.nav<HandleMenu>`
    display: flex;
    text-align: left;

    ${media.lessThan<HandleMenu>('tablet')`
      background: var(--color-neutral-regular);
      transform: ${({ open }) =>
        open ? 'translateX(0)' : 'translateX(-100%)'};
      height: 100vh;
      flex-direction: column;
      justify-content: flex-start;
      padding: var(--spacing-giant) var(--spacing-large);
      position: absolute;
      top: 0;
      left: 0;
      transition: transform 0.3s ease-in-out;
      z-index: var(--zindex-5); 

      a {
        min-width: 200px;
      }
    `}
  `,
  OverLay: styled.div`
    background-color: transparent;
    transition: transform 3s ease-in-out;
    will-change: background-color position width height z-index;

    &.isOpen {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: var(--zindex-1);
      background-color: rgba(0, 0, 0, 0.75);
    }
  `,
};

export default Styles;
