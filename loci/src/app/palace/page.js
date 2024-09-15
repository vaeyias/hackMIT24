'use client'
import React, { useEffect, useState,useRef } from 'react';
import Item from '../components/Item.js';
import MemoryCard from '../components/MemoryCard.js';

import Spline from '@splinetool/react-spline';


export default function Palace() {
    const [showPopup, setShowPopup]= useState(false);
    const [popupText, setPopupText]= useState("TEMP");
    const spline = useRef();


    const [catalogItems, setCatalogItems]= useState([{name:"table",id:"05e1d7a5-cc07-495f-97e6-90d1958818c5",visibility:false}])
    const [items, setItems]= useState([{name:"table",id:"05e1d7a5-cc07-495f-97e6-90d1958818c5",visibility:false},{name:"chair",id:2,visibility:false},{name:"shelf",id:3,visibility:false}]);
    const [showCatalog,setShowCatalog]=useState(false);
    const [splineUpdated, setSplineUpdated]=useState(false);


    let isMouseDown=false;
    let clickStartTime=0;
    const timeoutRef = useRef(null);




    const closePopup = ()=>{
        setShowPopup(false);
    }

    const onLoad=(splineApp)=>{
        spline.current=splineApp
        splineApp.setZoom(1)
        console.log("FIRST",spline,spline.current)
        if (spline.current){
          if(spline.current._data){
            console.log("BFSDHSDJKFSJKDLF",spline.current._data.scene.objects[0].children);
            setCatalogItems((spline.current._data.scene.objects[0].children).map(child =>({
              id:child.id, name:child.data.name, px:child.data.position[0],py:child.data.position[1],pz:child.data.position[2],visibility:child.data.visible,rx:child.data.rotation[0],ry:child.data.rotation[1],rz:child.data.rotation[2],text:""
            }

          )

            ))


          }

        }

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
        console.log(
          "NEW ITEM",newItem
        )
        setItems(prevItems =>[...prevItems,newItem])
        console.log("ID",newItem.id)


        setCatalogItems(prevCatalogItems =>
            prevCatalogItems.map(item =>
              item.id === newItem.id ? { ...item, visibility: true } : item
            )
          );
        let newObj=spline.current.findObjectById(newItem.id);
        console.log(
          "NEW OBJ",spline.current._scene.activePage.children
        )
        // newObj.visible=true;

    }

    // to-do ADD DELETE EVENT FUNCTIONALLY
    const deleteItem = (deletedItem)=>{
        setItems(prevItems =>[...prevItems,newItem])

        // adds item back to catalog
        setCatalogItems(prevCatalogItems =>
            prevCatalogItems.map(item =>
              item.id === deletedItem.id ? { ...item, visibility: false } : item
            )
          );

        // delete item from visible item list
        setItems(prevItems =>
        prevItems.map(item =>
            item.id != newItem.id && item
        )
        );



        setCatalogItems(prevCatalogItems =>
            prevCatalogItems.map(item =>
              item.id === newItem.id ? { ...item, visibility: true } : item
            )
          );
        let newObj=spline.current.findObjectById(newItem.id);

        newObj.visible=true;

    }


    return (
    <div className='bg-white h-full w-full'>
        {/* ADD NAV BAR COMPONTENT */}

        <div className='h-full w-full'>
        {!showCatalog && <div className="absolute flex items-center text-2xl justify-center bottom-0 right-0 w-1/12 h-full text-white bg-white z-20 hover:cursor-pointer hover:outline outline-white" onClick={()=>setShowCatalog(!showCatalog)}></div>}


            <Spline className="z-10" scene="https://prod.spline.design/Vm9O1npHiqbOs5Jl/scene.splinecode" onLoad={onLoad} onSplineMouseDown={onSplineMouseDown} onSplineMouseUp={onSplineMouseUp}/>
            <div className=" absolute flex m-2 items-center text-2xl justify-center top-0 left-0 w-10% h-10% text-white shadow-lg shadow-gray-400 rounded-3xl bg-redBrown z-40 hover:cursor-pointer hover:outline outline-white" onClick={onSave}>
                Save
            </div>
            <div className=''>
            {showCatalog && <div className="pt-7% absolute scroll-auto flex flex-wrap text-2xl bottom-0 right-0 w-30% overflow-scroll h-full text-white shadow-lg shadow-gray-400 rounded-l-3xl bg-redBrown z-40 hover:cursor-pointer hover:outline outline-white">
            {!showPopup ? catalogItems.map(
            (
              catalogItem,
            ) => (
              <Item
                name={catalogItem.name}
                id={catalogItem.id}
                inUse={catalogItem.visibility}
                insertItem={insertItem}
                key={catalogItem.id}
              />
            ),
          ): <MemoryCard text={popupText} closePopup={closePopup}/>}
                </div>}





                <div className="absolute flex m-2 items-center text-2xl justify-center top-0 right-0 mr-6 w-fit h-fit p-6 text-white shadow-lg shadow-gray-500 rounded-3xl bg-red-300 z-50 hover:cursor-pointer hover:outline outline-white" onClick={()=>setShowCatalog(!showCatalog)}>
                    {showCatalog ? "X" : "Catalog"}
                </div>


            </div>


        </div>

    </div>



    );
  }
