import { render } from '../../test';

import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('should render successfully', () => {
    const { container } = render(<TextArea />);
    expect(container).toBeTruthy();
  });
});
