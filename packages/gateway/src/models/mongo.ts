import { Schema, model } from "mongoose";

interface IBME280 {
  timestamp: number;
  temperature: number;
  humidity: number;
}

export const BME280 = model<IBME280>(
  "Stats",
  new Schema<IBME280>({
    timestamp: { type: Number },
    temperature: { type: Number },
    humidity: { type: Number },
  }),
  "stats"
);
