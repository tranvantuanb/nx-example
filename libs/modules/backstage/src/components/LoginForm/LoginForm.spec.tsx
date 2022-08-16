import { render } from '../../test';

import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('should render successfully', () => {
    const { container } = render(<LoginForm />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
