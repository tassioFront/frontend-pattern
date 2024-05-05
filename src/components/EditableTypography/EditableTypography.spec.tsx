import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { vi } from 'vitest';

import EditableTypography from './EditableTypography';

const user = userEvent.setup();

const WrapperWithLabelState = ({ labelInit = '' }) => {
  const [label, setLabel] = React.useState(labelInit);
  return (
    <div>
      <button data-testid="click-outside">click outside</button>
      <EditableTypography
        label={label}
        id="testId"
        tag="h1"
        className="testClass"
        updateText={setLabel}
      />
    </div>
  );
};

describe('<EditableTypography />', () => {
  it('Should enter edit mode and render placeholder as there is no label value - showing fallback to empty label state', () => {
    const updateTextMock = vi.fn();
    render(
      <EditableTypography
        label=""
        id="testId"
        tag="h1"
        className="testClass"
        updateText={updateTextMock}
      />
    );

    const input = screen.getByTestId('editable__input') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe('Edit me');
  });

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

  it('Should enter edit mode and close it when Esc btn is clicked', async () => {
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

    const typographyElement = screen.getByTitle('Click to edit');

    await user.click(typographyElement);

    const inputElement = screen.getByTestId('editable__input');

    await user.type(inputElement, 'New Title{shift}');

    expect(updateTextMock).not.toHaveBeenCalled();
    expect(inputElement).toBeInTheDocument();

    await user.type(inputElement, '{escape}');

    expect(updateTextMock).not.toHaveBeenCalled();
    expect(inputElement).not.toBeInTheDocument();
    expect(screen.getByText('Old title')).toBeInTheDocument();
  });

  it('Should enter edit mode and calls updateText on Enter key pressed', async () => {
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

    const typographyElement = screen.getByTitle('Click to edit');

    await user.click(typographyElement);

    const inputElement = screen.getByTestId('editable__input');

    await user.clear(inputElement);
    await user.type(inputElement, 'New Title{enter}');

    expect(inputElement).not.toBeInTheDocument();
    expect(updateTextMock).toHaveBeenCalledWith('New Title');
  });

  it('Should not close edit mode as there is no label value and user clicked outside', async () => {
    render(<WrapperWithLabelState />);

    const inputElement = screen.getByTestId('editable__input');
    const btn = screen.getByTestId('click-outside');

    await user.click(btn);

    expect(inputElement).toBeInTheDocument();

    await user.type(inputElement, 'New Title');

    await user.click(btn);

    expect(inputElement).toBeInTheDocument();
    expect(screen.queryByText('New Title')).not.toBeInTheDocument();
  });

  it('Should close edit mode and restore label value as user clicked outside', async () => {
    render(<WrapperWithLabelState labelInit="Old title" />);

    const typographyElement = screen.getByTitle('Click to edit');

    await user.click(typographyElement);

    const inputElement = screen.getByTestId('editable__input');
    const btn = screen.getByTestId('click-outside');

    await user.type(inputElement, 'New Title');

    await user.click(btn);

    expect(screen.queryByTestId('editable__input')).not.toBeInTheDocument();
    expect(screen.getByText('Old title')).toBeInTheDocument();
  });
});
