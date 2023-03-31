import React, { useState } from "react";
import Datapickerform from "../modules/DataRangeform";

const Home = () => {
  return (
    <div className=" min-h-screen w-full flex justify-center items-center  ">
      <div className="container mx-auto">
        <h1 className=" font-mono text-xl text-center py-8 sm:text-3xl md:text-4xl lg:text-6xl">
          Greedy Game Frontend Developer Assignment{" "}
        </h1>
        <div className="w-3/4 sm:w-2/4 mx-auto my-4 ">
          <Datapickerform onEndAction={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Home;
