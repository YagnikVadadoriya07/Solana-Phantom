import React, { useEffect } from "react";

const DigitalMersh = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <>
      <div className="container-fluid m-auto mt-10">
        {/* Home Page */}
        <div className="grid 2xl:grid-cols-2 justify-between md:justify-center sm:grid-cols-1 md:grid-cols-2 ">
          <div className="md:flex-[0.5] flex-initial items-center justify-center mx-28">
            <h1 className="text-white text-8xl font-bold ">
              Share the <br />
              Partnership!
            </h1>
            <div className=" my-5 text-3xl text-[#FFB23C] font-[500] font-normal">
              Let's spread the word and make trading more secure ✨
            </div>
            <div className="text-white text-2xl w-3/4">
              We’ve created a set of digital merch that can be worn over your
              NFTs through Canva Templates. This won't affect your NFT,
              obviously, it's just a fun little thing to show our partnerships
              and helping spread the word about Tent.
            </div>
            <div className="mt-10 mx-10 font-normal text-xl font-[500] text-white italic">
              Scroll Down to See Items & Compatible Projects.
            </div>
          </div>
          <div className="flex">
            <img src="/images/Tent-Hero (1) 1.png" alt="tentHero" />
          </div>
        </div>
      </div>
      {/* second page */}
      <div className="container-fluid m-auto colornewSection">
        <div className="flex justify-center">
          <h1 className="text-white text-6xl font-bold mt-32">Fort Gotten</h1>
        </div>
        <div className="flex justify-center mt-10 gap-4  flex-wrap">
          <div className="max-w-sm bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 w-72 m-5 rounded-3xl shadow-lg"
                src="/images/Tent Fort Gotten Jacket.png"
                alt="Bonnie"
              />
              <h1 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                Tent Jacket
              </h1>
            </div>
          </div>
          <div className="max-w-sm bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 w-72 m-5 rounded-3xl shadow-lg"
                src="/images/TentMask11.png"
                alt="Bonnie"
              />
              <h1 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                Tent Mask
              </h1>
            </div>
          </div>
          <div className="max-w-sm bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 w-72 m-5 rounded-3xl shadow-lg"
                src="/images/tentStaff.png"
                alt="Bonnie"
              />
              <h1 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                Tent Staff
              </h1>
            </div>
          </div>
        </div>

        {/* thired */}
        <div className="flex justify-center mt-48">
          <h1 className="text-white text-6xl font-bold ">Chilled Kongs</h1>
        </div>
        <div className="flex justify-center mt-10 gap-4  flex-wrap">
          <div className="max-w-sm bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 w-72 m-5 rounded-3xl shadow-lg"
                src="/images/gorila.png"
                alt="Bonnie"
              />
              <h1 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                Tent Headphones
              </h1>
            </div>
          </div>
          <div className="max-w-sm bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 w-72 m-5 rounded-3xl shadow-lg"
                src="/images/gorila2.png"
                alt="Bonnie"
              />
              <h1 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                Cyan Tent Cap
              </h1>
            </div>
          </div>
          <div className="max-w-sm bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 w-72 m-5 rounded-3xl shadow-lg"
                src="/images/gorila3.png"
                alt="Bonnie"
              />
              <h1 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                White Tent Cap
              </h1>
            </div>
          </div>
        </div>

        {/* four */}
        <div className="flex justify-center mt-48">
          <h1 className="text-white text-6xl font-bold ">Yummi Universe</h1>
        </div>
        <div className="flex justify-center mt-10 gap-4 flex-wrap mb-40">
          <div className="max-w-sm bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 w-72 m-5 rounded-3xl shadow-lg"
                src="/images/tent1.png"
                alt="Bonnie "
              />
              <h1 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                Tent Headband
              </h1>
            </div>
          </div>
          <div className="max-w-sm bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 w-72 m-5 rounded-3xl shadow-lg"
                src="/images/tent2.png"
                alt="Bonnie"
              />
              <h1 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                Tent Cap
              </h1>
            </div>
          </div>
          <div className="max-w-sm bg-white rounded-3xl border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 w-72 m-5 rounded-3xl shadow-lg"
                src="/images/tent3.png"
                alt="Bonnie"
              />
              <h1 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                Tent Scarf
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalMersh;
