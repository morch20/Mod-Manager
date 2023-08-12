import './globals.css';
import { Inter } from 'next/font/google';
import { Footer, Navbar } from '@/components';
import Provider from '@/context/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  	title: 'Mod Manager',
  	description: 'Manage all your Minecraft mods with ease in a single place!'
	
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className} suppressHydrationWarning={true} >

				<Provider>
					<div className='flex flex-col justify-center items-center'>
						<main className='container'>
							<Navbar/>
							{children}
							<Footer />
						</main>
					</div>
				</Provider>
			</body>
		</html>
	)
}
