'use client';
import CustomLink from "@/components/CustomLink";
import Link from "next/link";

const Nav = () => {
    return (
        <div className="p-4 text-gray-300 font-medium md:font-bold w-full">
        <ul className="flex items-center flex-wrap w-full gap-x-5 lg:gap-x-10">

            <CustomLink path={'/management' }>
                <Link href={'/management' }>
                    Management
                </Link>
            </CustomLink>

            <CustomLink path={'/management/collections'}>
                <Link href={'/management/collections'}>
                    Collections    
                </Link>
            </CustomLink>

            <CustomLink path={'/management/downloads'}>
                <Link href={'#'}>
                    Downloads    
                </Link>
            </CustomLink>
        </ul>
    </div>
    )
}

export default Nav