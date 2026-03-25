import { z } from "zod";

// Starter schema for the task. Implement full validation rules from README.
export const createBookingSchema = (timeSlots) =>
  z.object({
    bookerName: z.string().min(2, { message: "Booker name must be at least 2 characters long" }),
    bookerEmail: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.email().optional()
    ),
    eventName: z.string().min(2, { message: "Event name must be at least 2 characters long" }),
    eventDate: z.coerce.date().min(new Date(), { message: "Event date must be in the future" }),
    numberOfGuests: z.coerce.number().min(1).max(10, { message: "Number of Guests must be less than or equal to 10" }),
    timeSlot: z.enum(timeSlots, { message: "Selected time slot is unavailable" }),
    eventLink: z.url({ message: "Invalid URL. Please enter a valid event link" }),
  });
