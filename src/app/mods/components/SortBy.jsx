'use client';
import { useState } from "react";
import { IoMdArrowDropdown } from 'react-icons/io';
import { useOutsideClick } from "@/hooks";
import { useSearchParams, useRouter } from "next/navigation";


const SortBy = ({ options, width, initial, query }) => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const [selectedWord, setSelectedWord] = useState(searchParams.get(query) || initial);
    const [open, setOpen] = useState(false);

    const ref = useOutsideClick(() => {
        setOpen(false);
    });

    const set = (selectedKey) => {
        let queries = `?${query}=${options[selectedKey]}`;
        
        for (const [key, value] of searchParams.entries()) {
            if(query !== key){
                queries += `&${key}=${value}`;
            }
        }
        
        router.push('/mods'+ queries);
    }

    return (
        <div ref={ref} className="relative">
            <button 
                className={width + " flex items-center justify-between active:bg-gray-600 bg-gray-700 p-2 text-gray-400 " + (open ? "rounded-t-xl" : "rounded-xl")}
                onClick={() => {
                    setOpen(prev => !prev);
                }}
            >
                <p>{selectedWord}</p>
                <IoMdArrowDropdown />
            </button>
            {
                open &&
                <div className="absolute right-0 h-fit bg-gray-700 text-gray-400 z-[10] rounded-b-xl">
                    {
                        Object.keys(options).map(i => (
                            <button 
                                key={i} 
                                className={"pl-2 w-full text-start py-2 " + (i === selectedWord ? "bg-[color:var(--green)] text-white" : "hover:bg-gray-600 ")}
                                onClick={() => {
                                    setSelectedWord(i);
                                    setOpen(false);
                                    set(i);
                                }}
                            >
                                {i}
                            </button>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default SortBy;