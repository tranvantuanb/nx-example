import { render } from '../../test';

import { Menu } from './Menu';

describe('Menu', () => {
  it('should render successfully', () => {
    const { container } = render(<Menu />);
    expect(container).toBeTruthy();
  });
});
