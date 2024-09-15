'use server';
import validateRequest from "../src/app/lib/lucia";

export async function getUser() {
	return (await validateRequest()).user??new Error("user not found");
}