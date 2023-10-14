'use client';
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useOutsideClick } from "@/hooks";
import { AiOutlineClose } from 'react-icons/ai';
import { useSearchParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";


const Filter = ({ options, placeholder, query }) => {

	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const [open, setOpen] = useState(false);
	const [searchBarString, setSearchBarString] = useState('');
	const initialQuery = searchParams.getAll(query) || [];
	const [array, setArray] = useState((typeof initialQuery === 'string') ? [initialQuery] : initialQuery);

	const ref = useOutsideClick(() => {
		setOpen(false);
	}, []);

	useEffect(() => {
		setArray((typeof initialQuery === 'string') ? [initialQuery] : initialQuery)
	}, [searchParams])

	const set = (selectedKey) => {
        let queries = `?${query}=${selectedKey}`;
        
        for (const [key, value] of searchParams.entries()) {
                queries += `&${key}=${value}`;
        }
        
        router.push(pathname + queries);
    }

	const unSet = (selectedKey) => {
        let queries = '';

		for (const [key, value] of searchParams.entries()) {
            if(query === key && selectedKey === value){
				continue;
			}
			else{
				queries += `&${key}=${value}`;
			}
        }

		queries = '?' + queries.substring(1);
        router.push(pathname + queries);
	}

	return (
		<div ref={ref} className="relative">
			<div
				className={
					" w-52 min-w-fit cursor-pointer hover:shadow-md p-2 hover:text-white active:bg-gray-600 bg-gray-700 text-gray-400 " 
					+ (open ? "rounded-t-xl" : "rounded-xl")
				}
			>
				<div className="flex flex-wrap gap-3 w-full h-full">
					{
						array.map((item, index) => {
							return (
								<button
									key={index}
									className=" flex items-center border-2 border-[color:var(--green)] text-white rounded-xl p-1"
									onClick={() => {
										setArray(prev => prev.filter(i => i !== item));
										unSet(item);
									}}
								>
									<p className="mr-2 text-sm first-letter:capitalize">{item}</p>
									<AiOutlineClose />
								</button>
							)
						})
					}
				</div>

				<div className={"flex my-1 items-center w-full h-full justify-between "}>

					<input
						type="text"
						placeholder={(open ? placeholder : (array.length > 0) ? '' : placeholder)}
						className="w-[94%] h-full outline-none bg-inherit placeholder:hover:text-white "
						value={searchBarString}
						onChange={e => setSearchBarString(e.target.value)}
						onClick={() => setOpen(true)}
					/>

					<IoMdArrowDropdown onClick={() => setOpen(prev => !prev)} className={" transition-all " + (open ? "rotate-180" : "")} />
				</div>
			</div>
			{open && (
				<div className="absolute border-t border-gray-600 w-full right-0 h-fit max-h-72 overflow-y-auto bg-gray-700 text-gray-400 z-[10] shadow-md rounded-b-xl">
					{options.map((i, index) => {
						if (array.includes(i) || !i.toLocaleLowerCase().includes(searchBarString.toLowerCase())) return <></>;
						return (
							<button
								key={i + index}
								className="pl-2 w-full text-start py-2 hover:text-white hover:bg-gray-600"
								onClick={() => {
									setSearchBarString('');
									set(i);
								}}
							>
								<p className=" first-letter:capitalize">{i}</p>
							</button>
						)
					})}
				</div>
			)}
		</div>
	);
};

export default Filter;
