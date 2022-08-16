import { render } from '../../../test';

import { CardFormItem, CardFormItemProps } from './CardFormItem';

describe('CardFormItem', () => {
  it('should render successfully', () => {
    const defaultProps: CardFormItemProps = {};
    const { container } = render(<CardFormItem {...defaultProps} />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
