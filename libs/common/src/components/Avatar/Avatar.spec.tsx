import { render } from '../../test';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('should render successfully', () => {
    const { container } = render(<Avatar />);
    expect(container).toBeTruthy();
  });
});
