"use client";

import Link from "next/link";
import { account } from "@/pages/api/appwriteConfig";
import { useEffect, useState } from "react";
import Image from "next/image";
import dumbbell from "@/public/images/fitaidumbbell.svg";
import dumbellz from "@/public/images/dumbellz.jpeg";
import arrow from "@/public/images/arrow.svg";
import Navbar from "./Navbar";

interface UserData {
  $id?: string;
  name?: string;
  email?: string;
  emailVerification?: boolean;
  charAt?: string;
}

const Hero = () => {
  const [userDetails, setUserDetails] = useState<UserData>({});

  // fetching user data
  useEffect(() => {
    const getData = account.get();
    getData.then(
      function (response: any) {
        setUserDetails(response);
      },
      function (error: any) {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="hero-section md:mx-auto max-sm:bg-none">
      <div className="hero-title text-7xl  pt-2 font-product gap-2 font-bold flex flex-col justify-center items-center max-sm:text-3xl">
      <span className="font-extrabold">Get Your</span>
        <span className="font-extrabold">
        Personalised Fitness Recommendation{" "}
        </span>
        <p className="mt-4 text-lg w-[551px] font-semibold mx-auto leading-8 text-gray-800-600 sm:text-center max-sm:w-[340px]">
          Customized workout and diet plans, powered by AI. 
        </p>
        <div className="mt-8 flex gap-x-8 sm:justify-center justify-center">
          <Link
            href={userDetails?.email ? "/form" : "/signup"}
            className="z-10 inline-block rounded-md px-5 py-3 text-lg font-medium leading-7 border-2 text-gray-800 shadow-sm  border-gray-800  hover:border-gray-800-700"
          >
            Get started
            <span className="text-gray-800 font-bold ml-2" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>
        <div className="flex flex-row justify-center -mt-10 max-sm:mt-2">
          <Image src={dumbbell} className="w-[380px] max-sm:w-[300px]" alt={""}></Image>
          {/* <Image src={dumbellz} className="w-[380px] max-sm:w-[300px]" alt={""}></Image> */}
        </div>
        <div className="flex flex-row justify-center -mt-10 hover:cursor-pointer max-sm:mt-2">
          <Image src={arrow} className="w-[50px]" alt={""}></Image>
        </div>
      </div>
    </div>
  );
};

export default Hero;
