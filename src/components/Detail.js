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
    Rating: 0,
    rated: 0,
  });

  useEffect(() => {
    async function getData() {
      setloading(true);
      const _doc = doc(db, 'movies', id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setloading(false);
    }
    getData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className='flex items-center justify-center w-1/2 h-60'>
          <BallTriangle height={96} />
        </div>
      ) : (
        <section className="text-gray-600 body-font bg-zinc-800">
          <div className="container px-5 py-8 mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <div className="flex flex-col items-start text-left mb-4">
                <h1 className="font-medium title-font mt-4 text-gray-900 text-4xl text-white">
                  {data.title}
                </h1>
                <h1 className='text-2xl text-white'> Released in {data.year}</h1>
                <ReactStars
                  size={20}
                  half={true}
                  value={data.Rating / data.rated}
                  edit={false}
                />
              </div>
              <p className="leading-relaxed text-lg mb-4 text-white">
                {data.discription}
              </p>
              <Review id={id} />
            </div>

            <div className="md:w-1/2">
              <div className="w-full h-auto md:h-64 lg:h-80 overflow-hidden sticky top-4" style={{ minHeight: '100vh' }}>
                <img
                  alt="content"
                  className="w-auto h-auto rounded object-cover rounded-lg border-4"
                  src={data.image}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Detail;
