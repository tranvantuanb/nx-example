import { HomeOutlined } from '@ant-design/icons';
import { render, screen } from '../../test';

import { SideNavItem } from './SideNavItem';

const NAV_ITEM = {
  name: 'Home',
  href: '/',
  pathname: '/',
  icon: HomeOutlined,
};

describe('SideNav', () => {
  it('should render successfully with icon only', async () => {
    const { container, getByRole } = render(
      <SideNavItem
        navigationItem={NAV_ITEM}
        isExpanded={false}
        isActive={false}
      />
    );
    expect(container).toBeTruthy();

    expect(screen.queryByText('Home')).toBeFalsy();
    const navItemIcon = getByRole('img');
    expect(navItemIcon).toBeTruthy();
  });

  it('should render expanded nav item with text and icon', async () => {
    const { container, getByRole } = render(
      <SideNavItem navigationItem={NAV_ITEM} isExpanded isActive={false} />
    );
    expect(container).toBeTruthy();

    expect(screen.getByText('Home')).toBeTruthy();
    const navItemIcon = getByRole('img');
    expect(navItemIcon).toBeTruthy();
  });

  it('should render active nav item with background color', async () => {
    const { container } = render(
      <SideNavItem navigationItem={NAV_ITEM} isExpanded isActive />
    );
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
