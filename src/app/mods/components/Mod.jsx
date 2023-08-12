import Image from "next/image";
import { AiOutlineHeart, AiOutlineDownload } from 'react-icons/ai';
import { RxUpdate, RxCube } from 'react-icons/rx';
import { calculateDate, nFormatter, isClientServer } from "@/utils/functions";
import Link from "next/link";

import { Save } from "@/components";

const Mod = ({ values }) => {

    const downloads = nFormatter(values.downloads, 2);
    const follows = nFormatter(values.follows, 2);
    const clientServer = isClientServer(values.client_side, values.server_side);
    const date = calculateDate(new Date() - new Date(values.date_modified));

    return (
        <div className='bg-[color:var(--gray)] p-4 rounded-xl w-full my-5 text-gray-400 shadow-md relative'>

            <div className="flex w-full gap-x-2 items-start my-2 leading-5 ">

                <div className="absolute top-5 right-5">
                    <Save values={values} />
                </div>

                <Link href={'mods/' + values.project_id}>

                    <Image
                        src={values.icon_url}
                        alt="Icon"
                        width={96}
                        height={96}
                        className="bg-gray-700 rounded-2xl"
                    />
                </Link>
                <div>
                    <div className="flex gap-x-2 sm:items-end flex-col sm:flex-row">
                        <Link href={'mods/' + values.project_id}>
                            <h3 className=' text-white text-xl xsm:text-2xl font-semibold leading-5'>
                                {values.title}
                            </h3>
                        </Link>

                        <p>by {values.author + ' '} </p>
                    </div>
                    <div className="my-2">
                        <p>{values.description}</p>
                    </div>
                </div>
            </div>


            <div className="w-full flex flex-wrap gap-x-5 justify-start my-2">
                <div className="flex gap-x-1 items-center">
                    {/* <Icons name={clientServer[1]} /> */}
                    {
                        clientServer &&
                        <h4 className="font-bold">{clientServer[0]}</h4>
                    }
                </div>
                <div className="flex gap-x-1 items-center">
                    <RxCube />
                    <p className=" first-letter:capitalize">{values.project_type}</p>
                </div>
                {
                    values.display_categories?.map( category => (
                        <div key={category}  className="flex gap-x-1 items-center">
                            {/* <Icons name={category} /> */}
                            <p className=" first-letter:capitalize" key={category}>{category}</p>
                        </div>
                    ))
                }
            </div>

            <div className="flex flex-col md:flex-row md:justify-between text-lg font-semibold">
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
                <div className="flex gap-x-1 items-center">
                    <RxUpdate />
                    <h4>Updated {date[0]} {date[1]} ago</h4>
                </div>
            </div>
        </div>
    )
}

export default Mod;