import './App.css';
import axios from "axios";
import world_map from './assets/world_map.png';
import {useState} from "react";
import regionName from './helpers/regionName.js';

function App() {
    const [worldMap, setWorldMap] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function getCountries() {
        try {
            toggleLoading(true);

            toggleError(false);

            const result = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region');
            console.log(result.data);

            result.data.sort((a, b) => {
                return a.population - b.population
            })

            setWorldMap(result.data);



        } catch (error) {
            console.error(error);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }


    return (
        <>
            <img src={world_map} alt="World Map" className="img-worldmap" />

            <h1>World Map</h1>

            <div className="button-class">
                <button type="button" onClick={getCountries} disabled={loading}>Haal landen op</button>
            </div>

            {error && <p>Er is iets mis gegaan, probeer het later nog een keer</p>}

            <ul className="list-container">
                {worldMap.map((country) => {
                    return (<li key={country?.name?.official} className="list-item-container">
                        <img src={country?.flags?.svg} alt={country[0]?.flags?.alt} className="img-flag" />
                        <h2 className={regionName(country?.region)}>
                            {country?.name?.common}
                        </h2>
                        <p>{`Has a population of ${country?.population} people`}</p>
                    </li>)
                })}
            </ul>
            
        </>
    )
}

export default App
