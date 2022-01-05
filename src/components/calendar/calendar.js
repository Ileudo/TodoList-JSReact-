import { useState } from 'react';
import ruLocale from 'date-fns/locale/ru';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import './paper.css';
import './calendar.css';
import { format } from 'date-fns';

console.log(ruLocale);

const weekdays = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};
const dayInMs = 1000 * 60 * 60 * 24;

const MyDatePicker = () => {
  const [value, setValue] = useState('');
  const initialSelectedDate = format(new Date(), 'eeee, d MMMM', { locale: ruLocale });
  const [label, setLabel] = useState(initialSelectedDate);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onFocus = () => {
    console.log('focus');
    setLabel('Delivery Date');
  };

  const onBlur = () => {
    console.log('blur');
    setLabel(value);
  };

  function disableDays(date) {
    const shippingSlot = dayInMs * 60;
    const lastAvailableShippingDay = new Date(Date.now() + shippingSlot);

    return date.getDay() === weekdays.sunday || date <= new Date() || date > lastAvailableShippingDay;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
      <DatePicker
        label={label}
        inputFormat="eeee, d MMMM"
        disableMaskedInput={true}
        shouldDisableDate={disableDays}
        disableHighlightToday={true}
        OpenPickerButtonProps={{
          disableRipple: true,
        }}
        PaperProps={{ className: 'paper' }}
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField autoComplete="off" onFocus={onFocus} onBlur={onBlur} {...params} className="calendar" />
        )}
      />
    </LocalizationProvider>
  );
};

export default MyDatePicker;
