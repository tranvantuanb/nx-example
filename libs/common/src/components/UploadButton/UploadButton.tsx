import React, { memo, ReactNode, useState } from 'react';
import { Badge, Upload, UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import tw, { styled } from 'twin.macro';
import { Button, ButtonProps } from '../Button';
import { Icon } from '../Icon';
import { Modal } from '../Modal';

const StyledUpload = styled(Upload)`
  ${tw`w-full`}
  .ant-upload {
    ${tw`w-full`}
    button {
      ${tw`bg-transparent border-gray-300 border border-solid`}
    }
  }
`;

export interface UploadButtonProps extends UploadProps {
  onCancel?: () => void;
  buttonProps?: ButtonProps;
  children: ReactNode;
}

export const UploadButton = memo((props: UploadButtonProps) => {
  const { fileList, onCancel, children, buttonProps, ...rest } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();

  const beforeUpload = (file) => {
    // const isJpgOrPng =
    //   file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }
    return false;
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsModalVisible(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)} {...buttonProps}>
        {children}
        {!isModalVisible && !!fileList?.length && (
          <Badge count={fileList.length} className="ml-[5px]" />
        )}
      </Button>
      <Modal
        title={t`File Upload`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t`Done`}
        okButtonProps={{ disabled: !fileList?.length }}
      >
        <StyledUpload beforeUpload={beforeUpload} fileList={fileList} {...rest}>
          <Button size="large" block>
            <Icon name="upload" className="mr-[5px]" />
            {t`Select File`}
          </Button>
        </StyledUpload>
      </Modal>
    </>
  );
});
