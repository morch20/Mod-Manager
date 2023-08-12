import CustomLink from "@/components/CustomLink";
import Link from "next/link";

const Nav = ({ id, gallery }) => {
    return (
        <div className="p-4 text-gray-300 font-medium md:font-bold w-full">
            <ul className="flex items-center flex-wrap w-full gap-x-5">

                <CustomLink path={'/mods/' + id}>
                    <Link href={'/mods/' + id}>
                        Description
                    </Link>
                </CustomLink>

                {
                    (gallery?.length > 0) &&
                    <CustomLink>
                        <a target="_blank" href={`https://modrinth.com/mod/${id}/gallery`}>Gallery</a>
                    </CustomLink>
                }

                <CustomLink>
                    <a target="_blank" href={`https://modrinth.com/mod/${id}/changelog`}>Changelog</a> 
                </CustomLink>

                <CustomLink path={'/mods/' + id + '/versions'}>
                    <Link href={'/mods/' + id + '/versions'}>
                        Versions    
                    </Link>
                </CustomLink>
            </ul>
        </div>
    )
}

export default Nav;