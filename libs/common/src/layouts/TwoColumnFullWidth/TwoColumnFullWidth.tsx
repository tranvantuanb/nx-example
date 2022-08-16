import tw, { styled } from 'twin.macro';

const StyledSideNav = styled.div`
  ${tw`bg-white h-full max-w-[84px]`}
`;

const StyledMain = styled.div`
  ${tw`bg-white h-full flex-auto max-h-screen overflow-auto`}
`;

interface ComponentProps {
  SideBarComponent: React.ReactNode;
  MainComponent: React.ReactNode;
}

export const TwoColumnFullWidth: React.FC<ComponentProps> = ({
  SideBarComponent,
  MainComponent,
}) => {
  return (
    <div className="h-screen bg-[#f5f5fa] flex flex-row">
      <StyledSideNav>{SideBarComponent}</StyledSideNav>
      <StyledMain>{MainComponent}</StyledMain>
    </div>
  );
};
