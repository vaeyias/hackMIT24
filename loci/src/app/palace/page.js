'use client'
import React, { useEffect, useState,useRef } from 'react';
import Item from '../../../components/Item.js';
import MemoryCard from '../../../components/MemoryCard.js';

import Spline from '@splinetool/react-spline';


export default function Palace() {
    const [showPopup, setShowPopup]= useState(false);
    const [popupText, setPopupText]= useState("TEMP");
    const spline = useRef();


    const [items, setItems]= useState([]);
    const [catalogItems, setCatalogItems]= useState([{name:"table",itemID:"dc3ca31e-f156-4d3d-9ec9-76ac6afe92a4",inUse:false},{name:"chair",itemID:2,inUse:false},{name:"shelf",itemID:3,inUse:false}]);
    const [showCatalog,setShowCatalog]=useState(false);


    let isMouseDown=false;
    let clickStartTime=0;
    const timeoutRef = useRef(null);



    const closePopup = ()=>{
        setShowPopup(false);
    }

    const onLoad=(splineApp)=>{
        spline.current=splineApp
        console.log("FIRST",spline,spline.current)
        splineApp.setZoom(0.05)
    }

    const onSave=()=>{
        items.map(
            (
              item,
            ) => (
                // to do: MODIFY EACH POSITION AND VISIBILITY IN DB
              console.log(item)
            ),
          )



    }

    useEffect(() => {
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      }, []);

      useEffect(() => {
        console.log("CATW ITEMS",catalogItems)
      }, [catalogItems]);

    // OPEN NOTES ON ITEM CLICK
    const onSplineMouseDown=(event)=> {
        console.log("MOUSE DOWN",event)

        if (event.target.name != 'Wall') {
            isMouseDown=true;
            clickStartTime=Date.now();
            // Clear any previous timeout if a new mouse down event occurs
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }

      }

    const onSplineMouseUp=(event)=> {
        console.log("MOUSEUP",isMouseDown);
        if (isMouseDown) {
            const clickDuration = Date.now() - clickStartTime;
            // Set a threshold for the click duration
            const clickThreshold = 200;
            console.log(clickDuration);

            if (clickDuration < clickThreshold) {
              console.log('I have been clicked!',clickDuration);
              setShowPopup(true);
              setShowCatalog(true);
              // Show your popup here

            }
            else{
                console.log('too long', clickDuration);
            }
          }
          isMouseDown=false;

      }

    // INSERT ITEM IN ITEMS VARIABLE AND UPDATE VISIBILITY
    const insertItem = (newItem)=>{
        setItems(prevItems =>[...prevItems,newItem])
        console.log("ID",newItem.itemID)


        setCatalogItems(prevCatalogItems =>
            prevCatalogItems.map(item =>
              item.itemID === newItem.itemID ? { ...item, inUse: true } : item
            )
          );
        let newObj=spline.current.findObjectById(newItem.itemID);

        newObj.visible=true;

    }

    // to-do ADD DELETE EVENT FUNCTIONALLY
    const deleteItem = (deletedItem)=>{
        setItems(prevItems =>[...prevItems,newItem])

        // adds item back to catalog
        setCatalogItems(prevCatalogItems =>
            prevCatalogItems.map(item =>
              item.itemID === deletedItem.itemID ? { ...item, inUse: false } : item
            )
          );

        // delete item from visible item list
        setItems(prevItems =>
        prevItems.map(item =>
            item.itemID != newItem.itemID && item
        )
        );



        setCatalogItems(prevCatalogItems =>
            prevCatalogItems.map(item =>
              item.itemID === newItem.itemID ? { ...item, inUse: true } : item
            )
          );
        let newObj=spline.current.findObjectById(newItem.itemID);

        newObj.visible=true;

    }


    return (
    <div className='bg-white h-full w-full'>
        {/* ADD NAV BAR COMPONTENT */}

        <div className='h-full w-full'>


            <Spline className="z-10" scene="https://prod.spline.design/wsJfsBTQo7cxhBLM/scene.splinecode" onLoad={onLoad} onSplineMouseDown={onSplineMouseDown} onSplineMouseUp={onSplineMouseUp}/>
            <div className=" absolute flex m-2 items-center text-2xl justify-center top-0 left-0 w-10% h-10% text-white shadow-lg shadow-gray-400 rounded-3xl bg-redBrown z-40 hover:cursor-pointer hover:outline outline-white" onClick={onSave}>
                Save
            </div>
            <div className=''>
            {showCatalog && <div className="pt-7% absolute flex m-3 text-2xl bottom-0 right-0 w-30% h-full text-white shadow-lg shadow-gray-400 rounded-3xl bg-redBrown z-40 hover:cursor-pointer hover:outline outline-white">
            {!showPopup ? catalogItems.map(
            (
              catalogItem,
            ) => (
              <Item
                name={catalogItem.name}
                itemID={catalogItem.itemID}
                isInUse={catalogItem.inUse}
                insertItem={insertItem}
                key={catalogItem.itemID}
              />
            ),
          ): <MemoryCard text={popupText} closePopup={closePopup}/>}
                </div>}


            {!showCatalog && <div className="absolute flex m-3 items-center text-2xl justify-center bottom-0 right-0 w-30% h-full text-white rounded-3xl bg-white z-40 hover:cursor-pointer hover:outline outline-white" onClick={()=>setShowCatalog(!showCatalog)}></div>}


                <div className="absolute flex m-2 items-center text-2xl justify-center top-0 right-0 mr-6 w-fit h-fit p-6 text-white shadow-lg shadow-gray-500 rounded-3xl bg-red-300 z-50 hover:cursor-pointer hover:outline outline-white" onClick={()=>setShowCatalog(!showCatalog)}>
                    {showCatalog ? "X" : "Catalog"}
                </div>


            </div>


        </div>

    </div>



    );
  }
