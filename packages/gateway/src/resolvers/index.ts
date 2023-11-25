import { Timestamp } from "./timestamp-scalar";

import { allExpenses } from "./expenses";
import { latestBME280 } from "./latest-bme280";
import { latestSDS011 } from "./latest-sds011";
import { monthsWithData } from "./months-with-data";
import { periodicBME280 } from "./periodic-bme280";

const resolvers = {
  Timestamp,
  Query: {
    latestBME280,
    latestSDS011,
    periodicBME280,
    monthsWithData,
    expenses: allExpenses,
  },
};

export default resolvers;
