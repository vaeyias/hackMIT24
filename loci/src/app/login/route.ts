import { generateState, generateCodeVerifier } from "arctic";
import { google } from "../lib/lucia";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
	
	const state = generateState();
    const codeVerifier = generateCodeVerifier();
	try {const url = await google.createAuthorizationURL(state, codeVerifier);

	cookies().set("google_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

    cookies().set("code_verifier", codeVerifier, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});
	return Response.redirect(url)
}
	catch(e) {
		return new Response(e as any, {status:403})
	}
	;
}

