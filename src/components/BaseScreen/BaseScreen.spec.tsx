import { render, screen, cleanup } from '@testing-library/react';
import BaseScreen from './BaseScreen';

const children = <p id="children">children</p>;
describe('<BaseScreen />', () => {
  it('should render heading and children, but there is not description', () => {
    render(
      <BaseScreen heading="heading" uiCurrentState="hasData">
        {children}
      </BaseScreen>
    );
    const wrapper = screen.getByText('children');
    const header = screen.getByTestId('heading' + '-header');
    const desc = header.querySelector('#heading' + '-desc');
    expect(
      wrapper.querySelector('[data-testid="loading"]')
    ).not.toBeInTheDocument();

    expect(wrapper).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(desc).not.toBeInTheDocument();
  });

  it('should render description', () => {
    render(
      <BaseScreen heading="heading" description="desc" uiCurrentState="hasData">
        {children}
      </BaseScreen>
    );
    const header = screen.getByTestId('heading' + '-header');
    const desc = header.querySelector('#heading' + '-desc');

    expect(desc).toBeInTheDocument();
  });

  it('should not render children when is loading', () => {
    render(
      <BaseScreen
        heading="heading"
        description="desc"
        uiCurrentState="isLoading"
      >
        {children}
      </BaseScreen>
    );
    const wrapper = screen.getByTestId('heading' + '-wrapper');
    const loading = screen.getByTestId('loading');
    expect(wrapper.querySelector('#heading' + '-desc')).toBeInTheDocument();
    expect(loading).toBeInTheDocument();
    expect(wrapper.querySelector('#children')).not.toBeInTheDocument();
  });
});
