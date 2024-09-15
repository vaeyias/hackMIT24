'use server';
import validateRequest from "../src/app/lib/lucia";

export async function isSignedIn() {
	return (await validateRequest()).user ? true : false;
}