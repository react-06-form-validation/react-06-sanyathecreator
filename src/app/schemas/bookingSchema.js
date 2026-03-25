import { z } from "zod";

// Starter schema for the task. Implement full validation rules from README.
export const createBookingSchema = (timeSlots) =>
  z.object({
    bookerName: z.string().min(2),
    bookerEmail: z.email().optional(),
    eventName: z.string().min(2),
    eventDate: z.coerce.date().min(new Date(), { message: "Must be a future date" }),
    numberOfGuests: z.coerce.number().min(2).max(10),
    timeSlot: z.enum(timeSlots),
    eventLink: z.url(),
  });
