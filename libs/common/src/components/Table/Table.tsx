import React, { memo } from 'react';
import { Table as AntdTable, TableProps as AntdTableProps } from 'antd';
import tw, { styled } from 'twin.macro';

export interface TableProps<RecordType> extends AntdTableProps<RecordType> {
  selected?: boolean;
  success?: boolean;
  fullWidth?: boolean;
}

const StyleTable = styled(AntdTable)<TableProps<any>>`
  table {
    border-spacing: 0 10px;
  }

  .ant-checkbox-inner {
    ${tw`w-[20px] h-[20px] rounded-[4px] overflow-hidden`}
  }

  .ant-table-thead > tr > th,
  .ant-table-thead > tr > th:hover {
    ${tw`bg-secondary py-[14px] border-none`}
    ${tw`text-slate-500 text-xs font-semibold`}
  }

  .ant-table-column-sorter-up,
  .ant-table-column-sorter-down {
    ${tw`text-base`}
  }

  .ant-table-container table > thead > tr:first-of-type th:first-of-type,
  .ant-table-container table > thead > tr:first-of-type th:last-child {
    ${tw`rounded-none`}
  }

  .ant-table-tbody > tr > td {
    ${tw`bg-white`}
    ${tw`text-black-base text-base`}

    border-top-width: 1px;
    border-bottom-width: 1px;
    ${tw`border-gray-300`}
  }

  .ant-table-tbody > tr > td:first-of-type {
    ${tw`rounded-l-base`}
    border-left-width: 1px;
  }

  .ant-table-tbody > tr > td:last-child {
    ${tw`rounded-r-base`}
    border-right-width: 1px;
  }

  table tr th.ant-table-selection-column,
  table tr td.ant-table-selection-column {
    ${tw`pl-[20px]`}
  }

  .ant-table-cell.ant-table-selection-column {
    border-spacing: initial;
  }
`;

export const Table: React.FC<TableProps<any>> = memo((props) => {
  return <StyleTable {...props} />;
});
