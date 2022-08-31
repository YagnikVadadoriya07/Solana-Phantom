import React, { useEffect } from "react";
import "../css/faqs.css";
const openAcr = (e) => {
  e.target.querySelector("i").classList.toggle("rotateIcon");
  e.target.nextSibling.classList.toggle("applyHeight");
};
const Faqs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* faqs */}
      <div className="container m-auto  mt-20 flex justify-center   fontRegular1">
        <div className="content1 faq ">
          <div className="faq-block">
            <h2
              data-w-id="8f24f028-501e-5e27-7357-138520d39ccf"
              className="title big-white"
              style={{
                opacity: "1",
                WebkitTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                msTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                WebkitTransformStyle: "preserve-3d",
                msTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
            >
              Frequently Asked Questions
            </h2>
            <div
              className="faq-unit"
              style={{
                opacity: "1",
                WebkitTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                msTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                WebkitTransformStyle: "preserve-3d",
                msTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="faq-question" onClick={openAcr}>
                <div>What is Tent?</div>
                <div
                  className="dropdown-icon w-icon-dropdown-toggle"
                  style={{
                    WebkitTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    msTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    WebkitTransformStyle: "preserve-3d",
                    msTransformStyle: "preserve-3d",
                    transformStyle: "preserve-3d",
                  }}
                />
                <i className="fa-solid fa-chevron-down text-white"></i>
              </div>
              <div className="faq-content" style={{ height: "0px" }}>
                <p className="faq-answer ">
                  Tent is a live trading system. Everyone can open a Tent using
                  a compatible wallet and share the link so another user can
                  join.
                  <br />
                  <br />A tent is a room where 2 users can exchange any native
                  Cardano asset in a single transaction. This transaction will
                  only happen if both parties agree and sign.
                  <br />
                  <br />
                  No smart contracts, no locked assets, no waiting. Just a
                  single Cardano transaction directly between 2 users.
                </p>
              </div>
            </div>
            <div
              className="faq-unit"
              style={{
                opacity: "1",
                WebkitTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                msTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                WebkitTransformStyle: "preserve-3d",
                msTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="faq-question" onClick={openAcr}>
                <div>What's the price of using Tent?</div>
                <div
                  className="dropdown-icon w-icon-dropdown-toggle"
                  style={{
                    WebkitTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    msTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    WebkitTransformStyle: "preserve-3d",
                    msTransformStyle: "preserve-3d",
                    transformStyle: "preserve-3d",
                  }}
                />
                <i className="fa-solid fa-chevron-down text-white"></i>
              </div>
              <div className="faq-content" style={{ height: "0px" }}>
                <p className="faq-answer">
                  Tent charges a flat fee of 5ada per trade, per person. The
                  amount of assets and/or ADA doesn't affect the price.
                  <br />‍<br />
                  If you hold a Fort Gotten Kid in your wallet, you will receive
                  a 50% discount on the trading fee (2.5 ADA)
                </p>
              </div>
            </div>
            <div
              className="faq-unit"
              style={{
                opacity: "1",
                WebkitTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                msTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                WebkitTransformStyle: "preserve-3d",
                msTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="faq-question" onClick={openAcr}>
                <div>Which wallets does Tent support?</div>
                <div
                  className="dropdown-icon w-icon-dropdown-toggle"
                  style={{
                    WebkitTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    msTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    WebkitTransformStyle: "preserve-3d",
                    msTransformStyle: "preserve-3d",
                    transformStyle: "preserve-3d",
                  }}
                />
                <i className="fa-solid fa-chevron-down text-white"></i>
              </div>
              <div className="faq-content" style={{ height: "0px" }}>
                <p className="faq-answer">
                  We support every wallet using the standard for dApp connectors
                  (CIP-0030). For the moment, that means:&nbsp;Nami and ETRNL.
                  As more wallets start using the standard, more wallets will be
                  supported by Tent.
                </p>
              </div>
            </div>
            <div
              className="faq-unit"
              style={{
                opacity: "1",
                WebkitTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                msTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                WebkitTransformStyle: "preserve-3d",
                msTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="faq-question" onClick={openAcr}>
                <div>Is Tent using smart contracts?</div>
                <div
                  className="dropdown-icon w-icon-dropdown-toggle"
                  style={{
                    WebkitTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    msTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    WebkitTransformStyle: "preserve-3d",
                    msTransformStyle: "preserve-3d",
                    transformStyle: "preserve-3d",
                  }}
                />
                <i className="fa-solid fa-chevron-down text-white"></i>
              </div>
              <div className="faq-content" style={{ height: "0px" }}>
                <p className="faq-answer">
                  It’s not. Tent leverages Cardano’s eUTXO model and
                  multi-signature transactions to facilitate trades. This
                  optimizes a trade to the absolute minimum number of
                  transactions (1) and eliminates the need to lock assets.
                </p>
              </div>
            </div>
            <div
              className="faq-unit"
              style={{
                opacity: "1",
                WebkitTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                msTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                WebkitTransformStyle: "preserve-3d",
                msTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="faq-question" onClick={openAcr}>
                <div>Does Tent have verified projects?</div>
                <div
                  className="dropdown-icon w-icon-dropdown-toggle"
                  style={{
                    WebkitTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    msTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    WebkitTransformStyle: "preserve-3d",
                    msTransformStyle: "preserve-3d",
                    transformStyle: "preserve-3d",
                  }}
                />
                <i className="fa-solid fa-chevron-down text-white"></i>
              </div>
              <div className="faq-content" style={{ height: "0px" }}>
                <p className="faq-answer">
                  We have a project verification system to enable users to
                  easily distinguish known projects and fake copies. They will
                  be visually identified through a checkmark.
                  <br />
                  <br />
                  If you want a project to be verified: click{" "}
                  <a
                    href="https://forms.gle/vynr8PiGBNWEuZu27"
                    target="_blank"
                    rel="noreferrer"
                    className="link-faq"
                  >
                    here
                  </a>
                  .
                </p>
              </div>
            </div>
            <div
              className="faq-unit"
              style={{
                opacity: "1",
                WebkitTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                msTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                WebkitTransformStyle: "preserve-3d",
                msTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="faq-question" onClick={openAcr}>
                <div>Can I trade unverified assets?</div>
                <div
                  className="dropdown-icon w-icon-dropdown-toggle"
                  style={{
                    WebkitTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    msTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    WebkitTransformStyle: "preserve-3d",
                    msTransformStyle: "preserve-3d",
                    transformStyle: "preserve-3d",
                  }}
                />
                <i className="fa-solid fa-chevron-down text-white"></i>
              </div>
              <div className="faq-content" style={{ height: "0px" }}>
                <p className="faq-answer">
                  It's possible to trade unverified assets, but it has to be
                  enabled manually&nbsp;as we only display verified by default.
                  <br />
                  <br />
                  You can enable this option by clicking on the options icon in
                  a Tent.
                </p>
              </div>
            </div>
            <div
              className="faq-unit"
              style={{
                opacity: "1",
                WebkitTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                msTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                WebkitTransformStyle: "preserve-3d",
                msTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="faq-question" onClick={openAcr}>
                <div>Is Tent secure?</div>
                <div
                  className="dropdown-icon w-icon-dropdown-toggle"
                  style={{
                    WebkitTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    msTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    WebkitTransformStyle: "preserve-3d",
                    msTransformStyle: "preserve-3d",
                    transformStyle: "preserve-3d",
                  }}
                />
                <i className="fa-solid fa-chevron-down text-white"></i>
              </div>
              <div className="faq-content" style={{ height: "0px" }}>
                <p className="faq-answer">
                  Tent only facilitates a transaction between two users. This
                  transaction is approved and signed directly by the users.
                  <br />
                  <br />
                  In this way, we rely on the security provided by the wallets,
                  as they will display the full output of the transaction before
                  prompting for the signature.
                  <br />
                  <br />
                  All transactions are final once submitted to the blockchain,
                  so please make sure to double check the transaction details.
                </p>
              </div>
            </div>
            <div
              className="faq-unit"
              style={{
                opacity: "1",
                WebkitTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                msTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                WebkitTransformStyle: "preserve-3d",
                msTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="faq-question" onClick={openAcr}>
                <div>Are royalties supported?</div>
                <div
                  className="dropdown-icon w-icon-dropdown-toggle"
                  style={{
                    WebkitTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    msTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    WebkitTransformStyle: "preserve-3d",
                    msTransformStyle: "preserve-3d",
                    transformStyle: "preserve-3d",
                  }}
                />
                <i className="fa-solid fa-chevron-down text-white"></i>
              </div>
              <div className="faq-content" style={{ height: "0px" }}>
                <p className="faq-answer">
                  We honor royalties when trading asset(s) from a single Policy
                  ID&nbsp;for ADA.
                  <br />
                </p>
              </div>
            </div>
            <div
              className="faq-unit"
              style={{
                opacity: "1",
                WebkitTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                msTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                WebkitTransformStyle: "preserve-3d",
                msTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="faq-question" onClick={openAcr}>
                <div>Can I get scammed using Tent?</div>
                <div
                  className="dropdown-icon w-icon-dropdown-toggle"
                  style={{
                    WebkitTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    msTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    WebkitTransformStyle: "preserve-3d",
                    msTransformStyle: "preserve-3d",
                    transformStyle: "preserve-3d",
                  }}
                />
                <i className="fa-solid fa-chevron-down text-white"></i>
              </div>
              <div className="faq-content" style={{ height: "0px" }}>
                <p className="faq-answer">
                  Every user has multiple instances to double check the
                  transaction before signing it. Ultimately, every user is
                  responsible for the transactions they decide to sign.
                  <br />
                  <br />
                  We have a project verification system to enable users to
                  easily distinguish known projects and fake copies.
                  Additionally, you can also click any asset to see details like
                  fingerprint and Policy ID.
                </p>
              </div>
            </div>
            <div
              className="faq-unit"
              style={{
                opacity: "1",
                WebkitTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                msTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                WebkitTransformStyle: "preserve-3d",
                msTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="faq-question" onClick={openAcr}>
                <div>Is Tent open source?</div>
                <div
                  className="dropdown-icon w-icon-dropdown-toggle"
                  style={{
                    WebkitTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    msTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    WebkitTransformStyle: "preserve-3d",
                    msTransformStyle: "preserve-3d",
                    transformStyle: "preserve-3d",
                  }}
                />
                <i className="fa-solid fa-chevron-down text-white"></i>
              </div>
              <div className="faq-content" style={{ height: "0px" }}>
                <p className="faq-answer">
                  For the moment, Tent is not open source.
                  <br />
                </p>
              </div>
            </div>
            <div
              className="faq-unit"
              style={{
                opacity: "1",
                WebkitTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                msTransform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                transform:
                  "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                WebkitTransformStyle: "preserve-3d",
                msTransformStyle: "preserve-3d",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="faq-question" onClick={openAcr}>
                <div>How does Network Saturation affect Tent?</div>
                <div
                  className="dropdown-icon w-icon-dropdown-toggle"
                  style={{
                    WebkitTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    msTransform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    transform:
                      "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                    WebkitTransformStyle: "preserve-3d",
                    msTransformStyle: "preserve-3d",
                    transformStyle: "preserve-3d",
                  }}
                />
                <i className="fa-solid fa-chevron-down text-white"></i>
              </div>
              <div className="faq-content" style={{ height: "0px" }}>
                <p className="faq-answer">
                  Tent has been optimized so every trade is just one
                  transaction, regardless of the number of assets. That makes
                  Tent highly efficient, but even with that efficiency, some
                  transactions might take a while to process or fail altogether
                  if the Network is highly saturated.
                  <br />
                  <br />
                  While the transaction is processing, please keep in mind you
                  won't be able to open another Tent, as that might lead to
                  issues with a future transaction. If the transaction fails,
                  nothing will be charged and the best course of action would be
                  to just try again.
                  <br />
                  <br />
                  IOG is already fully focusing on scaling up the Cardano
                  Network, so these problems should be solved soon.
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
