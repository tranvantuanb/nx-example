import { render } from '../../test';

import { Progress, ProgressProps } from './Progress';

describe('Progress', () => {
  it('should render successfully', () => {
    const defaultProps: ProgressProps = {};
    const { container } = render(<Progress {...defaultProps} />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
