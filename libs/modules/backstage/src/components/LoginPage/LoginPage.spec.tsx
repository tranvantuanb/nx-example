import { render } from '../../test';

import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('should render successfully', () => {
    const { container } = render(<LoginPage />);
    expect(container).toBeTruthy();
  });
});
