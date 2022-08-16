import { render } from '../../test';

import { RichTextEditor, RichTextEditorProps } from './RichTextEditor';

jest.mock('draft-js/lib/generateRandomKey', () => {
  let deterministicKey = 0;
  return () => deterministicKey++;
});

describe('RichTextEditor', () => {
  it('should render successfully', () => {
    const defaultProps: RichTextEditorProps = {};
    const { container } = render(<RichTextEditor {...defaultProps} />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
