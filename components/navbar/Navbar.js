import React from "react";
import Image from "next/image";
import twitterLogo from "../../assets/tl.png";
import openseaLogo from "../../assets/ol.png";
import etherscanLogo from "../../assets/el.png";

const Navbar = () => {
  return (
    <div className="w-36 py-7 flex justify-between align-center mx-auto">
      <div className="flex-1">
        <a href="https://twitter.com/talkn_earn">
          <Image
            alt="twitter"
            src={twitterLogo}
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </a>
      </div>
      {/* <div className="flex-1">
        <a href="https://opensea.io/collection/weirdcreaturesofficial">
          <Image
            alt="opensea"
            src={openseaLogo}
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </a>
      </div> */}
      <div className="flex-1">
        <a href="https://medium.com/@Talkn">
          <Image
            alt="etherscan"
            src={etherscanLogo}
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
