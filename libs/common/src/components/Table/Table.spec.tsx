import { render } from '../../test';

import { Table } from './Table';

describe('Table', () => {
  it('should render successfully', () => {
    const { container } = render(<Table />);
    expect(container).toBeTruthy();
  });
});
