const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: 'Enter an exercise type',
        },
        name: {
          type: String,
          trim: true,
          required: 'Enter an exercise name',
        },
        duration: {
          type: Number,
          required: 'Enter an exercise duration in minutes',
        },
        weight: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        distance: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true,
    },
  }
);
//Setting totalDuration property, reduces the array of exercise durations to a single value
workoutSchema.virtual('totalDuration').get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
