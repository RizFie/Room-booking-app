"use server";

import { prisma } from "./prisma";
import { loginSchema, registerSchema } from "./zod";
import { hashSync } from "bcrypt-ts";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

//Sign Up Form Action
export const signUpCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { fullname, email, phone, department, password } = validatedFields.data;

  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        fullname: fullname,
        email: email,
        phoneNum: phone,
        department: department,
        password: hashedPassword,
        role: "user",
        avatar: "",
      },
    });
  } catch (error) {
    return { code: 500, message: "Registration failed, email may have been registered." };
  }

  return {code: 200, message: "Registration successfull."}
};

//Sign In Form Action
export const signInCredentials = async (prevState: unknown ,formData: FormData) => {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {email, password, redirectTo:"/main"})
  } catch (error) {
    if(error instanceof AuthError){
      switch(error.type) {
        case "CredentialsSignin":
          return {message: "Invalid login credentials"}
        default:
          return {message: "Oh no, something went wrong, please try again."}
      }
    }
    throw error;
  }
}