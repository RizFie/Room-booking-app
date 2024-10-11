"use server"

import { prisma } from "./prisma";
import { registerSchema } from "./zod"
import { hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

export const signUpCredentials = async (prevState: unknown, formData: FormData) => {
    
    const validatedFields = registerSchema.safeParse(Object.fromEntries(formData.entries()));

    if(!validatedFields.success){
        return{
            error: validatedFields.error.flatten().fieldErrors
        }
    }

    const {fullname, email, phone, department, password} = validatedFields.data;

    const hashedPassword = hashSync(password,10);

    try {
        await prisma.user.create({
            data: {
                fullname: fullname,
                email: email,
                phoneNum: phone,
                department: department,
                password: hashedPassword,
                role: "user"
            }
        })
    } catch (error) {
        return {code: 500, message: "Registration failed"};
    }

    redirect("/login");
}