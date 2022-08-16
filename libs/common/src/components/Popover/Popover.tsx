import React from 'react';
import tw, { css, styled } from 'twin.macro';
import { Popover as AntdPopover, PopoverProps as AntdPopoverProps } from 'antd';
import { Global } from '@emotion/react';

export interface PopoverProps extends AntdPopoverProps {
  hideArrow?: boolean;
}

const StyledPopover = styled(AntdPopover)``;

export const Popover: React.FC<PopoverProps> = React.memo(
  ({ hideArrow, ...rest }) => {
    return (
      <>
        <Global
          styles={css`
            .ant-popover-inner-content {
              ${tw`p-[20px]`}
            }
            .hide-arrow {
              .ant-popover-arrow {
                ${tw`hidden`}
              }

              &.ant-popover {
                ${tw`!pt-[5px]`}
              }
            }
          `}
        />
        <StyledPopover
          {...rest}
          overlayClassName={hideArrow ? 'hide-arrow' : ''}
        />
      </>
    );
  }
);
