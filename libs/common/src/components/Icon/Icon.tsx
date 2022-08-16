import React from 'react';
import { ReactSVG } from 'react-svg';
import { css, styled } from 'twin.macro';

export const IconNames = [
  'arrow-bottom-left',
  'arrow-down',
  'arrow-left',
  'arrow-top-right',
  'arrow-up',
  'attach',
  'calendar',
  'call',
  'check',
  'clock',
  'cross-circle',
  'car',
  'edit',
  'email',
  'exclamation',
  'location',
  'mail',
  'message',
  'one-way',
  'person',
  'question',
  'send',
  'ticket',
  'transfer',
  'two-way',
  'whatsapp',
  'whatsapp-color',
  'textbox',
  'close',
  'upload',
  'success',
  'location-pin',
  'three-dot-verticle',
  'enter',
  'eye',
  'filter',
  'delete',
  'plus-circle',
  'log-out',
  'auction',
  'seals',
  'wrench',
  'open-link',
] as const;

export type IconName = typeof IconNames[number];

interface StyledReactSVGProps {
  fill?: string;
  color?: string;
  size?: string;
  transform?: string;
  className?: string;
}

interface ComponentProps extends StyledReactSVGProps {
  name: IconName;
}

//@ts-ignore
const StyledSVGIcon = styled(ReactSVG)<StyledReactSVGProps>`
  svg {
    ${({ size }) =>
      size &&
      css`
        width: ${size};
        height: ${size};
      `}
    ${({ transform }) =>
      transform &&
      css`
        transform: ${transform};
      `}
    ${({ color }) =>
      color &&
      css`
        color: ${color};
      `}
    path {
      ${({ fill, color }) =>
        (fill || color) &&
        css`
          fill: ${fill || color};
        `}
    }
  }
`;

export const Icon: React.FC<ComponentProps> = React.memo(
  ({ name, color, fill, size, transform, className }) => {
    return (
      <StyledSVGIcon
        src={`/icons/${name}.svg`}
        color={color}
        fill={fill}
        size={size}
        transform={transform}
        className={className}
      />
    );
  }
);
