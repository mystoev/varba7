export const getSensorValue = (sensorData: Array<any>, valueName: String) => {
  const { value } = sensorData.find((val: any) => val.value_type === valueName);
  return value;
};
