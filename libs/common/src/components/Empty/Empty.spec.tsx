import { render } from '../../test';

import { Empty } from './Empty';

describe('Empty', () => {
  it('should render successfully', () => {
    const { container } = render(<Empty />);
    expect(container).toBeTruthy();
  });
});
