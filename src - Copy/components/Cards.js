import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactStars from 'react-stars';
import { Radio } from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore';
import { moviesRef } from './firestore';
import { Hidden } from '@mui/material';
import {Link} from 'react-router-dom';

const Cards = () => {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    async function getData() {
      setloading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setdata((prev) => [...prev, { ...(doc.data()), id: doc.id }]);
      });
      setloading(false);
    }
    getData();
  }, []);

  return (
    <div className='flex flex-wrap justify-between p-2 mt-3 bg-zinc-800'>
      {loading ? (
        <div className='flex items-center justify-center w-1/2 h-60'>
          <Radio height={96} />
        </div>
      ) : (
        data.map((element, i) => {
          return (
            <Link to={`/detail/${element.id}`}>
              
            <div
              key={i}
              className='border-4 border-white rounded-lg mb-20 mt-10 card shadow-lg p-2 transform hover:translate-y-2 transition duration-150 hover:shadow-2xl'
              style={{ width: '20rem', height: '25rem' }}
            >
              <img
                src={element.image}
                alt='Movie poster'
                className='w-full h-60 rounded object-cover'
              />
              <h4 className='text-xl font-semibold mt-2 text-slate-50'>{element.title}</h4>
              <h4 className='text-gray-500 text-sm mt-1'>Year: {element.year}</h4>
              <div className='mt-2'>
                <ReactStars
                  size={20}
                  edit={false}
                  value={element.rating/element.rated}
                  className='text-yellow-500'
                />
              </div>
            </div>
            
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
