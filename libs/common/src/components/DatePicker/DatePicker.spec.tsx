import { render } from '../../test';

import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('should render successfully', () => {
    const { container } = render(<DatePicker />);
    expect(container).toBeTruthy();
  });
});
