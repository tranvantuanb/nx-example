import React from 'react';
import tw, { styled } from 'twin.macro';

export type ClickAreaProps = React.HTMLAttributes<HTMLDivElement>;

const StyledClickArea = styled.div`
  ${tw`absolute w-full h-full top-0 left-0`}
`;

export const ClickArea: React.FC<ClickAreaProps> = React.memo((props) => {
  return <StyledClickArea {...props} />;
});
