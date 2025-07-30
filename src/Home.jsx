import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  // Pagination
  const [page, setPage] = useState(0);

  const offset = page * 20;

  const fetchPokemon = async (offset) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`,
    );

    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon', offset],
    queryFn: () => fetchPokemon(offset),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong!</p>;
  }

  return (
    <div className="w-screen flex flex-col container mx-auto items-center justify-center mt-20">
      <ul className="grid grid-cols-3 gap-4 m-10 text-blue-500 underline text-center">
        {data.results.map((pokemon) => (
          <li className="p-5" key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>

      <div className="w-100 flex container mx-auto items-center justify-between">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className={`px-4 py-2 rounded text-white ${
            page === 0
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Previous
        </button>

        <span> Page {page + 1}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data.next}
          className={`px-4 py-2 rounded text-white
            ${
              !data.next
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
