import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/selectassets.css";
import $ from "jquery";

import {
  Address,
  MultiAsset,
  Assets,
  ScriptHash,
  AssetName,
  TransactionUnspentOutput,
  TransactionUnspentOutputs,
  Value,
  TransactionBuilder,
  TransactionOutput,
  TransactionBuilderConfigBuilder,
  TransactionOutputBuilder,
  LinearFee,
  BigNum,
  TransactionWitnessSet,
  Transaction,
} from "@emurgo/cardano-serialization-lib-asmjs";
import NewProcessTent from "./newprocesstent";
let Buffer = require("buffer/").Buffer;
const fetchPromise = import("node-fetch").then((mod) => mod.default);
const fetch = (...args) => fetchPromise.then((fetch) => fetch(...args));

export default class SelectAssets extends React.Component {
  constructor({ socket, io }) {
    super({ socket, io });

    this.state = {
      step: 1,
      newLoader: false,
      show: false,
      tradeShow: false,
      modalShow: false,
      whichWalletSelected: undefined,
      walletFound: false,
      walletIsEnabled: false,
      walletName: undefined,
      walletIcon: undefined,
      walletAPIVersion: undefined,
      wallets: [],
      loaded: false,

      selected_assest: [],
      isnftselected: false,
      select_ada: 0,
      tentId: "",

      opp_assest: [],
      isnftoppselected: false,
      opp_ada: 0,

      isnftconformed: false,
      popupamount: false,

      oppsocketid: undefined,

      networkId: undefined,
      Utxos: undefined,
      CollatUtxos: undefined,
      balance: undefined,
      changeAddress: undefined,
      rewardAddress: undefined,
      usedAddress: undefined,

      txBody: undefined,
      intialtransaction: "",
      submittedTxHash: "",

      addressBech32SendADA:
        "addr1qy6wm7zhuh90j0af459jrsqug2mx0awjj0n5g9smhncga0v3nayngzcnglzt75546mx3gqpqqks75ntzjaqgwfkkrr6qprzg2c",
      comison: 5000000,

      varified: true,
      unverified: [],
      verify: [],
      nft: [],
    };

    this.socket = socket;
    this.io = io;
    this.socket.on("adaselected", (value) => this.oppada(value));
    this.socket.on("oppchangemymindnft", (value) =>
      this.oppchangemymindnft(value)
    );
    this.socket.on("oppchangemymindada", (value) =>
      this.oppchangemymindada(value)
    );
    this.socket.on("assestsselected", (value) => this.oppnft(value));
    this.socket.on("updateinfo", (value) => this.updateinfo(value));
    this.socket.on("oppsocketid", (value) => this.handleMessage(value));
    this.socket.on("disconnect", () => this.disconnect());
    this.socket.on("connect_error", (err) => {});

    this.API = undefined;

    this.protocolParams = {
      linearFee: {
        minFeeA: "",
        minFeeB: "",
      },
      minUtxo: "",
      poolDeposit: "",
      keyDeposit: "",
      maxValSize: undefined,
      maxTxSize: undefined,
      priceMem: undefined,
      priceStep: undefined,
      coinsPerUtxoWord: "",
      slot: undefined,
    };

    this.pollWallets = this.pollWallets.bind(this);
  }

  pollWallets = (count = 0) => {
    const wallets = [];
    for (const key in window.cardano) {
      if (window.cardano[key].enable && wallets.indexOf(key) === -1) {
        wallets.push(key);
      }
    }
    if (wallets.length === 0 && count < 3) {
      setTimeout(() => {
        this.pollWallets(count + 1);
      }, 1000);
      return;
    }
    this.setState(
      {
        wallets,
        whichWalletSelected: JSON.parse(localStorage.getItem("wallet")).wallet,
      },
      () => {
        this.refreshData();
      }
    );
  };

  // =====================================================
  oppnft = (nft) => {
    toast.success("Patner Patner Has updated their selected assets.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.setState({ opp_assest: nft.data });
    this.setState({ isnftoppselected: true });
  };

  // =====================================================
  oppada = (ada) => {
    toast.success(
      "Patner Patner Has updated their ADA amount for this trade.",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    this.setState({ opp_ada: ada.data });
  };

  //==================================================

  changemymindnft = () => {
    for (let i = 0; i < this.state.verify.length; i++) {
      this.state.verify[i].selected = false;
    }

    for (let i = 0; i < this.state.unverified.length; i++) {
      this.state.unverified[i].selected = false;
    }

    if (this.state.varified) {
      this.setState({ verify: this.state.verify });
    } else {
      this.setState({ unverified: this.state.unverified });
    }

    this.setState({ selected_assest: [] });
    this.setState({ isnftselected: false });
    this.socket.emit("changemymindnft", {
      socket: this.state.oppsocketid,
    });
  };

  //==================================================

  changemymindada = () => {
    this.setState({ select_ada: 0 });
    this.socket.emit("changemymindada", {
      socket: this.state.oppsocketid,
    });
  };

  // =======================================================

  oppchangemymindnft = () => {
    toast.warning("Patner Has Change There mind in assest.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.setState({ isnftoppselected: false });
    this.setState({ opp_assest: [] });
  };

  // =======================================================

  oppchangemymindada = () => {
    toast.warning("Patner Has Change There mind in ADA.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.setState({ opp_ada: 0 });
  };

  // =====================================================
  updateinfo = (info) => {
    this.setState({ oppsocketid: info.socket });
  };

  // =============================================================
  handleMessage = (evt) => {
    console.log(evt);
  };

  _blockfrostRequest = async (
    endpoint,
    networkId = 1,
    method = "GET",
    headers = {},
    body
  ) => {
    let networkEndpoint =
      networkId === 0
        ? "https://api.tradingtents.io"
        : "https://cardano-mainnet.blockfrost.io/api/v0/";
    let blockfrostApiKey = "mainneteD12sj9JmiRAWqneePXamcyHAEX2mdaS";

    try {
      return await (
        await fetch(`${networkEndpoint}${endpoint}`, {
          headers: {
            project_id: blockfrostApiKey,
            ...headers,
          },
          method: method,
          body,
        })
      ).json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  setprotocolparmeter = async () => {
    let result = await this._blockfrostRequest(`/blocks/latest`, 1, "GET");
    let p = await this._blockfrostRequest(
      `/epochs/` + result.epoch + `/parameters`,
      1,
      "GET"
    );
    this.protocolParams.linearFee.minFeeA = p.min_fee_a.toString();
    this.protocolParams.linearFee.minFeeB = p.min_fee_b.toString();
    this.protocolParams.minUtxo = p.min_utxo;
    this.protocolParams.poolDeposit = p.pool_deposit;
    this.protocolParams.keyDeposit = p.key_deposit;
    this.protocolParams.maxValSize = parseInt(p.max_val_size);
    this.protocolParams.maxTxSize = p.max_tx_size;
    this.protocolParams.priceMem = p.price_mem;
    this.protocolParams.priceStep = p.price_step;
    this.protocolParams.coinsPerUtxoWord = p.coins_per_utxo_word;
    this.protocolParams.slot = result.slot;
  };

  // =================================================== ada change
  adachange = (evt) => {
    this.setState({ select_ada: evt.target.value * 1000000 });
  };

  // ----------------------------------------------- getTxUnspentOutputs ------------------------------------------------------------------------------

  getTxUnspentOutputs = async () => {
    let txOutputs = TransactionUnspentOutputs.new();
    for (const utxo of this.state.Utxos) {
      txOutputs.add(utxo.TransactionUnspentOutput);
    }
    return txOutputs;
  };

  // ----------------------------------------------- buildSendTokenTransaction ------------------------------------------------------------------------------

  buildSendTokenTransaction = async () => {
    if (this.state.selected_assest.length == 0) {
      return;
    }

    try {
      const txBuilder = await this.initTransactionBuilder();
      const shelleyOutputAddress = Address.from_bech32(
        this.state.addressBech32SendADA
      );
      const shelleyChangeAddress = Address.from_bech32(
        this.state.changeAddress
      );

      let txOutputBuilder = TransactionOutputBuilder.new();
      txOutputBuilder = txOutputBuilder.with_address(shelleyOutputAddress);
      txOutputBuilder = txOutputBuilder.next();

      let multiAsset = MultiAsset.new();
      this.state.selected_assest.map((nft, i) => {
        let assets = Assets.new();
        assets.insert(
          AssetName.new(Buffer.from(nft.assest_name, "hex")),
          BigNum.from_str(nft.amount.toString())
        );
        multiAsset.insert(
          ScriptHash.from_bytes(Buffer.from(nft.policy_id, "hex")),
          assets
        );
      });
      txOutputBuilder = txOutputBuilder.with_asset_and_min_required_coin(
        multiAsset,
        BigNum.from_str(this.protocolParams.coinsPerUtxoWord)
      );
      const txOutput = txOutputBuilder.build();

      txBuilder.add_output(txOutput);

      txBuilder.add_output(
        TransactionOutput.new(
          shelleyOutputAddress,
          Value.new(
            BigNum.from_str(
              (this.state.comison + this.state.select_ada).toString()
            )
          )
        )
      );
      const txUnspentOutputs = await this.getTxUnspentOutputs();
      txBuilder.add_inputs_from(txUnspentOutputs, 3);
      txBuilder.set_ttl(3600 + this.protocolParams.slot);
      txBuilder.add_change_if_needed(shelleyChangeAddress);
      const txBody = txBuilder.build();
      this.setState({ intialtransaction: txBody });

      toast.success("🤖 Transcation Crafted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      this.setState({ modalShow: true });
    } catch (error) {
      if (error === "UTxO Balance Insufficient") {
        toast.error("Insufficient balance transaction", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  // =======================================================submittedTxHash=================================================

  submitbuildtranstion = async () => {
    const transactionWitnessSet = TransactionWitnessSet.new();
    const tx = Transaction.new(
      this.state.intialtransaction,
      TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes())
    );
    let txVkeyWitnesses = await this.API.signTx(
      Buffer.from(tx.to_bytes(), "utf8").toString("hex"),
      true
    );
    txVkeyWitnesses = TransactionWitnessSet.from_bytes(
      Buffer.from(txVkeyWitnesses, "hex")
    );

    transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());

    const signedTx = Transaction.new(
      tx.body(),
      transactionWitnessSet,
      undefined
    );

    const submittedTxHash = await this.API.submitTx(
      Buffer.from(signedTx.to_bytes(), "utf8").toString("hex")
    );
    console.log(submittedTxHash);

    alert("Your Sign Hash" + submittedTxHash);
  };

  // ================================================== popup close============================================================

  popup_close = () => {
    $(".modal-wrapper").removeClass("open");
  };

  // ----------------------------------------------- refreshdata ------------------------------------------------------------------------------

  refreshData = async () => {
    try {
      const walletFound = this.checkIfWalletFound();
      if (walletFound) {
        await this.getAPIVersion();
        await this.getWalletName();
        const walletEnabled = await this.enableWallet();
        if (walletEnabled) {
          await this.getNetworkId();
          await this.getUtxos();
          await this.getCollateral();
          await this.getBalance();
          await this.getChangeAddress();
          await this.getRewardAddresses();
          await this.getUsedAddresses();
        } else {
          await this.setState({
            Utxos: null,
            CollatUtxos: null,
            balance: null,
            changeAddress: null,
            rewardAddress: null,
            usedAddress: null,

            txBody: null,
            txBodyCborHex_unsigned: "",
            txBodyCborHex_signed: "",
            submittedTxHash: "",
          });
        }
      } else {
        await this.setState({
          walletIsEnabled: false,

          Utxos: null,
          CollatUtxos: null,
          balance: null,
          changeAddress: null,
          rewardAddress: null,
          usedAddress: null,

          txBody: null,
          txBodyCborHex_unsigned: "",
          txBodyCborHex_signed: "",
          submittedTxHash: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // -----------------------------------------------popup----------------------------------------------------------------------------------

  popup_open = (x) => {
    $(".modal-wrapper").addClass("open");
    $("#varified_status_popup").addClass("text-[red]");
    $("#image_popup").attr("src", x.image);
    $("#fingerprint_popup").text(x.fingerprint);
    $("#policyid_popup").text(x.policy_id);
    $("#name_popup").text(x.name);
    $(".cardanoscan").attr(
      "href",
      "https://cardanoscan.io/token/" + x.fingerprint
    );
    $(".poolpm").attr("href", "https://pool.pm/" + x.fingerprint);
    if (x.verified == true) {
      $("#varified_status_popup").removeClass("text-[red]");
      $("#varified_status_popup").html(
        '<i data-v-37376aa6="" class="far fa-check-circle text-blue-meta"></i>' +
          x.tentname
      );
    } else {
      $("#varified_status_popup").text("unverified");
    }
  };

  // -----------------------------------------------getBalance------------------------------------------------------------------------------

  getBalance = async () => {
    try {
      const balanceCBORHex = await this.API.getBalance();
      const balance = Value.from_bytes(Buffer.from(balanceCBORHex, "hex"))
        .coin()
        .to_str();
      this.setState({ balance });
    } catch (err) {
      console.log(err);
    }
  };

  // -----------------------------------------------getChangeAddress------------------------------------------------------------------------------

  getChangeAddress = async () => {
    try {
      const raw = await this.API.getChangeAddress();
      const changeAddress = Address.from_bytes(
        Buffer.from(raw, "hex")
      ).to_bech32();
      this.setState({ changeAddress });
    } catch (err) {
      console.log(err);
    }
  };

  // -----------------------------------------------getRewardAddresses------------------------------------------------------------------------------

  getRewardAddresses = async () => {
    try {
      const raw = await this.API.getRewardAddresses();
      const rawFirst = raw[0];
      const rewardAddress = Address.from_bytes(
        Buffer.from(rawFirst, "hex")
      ).to_bech32();
      this.setState({ rewardAddress });
    } catch (err) {
      console.log(err);
    }
  };

  // -----------------------------------------------getUsedAddresses------------------------------------------------------------------------------

  getUsedAddresses = async () => {
    try {
      const raw = await this.API.getUsedAddresses();
      const rawFirst = raw[0];
      const usedAddress = Address.from_bytes(
        Buffer.from(rawFirst, "hex")
      ).to_bech32();
      this.getAssest_Nattivetoken(usedAddress);
      this.setState({ usedAddress });
    } catch (err) {
      console.log(err);
    }
  };

  // -----------------------------------------------getCollateral------------------------------------------------------------------------------

  getCollateral = async () => {
    let CollatUtxos = [];

    try {
      let collateral = [];

      const wallet = this.state.whichWalletSelected;
      if (wallet === "nami") {
        collateral = await this.API.experimental.getCollateral();
      } else {
        collateral = await this.API.getCollateral();
      }

      for (const x of collateral) {
        const utxo = TransactionUnspentOutput.from_bytes(Buffer.from(x, "hex"));
        CollatUtxos.push(utxo);
        // console.log(utxo)
      }
      this.setState({ CollatUtxos });
    } catch (err) {
      console.log(err);
    }
  };

  // ----------------------------------------------- get UTXO ------------------------------------------------------------------------------

  getUtxos = async () => {
    let Utxos = [];

    try {
      const rawUtxos = await this.API.getUtxos();

      for (const rawUtxo of rawUtxos) {
        const utxo = TransactionUnspentOutput.from_bytes(
          Buffer.from(rawUtxo, "hex")
        );
        const input = utxo.input();
        const txid = Buffer.from(
          input.transaction_id().to_bytes(),
          "utf8"
        ).toString("hex");
        const txindx = input.index();
        const output = utxo.output();
        const amount = output.amount().coin().to_str();
        const multiasset = output.amount().multiasset();
        let multiAssetStr = "";

        if (multiasset) {
          const keys = multiasset.keys();
          const N = keys.len();

          for (let i = 0; i < N; i++) {
            const policyId = keys.get(i);
            const policyIdHex = Buffer.from(
              policyId.to_bytes(),
              "utf8"
            ).toString("hex");
            const assets = multiasset.get(policyId);
            const assetNames = assets.keys();
            const K = assetNames.len();

            for (let j = 0; j < K; j++) {
              const assetName = assetNames.get(j);
              const assetNameString = Buffer.from(
                assetName.name(),
                "utf8"
              ).toString();
              const assetNameHex = Buffer.from(
                assetName.name(),
                "utf8"
              ).toString("hex");
              const multiassetAmt = multiasset.get_asset(policyId, assetName);
              multiAssetStr += `+ ${multiassetAmt.to_str()} + ${policyIdHex}.${assetNameHex} (${assetNameString})`;
            }
          }
        }

        const obj = {
          txid: txid,
          txindx: txindx,
          amount: amount,
          str: `${txid} #${txindx} = ${amount}`,
          multiAssetStr: multiAssetStr,
          TransactionUnspentOutput: utxo,
        };
        Utxos.push(obj);
      }
      this.setState({ Utxos });
    } catch (err) {
      console.log(err);
    }
  };

  // -----------------------------------------------checkIfWalletEnabled ------------------------------------------------------------------------------

  checkIfWalletEnabled = async () => {
    let walletIsEnabled = false;

    try {
      const walletName = this.state.whichWalletSelected;
      walletIsEnabled = await window.cardano[walletName].isEnabled();
    } catch (err) {
      console.log(err);
    }
    this.setState({ walletIsEnabled });

    return walletIsEnabled;
  };

  // -----------------------------------------------checkIfWalletEnabled ------------------------------------------------------------------------------

  getAssest_Nattivetoken = async (addr) => {
    let nft = await this._blockfrostRequest(`/getmetadata/` + addr, 0, `GET`);
    this.state.verify = [];
    this.state.unverified = [];

    nft.forEach((element) => {
      if (element.verified) {
        this.state.verify.push(element);
      }
      this.state.unverified.push(element);
    });

    this.setState({ nft: this.state.verify });
    this.setState({ loaded: true });
  };

  // -----------------------------------------------enableWallet ------------------------------------------------------------------------------

  enableWallet = async () => {
    const walletKey = this.state.whichWalletSelected;
    try {
      this.API = await window.cardano[walletKey].enable();
    } catch (err) {
      console.log(err);
    }
    return this.checkIfWalletEnabled();
  };

  // -----------------------------------------------getNetworkId ------------------------------------------------------------------------------
  getNetworkId = async () => {
    try {
      const networkId = await this.API.getNetworkId();
      this.setState({ networkId });
    } catch (err) {
      console.log(err);
    }
  };

  // =====================================================token popup==================================================================

  downloadpopup = async (nft) => {
    console.log(nft);
    $(".modal-amount").removeClass("hidden");
    $("#popupnftname").text(nft.name);
    $("#popupnftquantity").text(nft.quantity);

    return new Promise((resolve, reject) => {
      // $('#popupdone').click(function(){
      document.getElementById("popupdone").addEventListener(
        "click",
        function (e) {
          let amount = $("#popupamountdone").val();
          if (amount === 0) {
            resolve({ foo: false });
          } else {
            resolve({ foo: true, amount: amount });
          }
          $(".modal-amount").addClass("hidden");
        },
        { once: true }
      );

      // $('#popupcancelicon').click(function(){
      document.getElementById("popupcancelicon").addEventListener(
        "click",
        function (e) {
          $(".modal-amount").addClass("hidden");
          resolve({ foo: false });
        },
        { once: true }
      );

      // $('#popupcancel').click(function(){
      document.getElementById("popupcancel").addEventListener(
        "click",
        function (e) {
          $(".modal-amount").addClass("hidden");
          resolve({ foo: false });
        },
        { once: true }
      );
    });
  };

  // ---------------------------------------------------SelectAssets=============================================================================

  selectnft = async (nft) => {
    if (nft.quantity > 1) {
      let foo = await this.downloadpopup(nft);
      if (!foo.foo) {
        console.log(foo);
        return;
      }
      nft.amount = foo.amount;
    }

    nft.selected = true;
    this.state.selected_assest.push(nft);
    this.setState({ selected_assest: this.state.selected_assest });

    this.state.unverified[nft.itemno] = nft;

    if (nft.verified) {
      for (let i = 0; i < this.state.verify.length; i++) {
        if (this.state.verify[i].itemno === nft.itemno) {
          this.state.verify[i] = nft;
          break;
        }
      }
    }

    if (this.state.varified) {
      this.setState({ nft: this.state.verify });
    } else {
      this.setState({ nft: this.state.unverified });
    }

    this.setState({ isnftselected: true });
  };

  // ---------------------------------------------------SelectAssets=============================================================================

  deselectnft = (nft) => {
    let index = 0;
    if (nft.quantity > 1) {
      for (let i = 0; i < this.state.selected_assest.length; i++) {
        if (this.state.selected_assest[i].itemno === nft.itemno) {
          index = i;
          break;
        }
      }
    } else {
      index = this.state.selected_assest.indexOf(nft);
    }

    nft.selected = false;
    this.state.unverified[nft.itemno] = nft;

    if (nft.verified) {
      for (let i = 0; i < this.state.verify.length; i++) {
        if (this.state.verify[i].itemno === nft.itemno) {
          this.state.verify[i] = nft;
          break;
        }
      }
    }

    this.state.selected_assest.splice(index, 1);
    this.setState({ selected_assest: this.state.selected_assest });

    if (this.state.varified) {
      this.setState({ nft: this.state.verify });
    } else {
      this.setState({ nft: this.state.unverified });
    }

    if (this.state.selected_assest.length == 0) {
      this.setState({ isnftselected: false });
    } else {
      this.setState({ isnftselected: true });
    }
  };

  // -----------------------------------------------getwalletname ------------------------------------------------------------------------------

  getWalletName = () => {
    const walletKey = this.state.whichWalletSelected;
    const walletName = window?.cardano?.[walletKey].name;
    this.setState({ walletName });
    return walletName;
  };

  // -----------------------------------------------apiVersion ------------------------------------------------------------------------------

  getAPIVersion = () => {
    const walletKey = this.state.whichWalletSelected;
    const walletAPIVersion = window?.cardano?.[walletKey].apiVersion;
    this.setState({ walletAPIVersion });
    return walletAPIVersion;
  };

  // ----------------------------------------------- check if wallet ------------------------------------------------------------------------------

  checkIfWalletFound = () => {
    const walletKey = this.state.whichWalletSelected;
    const walletFound = !!window?.cardano?.[walletKey];
    this.setState({ walletFound });
    return walletFound;
  };

  // ----------------------------------------------- initTransactionBuilder ------------------------------------------------------------------------------

  initTransactionBuilder = async () => {
    const txBuilder = TransactionBuilder.new(
      TransactionBuilderConfigBuilder.new()
        .fee_algo(
          LinearFee.new(
            BigNum.from_str(this.protocolParams.linearFee.minFeeA),
            BigNum.from_str(this.protocolParams.linearFee.minFeeB)
          )
        )
        .pool_deposit(BigNum.from_str(this.protocolParams.poolDeposit))
        .key_deposit(BigNum.from_str(this.protocolParams.keyDeposit))
        .coins_per_utxo_word(
          BigNum.from_str(this.protocolParams.coinsPerUtxoWord)
        )
        .max_value_size(this.protocolParams.maxValSize)
        .max_tx_size(this.protocolParams.maxTxSize)
        .prefer_pure_change(true)
        .build()
    );

    return txBuilder;
  };

  //------------------------------------------------ change nft content --------------------------------------------------------------------------------------

  changeNFtcontente = () => {
    if (this.state.varified) {
      this.setState({ nft: this.state.unverified });
    } else {
      this.setState({ nft: this.state.verify });
    }

    this.setState({ varified: !this.state.varified });
    console.log(this.state.varified);
  };

  nftconformedfun = () => {
    if (this.state.selected_assest.length == 0) {
      toast.warning("Select Atleast One Assests");
    } else {
      this.socket.emit("updatenftclient", {
        nft: this.state.selected_assest,
        socket: this.state.oppsocketid,
      });
      this.nextStep();
    }
  };

  adaconformed = () => {
    this.socket.emit("updataada", {
      nft: this.state.select_ada,
      socket: this.state.oppsocketid,
    });
    this.nextStep();
  };

  tradClick = () => {
    this.setState({ tradeShow: true });
  };
  tradClose = () => {
    this.setState({ tradeShow: false });
  };
  modalClose = () => {
    this.setState({ modalShow: false });
  };
  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };
  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };
  // new load
  newLoad = () => {
    setTimeout(() => {
      const { newLoader } = this.state;
      this.setState({ newLoader: !newLoader });
    }, [1000]);
  };

  async componentDidMount() {
    this.socket.emit("getsocketid", {
      tentid: window.location.pathname.split("/")[2],
      socket: this.socket.id,
    });
    this.newLoad();
    this.setState({ tentId: window.location.pathname.split("/")[2].slice(5) });
    this.setprotocolparmeter();
    this.pollWallets();
    await this.refreshData();
    toast.success(
      JSON.parse(localStorage.getItem("wallet")).wallet + " Wallet Injected"
    );
  }

  render() {
    const { step, newLoader } = this.state;
    const { tentId } = this.state;
    switch (step) {
      case 1:
        return (
          <>
            <NewProcessTent step={step} tentId={tentId} />
            {newLoader ? (
              <div
                data-v-1f7394e8
                className="max-w-screen-xl mx-auto w-full pt-5 sm:px-6 lg:px-8"
                style={{ height: "calc(100vh - 377px)" }}
              >
                <div data-v-1f7394e8 className="trade-container flex flex-col">
                  {/**/}{" "}
                  <div
                    data-v-e27014a0
                    data-v-1f7394e8
                    id="asset-list"
                    className="flex relative bg-white dark:bg-blue-darkest rounded-2xl flex-col"
                    style={{ "min-height": "0px" }}
                  >
                    <div
                      data-v-e27014a0
                      className="grid grid-cols-2 py-2 px-2.5 mb-2 border-b border-gray-light dark:border-blue-darker"
                    >
                      <ul
                        data-v-e27014a0
                        className="flex w-full items-center text-lg"
                      >
                        <li
                          data-v-e27014a0
                          className="cursor-default rounded-lg leading-150  py-1 px-4 font-semibold mr-2.5 bg-blue-light text-white dark:text-blue-darkest"
                        >
                          1. Select Assets
                        </li>{" "}
                        <li
                          data-v-e27014a0
                          className="cursor-default rounded-lg leading-150 text-white py-1 px-4 font-semibold bg-gray-regular dark:bg-gray-darkest"
                        >
                          2. Select ADA
                        </li>{" "}
                        <li data-v-e27014a0 className="flex-grow items-end">
                          <div
                            data-v-e27014a0
                            className="flex mx-auto justify-between"
                            style={{ width: "142px" }}
                            onClick={() => {
                              this.changeNFtcontente();
                            }}
                          >
                            {this.state.varified ? (
                              <span
                                data-v-e27014a0
                                role="switch"
                                tabIndex={0}
                                aria-checked="true"
                                aria-readonly="false"
                                className="vue-toggles"
                                style={{
                                  width: "50px",
                                  height: "21px",
                                  background: "rgb(0, 118, 255)",
                                  opacity: "1",
                                  cursor: "pointer",
                                }}
                              >
                                <span
                                  aria-hidden="true"
                                  className="dot"
                                  style={{
                                    background: "rgb(255, 255, 255)",
                                    width: "13px",
                                    height: "13px",
                                    "min-width": "13px",
                                    "min-height": "13px",
                                    "margin-left": "32px",
                                  }}
                                >
                                  <span
                                    className="text"
                                    style={{
                                      "font-weight": "normal",
                                      "font-size": "12px",
                                      color: "rgb(255, 255, 255)",
                                      right: "18px",
                                      left: "auto",
                                      display: "none",
                                    }}
                                  ></span>{" "}
                                  <span
                                    className="text"
                                    style={{
                                      "font-weight": "normal",
                                      "font-size": "12px",
                                      color: "rgb(255, 255, 255)",
                                      right: "18px",
                                      left: "auto",
                                      display: "none",
                                    }}
                                  ></span>
                                </span>
                              </span>
                            ) : (
                              <span
                                data-v-e27014a0
                                role="switch"
                                tabIndex={0}
                                aria-checked="false"
                                aria-readonly="false"
                                className="vue-toggles"
                                style={{
                                  width: "50px",
                                  height: "21px",
                                  background: "rgb(147, 147, 147)",
                                  opacity: "1",
                                  cursor: "pointer",
                                }}
                              >
                                <span
                                  aria-hidden="true"
                                  className="dot"
                                  style={{
                                    background: "rgb(255, 255, 255)",
                                    width: "13px",
                                    height: "13px",
                                    "min-width": "13px",
                                    "min-height": "13px",
                                    "margin-left": "5px",
                                  }}
                                >
                                  <span
                                    className="text"
                                    style={{
                                      "font-weight": "normal",
                                      "font-size": "12px",
                                      color: "rgb(255, 255, 255)",
                                      right: "auto",
                                      left: "18px",
                                      display: "none",
                                    }}
                                  ></span>{" "}
                                  <span
                                    className="text"
                                    style={{
                                      "font-weight": "normal",
                                      "font-size": "12px",
                                      color: "rgb(255, 255, 255)",
                                      right: "auto",
                                      left: "18px",
                                      display: "none",
                                    }}
                                  ></span>
                                </span>
                              </span>
                            )}
                            <span
                              data-v-e27014a0
                              className="font-semibold text-sm text-blue-dark dark:text-gray-lightest cursor-pointer"
                            >
                              Only verified
                            </span>
                          </div>
                        </li>
                      </ul>{" "}
                      <div data-v-e27014a0>
                        <ul
                          data-v-e27014a0
                          className="flex w-full items-center justify-end text-lg"
                        >
                          <li data-v-e27014a0 className="mr-2.5 flex-grow">
                            <div data-v-e27014a0 className="relative">
                              <input
                                data-v-e27014a0
                                type="text"
                                placeholder="Search Assets.."
                                className="px-7 w-full focus:outline-none focus:ring-2 focus:ring-blue-meta focus:ring-opacity-50 dark:bg-gray-charcoal dark:text-gray-regular text-sm rounded-lg leading-150 font-light border py-1.5 box-border border-gray-light dark:border-black-almost"
                              />{" "}
                              <i
                                data-v-e27014a0
                                className="absolute text-base text-gray-dark fas fa-search left-1.5 top-2"
                              />{" "}
                              {/**/}
                            </div>
                          </li>{" "}
                          <li data-v-e27014a0>
                            <button
                              data-v-e27014a0
                              type="button"
                              onClick={() => {
                                this.nftconformedfun();
                              }}
                              className="rounded-lg bg-yellow hover:bg-opacity-80 text-blue-dark py-1 px-4 font-bold"
                            >
                              Confirm Assets
                              <i
                                data-v-e27014a0
                                className="fas fa-arrow-right ml-1.5"
                              />
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>{" "}
                    <div
                      data-v-e27014a0
                      className="flex-grow mb-3 px-2.5 pb-3 overflow-y-auto"
                    >
                      {this.props.nftItems != 0 ? (
                        <div
                          data-v-e27014a0
                          className="grid grid-cols-4 md:grid-cols-7 gap-4"
                        >
                          {this.props.nftItems.map((nfts, i) => (
                            <div data-v-e27014a0 className="w-full">
                              <div
                                data-v-e27014a0
                                className="group relative flex flex-col min-h-full w-full p-1.5 rounded-lg hover:border-blue-200 hover:bg-blue-50 border bg-gray-lightest dark:bg-blue-darker border-white dark:border-transparent"
                              >
                                <div
                                  data-v-e27014a0
                                  className="img-container w-full overflow-hidden relative"
                                >
                                  <img
                                    data-v-e27014a0
                                    data-src={nfts.image}
                                    data-loading="https://app.tradingtent.io/images/loading_mask.svg"
                                    data-error="https://app.tradingtent.io/images/loading_error.svg"
                                    alt=""
                                    className="absolute rounded-lg object-cover object-center w-full h-full"
                                    src={nfts.imageUrl}
                                    lazy="loaded"
                                  />
                                </div>{" "}
                                <div
                                  data-v-e27014a0
                                  className="absolute backdrop-filter rounded-lg backdrop-blur-sm bg-backdrop group-hover:block hidden inset-0"
                                >
                                  <div
                                    data-v-e27014a0
                                    className="flex h-full flex-col p-3 justify-center gap-5 items-center "
                                  >
                                    {nfts.selected ? (
                                      <button
                                        data-v-e27014a0
                                        type="button"
                                        className="bg-white text-gray-darker hover:bg-blue-meta hover:text-white text-sm font-medium rounded-lg py-1.5 px-3 w-full"
                                        onClick={() => this.deselectnft(nfts)}
                                      >
                                        Deselect Asset
                                      </button>
                                    ) : (
                                      <button
                                        data-v-e27014a0
                                        type="button"
                                        className="bg-white text-gray-darker hover:bg-blue-meta hover:text-white text-sm font-medium rounded-lg py-1.5 px-3 w-full"
                                        onClick={() => this.selectnft(nfts)}
                                      >
                                        Select Asset
                                      </button>
                                    )}
                                    <button
                                      data-v-e27014a0
                                      type="button"
                                      className="bg-white text-gray-darker hover:bg-blue-meta hover:text-white text-sm font-medium rounded-lg py-1.5 px-3 w-full"
                                      onClick={() => this.popup_open(nfts)}
                                    >
                                      View Details
                                    </button>
                                  </div>
                                </div>{" "}
                                <div
                                  data-v-e27014a0
                                  className="flex-grow flex flex-col justify-center"
                                >
                                  <p
                                    data-v-e27014a0
                                    className="text-xs pt-0.5 text-red line-clamp-1 text-center"
                                  >
                                    {nfts.verified ? (
                                      <div className="text-sm nftverified">
                                        <i
                                          data-v-37376aa6=""
                                          class="far fa-check-circle text-blue-meta"
                                        ></i>
                                        {nfts.tentname}
                                      </div>
                                    ) : (
                                      "Unverified"
                                    )}
                                  </p>
                                  <p
                                    data-v-e27014a0
                                    className="text-sm text-center leading-tight text-blue-dark dark:text-gray-lightest font-medium break-all line-clamp-2 w-full"
                                  >
                                    {nfts.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="noassests">
                          {this.state.loaded && "No Assest Found"}
                        </div>
                      )}
                    </div>
                    <div
                      data-v-e27014a0
                      className="py-5 mx-auto overflow-y-auto hidden"
                    >
                      <div data-v-e27014a0>
                        <h2
                          data-v-e27014a0
                          className="text-lg text-gray-darkest dark:text-gray-lightest font-normal leading-150 text-center"
                        >
                          <p data-v-e27014a0>
                            Wallet Balance
                            <br data-v-e27014a0 />{" "}
                            <span
                              data-v-e27014a0
                              className="font-bold text-blue-dark dark:text-blue-light"
                            >
                              {this.state.balance} ADA
                            </span>
                          </p>
                        </h2>{" "}
                        <div data-v-e27014a0 className="px-12 py-5 w-full">
                          <label
                            data-v-e27014a0
                            className="relative mx-auto w-full flex flex-col"
                          >
                            <input
                              data-v-e27014a0
                              type="text"
                              placeholder="Enter ADA amount.."
                              min={1}
                              max={99000}
                              className="relative ada-input mx-auto w-full rounded-lg text-lg pl-10 pr-2 focus:outline-none focus:ring-2 focus:ring-blue-meta focus:ring-opacity-50 leading-150 py-1 border border-gray-light dark:border-black-almost placeholder-gray-300 dark:bg-gray-charcoal dark:text-gray-regular"
                            />{" "}
                            <span
                              data-v-e27014a0
                              className="absolute top-1.5 left-3.5 text-lg text-gray-darkest dark:text-gray-lightest"
                            >
                              ₳
                            </span>
                          </label>
                        </div>{" "}
                        <p
                          data-v-e27014a0
                          className="font-normal leading-150 text-gray-dark dark:text-gray-lightest text-center mb-5"
                        >
                          Enter the amount of ADA you want to trade.
                          <br data-v-e27014a0 />
                          Adding ADA is not necesary.
                        </p>{" "}
                        <div data-v-e27014a0 className="flex gap-2 mb-5">
                          <button
                            data-v-e27014a0
                            type="button"
                            className="w-full rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-yellow box-border text-blue-dark dark:text-yellow py-1 px-4 font-bold"
                          >
                            <i
                              data-v-e27014a0
                              className="fas fa-arrow-left mr-1.5"
                            />
                            Change Assets
                          </button>{" "}
                          <button
                            data-v-e27014a0
                            type="button"
                            className="w-full rounded-lg bg-yellow hover:bg-opacity-80 box-border text-blue-dark py-1 px-4 font-bold"
                          >
                            Confirm ADA
                            <i
                              data-v-e27014a0
                              className="fas fa-arrow-right ml-1.5"
                            />
                          </button>
                        </div>
                      </div>
                    </div>{" "}
                    <div
                      data-v-e27014a0
                      className="absolute -bottom-11 -mb-0.5 w-full"
                    >
                      <nav
                        data-v-e27014a0
                        aria-label="Pagination Navigation"
                        className="flex text-sm"
                      >
                        <ul className="flex list-reset rounded-md mx-auto text-gray-darker dark:text-gray-lightest p-1 bg-white dark:bg-blue-darkest c-sliding-pagination__list">
                          <li className="rounded-md hover:bg-gray-lightest dark:hover:bg-blue-light dark:hover:bg-opacity-30 c-sliding-pagination__list-element bg-blue-light hover:text-gray-darker dark:hover:text-gray-lightest text-white font-semibold c-sliding-pagination__list-element--active">
                            <button
                              href="/"
                              aria-label="Page 1 of 1, current page"
                              className="px-3 py-1 inline-block c-sliding-pagination__page c-sliding-pagination__page--current"
                            >
                              1
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>{" "}
                    {/**/} {/**/}
                  </div>{" "}
                  {/**/} {/**/} {/**/}
                </div>{" "}
                {/**/} {/**/}
              </div>
            ) : (
              <div
                data-v-1f7394e8
                className="max-w-screen-xl mx-auto w-full pt-5 sm:px-6 lg:px-8"
                style={{ height: "calc(100vh - 377px)" }}
              >
                <div data-v-1f7394e8 className="trade-container flex flex-col">
                  <div
                    data-v-0bbba0cb
                    data-v-1f7394e8
                    className="h-full flex bg-white dark:bg-blue-darkest rounded-2xl flex-col justify-center"
                  >
                    <img
                      data-v-0bbba0cb
                      src="https://app.tradingtent.io/images/tent.png"
                      alt="Tent image"
                      className="w-20 mb-2 mx-auto"
                    />
                    <h1
                      data-v-0bbba0cb
                      className="text-lg font-bold text-gray-darkest dark:text-gray-lightest text-center"
                    >
                      Welcome to your Tent!
                    </h1>{" "}
                    <div
                      data-v-0bbba0cb
                      className="flex justify-center items-center text-center"
                    >
                      <div data-v-0bbba0cb className="relative mt-5 w-6/12">
                        <div data-v-0bbba0cb className="text-center mb-5">
                          <h1
                            data-v-0bbba0cb
                            className="text-blue-dark dark:text-blue-meta mb-5 font-bold text-3xl"
                          >
                            Initializing dApp Connector
                          </h1>
                        </div>{" "}
                        <div
                          data-v-0bbba0cb
                          className="text-2xl font-normal text-center text-blue-dark dark:text-blue-meta"
                        >
                          <i
                            data-v-0bbba0cb
                            className="fas fa-circle-notch fa-spin"
                          />
                        </div>
                      </div>{" "}
                      {/**/}
                    </div>
                  </div>{" "}
                  {/**/} {/**/} {/**/} {/**/}
                </div>{" "}
                {/**/} {/**/}
              </div>
            )}

            {/* popup */}
            <div
              data-v-77e3ed07
              className={`hidden modal-amount fixed backdrop-filter backdrop-blur-sm bg-backdrop flex items-center justify-center overflow-auto z-50 inset-0`}
            >
              <div
                data-v-77e3ed07
                className="relative bg-white dark:bg-blue-darkest rounded-xl shadow-xl px-5 md:px-12 py-10 max-w-xl w-11/12 md:w-full"
              >
                <div
                  data-v-77e3ed07
                  className="text-center dark:text-gray-lightest mb-7"
                >
                  <h1
                    data-v-77e3ed07
                    className="w-auto p-2.5 rounded-2xl text-4xl bg-blue-gradient mb-1"
                  >
                    <div
                      data-v-77e3ed07
                      className="w-auto p-2.5 rounded-xl bg-blue-gradient mb-4"
                    >
                      <h1 className="text-xl text-blue-dark font-bold dark:text-white">
                        Enter
                        <strong
                          className="fontSetLeave"
                          id="popupnftname"
                        ></strong>
                        quantity
                      </h1>
                    </div>
                    <h3 className="text-lg font-bold fontSetLeave">
                      Available : <span id="popupnftquantity"></span>
                    </h3>
                  </h1>{" "}
                  <p
                    data-v-77e3ed07
                    className="text-lg text-black dark:text-gray-lightest font-medium leading-150"
                  >
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-blue-400 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="popupamountdone"
                      placeholder="0"
                    />
                  </p>
                  <div class="flex justify-between mt-2">
                    <div className="bg-gray-100 w-20 rounded-lg py-1 px-3 dark:text-gray-600">
                      0%
                    </div>
                    <div className="bg-gray-100 w-20 rounded-lg py-1 px-3 dark:text-gray-600">
                      100%
                    </div>
                  </div>
                </div>
                <button
                  data-v-77e3ed07
                  type="button"
                  className="absolute text-2xl px-2.5 text-gray-dark dark:text-gray-lightest top-3 right-3 hover:opacity-100 opacity-70"
                  id="popupcancelicon"
                >
                  <i data-v-77e3ed07 className="fas fa-times" />
                </button>
                <div data-v-77e3ed07 className="text-center mt-5">
                  <button
                    data-v-77e3ed07
                    className="w-44 fontSetLeave text-lg leading-150 box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-yellow text-blue-dark dark:text-yellow py-1 px-4 font-bold"
                    id="popupcancel"
                  >
                    Cancel
                  </button>
                  <button
                    data-v-77e3ed07
                    type="button"
                    className="w-44 ml-3 fontSetLeave box-border border-2 border-transparent leading-150 text-lg rounded-lg py-1 px-4 font-bold bg-yellow hover:bg-opacity-80 text-blue-dark"
                    id="popupdone"
                  >
                    <i data-v-77e3ed07 className="fas fa-sign-out-alt mr-1" />
                    Looks good
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-wrapper">
              <div className="modal rounded-2xl">
                <div className="clear"></div>
                <div className="content">
                  <div
                    data-v-2ee55a73
                    className="relative bg-white dark:bg-[#000e24] rounded-xl shadow-xl px-7 sm:px-10 md:px-20 py-10 max-w-3xl"
                    style={{ "min-height": "333px" }}
                  >
                    <div className="btn-close" onClick={this.popup_close}></div>
                    <div className="flex justify-center mt-5 mb-2">
                      <img
                        id="image_popup"
                        src="/images/monkey.png"
                        className="w-[250px] "
                        alt="product"
                      />
                    </div>
                    <div
                      className="text-[#0F0F4D] text-xl font-[700] dark:text-white"
                      id="name_popup"
                    ></div>
                    <div className="text-blue-600 font-[700] text-xl">
                      Project
                    </div>
                    <div
                      className="border h-[40px] w-fit m-auto rounded-[10px] p-2 mb-2 text-[red] dark:bg-blue-darker"
                      id="varified_status_popup"
                    ></div>
                    <div className="text-blue-600 font-[700] text-xl">
                      Policy ID
                    </div>
                    <div
                      className="border h-[40px] w-full rounded-[10px] dark:bg-blue-darker dark:text-gray-100 p-2 mb-2"
                      id="policyid_popup"
                    ></div>
                    <div className="text-blue-600 font-[700] text-xl mb-2 "></div>
                    <div className="text-blue-600 font-[700] text-xl">
                      Fingerprint
                    </div>
                    <div className="flex justify-center">
                      <div className="border w-fit h-[40px] rounded-[10px]  p-3 flex items-center dark:bg-blue-darker dark:text-gray-100">
                        <p id="fingerprint_popup"></p>
                      </div>
                    </div>
                    <div className="flex justify-center gap-3 m-5">
                      <a
                        target={"_blank"}
                        data-v-098e79de
                        className="cardanoscan w-fit text-lg leading-150 box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-[#FFB23C] text-blue-dark dark:text-yellow-700 py-1 px-4 font-bold"
                      >
                        View Asset on cardanoscan.io
                        <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                      </a>{" "}
                    </div>
                    <div className="flex justify-center gap-3 m-5">
                      <a
                        target={"_blank"}
                        data-v-098e79de
                        className="poolpm w-fit text-lg leading-150 box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-[#FFB23C] text-blue-dark dark:text-yellow-700 py-1 px-4 font-bold"
                      >
                        View Asset on pool.pm
                        <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                      </a>{" "}
                    </div>
                  </div>
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
                  </h2>
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
                            {this.state.select_ada / 1000000}
                          </p>{" "}
                          <p
                            data-v-77d1d4d5
                            className="text-base dark:text-white leading-tight text-center font-medium text-blue-dark dark:text-gray-lightest w-full"
                          >
                            ADA
                          </p>
                        </div>
                      </a>
                    </div>
                    {!this.state.isnftselected && (
                      <div
                        data-v-77d1d4d5
                        className="trade-nfts flex flex-row-reverse overflow-x-auto"
                      >
                        <div
                          data-v-77d1d4d5
                          className="flex w-full flex-nowrap"
                        >
                          <div
                            data-v-77d1d4d5
                            className="w-full text-center font-light text-gray-400 dark:text-gray-regular pt-8"
                            style={{ height: "128px" }}
                          >
                            Your haven't selected any Native Assets.
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.isnftselected && (
                      <div
                        data-v-77d1d4d5
                        className="trade-nfts flex flex-row-reverse overflow-x-auto"
                      >
                        {this.state.selected_assest.map((nft, i) => (
                          <div
                            data-v-77d1d4d5
                            className="flex gap-2 flex-nowrap"
                          >
                            <div
                              data-v-77d1d4d5
                              className="p-1.5 group relative bg-gray-lightest dark:bg-blue-darker rounded-lg"
                              style={{}}
                            >
                              <div
                                data-v-77d1d4d5
                                className="image-select flex flex-col min-h-full w-28"
                              >
                                <div
                                  data-v-77d1d4d5
                                  className="h-24 w-24 mx-auto img-container overflow-hidden relative"
                                >
                                  <img
                                    data-v-77d1d4d5
                                    data-loading="https://app.tradingtent.io/images/loading_mask.svg"
                                    data-error="https://app.tradingtent.io/images/loading_error.svg"
                                    alt=""
                                    className="absolute object-cover object-center w-full h-full rounded"
                                    src={nft.image}
                                    lazy="loaded"
                                  />
                                </div>{" "}
                                <div
                                  data-v-77d1d4d5
                                  className="flex-grow flex flex-col justify-center"
                                >
                                  <p
                                    data-v-77d1d4d5
                                    className="text-xs pt-0.5 text-red line-clamp-1 text-center"
                                  >
                                    {nft.verified ? (
                                      <div className="text-sm nftverified">
                                        <i
                                          data-v-37376aa6=""
                                          class="far fa-check-circle text-blue-meta"
                                        ></i>{" "}
                                        {nft.tentname}
                                      </div>
                                    ) : (
                                      "Unverified"
                                    )}
                                  </p>{" "}
                                  {/**/}{" "}
                                  <p
                                    data-v-77d1d4d5
                                    className="text-xs font-medium text-blue-dark dark:text-gray-lightest text-center break-all line-clamp-2 w-full"
                                  >
                                    {nft.name}
                                  </p>
                                </div>
                              </div>{" "}
                              <div
                                data-v-77d1d4d5
                                className="absolute backdrop-filter rounded-lg backdrop-blur-sm bg-backdrop group-hover:block hidden inset-0"
                              >
                                <div
                                  data-v-77d1d4d5
                                  className="flex h-full flex-col p-2 justify-center gap-5 items-center "
                                >
                                  <button
                                    data-v-77d1d4d5
                                    type="button"
                                    className="bg-white text-gray-darker hover:bg-blue-meta hover:text-white text-sm font-medium rounded-lg py-1.5 px-3 w-full dark:text-black"
                                    onClick={() => {
                                      this.deselectnft(nft);
                                    }}
                                  >
                                    Deselect Asset
                                  </button>{" "}
                                  <button
                                    data-v-77d1d4d5
                                    type="button"
                                    className="bg-white text-gray-darker hover:bg-blue-meta hover:text-white text-sm font-medium rounded-lg py-1.5 px-3 w-full dark:text-black"
                                    onClick={() => {
                                      this.popup_open(nft);
                                    }}
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>{" "}
                <div
                  data-v-77d1d4d5
                  className="separator flex items-center flex-grow-0"
                >
                  <div
                    data-v-77d1d4d5
                    className="mx-auto relative flex items-center"
                  >
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
                            {this.state.opp_ada / 1000000}
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
                    {!this.state.isnftoppselected && (
                      <div
                        data-v-77d1d4d5
                        className="trade-nfts flex overflow-x-auto"
                        style={{ marginRight: "0px", marginLeft: "132px" }}
                      >
                        <div
                          data-v-77d1d4d5
                          className="flex w-full flex-nowrap"
                        >
                          <div
                            data-v-77d1d4d5
                            className="w-full text-center font-light text-gray-400 pt-8"
                            style={{ height: "128px" }}
                          >
                            Your trade partner hasn't selected any Native
                            Assets.
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.isnftoppselected && (
                      <div className="oppnftselect">
                        {this.state.opp_assest.map((nft, i) => (
                          <div
                            data-v-77d1d4d5
                            className="flex gap-2 flex-nowrap"
                          >
                            <div
                              data-v-77d1d4d5
                              className="p-1.5 group relative bg-gray-lightest dark:bg-blue-darker rounded-lg"
                              style={{}}
                            >
                              <div
                                data-v-77d1d4d5
                                className="image-select flex flex-col min-h-full w-28 p-[6px]"
                              >
                                <div
                                  data-v-77d1d4d5
                                  className="h-24 w-24 mx-auto img-container overflow-hidden relative"
                                >
                                  <img
                                    data-v-77d1d4d5
                                    data-loading="https://app.tradingtent.io/images/loading_mask.svg"
                                    data-error="https://app.tradingtent.io/images/loading_error.svg"
                                    alt=""
                                    className="absolute object-cover object-center w-full h-full rounded"
                                    src={nft.image}
                                    lazy="loaded"
                                  />
                                </div>{" "}
                                <div
                                  data-v-77d1d4d5
                                  className="flex-grow flex flex-col justify-center"
                                >
                                  <p
                                    data-v-77d1d4d5
                                    className="text-xs pt-0.5 text-red line-clamp-1 text-center"
                                  >
                                    {nft.verified ? (
                                      <div className="text-sm nftverified">
                                        <i
                                          data-v-37376aa6=""
                                          class="far fa-check-circle text-blue-meta"
                                        ></i>
                                        {nft.tentname}
                                      </div>
                                    ) : (
                                      "Unverified"
                                    )}
                                  </p>{" "}
                                  {/**/}{" "}
                                  <p
                                    data-v-77d1d4d5
                                    className="text-xs font-medium text-blue-dark dark:text-gray-lightest text-center break-all line-clamp-2 w-full"
                                  >
                                    {nft.name}
                                  </p>
                                </div>
                              </div>{" "}
                              <div
                                data-v-77d1d4d5
                                className="absolute backdrop-filter rounded-lg backdrop-blur-sm bg-backdrop group-hover:block hidden inset-0"
                              >
                                <div
                                  data-v-77d1d4d5
                                  className="flex h-full flex-col p-2 justify-center gap-5 items-center "
                                >
                                  <button
                                    data-v-77d1d4d5
                                    type="button"
                                    className="bg-white text-gray-darker hover:bg-blue-meta hover:text-white text-sm font-medium rounded-lg py-1.5 px-3 w-full dark:text-black"
                                    onClick={() => {
                                      this.popup_open(nft);
                                    }}
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <NewProcessTent step={step - 1} tentId={tentId} />
            <div
              data-v-1f7394e8
              className="max-w-screen-xl mx-auto w-full pt-5 sm:px-6 lg:px-8"
              style={{ height: "calc(100vh - 377px)" }}
            >
              <div data-v-1f7394e8 className="trade-container flex flex-col">
                {/**/}{" "}
                <div
                  data-v-e27014a0
                  data-v-1f7394e8
                  id="asset-list"
                  className="flex relative bg-white dark:bg-blue-darkest rounded-2xl flex-col"
                  style={{ "min-height": "0px" }}
                >
                  <div
                    data-v-e27014a0
                    className="grid grid-cols-2 py-2 px-2.5 mb-2 border-b border-gray-light dark:border-blue-darker"
                  >
                    <ul
                      data-v-e27014a0
                      className="flex w-full items-center text-lg"
                    >
                      <li
                        data-v-e27014a0
                        className="cursor-default rounded-lg leading-150  py-1 px-4 font-semibold mr-2.5 bg-blue-dark text-white dark:text-gray-lightest"
                      >
                        1. Select Assets
                      </li>{" "}
                      <li
                        data-v-e27014a0
                        className="cursor-default rounded-lg leading-150 text-white py-1 px-4 font-semibold bg-blue-light"
                      >
                        2. Select ADA
                      </li>{" "}
                      {/**/}
                    </ul>{" "}
                    <div data-v-e27014a0>{/**/}</div>
                  </div>{" "}
                  <div data-v-e27014a0 className="py-5 mx-auto overflow-y-auto">
                    <div data-v-e27014a0>
                      <h2
                        data-v-e27014a0
                        className="text-lg fontSetLeave text-gray-darkest dark:text-gray-lightest font-normal leading-150 text-center"
                      >
                        <p data-v-e27014a0>
                          Wallet Balance
                          <br data-v-e27014a0 />{" "}
                          <span
                            data-v-e27014a0
                            className="font-bold text-blue-dark dark:text-blue-light"
                          >
                            {this.state.balance / 1000000} ADA
                          </span>
                        </p>
                      </h2>{" "}
                      <div
                        data-v-e27014a0
                        className="px-12 py-5 w-full items-center flex"
                      >
                        <label
                          data-v-e27014a0
                          className="relative mx-auto w-full flex flex-col items-center"
                        >
                          <input
                            data-v-e27014a0
                            onChange={this.adachange}
                            type="text"
                            placeholder="0"
                            min={1}
                            max={99000}
                            className="relative ada-input mx-auto w-full rounded-lg text-lg pl-10 pr-2 focus:outline-none focus:ring-2 focus:ring-blue-meta focus:ring-opacity-50 leading-150 py-1 border border-gray-light dark:border-black-almost placeholder-gray-300 dark:bg-gray-charcoal dark:text-gray-regular"
                          />{" "}
                          <span
                            data-v-e27014a0
                            className="absolute fontSetLeave top-0.5 left-3.5 text-lg text-gray-darkest dark:text-gray-lightest"
                          >
                            ₳
                          </span>
                        </label>
                      </div>{" "}
                      <p
                        data-v-e27014a0
                        className="font-normal leading-150 text-gray-dark dark:text-gray-lightest text-center mb-5"
                      >
                        Enter the amount of ADA you want to trade.
                        <br data-v-e27014a0 />
                        Adding ADA is not necesary.
                      </p>{" "}
                      <div data-v-e27014a0 className="flex gap-2 mb-5">
                        <button
                          data-v-e27014a0
                          type="button"
                          onClick={() => {
                            this.prevStep();
                            this.changemymindnft();
                          }}
                          className="w-full fontSetLeave rounded-lg hover:bg-opacity-20  border-2 border-yellow box-border text-blue-dark dark:text-yellow py-1 px-4 font-bold"
                        >
                          <i
                            data-v-e27014a0
                            className="fas fa-arrow-left mr-1.5"
                          />
                          Change Assets
                        </button>{" "}
                        <button
                          data-v-e27014a0
                          type="button"
                          onClick={() => {
                            this.adaconformed();
                          }}
                          className="w-full fontSetLeave rounded-lg bg-yellow hover:bg-opacity-80 box-border text-blue-dark py-1 px-4 font-bold"
                        >
                          Confirm ADA
                          <i
                            data-v-e27014a0
                            className="fas fa-arrow-right ml-1.5"
                          />
                        </button>
                      </div>
                    </div>
                  </div>{" "}
                  {/**/} {/**/} {/**/}
                </div>{" "}
                {/**/} {/**/} {/**/}
              </div>{" "}
              {/**/} {/**/}
            </div>
            <div className="modal-wrapper">
              <div className="modal rounded-2xl">
                <div className="clear"></div>
                <div className="content">
                  <div
                    data-v-2ee55a73
                    className="relative bg-white dark:bg-[#000e24] rounded-xl shadow-xl px-7 sm:px-10 md:px-20 py-10 max-w-3xl"
                    style={{ "min-height": "333px" }}
                  >
                    <div className="btn-close" onClick={this.popup_close}></div>
                    <div className="flex justify-center mt-5 mb-2">
                      <img
                        id="image_popup"
                        src="/images/monkey.png"
                        className="w-[250px] "
                        alt="product"
                      />
                    </div>
                    <div
                      className="text-[#0F0F4D] text-xl font-[700]"
                      id="name_popup"
                    ></div>
                    <div className="text-blue-600 font-[700] text-xl  ">
                      Project
                    </div>
                    <div
                      className="border h-[40px] w-fit m-auto rounded-[10px] dark:bg-blue-darker  p-2 mb-2 text-[red]"
                      id="varified_status_popup"
                    ></div>
                    <div className="text-blue-600 font-[700] text-xl">
                      Policy ID
                    </div>
                    <div
                      className="border h-[40px] w-full rounded-[10px] dark:bg-blue-darker dark:text-gray-100 p-2 mb-2"
                      id="policyid_popup"
                    ></div>
                    <div className="text-blue-600 font-[700] text-xl mb-2 "></div>
                    <div className="text-blue-600 font-[700] text-xl">
                      Fingerprint
                    </div>
                    <div className="flex justify-center">
                      <div className="border w-fit h-[40px] rounded-[10px] bg-gray-300 p-3 flex items-center">
                        <p id="fingerprint_popup"></p>
                      </div>
                    </div>
                    <div className="flex justify-center gap-3 m-5">
                      <a
                        target={"_blank"}
                        data-v-098e79de
                        className="cardanoscan w-fit text-lg leading-150 box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-[#FFB23C] text-blue-dark dark:text-yellow-700 py-1 px-4 font-bold"
                      >
                        View Asset on cardanoscan.io
                        <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                      </a>{" "}
                    </div>
                    <div className="flex justify-center gap-3 m-5">
                      <a
                        target={"_blank"}
                        data-v-098e79de
                        className="poolpm w-fit text-lg leading-150 box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-[#FFB23C] text-blue-dark dark:text-yellow-700 py-1 px-4 font-bold"
                      >
                        View Asset on pool.pm
                        <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                      </a>{" "}
                    </div>
                  </div>
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
                            {this.state.select_ada / 1000000}
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
                    {!this.state.isnftselected && (
                      <div
                        data-v-77d1d4d5
                        className="trade-nfts flex flex-row-reverse overflow-x-auto"
                      >
                        <div
                          data-v-77d1d4d5
                          className="flex w-full flex-nowrap"
                        >
                          <div
                            data-v-77d1d4d5
                            className="w-full text-center font-light text-gray-400 dark:text-gray-regular pt-8"
                            style={{ height: "128px" }}
                          >
                            Your haven't selected any Native Assets.
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.isnftselected && (
                      <div
                        data-v-77d1d4d5
                        className="trade-nfts flex flex-row-reverse overflow-x-auto"
                      >
                        {this.state.selected_assest.map((nft, i) => (
                          <div
                            data-v-77d1d4d5
                            className="flex gap-2 flex-nowrap"
                          >
                            <div
                              data-v-77d1d4d5
                              className="p-1.5 group relative bg-gray-lightest dark:bg-blue-darker rounded-lg"
                              style={{}}
                            >
                              <div
                                data-v-77d1d4d5
                                className="image-select flex flex-col min-h-full w-28"
                              >
                                <div
                                  data-v-77d1d4d5
                                  className="h-24 w-24 mx-auto img-container overflow-hidden relative"
                                >
                                  <img
                                    data-v-77d1d4d5
                                    data-loading="https://app.tradingtent.io/images/loading_mask.svg"
                                    data-error="https://app.tradingtent.io/images/loading_error.svg"
                                    alt=""
                                    className="absolute object-cover object-center w-full h-full rounded"
                                    src={nft.image}
                                    lazy="loaded"
                                  />
                                </div>{" "}
                                <div
                                  data-v-77d1d4d5
                                  className="flex-grow flex flex-col justify-center"
                                >
                                  <p
                                    data-v-77d1d4d5
                                    className="text-xs pt-0.5 text-red line-clamp-1 text-center"
                                  >
                                    {nft.verified ? (
                                      <div className="text-sm nftverified">
                                        <i
                                          data-v-37376aa6=""
                                          class="far fa-check-circle text-blue-meta"
                                        ></i>{" "}
                                        {nft.tentname}
                                      </div>
                                    ) : (
                                      "Unverified"
                                    )}
                                  </p>{" "}
                                  {/**/}{" "}
                                  <p
                                    data-v-77d1d4d5
                                    className="text-xs font-medium text-blue-dark dark:text-gray-lightest text-center break-all line-clamp-2 w-full"
                                  >
                                    {nft.name}
                                  </p>
                                </div>
                              </div>{" "}
                              <div
                                data-v-77d1d4d5
                                className="absolute backdrop-filter rounded-lg backdrop-blur-sm bg-backdrop group-hover:block hidden inset-0"
                              >
                                <div
                                  data-v-77d1d4d5
                                  className="flex h-full flex-col p-2 justify-center gap-5 items-center "
                                >
                                  <button
                                    data-v-77d1d4d5
                                    type="button"
                                    className="bg-white text-gray-darker hover:bg-blue-meta hover:text-white text-sm font-medium rounded-lg py-1.5 px-3 w-full"
                                    onClick={() => {
                                      this.popup_open(nft);
                                    }}
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>{" "}
                <div
                  data-v-77d1d4d5
                  className="separator flex items-center flex-grow-0"
                >
                  <div
                    data-v-77d1d4d5
                    className="mx-auto relative flex items-center"
                  >
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
                            {this.state.opp_ada / 1000000}
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
                    {!this.state.isnftoppselected && (
                      <div
                        data-v-77d1d4d5
                        className="trade-nfts flex overflow-x-auto"
                        style={{ marginRight: "0px", marginLeft: "132px" }}
                      >
                        <div
                          data-v-77d1d4d5
                          className="flex w-full flex-nowrap"
                        >
                          <div
                            data-v-77d1d4d5
                            className="w-full text-center font-light text-gray-400 pt-8"
                            style={{ height: "128px" }}
                          >
                            Your trade partner hasn't selected any Native
                            Assets.
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="oppnftselect">
                      {this.state.opp_assest.map((nft, i) => (
                        <div data-v-77d1d4d5 className="flex gap-2 flex-nowrap">
                          <div
                            data-v-77d1d4d5
                            className="p-1.5 group relative bg-gray-lightest dark:bg-blue-darker rounded-lg"
                            style={{}}
                          >
                            <div
                              data-v-77d1d4d5
                              className="image-select flex flex-col min-h-full w-28 p-[6px]"
                            >
                              <div
                                data-v-77d1d4d5
                                className="h-24 w-24 mx-auto img-container overflow-hidden relative"
                              >
                                <img
                                  data-v-77d1d4d5
                                  data-loading="https://app.tradingtent.io/images/loading_mask.svg"
                                  data-error="https://app.tradingtent.io/images/loading_error.svg"
                                  alt=""
                                  className="absolute object-cover object-center w-full h-full rounded"
                                  src={nft.image}
                                  lazy="loaded"
                                />
                              </div>{" "}
                              <div
                                data-v-77d1d4d5
                                className="flex-grow flex flex-col justify-center"
                              >
                                <p
                                  data-v-77d1d4d5
                                  className="text-xs pt-0.5 text-red line-clamp-1 text-center"
                                >
                                  {nft.verified ? (
                                    <div className="text-sm nftverified">
                                      <i
                                        data-v-37376aa6=""
                                        class="far fa-check-circle text-blue-meta"
                                      ></i>{" "}
                                      {nft.tentname}
                                    </div>
                                  ) : (
                                    "Unverified"
                                  )}
                                </p>{" "}
                                {/**/}{" "}
                                <p
                                  data-v-77d1d4d5
                                  className="text-xs font-medium text-blue-dark dark:text-gray-lightest text-center break-all line-clamp-2 w-full"
                                >
                                  {nft.name}
                                </p>
                              </div>
                            </div>{" "}
                            <div
                              data-v-77d1d4d5
                              className="absolute backdrop-filter rounded-lg backdrop-blur-sm bg-backdrop group-hover:block hidden inset-0"
                            >
                              <div
                                data-v-77d1d4d5
                                className="flex h-full flex-col p-2 justify-center gap-5 items-center "
                              >
                                <button
                                  data-v-77d1d4d5
                                  type="button"
                                  className="bg-white text-gray-darker hover:bg-blue-meta hover:text-white text-sm font-medium rounded-lg py-1.5 px-3 w-full dark:text-black"
                                  onClick={() => {
                                    this.popup_open(nft);
                                  }}
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <NewProcessTent step={step - 2} tentId={tentId} />
            <div className="container m-auto">
              <div className="flex justify-center">
                <div
                  className="w-[900px] h-auto bg-[white] rounded-[25px]  dark:bg-[#000e24]"
                  style={{ marginBottom: "250px" }}
                >
                  <div className="p-6 space-y-6 flex flex-col justify-center">
                    <h3 className="flex text-[#0F0F4D] justify-center text-xl font-bold  dark:text-white">
                      Trade OverView
                    </h3>
                    <div className="flex justify-center ">
                      <div className="border w-60 h-28 rounded-lg">
                        <div className="flex mt-4  justify-center font-bold text-gray-400 text-base dark:text-white">
                          You Will Send
                        </div>
                        <div className="flex mt-2 justify-center text-[#0F0F4D] font-normal text-lg dark:text-[blue]">
                          {this.state.selected_assest.length} X Native Assets
                        </div>
                        <div className="flex justify-center text-[#0F0F4D] font-bold text-lg dark:text-[blue]">
                          {this.state.select_ada / 1000000} A
                        </div>
                      </div>
                      <div className="border w-60 rounded-lg h-28">
                        <div className="flex mt-4 justify-center font-bold text-gray-400 text-base dark:text-white">
                          You partner Will Send
                        </div>
                        <div className="flex mt-2 justify-center text-[#0F0F4D] font-normal text-lg dark:text-[blue]">
                          {this.state.opp_assest.length} X Native Assets
                        </div>
                        <div className="flex justify-center text-[#0F0F4D] font-bold text-lg dark:text-[blue]">
                          {this.state.opp_ada / 1000000} A
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="flex justify-center">
                      <p className="text-lg text-center w-96 leading-relaxed text-gray-500 dark:text-gray-400">
                        You will pay: 5 ADA (Service Fee)
                      </p>
                    </div>
                  </div>
                  {/* Modal footer */}
                  <div className="flex justify-center  items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <div className="">
                      <button
                        data-v-0bbba0cb
                        type="button"
                        content="Share the ID with your trading partner to invite them to your Tent"
                        className="rounded-lg text-lg border  border-[#FFB23C] hover:bg-opacity-80 box-border leading-150 text-blue-dark py-1 px-4 font-bold dark:text-[#FFB23C]"
                        onClick={() => {
                          this.prevStep();
                          this.changemymindada();
                        }}
                      >
                        <i className="fa-solid fa-arrow-left mr-2"></i>
                        Change ADA
                      </button>
                    </div>
                    <div className="">
                      <button
                        onClick={() => {
                          this.buildSendTokenTransaction();
                        }}
                        data-v-0bbba0cb
                        type="button"
                        content="Share the ID with your trading partner to invite them to your Tent"
                        className="rounded-lg text-lg bg-[#FFB23C] hover:bg-opacity-80 box-border leading-150 text-blue-dark py-1 px-4 font-bold"
                      >
                        Confirm Trade
                        <i className="fa-solid fa-arrow-right  ml-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-wrapper">
              <div className="modal rounded-2xl">
                <div className="clear"></div>
                <div className="content">
                  <div
                    data-v-2ee55a73
                    className="relative bg-white dark:bg-[#000e24] rounded-xl shadow-xl px-7 sm:px-10 md:px-20 py-10 max-w-3xl"
                    style={{ "min-height": "333px" }}
                  >
                    <div className="btn-close" onClick={this.popup_close}></div>
                    <div className="flex justify-center mt-5 mb-2">
                      <img
                        id="image_popup"
                        src="/images/monkey.png"
                        className="w-[250px] "
                        alt="product"
                      />
                    </div>
                    <div
                      className="text-[#0F0F4D] text-xl font-[700]"
                      id="name_popup"
                    ></div>
                    <div className="text-blue-600 font-[700] text-xl">
                      Project
                    </div>
                    <div
                      className="border h-[40px] w-fit m-auto rounded-[10px] bg-gray-300 p-2 mb-2 text-[red]"
                      id="varified_status_popup"
                    ></div>
                    <div className="text-blue-600 font-[700] text-xl">
                      Policy ID
                    </div>
                    <div
                      className="border h-[40px] w-full rounded-[10px] bg-gray-300 p-2 mb-2"
                      id="policyid_popup"
                    ></div>
                    <div className="text-blue-600 font-[700] text-xl mb-2 "></div>
                    <div className="text-blue-600 font-[700] text-xl">
                      Fingerprint
                    </div>
                    <div className="flex justify-center">
                      <div className="border w-fit h-[40px] rounded-[10px] bg-gray-300 p-3 flex items-center">
                        <p id="fingerprint_popup"></p>
                      </div>
                    </div>
                    <div className="flex justify-center gap-3 m-5">
                      <a
                        target={"_blank"}
                        data-v-098e79de
                        className="cardanoscan w-fit text-lg leading-150 box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-[#FFB23C] text-blue-dark dark:text-yellow-700 py-1 px-4 font-bold"
                      >
                        View Asset on cardanoscan.io
                        <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                      </a>{" "}
                    </div>
                    <div className="flex justify-center gap-3 m-5">
                      <a
                        target={"_blank"}
                        data-v-098e79de
                        className="poolpm w-fit text-lg leading-150 box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-[#FFB23C] text-blue-dark dark:text-yellow-700 py-1 px-4 font-bold"
                      >
                        View Asset on pool.pm
                        <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                      </a>{" "}
                    </div>
                  </div>
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
                            {this.state.select_ada / 1000000}
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
                    {!this.state.isnftselected && (
                      <div
                        data-v-77d1d4d5
                        className="trade-nfts flex flex-row-reverse overflow-x-auto"
                      >
                        <div
                          data-v-77d1d4d5
                          className="flex w-full flex-nowrap"
                        >
                          <div
                            data-v-77d1d4d5
                            className="w-full text-center font-light text-gray-400 dark:text-gray-regular pt-8"
                            style={{ height: "128px" }}
                          >
                            Your haven't selected any Native Assets.
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.isnftselected && (
                      <div
                        data-v-77d1d4d5
                        className="trade-nfts flex flex-row-reverse overflow-x-auto"
                      >
                        {this.state.selected_assest.map((nft, i) => (
                          <div
                            data-v-77d1d4d5
                            className="flex gap-2 flex-nowrap"
                          >
                            <div
                              data-v-77d1d4d5
                              className="p-1.5 group relative bg-gray-lightest dark:bg-blue-darker rounded-lg"
                              style={{}}
                            >
                              <div
                                data-v-77d1d4d5
                                className="image-select flex flex-col min-h-full w-28"
                              >
                                <div
                                  data-v-77d1d4d5
                                  className="h-24 w-24 mx-auto img-container overflow-hidden relative"
                                >
                                  <img
                                    data-v-77d1d4d5
                                    data-loading="https://app.tradingtent.io/images/loading_mask.svg"
                                    data-error="https://app.tradingtent.io/images/loading_error.svg"
                                    alt=""
                                    className="absolute object-cover object-center w-full h-full rounded"
                                    src={nft.image}
                                    lazy="loaded"
                                  />
                                </div>{" "}
                                <div
                                  data-v-77d1d4d5
                                  className="flex-grow flex flex-col justify-center"
                                >
                                  <p
                                    data-v-77d1d4d5
                                    className="text-xs pt-0.5 text-red line-clamp-1 text-center"
                                  >
                                    {nft.verified ? (
                                      <div className="text-sm nftverified">
                                        <i
                                          data-v-37376aa6=""
                                          class="far fa-check-circle text-blue-meta"
                                        ></i>{" "}
                                        {nft.tentname}
                                      </div>
                                    ) : (
                                      "Unverified"
                                    )}
                                  </p>{" "}
                                  {/**/}{" "}
                                  <p
                                    data-v-77d1d4d5
                                    className="text-xs font-medium text-blue-dark dark:text-gray-lightest text-center break-all line-clamp-2 w-full"
                                  >
                                    {nft.name}
                                  </p>
                                </div>
                              </div>{" "}
                              <div
                                data-v-77d1d4d5
                                className="absolute backdrop-filter rounded-lg backdrop-blur-sm bg-backdrop group-hover:block hidden inset-0"
                              >
                                <div
                                  data-v-77d1d4d5
                                  className="flex h-full flex-col p-2 justify-center gap-5 items-center "
                                >
                                  <button
                                    data-v-77d1d4d5
                                    type="button"
                                    className="bg-white text-gray-darker hover:bg-blue-meta hover:text-white text-sm font-medium rounded-lg py-1.5 px-3 w-full"
                                    onClick={() => {
                                      this.popup_open(nft);
                                    }}
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>{" "}
                <div
                  data-v-77d1d4d5
                  className="separator flex items-center flex-grow-0"
                >
                  <div
                    data-v-77d1d4d5
                    className="mx-auto relative flex items-center"
                  >
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
                            {this.state.opp_ada / 1000000}
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
                    {!this.state.isnftoppselected && (
                      <div
                        data-v-77d1d4d5
                        className="trade-nfts flex overflow-x-auto"
                        style={{ marginRight: "0px", marginLeft: "132px" }}
                      >
                        <div
                          data-v-77d1d4d5
                          className="flex w-full flex-nowrap"
                        >
                          <div
                            data-v-77d1d4d5
                            className="w-full text-center font-light text-gray-400 pt-8"
                            style={{ height: "128px" }}
                          >
                            Your trade partner hasn't selected any Native
                            Assets.
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="oppnftselect">
                      {this.state.opp_assest.map((nft, i) => (
                        <div data-v-77d1d4d5 className="flex gap-2 flex-nowrap">
                          <div
                            data-v-77d1d4d5
                            className="p-1.5 group relative bg-gray-lightest dark:bg-blue-darker rounded-lg"
                            style={{}}
                          >
                            <div
                              data-v-77d1d4d5
                              className="image-select flex flex-col min-h-full w-28 p-[6px]"
                            >
                              <div
                                data-v-77d1d4d5
                                className="h-24 w-24 mx-auto img-container overflow-hidden relative"
                              >
                                <img
                                  data-v-77d1d4d5
                                  data-loading="https://app.tradingtent.io/images/loading_mask.svg"
                                  data-error="https://app.tradingtent.io/images/loading_error.svg"
                                  alt=""
                                  className="absolute object-cover object-center w-full h-full rounded"
                                  src={nft.image}
                                  lazy="loaded"
                                />
                              </div>{" "}
                              <div
                                data-v-77d1d4d5
                                className="flex-grow flex flex-col justify-center"
                              >
                                <p
                                  data-v-77d1d4d5
                                  className="text-xs pt-0.5 text-red line-clamp-1 text-center"
                                >
                                  {nft.verified ? (
                                    <div className="text-sm nftverified">
                                      <i
                                        data-v-37376aa6=""
                                        class="far fa-check-circle text-blue-meta"
                                      ></i>{" "}
                                      {nft.tentname}
                                    </div>
                                  ) : (
                                    "Unverified"
                                  )}
                                </p>{" "}
                                {/**/}{" "}
                                <p
                                  data-v-77d1d4d5
                                  className="text-xs font-medium text-blue-dark dark:text-gray-lightest text-center break-all line-clamp-2 w-full"
                                >
                                  {nft.name}
                                </p>
                              </div>
                            </div>{" "}
                            <div
                              data-v-77d1d4d5
                              className="absolute backdrop-filter rounded-lg backdrop-blur-sm bg-backdrop group-hover:block hidden inset-0"
                            >
                              <div
                                data-v-77d1d4d5
                                className="flex h-full flex-col p-2 justify-center gap-5 items-center "
                              >
                                <button
                                  data-v-77d1d4d5
                                  type="button"
                                  className="bg-white text-gray-darker hover:bg-blue-meta hover:text-white text-sm font-medium rounded-lg py-1.5 px-3 w-full dark:text-black"
                                  onClick={() => {
                                    this.popup_open(nft);
                                  }}
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal */}
            <div
              id="defaultModal"
              tabIndex={-1}
              aria-hidden="true"
              className={`${
                this.state.modalShow ? "" : "hidden"
              } overflow-y-auto overflow-x-hidden fixed top-44 mx-auto z-50 w-fit md:inset-0 h-modal md:h-full mt-[130px]`}
            >
              <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg shadow dark:bg-[#000e24]">
                  {/* Modal header */}
                  <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                    <button
                      type="button"
                      className={`${
                        this.state.modalShow ? "" : "hidden"
                      }text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white`}
                      data-modal-toggle="defaultModal"
                      onClick={this.modalClose}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* Modal body */}
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
                        Are You Sure?
                      </h1>{" "}
                      <p
                        data-v-098e79de
                        className="text-lg font-medium text-black dark:text-gray-regular leading-150 mb-5"
                      >
                        Please make sure to double check the amount of ADA &{" "}
                        <span className="text-red">confirm the policy IDs</span>{" "}
                        for all assets
                      </p>{" "}
                      <p
                        data-v-098e79de
                        className="text-lg font-medium text-black dark:text-gray-regular leading-150 mb-5"
                      >
                        You will not be able to change anything once both of you
                        confirm.
                      </p>{" "}
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
                        onClick={() => {
                          this.nextStep();
                          this.tradClose();
                          setTimeout(() => {
                            toast.success(
                              "Your Patner Has Confirmed The Trade",
                              {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                              }
                            );
                          }, 5000);
                        }}
                        className="w-full box-border border-2 border-transparent leading-150 text-lg rounded-lg py-1 px-4 font-bold bg-yellow hover:bg-opacity-80 text-blue-dark"
                      >
                        Confirm Trade
                        <i className="fa-solid fa-arrow-right  ml-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <NewProcessTent step={step - 2} tentId={tentId} />
            <div className="container m-auto">
              <div className="flex justify-center">
                <div
                  className="w-[900px] h-auto bg-[white] rounded-[25px]  dark:bg-[#000e24]"
                  style={{ marginBottom: "250px" }}
                >
                  {/* Modal body */}
                  <div className="p-6 space-y-6 flex flex-col justify-center">
                    <h3 className="flex text-[#0F0F4D] justify-center text-xl font-bold  dark:text-white">
                      Transaction Details
                    </h3>
                    <p className="text-red text-lg font-bold flex justify-center">
                      {this.state.comison / 1000000 +
                        this.state.select_ada / 1000000 +
                        0.113618}{" "}
                      A
                    </p>
                    <div className="flex justify-center items-center space-x-4">
                      <div className="border bg-red rounded-xl dark:bg-red-400">
                        <div className="flex p-2 items-center justify-center font-bold text-black text-base">
                          -5 ADA (Service fee)
                        </div>
                      </div>
                      <div className="border  bg-red rounded-xl dark:bg-red-400">
                        <div className="flex p-2 justify-center font-bold text-black text-base">
                          -0.113618 ADA (network fee)
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="flex justify-center">
                      <div className=" border bg-red rounded-lg">
                        {this.state.selected_assest.map((nft, i) => (
                          <p className="font-bold p-2">
                            -{nft.amount} {nft.name}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className=" border bg-green rounded-lg dark:bg-green-400">
                        <div className="flex p-2 items-center justify-center font-bold text-black text-base">
                          {this.state.opp_ada / 1000000} ADA
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className=" border bg-green dark:bg-green-400 rounded-lg">
                        {this.state.opp_assest.map((nft, i) => (
                          <p className="font-bold p-2">
                            +{nft.amount} {nft.name}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <p className="font-normal text-gray-darkest text-base border-b-2 dark:text-[blue] dark:border-b-[blue]">
                        View All Inputs & Outputs
                      </p>
                    </div>
                  </div>
                  {/* Modal footer */}
                  <div className="flex justify-center  items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <div className="">
                      <button
                        onClick={() => {
                          this.submitbuildtranstion();
                          this.modalClose();
                        }}
                        data-v-0bbba0cb
                        type="button"
                        content="Share the ID with your trading partner to invite them to your Tent"
                        className="rounded-lg text-lg bg-[#FFB23C] hover:bg-opacity-80 box-border leading-150 text-blue-dark py-1 px-4 font-bold"
                      >
                        Sign Transaction
                        <i className="fa-solid fa-arrow-right  ml-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-wrapper">
              <div className="modal rounded-2xl">
                <div className="clear"></div>
                <div className="content">
                  <div
                    data-v-2ee55a73
                    className="relative bg-white dark:bg-[#000e24] rounded-xl shadow-xl px-7 sm:px-10 md:px-20 py-10 max-w-3xl"
                    style={{ "min-height": "333px" }}
                  >
                    <div className="btn-close" onClick={this.popup_close}></div>
                    <div className="flex justify-center mt-5 mb-2">
                      <img
                        id="image_popup"
                        src="/images/monkey.png"
                        className="w-[250px] "
                        alt="product"
                      />
                    </div>
                    <div
                      className="text-[#0F0F4D] text-xl font-[700]"
                      id="name_popup"
                    ></div>
                    <div className="text-blue-600 font-[700] text-xl">
                      Project
                    </div>
                    <div
                      className="border h-[40px] w-fit m-auto rounded-[10px] bg-gray-300 p-2 mb-2 text-[red]"
                      id="varified_status_popup"
                    ></div>
                    <div className="text-blue-600 font-[700] text-xl">
                      Policy ID
                    </div>
                    <div
                      className="border h-[40px] w-full rounded-[10px] bg-gray-300 p-2 mb-2"
                      id="policyid_popup"
                    ></div>
                    <div className="text-blue-600 font-[700] text-xl mb-2 "></div>
                    <div className="text-blue-600 font-[700] text-xl">
                      Fingerprint
                    </div>
                    <div className="flex justify-center">
                      <div className="border w-fit h-[40px] rounded-[10px] bg-gray-300 p-3 flex items-center">
                        <p id="fingerprint_popup"></p>
                      </div>
                    </div>
                    <div className="flex justify-center gap-3 m-5">
                      <a
                        target={"_blank"}
                        data-v-098e79de
                        className="cardanoscan w-fit text-lg leading-150 box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-[#FFB23C] text-blue-dark dark:text-yellow-700 py-1 px-4 font-bold"
                      >
                        View Asset on cardanoscan.io
                        <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                      </a>{" "}
                    </div>
                    <div className="flex justify-center gap-3 m-5">
                      <a
                        target={"_blank"}
                        data-v-098e79de
                        className="poolpm w-fit text-lg leading-150 box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-[#FFB23C] text-blue-dark dark:text-yellow-700 py-1 px-4 font-bold"
                      >
                        View Asset on pool.pm
                        <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                      </a>{" "}
                    </div>
                  </div>
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
                            {this.state.select_ada / 1000000}
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
                    {!this.state.isnftselected && (
                      <div
                        data-v-77d1d4d5
                        className="trade-nfts flex flex-row-reverse overflow-x-auto"
                      >
                        <div
                          data-v-77d1d4d5
                          className="flex w-full flex-nowrap"
                        >
                          <div
                            data-v-77d1d4d5
                            className="w-full text-center font-light text-gray-400 dark:text-gray-regular pt-8"
                            style={{ height: "128px" }}
                          >
                            Your haven't selected any Native Assets.
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.isnftselected && (
                      <div
                        data-v-77d1d4d5
                        className="trade-nfts flex flex-row-reverse overflow-x-auto"
                      >
                        {this.state.selected_assest.map((nft, i) => (
                          <div
                            data-v-77d1d4d5
                            className="flex gap-2 flex-nowrap"
                          >
                            <div
                              data-v-77d1d4d5
                              className="p-1.5 group relative bg-gray-lightest dark:bg-blue-darker rounded-lg"
                              style={{}}
                            >
                              <div
                                data-v-77d1d4d5
                                className="image-select flex flex-col min-h-full w-28"
                              >
                                <div
                                  data-v-77d1d4d5
                                  className="h-24 w-24 mx-auto img-container overflow-hidden relative"
                                >
                                  <img
                                    data-v-77d1d4d5
                                    data-loading="https://app.tradingtent.io/images/loading_mask.svg"
                                    data-error="https://app.tradingtent.io/images/loading_error.svg"
                                    alt=""
                                    className="absolute object-cover object-center w-full h-full rounded"
                                    src={nft.image}
                                    lazy="loaded"
                                  />
                                </div>{" "}
                                <div
                                  data-v-77d1d4d5
                                  className="flex-grow flex flex-col justify-center"
                                >
                                  <p
                                    data-v-77d1d4d5
                                    className="text-xs pt-0.5 text-red line-clamp-1 text-center"
                                  >
                                    {nft.verified ? (
                                      <div className="text-sm nftverified">
                                        <i
                                          data-v-37376aa6=""
                                          class="far fa-check-circle text-blue-meta"
                                        ></i>{" "}
                                        {nft.tentname}
                                      </div>
                                    ) : (
                                      "Unverified"
                                    )}
                                  </p>{" "}
                                  {/**/}{" "}
                                  <p
                                    data-v-77d1d4d5
                                    className="text-xs font-medium text-blue-dark dark:text-gray-lightest text-center break-all line-clamp-2 w-full"
                                  >
                                    {nft.name}
                                  </p>
                                </div>
                              </div>{" "}
                              <div
                                data-v-77d1d4d5
                                className="absolute backdrop-filter rounded-lg backdrop-blur-sm bg-backdrop group-hover:block hidden inset-0"
                              >
                                <div
                                  data-v-77d1d4d5
                                  className="flex h-full flex-col p-2 justify-center gap-5 items-center "
                                >
                                  <button
                                    data-v-77d1d4d5
                                    type="button"
                                    className="bg-white text-gray-darker hover:bg-blue-meta hover:text-white text-sm font-medium rounded-lg py-1.5 px-3 w-full"
                                    onClick={() => {
                                      this.popup_open(nft);
                                    }}
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>{" "}
                <div
                  data-v-77d1d4d5
                  className="separator flex items-center flex-grow-0"
                >
                  <div
                    data-v-77d1d4d5
                    className="mx-auto relative flex items-center"
                  >
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
                            {this.state.opp_ada / 1000000}
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
                    {!this.state.isnftoppselected && (
                      <div
                        data-v-77d1d4d5
                        className="trade-nfts flex overflow-x-auto"
                        style={{ marginRight: "0px", marginLeft: "132px" }}
                      >
                        <div
                          data-v-77d1d4d5
                          className="flex w-full flex-nowrap"
                        >
                          <div
                            data-v-77d1d4d5
                            className="w-full text-center font-light text-gray-400 pt-8"
                            style={{ height: "128px" }}
                          >
                            Your trade partner hasn't selected any Native
                            Assets.
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="oppnftselect">
                      {this.state.opp_assest.map((nft, i) => (
                        <div data-v-77d1d4d5 className="flex gap-2 flex-nowrap">
                          <div
                            data-v-77d1d4d5
                            className="p-1.5 group relative bg-gray-lightest dark:bg-blue-darker rounded-lg"
                            style={{}}
                          >
                            <div
                              data-v-77d1d4d5
                              className="image-select flex flex-col min-h-full w-28 p-[6px]"
                            >
                              <div
                                data-v-77d1d4d5
                                className="h-24 w-24 mx-auto img-container overflow-hidden relative"
                              >
                                <img
                                  data-v-77d1d4d5
                                  data-loading="https://app.tradingtent.io/images/loading_mask.svg"
                                  data-error="https://app.tradingtent.io/images/loading_error.svg"
                                  alt=""
                                  className="absolute object-cover object-center w-full h-full rounded"
                                  src={nft.image}
                                  lazy="loaded"
                                />
                              </div>{" "}
                              <div
                                data-v-77d1d4d5
                                className="flex-grow flex flex-col justify-center"
                              >
                                <p
                                  data-v-77d1d4d5
                                  className="text-xs pt-0.5 text-red line-clamp-1 text-center"
                                >
                                  {nft.verified ? (
                                    <div className="text-sm nftverified">
                                      <i
                                        data-v-37376aa6=""
                                        class="far fa-check-circle text-blue-meta"
                                      ></i>{" "}
                                      {nft.tentname}
                                    </div>
                                  ) : (
                                    "Unverified"
                                  )}
                                </p>{" "}
                                {/**/}{" "}
                                <p
                                  data-v-77d1d4d5
                                  className="text-xs font-medium text-blue-dark dark:text-gray-lightest text-center break-all line-clamp-2 w-full"
                                >
                                  {nft.name}
                                </p>
                              </div>
                            </div>{" "}
                            <div
                              data-v-77d1d4d5
                              className="absolute backdrop-filter rounded-lg backdrop-blur-sm bg-backdrop group-hover:block hidden inset-0"
                            >
                              <div
                                data-v-77d1d4d5
                                className="flex h-full flex-col p-2 justify-center gap-5 items-center "
                              >
                                <button
                                  data-v-77d1d4d5
                                  type="button"
                                  className="bg-white text-gray-darker hover:bg-blue-meta hover:text-white text-sm font-medium rounded-lg py-1.5 px-3 w-full dark:text-black"
                                  onClick={() => {
                                    this.popup_open(nft);
                                  }}
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  }
}
