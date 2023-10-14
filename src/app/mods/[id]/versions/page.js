import { BsDownload } from 'react-icons/bs';
import { nFormatter } from '@/utils/functions';
import FilterVersions from './components/FilterVersions';

export async function getVersions(id){
	const response = await fetch(process.env.NEXT_PUBLIC_MOD_BASE_URL + '/project/' + id + '/version');
	return response.json();
}

const Versions = async ({ params, searchParams }) => {
	const versions = await getVersions(params.id);
	const dateOptions = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];

	const versionTypeColor = (version, bg) => {
		if(version === 'release'){
			return bg ? ' bg-[color:var(--green)]' : ' text-[color:var(--green)]';
		}
		if(version === 'beta'){
			return bg ? ' bg-orange-400' : ' text-orange-400';
		}
		return bg ? ' bg-red-500' : ' text-red-500';
	}

	const handleFilter = (current, type) => {
		if(!searchParams[type]) return true;
		const currentQuery = ((typeof searchParams[type] === 'string') ? [searchParams[type]] : searchParams[type]);
		if(currentQuery.some(item => current.includes(item))) return true;
		return false;
	}

	return (
		<>
			<div className="bg-[color:var(--gray)] p-4 w-full h-full rounded-xl my-5 shadow-md">
				<FilterVersions id={params.id}  />
			</div>
			<div className="bg-[color:var(--gray)] w-full h-fit rounded-xl my-5 shadow-md">
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
						versions.map(i =>{

							if(handleFilter([i.version_type], 'channels') && handleFilter(i.loaders, 'loaders') && handleFilter(i.game_versions, 'versions')){
								return(
									<div  className=' my-4 w-full leading-5'>

										<div className='text-gray-400 flex gap-x-3'>
											<div className=' p-3 bg-[color:var(--green)] rounded-xl h-fit w-fit'>
												<BsDownload color='black' />

											</div>
											<div className='lg:flex lg:justify-between w-full'>

												<div className='w-[30%]'>
													<h3 className='font-semibold'>{i.name}</h3>
													<div className='flex gap-x-1 items-center  '>
														<span className={'h-2 w-2 rounded-full ' + versionTypeColor(i.version_type, true)} />
														<p className={'first-letter:uppercase font-semibold ' + versionTypeColor(i.version_type)}>
															{i.version_type}
														</p>
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
							return <></>;
						} )
					}

				</div>
			</div>
		</>
	)
}

export default Versions;