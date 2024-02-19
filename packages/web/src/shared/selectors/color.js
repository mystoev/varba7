export const selectTemperatureColor = temperature => {
  if (isNaN(temperature)) {
    return 'grey';
  }

  if (temperature > 45) {
    return '#8a006c';
  } else if (temperature > 35) {
    return '#8a0005';
  } else if (temperature > 27) {
    return '#892300';
  } else if (temperature > 20) {
    return '#787e00';
  } else if (temperature > 10) {
    return '#008146';
  } else if (temperature > 0) {
    return '#004682';
  } else if (temperature > -10) {
    return '#004bff';
  } else {
    return '#0004ff';
  }
};

export const selectAirQualityColor = (pm25, pm10) => {
  if (isNaN(pm25) || isNaN(pm10)) {
    return 'grey';
  }

  const pm = (pm25 + pm10) / 2;
  if (pm < 10) {
    return '#008200';
  } else if (pm < 20) {
    return '#006b82';
  } else if (pm < 40) {
    return '#893900';
  } else if (pm < 80) {
    return '#8c0001';
  } else {
    return '#4b0b85';
  }
};
