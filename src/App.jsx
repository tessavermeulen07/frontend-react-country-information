import './App.css';
import axios from "axios";
import world_map from './assets/world_map.png';
import {useState} from "react";
import regionName from './helpers/regionName.js';

function App() {
    const [worldMap, setWorldMap] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [countrySearch, setCountrySearch] = useState({});

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

    async function searchCountry() {
        try {
            toggleLoading(true);
            toggleError(false);

            const resultSearchCountry = await axios.get('https://restcountries.com/v3.1/name/netherlands');
            console.log(resultSearchCountry.data[0]);

            setCountrySearch(resultSearchCountry.data[0]);
        } catch (error) {
            console.error(error);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    console.log(countrySearch)

    return (
        <>
            <img src={world_map} alt="World Map" className="img-worldmap"/>

            <h1>World Map</h1>

            <form className="form-container">
                <label htmlFor="country">
                    <input
                        type="text"
                        id="country"
                        name="country"
                        size="50"
                    />
                </label>
                <button type="button" onClick={searchCountry} disabled={loading}>Search</button>
            </form>

            { Object.keys(countrySearch).length > 0 && <article>
                <img src={countrySearch.flags?.svg} alt={countrySearch.flags?.alt} className="img-flag"/>
                <h2 className={regionName(countrySearch.region)}>
                    {countrySearch.name?.common}
                </h2>
                <p>{`Has a population of ${countrySearch?.population} people`}</p>
            </article>}

            <div className="button-class">
                <button type="button" onClick={getCountries} disabled={loading}>Haal landen op</button>
            </div>


            {error && <p>Er is iets mis gegaan, probeer het later nog een keer</p>}

            <ul className="list-item-container">
                {worldMap.map((country) => {
                    return (<li key={country?.name?.official}>
                        <img src={country?.flags?.svg} alt={country[0]?.flags?.alt} className="img-flag"/>
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
