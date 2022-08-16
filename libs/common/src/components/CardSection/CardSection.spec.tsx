import { render } from '../../test';

import { CardSection, CardSectionProps } from './CardSection';

describe('CardSection', () => {
  it('should render successfully', () => {
    const defaultProps: CardSectionProps = {
      header: 'Section',
    };
    const { container } = render(<CardSection {...defaultProps} />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
