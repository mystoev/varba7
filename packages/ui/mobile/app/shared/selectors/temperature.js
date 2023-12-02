import {format} from 'date-fns';

export const maxTemperatures = data => {
  if (!data) {
    return [];
  }

  const temperaturesByDay = {};
  data.map(({timestamp, temperature}) => {
    const key = format(timestamp * 1000, 'MMM-dd');
    if (!temperaturesByDay[key]) {
      temperaturesByDay[key] = {timestamp: timestamp * 1000, temperature};
      return;
    }

    if (temperaturesByDay[key].temperature < temperature) {
      temperaturesByDay[key] = {timestamp: timestamp * 1000, temperature};
    }
  });

  const result = Object.values(temperaturesByDay);

  result.sort((a, b) => {
    if (a.timestamp < b.timestamp) {
      return -1;
    } else if (a.timestamp > b.timestamp) {
      return 1;
    }

    return 0;
  });

  return result;
};
