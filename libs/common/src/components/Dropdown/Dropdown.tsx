import React, { ReactElement } from 'react';
import {
  Dropdown as AntDropdown,
  DropDownProps as AntDropDownProps,
} from 'antd';
import { styled } from 'twin.macro';

export type DropdownProps = AntDropDownProps & { children?: ReactElement };

interface DropdownInterface extends React.FC<DropdownProps> {
  Button: typeof AntDropdown.Button;
}

const StyledDropdown = styled(AntDropdown)<DropdownProps>``;

const Dropdown: DropdownInterface = (props) => {
  return <StyledDropdown {...props} />;
};

Dropdown.Button = AntDropdown.Button;

export { Dropdown };
