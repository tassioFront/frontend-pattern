import styled from 'styled-components';
import Card from '@/components/Card/Card';
import BtnLink from '@/components/BtnLink/BtnLink';

const Styles = {
  Wrapper: styled(Card)`
    width: 100%;
    max-width: 300px;

    h3 {
      font: var(--title-headline-xsmall);
      letter-spacing: var(--title-headline-xsmall-letter);
      margin-top: var(--spacing-small);
    }
  `,

  Content: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  BtnLink: styled(BtnLink)`
    align-self: flex-end;
  `,
};

export default Styles;
