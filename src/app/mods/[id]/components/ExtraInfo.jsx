import { AiOutlineWarning } from 'react-icons/ai';
import { BsFillCircleFill, BsCodeSlash, BsBook, BsDiscord} from 'react-icons/bs';
import { PiCubeLight } from 'react-icons/pi';
import Image from 'next/image';
// import { Icons } from "@/components";


const ExtraInfo = async ({ info }) => {
    
    const members = await getMembers(info.team);

    return (
        <div className="p-4 text-gray-400">
            
            {
                (info?.issues_url || info?.source_url || info?.wiki_url || info?.discord_url)
                &&
                <div>

                    <h2 className=" text-gray-300 text-xl font-semibold">
                        External Resources
                    </h2>

                    <div className='my-2 flex items-center justify-start gap-x-2 flex-wrap'>
                        {
                            info?.issues_url &&
                            <div className=" flex items-center gap-x-2">
                                <AiOutlineWarning />
                                <a target='_blank' className=" underline" href={info.issues_url}>
                                    Issues
                                </a>
                            </div>
                        }

                        {
                            info?.source_url &&
                            <div className=" flex items-center gap-x-2">
                                <BsFillCircleFill size={5} />
                                <BsCodeSlash />
                                <a target='_blank' className=" underline" href={info.source_url}>
                                    Source
                                </a>
                            </div>
                        }

                        {
                            info?.wiki_url &&
                            <div className=" flex items-center gap-x-2">
                                <BsFillCircleFill size={5} />
                                <BsBook />
                                <a target='_blank' className=" underline" href={info.wiki_url}>
                                    Wiki
                                </a>
                            </div>
                        }

                        {
                            info?.discord_url &&
                            <div className=" flex items-center gap-x-2">
                                <BsFillCircleFill size={5} />
                                <BsDiscord />
                                <a target='_blank' className=" underline" href={info.discord_url}>
                                    Discord
                                </a>
                            </div>
                        }

                        {
                            info?.donation_urls?.map(i =>
                                <div key={i.id} className=" flex items-center gap-x-2">
                                    <BsFillCircleFill size={5} />
                                    {/* <Icons name={i.id} /> */}              
                                    <a target='_blank' className=" underline" href={i.url}>
                                        {i.platform}
                                    </a>
                                </div> 
                            )
                        }
                    </div>



                    <hr />
                </div>
                
            }

            <div className='my-2'>
                <h2 className=" text-gray-300 text-xl font-semibold">
                    Project Members
                </h2>

                <div className='my-2'>
                    {
                        members?.map(i => 
                            <a 
                                href={'https://modrinth.com/user/' + i.user.username}
                                target='_blank'
                                key={i.user.id} 
                                className='my-1 p-1 flex gap-x-2 items-center active:text-gray-300 hover:bg-gray-700 rounded-xl cursor-pointer'
                            >
                                {
                                    i.user.avatar_url
                                    ?
                                        <Image
                                            src={i.user.avatar_url || ''}
                                            alt='Avatar'
                                            width={50}
                                            height={50}
                                            className='rounded-full shadow-md'
                                        />
                                    :
                                        <PiCubeLight color='#9a9a9a' className='rounded-full w-12 h-12 p-1 bg-[#434956] shadow-md' />
                                }
                                <div>
                                    <h4 className='font-bold'>{i.user.username}</h4>
                                    <p>{i.role}</p>
                                </div>
                            </a>
                        )
                    }
                </div>
            </div>

            <hr />

            <div className='my-2'>
                <h2 className=" text-gray-300 text-xl font-semibold">
                    Technical information
                </h2>

                <div className='my-2 text-gray-300 w-72'>

                    <div className='flex'>
                        <h4 className='font-bold mr-20 w-1/4 '>License</h4>
                        <p className='text-gray-400  '>{info.license.id}</p>
                    </div>

                    <div className='flex '>
                        <h4 className='font-bold mr-20 w-1/4'>Client</h4>
                        <p className='text-gray-400'>{info.client_side}</p>
                    </div>

                    <div className='flex '>
                        <h4 className='font-bold mr-20 w-1/4'>Server</h4>
                        <p className='text-gray-400 '>{info.server_side}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ExtraInfo;

export async function getMembers(id){
    const response = await fetch(process.env.NEXT_PUBLIC_MOD_BASE_URL + '/team/' + id + '/members');
    return response.json();
}