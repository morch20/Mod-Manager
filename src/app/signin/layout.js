import Link from "next/link";
import { Logo } from "@/components";
import Image from "next/image";

const Layout = ({children}) => {
    return (
        <div className=" flex justify-center ">
            <div className="flex items-start flex-col px-10">
                <h2 className="text-3xl my-2">Log in to your account</h2>
                <div className="flex items-center text-[color:var(--green)]">
                    <Logo size={25} />
                    <h3 className="text-xl px-2">Mod Manager</h3>
                </div>
                <ul className="w-full h-52 my-8 flex flex-col justify-evenly">
                    {children}
                </ul>
                <Link className='text-blue-500 ' href="/">Go back home</Link>
            </div>
            <div className="hidden md:flex w-3/5 h-[80dvh] items-center justify-center">
                <Image 
                    src={'/signin.svg'}
                    width={400}
                    height={400}
                    alt="Sign in"
                    className=" object-cover"
                />
            </div>
        </div>
    )
}

export default Layout;