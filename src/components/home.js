import React from "react";
import "../css/home.css";
import "../css/animate.css";
import ScrollAnimation from "react-animate-on-scroll";
import Faqs from "./faqs";

const srcimage = ["/images/Eternl1.png"];
const srcImage1 = ["/images/path16.png"];

const Home = () => {
  return (
    <>
      {/* first */}
      <div className="container-fluid m-auto my-14 ">
        {/* Home Page */}
        <div className="grid 2xl:grid-cols-2 justify-between md:justify-center sm:grid-cols-1 md:grid-cols-2 mt-28">
          <div className="md:flex-[0.5] flex-initial items-center justify-center ">
            <h1 className="text-white text-5xl">
              <div className="waviy 2xl:mx-28">
                <span style={{ "--i": "1" }}>L</span>
                <span style={{ "--i": "2" }}>i</span>
                <span style={{ "--i": "3" }}>v</span>
                <span style={{ "--i": "4" }}>e</span>
                <span style={{ "--i": "5" }}>-</span>
                <span style={{ "--i": "6" }}>t</span>
                <span style={{ "--i": "7" }}>r</span>
                <span style={{ "--i": "8" }}>a</span>
                <span style={{ "--i": "9" }}>d</span>
                <span style={{ "--i": "10" }}>e</span>
                <br />
                <span className="mt-3" style={{ "--i": "11" }}>
                  C
                </span>
                <span style={{ "--i": "12" }}>a</span>
                <span style={{ "--i": "13" }}>r</span>
                <span style={{ "--i": "14" }}>d</span>
                <span style={{ "--i": "15" }}>a</span>
                <span style={{ "--i": "16" }}>n</span>
                <span style={{ "--i": "17" }}>o</span>
                <br />
                <span className="mt-3" style={{ "--i": "18" }}>
                  A
                </span>
                <span style={{ "--i": "19" }}>s</span>
                <span style={{ "--i": "20" }}>s</span>
                <span style={{ "--i": "21" }}>e</span>
                <span style={{ "--i": "22" }}>t</span>
                <span style={{ "--i": "23" }}>s</span>
              </div>
            </h1>
            <div className=" my-5 text-2xl text-[#FFB23C]  2xl:mx-28 fontRegular">
              ⏱ Instant 🔒&nbsp;Secure ✅&nbsp;One&nbsp;Transaction
            </div>
            <div style={{ opacity: "1" }} href="/" className="w-inline-block ">
              <div className="buttonBorder mx-28">
                <button className="text-white hover:text-[#FFB23C] p-2 text-2xl  fontRegular">
                  🏕️ Open a Tent
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            <img src="/images/Tent-Hero (1) 1.png" alt="tentHero" />
          </div>
        </div>

        {/* second */}
        <div className="2xl:-mt-52 sm:mt-20">
          <img src="/images/hosky-coin (5).png" alt="hosky" className="mt-36" />
          <img
            src="/images/Ada Coin (1).png"
            alt="Coin"
            className="2xl:mx-10 -mt-80"
          />
          <img
            src="/images/_polaroid-NFT (14).png"
            alt="polaNft"
            className="2xl:mx-48 -mt-4 mx-24"
          />
        </div>
        <div className="flex flex-row-reverse mr-20">
          <img src="/images/_polaroid-NFT (19).png" alt="poloNft" />
        </div>
        <div className="flex justify-end -mt-40">
          <img src="/images/sundae-swap-coin (5).png" alt="swapCoin" />
        </div>
        <div className="-mt-20">
          <img src="/images/Mushrooms_3-p-500 1.png" alt="mashroom" />
        </div>

        {/* thired */}
        <div className="grid justify-items-center  2xl:-mt-40 ">
          <div>
            <ScrollAnimation animateIn="slideInUp" duration={1.5} delay={0}>
              <img src="/images/icon-trade 1.png" alt="tradeIcon" />
            </ScrollAnimation>
          </div>
          <div className="text-[#FFB23C] text-4xl font-semibold opacity-100 mt-10 text-center  fontRegular">
            <ScrollAnimation animateIn="slideInUp" duration={1.5} delay={0}>
              Trading assets should be simple.
            </ScrollAnimation>
          </div>
          <div className="text-[#0076FF] text-3xl font-semibold opacity-100 mt-10 text-center  fontRegular">
            <ScrollAnimation animateIn="slideInUp" duration={1.5} delay={0}>
              {" "}
              Now, it is.
              <span className="text-white">
                {" "}
                Trade Cardano NFTs & Tokens with just a link.
              </span>
            </ScrollAnimation>
          </div>
          <div className="mt-10  fontRegular">
            <ScrollAnimation animateIn="slideInUp" duration={1.5} delay={0}>
              <div className="grid justify-items-center 2xl:grid-cols-3 text-xl text-white font-normal">
                <div style={{ opacity: "1" }} className="benefit">
                  🔓 No Locked Assets
                </div>
                <div style={{ opacity: "1" }} className="benefit">
                  ⏱️ No Waiting
                </div>
                <div style={{ opacity: "1" }} className="benefit">
                  🔐️ Secure Transactions
                </div>
                <div style={{ opacity: "1" }} className="benefit">
                  ✅ Verified Policy ID’s
                </div>
                <div style={{ opacity: "1" }} className="benefit">
                  ⚖️ Honor Royalties
                </div>
                <div style={{ opacity: "1" }} className="benefit">
                  🖼️ Multiple Assets
                </div>
              </div>
            </ScrollAnimation>
            <img
              src="/images/Cup-p-500.png"
              alt="Cup"
              className="mt-10 -mx-72 -mt-56"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-row-reverse mr-32 2xl:-mt-20">
            <img src="/images/Guitar-p-500.png" alt="poloNft" />
          </div>
          <div className="flex justify-end -mt-28">
            <img src="/images/polaroid-NFT (4).png" alt="swapCoin" />
          </div>
          <div className="flex justify-start -mt-64">
            <img src="/images/_polaroid-NFT (13) 1.png" alt="polaNft" />
          </div>
          <div className="flex justify-start -mt-40">
            <img src="/images/-handle-coin (4) 1.png" alt="polaNft" />
          </div>
          <div className="flex justify-end -mt-48 mr-40">
            <img src="/images/cardano-coin (6) 1.png" alt="coinBase" />
          </div>
        </div>

        {/* four */}
        <div className="grid justify-items-center 2xl:-mt-80">
          <div>
            <h1 className="text-white fontRegular1 text-[56px]">
              <ScrollAnimation
                animateIn="slideInUp"
                animateOut="fadeOut"
                duration={1.5}
                delay={0}
              >
                How to Trade?
              </ScrollAnimation>
            </h1>
          </div>
          <ScrollAnimation
            animateIn="slideInUp"
            animateOut="fadeOut"
            duration={1.5}
            delay={0}
          >
            <div className="grid 2xl:grid-cols-3 items-center text-lg text-white  mt-10  fontRegular">
              <div
                style={{ opacity: "1" }}
                className="benefitBorder hover:text-[#FFB23C]"
              >
                1. Open & Share a Tent
              </div>
              <div
                style={{ opacity: "1" }}
                className="benefitBorder hover:text-[#FFB23C] "
              >
                2. Select Assets to trade
              </div>
              <div
                style={{ opacity: "1" }}
                className="benefitBorder hover:text-[#FFB23C]"
              >
                3. Approve the Transaction
              </div>
            </div>
          </ScrollAnimation>
          <div className="mt-10 ">
            <ScrollAnimation
              animateIn="slideInUp"
              animateOut="fadeOut"
              duration={1.5}
              delay={0}
            >
              <img src="/images/_Tent-Open-A-Tent 1.png" alt="herobg" />
            </ScrollAnimation>
          </div>
          <ScrollAnimation
            animateIn="slideInUp"
            animateOut="fadeOut"
            duration={1.5}
            delay={0}
          >
            <div className="flex justify-center mt-10 gap-4 flex-wrap  fontRegular">
              <h1 className="text-[#FFB23C]  font-normal text-[36px] font-[600]">
                Pricing
              </h1>
              <div
                style={{ opacity: "1" }}
                className="benefit hover:text-[#FFB23C] text-center text-white w-64"
              >
                Flat Fee: 5 ADA
              </div>
              <div className="textColor text-[14px] font-[400] mt-3">
                Per trade
                <br />
                per person
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="slideInUp"
            animateOut="fadeOut"
            duration={1.5}
            delay={0}
          >
            <div className="flex justify-center mt-10 gap-4 flex-wrap  fontRegular">
              <h1 className="text-white  font-normal text-[24px] mt-3 font-[500]">
                Supported Wallets
              </h1>
              <div
                style={{ opacity: "1" }}
                className="benefitBorder hover:text-[#FFB23C] text-center text-white w-40"
              >
                Nami
                <img src={srcImage1} alt="img" className="-mt-6" />
              </div>
              <div
                style={{ opacity: "1" }}
                className="benefitBorder hover:text-[#FFB23C] text-center text-white w-40"
              >
                Eternl
                <img src={srcimage} alt="img" className="-mt-6" />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      {/* second Section */}
      <div className="container-fluid m-auto colornewSection">
        <div className="flex justify-center">
          <h1 className="text-white  text-center text-[56px]  fontRegular1">
            <ScrollAnimation
              animateIn="slideInUp"
              animateOut="fadeOut"
              duration={1.5}
              delay={0}
            >
              Trustless,
              <br />
              Seamless, Painless.
            </ScrollAnimation>
          </h1>
        </div>
        <ScrollAnimation
          animateIn="slideInUp"
          animateOut="fadeOut"
          duration={1.5}
          delay={0}
        >
          <div className="flex justify-center text-xl text-white font-normal mt-10 flex-wrap">
            <div
              style={{ opacity: "1" }}
              className="benefit w-64  text-center h-22"
            >
              +5,000
              <br />
              Tents Opened
            </div>
            <div
              style={{ opacity: "1" }}
              className="benefit  w-64 text-center h-22"
            >
              +1.8 Million
              <br />
              ADA Traded
            </div>
            <div
              style={{ opacity: "1" }}
              className="benefit  w-64 text-center h-22"
            >
              +7,000
              <br />
              Assets Traded
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="slideInUp"
          animateOut="fadeOut"
          duration={1.5}
          delay={0}
        >
          <div className="flex justify-center mb-10 ">
            <div className="text-[#FFB23C] text-4xl font-semibold opacity-100 mt-10 text-center">
              Trading assets should be simple.
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="slideInUp"
          animateOut="fadeOut"
          duration={1.5}
          delay={0}
        >
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="profileBorder">
              <div className="flex items-center space-x-4 p-5">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/images/pro1.png"
                    alt="Neil"
                  />
                </div>
                <div className="flex-0 min-w-0">
                  <p className="text-[#69AEFF] font-normal text-center text-[15px] font-[400]">
                    @jackfriks
                  </p>
                </div>
              </div>
              <div className="mx-5 font-normal font-[400] text-[19px] text-[#FFFFCC] leading-[22px] w-80">
                "TRADING TENT IS MY SAVIOR, 100% SUCCESS RATE, NO MORE SKETCHY
                DISCORD ESCROW."
              </div>
              <div className="flex justify-end">
                <img
                  src="/images/Vector.png"
                  alt="twitter"
                  className="p-6 w-20 mt-10"
                />
              </div>
            </div>
            <div className="profileBorder">
              <div className="flex items-center space-x-4 p-5">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/images/pro2.png"
                    alt="Neil"
                  />
                </div>
                <div className="flex-0 min-w-0">
                  <p className="text-[#69AEFF] font-normal text-center text-[15px] font-[400]">
                    @theuttermost
                  </p>
                </div>
              </div>
              <div className="mx-5 font-normal font-[400] text-[19px] text-[#FFFFCC] leading-[22px] w-80">
                "Just used this app for a trade of over 40 NFTs and 10k+ ADA.
              </div>
              <div className="mx-5 my-2 font-normal font-[400] text-[19px] text-[#FFFFCC] leading-[22px] w-80">
                Worked like a charm!! BEAUTIFUL APP!!"
              </div>
              <div className="flex justify-end">
                <img
                  src="/images/Vector (1).png"
                  alt="twitter"
                  className="p-6 w-20"
                />
              </div>
            </div>
            <div className="profileBorder">
              <div className="flex items-center space-x-4 p-5">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/images/pro3.png"
                    alt="Neil"
                  />
                </div>
                <div className="flex-0 min-w-0">
                  <p className="text-[#69AEFF] font-normal text-center text-[15px] font-[400]">
                    @Claynaldo_7
                  </p>
                </div>
              </div>
              <div className="mx-5 font-normal font-[400] text-[19px] text-[#FFFFCC] leading-[22px] w-80">
                "I used Trading Tent for the first time yesterday.
              </div>
              <div className="mx-5 my-2 font-normal font-[400] text-[19px] text-[#FFFFCC] leading-[22px] w-80">
                1 - Wow
                <br /> 2 - Seamless
                <br /> 3 - 🔥"
              </div>
              <div className="flex justify-end">
                <img
                  src="/images/Vector.png"
                  alt="twitter"
                  className="p-6 -mt-5 w-20"
                />
              </div>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="slideInUp"
          animateOut="fadeOut"
          duration={1.5}
          delay={0}
        >
          <div className="flex justify-center gap-4 my-10 flex-wrap">
            <div className="profileBorder">
              <div className="flex items-center space-x-4 p-5">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/images/pro4.png"
                    alt="Neil"
                  />
                </div>
                <div className="flex-0 min-w-0">
                  <p className="text-[#69AEFF] font-normal text-center text-[15px] font-[400]">
                    @ponziratti
                  </p>

                  <p className="text-[#69AEFF] font-normal text-center text-[15px] font-[400]">
                    (Ape Society Founder)
                  </p>
                </div>
              </div>
              <div className="mx-5 font-normal font-[400] text-[19px] text-[#FFFFCC] leading-[22px] w-80">
                "Stick to Trading Tent Please"
              </div>
              <div className="flex justify-end">
                <img
                  src="/images/Vector (1).png"
                  alt="twitter"
                  className="p-6 w-20 mt-10"
                />
              </div>
            </div>
            <div className="profileBorder">
              <div className="flex items-center space-x-4 p-5">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/images/pro6.png"
                    alt="Neil"
                  />
                </div>
                <div className="flex-0 min-w-0">
                  <p className="text-[#69AEFF] font-normal text-center text-[15px] font-[400]">
                    @Monad Alexander
                    <br />
                    (Unsigs Founder)
                  </p>
                </div>
              </div>
              <div className="mx-5 font-normal font-[400] text-[19px] text-[#FFFFCC] leading-[22px] w-80">
                "I think it's legit (:"
              </div>
              <div className="flex justify-end">
                <img
                  src="/images/Vector.png"
                  alt="twitter"
                  className="p-6 w-20  mt-10"
                />
              </div>
            </div>
            <div className="profileBorder">
              <div className="flex items-center space-x-4 p-5">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/images/pro5.png"
                    alt="Neil"
                  />
                </div>
                <div className="flex-0 min-w-0">
                  <p className="text-[#69AEFF] font-normal text-center text-[15px] font-[400]">
                    @jackfriks
                  </p>
                </div>
              </div>
              <div className="mx-5 font-normal font-[400] text-[19px] text-[#FFFFCC] leading-[22px] w-80">
                "Job well done, you have facilitated trades for me that would
                not have happened without Trading Tent, and I really appreciate
                that."
              </div>
              <div className="flex justify-end">
                <img
                  src="/images/Vector (1).png"
                  alt="twitter"
                  className="p-6 -mt-2 w-20"
                />
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* thierdsection */}
      <div className="container m-auto">
        <div className="flex justify-center">
          <h1 className="text-white text-center fontRegular1 text-[56px] ">
            <ScrollAnimation
              animateIn="slideInUp"
              animateOut="fadeOut"
              duration={1.5}
              delay={0}
            >
              Partnership & Integrations
            </ScrollAnimation>
          </h1>
        </div>
        <div className="flex justify-center mt-5">
          <p className="text-white text-center font-normal font-[500] text-[24px] leading-[28px] w-2/3 ">
            <ScrollAnimation
              animateIn="slideInUp"
              animateOut="fadeOut"
              duration={1.5}
              delay={0}
            >
              Get a custom trading link and empower your community to live-trade
              NFTs, Tokens and/or ADA live and in a single transaction directly
              between them.
            </ScrollAnimation>
          </p>
        </div>
        <div className="flex justify-center my-5">
          <h1 className="text-white text-center font-normal font-[700] text-[24px] ">
            <ScrollAnimation
              animateIn="slideInUp"
              animateOut="fadeOut"
              duration={1.5}
              delay={0}
            >
              Here are some of our partners
            </ScrollAnimation>
          </h1>
        </div>
        <div className="flex justify-center">
          <ScrollAnimation
            animateIn="slideInUp"
            animateOut="fadeOut"
            duration={1.5}
            delay={0}
          >
            <div className="partners-logos imglogos">
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/627c0dffbceb844998d51ffc_logo-chilled-kongs.png"
                loading="lazy"
                alt="logos"
                className="partner-logo kongs"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/627c0dfe408d7b52d8224c8f_logo-yummi.png"
                loading="lazy"
                alt="logos"
                className="partner-logo"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/627c0dff606d1c809d597642_logo-jack-friks.png"
                loading="lazy"
                alt="logos"
                className="partner-logo kongs"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/627c0dfe0b44bcaa0e889a64_logo-art-of-joseph.png"
                loading="lazy"
                alt="logos"
                className="partner-logo"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/627c0dff5ac7a59983e5c320_logo-paper-society.png"
                loading="lazy"
                alt="logos"
                className="partner-logo kongs"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a65524c7dd7bdae9b4a23_cardanothor.png"
                loading="lazy"
                sizes="(max-width: 479px) 80vw, (max-width: 767px) 152.25px, (max-width: 991px) 213.375px, 253.75px"
                srcSet="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a65524c7dd7bdae9b4a23_cardanothor-p-500.png 500w, https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a65524c7dd7bdae9b4a23_cardanothor.png 652w"
                alt="logos"
                className="partner-logo"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a671f59caecbacbf0c2d7_cnftbot.svg"
                loading="lazy"
                alt="logos"
                className="partner-logo"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/624c68a2ed3952d7cfceb594_wallet-bud-logo.svg"
                loading="lazy"
                alt="logos"
                className="partner-logo wallet-bud"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a65521ed6d5806d070932_lazyllamas.png"
                loading="lazy"
                sizes="(max-width: 479px) 72vw, (max-width: 767px) 125.625px, (max-width: 991px) 173.4375px, 209.375px"
                srcSet="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a65521ed6d5806d070932_lazyllamas-p-500.png 500w, https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a65521ed6d5806d070932_lazyllamas.png 510w"
                alt="logos"
                className="partner-logo"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a65522dfde801c0b84bf6_premierpioneer.png"
                loading="lazy"
                alt="logos"
                className="partner-logo pioneers"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/627c0dff74c430634807d740_logo-pond.png"
                loading="lazy"
                alt="logos"
                className="partner-logo pond"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a671f6015b641c07d7901_wenbot.svg"
                loading="lazy"
                alt="logos"
                className="partner-logo"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a65527e0acf6b572b43ab_duo.png"
                loading="lazy"
                alt="logos"
                className="partner-logo"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a628293f95fcd6b53bb26_cardano-village-logo.svg"
                loading="lazy"
                alt="logos"
                className="partner-logo c-village"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a6552869ddacc9f799762_dscrdmngmnt.png"
                loading="lazy"
                sizes="(max-width: 479px) 72vw, (max-width: 767px) 136.875px, (max-width: 991px) 190.3125px, 228.125px"
                srcSet="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a6552869ddacc9f799762_dscrdmngmnt-p-500.png 500w, https://assets.website-files.com/61ca490b8b35d020e5f3fee7/623a6552869ddacc9f799762_dscrdmngmnt.png 570w"
                alt="logos"
                className="partner-logo"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/627c0dffd37d1e09b8e124a9_logo-symc.png"
                loading="lazy"
                alt="logos"
                className="partner-logo"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/627c0dffd940afa1e53e0349_logo-world-of-cardano.png"
                loading="lazy"
                alt="logos"
                className="partner-logo kongs"
              />
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/627c0dff965fe921cf36787b_logo-teddy-troops.png"
                loading="lazy"
                alt="logos"
                className="partner-logo"
              />
            </div>
          </ScrollAnimation>
        </div>
        <div className="flex justify-center">
          <a href="/" className="button affiliate w-inline-block">
            <div className="button-text small">🏕️ Learn&nbsp;More</div>
          </a>
        </div>
      </div>

      {/* four */}
      <div className="container m-auto my-10">
        <ScrollAnimation
          animateIn="slideInUp"
          animateOut="fadeOut"
          duration={1.5}
          delay={0}
        >
          <div className="flex justify-center">
            <div className="grid grid-cols-2">
              <div>
                <h1 className="text-white font-normal font-[700] text-[32px]">
                  Join our Discord
                </h1>
                <p className=" mt-5 text-white  font-normal font-[400] text-[24px] w-96">
                  Learn about the latest developments and join an active
                  community interested in NFTs and trading!
                </p>
                <div
                  style={{ opacity: "1" }}
                  target="_blank"
                  rel="noreferrer "
                  className="w-inline-block "
                >
                  <div className="buttonBorder mt-3 ">
                    <button className="text-white  hover:text-[#FFB23C] mt-1 text-2xl font-normal font-[700]">
                      Join
                      <img
                        src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/61e6fa29324678dffd634c10_icon-discord-white.svg"
                        loading="lazy"
                        alt="discord"
                        className="mr-24 -mt-6 "
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <img
                  src="/images/plant.png"
                  alt="plant"
                  className="w-[550px]"
                />
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/*  faqs*/}
      <Faqs />

      {/* fort Gotten */}
      <div className="section fort-gotten">
        <div className="flex justify-center mt-20">
          <h1 className="text-center text-[56px] fomnt-normal font-[700] text-white">
            <ScrollAnimation
              animateIn="slideInUp"
              animateOut="fadeOut"
              duration={1.5}
              delay={0}
            >
              Fort Gotten
            </ScrollAnimation>
          </h1>
        </div>
        <div className="flex justify-center mt-5">
          <p className="text-center text-[24px] fomnt-normal font-[600] text-[#FFB23C]">
            <ScrollAnimation
              animateIn="slideInUp"
              animateOut="fadeOut"
              duration={1.5}
              delay={0}
            >
              Inspiring the next generation of creators.
            </ScrollAnimation>
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <p className="text-center text-[24px] fomnt-normal font-[600] text-white w-2/4">
            <ScrollAnimation
              animateIn="slideInUp"
              animateOut="fadeOut"
              duration={1.5}
              delay={0}
            >
              Fort Gotten is the NFT project from which Tent was born: A project
              all about creativity, community and storytelling. Join us for the
              second episode and reconnect with your inner child, while also
              enjoying a <span className="text-[#FFB23C]">50% discount</span> on
              all trading fees.
            </ScrollAnimation>
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <a href="/" className="button affiliate w-inline-block">
            <div className="button-text small">🏕️ Learn&nbsp;More</div>
          </a>
        </div>
        <div className="flex justify-center">
          <div className="fort-gotten-kidz">
            <img
              src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/625b0a57cd143b730e337b0e_Barro-1%201.png"
              loading="lazy"
              sizes="(max-width: 479px) 66vw, (max-width: 767px) 51vw, (max-width: 991px) 400px, 500px"
              srcSet="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/625b0a57cd143b730e337b0e_Barro-1%201-p-500.png 500w, https://assets.website-files.com/61ca490b8b35d020e5f3fee7/625b0a57cd143b730e337b0e_Barro-1%201-p-800.png 800w, https://assets.website-files.com/61ca490b8b35d020e5f3fee7/625b0a57cd143b730e337b0e_Barro-1%201.png 1080w"
              alt="helo"
              className="fg-kid"
            />
            <img
              src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/625b0a560d2f6f18bd73b2d2_Otoco-02%201.png"
              loading="lazy"
              sizes="(max-width: 479px) 75vw, (max-width: 767px) 56vw, (max-width: 991px) 450px, 550px"
              srcSet="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/625b0a560d2f6f18bd73b2d2_Otoco-02%201-p-500.png 500w, https://assets.website-files.com/61ca490b8b35d020e5f3fee7/625b0a560d2f6f18bd73b2d2_Otoco-02%201-p-800.png 800w, https://assets.website-files.com/61ca490b8b35d020e5f3fee7/625b0a560d2f6f18bd73b2d2_Otoco-02%201.png 1080w"
              alt="helo"
              className="fg-kid center"
            />
            <img
              src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/625b0a56d62a4f4be41c23d8_Oola-05%201.png"
              loading="lazy"
              sizes="(max-width: 479px) 66vw, (max-width: 767px) 51vw, (max-width: 991px) 400px, 500px"
              srcSet="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/625b0a56d62a4f4be41c23d8_Oola-05%201-p-500.png 500w, https://assets.website-files.com/61ca490b8b35d020e5f3fee7/625b0a56d62a4f4be41c23d8_Oola-05%201-p-800.png 800w, https://assets.website-files.com/61ca490b8b35d020e5f3fee7/625b0a56d62a4f4be41c23d8_Oola-05%201.png 1080w"
              alt="helo"
              className="fg-kid"
            />
          </div>
        </div>
      </div>

      {/* add new */}
      <div className="announcement_bar">
        <div>
          <a
            href="http://fort-gotten.com"
            target="_blank"
            rel="noreferrer"
            className="announcement-link"
          >
            🪖 Get a Fort Gotten Kid and&nbsp;get 50%&nbsp;Discount on all
            Trades
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
