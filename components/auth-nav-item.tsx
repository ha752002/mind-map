"use client";
import {useAuth, UserButton} from "@clerk/nextjs";
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";

const AuthNavItem = () => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    // console.log(isLoaded, userId, sessionId)
    // In case the user signs out while on the page.
    const router = useRouter();
    if (!isLoaded || !userId) {
        return <>
            <Button onClick={() => router.push("/auth/sign-in")}>Sign In</Button>
            <Button onClick={() => router.push("/auth/sign-up")}>Sign Up</Button>
        </>;
    }

    return (
        <div>
            <UserButton afterSignOutUrl={"/"}></UserButton>
        </div>
    );
};

export default AuthNavItem;