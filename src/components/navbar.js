import React, { useState, useEffect } from "react";
import "../css/navbar.css";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";
import { Link } from "react-router-dom";
import $ from "jquery";
// const NavbarItem = ({ title, classProps }) => {
//   return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
// };
$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $("nav").addClass("sticky");
  } else {
    $("nav").removeClass("sticky");
  }
});
const Navbar = () => {
  const [toggleMenu, setToogleMenu] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <nav className="w-full flex  md:justify-center justify-between items-center p-4 container-fluid m-auto ">
      <div className="md:flex-[0.8] flex-initial items-center justify-center">
        <Link to="/">
          <img
            className="w-32 cursor-pointer"
            src="/images/logo.png"
            alt="logo"
          />
        </Link>
      </div>
      <ul className="text-white text-[16px] md:flex hidden list-none flex-row justify-between items-center flex-initial space-x-5">
        <Link to="/about" className="hover:text-[#FFB23C] fontFamily">
          {" "}
          About
        </Link>
        <Link to="/faqs" className="hover:text-[#FFB23C] fontFamily">
          FAQs
        </Link>
        <li className="hover:text-[#FFB23C] fontFamily">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfNwHgyKpC5XfhYyu9vu_facAQ_IOruuMEjQo-t53Qe3fcFjA/viewform"
            target="_blank"
            rel="noreferrer"
          >
            Verify a Project
          </a>
        </li>
        <li className="hover:text-[#FFB23C] fontFamily">Partnership</li>
        <Link to="/digitalmersh" className="hover:text-[#FFB23C] fontFamily">
          Digital Merch
        </Link>
        <li>
          <a
            href="https://discord.com/invite/2BvfbDk6SU"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-discord text-[25px]"></i>
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/trading_tent"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-twitter text-[25px]"></i>
          </a>
        </li>
        <li>
          <a
            href="https://medium.com/@trading_tent"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://assets.website-files.com/61ca490b8b35d020e5f3fee7/624efcfaff3d8f73bce979b8_61a6c2daa8aa9f0475b022ec_icon-mediumv2.svg"
              loading="lazy"
              alt="logom"
              className="nav-social-icon -mt-2 h-6"
            ></img>
          </a>
        </li>
        <li>
          <Link
            style={{ opacity: "1" }}
            to="/startrade"
            className="w-inline-block "
          >
            <div className="borderbg">
              <button className="text-white hover:text-[#FFB23C] mt-1 text-lg font-[700] fontFamily">
                Start a Trade
              </button>
            </div>
          </Link>
        </li>
        {/* {[
          "About",
          "FAQs",
          "Verify a Project",
          "Partnership",
          "Digital Merch",
        ].map((item, index) => (
          <NavbarItem
            key={item + index}
            title={item}
            classProps="hover:text-[#FFB23C]"
          />  
        ))} */}
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer  "
            onClick={() => setToogleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer  "
            onClick={() => setToogleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 right-0 p-3 w-full h-screen shadow-2xl md:hidden list-none
          flex flex-col justify-start items-center rounded-md animate-slide-in text-white bg-[#0f0f4d]"
          >
            <li className="text-xl w-full ml-2">
              <AiOutlineClose onClick={() => setToogleMenu(false)} />
            </li>
            <li className="text-xl w-full my-24 "></li>
            <li className="hover:text-[#FFB23C]"> About</li>
            <li className="hover:text-[#FFB23C]">FAQs</li>
            <li className="hover:text-[#FFB23C]">Verify a Project</li>
            <li className="hover:text-[#FFB23C]">Partnership</li>
            <Link to="digitalmersh">
              <li className="hover:text-[#FFB23C]">Digital Merch</li>
            </Link>
            <div className="flex justify-center space-x-4">
              <li>
                <i className="fa-brands fa-discord text-[30px]"></i>
              </li>
              <li>
                <i className="fa-brands fa-twitter text-[30px]"></i>
              </li>
              <li>
                <i className="fa-solid fa-m text-[30px]"></i>
              </li>
            </div>
            {/* {[
              "About the Project",
              "FAQs",
              "Verify your Project",
              "Partnership Program",
            ].map((item, index) => (
              <NavbarItem
                key={item + index}
                title={item}
                classProps="my-2 text-lg"
              />
            ))} */}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
