'use client';
import Link from "next/link";
import { useState } from "react";
import Hamburger from "hamburger-react";
import { Logo } from ".";
import { useOutsideClick } from "@/hooks";
import { signOut, useSession } from "next-auth/react";
import CustomLink from "./CustomLink";
import Image from "next/image";

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const {data: session} = useSession();

    const [openProfile, setOpenProfile] = useState(false);


    const ref = useOutsideClick(() => {
        setOpen(false);
    });

    const refProfile = useOutsideClick(() => {
        setOpenProfile(false);
    });

    const handleLinkClicked = () => {
        setOpen(false);
    }
    
    return (
        <nav className="h-20 w-full flex items-center justify-around">
            <Link href={'/'} className="flex items-center gap-x-2">
                
                <Logo size={40}/>
                <h3 className=" font-bold">Mod Manager</h3>
            </Link>

            <ul className="hidden md:flex items-center gap-x-6 lg:gap-x-10">
                <CustomLink path={'/mods'}>
                    <Link href={'/mods'}>Mods</Link>
                </CustomLink>

                <CustomLink path={'/management'}>
                    <Link href={'/management'}>Management</Link>
                </CustomLink>
                
                <li className="nav__links__animation">
                    <a href={'https://modrinth.com/'} target= "_blank" rel="noreferrer">Modrinth</a>
                </li>
                {
                    session?.user
                    ?
                        <li ref={refProfile} onClick={() => setOpenProfile(prev => !prev)} className="relative">
                                <Image
                                    src={session.user.image}
                                    width={40}
                                    height={40}
                                    alt="Profile Icon"
                                    className="rounded-full cursor-pointer"
                                />

                                {
                                    openProfile &&
                                    <div className="absolute z-10 flex flex-col justify-around -right-5 w-60 h-44 p-4 bg-[color:var(--gray)] rounded-lg shadow-xl">
                                        <p>Profile</p>
                                        <p>Settings</p>
                                        <button 
                                            onClick={signOut} 
                                            className="bg-[color:var(--green)] rounded-xl py-1 px-3"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                }
                        </li>
                    :
                        <li>
                            <Link 
                                href={'/signin'}
                                className='bg-[color:var(--green)] rounded-xl py-1 px-3'
                            >
                                Sign In 
                            </Link>
                        </li>
        
                }
            </ul>

            <div ref={ref} className="block md:hidden relative">
                <Hamburger
                    toggled={open}
                    toggle={setOpen}
                    size={25}
                    duration={0.7}
                />
                {
                    open &&
                    <ul className="flex flex-col md:hidden items-center right-0 absolute z-10 bg-slate-700/90 rounded-md">
                        <CustomLink path={'/mods'} onClick={handleLinkClicked} className="my-5 mx-10 nav__links__animation">
                            <Link href={'/mods'}>Mods</Link>
                        </CustomLink>
                        <CustomLink path={'/management'} onClick={handleLinkClicked} className="my-5 mx-10 nav__links__animation">
                            <Link href={'/management'}>Management</Link>
                        </CustomLink>
                        <li className="my-5 mx-10 nav__links__animation">
                            <a href={'https://modrinth.com/'} target= "_blank" rel="noreferrer">Modrinth</a>
                        </li>

                        {
                            session?.user
                            ?
                                <li onClick={handleLinkClicked} className="my-5 mx-10">
                                    <button onClick={signOut} className="bg-[color:var(--green)] rounded-xl py-1 px-3">
                                        Sign Out
                                    </button>
                                </li>
                            :
                                
                                <li onClick={handleLinkClicked} className="my-5 mx-10">
                                    <Link
                                        href={'/signin'}
                                        className='bg-[color:var(--green)] rounded-xl py-1 px-3'
                                    >
                                        Sign In
                                    </Link>
                                </li>
                                
                        }
                    </ul>
                }
            </div>
        </nav>
    )
}

export default Navbar;