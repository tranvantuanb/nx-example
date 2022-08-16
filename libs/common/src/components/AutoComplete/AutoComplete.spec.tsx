import { render } from '../../test';
import { AutoComplete, AutoCompleteProps } from './AutoComplete';

describe('AutoComplete', () => {
  it('should render successfully', () => {
    const defaultProps: AutoCompleteProps = {};
    const { container } = render(<AutoComplete {...defaultProps} />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
