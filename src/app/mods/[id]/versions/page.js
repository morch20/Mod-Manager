import { BsDownload } from 'react-icons/bs';
import { nFormatter } from '@/utils/functions';

export async function getVersions(id){
	const response = await fetch(process.env.NEXT_PUBLIC_MOD_BASE_URL + '/project/' + id + '/version');
	return response.json();
}

const Versions = async ({ params }) => {
	const versions = await getVersions(params.id);
	const dateOptions = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];

	return (
		<div className="p-4 ">

			<div className='block lg:hidden'>
				<h2 className="font-semibold md:text-lg">Version</h2>
			</div>

			<div className='hidden lg:flex font-semibold md:text-lg w-full justify-between '>
				<span className='w-10 h-10 p-3'></span>
				<h2 className='w-[30%]'>Version</h2>
				<h2 className='w-[30%]'>Supports</h2>
				<h2 className='w-[30%]'>Stats</h2>
			</div>

			{
				versions.map(i => 
					<div className=' my-4 w-full leading-5'>

						<div className='text-gray-400 flex gap-x-3'>
							<div className=' p-3 bg-[color:var(--green)] rounded-xl h-fit w-fit'>
								<BsDownload color='black' />

							</div>
							<div className='lg:flex lg:justify-between w-full'>

								<div className='w-[30%]'>
									<h3 className='font-semibold'>{i.name}</h3>
									<div className='flex gap-x-1 items-center  '>
										<span className='h-2 w-2 rounded-full bg-[color:var(--green)]'/>
										<p className='first-letter:uppercase font-semibold text-[color:var(--green)]'>{i.version_type}</p>
										<span>{i.version_number}</span>
									</div>
								</div>

								<p className='w-[30%]'>
									{
										i.loaders.map( (loader, index) => {
											if(index === i.loaders.length - 1){
												return loader.toUpperCase() + ' ';
											}
											return loader.toUpperCase() + ', ';
										})
									}
									{
										i.game_versions.map( (gameVersion, index) => {
											if(index === i.game_versions.length - 1){
												return gameVersion;
											}
											return gameVersion + ', ';
										})
									}
								</p>

								<div className=' w-[30%]'>
									<p>
										<span className='font-semibold'>{nFormatter(i.downloads)}</span> downloads
									</p>
									<p>Published on {new Date(i.date_published).toLocaleDateString("en-US", dateOptions)}</p>
								</div>
							</div>
						</div>
						
					</div>
				)
			}

		</div>
	)
}

export default Versions;