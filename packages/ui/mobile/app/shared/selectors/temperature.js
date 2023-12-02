import {format} from 'date-fns';

const byTimestamp = (a, b) =>
  a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0;

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

  result.sort(byTimestamp);

  return result;
};

export const averageTemperatures = data => {
  if (!data) {
    return [];
  }

  const temperaturesByDay = {};
  data.map(({timestamp, temperature}) => {
    const key = format(timestamp * 1000, 'MMM-dd');
    if (!temperaturesByDay[key]) {
      temperaturesByDay[key] = {
        timestamp: timestamp * 1000,
        temperature,
        count: 0,
      };
      return;
    }

    temperaturesByDay[key].temperature += temperature;
    temperaturesByDay[key].count += 1;
  });

  const result = Object.values(temperaturesByDay);

  result.sort(byTimestamp);

  console.log(result);
  return result.map(r => {
    return {
      timestamp: r.timestamp,
      temperature: r.temperature / r.count,
    };
  });
};
