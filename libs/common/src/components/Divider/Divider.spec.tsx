import { render } from '../../test';
import { Divider } from './Divider';

describe('Avatar', () => {
  it('should render successfully', () => {
    const { container } = render(<Divider />);
    expect(container).toBeTruthy();
  });
});
