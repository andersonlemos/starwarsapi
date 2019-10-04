import * as mongoose from 'mongoose';

export const PlanetSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  climate: {
    type: String,
    required: true,
    trim: true,
   },
   ground: {
    type: String,
    required: true,
    trim: true,
  },
  moviesWhereItAppears: [],
});
