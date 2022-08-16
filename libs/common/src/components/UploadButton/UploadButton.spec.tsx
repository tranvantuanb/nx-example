import { render } from '../../test';

import { UploadButton, UploadButtonProps } from './UploadButton';

describe('UploadButton', () => {
  it('should render successfully', () => {
    const defaultProps: UploadButtonProps = { children: '' };
    const { container } = render(<UploadButton {...defaultProps} />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
