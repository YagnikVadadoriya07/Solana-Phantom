import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

const ConnectedWallet = () => {
  const { wallet } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (JSON.parse(localStorage.getItem("wallet")) == null) {
      navigate("/");
    }
  }, []);
  const navigate = useNavigate();
  function changewallet() {
    localStorage.setItem("wallet", JSON.stringify(null));
    navigate("/");
  }
  async function Sign_in_wallet() {
    if (wallet == "Phantom") {
      localStorage.setItem("wallet", JSON.stringify({ wallet: "phantom" }));
      window?.solana
        ?.connect()
        .then(async (res) => {
          localStorage.setItem("wallet", JSON.stringify({ wallet: "phantom" }));
          toast.success("Phantom Wallet Selected");
          navigate("/dashboard/Phantom");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <Header />

      <div className="flex justify-center mt-28">
        <div className="flex justify-center bg-[#fff] h-[400px] w-[700px] dark:bg-blue-darkest rounded-[50px]">
          <div className="mt-16">
            <img
              src="https://app.tradingtent.io/images/tent.png"
              alt="tentlo"
              className="w-20 mb-5 mx-auto"
            />
            <div className="flex justify-center dark:text-[#0077ff] text-2xl font-normal font-[700] text-[#0F0F4D]">
              <h1>Welcome to Tent</h1>
            </div>
            <div className="flex justify-center mt-3 dark:text-white text-xl font-normal font-[500] dark:text-white">
              <p>Please log in using your Cardano Wallet</p>
            </div>
            <div className="flex justify-center items-center mb-4 mt-5 border-1 rounded-xl bg-[#F2F2F2] dark:bg-[#001c49] ">
              <p className="dark:text-gray-300 text-center text-base bg-gray-lightest dark:bg-blue-darker text-blue-dark dark:text-gray-lightest leading-150 rounded-lg py-1.5 px-4 font-normal dark:bg-[#001c49]">
                Connected wallet :
                <span className="font-bold text-lg ml-2 dark:text-white">
                  {wallet}
                </span>{" "}
                {/**/}
                <button
                  type="button"
                  className="font-normal underline dark:text-gray-100"
                  onClick={changewallet}
                >
                  change
                </button>
              </p>
            </div>
            <div className="flex justify-center mt-7">
              <button
                type="button"
                onClick={Sign_in_wallet}
                className="text-white font-normal font-[700] text-xl bg-blue-light hover:bg-opacity-80 focus:ring-4 focus:ring-blue-300 rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-[#0072e5] dark:hover:bg-opacity-80 focus:outline-none dark:focus:ring-blue-800"
              >
                <i className="fa-solid fa-wallet mr-4"></i>Enter the Tent
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConnectedWallet;
