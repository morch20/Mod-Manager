'use client';
import { useEffect, useState } from "react";
import { Logo } from "@/components";
import Link from "next/link";

const Collections = () => {

    const [pending, setPending] = useState(false);
    const [collections, setCollections] = useState([]);
    
    useEffect(() => {

        setPending(true);
        const controller = new AbortController();

        fetch('/api/collections', {signal: controller.signal})
        .then(response => response.json())
        .then(data => {
            data.unshift('All Posts');
            setCollections(data);
            setPending(false);
        })
        .catch(e => {
            console.log(e);
            setPending(false);
        })

        return () => controller.abort();

    }, [])

    return (
        <>
            <div className="w-[90%] mb-10 h-fit">

                <h2 className="text-3xl my-5 font-semibold text-gray-300">Collections</h2>

                <div className="w-full grid grid-auto-fill gap-10 justify-center h-fit">
                    {
                        collections.map(i => 
                            <Link href={'/management/collections/' + i} key={i} className=" w-60 h-60 rounded-xl shadow-xl hover:shadow-gray-900 cursor-pointer ">
                                <div className="w-full hover:text-9xl h-3/4 bg-gray-700 rounded-t-xl flex items-center justify-center">
                                    <h1 className=" text-8xl font-extrabold ">{i[0]}</h1>
                                </div>
                                <div className="p-4 bg-[color:var(--gray)] rounded-b-xl">
                                    <h4 title={i} className="text-lg font-semibold text-gray-400">
                                        {
                                            (i.length > 22)
                                            ?
                                                <>{i.substring(0, 19) + '...'}</>
                                            :
                                                <>{i}</>
                                        }
                                    </h4>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>

            {
                pending &&
                <div className="w-full h-full flex items-center justify-center">
                    <Logo spin />
                </div>
            }
        </>
    )
}

export default Collections;