import React, { memo, useEffect, useMemo, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Select } from '../Select';

interface Props {
  isExpanded: boolean;
  onChange?: (value: string) => void;
  value?: string;
}

const StyledContainer = styled.div<{ isExpanded: boolean }>`
  ${tw`flex items-center h-[42px] ml-1 cursor-pointer`}
  ${({ isExpanded }) => (isExpanded ? tw`w-[202px]` : tw`w-[48px]`)}
  
  .ant-select-selector {
    ${tw`!bg-blue-50 !border-none`}

    span {
      ${tw`!text-blue-500 !font-bold !text-center`}
    }
  }
`;

export const SideNavLanguage: React.FC<Props> = memo(
  ({ isExpanded, onChange, value }) => {
    const listCountry = useMemo(
      () => [
        {
          label: isExpanded ? 'ENGLISH' : 'EN',
          id: 'en',
        },
        {
          label: isExpanded ? 'BAHASA' : 'BH',
          id: 'id',
        },
        {
          label: isExpanded ? 'ภาษาไทย' : 'TH',
          id: 'th',
        },
        {
          label: isExpanded ? '中文(繁體)' : 'TW',
          id: 'zh-TW',
        },
      ],
      [isExpanded]
    );

    if (!onChange) return null;
    return (
      <StyledContainer isExpanded={isExpanded} key={`${isExpanded}`}>
        <Select
          options={listCountry}
          className="w-full"
          showArrow={isExpanded}
          onChange={onChange}
          value={value}
        />
      </StyledContainer>
    );
  }
);
