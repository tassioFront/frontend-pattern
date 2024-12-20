import { media } from '@/styles/media';
import styled from 'styled-components';

interface HandleSection {
  space: number;
}

const Styles = {
  Wrapper: styled.section<HandleSection>`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    margin: var(--spacing-xlarge) 0;
    flex-direction: column;

    ${media.greaterThan('tablet')`
      margin: var(--spacing-xxxlarge) 0;
    `}

    & > article, > div, > section {
      margin: ${(props) => String(props.space) + 'px'} 0;

      ${media.greaterThan('tablet')`
        margin: ${(props: HandleSection) => String(props.space * 1.5)}px 0;
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
