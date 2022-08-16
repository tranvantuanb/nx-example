import qs from 'qs';
import dayjs from 'dayjs';

export const encodeToQS = (obj: Record<string, any>): string => {
  const normalizedObj = Object.keys(obj).reduce((accumulator, key) => {
    const value = obj[key];

    // date has "d_" prefix
    if (dayjs.isDayjs(value)) {
      return { ...accumulator, [`d_${key}`]: value.format() };
    }
    if (Array.isArray(value) && dayjs.isDayjs(value[0])) {
      return { ...accumulator, [`d_${key}`]: value.map((v) => v.format()) };
    }

    // number has "n_" prefix
    if (
      typeof value === 'number' ||
      (Array.isArray(value) && typeof value[0] === 'number')
    ) {
      return { ...accumulator, [`n_${key}`]: value };
    }

    // boolean has "b_" prefix
    if (
      typeof value === 'boolean' ||
      (Array.isArray(value) && typeof value[0] === 'boolean')
    ) {
      return { ...accumulator, [`b_${key}`]: value };
    }

    // object will do recursive encoding
    if (value && typeof value === 'object') {
      return { ...accumulator, [key]: encodeToQS(value) };
    }

    // default do nothing
    return { ...accumulator, [key]: value };
  }, {});

  return qs.stringify(normalizedObj);
};

export const decodeFromQS = (query: string): Record<string, any> => {
  const parsedQS = qs.parse(query);

  const normalize = (obj: Record<string, any>): Record<string, any> => {
    return Object.keys(obj).reduce((accumulator, key) => {
      const value = obj[key];
      const prefix = key.slice(0, key.indexOf('_'));
      const k = key.slice(key.indexOf('_') + 1);

      // number has "n_" prefix
      if (prefix === 'n') {
        return {
          ...accumulator,
          [k]: Array.isArray(value)
            ? value.map((v) => Number(v))
            : Number(value),
        };
      }

      // boolean has "b_" prefix
      if (prefix === 'b') {
        return {
          ...accumulator,
          [k]: Array.isArray(value)
            ? value.map((v) => v === 'true')
            : value === 'true',
        };
      }

      // date has "d_" prefix
      if (prefix === 'd') {
        return {
          ...accumulator,
          [k]: Array.isArray(value) ? value.map((v) => dayjs(v)) : dayjs(value),
        };
      }

      // object will do recursive decoding
      if (value && typeof value === 'object') {
        return { ...accumulator, [key]: normalize(value) };
      }

      // default do nothing
      return { ...accumulator, [key]: value };
    }, {});
  };

  return normalize(parsedQS);
};
