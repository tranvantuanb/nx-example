import { render } from '../../test';
import { Alert } from './Alert';

describe('Alert', () => {
  it('should render successfully', () => {
    const { container } = render(<Alert />);
    expect(container).toBeTruthy();
  });
});
