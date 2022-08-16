import React, { useContext, useEffect } from 'react';
import { Layout, Input } from 'antd';
import { render } from '../../test';

import { CollapseCard } from '../CollapseCard/CollapseCard';
import { CardSection } from '../CardSection/CardSection';
import { Icon } from '../Icon';
import { CardForm, withCardFormContext } from './CardForm';
import { CardFormContext } from './CardFormContext';

const initialValues = {
  contact: {
    name: 'Cristiano Ronaldo',
    contact_number: '77777777',
    email: 'manchester_united_are_rubbish@bbc.com',
  },
  slug: 'QWERTY',
  listing: {
    id: 12345,
  },
};

const CollapseCardPage = withCardFormContext(() => {
  const { isEditing, setData, setEditing } = useContext(CardFormContext);
  useEffect(() => {
    setData(initialValues);
  }, [setData]);

  const handleFinish = (formValues) => {
    console.log('formValues', formValues);
  };

  return (
    <Layout>
      <Layout.Content>
        <div className="container my-0 mx-auto p-14 bg-white">
          <CollapseCard
            header="Customer Input"
            icon={<Icon name="person" color="black" />}
            defaultActive
          >
            <CollapseCard.EditIcon onClick={() => setEditing(!isEditing)} />
            <CardForm initialValues={initialValues} onFinish={handleFinish}>
              <CardSection header="Contact Details">
                <CardForm.Row>
                  <CardForm.Item name={['contact', 'name']} label="Name">
                    <Input />
                  </CardForm.Item>
                  <CardForm.Item
                    name={['contact', 'contact_number']}
                    label="Contact Number"
                    renderViewValue={(number) =>
                      number.match(/.{1,4}/g).join(' ')
                    }
                  >
                    <Input />
                  </CardForm.Item>
                  <CardForm.Item name={['contact', 'email']} label="Email">
                    <Input />
                  </CardForm.Item>
                </CardForm.Row>
              </CardSection>
              <CardSection header="Ticket Data">
                <CardForm.Row>
                  <CardForm.Item name="slug" label="Slug">
                    <Input />
                  </CardForm.Item>
                  <CardForm.Item name={['listing', 'id']} label="Listing ID">
                    <Input />
                  </CardForm.Item>
                </CardForm.Row>
              </CardSection>
              {isEditing && (
                <CollapseCard.FooterActions>
                  <CardForm.Actions />
                </CollapseCard.FooterActions>
              )}
            </CardForm>
          </CollapseCard>
        </div>
      </Layout.Content>
    </Layout>
  );
});

describe('CardForm', () => {
  it('should render successfully', () => {
    const { container } = render(<CollapseCardPage />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
