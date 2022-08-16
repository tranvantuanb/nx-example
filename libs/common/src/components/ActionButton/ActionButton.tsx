import React, { memo } from 'react';
import tw, { styled } from 'twin.macro';
import { Button as AntdButton, Dropdown, DropDownProps } from 'antd';
import { Icon, IconName } from '../Icon';
import { Button, ButtonProps } from '../Button';

export interface ActionButtonProps extends ButtonProps {
  overlay: DropDownProps['overlay'];
  dropdownProps?: DropDownProps;
  buttonIconProps?: ButtonProps;
  iconName?: IconName;
}

const StyleButton = styled(Button)`
  ${tw`!text-blue-600 bg-blue-50 text-button h-[32px]`}
  svg {
    ${tw`text-sm`}
  }
`;

const StyleButtonGroup = styled(AntdButton.Group)`
  ${tw`border border-blue-600 rounded-base h-fit`}
  .ant-btn:first-of-type:not(:last-of-type) {
    border-right: 1px solid;
    ${tw`z-10 border-blue-600`}
  }

  button {
    ${tw`!bg-blue-50 font-bolder`}
  }

  .action-arrow-icon {
    &:before {
      transform: rotate(-45deg) translate(-2.5px);
    }

    &:after {
      transform: rotate(45deg) translate(2.5px);
    }
  }

  .ant-dropdown-open {
    .action-arrow-icon {
      &:before {
        transform: rotate(45deg) translate(-2.5px);
      }

      &:after {
        transform: rotate(-45deg) translate(2.5px);
      }
    }
  }
`;

const ArrowIcon = styled.i`
  position: absolute;
  transform: translate(-2.5px, -0.5px);

  &:before,
  &:after {
    position: absolute;
    width: 6px;
    height: 1.5px;
    background-color: currentcolor;
    border-radius: 2px;
    transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
      color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    content: '';
  }
`;

const ArrowButton = memo((props: ButtonProps & { iconName?: IconName }) => {
  const { iconName, ...antdButtonProps } = props;

  return (
    <StyleButton
      type="primary"
      tw="w-[40px] h-[32px]"
      className="relative"
      icon={
        props.iconName ? (
          <Icon name={props.iconName} size={'15px'} />
        ) : (
          <ArrowIcon className="action-arrow-icon" />
        )
      }
      {...antdButtonProps}
    />
  );
});

export const ActionButton = memo((props: ActionButtonProps) => {
  const {
    overlay,
    dropdownProps,
    buttonIconProps,
    onClick,
    htmlType,
    iconName,
    ...rest
  } = props;

  const hasButtonEvent = !!onClick || htmlType === 'submit';

  return (
    <StyleButtonGroup>
      {hasButtonEvent && (
        <StyleButton
          type="primary"
          block
          onClick={onClick}
          htmlType={htmlType}
          {...rest}
        />
      )}
      <Dropdown
        trigger={['click']}
        placement="bottomRight"
        {...dropdownProps}
        overlay={overlay}
      >
        {!hasButtonEvent ? (
          <div className="flex rounded-base border-blue-600 overflow-hidden">
            <StyleButton type="primary" block {...rest} />
            <ArrowButton {...buttonIconProps} iconName={iconName} />
          </div>
        ) : (
          <ArrowButton {...buttonIconProps} />
        )}
      </Dropdown>
    </StyleButtonGroup>
  );
});
