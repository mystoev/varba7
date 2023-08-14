export const calculateTemperatureColor = ({ temperature = -100 }) => {
  const color1_red = 0;
  const color1_green = 255;
  const color1_blue = 255;

  const color2_red = 255;
  const color2_green = 0;
  const color2_blue = 0;

  const percent = temperature / 45.0;

  const resultRed = color1_red + percent * (color2_red - color1_red);
  const resultGreen = color1_green + percent * (color2_green - color1_green);
  const resultBlue = color1_blue + percent * (color2_blue - color1_blue);

  return `rgb(${resultRed},${resultGreen},${resultBlue})`;
};

export const calculateHumidityColor = ({ humidity = 0 }) => {
  const red = 0;
  const green = 0;
  const blue = 255;

  const percent = humidity / 100.0;

  const resultRed = red + percent * (0 - red);
  const resultGreen = green + percent * (0 - green);
  const resultBlue = blue + percent * (0 - blue);

  return `rgb(${resultRed},${resultGreen},${resultBlue})`;
};
