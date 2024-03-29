import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Img, Text, Button } from "components";
import { Link } from "react-router-dom";
import { useDisconnect  } from 'wagmi';
import { useWeb3Modal, useWeb3ModalEvents } from '@web3modal/wagmi/react';




const User = () => {
  const userDataParam = localStorage.getItem('userData');
  const [userimage, setUserimage] = useState();
  const userData = JSON.parse(userDataParam);

  const { disconnect } = useDisconnect();
  const modal = useWeb3Modal()



  useEffect(() => {
    const image = userData?.image.replace('ipfs://', '');
    const imageurl = `https://cloudflare-ipfs.com/ipfs/${image}`;
    setUserimage(imageurl);
  }, [userData?.image]);

  const history = useNavigate();

  const events = useWeb3ModalEvents();

  useEffect(() => {

    console.log('events', events.data.event);

    if ( events.data.event === "MODAL_CLOSE" || events.data.event === "CONNECT_SUCCESS" || events.data.event === "DISCONNECT_SUCCESS" || events.data.event === "DISCONNECT_ERROR") {
     history('/signin');
     window.location.reload();
     disconnect();
     localStorage.removeItem('userData');
     localStorage.removeItem('cid');
    }
    
}, [events, history, disconnect]);


  const disconnectToWeb3 = () => {
   modal.open();
  }

  return (
    <>
     <div className="bg-gray-100 flex flex-col font-prompt items-end justify-start mx-auto w-full">
        <div className="flex flex-col items-center w-full"></div>
        <div className="bg-white-A700 flex flex-col gap-10 items-end justify-start p-5 md:px-5 w-auto sm:w-full">
          <Img
            className="h-7 w-7"
            src={userimage}
            alt="frame228"
          />
          <Link
            to="/coming-soon"
            className="bg-white-A700 flex flex-col items-start justify-start p-2"
          >
            <Text
              className="ml-3 md:ml-[0] text-3xl sm:text-[26px] md:text-[28px] text-black-900"
              size="txtPromptMedium30Black900"
            >
              {userData?.name}
            </Text>
            <Text
              className="mb-0.5 ml-3 md:ml-[0] text-teal-100 text-xl"
              size="txtPromptMedium20Teal100"
            >
              A Senchatian
            </Text>
          </Link>
          <Link
            to="/coming-soon"
            className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-full"
          >
            <Img
              className="h-7 w-7 md:h-auto rounded-[50%]"
              src={userimage}
              alt="ellipseFortyTwo_One"
            />
          </Link>
          <Link
            to="/portfolio"
            className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-full"
          >
            <Img className="h-7 w-7" src="images/img_frame.svg" alt="frame" />
            <Text
              className="sm:ml-[0] ml-[49px] sm:text-[19px] md:text-[21px] text-[19px] text-black-900"
              size="txtPromptSemiBold23"
            >
              My Portfolio
            </Text>
            <Img
              className="h-[19px] sm:ml-[0] ml-[281px] sm:mt-0 mt-[9px]"
              src="images/img_arrowright_blue_gray_900_01.svg"
              alt="arrowright_One"
            />
          </Link>           
          <Link
            to="/coming-soon"
            className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-full"
          >
            <Img
              className="h-7 w-7"
              src="images/img_notification_teal_100.svg"
              alt="notification_One"
            />
            <Text
              className="sm:ml-[0] ml-[52px] sm:text-[19px] md:text-[21px] text-[19px] text-black-900"
              size="txtPromptSemiBold23"
            >
              Notification
            </Text>
            <Img
              className="h-[19px] ml-72 sm:ml-[0] sm:mt-0 mt-[9px]"
              src="images/img_arrowright_blue_gray_900_01.svg"
              alt="arrowright_Three"
            />
          </Link>
          <Button
            onClick={disconnectToWeb3}
            className="flex sm:flex-col flex-row sm:gap-5 items-start justify-start w-full"
          >
            <Img
              className="h-7 w-7"
              src="images/img_frame_teal_100.svg"
              alt="frame_One"
            />

            <Text size="txtPromptSemiBold23"
              className="sm:ml-[0] ml-[54px] sm:mt-0 mt-0.5 sm:text-[19px] md:text-[21px] text-[19px] text-black-900"
            >Log out</Text>

            <Img
              className="h-[19px] sm:ml-[0] ml-[326px] sm:mt-0 mt-[9px]"
              src="images/img_arrowright_blue_gray_900_01.svg"
              alt="arrowright_Four"
            />
          </Button>
          {/* <Button
            className="flex sm:flex-col bg-red-600 flex-row sm:gap-5 items-start justify-start pt-[3px] w-full"
            >
            <Img
              className="h-7 w-7"
              src="images/img_search_teal_100.svg"
              alt="search_One"
            />
            <Text
              className="sm:ml-[0] ml-[49px] sm:text-[19px] md:text-[21px] text-[19px] text-gray-50"
              size="txtPromptSemiBold23"
            >
              Delete Profile
            </Text>
            <Img
              className="h-[19px] sm:ml-[0] ml-[259px] sm:mt-0 mt-[9px]"
              src="images/img_arrowright_blue_gray_900_01.svg"
              alt="arrowright_One"
            />
          </Button> */}
        </div>
      </div>
    </>
  );
};

export default User;
