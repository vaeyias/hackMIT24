import React from 'react';

export default function Card(props) {



    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 h-full sm:h-1/2 md:h-1/3 lg:h-1/3 xl:h-1/4 m-4 rounded-3xl"
        onClick={() => props.openScene(props.palaceID)}>
            <div className="bg-redBrown w-full h-full rounded-3xl hover:outline hover:cursor-pointer outline-white shadow-xl shadow-zinc-400">
            </div>
            <div className='text-center mt-5 text-black text-2xl'>
                {props.name}
            </div>
        </div>

    );
  }
