import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/startatrade.css";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import axios from "axios";

const StartaTrade = () => {
  const navigate = useNavigate();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const onClickOpenModel = () => {
    setIsModelOpen((prevestate) => !prevestate);
  };
  const [isOwnerPublicKey, setIsOwnerPublicKey] = useState(
    localStorage.getItem("OwnerPublicKey")
  );
  const solanaWalletConnection = async () => {
    try {
      const { solana } = window;
      if (solana) {
        const resp = await window?.solana?.connect();
        localStorage.setItem("OwnerPublicKey", resp.publicKey.toBase58());
        setIsOwnerPublicKey(resp.publicKey.toBase58());
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const data = {
          jsonrpc: "2.0",
          method: "qn_fetchNFTs",
          id: 1,
          params: {
            wallet: resp.publicKey.toBase58(),
            omitFields: ["provenance", "traits"],
            page: 1,
            perPage: 100,
          },
        };
        axios
          .post(
            "https://magical-neat-sound.solana-devnet.discover.quiknode.pro/2973528e9f79d9e372a733ec87d9176ad475b402/",
            data,
            config
          )
          .then(function (response) {
            console.log(response.data.result.assets, "solana");
          })
          .catch((err) => {
            console.log(err);
          });
        if (JSON.parse(localStorage.getItem("wallet")) == null) {
          localStorage.setItem(
            "wallet",
            JSON.stringify({
              wallet: "phantom",
            })
          );
          toast.success("Redirecting to tent");
        }
        if (JSON.parse(localStorage.getItem("joiner")) === null) {
          navigate("/dashboard/phantom");
        } else {
          navigate(
            "/" + JSON.parse(localStorage.getItem("joiner")).tentID + "/join"
          );
          localStorage.setItem("joiner", null);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("User decline the request");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (JSON.parse(localStorage.getItem("wallet")) != null) {
      if (JSON.parse(localStorage.getItem("wallet")).wallet == "phantom") {
        navigate("/connectedwallet/Nami");
      }
    }
  }, []);

  return (
    <>
      <Header />

      <div className="flex justify-center mt-28 ">
        <div className="flex justify-center bg-[#fff] h-[400px] w-[700px] dark:bg-[#000e24] rounded-[50px]">
          <div className="mt-16">
            <img
              src="https://app.tradingtent.io/images/tent.png"
              alt="tentlo"
              className="w-20 mb-5 mx-auto"
            />
            <div className="flex justify-center text-2xl  font-bold text-[#0F0F4D] dark:text-[#017ef8]">
              <h1>Welcome to Tent</h1>
            </div>
            <div className="flex justify-center mt-3 text-lg font-normal dark:text-white">
              <p>Please log in using your solana Wallet</p>
            </div>
            <div className="flex justify-center mt-7">
              <button
                type="button"
                onClick={() => onClickOpenModel()}
                className=" btn-open text-white  font-[700] text-xl bg-blue-light hover:bg-opacity-80 focus:ring-4 focus:ring-blue-300 rounded-lg  px-5 py-2.5 mr-2 mb-2 dark:bg-[#0072e5] dark:hover:bg-opacity-80  focus:outline-none dark:focus:ring-blue-800"
              >
                <i className="fa-solid fa-wallet mr-4"></i>Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*  Model */}
      <div
        className={`${
          isModelOpen
            ? "fixed backdrop-filter backdrop-blur-sm bg-backdrop flex items-center justify-center overflow-auto z-50 inset-0"
            : "hidden"
        }`}
      >
        <div
          className="relative bg-white dark:bg-blue-darkest rounded-xl shadow-xl px-7 sm:px-10 md:px-20 py-10 max-w-3xl w-11/12"
          style={{ minHeight: "333px" }}
        >
          <i
            className="fa-solid fa-xmark flex justify-end text-3xl text-gray-400 font-bold"
            onClick={() => onClickOpenModel()}
          ></i>
          <div className="text-center mb-7">
            <h1 className="text-blue-dark dark:text-gray-lightest mb-10 font-bold text-3xl">
              Select Wallet
            </h1>
          </div>{" "}
          <div className="flex justify-center gap-7">
            <div>
              <button
                type="button"
                className="relative w-48 p-4 bg-gray-lightest dark:bg-blue-darker rounded-xl text-blue-dark dark:text-gray-regular bg-opacity-60 border-2 hover:bg-opacity-10 dark:hover:bg-blue-meta dark:hover:bg-opacity-20 hover:bg-blue-light hover:border-blue-light text-lg font-semibold dark:border-blue-darkest"
                onClick={() => solanaWalletConnection()}
              >
                <img
                  src="./images/phantom.png"
                  alt="Phantom wallet"
                  className="w-20 h-20 p-2 mx-auto mb-2"
                />
                Phantom
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartaTrade;
