import React, { useMemo } from 'react';
import {
  AutoComplete as AntAutoComplete,
  AutoCompleteProps as AntAutoCompleteProps,
} from 'antd';
import tw, { styled } from 'twin.macro';

interface OptionType {
  label?: React.ReactNode;
  title?: React.ReactNode;
  id?: string | number | null | undefined;
  value?: string | number | null | undefined;
}

export type AutoCompleteProps = AntAutoCompleteProps<any, OptionType>;

interface IAutoComplete extends React.FC<AutoCompleteProps> {
  Option: typeof AntAutoComplete.Option;
}

const StyledAutoComplete = styled(
  AntAutoComplete
)`` as unknown as typeof AntAutoComplete;

const AutoComplete: IAutoComplete = ({ options, ...props }) => {
  const transformedOptions = useMemo(
    () =>
      options?.map((item) => ({
        label: item.title,
        value: item.id,
        ...item,
      })),
    [options]
  );
  return <StyledAutoComplete options={transformedOptions} {...props} />;
};

AutoComplete.Option = AntAutoComplete.Option;

export { AutoComplete };
