import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movieData, setMovieData] = useState(null);

  const apiKey = '11688b3';
  const omdbBaseUrl = 'http://www.omdbapi.com';

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${omdbBaseUrl}?t=${searchQuery}&apikey=${apiKey}`);
      setMovieData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center py-10 mt-10">
        <h1 className="text-3xl font-semibold text-indigo-600 mb-4">Movie Search</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search for a movie"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 text-black bg-white border rounded-l-md focus:ring-2 focus:ring-indigo-500 focus:outline-none w-60"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-500 text-white p-2 rounded-r-md hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Search
          </button>
        </div>
      </div>
      {movieData && (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-semibold text-white">{movieData.Title}</h2>
          <p>Year: {movieData.Year}</p>
          <p>Director: {movieData.Director}</p>
          <p className="text-gray-300">{movieData.Plot}</p>
          <img
            src={movieData.Poster}
            alt={movieData.Title}
            className="mt-4 mx-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
