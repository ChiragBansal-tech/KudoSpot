import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex justify-between p-5 border-b-2 '>
            <div>
                <Link to="/landing" className='text-3xl text-blue-900 font-bold'>KudoSpot</Link>
            </div>
            <div className='grid grid-cols-3 gap-5 justify-center items-center'>
                <div>
                    <Link to="/give-kudos" className='text-xl text-blue-900 hover:text-blue-700 font-semibold'>Give Kudos</Link>
                </div>
                <div>
                    <Link to="/analytics" className='text-xl text-blue-900 hover:text-blue-700 font-semibold'>Analytics</Link>
                </div>
                <div>
                    <Link to="/" className='text-xl text-blue-900 hover:text-blue-700 font-semibold'>Log Out</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;