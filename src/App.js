import { Routes, Route, useNavigate } from "react-router";
import "./App.css";
import StartaTrade from "./components/startatrade";
import ConnectedWallet from "./components/connectedwallet";
import Dashboard from "./components/dashboard";
import NewTentOpen from "./components/newtentopen";
import SelectAssets from "./components/selectassets";
import socketIOClient from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import Leavethetent from "./components/leavethetent";
import axios from "axios";
import { useEffect, useState } from "react";
const ENDPOINT = "https://api.tradingtents.io";
const socket = socketIOClient(ENDPOINT, { secure: true });

function App() {
  const navigate = useNavigate();
  const [key, setKey] = useState(localStorage.getItem("OwnerPublicKey"));
  const [isSolNft, setIsSolNft] = useState([]);
  const solanaWalletNft = async () => {
    try {
      const { solana } = window;
      if (solana) {
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
            wallet: key,
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
            setIsSolNft(response.data.result.assets);
          })
          .catch((err) => {
            console.log(err);
          });
     
    
      }
    } catch (err) {
      console.log(err);
      toast.error("User decline the request");
    }
  };
  useEffect(() => {
    solanaWalletNft();
  }, []);
  return (
    <>
      <ToastContainer theme="colored" />
      <Routes>
        <Route exact path="/" element={<StartaTrade />} />
        <Route
          exact
          path="/connectedwallet/:wallet"
          element={<ConnectedWallet />}
        />
        <Route
          exact
          path="/dashboard/:wallet"
          element={<Dashboard socket={socket} />}
        />
        <Route exact path="/newtent/:tentid" element={<NewTentOpen />} />
        <Route
          exact
          path="/selectassets/:tentid"
          element={<SelectAssets socket={socket} nftItems={isSolNft} />}
        />
        <Route exact path="/leavethetent" element={<Leavethetent />} />
      </Routes>
    </>
  );
}

export default App;
