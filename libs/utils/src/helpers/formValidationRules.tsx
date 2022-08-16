/* eslint-disable no-useless-escape */
import dayjs from 'dayjs';
import { Trans } from 'react-i18next';
import { Rule } from 'rc-field-form/lib/interface';

export const required: Rule = {
  required: true,
  message: <Trans ns="utils">Field is required.</Trans>,
};

export const email: Rule = {
  type: 'email',
  message: <Trans ns="utils">Field must be valid email address.</Trans>,
};

export const numeric: Rule = {
  pattern: /^[-]?\d+(\.\d)?\d*$/,
  message: <Trans ns="utils">Field must be numeric.</Trans>,
};
export const integers: Rule = {
  pattern: /^[-]?\d+(\d)?\d*$/,
  message: <Trans ns="utils">Field must be integers.</Trans>,
};

export const positiveFloatNumeric: Rule = {
  pattern: /^(?:[1-9]\d*|0)?(?:\.\d+)?$/,
  message: <Trans ns="utils">Field must be greater than 0.</Trans>,
};

export const positiveNumeric: Rule = {
  pattern: /^\+?(0|[1-9]\d*)$/,
  message: <Trans ns="utils">Field must be greater than 0.</Trans>,
};

export const positiveNumericIncludeZero: Rule = {
  pattern: /^[0-9.]$/,
  message: <Trans ns="utils">Field must be greater than or equal to 0.</Trans>,
};

export const phone: Rule = {
  pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/,
  message: <Trans ns="utils">Field must be valid phone number.</Trans>,
};

export const phoneNoSpace: Rule = {
  pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[\./0-9]*$/,
  message: (
    <Trans ns="utils">
      Please provide phone number without space and any special character such
      as -
    </Trans>
  ),
};

export const indoPhone: Rule = {
  pattern: /^\+?(628)([0-9]{6,})$/,
  message: <Trans ns="utils">Field must be valid phone number.</Trans>,
};

export const malaysiaPhone: Rule = {
  pattern: /^[0|\+6]\d{9,11}$/,
  message: <Trans ns="utils">Start with 0 or +6, total 10-12 digits</Trans>,
};

export const singPhone: Rule = {
  pattern: /^(?:\+65)?[0-9]{8}$/,
  message: <Trans ns="utils">Field must be valid phone number.</Trans>,
};

export const isLast4NRIC: Rule = {
  pattern: /^[0-9]{3}[A-Z]$/i,
  message: (
    <Trans ns="utils">
      Please enter only the last 4 characters of your NRIC
    </Trans>
  ),
};

export const carplate: Rule = {
  validator: (_, value) => {
    if (value?.match(/\s/)) {
      Promise.reject(new Error(`Please enter car plate number without space`));
    }
    Promise.resolve();
  },
};

export const birthdate: Rule = {
  validator: (_, value) => {
    if (value && dayjs(value).isAfter(dayjs())) {
      Promise.reject(new Error(`Date of birth must be before today`));
    }
    Promise.resolve();
  },
};

export const eligibilityAge = (years): Rule => ({
  validator: (_, value) => {
    const diff = dayjs().diff(value, 'years', true);
    if (diff < years) {
      Promise.reject(new Error(`Eligibility ${years} years old ONLY.`));
    }
    Promise.resolve();
  },
});

export const addressNTUC = {
  pattern: /^.+,.+,.+\s.+,.+$/,
  message:
    'Address needs to be separated by three commas. Include spacing after the 2nd comma.',
};

export const postCodes: Rule = {
  validator: (_, value) => {
    value.split(',').forEach((postCode) => {
      const trimendPostCode = postCode.trim();

      if (trimendPostCode !== '') {
        if (isNaN(Number(trimendPostCode))) {
          Promise.reject(
            new Error(
              `${postCode} is invalid! Post code contains numeric digits only!`
            )
          );
        } else if (trimendPostCode.length !== 5) {
          Promise.reject(
            new Error(`${postCode} is invalid! Need exact 5 digits!`)
          );
        }
      }
    });
    Promise.resolve();
  },
};

export const nric: Rule = {
  validator: (_, value) => {
    const errorMessage = 'The ID number entered is not a Singapore NRIC number';

    if (value.length !== 9) {
      Promise.reject(new Error(errorMessage));
    }

    value = value.toUpperCase();

    let i;
    const icArray: Array<string | number> = [];
    for (i = 0; i < 9; i += 1) {
      icArray[i] = value.charAt(i);
    }

    icArray[1] = parseInt(icArray[1] as string, 10) * 2;
    icArray[2] = parseInt(icArray[2] as string, 10) * 7;
    icArray[3] = parseInt(icArray[3] as string, 10) * 6;
    icArray[4] = parseInt(icArray[4] as string, 10) * 5;
    icArray[5] = parseInt(icArray[5] as string, 10) * 4;
    icArray[6] = parseInt(icArray[6] as string, 10) * 3;
    icArray[7] = parseInt(icArray[7] as string, 10) * 2;

    let weight = 0;
    for (i = 1; i < 8; i += 1) {
      weight += icArray[i] as number;
    }

    const offset = icArray[0] === 'T' || icArray[0] === 'G' ? 4 : 0;
    const temp = (offset + weight) % 11;

    const st = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const fg = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];

    let theAlpha;
    if (icArray[0] === 'S' || icArray[0] === 'T') {
      theAlpha = st[temp];
    } else if (icArray[0] === 'F' || icArray[0] === 'G') {
      theAlpha = fg[temp];
    }

    if (icArray[8] === theAlpha) {
      Promise.resolve();
    } else {
      Promise.reject(new Error(errorMessage));
    }
  },
};

export const minUniqueDigitsValidate = (uniqueDigits): Rule => ({
  validator: (_, value) => {
    const unique = [...new Set(value)];
    if (value && unique.length < uniqueDigits) {
      Promise.reject(
        new Error('Validation failed, please check if the entry is correct.')
      );
    }
    Promise.resolve();
  },
});
