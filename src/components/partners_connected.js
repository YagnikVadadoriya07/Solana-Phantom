import React, { useState } from "react";
import "../css/newtentopen.css";
import "../css/partner_connected.css";

const Partners_connected = () => {
  function toogleButton() {
    var elements = document.getElementById("root");
    elements.classList.toggle("dark");
  }

  var temp_tent = window.location.pathname.split("/");
  console.log(temp_tent[2]);

  const [tentid, setAddr] = useState(temp_tent[2]);

  return (
    <>
      <div
        data-v-1f7394e8
        className="max-w-screen-2xl mx-auto w-full  pt-3.5 px-7 mb-8 "
      >
        <h1
          data-v-77e3ed07
          data-v-1f7394e8
          className="flex justify-between items-center text-center font-light relative text-lg"
        >
          <div
            data-v-0f1a40d0
            data-v-77e3ed07
            className="max-w-xl w-11/12 md:w-full mx-auto pb-2"
          >
            <div data-v-0f1a40d0 className="flex">
              <div data-v-0f1a40d0 className="w-1/4">
                <div data-v-0f1a40d0 className="relative">
                  <div
                    data-v-0f1a40d0
                    className="step-container relative flex justify-center items-center mx-auto rounded-full  border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-light"
                  >
                    <img
                      data-v-0f1a40d0
                      src="https://app.tradingtent.io/images/tent.png"
                      alt="hello"
                      className="w-10"
                    />
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="absolute flex align-center items-center align-middle content-center w-full"
                    style={{
                      top: "50%",
                      WebkitTransform: "translate(50%, -50%)",
                      msTransform: "translate(50%, -50%)",
                      transform: "translate(50%, -50%)",
                    }}
                  >
                    <div
                      data-v-0f1a40d0
                      className="w-full bg-gray-light dark:bg-gray-darkest items-center align-middle align-center flex-1"
                    >
                      <div
                        data-v-0f1a40d0
                        className="w-0 progress bg-blue-dark dark:bg-blue-darker py-1"
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>
                </div>{" "}
                <div
                  data-v-0f1a40d0
                  className="text-sm text-center text-blue-meta font-bold"
                >
                  Enter Tent (1/2)
                  {/**/}
                </div>
              </div>{" "}
              <div data-v-0f1a40d0 className="w-1/4">
                <div data-v-0f1a40d0 className="relative">
                  <div
                    data-v-0f1a40d0
                    className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-gray-light dark:bg-gray-darkest"
                  >
                    <img
                      data-v-0f1a40d0
                      src="https://app.tradingtent.io/images/diamond_inactive.png"
                      alt="hello"
                      className="w-8"
                    />
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="absolute flex align-center items-center align-middle content-center w-full"
                    style={{
                      top: "50%",
                      WebkitTransform: "translate(50%, -50%)",
                      msTransform: "translate(50%, -50%)",
                      transform: "translate(50%, -50%)",
                    }}
                  >
                    <div
                      data-v-0f1a40d0
                      className="w-full bg-gray-light dark:bg-gray-darkest items-center align-middle align-center flex-1"
                    >
                      <div
                        data-v-0f1a40d0
                        className="w-0 progress bg-blue-dark dark:bg-blue-darker py-1"
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>
                </div>{" "}
                <div
                  data-v-0f1a40d0
                  className="text-sm text-center text-gray-darkest dark:text-gray-dark"
                >
                  Select Assets
                  {/**/}
                </div>
              </div>{" "}
              <div data-v-0f1a40d0 className="w-1/4">
                <div data-v-0f1a40d0 className="relative">
                  <div
                    data-v-0f1a40d0
                    className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-gray-light dark:bg-gray-darkest"
                  >
                    <img
                      data-v-0f1a40d0
                      src="https://app.tradingtent.io/images/lock_inactive.png"
                      alt="hello"
                      className="w-8"
                    />
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="absolute flex align-center items-center align-middle content-center w-full"
                    style={{
                      top: "50%",
                      WebkitTransform: "translate(50%, -50%)",
                      msTransform: "translate(50%, -50%)",
                      transform: "translate(50%, -50%)",
                    }}
                  >
                    <div
                      data-v-0f1a40d0
                      className="w-full bg-gray-light dark:bg-gray-darkest items-center align-middle align-center flex-1"
                    >
                      <div
                        data-v-0f1a40d0
                        className="w-0 progress bg-blue-dark dark:bg-blue-darker py-1"
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  data-v-0f1a40d0
                  className="text-sm text-center text-gray-darkest dark:text-gray-dark"
                >
                  Confirm Tx
                </div>
              </div>
              <div data-v-0f1a40d0 className="w-1/4">
                <div data-v-0f1a40d0 className="relative">
                  <div
                    data-v-0f1a40d0
                    className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-gray-light dark:bg-gray-darkest"
                  >
                    <img
                      data-v-0f1a40d0
                      src="https://app.tradingtent.io/images/check_inactive.png"
                      alt="hello"
                      className="w-6"
                    />
                  </div>
                </div>
                <div
                  data-v-0f1a40d0
                  className="text-sm text-center text-gray-darkest dark:text-gray-dark"
                >
                  Submit TX
                </div>
              </div>
            </div>
          </div>{" "}
          <div data-v-77e3ed07 className="-mt-2 absolute right-0 text-right">
            <div data-v-77e3ed07 className="flex flex-col">
              <div data-v-77e3ed07 className="flex gap-2.5">
                <div
                  data-v-77e3ed07
                  content="Copy Tent ID"
                  className="cursor-pointer text-blue-dark dark:text-gray-lightest px-3.5 py-1 mb-2 bg-gray-light dark:bg-blue-darkest rounded-lg"
                  tabIndex={0}
                >
                  <span data-v-77e3ed07 className="font-bold leading-150">
                    Tent ID :
                  </span>{" "}
                  <span data-v-77e3ed07 className="font-normal leading-150">
                    {tentid}
                  </span>
                </div>{" "}
                <div data-v-77e3ed07>
                  <button
                    data-v-d75a0d8c
                    data-v-77e3ed07
                    type="button"
                    onClick={toogleButton}
                    className="text-blue dark:text-gray-100 hover:bg-gray-fair bg-gray-light dark:bg-blue-darkest dark:hover:bg-blue-regular rounded-lg p-2 transition-colors duration-150 ease-in-out"
                  >
                    <svg
                      data-v-d75a0d8c
                      width={18}
                      height={18}
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 fill-current"
                    >
                      <path
                        data-v-d75a0d8c
                        d="M0.5 9.25C0.5 4.47855 4.66096 0.5 8.9375 0.5C9.26242 0.5 9.56417 0.668237 9.73499 0.944627C9.9058 1.22102 9.92133 1.56615 9.77603 1.85676C9.50528 2.39825 9.08351 3.52284 9.01418 4.77075C8.94568 6.00377 9.22118 7.27035 10.2254 8.27459C11.2297 9.27882 12.4962 9.55432 13.7292 9.48582C14.9772 9.41649 16.1018 8.99472 16.6432 8.72397C16.9339 8.57867 17.279 8.5942 17.5554 8.76501C17.8318 8.93583 18 9.23758 18 9.5625C18 13.8398 14.0209 17.9958 9.25082 18H9.25C4.41973 18 0.5 14.0803 0.5 9.25ZM7.50522 2.57332C4.79604 3.31594 2.375 6.05381 2.375 9.25C2.375 13.0445 5.45482 16.1246 9.24918 16.125C12.4464 16.1222 15.1839 13.7029 15.9266 10.9948C15.3102 11.172 14.5941 11.3157 13.8333 11.3579C12.2538 11.4457 10.3953 11.0962 8.89959 9.60041C7.40382 8.10465 7.05432 6.24623 7.14207 4.66675C7.18434 3.90589 7.32802 3.18977 7.50522 2.57332Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                data-v-77e3ed07
                className="flex items-center justify-end gap-3"
              >
                <div
                  data-v-77e3ed07
                  content="Time remaining until this Tent closes"
                  className="text-sm group cursor-pointer py-2 px-3.5 dark:bg-blue-darkest rounded-lg"
                  tabIndex={0}
                >
                  <span data-v-77e3ed07>
                    <span
                      data-v-77e3ed07
                      className="font-light group-hover:text-gray-600 dark:group-hover:text-white text-gray-400 dark:text-gray-lightest"
                    >
                      <i data-v-77e3ed07 className="fas fa-hourglass-half" />
                      00:56:14
                    </span>
                  </span>
                </div>
                <div data-v-77e3ed07>
                  <button
                    data-v-77e3ed07
                    type="button"
                    className="px-3.5 pb-0.5 transition-colors text-[#EB5757] duration-150 ease-in-out rounded-lg hover:bg-[#EB5757]  hover:text-white border-[#EB5757] border-2 leading-150 font-bold"
                  >
                    Leave Tent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </h1>
      </div>

      {/* second */}
      <div
        data-v-1f7394e8
        className="max-w-screen-xl mx-auto w-full pt-5 sm:px-6 lg:px-8"
        style={{ height: "calc(100vh - 377px)" }}
      >
        <div data-v-1f7394e8 className="trade-container flex flex-col">
          <div
            data-v-0bbba0cb
            data-v-1f7394e8
            className="h-full  bg-white dark:bg-blue-darkest rounded-2xl flex-col "
            style={{ height: "calc(100vh - 477px)" }}
          >
            <div
              className="  bg-white dark:bg-blue-darkest rounded-2xl "
              id="button_parent_div"
            >
              <div>
                {" "}
                <button
                  type="button"
                  className="text-white font-normal font-[500] text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg  px-2 py-0.5 mx-2 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  1. Select Assets
                </button>
              </div>
              <div>
                {" "}
                <button
                  type="button"
                  className="text-white font-normal font-[500] text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg  px-2 py-0.5 mx-2 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  2. Select ADA
                </button>
              </div>

              <div id="doggle_div">
                <input type="checkbox" className="switch" /> Only Varified
              </div>

              <div id="search_div">
                <div id="search_parent">
                  <svg
                    style={{ "margin-left": "5px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                  <input
                    type="text"
                    id="search_input"
                    placeholder="Search Assets"
                  ></input>
                </div>

                <div id="confirm_parent">
                  <button
                    data-v-0bbba0cb
                    type="button"
                    content="Share the ID with your trading partner to invite them to your Tent"
                    className="rounded-lg text-lg bg-[#FFB23C] hover:bg-opacity-80 box-border leading-150 text-blue-dark py-1 px-4 font-bold"
                  >
                    Confirm Assets
                    <i
                      style={{ marginLeft: "5px" }}
                      data-v-0bbba0cb
                      className="fa-solid fa-arrow-right"
                    />
                  </button>
                </div>
              </div>
            </div>

            <center>
              {" "}
              <p style={{ marginTop: "10px", color: "gray" }}>
                Partner Joined. No native assets found in wallet.
              </p>
            </center>
          </div>
        </div>
      </div>

      {/* footer */}
      <div
        data-v-77d1d4d5
        className="footer shadow fixed bottom-0 w-full bg-white dark:bg-blue-darkest dark:text-white"
        style={{ height: "225px" }}
      >
        <div data-v-77d1d4d5 className="grid grid-cols-footer">
          <div data-v-77d1d4d5 className="justify-between flex flex-col">
            <h2
              data-v-77d1d4d5
              className="text-center py-1.5 leading-150 text-xl text-gray-dark dark:text-gray-regular"
            >
              You will send
            </h2>{" "}
            <div
              data-v-77d1d4d5
              className="relative ml-3"
              style={{ height: "157px", marginBottom: "10px" }}
            >
              <div
                data-v-77d1d4d5
                className="bg-gray-lightest dark:bg-[#001A4B] dark:bg-blue-darker rounded-lg p-1.5 absolute right-0 top-0 bottom-0"
              >
                <a
                  data-v-77d1d4d5
                  href="/"
                  className="image-select min-h-full flex flex-col w-28"
                >
                  <div
                    data-v-77d1d4d5
                    className="h-24 w-24 img-container mx-auto flex items-center justify-center rounded-lg bg-blue-dark dark:bg-blue-darkest overflow-hidden relative"
                  >
                    <div
                      data-v-77d1d4d5
                      className="p-2 rounded-full ada-container"
                    >
                      <svg
                        data-v-77d1d4d5
                        width={21}
                        height={22}
                        viewBox="0 0 21 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          data-v-77d1d4d5
                          d="M19.3896 13.6921H1.21661"
                          stroke="white"
                          strokeWidth="2.27888"
                          strokeLinecap="round"
                        />{" "}
                        <path
                          data-v-77d1d4d5
                          d="M19.3896 9.92578H1.21661"
                          stroke="white"
                          strokeWidth="2.27888"
                          strokeLinecap="round"
                        />{" "}
                        <path
                          data-v-77d1d4d5
                          d="M17.4532 20.0592L11.2821 1.95533L9.7685 1.95533"
                          stroke="white"
                          strokeWidth="2.27888"
                          strokeLinecap="round"
                        />{" "}
                        <line
                          data-v-77d1d4d5
                          x1="1.13944"
                          y1="-1.13944"
                          x2="19.3263"
                          y2="-1.13944"
                          transform="matrix(0.322643 -0.946521 -0.97853 -0.206104 2.71387 20.5562)"
                          stroke="white"
                          strokeWidth="2.27888"
                          strokeLinecap="round"
                        />{" "}
                        <path
                          data-v-77d1d4d5
                          d="M3.24799 20.0592L9.41912 1.95533L10.9327 1.95533"
                          stroke="white"
                          strokeWidth="2.27888"
                          strokeLinecap="round"
                        />{" "}
                        <line
                          data-v-77d1d4d5
                          x1="1.13944"
                          y1="-1.13944"
                          x2="19.3263"
                          y2="-1.13944"
                          transform="matrix(-0.322643 -0.946521 0.97853 -0.206104 17.9883 20.5562)"
                          stroke="white"
                          strokeWidth="2.27888"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>{" "}
                  <div
                    data-v-77d1d4d5
                    className="flex-grow flex flex-col justify-center"
                  >
                    <p
                      data-v-77d1d4d5
                      className="text-base dark:text-white leading-tight text-center font-medium text-blue-dark dark:text-gray-lightest w-full"
                    >
                      0
                    </p>{" "}
                    <p
                      data-v-77d1d4d5
                      className="text-base dark:text-white leading-tight text-center font-medium text-blue-dark dark:text-gray-lightest w-full"
                    >
                      ADA
                    </p>
                  </div>
                </a>
              </div>{" "}
              <div
                data-v-77d1d4d5
                className="trade-nfts flex flex-row-reverse overflow-x-auto"
              >
                <div data-v-77d1d4d5 className="flex w-full flex-nowrap">
                  <div
                    data-v-77d1d4d5
                    className="w-full text-center font-light text-gray-400 dark:text-gray-regular pt-8"
                    style={{ height: "128px" }}
                  >
                    Your haven't selected any Native Assets.
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <div
            data-v-77d1d4d5
            className="separator flex items-center flex-grow-0"
          >
            <div data-v-77d1d4d5 className="mx-auto relative flex items-center">
              <p
                data-v-77d1d4d5
                className="absolute w-48 dark:text-white text-center text-base font-bold text-blue-dark dark:text-gray-lightest -top-7"
                style={{
                  WebkitTransform: "translate(-73px, -4px)",
                  msTransform: "translate(-73px, -4px)",
                  transform: "translate(-73px, -4px)",
                }}
              >
                Transaction Summary
              </p>{" "}
              <div
                data-v-77d1d4d5
                className="separator-icon dark:bg-[#001A4B] w-12 h-12 rounded-full flex justify-center items-center bg-gray-lightest dark:bg-blue-darker"
              >
                <img
                  data-v-77d1d4d5
                  src="https://app.tradingtent.io/images/trade.png"
                  alt="Trade icon"
                  className="w-5"
                />
              </div>
            </div>
          </div>{" "}
          <div data-v-77d1d4d5 className="justify-between flex flex-col">
            <h2
              data-v-77d1d4d5
              className="text-center py-1.5 leading-150 text-xl text-gray-dark dark:text-gray-regular"
            >
              You will receive
            </h2>{" "}
            <div
              data-v-77d1d4d5
              className="relative mr-3 "
              style={{ height: "157px", marginBottom: "10px" }}
            >
              <div
                data-v-77d1d4d5
                className="dark:bg-[#001A4B] bg-gray-lightest dark:bg-blue-darker  rounded-lg p-1.5 absolute top-0 bottom-0"
              >
                <a
                  data-v-77d1d4d5
                  href="/"
                  className="image-select min-h-full flex flex-col w-28"
                >
                  <div
                    data-v-77d1d4d5
                    className="h-24 w-24 img-container mx-auto flex items-center justify-center rounded-lg bg-blue-dark dark:bg-blue-darkest overflow-hidden relative"
                  >
                    <div
                      data-v-77d1d4d5
                      className="p-2 rounded-full ada-container"
                    >
                      <svg
                        data-v-77d1d4d5
                        width={21}
                        height={22}
                        viewBox="0 0 21 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          data-v-77d1d4d5
                          d="M19.3896 13.6921H1.21661"
                          stroke="white"
                          strokeWidth="2.27888"
                          strokeLinecap="round"
                        />{" "}
                        <path
                          data-v-77d1d4d5
                          d="M19.3896 9.92578H1.21661"
                          stroke="white"
                          strokeWidth="2.27888"
                          strokeLinecap="round"
                        />{" "}
                        <path
                          data-v-77d1d4d5
                          d="M17.4532 20.0592L11.2821 1.95533L9.7685 1.95533"
                          stroke="white"
                          strokeWidth="2.27888"
                          strokeLinecap="round"
                        />{" "}
                        <line
                          data-v-77d1d4d5
                          x1="1.13944"
                          y1="-1.13944"
                          x2="19.3263"
                          y2="-1.13944"
                          transform="matrix(0.322643 -0.946521 -0.97853 -0.206104 2.71387 20.5562)"
                          stroke="white"
                          strokeWidth="2.27888"
                          strokeLinecap="round"
                        />{" "}
                        <path
                          data-v-77d1d4d5
                          d="M3.24799 20.0592L9.41912 1.95533L10.9327 1.95533"
                          stroke="white"
                          strokeWidth="2.27888"
                          strokeLinecap="round"
                        />{" "}
                        <line
                          data-v-77d1d4d5
                          x1="1.13944"
                          y1="-1.13944"
                          x2="19.3263"
                          y2="-1.13944"
                          transform="matrix(-0.322643 -0.946521 0.97853 -0.206104 17.9883 20.5562)"
                          stroke="white"
                          strokeWidth="2.27888"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>{" "}
                  <div
                    data-v-77d1d4d5
                    className="flex-grow flex flex-col justify-center"
                  >
                    <p
                      data-v-77d1d4d5
                      className="dark:text-white text-base leading-tight text-center font-medium text-blue-dark dark:text-gray-lightest w-full"
                    >
                      0
                    </p>{" "}
                    <p
                      data-v-77d1d4d5
                      className="dark:text-white text-base leading-tight text-center font-medium text-blue-dark dark:text-gray-lightest w-full"
                    >
                      ADA
                    </p>
                  </div>
                </a>
              </div>{" "}
              <div
                data-v-77d1d4d5
                className="trade-nfts flex overflow-x-auto"
                style={{ marginRight: "0px", marginLeft: "132px" }}
              >
                <div data-v-77d1d4d5 className="flex w-full flex-nowrap">
                  <div
                    data-v-77d1d4d5
                    className="w-full text-center font-light text-gray-400 pt-8"
                    style={{ height: "128px" }}
                  >
                    Your trade partner hasn't selected any Native Assets.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners_connected;
