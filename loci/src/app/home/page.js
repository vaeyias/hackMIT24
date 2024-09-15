'use client'
import React, { useEffect, useState } from 'react';
import Card from "../../../components/Card.js";
import AddCard from "../../../components/AddCard.js"
import { useForm } from "react-hook-form";



export default function Home(props) {
    const [palaces, setPalaces] = useState([]);
    const [insertPalaceName, setInsertPalaceName] = useState(false);

    const setName=()=>{
      setInsertPalaceName(true);

    }
    const {
      register,
      handleSubmit,
      resetField,

    } = useForm();

    const onSubmit = async (data) => {
      // await

        // name: data.name (palace name),
        // userID: props.userID,
      console.log("form",data.name)
      resetField("name");
      // to-do REDIRECT TO NEW PALACE
    };

    useEffect(()=>{
        // GET USER'S PALACES FROM DB

        setPalaces([{name: "test", id:1},{name: "test", id:2},{name: "test", id:3},{name: "test", id:4}])

    },[]);
    // to-do
    const openScene=(palaceID)=>{
        // LOAD SCENE WITH PALACE ID

    }

    const createScene=()=>{
        // CREATE NEW SCENE
        // STORE IN DB: palaceID, userID


    }

    return (
    <div className='bg-white h-full w-full'>

    {/* ADD NAV BAR COMPONTENT */}
    <div className="h-full w-full items-center pl-10">
        <div className='p-6 text-5xl text-black'>
            Your Palaces
        </div>

        <div className="flex flex-wrap h-5/6 w-full">
         {palaces.map(
            (
              palace,
            ) => (
              <Card
                name={palace.name}
                palaceID={palace.id}
                openScene={openScene}
                key={palace.id}
              />
            ),
          )}
          <AddCard setName={setName}
          />

          {insertPalaceName && <div className='absolute flex justify-center items-center w-full h-full'>
          <form className="p-5 w-1/2 h-1/2 flex items-center bg-redBrown rounded-xl justify-center" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full rounded-xl p-2 text-5xl text-black focus:cursor-text focus:border-white"
            placeholder="Enter Palace Name"
            maxLength={15}
            minLength={1}
            required
            autoComplete="off"
            {...register("name", { min: 1 })}
          ></input>

          </form>

          </div>}


      </div>

    </div>
    </div>



    );
  }
