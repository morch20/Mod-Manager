
import Image from "next/image";
import { RxCube, RxUpdate } from 'react-icons/rx';
import { isClientServer, nFormatter, calculateDate } from "@/utils/functions";
import { AiOutlineHeart, AiOutlineDownload, AiOutlineCalendar } from 'react-icons/ai';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { Save } from "@/components";
// import { Icons } from "@/components";


export default async function Info({ info }) {

    const clientServer = isClientServer(info.client_side, info.server_side);
    const downloads = nFormatter(info.downloads, 2);
    const follows = nFormatter(info.followers, 2);
    const updated =  calculateDate(new Date() - new Date(info.updated));
    const created =  calculateDate(new Date() - new Date(info.published));

    

    return (
        <div className="p-4 text-gray-400 relative">

            <Image
                src={info.icon_url}
                alt="Icon"
                width={96}
                height={96}
                className="bg-gray-700 rounded-2xl "
            />
            <div className="leading-5 my-2">
                <h3 className=' text-white text-2xl xsm:text-3xl font-semibold leading-5'>
                    {info.title}
                </h3>
                <div className="flex gap-x-1 items-center ">
                    <RxCube />
                    <p className=" first-letter:uppercase">
                        {info.project_type}
                    </p>
                </div>
            </div>

            <div className="leading-5 my-2">
                <p>{info.description}</p>
            </div>

            <div className="w-full flex flex-wrap gap-x-5 justify-start my-2 ">
                <div className="flex gap-x-1 items-center">
                    {/* <Icons name={clientServer[1]} /> */}
                    <h4 className="font-bold">{clientServer[0]}</h4>
                </div>
                {
                    info.categories?.map( category => (
                        <div key={category}  className="flex gap-x-1 items-center">
                            {/* <Icons name={category} /> */}
                            <p className=" first-letter:capitalize" key={category}>{category}</p>
                        </div>
                    ))
                }
            </div>

            <hr />

            <div className="my-2 text-xl font-semibold">

                    <div className="flex gap-x-1 items-center">
                        <AiOutlineDownload />
                        <h4>{downloads} </h4> 
                        <span className=" text-base font-normal"> downloads</span>
                    </div>

                    <div className="flex gap-x-1 items-center">
                        <AiOutlineHeart />
                        <h4>{follows}</h4> 
                        <span className=" text-base font-normal">followers</span>
                    </div>

            </div>
            <div className="my-2 leading-5">
                <div className="flex gap-x-1 items-center">
                    <AiOutlineCalendar />
                    <p>Created {created[0]} {created[1]} ago</p>
                </div>
                <div className="flex gap-x-1 items-center">
                    <RxUpdate />
                    <p>Updated {updated[0]} {updated[1]} ago</p>
                </div>
            </div>

            <hr />

            <div className="my-2 w-fit">
                {/* <button className=" hover:text-gray-300 flex items-center justify-center gap-x-1 py-1 px-2 font-semibold w-28 bg-gray-700 active:bg-gray-600 rounded-xl">
                    <BsFillBookmarkFill />
                    <p>Save</p>
                </button> */}
                <Save values={info} text/>
            </div>
        </div>
    )
}
