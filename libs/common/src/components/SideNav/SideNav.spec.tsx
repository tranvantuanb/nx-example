import { HomeOutlined } from '@ant-design/icons';
import { Menu, getMenuItem } from '../Menu';
import { render, within, screen, fireEvent, waitFor } from '../../test';

import { SideNav } from './SideNav';

const navHeaderProps = {
  title: 'VERONICA',
  logoUrl: '/img/veronica-logo.svg',
  href: '/',
  target: '_self',
};

const topNavigationItems = [
  {
    name: 'Home',
    href: '/',
    pathname: '/',
    icon: HomeOutlined,
  },
];

const navFooterMenu = (
  <Menu
    onClick={() => {}}
    items={[
      getMenuItem({ label: 'test@gmail.com', key: 'email' }),
      getMenuItem({ label: 'LOGOUT', key: 'logout' }),
    ]}
  />
);

describe('SideNav', () => {
  it('should render successfully with 2 nav items, 1 header and 1 footer', async () => {
    const activeHref = '/';
    const { container, getByRole } = render(
      <SideNav
        navHeaderProps={navHeaderProps}
        topNavItems={topNavigationItems}
        userInfo={{
          first_name: 'N/A',
          email: 'test@gmail.com',
          country: { country_code: 'SG', currency_symbol: 'SGD' },
          id: 1,
          name: 'Leon Lionhart',
          profile_image: { thumbnail_url: '/img/user-icon.svg' },
          locale: {
            language: 'en',
          },
        }}
        navFooterMenu={navFooterMenu}
      />
    );
    expect(container).toBeTruthy();

    const navMenu = getByRole('navigation'); // <nav />
    const { getAllByTestId } = within(navMenu);
    const navMenuItems = getAllByTestId('nav-item');
    expect(navMenuItems.length).toBe(1);

    const navHeaderItem = getByRole('link', {
      name: 'headerLink',
    });
    expect(navHeaderItem).toBeTruthy();
    expect(screen.queryByText('VERONICA')).toBeFalsy();
    const { getByRole: getByRoleInHeader } = within(navHeaderItem);
    const headerLogo = getByRoleInHeader('img');
    expect(headerLogo).toBeTruthy();

    const navFooterItem = getByRole('contentinfo'); // <footer />
    expect(navFooterItem).toBeTruthy();
  });

  it('should expand nav menu with menu titles on mouse hover', async () => {
    const { container } = render(
      <SideNav
        navHeaderProps={navHeaderProps}
        topNavItems={topNavigationItems}
        userInfo={{
          first_name: 'N/A',
          email: 'test@gmail.com',
          country: { country_code: 'SG', currency_symbol: 'SGD' },
          id: 1,
          name: 'Leon Lionhart',
          profile_image: { thumbnail_url: '/img/user-icon.svg' },
          locale: {
            language: 'en',
          },
        }}
        navFooterMenu={navFooterMenu}
      />
    );
    expect(container).toBeTruthy();

    fireEvent.mouseOver(screen.getAllByTestId('nav-item')?.[0]);
    await waitFor(() => screen.getByRole('navigation'));
    expect(screen.getByText('VERONICA')).toBeTruthy();
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Leon Lionhart')).toBeTruthy();
  });
});
