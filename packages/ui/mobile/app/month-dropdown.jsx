import {useQuery} from '@apollo/client';
import {format, parseISO} from 'date-fns';
import {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {View} from 'react-native';
import {GET_MONTHS_WITH_DATA} from './shared/queries/periodic-bme280';

export const MonthDropdown = ({onSelectItem, selectedMonth}) => {
  const {data} = useQuery(GET_MONTHS_WITH_DATA);

  useEffect(() => {
    if (!data) {
      return;
    }

    const months = data.monthsWithData.map(d => ({
      label: format(parseISO(d), 'MMM yyyy'),
      value: d,
    }));

    months.reverse();
    setItems(months);
    setValue(selectedMonth);
  }, [data]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedMonth);
  const [items, setItems] = useState([]);

  return (
    <View style={{margin: 10}}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={e => {
          onSelectItem?.(parseISO(e.value));
        }}
        placeholder={'Choose a month'}
      />
    </View>
  );
};
