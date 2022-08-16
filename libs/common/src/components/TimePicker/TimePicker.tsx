import React from 'react';
import { styled } from 'twin.macro';
import { Dayjs } from 'dayjs';
import { PickerTimeProps } from 'antd/es/date-picker/generatePicker';

import { DatePicker } from '../DatePicker';

export type TimePickerProps = Omit<PickerTimeProps<Dayjs>, 'picker'>;

const StyledComponent = styled(DatePicker)<TimePickerProps>``;

export const TimePicker = React.forwardRef<any, TimePickerProps>(
  (props, ref) => {
    return <StyledComponent picker="time" mode={undefined} {...props} />;
  }
);
