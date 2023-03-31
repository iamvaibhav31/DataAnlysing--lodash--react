import React from "react";
import Errorimg from '../Assets/error.svg'
const error = () => {
          return (
                    <div className=" bg-gray-300 p-10 rounded-xl">
                              <div className="flex flex-col">
                                        <div className=" flex justify-center">
                                                  <img src={Errorimg} alt="Error" className="w-44 h-44 sm:h-48 sm:w-48" />
                                                  <div className=" flex flex-col justify-center px-2 sm:px-4">
                                                            <h1 className=" text-lg  sm:font-medium">Hey! Something's off!</h1>
                                                            <h1 className=" text-lg sm:font-medium">We couldn't display the given data</h1>
                                                            <span className=" text-lg text-gray-500 sm:font-medium">Try changing your filters or selecting a different data</span>
                                                  </div>

                                        </div>
                              </div>
                    </div>
          );
};

export default error;
