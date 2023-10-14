'use client';
import { useState, useEffect } from "react";
import Filter from "./Filter";
import CheckBox from "./CheckBox";
import ClearFilters from "./ClearFilters";
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import { useSearchParams } from "next/navigation";
import { gameVersionsRegex } from "@/utils/constants";


const FilterVersions = ({ id }) => {
    
    const searchParams = useSearchParams();
    const showAllVersions = searchParams.get('s');

    const [loading, setLoading] = useState(true);
    const [loaders, setLoaders] = useState([]);
    const [gameVersions, setGameVersions] = useState([]);

    useEffect(() => {

        
        fetch(process.env.NEXT_PUBLIC_MOD_BASE_URL + '/project/' + id)
        .then(response => response.json())
        .then(data => {
            setLoaders(data.loaders);
            if(showAllVersions && showAllVersions === 'true'){
                setGameVersions(data.game_versions.reverse());
            }
            else{
                setGameVersions(data.game_versions.filter(i => gameVersionsRegex.test(i) && i.length < 7).reverse());
            }
            setLoading(false);
        })
        .catch(e => {
            console.log(e);
            setLoading(false);
        })

    }, [showAllVersions])
    
    return (
        <>
            {
                loading
                ?
                    <div>
                        <AiOutlineLoading3Quarters className=" animate-spin"/>
                    </div>
                :
                    <div className="flex items-center flex-wrap gap-5 w-full h-full">
                        {
                            loaders.length > 1 &&
                            <Filter
                                options={loaders} 
                                placeholder={'Filter loader...'}
                                query={'loaders'}
                            />
                        }

                        <Filter
                            options={['release', 'beta', 'alpha']} 
                            placeholder={'Filter channels...'}
                            query={'channels'}
                        />

                        <Filter
                            options={gameVersions}
                            placeholder={'Filter versions...'}
                            query={'versions'}
                        />

                        <CheckBox query={'s'} status={(showAllVersions && showAllVersions === 'true') ? true : false} />

                        <ClearFilters />


                    </div>   
            }
        </>
    )
}

export default FilterVersions;