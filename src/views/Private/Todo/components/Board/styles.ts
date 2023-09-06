import { media } from '@/styles/media';
import styled from 'styled-components';
import Btn from '@/components/Btn/Btn';

export default {
  Wrapper: styled.article`
    border-radius: 4px;
    border: 1px solid gray;
    position: relative;
    width: 100%;

    ${media.greaterThan('desktopMax')`
    max-width: 350px;
    `}
  `,
  Content: styled.div`
    padding: var(--spacing-small);
    overflow-x: auto;
    display: flex;
    gap: var(--spacing-base);
    flex-direction: column;
    flex-wrap: wrap;
    height: 350px;

    ${media.greaterThan('desktopMax')`
      height: auto;
      min-height: 100vh;
      flex-wrap: nowrap;
    `}
  `,
  Btn: styled(Btn)`
    position: absolute;
    top: var(--spacing-small);
    right: var(--spacing-small);
  `,
};
