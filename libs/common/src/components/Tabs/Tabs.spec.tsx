import { render } from '../../test';

import { Tabs } from './Tabs';

describe('Tabs', () => {
  it('should render successfully', () => {
    const { container } = render(<Tabs />);
    expect(container).toBeTruthy();
  });
});
