import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './time-picker.css';

const TimePicker = () => {
  const timeSlots = [
    'с 10:00 до 12:00',
    'с 12:00 до 14:00',
    'с 14:00 до 16:00',
    'с 16:00 до 18:00',
    'с 18:00 до 20:00',
    'с 20:00 до 22:00',
  ];

  const [deliveryTime, setDeliveryTime] = useState(timeSlots[0]);

  return (
    <Select
      className="time-picker"
      variant="filled"
      value={deliveryTime}
      onChange={(e) => setDeliveryTime(e.target.value)}
      IconComponent={AccessTimeIcon}
      // inputProps={{
      //   sx: {
      //     padding: '16px 9px 16px 12px',
      //     display: 'flex',
      //     alignItems: 'center',
      //     height: '100%',
      //     width: '277px',
      //   },
      // }}
    >
      {timeSlots.map((timeslot) => {
        return (
          <MenuItem key={timeslot} value={timeslot}>
            {timeslot}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default TimePicker;
