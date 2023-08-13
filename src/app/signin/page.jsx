'use client';
import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const SignIn = () => {

    const {data: session} = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [providers, setProviders] = useState(null);

    if(session?.user){
        const redirect = searchParams.get('redirect') || 'mods';
        router.push('/' + redirect);
    }
    
    useEffect(() => {
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
                            className='bg-white border-gray-400 border shadow-xl hover:shadow-gray-900 rounded-xl py-1 px-3 flex gap-x-5 items-center'
                        >
                            <span className="bg-white p-1 rounded">
                                <FcGoogle
                                    size={30}
                                />
                            </span>
                            <p className="sm:text-xl text-gray-700">Sign Up with {providers.google.name}</p>
                        </button>
                    </li>

                    <li key={providers.github.id}>
                        <button
                            onClick={() => {
                                signIn(providers.github.id);
                            }}
                            className='bg-white border-gray-400 border shadow-xl hover:shadow-gray-900 rounded-xl py-1 px-3 flex gap-x-5 items-center'
                        >
                            <span className="bg-[color:var(--background)] p-1 rounded">
                                <FaGithub
                                    size={30}
                                />
                            </span>
                            <p className="sm:text-xl text-gray-700">Sign Up with {providers.github.name}</p>
                        </button>
                    </li>
                </>

                
            }
        </>
    )
}

export default SignIn;