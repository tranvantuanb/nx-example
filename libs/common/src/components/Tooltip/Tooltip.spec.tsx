import { render } from '../../test';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('should render successfully', () => {
    const { container } = render(<Tooltip placement="left" title="test" />);
    expect(container).toBeTruthy();
  });
});
