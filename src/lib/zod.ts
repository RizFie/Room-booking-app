import { object, string } from "zod";

export const registerSchema = object({
    fullname: string().min(1,"No name inserted"),
    email: string().email("Invalid email"),
    phone: string().min(11,"Password must be more than 10 characters").max(20,"You've exceeded maximum characters for phone number"),
    department: string().min(5, "Department must be minimum 5 characters"),
    password: string().min(6,"Password must be more than 6 characters").max(15, "Password must be less than 15 characters"),
})