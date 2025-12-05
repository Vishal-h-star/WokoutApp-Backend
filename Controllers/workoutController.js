const { workoutModel } = require("../Models");

const mongoose = require("mongoose");
// get all workouts
exports.getAllworkouts = async (req, res) => {
   const user_id = req.user._id
  try {
    const workouts = await workoutModel.find({user_id}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: workouts,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
    });
  }
};

// get single workout by id
exports.getWorkoutById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: `No such workout by this id : ${id}` });
  }

  const workout = await workoutModel.findById(id);

  if (!workout) {
    return res.status(404).json({
      success: false,
      message: `No workout find by this id: ${id}`,
    });
  }

  res.status(200).json({ workout });
};

// create a new workout
exports.addNewWorkout = async (req, res) => {
  const { data } = req.body;
  console.log("data in body", data);
  let errorField = {};

  if (!data.title) {
    errorField.title = "Title is missing";
  }

  if (!data.load) {
    errorField.load = "Load is missing";
  }

  if (!data.reps) {
    errorField.reps = "Reps is missing";
  }

  if (Object.keys(errorField).length > 0) {
    return res.status(400).json({ error: "Provide all details", errorField });
  }

  try {
    const user_id = req.user._id;
    console.log("user_id", user_id);

    const workout = await workoutModel.create({ ...data, user_id });
    res.status(201).json({
      success: true,
      data: workout,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout by its id
exports.deleteWorkout = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout found" });
  }

  const workout = await workoutModel.findByIdAndDelete(id);
  if (!workout) {
    return res
      .status(404)
      .json({ message: `No workout found by this id : ${id}` });
  }

  res.status(200).json({
    message: `Workout is delete  id ${id}`,
    data: workout,
  });
};

// update a workout by its id
exports.updateworkout = async (req, res) => {
  const id = req.params.id;
  const { data } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout by given id" });
  }

  const workout = await workoutModel.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });

  if (!workout) {
    return res.status(404).json({
      message: `No workout find by this id : ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    message: "workout is updated",
    data: workout,
  });
};
