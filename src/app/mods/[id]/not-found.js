import Link from 'next/link';
import Image from 'next/image';

 
export default function NotFound() {
    return (
        <div className='w-full h-[85dvh] flex flex-col justify-between items-center'>
            <Image
                src={'/404.svg'}
                width={500}
                height={500}
                alt='Not found'
                className=' object-cover'
            />
            <h2 className='text-4xl font-semibold'>Page Not Found</h2>
            <p>Could not find requested resource</p>
            <Link className='text-blue-500' href="/mods">Go back to Mods</Link>
        </div>
    )
}