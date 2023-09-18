import { Timestamp } from "./timestamp-scalar";

import { latestBME280 } from "./latest-bme280";
import { latestSDS011 } from "./latest-sds011";
import { periodicBME280 } from "./periodic-bme280";

const resolvers = {
  Timestamp,
  Query: {
    latestBME280,
    latestSDS011,
    periodicBME280,
  },
};

export default resolvers;
