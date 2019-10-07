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
  countMoviesAppearances: {
    type: Number,
    required: false,
    default: 0,
  },
  moviesAppearances: [{
    type: String,
    required: false,
  }],
});
