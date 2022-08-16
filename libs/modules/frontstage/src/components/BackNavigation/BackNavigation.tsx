import React from 'react';
import tw, { styled } from 'twin.macro';
import { LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';

import { Button } from '@carro/common/components';

export interface BackNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  appointmentId?: string;
}

const StyledBackNavigation = styled.div`
  ${tw`bg-white px-12 py-2 h-16`}
  box-shadow: 0px 4px 15px rgba(33, 33, 33, 0.15);

  .back-btn {
    ${tw`text-[#3B3B3B]`}
  }
`;

export const BackNavigation: React.FC<BackNavigationProps> = React.memo(
  (props) => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const { title, appointmentId } = props;

    return (
      <StyledBackNavigation>
        <Row justify="start" align="middle" className="h-full">
          <Col span={4}>
            <Button
              className="pl-0 back-btn"
              type="text"
              onClick={() =>
                router.push(
                  appointmentId
                    ? `/cars-list?appointmentId=${appointmentId}`
                    : '/'
                )
              }
            >
              <LeftOutlined />
              <span className="capitalize ml-3 text-sm">{t('Back')}</span>
            </Button>
          </Col>
          {title && (
            <Col span={16}>
              <div className="font-semibold text-base text-center">{title}</div>
            </Col>
          )}
        </Row>
      </StyledBackNavigation>
    );
  }
);
