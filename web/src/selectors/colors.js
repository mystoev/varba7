export const calculateTemperatureColor = ({ temperature = 0 }) => {
  var color1_red = 0;
  var color1_green = 255;
  var color1_blue = 255;

  var color2_red = 255;
  var color2_green = 0;
  var color2_blue = 0;

  let percent = temperature / 45.0;

  let resultRed = color1_red + percent * (color2_red - color1_red);
  let resultGreen = color1_green + percent * (color2_green - color1_green);
  let resultBlue = color1_blue + percent * (color2_blue - color1_blue);

  return `rgb(${resultRed},${resultGreen},${resultBlue})`;
};

export const calculateHumidityColor = ({ humidity = 0 }) => {
  var color1_red = 0;
  var color1_green = 0;
  var color1_blue = 255;

  let percent = humidity / 100.0;

  let resultRed = color1_red + percent * (0 - color1_red);
  let resultGreen = color1_green + percent * (0 - color1_green);
  let resultBlue = color1_blue + percent * (0 - color1_blue);

  return `rgb(${resultRed},${resultGreen},${resultBlue})`;
};
