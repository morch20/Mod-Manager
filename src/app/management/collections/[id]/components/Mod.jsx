import { isClientServer } from "@/utils/functions";
import { Save } from "@/components";
import Image from "next/image";
import { RxCube } from 'react-icons/rx';
import Link from "next/link";


const Mod = ({ values }) => {
    console.log(values)
    const clientServer = isClientServer(values.client_side, values.server_side);

    return (

        <div className=" w-60 h-60 rounded-xl shadow-xl hover:shadow-gray-900 relative">
                <div className="absolute top-5 right-5">
                    <Save values={values} />
                </div>
            <div className="w-full hover:text-9xl h-3/4 bg-gray-700 rounded-t-xl flex items-center justify-center">
                <Link href={'/mods/' + values.project_id}>
                    <Image
                        src={values.icon_url}
                        alt="Icon"
                        width={150}
                        height={150}
                        className=" rounded-2xl"
                    />
                </Link>
            </div>
            <div className="p-2 bg-[color:var(--gray)] rounded-b-xl text-gray-400">
                <h4 title={values.title} className="text-lg font-semibold text-gray-300">
                    {
                        (values.title.length > 22)
                        ?
                            <>{values.title.substring(0, 19) + '...'}</>
                        :
                            <>{values.title}</>
                    }
                </h4>
                <div className="w-full flex flex-wrap gap-x-5 justify-start">
                    <div className="flex gap-x-1 items-center">
                        {/* <Icons name={clientServer[1]} /> */}
                        <p >{clientServer[0]}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mod;