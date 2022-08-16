import React from 'react';
import tw, { styled } from 'twin.macro';
import { Input, InputProps as AntdInputProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

const StyledSearchInput = styled(Input)`
  ${tw`!pr-1 !py-[5px]`}

  input::placeholder {
    ${tw`text-slate-300 text-sm leading-4`}
  }

  .ant-input-suffix {
    .anticon-search {
      ${tw`p-[6px] bg-blue-50 rounded`}
    }
  }

  .ant-input-affix-wrapper {
    ${tw`h-8 border-gray-200 hover:border-gray-200 !border-r-0`}
  }

  .ant-input-group-addon {
    .ant-input-search-button {
      padding-right: 3px !important;
      padding-top: 3px !important;
      padding-bottom: 3px !important;

      ${tw`border-gray-200 border-l-0 px-1`}
    }

    .ant-btn .anticon {
      ${tw`text-[11px] p-1.5 rounded bg-blue-50 text-blue-500`}
    }
  }
`;

interface SearchProps extends AntdInputProps {
  onChange: (value) => void;
  debounceDuration?: number;
}

export const SearchBox: React.FC<SearchProps> = ({
  debounceDuration = 800,
  onChange,
  ...otherProps
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <StyledSearchInput
      onChange={debounce(handleChange, debounceDuration)}
      suffix={<SearchOutlined style={{ fontSize: '10px', color: '#5E81F4' }} />}
      {...otherProps}
    />
  );
};
