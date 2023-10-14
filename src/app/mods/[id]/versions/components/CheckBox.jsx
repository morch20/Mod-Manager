'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { BsCheck } from 'react-icons/bs';


const CheckBox = ({ status, query }) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [checked, setChecked] = useState(status);

    const set = (selectedKey) => {
        setChecked(selectedKey);
        let queries = `?${query}=${selectedKey}`;
        
        for (const [key, value] of searchParams.entries()) {
            if(key !== query)queries += `&${key}=${value}`;
        }
        
        router.push(pathname + queries);
    }

    useEffect(() => setChecked(status), [status]);


    return (
        <div onClick={() => set(!checked)} className=" cursor-pointer flex items-center gap-x-3 text-gray-400 hover:text-gray-300">
            <span className={" transition-all shadow-md w-5 h-5 flex items-center justify-center rounded " + (checked ? 'bg-[color:var(--green)]' : 'bg-gray-700')}>
                { checked && <BsCheck className=" transition-all" color="black" size={30}/>}
            </span>
            <p>Show all versions</p>
        </div>
    )
}

export default CheckBox