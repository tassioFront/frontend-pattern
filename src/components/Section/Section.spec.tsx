import { render, screen } from '@testing-library/react';

import Section from './Section';
import { vi } from 'vitest';

describe('<Section />', () => {
  const onClick = vi.fn();
  beforeEach(() => {
    onClick.mockClear();
  });
  it('should render Section with heading(h2), description and content', () => {
    // no description
    render(
      <Section data-testid="section-1" heading2="My h2 heading">
        <p>Content</p>
      </Section>
    );
    const section = screen.getByTestId('section-1');
    const h2 = section.querySelector('h2');
    const pTags = section.querySelectorAll('p');
    const pContent = pTags[0];
    expect(pTags.length).toBe(1);
    expect(h2?.textContent).toBe('My h2 heading');
    expect(pContent?.textContent).toBe('Content');

    // with description
    render(
      <Section
        data-testid="section-2"
        heading2="My h2 heading 2"
        description="My description"
      >
        <p>Content 2</p>
      </Section>
    );
    const section2 = screen.getByTestId('section-2');
    const p2Description = section2.querySelectorAll('p')[0];
    expect(p2Description?.textContent).toBe('My description');
  });
});
