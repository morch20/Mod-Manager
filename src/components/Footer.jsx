import { Logo } from ".";

const Footer = () => {
    return (
        <footer className=" h-60 py-4 w-full flex justify-center relative ">
            <span className="absolute top-0 bottom-0 w-[100dvw] bg-zinc-900 -z-10" />
            <div className="h-full w-[90%] flex flex-col justify-around items-center text-center text-gray-400">
                
                <div className="flex items-center gap-x-2 my-4">
                    <Logo size={40} />
                    <h4 className="text-2xl font-bold">Mod Manager</h4>
                </div>
                <div>
                    <p>
                        This website is powered by Modrinth API, and it is intended to be a clone which adds new functionality.
                    </p>
                </div>
                <div>
                    <p>NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG.</p>
                </div>

            </div>
        </footer>
    )
}

export default Footer;