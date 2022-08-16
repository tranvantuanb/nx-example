import { render } from '../../test';

import { CollapseCard } from './CollapseCard';

describe('CollapseCard', () => {
  it('should render successfully', () => {
    const { container } = render(
      <CollapseCard
        header="Header Title"
        subheader="Subheader Content"
        extra={<button>Extra</button>}
        icon="calendar"
      >
        <h1>Card Content</h1>
        <CollapseCard.Divider />
        <h2>Divider</h2>
      </CollapseCard>
    );
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
