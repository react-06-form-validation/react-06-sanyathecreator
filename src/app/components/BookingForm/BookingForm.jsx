"use client";
import styles from "./BookingForm.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBookingSchema } from "../../schemas/bookingSchema.js";
import { useState, useEffect } from "react";

export default function BookingForm() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookingSchema, setBookingSchema] = useState(null);

  useEffect(() => {
    fetch("/api/time-slots")
      .then((res) => res.json())
      .then((slots) => {
        setTimeSlots(slots);
        setBookingSchema(createBookingSchema(slots));
      });
  }, []);

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: bookingSchema ? zodResolver(bookingSchema) : undefined,
  });
  const onSubmit = () => {
    alert("Booking successful!")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="bookerName" className={styles.label}>
          Booker Name
        </label>
        <input id="bookerName" name="bookerName" className={styles.input} {...register("bookerName")} />
        {errors.bookerName && <ErrorMessage message={errors.bookerName?.message} />}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="bookerEmail" className={styles.label}>
          Booker Email
        </label>
        <input
          id="bookerEmail"
          name="bookerEmail"
          className={styles.input}
          type="email"
          {...register("bookerEmail")}
        />
        {errors.bookerEmail && <ErrorMessage message={errors.bookerEmail?.message} />}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="eventName" className={styles.label}>
          Event Name
        </label>
        <input id="eventName" name="eventName" className={styles.input} {...register("eventName")} />
        {errors.eventName && <ErrorMessage message={errors.eventName?.message} />}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="eventDate" className={styles.label}>
          Event Date
        </label>
        <input
          id="eventDate"
          name="eventDate"
          className={styles.input}
          type="date"
          {...register("eventDate")}
        />
        {errors.eventDate && <ErrorMessage message={errors.eventDate?.message} />}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="numberOfGuests" className={styles.label}>
          Number of Guests
        </label>
        <input
          id="numberOfGuests"
          name="numberOfGuests"
          className={styles.input}
          type="number"
          {...register("numberOfGuests")}
        />
        {errors.numberOfGuests && <ErrorMessage message={errors.numberOfGuests?.message} />}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="timeSlot" className={styles.label}>
          Time Slot
        </label>
        <select id="timeSlot" name="timeSlot" className={styles.input} {...register("timeSlot")}>
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
        {errors.timeSlot && <ErrorMessage message={errors.timeSlot?.message} />}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="eventLink" className={styles.label}>
          Event Link (Online)
        </label>
        <input
          id="eventLink"
          name="eventLink"
          className={styles.input}
          type="url"
          {...register("eventLink")}
        />
        {errors.eventLink && <ErrorMessage message={errors.eventLink?.message} />}
      </div>

      <button className={styles.button} type="submit">
        Book Event
      </button>
    </form>
  );
}
