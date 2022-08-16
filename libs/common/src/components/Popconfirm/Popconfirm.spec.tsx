import { render } from '../../test';

import { Popconfirm } from './Popconfirm';

describe('Popconfirm', () => {
  it('should render successfully', () => {
    const { container } = render(<Popconfirm title="test" />);
    expect(container).toBeTruthy();
  });
});
