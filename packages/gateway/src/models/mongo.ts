import { Schema, model } from "mongoose";

export interface IStats {
  timestamp: number;
  temperature: number;
  humidity: number;
}

export const StatsDbSchema = new Schema<IStats>({
  timestamp: { type: Number },
  temperature: { type: Number },
  humidity: { type: Number },
});

export const Stats = model<IStats>("Stats", StatsDbSchema, "stats");
