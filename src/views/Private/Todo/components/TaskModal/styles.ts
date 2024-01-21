import SelectInput from '@/components/SelectInput/SelectInput';
import styled from 'styled-components';

export default {
  SelectInput: styled(SelectInput)`
    width: min-content;
    display: inline-flex;

    &:not(:last-child) {
      margin-right: var(--spacing-small);
    }
  `,
};
