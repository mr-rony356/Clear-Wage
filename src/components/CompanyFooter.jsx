import React from "react";

const ClearWageComponent = () => {
  return (
    <div className="bg-white text-black py-8 md:py-14 pb-16 md:pb-24 mt-5">
      <div className="lg:max-w-[1260px] max-w-[95%] mx-auto px-4">
        <div className="relative mx-auto lg:p-15 p-4 md:p-8 rounded-lg shadow-lg z-50 bg-[#fafafa]">
          {/* Outer layer - lightest blue */}
          <div className="absolute -left-4 md:-left-8 -bottom-8 w-4 md:w-8 h-full bg-[#E6ECF7] rounded-sm"></div>
          <div className="absolute -left-4 md:-left-8 -bottom-8 w-full h-8 bg-[#E6ECF7] rounded-sm"></div>

          {/* Middle layer - medium blue */}
          <div className="absolute -left-2 md:-left-4 -bottom-4 w-2 md:w-4 h-full bg-[#BCCCE6] rounded-sm"></div>
          <div className="absolute -left-2 md:-left-4 -bottom-4 w-full h-4 bg-[#BCCCE6] rounded-sm"></div>

          {/* Content container with white background */}
          <div className="relative rounded-lg z-20">
            <div className="text-center">
              <h1 className="text-[22px] md:text-[28px] font-normal mb-4 md:mb-6">
                ClearWage is powered by Holtz & Bernard LLC
              </h1>

              <p className="text-[16px] md:text-[20px] font-[300] text-center lg:max-w-2xl max-w-[90%] mx-auto mb-6 md:mb-8 text-[#707070]">
                An attorney placement agency in Miami, FL on a mission to be the
                most valuable career contact for attorneys and law firms.
              </p>

              <div className="mt-8 md:mt-12">
                <a
                  href="https://holtzandbernard.com/"
                  className="text-[#000000] italic"
                >
                  Learn More About Holtz & Bernard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearWageComponent;
