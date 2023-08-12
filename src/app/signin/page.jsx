'use client';
import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {

    const {data: session} = useSession();
    const router = useRouter();
    const [providers, setProviders] = useState(null);
    
    useEffect(() => {
        if(session?.user){
            router.push('/mods');
        }
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        setUpProviders();
    }, [session])

    return (
        <>
            {
                providers &&
                <>
                    <li key={providers.google.id}>
                        <button
                            onClick={() => {
                                signIn(providers.google.id);
                            }}
                            className='bg-[color:var(--green)] rounded-xl py-1 px-3 flex gap-x-5 items-center'
                        >
                            <span className="bg-white p-1 rounded">
                                <FcGoogle
                                    size={30}
                                />
                            </span>
                            <p className="sm:text-xl">Sign Up with {providers.google.name}</p>
                        </button>
                    </li>

                    <li className="flex w-3/4 items-center gap-x-5 ">
                            <hr className=" w-full h-[1px] bg-gray-500" />
                            <p>Or</p>
                            <hr className=" w-full h-[1px] bg-gray-500" />
                    </li>

                    <li key={providers.github.id}>
                        <button
                            onClick={() => {
                                signIn(providers.github.id);
                            }}
                            className='bg-[color:var(--green)] rounded-xl py-1 px-3 flex gap-x-5 items-center'
                        >
                            <span className="bg-[color:var(--background)] p-1 rounded">
                                <FaGithub
                                    size={30}
                                />
                            </span>
                            <p className="sm:text-xl">Sign Up with {providers.github.name}</p>
                        </button>
                    </li>
                </>

                
            }
        </>
    )
}

export default SignIn;