import { render } from '../../test';

import { ActionButton } from './ActionButton';

describe('ActionButton', () => {
  it('should render successfully', () => {
    const { container } = render(<ActionButton overlay={<></>} />);
    expect(container).toBeTruthy();
  });
});
