import { render } from '../../test';

import { Spin } from './index';

describe('Spin', () => {
  it('should render successfully', () => {
    const { container } = render(<Spin />);
    expect(container).toBeTruthy();
  });
});
