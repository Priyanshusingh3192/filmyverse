import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';

const Header = () => {
  return (
    <div className='bg-transparent'>
      <div className='fixed top-0 left-0 w-full z-10'>
        <div className='flex justify-between items-center bg-black py-2 px-4'>
          <Link to='/'>
          <h1 className='text-3xl text-red-100'>Filmy Verse</h1>
          </Link>
          <Link to='/search'>
            <Button>
              <h1 className='text-red-300 cursor-pointer text-xl'>
                <SavedSearchIcon/>Search Movie
              </h1>
            </Button>
          </Link>
          <Link to='/addMovie'>
            <Button>
              <h1 className='text-red-300 cursor-pointer text-xl'>
                <AddIcon /> Add
              </h1>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
