import React, { useMemo } from 'react';
import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import { styled } from 'twin.macro';

interface OptionType {
  label?: React.ReactNode;
  title?: React.ReactNode;
  id?: string | number | null | undefined;
  value?: string | number | null | undefined;
}

export type SelectProps = AntdSelectProps<any, OptionType>;

interface ISelect extends React.FC<AntdSelectProps<any, OptionType>> {
  Option: typeof AntdSelect.Option;
  OptGroup: typeof AntdSelect.OptGroup;
}

const StyledSelect = styled(AntdSelect)`` as unknown as typeof AntdSelect;

const Select: ISelect = ({ options, ...props }) => {
  const transformedOptions = useMemo(
    () =>
      options?.map((item) => ({
        label: item.title,
        value: item.id,
        ...item,
      })),
    [options]
  );

  return <StyledSelect options={transformedOptions} {...props} />;
};

Select.Option = AntdSelect.Option;
Select.OptGroup = AntdSelect.OptGroup;

export { Select };
