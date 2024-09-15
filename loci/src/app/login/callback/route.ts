import { google, lucia } from "@/app/lib/lucia";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import mongoose, { MongooseError } from "mongoose";
import User from "../../../../model/user";
import connect from "../../../../functions/connect";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
    const storedCodeVerifier = cookies().get("code_verifier")?.value??null;
	const storedState = cookies().get("google_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
		return new Response(null, {
			status: 401, 
			statusText: "first",
			headers: {"stored_code_verifier": storedCodeVerifier??'null', "stored_state":storedState??"null"}
		});
	}
	const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);

		const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
				scope: "openid email profile",
				"Access-Control-Allow-Origin": "*"
			}
		});
		const googleUser: GoogleUser = await googleUserResponse.json();
	try {
        // connect to mongoose
        await connect();

		const existingUser : any = await User.findOne({"id": googleUser.sub}).exec();
		
		if (existingUser) { //  REDIRECT AFTER SIGN IN
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/home"
				}
			});
		}

		// new user
		try {
			await User.create({
                id: googleUser.sub, 
                palaces: []
              });
		}
		catch(e : any) {
			if(e instanceof MongooseError) {return new Response(JSON.stringify(e), {status: 511})}
			else return new Response(null, {
				status: 598, 
				statusText: e,
				headers: {"GoogleUser": JSON.stringify(googleUser),
							"google_id" : googleUser.sub 
				}
			});
		}

		const session = await lucia.createSession(googleUser.sub??"0", {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/home"
			}
		});
	} catch (e : any) {
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 402,
				statusText: "invalid code",
				headers: {msg: e.message},
			});
		}
        return new Response(null, {
			status: 505,
			statusText: e, headers: {msg: e}
		});
	}
}

interface GoogleUser {
	sub: string;
}