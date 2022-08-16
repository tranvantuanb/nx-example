import React, { memo, useMemo } from 'react';
import tw, { styled } from 'twin.macro';
import { useTranslation } from 'react-i18next';
import { Select } from '../Select';

interface Props {
  isExpanded: boolean;
  onChange?: (value: string) => void;
  value?: string;
}

const StyledContainer = styled.div<{ isExpanded: boolean }>`
  ${tw`flex items-center h-[42px] ml-1 cursor-pointer`}
  ${({ isExpanded }) => (isExpanded ? tw`w-[202px]` : tw`w-[48px]`)}
`;

const mappingCountry = {
  SG: '1',
  ID: '2',
  TH: '3',
  MY: '49',
};
export const SideNavCountry: React.FC<Props> = memo(
  ({ isExpanded, onChange, value }) => {
    const { t } = useTranslation('common');

    const listCountry = useMemo(
      () =>
        [
          {
            label: t('🇸🇬 Singapore'),
            id: '1',
          },
          {
            label: t('🇮🇩 Indonesia'),
            id: '2',
          },
          {
            label: t('🇹🇭 Thailand'),
            id: '3',
          },
          {
            label: t('🇲🇾 Malaysia'),
            id: '49',
          },
        ].map((item) => ({
          ...item,
          label: isExpanded ? item.label : item.label.split(' ')[0],
        })),
      [t, isExpanded]
    );

    if (!onChange) return null;
    return (
      <>
        <div
          className="text-slate-500 text-xs w-full max-w-[202px]"
          style={{
            textAlign: isExpanded ? 'left' : 'center',
          }}
        >
          {t`Country`}
        </div>
        <StyledContainer isExpanded={isExpanded} key={`${isExpanded}`}>
          <Select
            options={listCountry}
            className="w-full"
            showArrow={isExpanded}
            onChange={onChange}
            value={mappingCountry?.[value || ''] ?? value ?? ''}
          />
        </StyledContainer>
      </>
    );
  }
);
