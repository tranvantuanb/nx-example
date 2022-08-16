import { render } from '../../test';

import { Popover, PopoverProps } from './Popover';

describe('Popover', () => {
  it('should render successfully', () => {
    const defaultProps: PopoverProps = {};
    const { container } = render(<Popover {...defaultProps} />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
