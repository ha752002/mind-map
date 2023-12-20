import {currentUser} from "@clerk/nextjs";

export default async function Page() {
    const user = await currentUser()
    if (user){
        console.log(user)
        return <>
            {JSON.stringify(user, null, 4)}
        </>
    }


}