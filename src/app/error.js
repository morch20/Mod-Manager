'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error }) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className=' w-full h-[85dvh] flex flex-col justify-between items-center'>
			<Image 
				src={'/error.svg'}
				alt='Error Image'
				width={500}
				height={500}
				className=' object-cover'
			/>
			<h2 className='text-4xl font-semibold'>Something went wrong!</h2>
            <Link className='text-blue-500' href="/">Go back home</Link>
		</div>
	)
}