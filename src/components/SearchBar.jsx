'use client';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { useOutsideClick } from '@/hooks';
import { useSearchParams, useRouter } from 'next/navigation';

const SearchBar = ({ query }) => {

	const searchParams = useSearchParams();
    const router = useRouter();

	const [clear, setClear] = useState(false);
	const [active, setActive] = useState(false);
	const [text, setText] = useState(searchParams.get(query) || '');
	const ref = useOutsideClick(() => {
		setActive(false);
	})

	const set = (newText) => {

		setClear( (newText === '' ? false : true) );
		setText(newText);
        let queries = (newText === '') ? '?' : `?${query}=${newText}`;
        
        for (const [key, value] of searchParams.entries()) {
            if(query !== key){
                queries += (newText === '' ? `${key}=${value}&` : `&${key}=${value}`);
            }
        }

		if(newText === '') queries = queries.substring(0, queries.length - 1);
        
        router.push('/mods'+ queries);
    }

    return (
    	<div
			ref={ref}
			onClick={() => {
				setActive(true);
			}} 
			className={"relative bg-gray-700 text-gray-400 p-1 rounded-xl w-64 h-10 flex items-center " + (active ? "outline-green-500 outline": "")}
		>
			<AiOutlineSearch size={20} />
			<input 
				type="text" 
				className="absolute w-full left-0 h-full pl-10 outline-none bg-transparent focus:border-green-500 rounded-xl"
				placeholder="Search..."
				value={text}
				onChange={e => set(e.target.value)}
			/>

			{
				clear &&
				<button 
					onClick={() => set('')} 
					className='absolute right-5'
				>
					<AiOutlineClose />
				</button>

			}

		</div>
    )
}

export default SearchBar;