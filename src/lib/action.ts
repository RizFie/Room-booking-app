"use server";

import { prisma } from "./prisma";
import { loginSchema, profileSchema, registerSchema } from "./zod";
import { hashSync } from "bcrypt-ts";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

//SIGN UP FORM ACTION
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

  const { fullname, email, phone, password } = validatedFields.data;

  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        fullname: fullname,
        email: email,
        phoneNum: phone,
        password: hashedPassword,
        role: "user",
      },
    });
  } catch (error) {
    return { code: 500, message: "Registration failed, email may have been registered." };
  }

  return {code: 200, message: "Registration successfull."}
};

//SIGN IN FORM ACTION
export const signInCredentials = async (prevState: unknown ,formData: FormData) => {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log(validatedFields)
  const { email, password} = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      role: true,
    }
  })

  console.log(user);
  const redirectUrl = user && user.role === "admin" ? "/admin" : "/main/home";

  try {
    await signIn("credentials", {email, password, redirectTo: redirectUrl})
  } catch (error) {
    if(error instanceof AuthError){
      switch(error.type) {
        case "CredentialsSignin":
          return {message: "Invalid login credentials"}
        default:
          return {message: "Invalid login credentials"}
      }
    }
    throw error;
  }
}

//SIGN OUT ACTION
const SignOut = async () => {
  await signOut({redirectTo:"/login"});
}

export default SignOut

//UPDATE PROFILE ACTION
export const updateProfile = async (userId: string, prevState: unknown ,formData: FormData) => {
  const validatedFields = profileSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log(validatedFields);
  const { fullname, email, phone} = validatedFields.data;
  console.log(fullname, email, phone);

  
  try {
    const user = await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        fullname: fullname,
        email: email,
        phoneNum: phone,
      }
    });
    revalidatePath("/main/profile");
    return {code: 200, message: "Update Successfull"}
  } catch (error) {
    return {code: 500 ,message: "Update user profile fail, please try again" };
  }
}