import { getUser } from "./getUser";

export default async function getPalaces(){
    user = await getUser();
    return user.palaces;
}