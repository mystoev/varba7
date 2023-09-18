import { Schema, model } from "mongoose";

export interface IBME280 {
  timestamp: number;
  temperature: number;
  humidity: number;
}

export const BME280Schema = new Schema<IBME280>({
  timestamp: { type: Number },
  temperature: { type: Number },
  humidity: { type: Number },
});

export const BME280 = model<IBME280>("Stats", BME280Schema, "stats");
