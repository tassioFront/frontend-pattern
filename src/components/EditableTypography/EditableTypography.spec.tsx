vi.mock('@/hooks/useClickOutside/useClickOutside', () => {
  return {
    useClickOutside: vi.fn(),
  };
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';

import EditableTypography from './EditableTypography';

describe('<EditableTypography />', () => {
  it('Should render label as it is not edit mode', () => {
    const updateTextMock = vi.fn();
    render(
      <EditableTypography
        label="Old title"
        id="testId"
        tag="h1"
        className="testClass"
        updateText={updateTextMock}
      />
    );

    expect(screen.getByText('Old title')).toBeInTheDocument();
    expect(screen.queryByTestId('editable__input')).not.toBeInTheDocument();
  });

  it('Should enters edit mode when clicked and close it when Esc btn is clicked', () => {
    const updateTextMock = vi.fn();
    render(
      <EditableTypography
        label="Old title"
        id="testId"
        tag="h1"
        className="testClass"
        updateText={updateTextMock}
      />
    );

    fireEvent.click(screen.getByTitle('Click to edit'));
    const input = screen.getByTitle('Press Esc or click outside to cancel');

    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: { value: 'New Text' },
    });

    fireEvent.keyDown(input, {
      key: 's',
    });

    expect(updateTextMock).not.toHaveBeenCalled();

    fireEvent.keyDown(input, {
      key: 'Escape',
    });

    expect(updateTextMock).not.toHaveBeenCalled();
    expect(input).not.toBeInTheDocument();
    expect(screen.getByText('Old title')).toBeInTheDocument();
  });

  it('Should enters edit mode and calls updateText on Enter key press', () => {
    const updateTextMock = vi.fn();
    render(
      <EditableTypography
        label="Old title"
        id="testId"
        tag="h1"
        className="testClass"
        updateText={updateTextMock}
      />
    );

    fireEvent.click(screen.getByTitle('Click to edit'));
    const input = screen.getByTitle('Press Esc or click outside to cancel');

    expect(input).toBeInTheDocument();

    fireEvent.change(input, {
      target: { value: 'New Text' },
    });

    fireEvent.keyDown(input, {
      key: 'Enter',
    });

    expect(updateTextMock).toHaveBeenCalledWith('New Text');
  });
});
