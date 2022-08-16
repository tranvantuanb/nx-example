import { render } from '../../test';

import { ClickArea, ClickAreaProps } from './ClickArea';

describe('ClickArea', () => {
  it('should render successfully', () => {
    const defaultProps: ClickAreaProps = {};
    const { container } = render(<ClickArea {...defaultProps} />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
