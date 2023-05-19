import { media } from '@/styles/media';
import styled from 'styled-components';
import { ChipTypes } from './types';

const borderRadiusInference = '4px';

const Styles = {
  Chip: styled.div<{ color: ChipTypes['color']; type: ChipTypes['type'] }>`
    color: white;
    text-align: center;

    &[type='default'] {
      background-color: ${(props) => props.color};
      border-radius: ${borderRadiusInference};
      padding: var(--spacing-xsmall) var(--spacing-small);

      ${media.greaterThan('tablet')`
        padding: var(--spacing-small) var(--spacing-base);
      `}
    }

    &[type='tag'] {
      background-color: var(--color-neutral-dark-2);
      border: 1px solid ${(props) => props.color};
      border-radius: calc(${borderRadiusInference} * 4);
      color: ${(props) => props.color};
      font: var(--text-caption);
      letter-spacing: var(--text-caption-letter);
      font-weight: var(--font-weight-bold);
      padding: var(--spacing-xxsmall) var(--spacing-small);
    }
  `,
  ChipGroup: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-small);
    width: 100%;
  `,
};

export default Styles;
