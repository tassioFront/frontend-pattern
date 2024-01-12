import { media } from '@/styles/media';
import styled from 'styled-components';
import EditableTypography from '@/components/EditableTypography/EditableTypography';
import Btn from '@/components/Btn/Btn';

export default {
  Wrapper: styled.article`
    border-radius: 10px;
    border: 1px solid gray;
    display: flex;
    flex-flow: column;
    position: relative;
    width: 100%;
    /* overflow-y: auto; */
    min-width: 320px;
    min-height: 400px;

    ${media.greaterThan('mobileMax')`
      max-width: 350px;
      max-height: 450px;
    `};
  `,
  EditableTypography: styled(EditableTypography)`
    & h1 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 250px;

      ${media.lessThan('mobileMax')`
    max-width: 280px;
    `};
    }
  `,
  Content: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: var(--spacing-small);
    overflow-y: auto;
    gap: var(--spacing-base);
    height: 100%;
    max-height: 300px;
  `,
  BtnCreate: styled(Btn)`
    margin-top: var(--spacing-base);
    align-self: flex-end;
  `,
  BtnDelete: styled(Btn)`
    position: absolute;
    bottom: 0;
    left: 0;

    ${media.greaterThan('mobileMax')`
      top: var(--spacing-base);
      right: 0;
      left: auto;
    `}
  `,
  // EditableTypography: styled(EditableTypography)`
  //   & div > h1 {
  //     overflow: hidden;
  //     text-overflow: ellipsis;
  //     white-space: nowrap;
  //     max-width: 200px;
  //   }
  // `,
};
