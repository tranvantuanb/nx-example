import { render } from '../../test';

import { ActionMenu } from './ActionMenu';

describe('ActionMenu', () => {
  it('should render successfully', () => {
    const { container } = render(<ActionMenu />);
    expect(container).toBeTruthy();
  });
});
