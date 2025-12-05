const express = require("express");
const workoutModel = require("../Models");
const  requireAuth = require('../middleware/requireAuth');

const {
  addNewWorkout,
  getAllworkouts,
  getWorkoutById,
  deleteWorkout,
  updateworkout,
} = require("../Controllers/workoutController");

const router = express.Router();

router.use(requireAuth)

/**
 *  Route   -> /api/workouts
 *  Method  -> GET
 *  Description  ->  Gell all workouts
 *  Access  -> public
 *  parameters -> None
 */

router.get('/', getAllworkouts);

/**
 *  Route   -> /api/workouts/:id
 *  Method  -> GET
 *  Description  ->  Gell single workout by id
 *  Access  -> public
 *  parameters -> id
 */

router.get("/:id", getWorkoutById);

/**
 *  Route   -> /api/workouts/
 *  Method  -> POST
 *  Description  ->  Create a new workout
 *  Access  -> public
 *  parameters -> none
 */

router.post("/", addNewWorkout);

/**
 *  Route   -> /api/workouts/:id
 *  Method  -> DELETE
 *  Description  -> Deleting workout by its id
 *  Access  -> public
 *  parameters -> id
 */

router.delete("/:id", deleteWorkout);

/**
 *  Route   -> /api/workouts/:id
 *  Method  -> PATCH
 *  Description  -> updating workout by its id
 *  Access  -> public
 *  parameters -> id
 */

router.patch("/:id", updateworkout);

module.exports = router;
