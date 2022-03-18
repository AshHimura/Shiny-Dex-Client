import React, {useState} from 'react';
import './Dex.css'
import '../../index.css'
import { useHistory } from 'react-router-dom';


export const MapSelect = (props) => {
    const [height, setHeight] = useState(720)
    const [width, setWidth] = useState(1280);
    const [alt, setAlt] = useState("generic");
    const history = useHistory()

    const ObsidianClick = () => {
        history.push('/dexSelect/Obsidian')
    }
    const CrimsonClick = () => {
        history.push('/dexSelect/Crimson')
    }
    const CobaltClick = () => {
        history.push('/dexSelect/Cobalt')
    }
    const CoronetClick = () => {
        history.push('/dexSelect/Coronet')
    }
    const AlabasterClick = () => {
        history.push('/dexSelect/Alabaster')
    }

    return (
        <>
            <div>
                <img src={require("./Hisui.png")} height={height} width={width} alt={alt} useMap="#arcmap" />
                <map name="arcmap" id="arcmap">
                    <area target="" alt="Obsidian Fieldlands" title="Obsidian Fieldlands" href="/dexSelect/Obsidian" coords="606,571,631,465,514,404,459,444,394,546,493,602" shape="poly" onClick={()=>ObsidianClick}/>
                    <area target="" alt="Crimson Mirelands" title="Crimson Mirelands" href="/dexSelect/Crimson" coords="776,453,833,359,981,364,1023,477,874,543" shape="poly" onClick={()=>CrimsonClick}/>
                    <area target="" alt="Cobalt Coastlands" title="Cobalt Coastlands" href="/dexSelect/Cobalt" coords="1032,179,1182,186,1208,368,1058,404,981,301" shape="poly" onClick={()=>CobaltClick}/>
                    <area target="" alt="Coronet Highlands" title="Coronet Highlands" href="/dexSelect/Coronet" coords="792,225,928,255,906,306,825,336,736,284" shape="poly" onClick={()=>CoronetClick}/>
                    <area target="" alt="Alabaster Icelands" title="Alabaster Icelands" href="/dexSelect/Alabaster" coords="542,190,643,162,565,78,467,23,398,55,435,157" shape="poly" onClick={()=>AlabasterClick}/>
                </map>
            </div>

        </>
    )

}