import Image from "next/image"
import { Logo } from "@/components"

export default function Home() {
    return (
		<div className="w-full flex justify-center ">
			
			<div className="absolute top-0 -z-10">	
				<Image
					src="/bg1.png"
					width={200}
					height={200}
					className="w-screen h-screen object-cover"
					quality={100}
					alt="Background Image"
				/>
			</div>

			<header className="w-full h-[85dvh] flex flex-col justify-around items-center">
	
				<Logo />
				
				<h1 className=" font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center">
					The Place for Minecraft 
					<span className=" block text-[color:var(--green)]">Management</span>
				</h1>

			</header>
		</div>
    )
}
