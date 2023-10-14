import Showdown from "showdown";

export async function getInfo(id){
    const response = await fetch(process.env.NEXT_PUBLIC_MOD_BASE_URL + '/project/' + id);
    return response.json();
}

const Page = async ({ params  }) => { 
	const info = await getInfo(params.id);
	const converter = new Showdown.Converter();
	const html = converter.makeHtml(info.body)

    return (
		<div className="bg-[color:var(--gray)] w-full h-fit rounded-xl my-5 shadow-md">
			<div className="p-4">
				<article className="reset" dangerouslySetInnerHTML={{__html: html}}>
				</article>
			</div>
		</div>
    )
}

export default Page;