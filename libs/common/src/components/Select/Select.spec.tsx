import { ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import { render } from '../../test';
import { Select } from './Select';

describe('Select', () => {
  let selectContainer: HTMLElement;
  let dropdown: HTMLElement;

  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element) => {
      return element as ReactPortal;
    });

    const { container } = render(
      <Select open={true} options={OPTION_DEFINITIONS} />
    );

    selectContainer = container;
    dropdown = global.document.querySelector(
      SELECTORS.SELECT_DROPDOWN_SELECTOR
    )!;
  });

  it('should render successfully', () => {
    expect(selectContainer).toBeTruthy();
  });

  it('should render correct amount of options', () => {
    const options = dropdown.querySelectorAll(SELECTORS.OPTION_SELECTOR);
    expect(options.length).toBe(2);
  });

  it('should render option with correct value', () => {
    const option = dropdown.querySelectorAll(SELECTORS.OPTION_SELECTOR);
    expect(option[0].textContent).toBe('key-as-value');
    expect(option[1].textContent).toBe('example');
  });
});

const OPTION_DEFINITIONS = [
  {
    label: 'key as value',
    value: 'key-as-value',
  },
  {
    label: 'has value',
    value: 'example',
  },
];

const SELECTORS = {
  SELECT_DROPDOWN_SELECTOR: '.ant-select-dropdown',
  OPTION_SELECTOR: 'div[role="option"]',
};
