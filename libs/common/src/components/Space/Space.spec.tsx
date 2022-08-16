import { render } from '../../test';

import { Space } from './index';

describe('Space', () => {
  it('should render successfully', () => {
    const { container } = render(<Space />);
    expect(container).toBeTruthy();
  });
});
