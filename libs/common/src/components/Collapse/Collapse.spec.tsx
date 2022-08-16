import { render } from '../../test';

import { Collapse } from './Collapse';

describe('Collapse', () => {
  it('should render successfully', () => {
    const { container } = render(
      <Collapse>
        <Collapse.Panel header="test" key="1">
          <p>test</p>
        </Collapse.Panel>
      </Collapse>
    );
    expect(container).toBeTruthy();
  });
});
