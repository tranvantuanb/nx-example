import { render } from '../../test';

import { Tag, TagProps } from './Tag';

describe('Tag', () => {
  it('should render successfully', () => {
    const defaultProps: TagProps = {};
    const { container } = render(<Tag {...defaultProps} />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
