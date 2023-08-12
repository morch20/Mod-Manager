'use client';
import { useEffect, useState } from "react";
import { Logo } from "@/components";
import { AiOutlineDelete } from 'react-icons/ai';
import Mod from "./components/Mod";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Collection = ({ params }) => {

    const [pending, setPending] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [empty, setEmpty] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);
    const router = useRouter();

    const handleDelete = () => {
        setOpenDelete(false);
        setPending(true);

        fetch('/api/collections/' + params.id, {
            method: 'DELETE'
        })
        .then(response => {
            if(response.ok){
                router.push('/management/collections');
            }
            else{
                setPending(false);
                setError(true);
            }
        })
        .catch(e => {
            console.log(e);
            setPending(false);
            setError(true);
        })
    }


    useEffect(() => {

        setPending(true);
        fetch('/api/collections/' + params.id)
        .then(response => {
            if(response.status === 404){
                setError(true);
                setPending(false);
                return 404;
            }
            return response.json();
        })
        .then(responseData => {

            if(responseData === 404) return;

            if(responseData.length === 0){
                setEmpty(true);
            }
            else {
                setData(responseData);
            }
            setPending(false);
        })
        .catch(e => {
            console.log(e);
            setPending(false);
        })

    }, [])

    return (
        <div className="w-[90%] mb-10 h-fit relative">

            {
                openDelete &&
                <div className="absolute z-10 top-[10%] left-1/2 -translate-x-1/2 w-full max-w-[26rem] h-52 flex flex-col justify-between rounded-xl bg-[color:var(--gray)] p-4">
                    <h2 className="text-3xl font-semibold w-full">
                        Delete {params.id.replaceAll('%20', ' ')} collection?🤔
                    </h2>

                    <div className="w-full flex justify-around items-center">
                        <button onClick={handleDelete} className="py-2 px-4 sm:py-4 sm:px-6 bg-red-400 rounded-lg">
                            Delete
                        </button>
                        <button className="py-2 px-4 sm:py-4 sm:px-6 border rounded-lg" onClick={() => setOpenDelete(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            }

            <div className="h-fit w-full flex items-center justify-between">
                <h2 className="text-3xl my-5 font-semibold text-gray-300">
                    {params.id.replaceAll('%20', ' ')}
                </h2>
                {
                    (params.id !== 'All%20Posts') &&
                    <button onClick={() => setOpenDelete(true)} title="Delete collection" className="p-2 rounded-lg bg-red-400">
                        <AiOutlineDelete />
                    </button>
                }
            </div>

                {
                    (data.length > 0 && !pending)&&
                    <div className="w-full grid grid-auto-fill gap-8 justify-center h-fit">
                        {data.map((val, index, array) => 
                            <Mod key={array[array.length - 1 - index]._id} values={array[array.length - 1 - index]} />
                        )}
                    </div>
                }

            {
                pending &&
                <div className="w-full h-full flex items-center justify-center">
                    <Logo spin />
                </div>
            }

            {
                (!error && empty) &&
                <div className="w-full h-full my-10 flex flex-col items-center justify-center">
                    <Image
                        src={'/empty.svg'}
                        height={300}
                        width={300}
                        alt="Empty"
                        
                    />
                    <h2 className="my-10 text-4xl font-bold">
                        It looks like your collection is empty 😖
                    </h2>
                </div>   
            }
            {
                error &&
                <div className="w-full h-full my-10 flex flex-col items-center justify-center">
                    <Image
                        src={'/error.svg'}
                        height={300}
                        width={300}
                        alt="Empty"
                        
                    />
                    <h2 className="my-10 text-4xl font-bold">
                        An error ocurred loading this page 🤖
                    </h2>
                </div>
            }
        </div>
    )
}

export default Collection;