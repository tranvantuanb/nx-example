import { render } from '../../test';

import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  it('should render successfully', () => {
    const { container } = render(<TimePicker />);
    expect(container).toBeTruthy();
  });
});
