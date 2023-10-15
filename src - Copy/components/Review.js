import React from 'react'
import ReactStars from 'react-stars'
import { useState} from 'react';
import { reviewRef,db } from './firestore';
import { addDoc,doc,updateDoc} from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import swal from 'sweetalert';

const Review = ({id,preRating,userRated}) => {
    const[Rating,setRating] = useState(0);
    const[loading,setloading] = useState(false);
    const[form,setForm] = useState("")
    const[data,setData] = useState()
    const[reviewsLoading,setReviewLoading] = useState(true )

     const setReview = async () => {
        setloading(true)
        try{
            // SENDING DATA TO DATABASE
           await addDoc(reviewRef,{
            movieis : id,
            name : "priyanshu singh",
            rating: Rating,
            thought: form,
            timestamp: new Date().getTime()
           })
           const ref = doc(db,"movies",id)
           await updateDoc(ref,{
             Rating: preRating + Rating,
             rated: userRated + 1 
           })
           swal({
            title:"Succesfully Added",
            icons:"Success",
            buttons:"false",
            timer:3000
        })
        }catch(error){
            swal({
                title:error.message,
                icons:"error",
                buttons:"false",
                timer:3000
            })
        }
        setForm("")
        setRating(0)
        setloading(false)
     }
  return (
    <div className='mt-4 border-t-2 border-gray-700 w-full'>
         <ReactStars
           size={30}
           half={true}
           onChange={(rate)=>setRating(rate)}
         />
         <input
           value = {form}
           onChange={(e) => setForm(e.target.value)} 
           placeholder='Share your thoughts'
           className='w-full p-2 outline-none header'
         />
         <button onClick={setReview} className='w-full p-1 bg-green-600'>{ loading ? <TailSpin height={"20px"}/> : "Share"}</button>
    </div>
  )
}

export default Review
