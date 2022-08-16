import { render } from '../../test';

import { SearchBox } from './SearchBox';

describe('SearchBox', () => {
  it('should render successfully', () => {
    const { container } = render(
      <SearchBox placeholder="placeholder" onChange={() => {}} />
    );
    expect(container).toBeTruthy();
  });
});
