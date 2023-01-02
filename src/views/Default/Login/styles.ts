import BtnLink from '@/components/BtnLink/BtnLink';
import styled from 'styled-components';

export default {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  `,
  BtnLink: styled(BtnLink)`
    align-self: center;
  `,
};
