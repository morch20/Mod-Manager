import Welcome from "./components/Welcome";
import Nav from "./components/Nav";

const Layout = ({ children }) => {
    return (
        <div className="w-full min-h-[85dvh] h-fit flex flex-col items-center">

            <div className="my-2 w-[90%] ">
                <Welcome />
            </div>

            <div className="my-5 w-[90%] bg-[color:var(--gray)] h-fit min-h-14 rounded-xl shadow-md">
                <Nav />
            </div>

            {children}
        </div>
    )
}

export default Layout;