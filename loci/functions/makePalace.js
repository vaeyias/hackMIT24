import { getUser } from "./getUser";

export default async function makePalace(name){
    user = await getUser();

    const palaceId = new mongoose.Types.ObjectId();

    await Palace.create({
        name: name,
        ObjectId: palaceId,
        icon: "loci/public/icons/default.png",
        items: [{}]
    });

    user.palaces.push(palaceId);
}