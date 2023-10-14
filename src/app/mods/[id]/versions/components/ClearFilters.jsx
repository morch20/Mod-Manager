'use client';
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineCloseCircle } from 'react-icons/ai';

const ClearFilters = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const isActive = (searchParams.toString() ? (searchParams.toString() === 's=false' ? false : true) : false);
    const [active, setActive] = useState(isActive);

    useEffect(() => {
        setActive((searchParams.toString() ? (searchParams.toString() === 's=false' ? false : true) : false));
    }, [searchParams])

    return (
        <div 
            onClick={() => {
                if(active){
                    router.push(pathname);
                }
            }}
            className={" shadow flex items-center font-medium text-gray-400 gap-x-3 h-fit rounded-xl p-2 "
                + (active ? 'bg-gray-700 cursor-pointer hover:text-gray-300' : 'bg-gray-800 cursor-not-allowed')
            }
            >
            <AiOutlineCloseCircle />
            <p>Clear filters</p> 
        </div>

    )
}

export default ClearFilters;