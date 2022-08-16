import { render } from '../../test';

import { Text } from './Text';

describe('Text', () => {
  it('should render successfully', () => {
    const { container } = render(
      <>
        <Text.Caption size="sm" uppercase>
          Caption 14
        </Text.Caption>
        <Text.Caption size="base" uppercase>
          Caption 16
        </Text.Caption>
        <Text.Caption size="lg" uppercase>
          Caption 18
        </Text.Caption>
        <Text.Caption size="2xl" uppercase>
          Caption 24
        </Text.Caption>
      </>
    );
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
