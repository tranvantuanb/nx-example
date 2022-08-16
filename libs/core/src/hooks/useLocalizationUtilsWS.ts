import { useCallback } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import numeral from 'numeral';
import 'dayjs/locale/en';
import { AuthApi } from '@carro/auth';
import * as DateHelper from '../utils/dateHelper';

dayjs.locale('en');

dayjs.extend(utc);
dayjs.extend(timezone);

export const useLocalizationUtilsWS = () => {
  const currentUser = AuthApi.useGetCurrentUserWSQuery(undefined).data?.data;
  const countryCode = currentUser?.country?.country_code || 'SG';
  const currencySymbol = currentUser?.country?.currency_symbol || '$';

  const getLocalDateTime = useCallback(
    (
      dateTime, // utc
      formatTemplate = 'YYYY-MM-DD HH:mm:ss',
      shouldFormat = false,
      country = countryCode,
      isUnix = false
    ) =>
      DateHelper.getLocalDateTime(
        dateTime,
        formatTemplate,
        shouldFormat,
        country,
        isUnix
      ),
    [countryCode]
  );

  const getFormattedLocalDate = (
    dateTime,
    formatTemplate = 'YYYY-MM-DD HH:mm:ss'
  ) => getLocalDateTime(dateTime, formatTemplate, true);

  const getLocalAmountMoney = (
    amount,
    format = null,
    country = countryCode
  ) => {
    if (!amount?.toString()) return null;

    const defaultFormatByCountry = {
      MY: '0,0',
      ID: '0,0',
      TH: '0,0',
      SG: '0,0',
    };

    const defaultFormat = defaultFormatByCountry[country] || '0,0.00';
    let valuation = numeral(amount).format(format || defaultFormat);
    if (country === 'ID') {
      valuation = DateHelper.getAbbreviationCurrency(
        valuation.replaceAll(',', '.')
      );
    }
    return `${currencySymbol} ${valuation}`;
  };

  const getHumanTime = (utcTime: string) => {
    // `shouldFormat = false` -> return Dayjs object
    return (getLocalDateTime(utcTime) as Dayjs).fromNow();
  };

  return {
    getTimeZone: DateHelper.getTimeZone,
    getLocalDateTime,
    getFormattedLocalDate: useCallback(getFormattedLocalDate, [
      getLocalDateTime,
    ]),
    getLocalAmountMoney: useCallback(getLocalAmountMoney, [
      countryCode,
      currencySymbol,
    ]),
    getHumanTime: useCallback(getHumanTime, [getLocalDateTime]),
  };
};
