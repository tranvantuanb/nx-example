import { render } from '../../test';

import { GlobalScrollbar, GlobalScrollbarProps } from './GlobalScrollbar';

describe('GlobalScrollbar', () => {
  it('should render successfully', () => {
    const defaultProps: GlobalScrollbarProps = {};
    const { container } = render(<GlobalScrollbar {...defaultProps} />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
