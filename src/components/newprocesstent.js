import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const NewProcessTent = ({ step, tentId }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [model, setModel] = useState(false);
  const [tentid, setTentid] = useState("");
  function toogleButton() {
    var elements = document.getElementById("root");
    elements.classList.toggle("dark");
    setShow(!show);
  }
  const leaveTentClicked = () => {
    setModel(true);
  };
  const leaveTentClosed = () => {
    setModel(false);
  };
  const confirmleavtent = () => {
    navigate("/leavethetent");
    localStorage.setItem("tent", null);
    console.log("confirm");
  };
  // timer function
  useEffect(() => {
    let finished, counter, checkValue, timer;
    const oneSec = 1000,
      timeContainer = document.getElementById("timer");
    let dataHours = timeContainer.getAttribute("data-hours"),
      dataMinutes = timeContainer.getAttribute("data-minutes"),
      dataSeconds = timeContainer.getAttribute("data-seconds"),
      timerEnd = timeContainer.getAttribute("data-timer-end"),
      timerOnEndMsg = "data-timer-end";

    if (dataHours == "" || dataHours == null || dataHours == NaN) {
      dataHours = "0";
    }
    if (dataMinutes == "" || dataMinutes == null || dataMinutes == NaN) {
      dataMinutes = "0";
    }
    if (dataSeconds == "" || dataSeconds == null || dataSeconds == NaN) {
      dataSeconds = "0";
    }

    let hoursSpan = document.createElement("span"),
      minutesSpan = document.createElement("span"),
      secondsSpan = document.createElement("span"),
      separator1 = document.createElement("span"),
      separator2 = document.createElement("span"),
      separatorValue = ":",
      max = 59,
      s = parseInt(dataSeconds) > max ? max : parseInt(dataSeconds),
      m = parseInt(dataMinutes) > max ? max : parseInt(dataMinutes),
      h = parseInt(dataHours);

    secondsSpan.classList.add("time");
    minutesSpan.classList.add("time");
    hoursSpan.classList.add("time");
    separator1.classList.add("separator");
    separator1.textContent = separatorValue;
    separator2.classList.add("separator");
    separator2.textContent = separatorValue;

    checkValue = (value) => {
      if (value < 10) {
        return "0" + value;
      } else {
        return value;
      }
    };
    hoursSpan.textContent = checkValue(dataHours);
    minutesSpan.textContent = checkValue(dataMinutes);
    secondsSpan.textContent = checkValue(dataSeconds);

    timer = (sv, mv, hv) => {
      s = parseInt(sv);
      m = parseInt(mv);
      h = parseInt(hv);

      if (s > 0) {
        return (s -= 1);
      } else {
        s = max;
        if (m > 0) {
          return (m -= 1);
        } else {
          m = max;
          if (h > 0) {
            return (h -= 1);
          }
        }
      }
    };

    finished = () => {
      max = 0;
      let timerEnd = timeContainer.getAttribute(timerOnEndMsg);
      timeContainer.setAttribute(timerOnEndMsg, "true");
      if (timerEnd == "" || timerEnd == null) {
        timeContainer.textContent = "timer-end";
      } else {
        timeContainer.textContent = timerEnd;
      }
    };
    counter = setInterval(() => {
      if (h == 0 && m == 0 && s == 0) {
        clearInterval(counter, finished());
      }

      if (s >= 0) {
        timer(s, m, h);
        hoursSpan.textContent = checkValue(h);
        minutesSpan.textContent = checkValue(m);
        secondsSpan.textContent = checkValue(s);
      }
    }, oneSec);

    let children = [
      hoursSpan,
      separator1,
      minutesSpan,
      separator2,
      secondsSpan,
    ];
    for (let child of children) {
      timeContainer.appendChild(child);
    }
  }, []);

  useEffect(() => {
    console.log(step);
    setTentid(tentId);
  }, [step, tentId]);
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
            data-v-77e3ed07
            className="absolute px-5"
            style={{ "z-index": "1" }}
          >
            <div
              data-v-77e3ed07
              // href="https://app.tradingtent.io"
              content="Dashboard"
              className="relative inline-block hover:opacity-80 transition duration-200 ease-in-out text-blue-dark dark:text-gray-lightest"
            >
              <svg
                data-v-77e3ed07
                xmlns="http://www.w3.org/2000/svg"
                width={108}
                height={55}
                viewBox="0 0 108 55"
                fill="none"
                className="w-24 fill-current"
              >
                <path
                  data-v-77e3ed07
                  d="M48.5397 7.73703C49.5984 8.14424 50.8201 7.81847 51.3087 6.75972V6.67828C51.8788 5.29376 52.0417 3.66491 51.6345 2.28039C51.3902 1.54741 50.8201 1.05875 50.0871 0.895867C49.9242 0.895867 49.7613 0.814424 49.5984 0.814424C47.5624 0.244327 45.0377 0 42.1057 0C38.7666 0 35.346 0.244327 31.9254 0.651539C28.5863 1.05875 25.3286 1.54741 22.1523 2.28039C19.0575 2.93193 16.1256 3.66491 13.438 4.56078C10.7504 5.3752 8.38857 6.27107 6.43395 7.16693C4.39789 7.98136 2.85048 8.87722 1.71029 9.77309C0.570097 10.669 0 11.4834 0 12.2164C0 12.6236 0.0814424 13.1122 0.244327 13.5194C0.407212 13.9267 0.651539 14.3339 0.895867 14.6596C1.14019 14.9854 1.46596 15.2297 1.87318 15.4741C2.19895 15.6369 2.60616 15.7998 3.09481 15.7998C3.2577 15.7998 3.42058 15.7998 3.58347 15.7184C3.74635 15.6369 3.99068 15.6369 4.15356 15.5555C6.18962 14.904 8.14424 14.171 9.93598 13.5194C11.7277 12.8679 13.5194 12.2164 15.3112 11.6463C17.1029 11.0762 18.8946 10.5061 20.6864 9.93598C21.8266 9.61021 23.1296 9.28444 24.3513 9.04011C24.1884 9.20299 24.107 9.44732 23.9441 9.61021C22.5596 11.5648 21.0121 14.0081 19.3019 16.8586C17.5916 19.6276 15.7998 22.8039 13.8452 26.2245C11.972 29.645 9.93598 33.31 7.89992 37.3006C5.86385 41.2913 3.82779 45.3634 1.71029 49.6799C1.46596 50.0871 1.30308 50.4943 1.22164 50.9015C1.14019 51.2273 1.14019 51.5531 1.14019 51.8788C1.14019 52.7747 1.46596 53.4262 2.03606 53.8334C2.44327 54.1592 3.17625 54.4035 4.07212 54.4035C4.64222 54.4035 5.29376 54.3221 6.02674 54.0778C6.67828 53.9149 7.41126 53.5891 8.0628 53.1819C8.71434 52.7747 9.36588 52.286 9.93598 51.6345C10.5061 50.983 10.9947 50.25 11.4019 49.4356C11.8092 48.7026 12.3792 47.7253 13.0308 46.4222C13.6823 45.1191 14.4968 43.6531 15.3112 41.9429C16.1256 40.314 17.0215 38.5223 17.9988 36.5677C18.9761 34.613 19.9534 32.577 21.0121 30.5409C21.9895 28.4234 23.0482 26.3059 24.107 24.2698C25.1657 22.1523 26.143 20.1163 27.1203 18.1617C28.0976 16.207 28.9935 14.3339 29.8079 12.5421C30.7038 10.7504 31.4368 9.20299 32.1698 7.81847C32.1698 7.73703 32.1698 7.73703 32.2512 7.65559C32.6584 7.57415 33.0656 7.57415 33.4728 7.4927C35.9161 7.24838 38.7666 7.00405 41.78 6.92261C44.8748 6.92261 47.0737 7.16693 48.3768 7.57415C48.2954 7.57415 48.4582 7.65559 48.5397 7.73703Z"
                  fill="current-color"
                />{" "}
                <path
                  data-v-77e3ed07
                  d="M107.83 26.143C107.667 25.8172 107.423 25.6544 107.097 25.4915C106.771 25.3286 106.445 25.1657 105.957 25.1657C105.55 25.0843 105.061 25.0843 104.491 25.0843H93.7404C94.5548 23.5369 95.3693 22.0709 96.1022 20.6049C96.428 20.0348 96.7538 19.3833 97.0795 18.7318C97.4053 18.0802 97.7311 17.5101 98.0569 16.94C98.3826 16.3699 98.7084 15.7998 98.9527 15.3112C99.2785 14.8225 99.4414 14.3339 99.6857 13.9267C100.011 13.3566 100.256 12.8679 100.419 12.4607C100.582 12.0535 100.744 11.5648 100.744 11.1576C100.744 10.3432 100.5 9.77309 99.93 9.44732C99.3599 9.12155 98.7898 8.95866 98.1383 8.95866C97.4053 8.95866 96.7538 9.12155 96.1022 9.52876C95.4507 9.85453 94.962 10.5061 94.4734 11.3205L87.4693 25.1657H83.8859C83.3972 25.1657 82.9086 25.2471 82.5014 25.4915C82.0941 25.6544 81.7684 25.8987 81.4426 26.2245C81.1983 26.4688 80.9539 26.7946 80.7911 27.1203C80.6282 27.4461 80.6282 27.6904 80.6282 27.9347C80.6282 28.4234 80.8725 28.9121 81.3612 29.3193C81.8498 29.7265 82.6642 29.8894 83.8859 29.8894H85.2704C84.6189 31.111 84.0488 32.4141 83.3158 33.7172C82.8271 34.7759 82.257 35.8347 81.7684 36.9749C80.954 37.6264 79.9766 38.2779 78.9993 38.9295C77.8591 39.6625 76.6375 40.314 75.4159 41.047C74.1942 41.6985 72.9726 42.2686 71.751 42.6758C71.4252 42.8387 71.2623 43.0016 71.018 43.0016C70.8551 43.0016 70.6108 43.0016 70.5293 43.0016C70.285 43.0016 70.1221 42.9202 70.0407 42.8387C69.9592 42.6758 69.8778 42.5129 69.8778 42.3501C69.8778 41.8614 70.0407 41.4542 70.285 41.1284C70.5293 40.7212 70.7736 40.2326 71.1809 39.6625C71.5881 39.0109 71.9953 38.3594 72.4839 37.6264C72.9726 36.8934 73.3798 36.1604 73.8685 35.346C74.3571 34.5316 74.7643 33.6357 75.1715 32.8213C75.5788 31.9254 75.9045 31.111 76.1488 30.2151C76.3932 29.3193 76.4746 28.5048 76.4746 27.7719C76.4746 26.4688 76.0674 25.4915 75.253 24.9214C74.52 24.3513 73.5427 24.0255 72.3211 24.0255C71.2623 24.0255 70.2035 24.1884 68.9819 24.5142C67.8417 24.8399 66.7015 25.2472 65.6428 25.8172C64.584 26.3059 63.6067 26.876 62.7108 27.5275C61.815 28.1791 61.082 28.8306 60.5933 29.4007C60.7562 28.9935 60.9191 28.6677 60.9191 28.342C61.0006 28.0162 61.0006 27.6904 61.0006 27.4461C61.0006 26.7131 60.7562 26.143 60.349 25.7358C59.9418 25.3286 59.4532 25.1657 58.9645 25.1657C58.313 25.1657 57.6614 25.41 57.0099 25.8987C56.3583 26.3873 55.7882 27.0389 55.381 28.0162C55.0553 28.7492 54.5666 29.7265 53.9965 30.7852C53.4264 31.9254 52.8563 33.0656 52.2862 34.2873C51.879 35.1831 51.3903 36.1604 50.9017 37.0563C50.6574 37.1377 50.413 37.3006 50.0058 37.545C49.4357 37.8707 48.7027 38.2779 47.8069 38.7666C46.911 39.2552 46.0151 39.7439 44.875 40.314C43.8162 40.8027 42.676 41.3727 41.5358 41.78C40.3956 42.2686 39.2554 42.5944 38.1152 42.9202C36.975 43.2459 35.9163 43.3274 34.8575 43.3274C33.8802 43.3274 33.1472 43.1645 32.5771 42.8387C32.0071 42.4315 31.6813 41.9428 31.5184 41.2913C34.5318 40.1511 36.975 39.0924 39.0111 38.0336C41.0472 36.8934 42.5946 35.8347 43.8162 34.8574C45.0378 33.7986 45.8523 32.7399 46.3409 31.7625C46.8296 30.7852 47.0739 29.8079 47.0739 28.8306C47.0739 27.2832 46.5852 26.0616 45.6894 25.1657C44.7935 24.2698 43.409 23.8626 41.6173 23.8626C39.907 23.8626 38.2781 24.107 36.7307 24.5956C35.1833 25.0843 33.7988 25.7358 32.5771 26.6317C31.2741 27.4461 30.1339 28.4234 29.0751 29.5636C28.0978 30.6223 27.2019 31.7625 26.469 32.9027C25.736 34.0429 25.2473 35.1831 24.8401 36.3233C24.4329 37.4635 24.27 38.4408 24.27 39.4181C24.27 40.6398 24.4329 41.8614 24.8401 42.9202C25.2473 44.0604 25.736 45.0377 26.469 45.8521C27.2019 46.7479 28.0978 47.3995 29.0751 47.8881C30.1339 48.3768 31.2741 48.6211 32.5771 48.6211C34.1246 48.6211 35.672 48.3768 37.3008 47.9696C38.8482 47.5624 40.3956 47.0737 41.8616 46.4222C43.3275 45.7706 44.7121 45.1191 46.0151 44.3861C46.7481 43.9789 47.3997 43.5717 47.9698 43.2459C47.8069 43.5717 47.7254 43.8975 47.5626 44.2232C47.2368 45.0377 47.0739 45.6892 47.0739 46.015C47.0739 46.748 47.3182 47.318 47.7254 47.8067C48.1327 48.2954 48.7842 48.5397 49.5172 48.5397C50.2502 48.5397 50.9017 48.2954 51.3903 47.8067C51.879 47.318 52.3677 46.7479 52.7749 46.0964C53.1821 45.3634 53.5078 44.6304 53.9151 43.816C54.3223 43.0016 54.7295 42.1872 55.1367 41.4542C55.8697 40.3954 56.6841 39.1738 57.58 37.7893C58.4758 36.4048 59.5346 35.1017 60.5933 33.9615C61.7335 32.7399 62.8737 31.6811 64.0954 30.8667C65.3984 30.0523 66.7015 29.645 68.086 29.645C68.4933 29.645 68.7376 29.7265 68.9005 29.9708C69.0634 30.2151 69.2262 30.4595 69.2262 30.7852C69.2262 31.1924 69.0634 31.6811 68.819 32.2512C68.4933 32.8213 68.1675 33.5543 67.7603 34.2873C67.3531 35.0202 66.8644 35.8347 66.3758 36.7305C65.8871 37.545 65.3984 38.4408 64.9098 39.2552C64.5026 40.1511 64.0954 40.9655 63.7696 41.78C63.4438 42.5944 63.2809 43.3274 63.2809 44.0603C63.2809 44.2232 63.1995 44.3861 63.1995 44.549C63.1995 44.7119 63.1995 44.7933 63.1995 44.9562C63.1995 46.0964 63.4438 47.0737 64.0139 47.7253C64.584 48.3768 65.3984 48.7026 66.6201 48.7026C67.0273 48.7026 67.4345 48.6211 67.9232 48.5397C68.4118 48.4582 68.9005 48.2954 69.4706 48.1325C71.1809 47.6438 72.5654 47.1552 73.787 46.5851C75.0087 46.015 76.2303 45.4449 77.289 44.7933C78.022 44.3861 78.755 43.8975 79.488 43.4088C79.488 43.6531 79.488 43.9789 79.488 44.2232C79.488 44.8748 79.5694 45.4449 79.7323 45.9335C79.8952 46.4222 80.1395 46.9108 80.4653 47.318C80.8725 47.7253 81.3612 48.051 81.9313 48.2139C82.5014 48.4582 83.2343 48.5397 84.1302 48.5397C85.4333 48.5397 86.8178 48.2954 88.2023 47.7253C89.5868 47.2366 91.0528 46.5036 92.4373 45.6078C93.9033 44.7119 95.3693 43.6531 96.8352 42.5129C98.3012 41.3728 99.7671 40.1511 101.152 38.848C101.803 38.3594 102.21 37.7893 102.455 37.3006C102.699 36.812 102.781 36.2419 102.781 35.7532C102.781 35.2646 102.699 34.8574 102.455 34.5316C102.21 34.2058 101.885 34.0429 101.559 34.0429C101.233 34.0429 100.907 34.1244 100.582 34.3687C99.93 34.8574 99.2785 35.5089 98.4641 36.079C97.6497 36.7305 96.8352 37.3006 95.9394 37.9522C95.0435 38.6037 94.2291 39.1738 93.3332 39.7439C92.4373 40.314 91.5415 40.8027 90.727 41.2913C89.9126 41.6985 89.1796 42.1057 88.4467 42.3501C87.7137 42.5944 87.1436 42.7573 86.7364 42.7573C86.4106 42.7573 86.1663 42.6758 86.0034 42.5129C85.8405 42.3501 85.8405 42.1057 85.8405 41.78C85.8405 41.2913 85.9219 40.6398 86.1663 39.9882C86.4106 39.2552 86.6549 38.6851 86.9807 38.1151C87.6322 36.812 88.2838 35.4275 89.0167 33.9615C89.7497 32.4141 90.4827 30.8667 91.2971 29.3193L105.061 29.2378C105.631 29.1564 106.12 29.0749 106.445 28.9935C106.853 28.8306 107.097 28.6677 107.341 28.5048C107.586 28.342 107.667 28.0976 107.749 27.8533C107.83 27.609 107.911 27.3647 107.911 27.1203C108.074 26.7946 107.993 26.3873 107.83 26.143ZM31.9256 35.9161C32.1699 35.2646 32.4957 34.6945 32.9029 33.9615C33.3101 33.31 33.7173 32.577 34.1246 31.9254C34.6132 31.2739 35.1833 30.6223 35.7534 30.1337C36.4049 29.5636 37.0565 29.1564 37.7895 28.8306C38.5224 28.5048 39.3369 28.342 40.1513 28.342C40.2327 28.342 40.3956 28.342 40.4771 28.342C40.5585 28.342 40.6399 28.342 40.8028 28.342C41.0472 28.4234 41.2915 28.5048 41.5358 28.6677C41.7801 28.8306 41.8616 29.1564 41.8616 29.4822C41.8616 29.8894 41.6987 30.378 41.2915 30.8667C40.8843 31.3553 40.2327 32.0069 39.2554 32.577C39.0111 32.7399 38.6853 32.9842 38.1152 33.31C37.6266 33.7172 36.975 34.1244 36.2421 34.5316C35.5091 35.0202 34.6946 35.5089 33.8802 35.9976C33.0658 36.4862 32.2514 36.9749 31.5184 37.3821C31.437 37.0563 31.6813 36.5676 31.9256 35.9161Z"
                  fill="current-color"
                />
              </svg>
            </div>
          </div>{" "}
          {/**/}{" "}
          {step === 1 ? (
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
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-dark dark:bg-blue-darker"
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/tent.png"
                        alt="h"
                        className="w-10"
                      />
                    </div>{" "}
                    <div
                      data-v-0f1a40d0
                      className="absolute flex align-center items-center align-middle content-center w-full"
                      style={{
                        top: "50%",
                        "-webkit-transform": "translate(50%, -50%)",
                        "-ms-transform": "translate(50%, -50%)",
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
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave text-center text-gray-dark dark:text-gray-regular font-medium"
                  >
                    Enter Tent (2/2)
                    <span data-v-0f1a40d0 className="text-black">
                      ✔️
                    </span>
                  </div>
                </div>{" "}
                <div data-v-0f1a40d0 className="w-1/4">
                  <div data-v-0f1a40d0 className="relative">
                    <div
                      data-v-0f1a40d0
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-light"
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/diamond.png"
                        alt=""
                        className="w-8"
                      />
                    </div>{" "}
                    <div
                      data-v-0f1a40d0
                      className="absolute flex align-center items-center align-middle content-center w-full"
                      style={{
                        top: "50%",
                        "-webkit-transform": "translate(50%, -50%)",
                        "-ms-transform": "translate(50%, -50%)",
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
                    className="text-sm fontSetLeave  text-center text-blue-meta font-bold"
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
                        alt=""
                        className="w-8"
                      />
                    </div>{" "}
                    <div
                      data-v-0f1a40d0
                      className="absolute flex align-center items-center align-middle content-center w-full"
                      style={{
                        top: "50%",
                        "-webkit-transform": "translate(50%, -50%)",
                        "-ms-transform": "translate(50%, -50%)",
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
                    className="text-sm fontSetLeave  text-center text-gray-darkest dark:text-gray-dark"
                  >
                    Confirm Tx
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
                        src="https://app.tradingtent.io/images/check_inactive.png"
                        alt=""
                        className="w-6"
                      />
                    </div>
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave  text-center text-gray-darkest dark:text-gray-dark"
                  >
                    Submit TX
                    {/**/}
                  </div>
                </div>
              </div>
            </div>
          ) : step === 2 ? (
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
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-dark dark:bg-blue-darker"
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/tent.png"
                        alt="h"
                        className="w-10"
                      />
                    </div>{" "}
                    <div
                      data-v-0f1a40d0
                      className="absolute flex align-center items-center align-middle content-center w-full"
                      style={{
                        top: "50%",
                        "-webkit-transform": "translate(50%, -50%)",
                        "-ms-transform": "translate(50%, -50%)",
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
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave  text-center text-gray-dark dark:text-gray-regular font-medium"
                  >
                    Enter Tent (2/2)
                    <span data-v-0f1a40d0 className="text-black">
                      ✔️
                    </span>
                  </div>
                </div>{" "}
                <div data-v-0f1a40d0 className="w-1/4">
                  <div data-v-0f1a40d0 className="relative">
                    <div
                      data-v-0f1a40d0
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-dark dark:bg-blue-darker"
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/diamond.png"
                        alt=""
                        className="w-8"
                      />
                    </div>{" "}
                    <div
                      data-v-0f1a40d0
                      className="absolute flex align-center items-center align-middle content-center w-full"
                      style={{
                        top: "50%",
                        "-webkit-transform": "translate(50%, -50%)",
                        "-ms-transform": "translate(50%, -50%)",
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
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave  text-center text-gray-dark dark:text-gray-regular font-bold"
                  >
                    Select Assets
                    {/**/}
                  </div>
                </div>
                <div data-v-0f1a40d0 className="w-1/4">
                  <div data-v-0f1a40d0 className="relative">
                    <div
                      data-v-0f1a40d0
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-light "
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/lock_inactive.png"
                        alt=""
                        className="w-8"
                      />
                    </div>{" "}
                    <div
                      data-v-0f1a40d0
                      className="absolute flex align-center items-center align-middle content-center w-full"
                      style={{
                        top: "50%",
                        "-webkit-transform": "translate(50%, -50%)",
                        "-ms-transform": "translate(50%, -50%)",
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
                    className="text-sm fontSetLeave  text-center text-blue-meta"
                  >
                    Confirm Tx
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
                        src="https://app.tradingtent.io/images/check_inactive.png"
                        alt=""
                        className="w-6"
                      />
                    </div>
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave   text-center text-gray-darkest dark:text-gray-dark"
                  >
                    Submit TX
                    {/**/}
                  </div>
                </div>
              </div>
            </div>
          ) : step === 3 ? (
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
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-dark dark:bg-blue-darker"
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/tent.png"
                        alt="h"
                        className="w-10"
                      />
                    </div>{" "}
                    <div
                      data-v-0f1a40d0
                      className="absolute flex align-center items-center align-middle content-center w-full"
                      style={{
                        top: "50%",
                        "-webkit-transform": "translate(50%, -50%)",
                        "-ms-transform": "translate(50%, -50%)",
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
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave  text-center text-gray-dark dark:text-gray-regular font-medium"
                  >
                    Enter Tent (2/2)
                    <span data-v-0f1a40d0 className="text-black">
                      ✔️
                    </span>
                  </div>
                </div>{" "}
                <div data-v-0f1a40d0 className="w-1/4">
                  <div data-v-0f1a40d0 className="relative">
                    <div
                      data-v-0f1a40d0
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-dark dark:bg-blue-darker"
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/diamond.png"
                        alt=""
                        className="w-8"
                      />
                    </div>{" "}
                    <div
                      data-v-0f1a40d0
                      className="absolute flex align-center items-center align-middle content-center w-full"
                      style={{
                        top: "50%",
                        "-webkit-transform": "translate(50%, -50%)",
                        "-ms-transform": "translate(50%, -50%)",
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
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave  text-center text-gray-dark dark:text-gray-regular font-bold"
                  >
                    Select Assets
                    {/**/}
                  </div>
                </div>
                <div data-v-0f1a40d0 className="w-1/4">
                  <div data-v-0f1a40d0 className="relative">
                    <div
                      data-v-0f1a40d0
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-dark dark:bg-blue-darker"
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/lock_inactive.png"
                        alt=""
                        className="w-8"
                      />
                    </div>{" "}
                    <div
                      data-v-0f1a40d0
                      className="absolute flex align-center items-center align-middle content-center w-full"
                      style={{
                        top: "50%",
                        "-webkit-transform": "translate(50%, -50%)",
                        "-ms-transform": "translate(50%, -50%)",
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
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave  text-center text-gray-dark dark:text-gray-regular font-bold"
                  >
                    Confirm Tx
                    {/**/}
                  </div>
                </div>
                <div data-v-0f1a40d0 className="w-1/4">
                  <div data-v-0f1a40d0 className="relative">
                    <div
                      data-v-0f1a40d0
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-light"
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/check_inactive.png"
                        alt=""
                        className="w-6"
                      />
                    </div>
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave  text-center text-blue-meta"
                  >
                    Submit TX
                    {/**/}
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-dark dark:bg-blue-darker"
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/tent.png"
                        alt="h"
                        className="w-10"
                      />
                    </div>{" "}
                    <div
                      data-v-0f1a40d0
                      className="absolute flex align-center items-center align-middle content-center w-full"
                      style={{
                        top: "50%",
                        "-webkit-transform": "translate(50%, -50%)",
                        "-ms-transform": "translate(50%, -50%)",
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
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave  text-center text-gray-dark dark:text-gray-regular font-medium"
                  >
                    Enter Tent (2/2)
                    <span data-v-0f1a40d0 className="text-black">
                      ✔️
                    </span>
                  </div>
                </div>{" "}
                <div data-v-0f1a40d0 className="w-1/4">
                  <div data-v-0f1a40d0 className="relative">
                    <div
                      data-v-0f1a40d0
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-dark dark:bg-blue-darker"
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/diamond.png"
                        alt=""
                        className="w-8"
                      />
                    </div>{" "}
                    <div
                      data-v-0f1a40d0
                      className="absolute flex align-center items-center align-middle content-center w-full"
                      style={{
                        top: "50%",
                        "-webkit-transform": "translate(50%, -50%)",
                        "-ms-transform": "translate(50%, -50%)",
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
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave  text-center text-gray-dark dark:text-gray-regular font-bold"
                  >
                    Select Assets
                    {/**/}
                  </div>
                </div>
                <div data-v-0f1a40d0 className="w-1/4">
                  <div data-v-0f1a40d0 className="relative">
                    <div
                      data-v-0f1a40d0
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-dark dark:bg-blue-darker"
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/lock_inactive.png"
                        alt=""
                        className="w-8"
                      />
                    </div>{" "}
                    <div
                      data-v-0f1a40d0
                      className="absolute flex align-center items-center align-middle content-center w-full"
                      style={{
                        top: "50%",
                        "-webkit-transform": "translate(50%, -50%)",
                        "-ms-transform": "translate(50%, -50%)",
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
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave  text-center text-gray-dark dark:text-gray-regular font-bold"
                  >
                    Confirm Tx
                    {/**/}
                  </div>
                </div>
                <div data-v-0f1a40d0 className="w-1/4">
                  <div data-v-0f1a40d0 className="relative">
                    <div
                      data-v-0f1a40d0
                      className="step-container relative flex justify-center items-center mx-auto rounded-full border-4 border-gray-lightest dark:border-gray-charcoal z-1 bg-blue-dark dark:bg-blue-darker"
                    >
                      <img
                        data-v-0f1a40d0
                        src="https://app.tradingtent.io/images/check_inactive.png"
                        alt=""
                        className="w-6"
                      />
                    </div>{" "}
                  </div>{" "}
                  <div
                    data-v-0f1a40d0
                    className="text-sm fontSetLeave  text-center text-gray-dark dark:text-gray-regular font-bold"
                  >
                    Submit Tx
                    {/**/}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div data-v-77e3ed07 className="-mt-2 absolute right-0 text-right">
            <div data-v-77e3ed07 className="flex flex-col">
              <div data-v-77e3ed07 className="flex gap-2.5">
                <div
                  data-v-77e3ed07
                  content="Copy Tent ID"
                  className="cursor-pointer  text-blue-dark dark:text-gray-100 px-3.5 py-1 mb-2 bg-gray-light dark:bg-blue-darkest rounded-lg"
                  tabIndex={0}
                >
                  <span
                    data-v-77e3ed07
                    className=" fontSetLeave font-bold leading-150"
                  >
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
                    {show ? (
                      <svg
                        data-v-d75a0d8c
                        width={196}
                        height={206}
                        viewBox="0 0 196 206"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 fill-current"
                      >
                        <path
                          data-v-d75a0d8c
                          d="M98 167.375C101.249 167.375 104.365 168.731 106.662 171.146C108.959 173.561 110.25 176.835 110.25 180.25V193.125C110.25 196.54 108.959 199.814 106.662 202.229C104.365 204.644 101.249 206 98 206C94.7511 206 91.6353 204.644 89.3379 202.229C87.0406 199.814 85.75 196.54 85.75 193.125V180.25C85.75 176.835 87.0406 173.561 89.3379 171.146C91.6353 168.731 94.7511 167.375 98 167.375ZM98 38.625C94.7511 38.625 91.6353 37.2685 89.3379 34.854C87.0406 32.4395 85.75 29.1647 85.75 25.75V12.875C85.75 9.46034 87.0406 6.18553 89.3379 3.771C91.6353 1.35647 94.7511 0 98 0C101.249 0 104.365 1.35647 106.662 3.771C108.959 6.18553 110.25 9.46034 110.25 12.875V25.75C110.25 29.1647 108.959 32.4395 106.662 34.854C104.365 37.2685 101.249 38.625 98 38.625ZM183.75 90.125C186.999 90.125 190.115 91.4815 192.412 93.896C194.709 96.3105 196 99.5853 196 103C196 106.415 194.709 109.689 192.412 112.104C190.115 114.519 186.999 115.875 183.75 115.875H171.5C168.251 115.875 165.135 114.519 162.838 112.104C160.541 109.689 159.25 106.415 159.25 103C159.25 99.5853 160.541 96.3105 162.838 93.896C165.135 91.4815 168.251 90.125 171.5 90.125H183.75ZM36.75 103C36.75 106.415 35.4594 109.689 33.1621 112.104C30.8647 114.519 27.7489 115.875 24.5 115.875H12.25C9.0011 115.875 5.88526 114.519 3.58794 112.104C1.29062 109.689 0 106.415 0 103C0 99.5853 1.29062 96.3105 3.58794 93.896C5.88526 91.4815 9.0011 90.125 12.25 90.125H24.5C27.7489 90.125 30.8647 91.4815 33.1621 93.896C35.4594 96.3105 36.75 99.5853 36.75 103ZM158.637 148.526L167.298 157.629C169.53 160.057 170.764 163.309 170.736 166.685C170.709 170.061 169.42 173.29 167.149 175.677C164.878 178.064 161.805 179.418 158.593 179.448C155.382 179.477 152.287 178.179 149.977 175.834L141.316 166.731C139.085 164.303 137.85 161.051 137.878 157.675C137.906 154.299 139.194 151.07 141.465 148.683C143.736 146.296 146.809 144.942 150.021 144.912C153.233 144.883 156.327 146.181 158.637 148.526ZM37.3625 57.474L28.7017 48.3714C27.5644 47.176 26.6622 45.7569 26.0467 44.1951C25.4312 42.6332 25.1144 40.9593 25.1144 39.2687C25.1144 37.5782 25.4312 35.9043 26.0467 34.3424C26.6622 32.7806 27.5644 31.3615 28.7017 30.1661C29.8391 28.9708 31.1893 28.0225 32.6753 27.3756C34.1614 26.7287 35.7541 26.3957 37.3625 26.3957C38.971 26.3957 40.5636 26.7287 42.0497 27.3756C43.5357 28.0225 44.8859 28.9708 46.0233 30.1661L54.684 39.2687C55.8214 40.4641 56.7235 41.8832 57.3391 43.4451C57.9546 45.0069 58.2714 46.6809 58.2714 48.3714C58.2714 50.0619 57.9546 51.7358 57.3391 53.2977C56.7235 54.8595 55.8214 56.2786 54.684 57.474C53.5467 58.6694 52.1964 59.6176 50.7104 60.2645C49.2244 60.9115 47.6317 61.2444 46.0233 61.2444C44.4148 61.2444 42.8221 60.9115 41.3361 60.2645C39.8501 59.6176 38.4998 58.6694 37.3625 57.474ZM158.637 57.474C156.341 59.8882 153.225 61.2444 149.977 61.2444C146.728 61.2444 143.613 59.8882 141.316 57.474C139.019 55.0598 137.729 51.7855 137.729 48.3714C137.729 44.9572 139.019 41.6829 141.316 39.2687L149.977 30.1661C152.274 27.752 155.389 26.3957 158.637 26.3957C161.886 26.3957 165.001 27.752 167.298 30.1661C169.595 32.5803 170.886 35.8546 170.886 39.2687C170.886 42.6829 169.595 45.9572 167.298 48.3714L158.637 57.474ZM37.3625 148.526C39.6729 146.181 42.7673 144.883 45.9792 144.912C49.1911 144.942 52.2635 146.296 54.5348 148.683C56.806 151.07 58.0943 154.299 58.1223 157.675C58.1502 161.051 56.9154 164.303 54.684 166.731L46.0233 175.834C43.7129 178.179 40.6185 179.477 37.4066 179.448C34.1947 179.418 31.1222 178.064 28.851 175.677C26.5797 173.29 25.2914 170.061 25.2635 166.685C25.2356 163.309 26.4703 160.057 28.7017 157.629L37.3625 148.526ZM98 51.5C85.0044 51.5 72.541 56.9259 63.3518 66.584C54.1625 76.2421 49 89.3413 49 103C49 116.659 54.1625 129.758 63.3518 139.416C72.541 149.074 85.0044 154.5 98 154.5C110.996 154.5 123.459 149.074 132.648 139.416C141.838 129.758 147 116.659 147 103C147 89.3413 141.838 76.2421 132.648 66.584C123.459 56.9259 110.996 51.5 98 51.5ZM98 135.188C89.8777 135.188 82.0882 131.796 76.3449 125.76C70.6016 119.724 67.375 111.537 67.375 103C67.375 94.4633 70.6016 86.2763 76.3449 80.24C82.0882 74.2037 89.8777 70.8125 98 70.8125C106.122 70.8125 113.912 74.2037 119.655 80.24C125.398 86.2763 128.625 94.4633 128.625 103C128.625 111.537 125.398 119.724 119.655 125.76C113.912 131.796 106.122 135.188 98 135.188Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
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
                    )}
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
                      className="flex space-x-1 items-center font-light group-hover:text-gray-600 dark:group-hover:text-white text-gray-400 dark:text-gray-lightest"
                    >
                      <i data-v-77e3ed07 className="fas fa-hourglass-half" />
                      <div
                        id="timer"
                        data-hours="1"
                        data-minutes="0"
                        data-seconds="0"
                      ></div>
                    </span>
                  </span>
                </div>
                <div data-v-77e3ed07>
                  <button
                    data-v-77e3ed07
                    type="button"
                    onClick={leaveTentClicked}
                    className="px-3.5 fontSetLeave pb-0.5 transition-colors text-[#EB5757] duration-150 ease-in-out rounded-lg hover:bg-[#EB5757]  hover:text-white border-[#EB5757] border-2 leading-150 font-bold"
                  >
                    Leave Tent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </h1>
      </div>

      {/* popup */}
      <div
        data-v-77e3ed07
        className={`${
          model ? "" : "hidden"
        } fixed backdrop-filter backdrop-blur-sm bg-backdrop flex items-center justify-center overflow-auto z-50 inset-0`}
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
                className="w-auto p-2.5 rounded-2xl bg-blue-gradient mb-4"
              >
                <i data-v-77e3ed07 className="fas fa-heart-broken" />
              </div>
              Leaving the Tent
            </h1>{" "}
            <p
              data-v-77e3ed07
              className="text-lg text-black dark:text-gray-lightest font-medium leading-150"
            >
              This action will close the Tent for both you and your partner.
            </p>
          </div>{" "}
          <button
            data-v-77e3ed07
            type="button"
            onClick={leaveTentClosed}
            className="absolute text-2xl px-2.5 text-gray-dark dark:text-gray-lightest top-3 right-3 hover:opacity-100 opacity-70"
          >
            <i data-v-77e3ed07 className="fas fa-times" />
          </button>{" "}
          <div data-v-77e3ed07 className="text-center mt-5">
            <button
              data-v-77e3ed07
              className="w-44 text-lg leading-150 box-border rounded-lg hover:bg-opacity-20 hover:bg-yellow border-2 border-yellow text-blue-dark dark:text-yellow py-1 px-4 font-bold"
            >
              Cancel
            </button>{" "}
            <button
              data-v-77e3ed07
              type="button"
              onClick={confirmleavtent}
              className="w-44 ml-3 box-border border-2 border-transparent leading-150 text-lg rounded-lg py-1 px-4 font-bold bg-yellow hover:bg-opacity-80 text-blue-dark"
            >
              <i data-v-77e3ed07 className="fas fa-sign-out-alt mr-1" />
              Leave Tent
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProcessTent;
