import './App.css';
import axios from "axios";
import world_map from './assets/world_map.png';
import {useState} from "react";
import regionName from './helpers/regionName.js';
import roundNumbers from "./helpers/roundNumbers.js";


function App() {
    const [worldMap, setWorldMap] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [countrySearch, setCountrySearch] = useState({});
    const [query, setQuery] = useState('');
    const [wrongName, setWrongName] = useState('')


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
            // console.error(error);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    async function searchCountry() {
        try {
            toggleLoading(true);
            toggleError(false);
            setWrongName('')
            const resultSearchCountry = await axios.get(`https://restcountries.com/v3.1/name/${query}`);
            // console.log(resultSearchCountry.data[0]);
            setCountrySearch(resultSearchCountry.data[0]);
        } catch (error) {
            // console.error(error);
            toggleError(true);
            setWrongName(query);
        } finally {
            toggleLoading(false);
        }
    }

    // console.log(countrySearch);

    const population = countrySearch?.population ?? 0
    // console.log('Ruwe populatie:', countrySearch?.population);
    const roundPopulation = roundNumbers(population);
    // console.log('Resultaat functie', roundPopulation);
    const numberOfBorders = countrySearch?.borders?.length ?? 0;
    const bordersNumber = numberOfBorders === 0 ? '0' : numberOfBorders;

    const handleSearch = (event) => {
        event.preventDefault();
        searchCountry();
        setQuery('');
    }

    return (
        <>
            <img src={world_map} alt="World Map" className="img-worldmap"/>

            <h1>World Map</h1>

            <form className="form-container" onSubmit={handleSearch}
            >
                <label htmlFor="country">
                    <input className="input-style"
                           type="text"
                           id="country"
                           name="country"
                           size="50"
                           value={query}
                           onChange={(e) => setQuery(e.target.value)}
                    />
                </label>
                <button type="submit" disabled={loading} className="button-search-style">Search</button>
            </form>

            <span className="error-span">{error && <p>{wrongName} bestaat niet. Probeer het opnieuw.</p>}</span>

            {/*Object {variabele met meer velden} wordt omgezet naar een array [lijst]*/}
            {Object.keys(countrySearch).length > 0 &&
                <article className="article-container">

                    <span className="article-container-span"><img src={countrySearch.flags.svg}
                                                                  alt={countrySearch.flags.alt} className="img-flag"/>
                        <h2 className={regionName(countrySearch.region)}>
                            {countrySearch.name.common}
                        </h2>
                    </span>
                    <hr/>
                    <p>{countrySearch.name.common} is situated in {countrySearch.region} and the capital
                        is {countrySearch.capital}.</p>
                    <p>{`It has a population of ${roundPopulation} million people with ${bordersNumber} neighboring countries.`}</p>
                </article>}

            <div className="button-class">
                <button type="button" onClick={getCountries} disabled={loading} className="button-get-countries">Get countries</button>
            </div>


            <ul className="list-item-container">
                {worldMap.map((country) => {
                    return (<li key={country?.name?.official}>
                        <img src={country?.flags?.svg} alt={country?.flags?.alt} className="img-flag"/>
                        <h2 className={regionName(country?.region)}>
                            {country?.name?.common}
                        </h2>
                        <p>{`Has a population of ${country?.population}  people`}</p>
                    </li>)
                })}
            </ul>

        </>
    )
}

export default App
