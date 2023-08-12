import Link from "next/link";

const Layout = ({children}) => {
    return (
        <div className="flex flex-col items-center gap-y-14">
            <ul className="w-4/5 sm:w-1/2 rounded-xl h-[70dvh] bg-[color:var(--gray)] flex flex-col items-center justify-evenly">
                {children}
            </ul>

                <Link className='text-blue-500 ' href="/">Go back home</Link>

        </div>
    )
}

export default Layout;