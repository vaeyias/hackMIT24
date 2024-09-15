import React, { useEffect, useState } from 'react';

export default function Card(props) {
    const [isInUse, setIsInUse]=useState(props.isInUse);

    useEffect(()=>{
        setIsInUse(props.isInUse)

    },[])

    useEffect(()=>{
        console.log("IN USE",isInUse)

    },[isInUse])

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-full sm:h-1/4 md:h-1/4 lg:h-1/4 xl:h-1/6 m-4 rounded-3xl"
        onClick={() =>
            {
                if (!isInUse){
                    console.log("SDJFHSJDK",props.itemID)
                    props.insertItem({itemID: props.itemID,name:props.name})
                }
                setIsInUse(true)
        }}>
            <div className={`${isInUse ? 'bg-gray-400' : 'bg-orange-200'} w-full h-full rounded-3xl hover:outline hover:cursor-pointer outline-white shadow-lg shadow-gray-600`}>
            </div>
            <div className='text-center mt-5 text-black text-2xl'>
                {props.name}
            </div>
        </div>

    );
  }
