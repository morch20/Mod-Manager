'use client';
import { useSession } from "next-auth/react";

const Welcome = () => {

    const {data: session} = useSession();

    return (
        <div>
            <div className=" my-2 text-4xl sm:text-5xl font-bold flex flex-col items-center">
                <h1 className="shake py-2">
                    Welcome back <span className="absolute ">👋</span>
                </h1>
                <h1 className="text-[color:var(--green)]">
                    {" " + session?.user.name}
                </h1>
            </div>
        </div>
    )
}

export default Welcome;