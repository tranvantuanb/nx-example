import { render } from '../../test';

import { Checkbox, CheckboxProps } from './Checkbox';

describe('Checkbox', () => {
  it('should render successfully', () => {
    const defaultProps: CheckboxProps = {};
    const { container } = render(<Checkbox {...defaultProps} />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
