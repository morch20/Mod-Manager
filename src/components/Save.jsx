'use client';
import { useSession } from 'next-auth/react';
import { BsFillBookmarkFill, BsBookmark, BsBookmarkDash } from 'react-icons/bs';
import { AiOutlineLoading, AiOutlinePlus, AiOutlineClose, AiOutlinePlusCircle, AiOutlineDelete } from 'react-icons/ai';
import Link from "next/link";
import { useEffect, useState, useRef } from 'react';
import { useOutsideClick } from '@/hooks';
import Image from 'next/image';


const Save = ({ values, text }) => {

    const {data: session} = useSession();
    const [pending, setPending] = useState(false);
    const [isSaved, setIsSaved] = useState('');
    const [openPopUp, setOpenPopUp] = useState(false);
    const [collections, setCollections] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');

    const currentModCollections = useRef([]);


    const ref = useOutsideClick(() => {
        setOpenPopUp(false);
        handleCloseAddCollection();
    })

    const getCollections = () => {

        setCollections(null);
        fetch('/api/collections')
        .then(response => response.json())
        .then(data => {

            setCollections(data);

        })
        .catch(e => {
            console.log(e);
            setCollections([]);
        });
    }

    const addToCollection = (collectionName, remove = false) => {

        setPending(true);

        fetch('/api/mods/' + values.project_id + (remove ? '?remove=true' : ''), {
            method: 'PATCH',
            body: JSON.stringify({
                collections: collectionName.trim(),
                project_id: values.project_id,
                project_typ: values.project_type,
                title: values.title,
                icon_url: values.icon_url,
                client_side: values.client_side,
                server_side: values.server_side,
                categories: values.categories,
                loaders: values.loaders
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data?.collections){
                currentModCollections.current = data.collections;
                setIsSaved('text-white');
            }
            setPending(false);
        })
        .catch(e => {
            console.log(e);
            setPending(false);
        })
    }

    const deleteMod = () => {

        setPending(true);

        fetch('/api/mods/' + values.project_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if(data?.deleted){
                setIsSaved('');
            }
            setPending(false);
        })
        .catch(e => {
            console.log(e);
            setPending(false);
        })
    }

    const handleCreateCollection = () => {
        if(newCollectionName && newCollectionName.trim()){
            fetch('/api/collections', {
                method: 'PATCH',
                body: JSON.stringify({
                    collections: newCollectionName.trim()
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Creating collection', data);
                if(data.saved){
                    addToCollection(newCollectionName);
                    handleCloseAddCollection();
                }
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    const handleAddCollection = () => {
        setShowInput(true);
    }

    const handleCloseAddCollection = () => {
        setShowInput(false);
        setNewCollectionName('');
    }

    const handleClick = () => {
        setOpenPopUp(true);
        getCollections();
    }

    useEffect(() => {

        if(session?.user){
            setPending(true);
            fetch('/api/mods/' + values.project_id)
            .then(response => response.json())
            .then(data => {
                if(data.found){
                    console.log(data)
                    setIsSaved('text-white');
                    currentModCollections.current = data.collections;
                    console.log(currentModCollections)
                }
                setPending(false)
            })
            .catch(e => {
                console.log(e);
                setPending(false);
            });
        }

    }, []);

    if(session?.user){
        return (
            <>
                {
                    pending
                    ?
                        <div className=' animate-spin'>
                            <AiOutlineLoading />
                        </div>
                    :
                        <div onClick={handleClick} className={isSaved + ' last:relative'}>
                            {
                                text
                                ?
                                    <button className=" hover:text-gray-300 flex items-center justify-center gap-x-1 py-1 px-2 font-semibold w-28 bg-gray-700 active:bg-gray-600 rounded-xl">
                                        {isSaved === 'text-white' ? <BsFillBookmarkFill /> : <BsBookmark />}
                                        <p>{isSaved === 'text-white' ? 'Saved' : "Save"}</p>
                                    </button>
                                :
                                    <button>
                                        {isSaved === 'text-white' ? <BsFillBookmarkFill /> : <BsBookmark />}
                                    </button>
                            }
                            {
                                openPopUp &&
                                <div ref={ref} className={(text ? '-left-3 ' : '-right-3 ') +  'absolute z-[1] w-64 h-[22rem] overflow-y-auto scrollbar-none bg-[color:var(--background)] rounded-lg shadow-lg shadow-gray-900'}>

                                    <div className='w-full p-3 flex justify-between items-center sticky top-0 bg-gray-800'>
                                        <div className='flex items-center'>
                                            <Image
                                                src={values.icon_url}
                                                width={40}
                                                height={40}
                                                alt='icon'
                                                className='bg-gray-700 rounded-xl'
                                            />
                                            {
                                                isSaved === 'text-white' &&
                                                <h5 className='ml-3 text-gray-400 '>Saved</h5>
                                            }
                                        </div>
                                        <div>
                                            {
                                                isSaved === 'text-white'
                                                ?
                                                    <button onClick={deleteMod}>
                                                        <BsFillBookmarkFill />
                                                    </button>
                                                :
                                                    <button onClick={() => addToCollection('All Posts')}>
                                                        <BsBookmark />
                                                    </button>
                                            }
                                        </div>
                                    </div>

                                    <div className='flex p-3 justify-between items-center '>
                                        <h4 className='text-lg font-bold'>
                                            {
                                                showInput
                                                ?
                                                    <>New Collection</>
                                                :
                                                    <Link href={'/management/collections'}>Collections</Link>     
                                            }
                                        </h4>
                                        <div>
                                            <button>
                                                {
                                                    showInput
                                                    ?
                                                        <AiOutlineClose onClick={handleCloseAddCollection} />
                                                    :
                                                        <AiOutlinePlus onClick={handleAddCollection} />
                                                }
                                            </button>
                                        </div>
                                    </div>

                                    <ul>
                                        {
                                            showInput
                                            ?
                                                <div className='flex flex-col p-3 justify-center items-center w-full'>
                                                    <input
                                                        onChange={e => setNewCollectionName(e.target.value)}
                                                        value={newCollectionName}
                                                        placeholder='Collection name...'
                                                        type="text"
                                                        className='outline-none p-2 bg-[color:var(--gray)] my-5 w-full h-10 focus:border-green-500 rounded-lg'
                                                    />
                                                    
                                                    <button onClick={handleCreateCollection} className={'w-1/2 my-2 rounded-xl p-2 ' + ( (newCollectionName && newCollectionName.trim()) ? 'text-white bg-[color:var(--green)]' : 'cursor-default bg-gray-700' )}>
                                                        Save
                                                    </button>
                                                </div>
                                            :
                                                <>
                                                    {
                                                        (!collections)
                                                        ?
                                                            <div className='w-full h-full p-5'>
                                                                <AiOutlineLoading className=' animate-spin'/>
                                                            </div>
                                                        :
                                                            <>
                                                                {
                                                                    collections.map(i => 
                                                                        <li 
                                                                            onClick={() => {
                                                                                if(isSaved && currentModCollections.current.includes(i)){
                                                                                    console.log('You tried to delete huh?');
                                                                                    addToCollection(i, true);
                                                                                }
                                                                                else{
                                                                                    addToCollection(i);
                                                                                }
                                                                            }} 
                                                                            className='m-2 p-2 hover:bg-[color:var(--gray)] cursor-pointer rounded-lg flex gap-x-2 items-center' 
                                                                            key={i}
                                                                        >
                                                                            <div className='bg-gray-700 rounded-xl w-12 h-10 uppercase flex items-center justify-center text-lg font-extrabold'>
        
                                                                                <>{i[0]}</>
                                                                            </div>
        
                                                                            <div className='w-full flex items-center justify-between'>
                                                                                <p className='w-4/5'>{i}</p>
                                                                                {
                                                                                    (isSaved && currentModCollections.current.includes(i))
                                                                                    ?
                                                                                        <AiOutlineDelete title='Remove from collection' />
                                                                                    :
                                                                                        <AiOutlinePlusCircle title='Add to collection' />
                                                                                }
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                }
                                                            </>
                                                    }
                                                </>
                                        }
                                    </ul>

                                </div>
                            }
                        </div>

                }

            </>
        )
    }

    return (
        <Link href="/signin">
            {
                text
                ?
                    <button className=" hover:text-gray-300 flex items-center justify-center gap-x-1 py-1 px-2 font-semibold w-28 bg-gray-700 active:bg-gray-600 rounded-xl">
                        <BsBookmarkDash />
                        <p>Save</p>
                    </button>
                :
                    <BsBookmarkDash />
            }
        </Link>
    )
}

export default Save;