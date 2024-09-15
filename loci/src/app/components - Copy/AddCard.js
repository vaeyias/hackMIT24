import React from 'react';

export default function AddCard(props) {
    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 h-full sm:h-1/2 md:h-1/3 lg:h-1/3 xl:h-1/4 m-4" onClick={props.setName}
        >
            <div className="bg-gray-300 w-full h-full rounded-3xl text-center items-center text-9xl flex justify-center hover:outline hover:cursor-pointer outline-white shadow-xl shadow-zinc-400">
                +
            </div>
            <div className='text-center mt-5 text-black text-2xl'>
                Create a Palace
            </div>

        </div>

    );
  }
