import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export const getTimeZone = (country) => {
  switch (country) {
    case 'TH':
      return 'Asia/Bangkok';
    case 'ID':
      return 'Asia/Jakarta';
    case 'SG':
      return 'Asia/Singapore';
    case 'MY':
      return 'Asia/Kuala_Lumpur';
    default:
      return 'Asia/Singapore';
  }
};

export const getUtcDateTime = ({
  dateTime,
  isUnix = false,
}: {
  dateTime: string | number;
  isUnix?: boolean;
}) => dayjs.utc(isUnix ? dayjs.unix(Number(dateTime)).format() : dateTime);

export const getLocalDateTime = (
  dateTime, // utc
  formatTemplate = 'YYYY-MM-DD HH:mm:ss',
  shouldFormat = false,
  country,
  isUnix = false
) => {
  if (!dateTime) return null;
  const timezone = getTimeZone(country);
  const utcDateTime = getUtcDateTime({ dateTime, isUnix });
  return shouldFormat
    ? dayjs(utcDateTime).tz(timezone).format(formatTemplate)
    : dayjs(utcDateTime).tz(timezone);
};

export const toThousandUnit = (numString) => {
  const first2Digits = (numString / 1000).toFixed(1); // x.y
  const normalized = first2Digits.replace('.0', ''); // x.0 -> x
  return normalized;
};

export const getAbbreviationCurrency = (value) => {
  const standardlized = value.replace(/\./g, ''); // remove dots
  // less than 1.000
  if (standardlized.length < 4) {
    return value;
  }
  // 1.000 to 999.999
  if (standardlized.length < 7) {
    return `${toThousandUnit(standardlized)}RB`;
  }
  // 1.000.000 to 999.999.999
  if (standardlized.length < 10) {
    return `${toThousandUnit(
      standardlized.slice(0, standardlized.length - 3)
    )}JT`;
  }
  // 1.000.000.000 to 999.999.999.999
  if (standardlized.length < 13) {
    return `${toThousandUnit(
      standardlized.slice(0, standardlized.length - 6)
    )}M`;
  }
  // greater than 999.999.999.999
  if (standardlized.length >= 13) {
    return `${toThousandUnit(
      standardlized.slice(0, standardlized.length - 9)
    )}T`;
  }
};
