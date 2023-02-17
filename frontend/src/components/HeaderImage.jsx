import React from "react";

function HeaderImage() {
  return (
    <div className='w-full flex justify-center relative'>
      <div className='w-[90%] h-[450px] flex justify-center my-3 border-2 relative'>
        <img
          className='w-[100%] h-[100%] object-cover  '
          src='https://image.tmdb.org/t/p/original/faXT8V80JRhnArTAeYXz0Eutpv9.jpg'
          alt='/'
        ></img>
        <div className='absolute bottom-10 left-5'>
          <h1 className='text-2xl text-white'>Puss in Boots: The Last Wish</h1>
          <p className='text-xl text-white w-[60%]'>
            Puss in Boots discovers that his passion for adventure has taken its
            toll: He has burned through eight of his nine lives, leaving him
            with only one life left. Puss sets out on an epic journey to find
            the mythical Last Wish and restore his nine lives.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeaderImage;
