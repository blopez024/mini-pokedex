import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PokemonDetails = () => {
  const { pokemonName } = useParams();

  const fetchPokemon = async (name) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
    );
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemon(pokemonName),
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className='w-100 h-100 flex flex-col container mx-auto items-center justify-center mt-20 shadow-lg rounded-lg border-gray-50 border '>
      <h1 className='text-2xl font-bold'>{data.name}</h1>
      <img src={data.sprites.front_default} alt={data.name} className='w-40' />
      <p className='mt-5 text-gray-500'>Height: {data.height}</p>
      <p className='text-gray-500'>Weight: {data.weight}</p>
    </div>
  );
};

export default PokemonDetails;
