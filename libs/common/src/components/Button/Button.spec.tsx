import { Descriptions, Row, Col, ColProps } from 'antd';

import { render } from '../../test';

import { Button, ButtonProps } from './Button';

const BUTTON_SAMPLES = [
  { label: 'Default Small', props: { type: 'default', size: 'small' } },
  { label: 'Default Large', props: { type: 'default', size: 'large' } },
  { label: 'Default', props: { type: 'default' } },
  { label: 'Default Ghost', props: { type: 'default', ghost: true } },
  { label: 'Primary', props: { type: 'primary' } },
  { label: 'Primary Ghost', props: { type: 'primary', ghost: true } },
  { label: 'Text', props: { type: 'text' } },
  { label: 'Link', props: { type: 'link' } },
  {
    label: 'Primary Disabled',
    props: { type: 'primary', disabled: true },
  },
  {
    label: 'Primary Disabled Ghost',
    props: { type: 'primary', ghost: true, disabled: true },
  },
  { label: 'Text Disabled', props: { type: 'text', disabled: true } },
  {
    label: 'Link Disabled',
    props: { type: 'link', disabled: true },
  },
];

describe('Button', () => {
  it('should render successfully', () => {
    const colProps: ColProps = {
      xs: 24,
      lg: 12,
      xxl: 8,
    };

    const { container } = render(
      <div className="my-0 mx-auto p-14 bg-white">
        <Row gutter={[32, 32]}>
          <Col {...colProps}>
            <Descriptions title="PRIMARY BUTTON" bordered column={1}>
              {BUTTON_SAMPLES.map((item, index) => (
                <Descriptions.Item key={index} label={item.label}>
                  <Button theme="primary" {...(item.props as ButtonProps)}>
                    {item.label}
                  </Button>
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Col>
          <Col {...colProps}>
            <Descriptions title="SECONDARY BUTTON" bordered column={1}>
              {BUTTON_SAMPLES.map((item, index) => (
                <Descriptions.Item key={index} label={item.label}>
                  <Button theme="secondary" {...(item.props as ButtonProps)}>
                    {item.label}
                  </Button>
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Col>
          <Col {...colProps}>
            <Descriptions title="SUCCESS BUTTON" bordered column={1}>
              {BUTTON_SAMPLES.map((item, index) => (
                <Descriptions.Item key={index} label={item.label}>
                  <Button theme="success" {...(item.props as ButtonProps)}>
                    {item.label}
                  </Button>
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Col>
          <Col {...colProps}>
            <Descriptions title="DANGER BUTTON" bordered column={1}>
              {BUTTON_SAMPLES.map((item, index) => (
                <Descriptions.Item key={index} label={item.label}>
                  <Button theme="danger" {...(item.props as ButtonProps)}>
                    {item.label}
                  </Button>
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Col>
        </Row>
      </div>
    );
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
