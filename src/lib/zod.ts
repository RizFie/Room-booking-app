import { coerce, number, object, string } from "zod";

export const loginSchema = object({
    email: string().email("Invalid email"),
    password: string().min(6,"Password must be more than 6 characters").max(15, "Password must be less than 15 characters"),
});

export const registerSchema = object({
    fullname: string().min(1,"No name inserted"),
    email: string().email("Invalid email"),
    phone: string().min(11,"Phone number must be more than 10 characters").max(20,"You've exceeded maximum characters for phone number"),
    password: string().min(6,"Password must be more than 6 characters").max(15, "Password must be less than 15 characters"),
    confirmPass: string().min(6,"Confirm password must be more than 6 characters. ").max(15, "Confirm password must be less than 15 characters. "),
}).refine((data) => data.password === data.confirmPass, {
    path:["confirmPass"],
    message: "Password does not match"
});

export const profileSchema = object({
    fullname: string().min(1,"No name inserted"),
    email: string().email("Invalid email"),
    phone: string().min(11,"Phone number must be more than 10 characters").max(20,"You've exceeded maximum characters for phone number"),
    role: string().optional().default("user"),
});

export const placeSchema = object({
    placeName: string().min(1,"No Place Name inserted"),
    placeDesc: string().min(1,"No Place Description inserted").max(275,"Maximum of 275 characters allowed"),
    placeCapacity: string().transform((value) => parseInt(value, 10)).refine((value) => !isNaN(value), "Capacity must be a valid number"),
    placeType: string().min(1,"No place type added"),
});