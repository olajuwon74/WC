import React from "react";
import Image from "next/image";
import twitterLogo from "../../assets/tl.png";
import openseaLogo from "../../assets/ol.png";
import etherscanLogo from "../../assets/el.png";

const Navbar = () => {
  return (
    <div className="w-36 py-7 flex justify-between align-center mx-auto">
      <div className="flex-1">
        <a href="https://twitter.com/_WeirdCreatures">
          <Image
            alt="twitter"
            src={twitterLogo}
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </a>
      </div>
      <div className="flex-1">
        <a href="https://testnets.opensea.io/collection/weirdcreatures-v4">
          <Image
            alt="opensea"
            src={openseaLogo}
            width={32}
            height={32}
            className="cursor-pointer"
          />
        </a>
      </div>
      <div className="flex-1">
        <a href="https://rinkeby.etherscan.io/address/0x11ecef94728fb5048c1db845f34be160ed5aae51">
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
