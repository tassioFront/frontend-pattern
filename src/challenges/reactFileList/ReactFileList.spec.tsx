import { render, fireEvent, screen } from '@testing-library/react';

import ReactFileList from './ReactFileList';
import { vi } from 'vitest';

describe('<ReactFileList />', () => {
  const onClick = vi.fn();
  beforeEach(() => {
    onClick.mockClear();
  });
  it('should render ReactFileList', () => {
    render(<ReactFileList />);
    const folderApp = screen.getByTestId('folder-item-app');
    expect(folderApp.firstChild).toContainHTML(
      '<button data-testid="btn-app">app</button>'
    );
    expect(folderApp.childNodes[1]).toContainElement(
      screen.getByTestId('nested-list-app')
    );
    expect(
      screen.getAllByTestId('file-name-balance.client.tsx').at(0)
    ).toHaveAttribute('style', 'color: blue;');
    expect(
      screen.getAllByTestId('file-name-operations.server.tsx').at(0)
    ).toHaveAttribute('style', 'color: yellow;');
    const btn = screen.getAllByTestId('btn-app').at(0);
    fireEvent.click(btn as HTMLElement);
    expect(screen.queryByTestId('nested-list-app')).not.toBeInTheDocument();
  });
});
