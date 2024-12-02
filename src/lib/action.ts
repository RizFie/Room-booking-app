"use server";

import { prisma } from "./prisma";
import { loginSchema, placeSchema, profileSchema, registerSchema } from "./zod";
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
  const redirectUrl = user && user.role === "admin" ? "/admin/dashboards" : "/main/home";

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

//DELETE ACCOUNT ACTION
export const deleteUser = async (id:string) => {
  try {
    await prisma.user.delete({
      where: {
        userId: id
      }
    });
    return {message: "Account Deletion Successful", code: 200};
  } catch (error) {
    return {message: "Something went wrong, please try again", code: 400};
  }
}

//REFRESH USERS LIST IN ADMIN
export async function revalidateAdminUsers() {
  revalidatePath("/admin/users");
}

//UPDATE PLACE ACTION
export const updatePlace = async (id: string, prevState: unknown ,formData: FormData) => {
  
  const validatedFields = placeSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {placeName, placeDesc, placeCapacity, placeType} = validatedFields.data;

  try {
    await prisma.place.update({
      where: {placeId: id},
      data: {
        placeName: placeName,
        placeDesc: placeDesc,
        placeCapacity: placeCapacity,
        placeType: placeType,
      }
    });

    revalidatePath(`/admin/places/${id}`)
    return {code: 200, message: "Room updated successfully"}

  } catch (error) {
    return {code: 500, message: "Something went wrong"};
  }
}

//BOOKING ACTION
export const createBooking = async ( ids: {place: string, user: string}, prevState: unknown, formData: FormData) => {

  const bookDate = formData.get("date") as string;
  const bookStartTime = formData.get("startTime") as string;
  const bookEndTime = formData.get("endTime") as string;
  const purpose = formData.get("purpose") as string | null;

  if(!purpose){
    throw Error("Purpose is null")
  }

  const bookDateStartTime = new Date(`${bookDate}T${bookStartTime}`);
  const bookDateEndTime = new Date(`${bookDate}T${bookEndTime}`);
  
  //Check for overlaps timeframe with existing record
  const conflicts = await prisma.booking.findMany({
    where: {
      placeId: ids.place,
      date: new Date(bookDate),
      OR: [
        // New booking starts during an existing booking (PASSED)
        {
          AND: [
            { startTime: { lte: bookDateStartTime } },
            { endTime: { gt: bookDateStartTime } }
          ]
        },
        // New booking ends during an existing booking (PASSED)
        {
          AND: [
            { startTime: { lt: bookDateEndTime } },
            { endTime: { gte: bookDateEndTime } }
          ]
        },
        // New booking completely within or is the same with an existing booking (PASSED)
        {
          AND: [
            { startTime: { gte: bookDateStartTime } },
            { endTime: { lte: bookDateEndTime } }
          ]
        }
      ]
    }
  });

  if(conflicts.length > 0){
    return {code: 500, message: "A reservation within your timeframe already created, please change your time or consider selecting another date"};
  }

  try {
    await prisma.booking.create({
      data: {
        startTime: bookDateStartTime,
        endTime: bookDateEndTime,
        date: new Date(bookDate),
        purpose: purpose,
        userId: ids.user,
        placeId: ids.place,
      }
    });

    revalidatePath("/admin/bookings")
    return {code: 200, message: "Reservation successfully placed"}
  } catch (error) {
    return {code: 500, message: "Something went wrong, please try again"}
  }

}

//CONFIRM RESERVATION SERVER ACTION
export const confirmReserve = async ( id: string) => {
  try {
    console.log("Confirming reservation for ID:", id);
    await prisma.booking.update({
      where: {
        bookingId: id,
      },
      data: {
        confirm: true,
      }
    });
    return {code: 200, message: "Reservation has been confirmed"}
  } catch (error) {
    return {code: 500, message: "Oh no, something went wrong. Please try again"}
  }
}

//CANCEL BOOKING SERVER ACTION
export const cancelBooking = async (id:string) => {
  try {
    await prisma.booking.update({
      where: {bookingId: id},
      data: {cancel: true},
    });
    return {code: 200, message: "Reservation has been cancelled"}
  } catch (error) {
    return {code: 500, message: "Something broke, please try again"}
  }
}

//CANCEL BOOKING SERVER ACTION
export const deleteBooking = async (id:string) => {
  try {
    await prisma.booking.delete({
      where: {bookingId: id},
    });
    return {code: 200, message: "Reservation has been deleted"}
  } catch (error) {
    return {code: 500, message: "Something broke, please try again"}
  }
}