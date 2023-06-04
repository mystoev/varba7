import { Schema, model } from "mongoose";
import { IStats } from "../../domain/stats";

export const StatsDbSchema = new Schema<IStats>({
  timestamp: { type: Number },
  temperature: { type: Number },
  humidity: { type: Number },
});

export const Stats = model<IStats>("Stats", StatsDbSchema, "stats");
