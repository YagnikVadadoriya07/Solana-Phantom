import React, { useEffect } from "react";
import "../css/about.css";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container-fluid text-center  text-white h-fit px-auto mt-20">
        <div className="first-heading flex justify-center">
          <h1 className="font-bold text-7xl mb-[50px]">
            By Collectors, for Collectors
          </h1>
        </div>

        <div className="basic-info flex items-center justify-center bg-[#0f0f4d] w-3/5 mx-auto rounded-3xl">
          <div className="para flex items-center justify-between">
            <div className="flex flex-col px-4">
              <p className="text-left font-medium text-2xl leading-[1.4] box-border">
                Tent is a service that allows users to live-trade native Cardano
                assets (NFTs, Tokens and/or ADA) in a single transaction easily,
                securely, instantly.
              </p>
              <br />
              <p className="text-left box-border text-base leading-6">
                As collectors first and foremost, we love selling, buying and
                trading NFTs. Through first hand experience, it was apparent
                that the trading part was far from optimal.
              </p>
            </div>

            <img
              src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/61e742efaf71ee2260593029_Marhmello.png"
              alt="imo"
              className="w-96 py-2 pr-4 ml-8 max-w-[100%] px-6 align-middle"
            />
          </div>

          <div className="mt-10"></div>
        </div>

        <div className="second-heading font-bold text-[56px]">
          <h2>The Team behind Tent</h2>
        </div>

        <a
          href="http://fort-gotten.com"
          target="_blank"
          rel="noreferrer"
          className="w-[320px] rounded-xl min-w-full inline-block bg-transparent box-border"
        >
          <img
            src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/61e8a0faf7a4409850abefe9_fort-gotten-logo.svg"
            loading="lazy"
            alt="imo"
            className="about-fg-logo mx-auto py-[25px] px-[35px]"
          />
        </a>

        <p className="about-team-intro my-12">
          Tent is brought to you by the team behind the{" "}
          <a
            href="http://fort-gotten.com"
            target="_blank"
            rel="noreferrer"
            className="link-2"
          >
            <span className="yellow-bold text-[#ffb23c] font-bold text-lg">
              Fort Gotten NFT project.
            </span>
          </a>
          <br />
          <a
            href="http://fort-gotten.com"
            target="_blank"
            rel="noreferrer"
            className="link text-lg text-[silver] underline"
          >
            Click here
          </a>{" "}
          to learn more about the project and the team.
        </p>

        <div className="team flex justify-center mb-40 flex-wrap">
          <div className="team-member">
            <img
              src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/61e8a48f1222eef1fe4a3262_team-horia.jpg"
              loading="lazy"
              alt="imo"
              className="team-profile-pic"
            />
            <a
              href="https://twitter.com/astr0k1d"
              target="_blank"
              rel="noreferrer"
              className="team-social-link inline-block"
            >
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/61ca5a5964049f2fe75ca258_icon-twitter.svg"
                loading="lazy"
                alt="imo"
                className="team-social-link-img"
              />
            </a>
            <h3 className="team-name">Horia Schiau</h3>
            <div className="team-role">Head of Product</div>
          </div>
          <div className="team-member">
            <img
              src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/61e8a48f70ec3916535be285_team-arnecke.jpg"
              loading="lazy"
              alt="hrllo"
              className="team-profile-pic"
            />
            <a
              href="https://twitter.com/arnecke"
              target="_blank"
              rel="noreferrer"
              className="team-social-link inline-block"
            >
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/61ca5a5964049f2fe75ca258_icon-twitter.svg"
                loading="lazy"
                alt="imo"
                className="team-social-link-img"
              />
            </a>
            <h3 className="team-name">Carlos Arnecke</h3>
            <div className="team-role">Product Design</div>
          </div>
          <div className="team-member">
            <img
              src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/61e8a48fb7c3bc50d0c6e7a7_team-sampo.jpg"
              loading="lazy"
              alt="imo"
              className="team-profile-pic"
            />
            <a
              href="https://twitter.com/___sampo___"
              target="_blank"
              rel="noreferrer"
              className="team-social-link inline-block"
            >
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/61ca5a5964049f2fe75ca258_icon-twitter.svg"
                loading="lazy"
                alt="imo"
                className="team-social-link-img"
              />
            </a>
            <h3 className="team-name">Sam Portillo</h3>
            <div className="team-role">Product Strategy</div>
          </div>
          <div className="team-member">
            <img
              src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/61e8a48f41558627bdc4baf8_team-toto.jpg"
              loading="lazy"
              alt="imo"
              className="team-profile-pic "
            />
            <a
              href="https://twitter.com/totomakes"
              target="_blank"
              rel="noreferrer"
              className="team-social-link inline-block"
            >
              <img
                src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/61ca5a5964049f2fe75ca258_icon-twitter.svg"
                loading="lazy"
                alt="imo"
                className="team-social-link-img"
              />
            </a>
            <h3 className="team-name">Roberto Burgos</h3>
            <div className="team-role">Product Marketing</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
