import React from 'react';
import { Input as AntdInput, InputProps as AntdInputProps } from 'antd';
import tw, { styled } from 'twin.macro';

export type InputProps = AntdInputProps;

const StyledInput = styled(AntdInput)`
  //${tw`border rounded`}
`;

export const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};

export const SearchInput = styled(AntdInput.Search)`
  .ant-input-group {
    ${tw`border border-solid border-secondary rounded-base`}
    &:focus-within {
      ${tw`border-primary`}
    }
  }

  .ant-input {
    ${tw`border-none shadow-none`}
  }

  .ant-input-group-addon {
    ${tw`!h-[30px] bg-transparent !pr-[5px] relative w-[25px]`}

    button {
      ${tw`h-[22px] w-[22px] bg-blue-50 !rounded-[4px] mb-[3px]`}

      .anticon-search {
        ${tw`text-blue-500 text-[10px]`}
      }
    }
  }
  .ant-input-search-button {
    ${tw`border-none shadow-none`}
  }

  .ant-input-affix-wrapper {
    ${tw`!border-none !shadow-none`}
  }
`;
