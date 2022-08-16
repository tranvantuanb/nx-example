import React from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';
import tw, { styled } from 'twin.macro';

export type ModalProps = AntdModalProps;

const StyledAlert = styled(AntdModal)`
  .ant-modal-title {
    ${tw`font-bold`}
  }

  .ant-modal-footer {
    .ant-btn-default {
      ${tw`uppercase font-bolder text-slate-500 border-none`}
    }

    .ant-btn-primary {
      ${tw`uppercase font-bolder text-white border-none bg-blue-500`}

      &:disabled {
        ${tw`text-slate-300 bg-gray-100`}
      }
    }
  }
`;

export const Modal: React.FC<ModalProps> = (props) => {
  return <StyledAlert {...props} />;
};
