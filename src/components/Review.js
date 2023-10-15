import ReactStars from 'react-stars';
import { useState, useEffect } from 'react';
import { reviewRef, db } from './firestore';
import { addDoc, doc, updateDoc, query, where, getDocs, getDoc } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { ContactSupportOutlined } from '@mui/icons-material';

const Review = ({ id }) => {
  const [Rating, setRating] = useState(0);
  const [rated, setRated] = useState(0);
  const [loading, setloading] = useState(false);
  const [form, setForm] = useState('');

  const setReview = async () => {
    setloading(true);
    try {
      await addDoc(reviewRef, {
        movieid: id,
        name: 'priyanshu singh',
        Rating: Rating,
        thought: form,
        timestamp: new Date().getTime(),
      });

      const _doc = doc(db, 'movies', id);
      const _data = await getDoc(_doc);
      
      const preRating = _data.data().Rating;
      const preRated = _data.data().rated;


      const ref = doc(db, 'movies', id);
      await updateDoc(ref, {
        Rating: preRating + Rating,
        rated: preRated + 1,
      });
      swal({
        title: 'Successfully Added',
        icon: 'success',
        buttons: true,
        timer: 3000,
      });
    } catch (error) {
      swal({
        title: error.message,
        icon: 'error',
        buttons: false,
        timer: 3000,
      });
    }
    setForm('');
    setRating(0);
    setloading(false);
  };

  const [data, setData] = useState([]);
  const [reviewsLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setReviewLoading(true);
      const quer = query(reviewRef, where('movieid', '==', id));
      const querySnapshot = await getDocs(quer);

      const reviewData = [];

      querySnapshot.forEach((doc) => {
        reviewData.push(doc.data());
      });

      setData(reviewData);
      setReviewLoading(false);
    }

    getData();
  }, [id]);

  return (
    <div className="p-4 border-t-2 border-gray-700 w-full md:flex md:space-x-4">
      <div className="md:w-3/4">
        <ReactStars size={30} half={true} onChange={(rate) => setRating(rate)} />

        <input
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder="Share your thoughts"
          className="w-full p-2 outline-none rounded-md shadow-md my-2"
        />
        <button onClick={setReview} className="w-full p-2 bg-green-600 text-white rounded-md">
          {loading ? <TailSpin height="20" width="20" /> : 'Share'}
        </button>

        {/* Showing Reviews */}
        {reviewsLoading ? (
          <div className="mt-4">
            <ThreeDots color="white" />
          </div>
        ) : (
          <div className="mt-4">
            {data.map((element, i) => {
              return (
                <div className="text-lime-200" key={i}>
                  {element.thought}
                </div>
              );
            })}
          </div>
        )}
      </div>

   
    </div>
  );
};

export default Review;
