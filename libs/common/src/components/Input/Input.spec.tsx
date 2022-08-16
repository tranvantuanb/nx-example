import { render } from '../../test';

import { Input } from './Input';

describe('Input', () => {
  it('should render successfully', () => {
    const { container } = render(<Input />);
    expect(container).toBeTruthy();
  });
});
