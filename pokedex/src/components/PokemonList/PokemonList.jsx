import { useEffect, useState } from "react"
import axios from 'axios'
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const [pokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const Pokedex_url = 'https://pokeapi.co/api/v2/pokemon';

    async function downloadPokemons(){
        const response = await axios.get(Pokedex_url);  //this will download list of 20 pokemons

        const pokemonResults =response.data.results;    // we get the array of pokemons from result

        console.log(response.data);


        //iterating over the array of pokemons and using their url to create an array of promises
        // that will download those 20 pokemons
        const pokemonResultsPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));
        // console.log(pokemonResultsPromise);

        //passing those promises array to axios.all
        const pokemonData = await axios.all(pokemonResultsPromise); // array of 20 pokemons datailed data
        console.log(pokemonData);

        //now iterate on the data of each pokemon and extract id, name, image, types

        const pokeListResult = pokemonData.map(pokeData => {
            const pokemon = pokeData.data;
            return {
                id:pokemon.id,
                name:pokemon.name,
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types:pokemon.types

            }      
        }   
        )
        console.log(pokeListResult);
        setPokemonList(pokeListResult);
        setIsLoading(false)
    }
    
    useEffect(()=>{
        downloadPokemons();
    },[])
    
    return(
        <div className="pokemon-list-wrapper">
           <div> Pokemon list</div>
            {(isLoading)? 'Loading....' : pokemonList.map((p)=> <Pokemon name={p.name} image={p.image} key={p.id}/>)}
           
        </div>
    )
}

export default PokemonList