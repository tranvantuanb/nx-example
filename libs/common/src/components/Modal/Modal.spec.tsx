import { render } from '../../test';

import { Modal } from './Modal';

describe('Modal', () => {
  it('should render successfully', () => {
    const { container } = render(<Modal />);
    expect(container).toBeTruthy();
  });
});
