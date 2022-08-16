import { render } from '../../test';

import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  it('should render successfully', () => {
    const { container } = render(
      <Dropdown overlay={<div />}>
        <div>Test</div>
      </Dropdown>
    );
    expect(container).toBeTruthy();
  });
});
