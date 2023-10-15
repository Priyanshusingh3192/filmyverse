import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import {addDoc,moviesRef,collection,db} from './firestore';
import swal from 'sweetalert'

const AddMovie = () => {
    const [form, setform] = useState({
        title: "",
        year: "",
        discription: "",
        image: "",
        Rating:0,
        rated:0
      });
      
     const[loading,setloading] = useState(false);

     const addmovie = async () => {
        if(loading){
            return;
        }
        setloading(true)
        await addDoc(moviesRef,form);

        swal({
            title:"Succesfully Added",
            icons:"Success",
            buttons:"True",
            timer:3000
        })
        setloading(false)
        setform({
          title: "",
          year: "",
          discription: "",
          image: ""
        })
     }
  return (
    <div className="bg-gray-700">
      <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
        Add Movie
      </h1>
    </div>
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex flex-wrap -m-2">
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-900">
              Title
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.title}
              onChange={(e)=>setform({...form,title:e.target.value})}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-sm text-gray-900">
              Year
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.year}
              onChange={(e)=>setform({...form,year:e.target.value})}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-900"
            >
              Image Link
            </label>
            <textarea
              id="message"
              name="message"
              value={form.image}
              onChange={(e)=>setform({...form,image:e.target.value})}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-12 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              defaultValue={""}
            />
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-900"
            >
              Description
            </label>
            <textarea
              id="message"
              name="message"
              value={form.discription}
              onChange={(e)=>setform({...form,discription:e.target.value})}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              defaultValue={""}
            />
          </div>
        </div>
        <div className="p-2 w-full">
          <button onClick={addmovie}  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
             
            {loading?<TailSpin height={25} color='white'/>:'SUBMIT'}
          </button>
        </div>
       
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default AddMovie
