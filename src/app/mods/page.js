'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Logo } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components";
import SortBy from "./components/SortBy";
import Mod from "./components/Mod";
import { sortByOptions, showPerPage } from "@/utils/constants";


const Mods = () => {

    const searchParams = useSearchParams();
    const [modArray, setModArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const query = searchParams.get('query');
        const index = searchParams.get('index') || 'relevance';
        const limit = searchParams.get('limit') || "20";

        let path = '/search?facets=[["project_type:mod"]]&';

        if(query){
            path += 'query=' + query + '&';
        }

        path += 'index=' + index + '&limit=' + limit;

        fetch(process.env.NEXT_PUBLIC_MOD_BASE_URL + path)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setModArray(data.hits);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
            setError(error.message);
        });

    }, [searchParams])

    return (
        <div className=" w-full min-h-[85dvh] flex flex-col items-center">
            
            <div className="flex flex-wrap p-2 w-[90%] justify-around items-center bg-[color:var(--gray)] rounded-lg shadow-md">
                <SearchBar query={'query'}/>

                <div className="flex my-2 gap-x-3 items-center">
                    <p className="hidden sm:block">Sort by</p>
                    <SortBy options={sortByOptions} width={'w-52'} initial={'Relevance'} query={'index'} />
                </div>

                <div className="flex gap-x-3 items-center">
                    <p className="hidden sm:block">Show per page</p>
                    <SortBy options={showPerPage} width={'w-20'} initial={'20'} query={'limit'} />
                </div>
            </div>
            <div className="w-[90%] min-h-[80dvh]">

                            
                {
                    isLoading &&
                    <div className="w-full h-[80dvh] flex items-center justify-center">
                        <Logo spin/>
                    </div>
                }
                {
                    error && 
                    <div className=' w-full h-[85dvh] my-5 flex flex-col justify-between items-center'>
                        <Image 
                            src={'/error.svg'}
                            alt='Error Image'
                            width={500}
                            height={500}
                            className=' object-cover'
                        />
                        <h2 className='text-4xl font-semibold'>Something went wrong!</h2>
                        <p>{error}</p>
                        <Link className='text-blue-500' href="/">Go back home</Link>
                    </div>
                } 
                {
                    modArray.map(i => (
                        <div key={i.project_id}>
                            <Mod values={i}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Mods;