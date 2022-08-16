import { render } from '../../test';
import { AvatarGroup } from './AvatarGroup';

describe('AvatarGroup', () => {
  it('should render successfully', () => {
    const { container } = render(<AvatarGroup />);
    expect(container).toBeTruthy();
  });
});
