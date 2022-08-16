import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import cloneDeep from 'lodash/cloneDeep';

dayjs.extend(utc);

/**
 * Format dayjs time to backend datetime
 */
export const formatBackendDateTime = (
  dateTime: Dayjs,
  format = 'YYYY-MM-DD HH:mm:ss'
) => (dateTime ? dayjs(dateTime).utc().format(format) : null);

/**
 * Check object and format all dayjs time to backend datetime
 */
export const formatBackendDateTimeInObject = (
  obj: Record<string, any>,
  timeFormat?: string
) => {
  const result = cloneDeep(obj);
  const keys = Object.keys(result);
  keys.forEach((key) => {
    if (dayjs.isDayjs(result[key])) {
      result[key] = formatBackendDateTime(result[key], timeFormat);
    } else if (typeof result[key] === 'object' && result[key] !== null) {
      result[key] = formatBackendDateTimeInObject(result[key]);
    }
  });
  return result;
};
