import { render } from '../../test';

import { TabPane } from './TabPane';

describe('TabPane', () => {
  it('should render successfully', () => {
    const { container } = render(<TabPane />);
    expect(container).toBeTruthy();
  });
});
