import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firestore';
import { BallTriangle } from 'react-loader-spinner';
import Review from './Review';
import ReactStars from 'react-stars';

const Detail = () => {
  const { id } = useParams();

  const [loading, setloading] = useState(false);

  const [data, setData] = useState({
    title: '',
    year: '',
    discription: '',
    image: '',
    rating:0,
    rated:0
  });

  useEffect(() => {
    async function getData() {
      setloading(true);
      const _doc = doc(db, 'movies', id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      console.log('Movie Data:', data);
      setloading(false);
    }
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className='flex items-center justify-center w-1/2 h-60'>
          <BallTriangle height={96} />
        </div>
      ) : (
        <section className="text-gray-600 body-font bg-zinc-800">
          <div className="container px-5 py-24 mx-auto flex flex-col md:flex-row items-center">
            <div
              className="md:w-1/2 md:flex-shrink-0 text-center mb-80"
              style={{ position: 'sticky', top: 10, zIndex: 1 }}
            >
              <img
                alt="content"
                className="w-96 h-auto rounded object-cover"
                src={data.image}
                style={{ width: '40rem', height: '40rem' }}
              />
            </div>
            <div className="md:w-1/2">
              <div className="flex flex-col items-start text-left mb-4">
                <h1 className="font-medium title-font mt-4 text-gray-900 text-4xl text-cyan-300">
                  {data.title}
                </h1>
                <h1 className='text-2xl text-white'> Released in {data.year}</h1>
                <ReactStars
                  size={20}
                  half={true}
                  value={data.rating/data.rated}
                  edit={false} 
                />
              </div>
              <p className="leading-relaxed text-lg mb-4 text-white">
                {data.discription} 
              </p>
              <Review id={id} preRating = {data.rating} userRated = {data.rated}/>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Detail;
