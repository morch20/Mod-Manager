
import  Info  from "./components/Info";
import ExtraInfo from "./components/ExtraInfo";
import Nav from "./components/Nav";
import NotFound from "./not-found";

export async function getInfo(id){
    const response = await fetch(process.env.NEXT_PUBLIC_MOD_BASE_URL + '/project/' + id);
	if(!response.ok){
		return null;
	}
    return response.json();
}

const Layout = async ({ children, params }) => {

	const info = await getInfo(params.id);
	if(!info){
		return <NotFound />
	}
	info.project_id = params.id;

	return (
		<div className="flex items-center flex-col lg:flex-row lg:items-start lg:justify-center lg:gap-x-5 min-h-[85dvh] ">
		
			<div className=" w-[90%] h-fit lg:w-1/4 ">
				<div className="bg-[color:var(--gray)] rounded-xl my-5 shadow-md">
					<Info info={info} />
				</div>
				<div className="hidden lg:block bg-[color:var(--gray)] rounded-xl my-5 shadow-md">
					<ExtraInfo info={info} />
				</div>
			</div>

			<div className="w-[90%] lg:w-[68%]">
				<div className="bg-[color:var(--gray)] w-full h-fit min-h-14 rounded-xl my-5 shadow-md">
					<Nav id={params.id} gallery={info?.gallery} />
				</div>
				<div className="bg-[color:var(--gray)] w-full h-fit rounded-xl my-5 shadow-md">
					{children}
				</div>
				<div className="lg:hidden bg-[color:var(--gray)] w-full h-fit rounded-xl my-6 shadow-md">
					<ExtraInfo info={info} />
				</div>
			</div>

		</div>
	)
}

export default Layout;