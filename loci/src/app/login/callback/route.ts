// import { google, lucia } from "@/lib/lucia"
// import { cookies } from "next/headers";
// import { OAuth2RequestError } from "arctic";
// import { generateIdFromEntropySize } from "lucia";

// export async function GET(request: Request): Promise<Response> {
// 	const url = new URL(request.url);
// 	const code = url.searchParams.get("code");
// 	const state = url.searchParams.get("state");
//     const storedCodeVerifier = cookies().get("code_verifier")?.value??null;
// 	const storedState = cookies().get("google_oauth_state")?.value ?? null;
// 	if (!code || !state || !storedState || !storedCodeVerifier || state !== storedState) {
// 		return new Response(null, {
// 			status: 401, 
// 			statusText: "first",
// 			headers: {"stored_code_verifier": storedCodeVerifier??'null', "stored_state":storedState??"null"}
// 		});
// 	}
// 	const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);

// 		const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
// 			headers: {
// 				Authorization: `Bearer ${tokens.accessToken}`,
// 				scope: "openid email profile",
// 				"Access-Control-Allow-Origin": "*"
// 			}
// 		});
// 		const googleUser: GoogleUser = await googleUserResponse.json();
// 	try {
		
		// return new Response(null, {
		// 	status: 200,
		// 	statusText: "Validated user",
		// 	headers: {
		// 		googleuser: JSON.stringify(googleUser)
		// 	}
		// });

		// const existingUser : any = await db("SELECT id FROM users WHERE id = $1", [googleUser.sub]);
		
// 		if (existingUser.length > 0) { // new Response.redirect([level url])
// 			const session = await lucia.createSession(existingUser[0].id, {});
// 			const sessionCookie = lucia.createSessionCookie(session.id);
// 			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// 			return new Response(null, {
// 				status: 302,
// 				headers: {
// 					Location: "/level/" //change
// 				}
// 			});
// 		}

// 		// below only runs when new user
// 		// const userId : string = generateIdFromEntropySize(10); // 16 characters long
// 		try {
// 			await db("INSERT INTO users ( id, picture ) VALUES ($1, $2)", [googleUser.sub, googleUser.picture]);
// 		}
// 		catch(e : any) {
// 			if(e instanceof NeonDbError) {return new Response(JSON.stringify(e), {status: 511})}
// 			else return new Response(null, {
// 				status: 598, 
// 				statusText: e,
// 				headers: {"GoogleUser": JSON.stringify(googleUser),
// 							"google_id" : googleUser.sub 
// 				}
// 			});
// 		}
// 		const session = await lucia.createSession(googleUser.sub??"5", {});
// 		console.log("google user")
// 		console.log(googleUser)
// 		const sessionCookie = lucia.createSessionCookie(session.id);
// 		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// 		return new Response(null, {
// 			status: 302,
// 			headers: {
// 				Location: "/level/"
// 			}
// 		});
// 	} catch (e : any) {
// 		// the specific error message depends on the provider
// 		if (e instanceof OAuth2RequestError) {
// 			// invalid code
// 			return new Response(null, {
// 				status: 402,
// 				statusText: "invalid code",
// 				headers: {msg: e.message},
// 			});
// 		}
// 		console.log(JSON.stringify(e) +" google user: "+ JSON.stringify(googleUser))
// 		return new Response(JSON.stringify(e) +" google user: "+ JSON.stringify(googleUser) + " sub " + googleUser.sub
// 		+ "found user " + JSON.stringify(await db("SELECT id FROM users WHERE id = $1", [googleUser.sub])) + " length " + 
// 		(await db("SELECT id FROM users WHERE id = $1", [googleUser.sub])).length, {
// 			status: 505,
// 			statusText: e, headers: {msg: e}
// 		});
// 	}
// }

// interface GoogleUser {
// 	sub: string;
// 	picture: string;
// }