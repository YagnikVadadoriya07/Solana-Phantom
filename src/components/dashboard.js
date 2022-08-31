import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import "../css/dashboard.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./header";
var Buffer = require("buffer").Buffer;

async function get_address(baseaddr) {
  const S = await import("@emurgo/cardano-serialization-lib-asmjs");
  return S.Address.from_bytes(Buffer.from(baseaddr, "hex")).to_bech32();
}

const Dashboard = ({ socket }) => {
  const [show, setShow] = useState(false);
  const [model, setModel] = useState(false);
  const [resenttent, setResenttent] = useState(true);
  const [recenttentid, setRecenttentid] = useState("");
  const dashboardOpenPopUP = () => {
    setShow(true);
  };
  const PopupClose = () => {
    setShow(false);
  };

  const JoinTentPopup = () => {
    setModel(true);
  };
  const joinTentClose = () => {
    setModel(false);
  };
  const [wallet, set_wallet] = useState("undefined");
  const [wallet_addr, set_wallet_addr] = useState("undefined");
  const [stake_key, set_stake_key] = useState("undefined");
  const navigate = useNavigate();
  external_function();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("wallet")) == null) {
      navigate("/");
    } else {
      set_wallet(JSON.parse(localStorage.getItem("wallet")).wallet);
      check();
      socket.on("joinerjoined", (data) => {
        toast.success("Someone Has Joined the Tent", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/selectassets/" + data.tentID);
      });
      socket.on("navigatetentjoiner", (data) => {
        var data = {
          tentID: data.tentID,
          time: data.time,
        };
        localStorage.setItem("tent", JSON.stringify(data));
        navigate("/selectassets/" + data.tentID);
      });
    }
  }, [socket]);

  async function external_function() {
    if (wallet === "nami") {
      var getadres = await window.cardano.nami.enable();
      var nami_base_addr = await getadres.getUsedAddresses();
      var nami_stake_base_key = await getadres.getRewardAddresses();
      var nami_My_wallet_adress = await get_address(nami_base_addr[0]);
      var nami_my_stake_key = await get_address(nami_stake_base_key[0]);
      set_stake_key(nami_my_stake_key);
      set_wallet_addr(nami_My_wallet_adress);
    } else if (wallet === "eternl") {
      var getadres = await window.cardano.eternl.enable();
      var eternl_base_addr = await getadres.getUsedAddresses();
      var eternl_stake_base_key = await getadres.getRewardAddresses();
      var eternl_My_wallet_adress = await get_address(eternl_base_addr[0]);
      var eternl_my_stake_key = await get_address(eternl_stake_base_key[0]);
      set_stake_key(eternl_my_stake_key);
      set_wallet_addr(eternl_My_wallet_adress);
    }
  }

  function addr_clicked() {
    window.location.replace("https://pool.pm/" + stake_key);
  }

  function randomString(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  const check = () => {
    let timestamp = new Date();
    timestamp = timestamp.valueOf();
    let data = JSON.parse(localStorage.getItem("tent"));
    if (data != null) {
      if (data.time > timestamp) {
        setRecenttentid(data.tentID.slice(5));
        setResenttent(false);
      }
    }
  };

  const tent_creating = () => {
    var password_for_tent = document.getElementById(
      "create_tent_password"
    ).value;
    if (password_for_tent.length != 0 && password_for_tent.length < 6) {
      toast.error("Use a password that's at least 6 characters long", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let lString = randomString(
      8,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    let rString = randomString(
      5,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    let timestamp = new Date();

    var data = {
      stake1: wallet_addr,
      socketID: socket.id,
      tentID: "TENT-" + lString + "-" + rString,
      connect: false,
      joiner: undefined,
      time: timestamp.valueOf() + 3600000,
      password:
        password_for_tent.value != undefined ? password_for_tent.value : null,
    };

    socket.emit("createtent", {
      tent: data,
      socket: socket.id,
    });

    toast.success("Tent Created " + data.tentID, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    localStorage.setItem("tent", JSON.stringify(data));
    navigate("/newtent/" + data.tentID);
  };

  function join_tent_process() {
    var tentid_join = document.getElementById("join_tent_id").value;

    if (tentid_join === "") {
      $("#join_warn").css("display", "block");
    } else {
      $("#join_warn").css("display", "none");

      socket.emit("jointent", {
        tent: tentid_join,
        socket: socket.id,
      });
    }
  }

  function recenttentopen() {
    let data = JSON.parse(localStorage.getItem("tent"));
    data.socketID = socket.id;

    socket.emit("createtent", {
      tent: data,
      socket: socket.id,
    });

    toast.success("Tent Opened " + data.tentID, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    navigate("/newtent/" + data.tentID);
  }

  return (
    <>
      <div className="relative h-full bg-gray-100 dark:bg-black-almost">
        <Header />
        <div>
          {resenttent ? (
            <div
              data-v-098e79de
              className="max-w-screen-lg mx-auto w-full pt-3.5 sm:px-6 lg:px-8 overflow-y-auto"
              style={{ height: "calc(100vh - 290px)" }}
            >
              <div
                data-v-098e79de
                className="p-7 bg-white dark:bg-blue-darkest rounded-4xl mb-7"
              >
                <h2
                  data-v-098e79de
                  className="text-2xl fontSetLeave text-center leading-150 text-blue-dark dark:text-gray-lightest font-bold"
                >
                  Active Trades
                </h2>{" "}
                <div data-v-098e79de className="mt-2">
                  <p
                    data-v-098e79de
                    className="text-center text-blue-dark dark:text-gray-lightest"
                  >
                    You have no active trades.
                  </p>{" "}
                  <div data-v-098e79de className="mt-5 text-center">
                    <button
                      data-v-098e79de
                      type="button"
                      onClick={dashboardOpenPopUP}
                      className="mx-2  fontSetLeave box-border border-2 border-transparent leading-150 text-xl rounded-lg py-1.5 px-4 font-bold bg-yellow hover:bg-opacity-80 text-blue-dark"
                    >
                      Open a New Tent 🏕️
                    </button>{" "}
                    <p
                      data-v-098e79de
                      className="my-2.5 text-blue-dark dark:text-gray-lightest"
                    >
                      or
                    </p>{" "}
                    <button
                      data-v-098e79de
                      type="button"
                      onClick={JoinTentPopup}
                      className="mx-2 fontSetLeave box-border border-2 border-transparent leading-150 text-xl rounded-lg py-1.5 px-4 font-bold bg-yellow hover:bg-opacity-80 text-blue-dark"
                    >
                      Join Tent by ID
                    </button>
                  </div>
                </div>
              </div>{" "}
              <div
                data-v-098e79de
                className="p-7 bg-white dark:bg-blue-darkest rounded-4xl mb-7"
              >
                <h2
                  data-v-098e79de
                  className="text-2xl text-center leading-150 text-blue-dark dark:text-gray-lightest font-bold"
                >
                  Recent Successful Trades
                </h2>{" "}
                <p
                  data-v-098e79de
                  className="text-center text-blue-dark dark:text-gray-lightest mt-2"
                >
                  You don't have any successful past trades.
                </p>{" "}
                <div data-v-098e79de className="text-center">
                  <button
                    data-v-098e79de
                    className="text-blue-light hover:opacity-80 border-b border-blue-light text-lg font-medium"
                  >
                    View all Trades
                  </button>
                </div>{" "}
                {/**/} {/**/}
              </div>
            </div>
          ) : (
            <div
              data-v-098e79de
              className="max-w-screen-lg mx-auto w-full pt-3.5 sm:px-6 lg:px-8 overflow-y-auto"
              style={{ height: "calc(100vh - 290px)" }}
            >
              <div
                data-v-098e79de
                className="p-7 bg-white dark:bg-blue-darkest rounded-4xl mb-7"
              >
                <h2
                  data-v-098e79de
                  className="text-2xl fontSetLeave text-center leading-150 text-blue-dark dark:text-gray-lightest font-bold"
                >
                  Active Trades
                </h2>{" "}
                <div data-v-098e79de className="text-center font-bold mt-4">
                  <div
                    data-v-098e79de
                    className="flex flex-row justify-center mb-5"
                  >
                    <button
                      data-v-098e79de
                      type="button"
                      onClick={recenttentopen}
                      className="mx-2 fontSetLeave box-border border-2 border-transparent leading-150 text-xl rounded-lg py-1.5 px-4 font-bold bg-gray-50 hover:bg-opacity-80 text-blue-dark"
                    >
                      <div data-v-098e79de className="font-normal">
                        <span
                          data-v-098e79de
                          className="font-bold fontSetLeave"
                        >
                          Tent ID :{recenttentid}
                        </span>
                      </div>
                    </button>
                  </div>{" "}
                  <div
                    data-v-098e79de
                    className="text-blue-dark dark:text-gray-lightest text-sm opacity-70"
                  >
                    <p data-v-098e79de>
                      Please remember, for now, you can only have 1 active trade
                      at a time.
                    </p>{" "}
                    <p data-v-098e79de className="font-normal">
                      If you want to open a new tent, close your active trade.
                    </p>
                  </div>
                </div>
              </div>{" "}
              <div
                data-v-098e79de
                className="p-7 bg-white dark:bg-blue-darkest rounded-4xl mb-7"
              >
                <h2
                  data-v-098e79de
                  className="text-2xl fontSetLeave text-center leading-150 text-blue-dark dark:text-gray-lightest font-bold"
                >
                  Recent Successful Trades
                </h2>{" "}
                <p
                  data-v-098e79de
                  className="text-center text-blue-dark dark:text-gray-lightest mt-2"
                >
                  You don't have any successful past trades.
                </p>{" "}
                <div data-v-098e79de className="text-center">
                  <button
                    data-v-098e79de
                    className="text-blue-light fontSetLeave hover:opacity-80 border-b border-blue-light text-lg font-medium"
                  >
                    View all Trades
                  </button>
                </div>{" "}
                {/**/} {/**/}
              </div>
            </div>
          )}
        </div>
        {/* footer */}
        <div className="footer mt-4 w-full ">
          <div className="px-5 pb-3">
            <div className="flex items-center justify-between">
              <div data-v-9fa2cc10>
                <p
                  data-v-9fa2cc10
                  className="text-base font-bold text-blue-dark dark:text-gray-300 pl-1 mb-1.5"
                >
                  <i data-v-9fa2cc10 className="fas fa-wallet mr-1" />
                  Account Wallet
                </p>{" "}
                <a
                  data-v-9fa2cc10
                  href="https://pool.pm/stake1uyvttc4cnlv7dd3mghka9cjslcc0rjh7gftjtkaedy7ffrcvapdte"
                  target="_blank"
                  rel="noreferrer"
                  onClick={addr_clicked}
                  content="View on <img class='w-3 inline ml-0.5' src='https://pool.pm/favicon.ico'/><strong>pool.pm</strong>"
                  className="bg-white dark:bg-[#000e24]  dark:text-gray-100 py-1.5 px-3 mb-1 hover:text-blue-500 dark:hover:text-blue-200 inline-block leading-150 rounded-lg"
                >
                  {stake_key}
                  <i
                    data-v-9fa2cc10
                    className="fas fa-external-link-alt ml-1"
                  />
                </a>{" "}
                {/**/}
              </div>{" "}
              <a
                href="https://fort-gotten.com"
                target="_blank"
                rel="noreferrer"
                className="text-right hover:opacity-80 text-blue-dark font-normal dark:text-gray-300 "
              >
                <svg
                  width={147}
                  height={16}
                  viewBox="0 0 147 16"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                  className="inline"
                >
                  <path
                    d="M11.16 0.329446V3.99453H4.11807V5.90943H10.707V9.36861H4.11807V14.9898H0V0.329446H11.16Z"
                    fill="currentColor"
                  />{" "}
                  <path
                    d="M25.2505 13.219C23.8366 14.6191 21.9767 15.3192 19.6705 15.3192C17.3644 15.3192 15.5044 14.6191 14.0906 13.219C12.6767 11.8463 11.9697 9.99318 11.9697 7.65961C11.9697 5.33976 12.6767 3.47977 14.0906 2.07962C15.5181 0.693208 17.3781 0 19.6705 0C21.9629 0 23.8229 0.693208 25.2505 2.07962C26.6644 3.47977 27.3713 5.33976 27.3713 7.65961C27.3713 9.99318 26.6644 11.8463 25.2505 13.219ZM17.1791 10.6658C17.7968 11.3933 18.6273 11.7571 19.6705 11.7571C20.7138 11.7571 21.5443 11.3933 22.162 10.6658C22.7797 9.952 23.0885 8.94994 23.0885 7.65961C23.0885 6.39673 22.7797 5.40153 22.162 4.67401C21.5443 3.93276 20.7138 3.56213 19.6705 3.56213C18.6273 3.56213 17.7968 3.93276 17.1791 4.67401C16.5614 5.40153 16.2525 6.39673 16.2525 7.65961C16.2525 8.94994 16.5614 9.952 17.1791 10.6658Z"
                    fill="currentColor"
                  />{" "}
                  <path
                    d="M41.2098 11.5512L41.2922 13.5073C41.3196 14.1112 41.4432 14.6054 41.6628 14.9898H37.4212C37.2565 14.6741 37.1604 14.1799 37.1329 13.5073L37.0711 11.8394C37.0437 11.0982 36.8721 10.5972 36.5564 10.3364C36.2544 10.0618 35.7602 9.92455 35.0739 9.92455H32.9325V14.9898H28.8144V0.329446H36.021C37.8879 0.329446 39.2674 0.734389 40.1597 1.54428C41.0382 2.36789 41.4775 3.41113 41.4775 4.67401C41.4775 5.42899 41.2784 6.10847 40.8804 6.71245C40.496 7.31644 39.9332 7.78315 39.1919 8.1126C39.9332 8.38713 40.4411 8.78521 40.7156 9.30684C41.0039 9.82846 41.1686 10.5766 41.2098 11.5512ZM32.9325 3.54154V6.91836H35.4033C36.625 6.91836 37.2359 6.35555 37.2359 5.22995C37.2359 4.10434 36.625 3.54154 35.4033 3.54154H32.9325Z"
                    fill="currentColor"
                  />{" "}
                  <path
                    d="M42.1869 0.329446H54.9529V3.99453H50.6289V14.9898H46.5108V3.99453H42.1869V0.329446Z"
                    fill="currentColor"
                  />{" "}
                  <path
                    d="M68.7623 9.71864V6.58891H75.7012V14.9898H72.9009L72.4891 13.0749C72.0361 13.8024 71.391 14.3583 70.5536 14.7427C69.7163 15.127 68.7828 15.3192 67.7533 15.3192C65.6119 15.3192 63.9029 14.626 62.6263 13.2396C61.336 11.8669 60.6908 10.0069 60.6908 7.65961C60.6908 5.31231 61.3635 3.44545 62.7087 2.05903C64.0402 0.686345 65.9002 0 68.2887 0C70.2791 0 71.9194 0.473578 73.2098 1.42073C74.5275 2.38162 75.2963 3.68567 75.5159 5.3329H71.3155C70.8899 4.12493 69.8947 3.52095 68.3299 3.52095C67.2729 3.52095 66.4493 3.88471 65.859 4.61224C65.2688 5.33976 64.9736 6.35555 64.9736 7.65961C64.9736 8.96366 65.2825 9.97945 65.9002 10.707C66.5316 11.4345 67.417 11.7983 68.5563 11.7983C69.2839 11.7983 69.9084 11.613 70.4301 11.2423C70.9654 10.858 71.3086 10.3501 71.4596 9.71864H68.7623Z"
                    fill="currentColor"
                  />{" "}
                  <path
                    d="M90.2187 13.219C88.8048 14.6191 86.9448 15.3192 84.6387 15.3192C82.3326 15.3192 80.4726 14.6191 79.0587 13.219C77.6448 11.8463 76.9379 9.99318 76.9379 7.65961C76.9379 5.33976 77.6448 3.47977 79.0587 2.07962C80.4863 0.693208 82.3463 0 84.6387 0C86.9311 0 88.7911 0.693208 90.2187 2.07962C91.6325 3.47977 92.3395 5.33976 92.3395 7.65961C92.3395 9.99318 91.6325 11.8463 90.2187 13.219ZM82.1473 10.6658C82.765 11.3933 83.5954 11.7571 84.6387 11.7571C85.6819 11.7571 86.5124 11.3933 87.1301 10.6658C87.7478 9.952 88.0567 8.94994 88.0567 7.65961C88.0567 6.39673 87.7478 5.40153 87.1301 4.67401C86.5124 3.93276 85.6819 3.56213 84.6387 3.56213C83.5954 3.56213 82.765 3.93276 82.1473 4.67401C81.5295 5.40153 81.2207 6.39673 81.2207 7.65961C81.2207 8.94994 81.5295 9.952 82.1473 10.6658Z"
                    fill="currentColor"
                  />{" "}
                  <path
                    d="M92.3356 0.329446H105.102V3.99453H100.778V14.9898H96.6596V3.99453H92.3356V0.329446Z"
                    fill="currentColor"
                  />{" "}
                  <path
                    d="M105.707 0.329446H118.473V3.99453H114.149V14.9898H110.031V3.99453H105.707V0.329446Z"
                    fill="currentColor"
                  />{" "}
                  <path
                    d="M131.273 0.329446V3.99453H123.82V5.93002H130.614V9.34801H123.82V11.3247H131.273V14.9898H119.701V0.329446H131.273Z"
                    fill="currentColor"
                  />{" "}
                  <path
                    d="M142.18 2.71793V0.329446H146.092V14.9898H141.748L138.639 9.78041C137.801 8.36654 137.129 7.15858 136.621 6.15651C136.69 8.17437 136.724 10.3226 136.724 12.6013V14.9898H132.812V0.329446H137.156L140.265 5.5388C141.007 6.80168 141.679 8.01651 142.283 9.18329C142.215 7.16544 142.18 5.01032 142.18 2.71793Z"
                    fill="currentColor"
                  />
                </svg>{" "}
                <p>
                  Brought to you by the{" "}
                  <span className="underline">Fort Gotten</span> Team 🏕️
                </p>
              </a>
            </div>
          </div>
        </div>
        {show && (
          <div
            data-v-098e79de
            className={`${
              show ? "" : "hidden"
            }fixed  backdrop-filter backdrop-blur-sm bg-backdrop flex items-center justify-center overflow-auto z-50 inset-0`}
          >
            <div
              data-v-098e79de
              className="relative bg-white dark:bg-blue-darkest rounded-xl shadow-xl px-7 sm:px-10 md:px-16 py-10 max-w-2xl w-11/12 md:w-full"
            >
              <div data-v-098e79de className="text-center">
                <h1
                  data-v-098e79de
                  className="text-blue-dark dark:text-gray-lightest flex font-bold flex-col items-center text-2xl mb-5"
                >
                  <div
                    data-v-098e79de
                    className="w-auto p-2.5 rounded-2xl bg-blue-gradient mb-4"
                  >
                    <svg
                      data-v-098e79de
                      width={36}
                      height={36}
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="filter drop-shadow-dark"
                    >
                      <path
                        data-v-098e79de
                        d="M22.3396 18.0001H20.1696V11.0991L11.8309 9.43137C11.4611 9.3574 11.0848 9.32014 10.7076 9.32014C7.54414 9.32014 4.97965 11.8846 4.97965 15.0481V20.1701H0.639648V15.0481C0.639648 9.48771 5.14722 4.98014 10.7076 4.98014C11.3706 4.98014 12.032 5.04563 12.6821 5.17565L20.1696 6.67316V0.640137H22.3396L31.0196 9.32014L22.3396 18.0001Z"
                        fill="#F7F0EA"
                      />{" "}
                      <path
                        data-v-098e79de
                        d="M35.3596 15.8301V20.9522C35.3596 26.5126 30.8521 31.0201 25.2917 31.0201C24.6287 31.0201 23.9673 30.9546 23.3172 30.8246L15.8296 29.3271V35.3601H13.6596L4.97965 26.6801L13.6596 18.0001H15.8296V24.9012L24.1684 26.5689C24.5382 26.6429 24.9145 26.6801 25.2917 26.6801C28.4552 26.6801 31.0196 24.1156 31.0196 20.9522V15.8301H35.3596Z"
                        fill="#F7F0EA"
                      />
                    </svg>
                  </div>
                  Open a New Trading Tent
                </h1>{" "}
                <button
                  data-v-098e79de
                  type="button"
                  onClick={PopupClose}
                  className="absolute text-2xl px-2.5 text-gray-dark dark:text-gray-lightest top-3 right-3 hover:opacity-100 opacity-70"
                >
                  <i data-v-098e79de className="fas fa-times" />
                </button>{" "}
                <p
                  data-v-098e79de
                  className="text-lg font-medium text-black dark:text-gray-regular leading-150 mb-5"
                >
                  You can create a private Tent by protecting it with a password
                  (optional)
                </p>{" "}
                <div data-v-098e79de className="mb-5">
                  <label
                    data-v-098e79de
                    className="relative w-full flex flex-col"
                  >
                    <input
                      id="create_tent_password"
                      data-v-098e79de
                      type="text"
                      placeholder="Enter password"
                      className="w-full dark:bg-gray-charcoal dark:text-gray-regular focus:outline-none focus:ring-2 focus:ring-blue-meta focus:ring-opacity-50 text-base rounded-lg leading-150 font-light border py-1.5 px-3 box-border border-gray-light dark:border-black-almost"
                    />
                  </label>
                </div>{" "}
                <div id="allDivPopup">
                  <div
                    data-v-098e79de
                    className="flex justify-center items-center mb-5"
                  >
                    <button
                      data-v-098e79de
                      type="button"
                      onClick={(e) => {
                        console.log(
                          e.target
                            .querySelector("i")
                            .classList.toggle("rotateIcon1")
                        );
                        document
                          .getElementById("allDivPopup")
                          .childNodes[1].classList.toggle("hidden");
                      }}
                      className="text-lg box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow-100 border-2 border-[#FFB23C] text-blue-dark dark:text-yellow-200 py-1 px-4"
                    >
                      Advanced mode
                      <i
                        data-v-098e79de
                        className="fas  fa-angle-left transition-transform duration-150 ease-in-out transform ml-1.5"
                      />
                    </button>
                  </div>
                  <div
                    data-v-098e79de
                    className="mb-5 transition-all duration-150 ease-in-out hidden"
                  >
                    <p
                      data-v-098e79de
                      className="text-lg font-medium text-black dark:text-gray-regular leading-150 mb-5"
                    >
                      You can limit trading inside the Tent to a set of specific
                      policy IDs (up to 5).
                      <span
                        data-v-098e79de
                        className="text-sm block opacity-70"
                      >
                        Note: The Policy IDs cannot be modified once inside the
                        Tent.
                      </span>
                    </p>{" "}
                    <div data-v-098e79de className="w-full flex relative mb-3">
                      <label
                        data-v-098e79de
                        className="relative w-full flex flex-col"
                      >
                        <input
                          data-v-098e79de
                          type="text"
                          placeholder="Enter Policy ID"
                          className="w-full dark:bg-gray-charcoal dark:text-gray-regular focus:outline-none focus:ring-2 focus:ring-blue-meta focus:ring-opacity-50 text-sm rounded-lg leading-150 font-light border py-1.5 px-3 box-border border-gray-light dark:border-black-almost"
                        />
                      </label>{" "}
                      <button
                        data-v-098e79de
                        type="button"
                        className="p-2 text-sm bg-green-400 text-white dark:text-blue-darkest hover:bg-green-500 ml-2 rounded-lg"
                        style={{ width: "35px", height: "34px" }}
                      >
                        <i data-v-098e79de className="fas fa-plus" />
                      </button>
                    </div>{" "}
                    <div data-v-098e79de className="w-full flex relative">
                      <ul
                        data-v-098e79de
                        className="font-mono w-full text-gray-dark dark:text-gray-lightest py-1 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div data-v-098e79de className="flex justify-between gap-3">
                <button
                  data-v-098e79de
                  className="w-full text-lg leading-150 box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-yellow text-blue-dark dark:text-yellow py-1 px-4 font-bold"
                >
                  Cancel
                </button>{" "}
                <button
                  data-v-098e79de
                  type="button"
                  onClick={tent_creating}
                  className="w-full box-border border-2 border-transparent leading-150 text-lg rounded-lg py-1 px-4 font-bold bg-yellow hover:bg-opacity-80 text-blue-dark"
                >
                  {/**/}
                  Open Tent
                </button>
              </div>
            </div>
          </div>
        )}
        {model && (
          <div
            data-v-098e79de
            className={`${
              model ? "" : "hidden"
            }fixed  backdrop-filter backdrop-blur-sm bg-backdrop flex items-center justify-center overflow-auto z-50 inset-0`}
          >
            <div
              data-v-098e79de
              className="relative bg-white dark:bg-blue-darkest rounded-xl shadow-xl px-7 sm:px-10 md:px-20 py-10 max-w-xl w-11/12 md:w-full"
            >
              <div data-v-098e79de className="text-center">
                <h1
                  data-v-098e79de
                  className="text-blue-dark dark:text-gray-lightest flex font-bold flex-col items-center text-2xl mb-5"
                >
                  <div
                    data-v-098e79de
                    className="w-auto p-2.5 rounded-2xl bg-blue-gradient mb-4"
                  >
                    <svg
                      data-v-098e79de
                      width={36}
                      height={36}
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="filter drop-shadow-dark"
                    >
                      <path
                        data-v-098e79de
                        d="M22.3396 18.0001H20.1696V11.0991L11.8309 9.43137C11.4611 9.3574 11.0848 9.32014 10.7076 9.32014C7.54414 9.32014 4.97965 11.8846 4.97965 15.0481V20.1701H0.639648V15.0481C0.639648 9.48771 5.14722 4.98014 10.7076 4.98014C11.3706 4.98014 12.032 5.04563 12.6821 5.17565L20.1696 6.67316V0.640137H22.3396L31.0196 9.32014L22.3396 18.0001Z"
                        fill="#F7F0EA"
                      />{" "}
                      <path
                        data-v-098e79de
                        d="M35.3596 15.8301V20.9522C35.3596 26.5126 30.8521 31.0201 25.2917 31.0201C24.6287 31.0201 23.9673 30.9546 23.3172 30.8246L15.8296 29.3271V35.3601H13.6596L4.97965 26.6801L13.6596 18.0001H15.8296V24.9012L24.1684 26.5689C24.5382 26.6429 24.9145 26.6801 25.2917 26.6801C28.4552 26.6801 31.0196 24.1156 31.0196 20.9522V15.8301H35.3596Z"
                        fill="#F7F0EA"
                      />
                    </svg>
                  </div>
                  Join a Trading Tent
                </h1>{" "}
                <button
                  data-v-098e79de
                  type="button"
                  onClick={joinTentClose}
                  className="absolute text-2xl px-2.5 text-gray-dark dark:text-gray-lightest top-3 right-3 hover:opacity-100 opacity-70"
                >
                  <i data-v-098e79de className="fas fa-times" />
                </button>{" "}
                <p
                  data-v-098e79de
                  className="text-lg font-medium text-black dark:text-gray-regular leading-150 mb-5"
                >
                  Join a Tent by entering the ID and password (if your partner
                  has set one)
                </p>{" "}
                <div data-v-098e79de className="mb-5">
                  <label
                    data-v-098e79de
                    className="relative w-full flex flex-col"
                  >
                    <input
                      data-v-098e79de
                      id="join_tent_id"
                      type="text"
                      placeholder="TENT-xxxxxxxx-xxxxx"
                      className="w-full dark:bg-gray-charcoal dark:text-gray-regular focus:outline-none focus:ring-2 focus:ring-blue-meta focus:ring-opacity-50 text-base rounded-lg leading-150 font-light border py-1.5 px-3 box-border border-gray-light dark:border-black-almost"
                    />
                    <p id="join_warn">Please Enter tent Id To Join</p>
                  </label>
                </div>{" "}
                <div data-v-098e79de className="mb-5">
                  <label
                    data-v-098e79de
                    className="relative w-full flex flex-col"
                  >
                    <input
                      data-v-098e79de
                      id="join_tent_password"
                      type="text"
                      placeholder="Enter password (optional)"
                      className="w-full dark:bg-gray-charcoal dark:text-gray-regular focus:outline-none focus:ring-2 focus:ring-blue-meta focus:ring-opacity-50 text-base rounded-lg leading-150 font-light border py-1.5 px-3 box-border border-gray-light dark:border-black-almost"
                    />
                  </label>
                </div>{" "}
                {/**/}
              </div>{" "}
              <div data-v-098e79de className="flex justify-between gap-3">
                <button
                  data-v-098e79de
                  className="w-full text-lg leading-150 box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-yellow text-blue-dark dark:text-yellow py-1 px-4 font-bold"
                >
                  Cancel
                </button>{" "}
                <button
                  data-v-098e79de
                  type="button"
                  onClick={join_tent_process}
                  className="w-full box-border border-2 border-transparent leading-150 text-lg rounded-lg py-1 px-4 font-bold bg-yellow hover:bg-opacity-80 text-blue-dark"
                >
                  {/**/}
                  Enter the Tent
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
