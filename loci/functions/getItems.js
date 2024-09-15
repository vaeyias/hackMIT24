import { getUser } from "./getUser";

export default async function getItems(palaceId){
    user = await getUser();

    for(const palace of user.palaces()){
        if(palace.ObjectId === palaceId){
            return palace.items;
        }
    }

    return new Error("palace does not exist for this user");
}