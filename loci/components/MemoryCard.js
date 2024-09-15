import React,{useEffect,useRef} from 'react';

// props: previous text and closePopup function
export default function MemoryCard(props) {
    let inputRef = useRef();



    // click outside input box to close
    useEffect(() => {
    let handler = (e) => {
      if (!inputRef.current.contains(e.target)) {
        props.closePopup()
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });



    // useEffect(() => {
    //     const handleEscapePress = (event) => {
    //       if (event.key === "Escape") {
    //         setDefault();
    //       }
    //     };

    //     document.addEventListener("keydown", handleEscapePress);

    //     return () => {
    //       document.removeEventListener("keydown", handleEscapePress);
    //     };
    //   });

    return (
        <div className="bg-red-200 h-full w-full"
        ref={inputRef}>
            <div className='p-5'>
                NOTES HERE

            </div>


        </div>

    );
  }
