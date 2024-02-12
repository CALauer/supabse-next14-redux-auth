"use client";
import React, { useEffect, useRef, useState } from "react";
import logExercise from "../../_actions/exercise_actions/log-exercise";
import {
  setActiveWorkout,
  setNotification,
} from "@/app/_redux/features/site/siteSlice";
import StartWorkout from "@/app/_actions/exercise_actions/start-workout";
import { useDispatch, useSelector } from "react-redux";
import CheckWorkoutActive from "@/app/_actions/exercise_actions/check-active-workout";
import { SupabaseClient } from "../../../supabase/supabaseClient";

export default function LogAnExerciseForm(props) {
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  const exerciseData = props.exerciseData;
  const exercise_id = exerciseData.id;
  const exercise_type = exerciseData.type;
  const date = new Date(Date.now());
  const activeWorkout = useSelector((state) => state.site.activeWorkout);
  const [errors, setErrors] = useState({}); // Initialize an empty errors object
  const minutesArray = [...Array(60).keys()];
  const secondsArray = [...Array(60).keys()];
  const hoursArray = [...Array(24).keys()];
  const offset = -date.getTimezoneOffset();
  const dispatch = useDispatch();
  const [currentHour, setCurrentHour] = useState(0);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [currentSecond, setCurrentSecond] = useState(0);

  const handleScroll = (ref, type) => {
    console.log(type);
    const currentScroll = ref.current.scrollTop;
    const itemHeight = 50; // Make sure this matches the actual height of your scroller-value divs
    const currentValue = Math.round(currentScroll / itemHeight);

    switch (type) {
      case "hours":
        setCurrentHour(currentValue);
        break;
      case "minutes":
        setCurrentMinute(currentValue);
        break;
      case "seconds":
        setCurrentSecond(currentValue);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    console.log("handleSubmit");
    event.preventDefault();
    const formData = new FormData(event.target);
    const weight = formData.get("weight");
    const reps = formData.get("reps");
    const notes = formData.get("notes");
    const exerciseId = formData.get("exercise_id");
    const hours = parseInt(formData.get("hours") || "0");
    const minutes = parseInt(formData.get("minutes") || "0");
    const seconds = parseInt(formData.get("seconds") || "0");
    const distance = formData.get("distance");
    const totalDurationInSeconds =
      currentHour * 3600 + currentMinute * 60 + currentSecond;

    const MAX_WEIGHT = 2000; // Adjust max weight as needed
    const MAX_REPS = 500; // Adjust max reps as needed
    const MAX_DISTANCE = 400; // Adjust max distance as needed

    if (exercise_type == 1) {
      const isWeightNumber = !isNaN(weight) && Number(weight) > 0;
      const isRepsNumber = !isNaN(reps) && Number(reps) > 0;

      if (!weight || !reps) {
        setErrors((prev) => ({
          ...prev,
          form: "Please fill out all fields.",
        }));
        return;
      } else if (!isWeightNumber || !isRepsNumber) {
        setErrors((prev) => ({
          ...prev,
          form: "Please enter valid numbers for weight and reps.",
        }));
        return;
      } else if (Number(weight) > MAX_WEIGHT || Number(reps) > MAX_REPS) {
        setErrors((prev) => ({
          ...prev,
          form: `Please enter reasonable numbers for weight (max ${MAX_WEIGHT}) and reps (max ${MAX_REPS}).`,
        }));
        return;
      }
    } else {
      const isDistanceNumber = !isNaN(distance) && Number(distance) > 0;

      if (
        !distance ||
        (currentHour === 0 && currentMinute === 0 && currentSecond === 0)
      ) {
        setErrors((prev) => ({
          ...prev,
          form: "Please fill out all fields.",
        }));
        return;
      } else if (!isDistanceNumber) {
        setErrors((prev) => ({
          ...prev,
          form: "Please enter a valid number for distance.",
        }));
        return;
      } else if (Number(distance) > MAX_DISTANCE) {
        setErrors((prev) => ({
          ...prev,
          form: `Please enter a reasonable distance (max ${MAX_DISTANCE} miles).`,
        }));
        return;
      }
    }

    const result = await logExercise({
      exerciseId,
      weight: weight || null,
      reps: reps || null,
      notes,
      duration: totalDurationInSeconds || null,
      distance: distance || null,
    });
    if (result && result.success) {
      dispatch(
        setNotification({
          status: "success",
          type: "notification",
          message: "Exercise Logged",
          show: true,
        })
      );
    } else {
      dispatch(
        setNotification({
          status: "failed",
          type: "notification",
          message: "Error: Exercise not logged",
          show: true,
        })
      );
    }
  };

  const startWorkOut = async () => {
    if (!activeWorkout.isActive) {
      const workoutStarted = await StartWorkout();
      if (workoutStarted.success) {
        const { id, created_at } = workoutStarted.data[0];
        const workoutData = {
          id,
          isActive: true,
          created_at,
        };
        dispatch(setActiveWorkout(workoutData));
      } else {
      }
    }
  };
  const checkIfWorkoutActive = async () => {
    const activeWorkout = await CheckWorkoutActive();
    if (activeWorkout.success && !activeWorkout.data) {
      return true;
    } else if (!activeWorkout.success && activeWorkout.workout.length > 0) {
      const workoutData = {
        id: activeWorkout.workout[0].id,
        isActive: true,
      };
      console.log(`Active workout found:`, workoutData);
      dispatch(setActiveWorkout(workoutData));
      return false;
    } else {
      return false;
    }
  };
  useEffect(() => {
    checkIfWorkoutActive();
  }, []);
  return (
    <div className="exercise-logger">
      {exercise_type == 1 ? (
        <form onSubmit={handleSubmit}>
          <input name="weight" type="number" placeholder="Weight" />
          <input name="reps" type="number" placeholder="Reps" />
          <textarea name="notes" placeholder="Notes" />
          {/* hidden input */}
          <input
            name="exercise_id"
            type="hidden"
            value={exercise_id}
            readOnly
          />
          {activeWorkout.isActive ? (
            <button type="submit" className="sign-in">
              Log Set
            </button>
          ) : (
            <>
              <p className="warning">
                You need to start a workout before you can log a set
              </p>
              <button onClick={startWorkOut} className="sign-up">
                Start Workout
              </button>
            </>
          )}
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="distance"
            type="number"
            placeholder="Distance in miles"
          />
          <div className="cardio-three-columns-time-selector">
            <h2>Hours</h2>
            <h2>Minutes</h2>
            <h2>Seconds</h2>
            <div
              className="scroller-wrapper"
              ref={hoursRef}
              onScroll={() => handleScroll(hoursRef, "hours")}
            >
              {hoursArray.map((hours) => (
                <div key={hours} className="scroller-value">
                  {hours}
                </div>
              ))}
            </div>
            <div
              className="scroller-wrapper"
              ref={minutesRef}
              onScroll={() => handleScroll(minutesRef, "minutes")}
            >
              {minutesArray.map((minute) => (
                <div key={minute} className="scroller-value">
                  {minute}
                </div>
              ))}
            </div>
            <div
              className="scroller-wrapper"
              ref={secondsRef}
              onScroll={() => handleScroll(secondsRef, "seconds")}
            >
              {secondsArray.map((second) => (
                <div key={second} className="scroller-value">
                  {second}
                </div>
              ))}
            </div>
          </div>

          <textarea name="notes" placeholder="Notes" />
          {/* hidden input */}
          <input
            name="exercise_id"
            type="hidden"
            value={exercise_id}
            readOnly
          />
          {activeWorkout.isActive ? (
            <button type="submit" className="sign-in">
              Log Set
            </button>
          ) : (
            <>
              <p className="warning">
                You need to start a workout before you can log a set
              </p>
              <button onClick={startWorkOut} className="sign-up">
                Start Workout
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
}
