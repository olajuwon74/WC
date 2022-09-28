import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers, Contract } from "ethers";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { formatAddress } from "../../utils/helper";
import { useContract, useProvider, useSigner } from "wagmi";
import contractABI from "../../utils/ab.json";

const Connect = () => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  // console.log(signer);
  // console.log(provider);
  // console.log(whitelist);

  // Use wagmi hook to
  const contract = useContract({
    addressOrName: "0x250e674EC63Df4273c493c419D9f1e44035CBdAC",
    contractInterface: contractABI,
    signerOrProvider: signer,
  });

  let whitelist = [
    "0x37060B9c4219CF5F7FE68f9c7aC24715593c9626",
    "0x5C6AE017A1811AE67F6AbA6a07009D173CCCcdB7",
    "0x951e7e5b5Ca4c96821e6572323dAA1b946CF208F",
    "0xFaE6F3D302Bb55a3c681e959455312a030915bF4",
    "0x058f7C7Ed253B7B82CB7d117F4078657Eb3B534d",
    "0x6306435e32074378236f8188F3aBC6e6843d48ac",
    "0xb0075A0FDf597d6d179Ab2Cb381c63e4550cBC3D",
    "0xdE564454e567539335082F7FC81b3378ee7dAB4A",
    "0xB63C20aDeE994f1E6bD394086EeBEc435B9d228C",
    "0x5C0b5fc1375d36EFCbc0fE844E6ab40a7D690BaD",
    "0x789C84C5C63BC248377D30676dF839995F346e28",
    "0x211e220f5803FCd96382b2c60Ab8678C17529a1d",
    "0xB6722ac207E297DDfa22efb8CF2308c949DB9491",
    "0x4897C27e0F10aF43e2592cB9C395fa3D5fAaba86",
    "0x8fAB781839b673D489e629E624a099Aa9C08741E",
    "0x4ae3fa85BF419FB30Cd5bA1b0604AD295914219B",
    "0xDD7888f68db755B26A106CDFA99feb8171043496",
    "0xeB90De71f3B5268Ef4299A509E99135360815AD3",
    "0x37989CB0a3AEDb708429f5d2813249194a3ddd7a",
    "0x47461133Fb70F15d88e9F05922c46A30DF5883Fb",
    "0x5eD463de0A09145BFa40B8E12A3226b5b75de5b6",
    "0xf0BE7A471A708348DE43e972CeBb4528383A9E9b",
    "0x5FFFE61fC3516C5859a4Ec76f4b30f13C91839fA",
    "0x1BF8414e3958f6c8b31F88b1048aaF1030741489",
    "0xd482228f5A6ac376eB61da65111894D70c586C26",
    "0xB37d542E814307b4CEb76223244775563dbAfC77",
    "0x26EfB2b024b0C80171a797dB470158F93affd72d",
    "0xBed0EA1208FAa5cAd5fb87F4ac7906AA3a05C4A2",
    "0x68CEbF2Bd89468CFe74B9909642435A630d538aD",
    "0x5bb3D5e0c3992354307f48D4c31F8abC933FABb9",
    "0x2D8f11b3e4010C067Ad964D5d8558e2b61E21f07",
    "0x4fa0e8318DFBb42233eCb5330661691fa802c458",
    "0x5D02934205887e08AD0fEA624428bCf3AAABE74C",
    "0x08dFE42F11b69c51F42588860568f434D4c69A55",
    "0xaE443518A21bCa6c8fB2E9f856A8c69a274FA7ca",
    "0x2c5D2eC885ed2A1ebbfE7827D034A155C1449B61",
    "0x4eB627E7EbeDc54dBD52756855Cc9bbD230BbBB9",
    "0xaFaA9247B7B0e246A41b1C26337c5E2FE0d6A598",
    "0xB8De722c4F2Ffa11bfddAf1D50421cA308FAf347",
    "0x08F4cdaF54BE97E7afD9582c2288C142A3ccd46E",
    "0xf4eCF048077F304Fd8AB0A3e45837728134557F0",
    "0x0907B14771F2b04c5A4643E611d23f7e988bD35D",
    "0xAc04BD6f87ac7792B2746C6b7a897b38dC54Caeb",
    "0x1c50Ec9738B80Ca4CE68D85527d8a8c4a1BfcCC1",
    "0x44a53cE73B88e56bf22cA5751eE164719384dB25",
    "0x7ac3e67689e2aB32f27e88f4ED019A6f7224b22A",
    "0x52d09189264FaaA709F1AED9C457e55c9e4B5D29",
    "0x17bF69469E8Eb1C92410866E78890beA564E6a7C",
    "0xb3bAd5fE2570CA0A451363cFF96C95025C116931",
    "0x530fbfD105fF09508063a005F9b9dBB2003B15F4",
    "0xc24060EC7A2ff41158fC0d8A2C9dF9aDDD9Dc162",
    "0x2474DF60ae28F3CbA77c44D0C316BFd37DC02cF4",
    "0x4ba579d473d70DF138AD017005957A764938e952",
    "0x2d24Ac209FE0633f2D72e9888b851711c2f1dd30",
    "0x5E59428f72aa38E6AB7751Fdda4Fa535066390ee",
    "0xa44485865165D13D7f1db22a9Ca9440cfAc48f75",
    "0x8AD135b390aB3116ff7Ac5A38bb90A928853d32A",
    "0xc9b7beC3bFc52e7544143db3f447A56B20C05763",
    "0x2E3D760AC1596a3F567627D5eD59A45a794053ff",
    "0x2c99fF2FF0793acEd830d8C267D8E713E67583F7",
    "0x9e8eA10e991C1b535fb6ca08Fb21Fe2270370795",
    "0xc9303eD3306f5F54e6f5D0BAf2e87213195dB7D6",
    "0x5E76B3C1B2BfBDccE33d353b3273C936272bb956",
    "0xcf48800a3103Bb348195Cf78Ce4E0f27b41aAC67",
    "0x5b25Fdc3F2DD0d69cC6e93Fb3361F9725DcEc14b",
    "0x261ac389Da4a1dA58BAC4c57747b6b0CaAcEaEe9",
    "0x2A8153837Fc6cBD65252b82D6EFC0d6A47bf9aDf",
    "0x59A12bdfFf473a068E3f04487042E4492DCB3c68",
    "0x12e12dFffe4A1069d972f6AC1c41928F7d54Ffd8",
    "0xFbf1e83F0E7822fE48897eb429A4185Dcb866ddd",
    "0xc2c4609b1aEec0A34E9AC5B7CF991D78033896e8",
    "0x404cd16dB01A9612d4070d386b8849D7D70A2Aed",
    "0xb5Fe7387BbCCeC416D3f7cFa6C1cBc950aF7012D",
    "0x996d495F7604F6347161B7ED48d0C289D8E679A8",
    "0xb0aCF2dc7e3ba3a8De3C5952931E0750C2c6bDB5",
    "0x0915ea65F6B5553164Ec946eA87793239406cb7f",
    "0xB79B199e265026b0A6C16F3087A994E283a8c28D",
    "0x0B19c24B2BD4e6339Bfd2a7ac00bb99C06a7b564",
    "0xCf500E9a3657099f3a5Ede8Ec2f50B428A4703D8",
    "0xB082dBdB76456DAe1C966b9B21C68372346Cf07C",
    "0x0Cb68E2bE8E397eE5529Fa63DEf7926D6c185729",
    "0x89427af447E2D9881Cb79CE0c2d7fDcD592Fb221",
    "0xc5B215242404A83Df9E979e6d1546EFE660e1cAf",
    "0xf0109ca8714c5865E17c3Cf479Ae4bdEd0cD459B",
    "0x6909fe916fC63276C51843D56aB4Fa9e12dc2eAB",
    "0xbeA3834F67572a9f9226B63aB87361334E6B09b9",
    "0x6031B736D50F0D4845eB756169E74F7e3756e157",
    "0x04ACFAfE348c904f1791BD74db3Fe4Ec06F8A2F9",
    "0x888c1546006f545A6904b43F258362bC6ff35A63",
    "0x8b779ef21260b73371441b6485d6b851c04c77cc",
    "0x3E5fce21497Ba4aCff43e7F3111b85C47cfaDdF4",
    "0x0A63040E9f5F0d8422b28E7db62422AFCe1cB57e",
    "0xe93875F79Fba7691CFda0ad1Cf2D431D44651877",
    "0x3A13646cf7Fac5a566d76B048deD85BAB2F1E075",
    "0xD10548Aa56e6EE65aBE3a207Bbe872Bc6F5fd803",
    "0x59f4Eb2766C9031525d1C746E4Dd67798Ed76d3a",
    "0x6EEf09B526d883F98762a7005FABD2c800DfCA44",
    "0x70977CD6C1Df035BAB327e0E01e7F837b9E40A73",
    "0xBF687b56A69e5411d3901432c94E36786A002427",
    "0x874266932368C8E9c438De004EB97E37E6913f77",
    "0xBCb9C070D8dF04C421849066Fb133866F5E26003",
    "0x60E70632Bd42490b44e8d558816f782d37a030eC",
    "0x56879cc88fa3895C082C22035dB1386DcAc53bba",
    "0xA0291eEc6999Eb04950C34399ab0e478C3AF7B46",
    "0x932a9749a8844354448c235971ccB8D0f4e2bff9",
    "0x1EBB2B56Aa179121AFD93005AC4DD4b65b4Ec8bD",
    "0x4d87f05ABb7ab6dC36a1cd956E15F28DFa2f381E",
    "0xa6568c7f1d10EaCa59C62007fC6cD305Fda1CD7c",
    "0xCbb38692114F60F5E24B7222209fbf771FAC37c7",
    "0x7c1C55c794503753D5e173a26D4bCBAFc95e4b44",
    "0xB5339157be76de7c5a796Eb7eae58239bf7501b5",
    "0x08A86e97a3817dBC27D848C61D69395feeaf85bD",
    "0x745dAC3BCcC835316d4DFF89256B8b9f65530Bd9",
    "0x428763b2Dff1C0034A20e2bEFbA71055C4993306",
    "0x25c71634a7682f86089b1ef84af7ec469281fc73",
    "0x24fA9EA7eccB93c4BE60A0cAf238b99426bDD817",
    "0x05350a4Ca721cDF6787BaA43D15217478c770cE8",
    "0xeE38297ed7C0e96849Ec8581128033f99F48650d",
    "0x943cf0F52Dc298284c08F4C3AE3005B5ADb48425",
    "0xc6D18C1D32f5bCFC090988cA9CE5C8dB3237A9b9",
    "0xc9CC632FB4d2DCE6fbe0d3e878D1Deae29eaF55c",
    "0xdc58F84B6d029984916e99E252D2Baee5d273da5",
    "0x96cEc8950196C15dd62AEC2954028d6C542A80F9",
    "0x7c872866Fac692Ae34b07409BCB85186436d193d",
    "0x685900484258c73676d7da892ac2966e17e89160",
    "0x738B5d2a69eF1088325CA9d6addeDf8F87150606",
    "0x9Dc551EedA53eD1CB98EA8419a85419b7c4aC381",
    "0x8C28989D99059960223Bd600Cd7451d707b294F6",
    "0xb770712b5ec1a980baf7672aea9ae9448abb302b",
    "0x187157fFdD1058C510899c699F8C1DCEf75523bd",
    "0x14E7C0a83ee77a9c40109E477ad86AE147C49F28",
    "0xBE48f6683c374C2Fc3a28BAb444b3cF05BF8218f",
    "0x5f91d82634c766c39a7841d01710d63d93db4cd8",
    "0x9EC8F84bE5475603c0797ff247535c4407F1015a",
    "0x8ec27E9F5BAb92b94b15ab4F1DE164c5a5da2e99",
    "0xd0B97dB57d5761Ed0AB98D716ACC5f44ac16ab52",
    "0x1996578c0ADFa4eA9444060907C953EaF1D8C96b",
    "0xfaEE7C5c172fb24722A3d809EBdCEa127C1f3FcF",
    "0xbD5a6b50310711E16b2a88b08F07099B372a61a5",
    "0x2991cf93EE221882aB9Af6323738714f2e0bD709",
    "0x45dc50C9af4d0A545DDED4a834d33079dDC452e8",
    "0xa4c65b3aEa78D9541090066aA316D23F6C8f1888",
    "0x0682B693583885FB67169E893881e3F71339C913",
    "0xE14a386Fdc61028add50eE48c1b0c7A900FD732b",
    "0xe5Db91eDe7387428825c04A588eA007CdB15bEa7",
    "0xE7b2728fA5C086c218Ce329853944936289030e2",
    "0x6E17D3A927A1Cb80751AE7e8C25D46157E2F22fA",
    "0x08EDA6288d98fF58eA32bC06D45c9B25Db44188D",
    "0x8Bde02BCA9e98872C1671CFb48e097DD45109EF2",
    "0xA0784cB208Ec8CeFfA0522f2134b7665C33f38F8",
    "0x45B365834Db86549D170e038897665BcbE69B68A",
    "0xE0198d56B6AE2e5d31920aeAadC99413b847196a",
    "0x19749680dCA0B25e5977C6f6B51CAC2B73b7567c",
    "0xF0B11e644F1b40AeA32a3F078C0603751e54e49c",
    "0x69B62C4Fb201F7509BB0c3aCcc20F1291f801a46",
    "0xC7E68e35ccFcb8e9EF4732c2aC14D1aA36d3cF20",
    "0x73a028C5a2C7f865A3194E9aE89C32638C69EA32",
    "0x4c70BBE5895737398F9Fd3fBb044925F2DAADA24",
    "0xb3D9A9123aCc804C2d5B29e24A4C9346b3f3e767",
    "0xB426042138079823062909418Ee9efD5E1022398",
    "0x8C6b49E265f69879B9A29CdA9c5C5c926c403E6B",
    "0x8CFd3e58b6651e604716AadA55fC59a8c0BC7DE2",
    "0x2A0038a55f5fD0Aa4F5e8b4231C6e091Eb2E9aFB",
    "0x88eA3a8ED7181b7d9C103F7B6040efacbf725A6C",
    "0x33686541f23e1d137374da93af3055ad6f52c642",
    "0xBe2154F6e5099B1356aD530CE554f6C805A14fB5",
    "0x5Dffe87e74Ba0428c18827f2D91F89b982F8b3C9",
    "0x8301241fb69c752158D76BEa27deac0Ce86386D4",
    "0xcb6951aD9827FD28a2E3dfc656847E62D06A530e",
    "0x5B805556207df4D2bA3A5DaB67634eA4Dba15C65",
    "0x528f0830579aa74Ef8A0bDfB4daef583994b78cA",
    "0x813d6fe259c4d96682191543c4cbd8696Dd0e46E",
    "0xBF2902bC7651B502541fc675Bc9CdE07123E0a6e",
    "0x6c2e6448D211f4E9F5e02162dB73e31a381b1cb0",
    "0x91B7C14E8CdBdD6ad82723bd8Fed47F2d79c9861",
    "0x644802c6128aa215bb4edffe46e9db63c6794d5f",
    "0xFdc92adf798BAB3F194bF49f3B0c43E1FF971CAc",
    "0x56Db8E8Eb78c206C1B8791C955dD412BD88BCC38",
    "0xBc17E4f734e651ea58556b724d5D294E01C8FE5",
    "0xa7B99c55C7B6F31b3E2C19059F07697E0869e18D",
    "0xAfDeF46e14d0CE4B94A4a8AB433D13697E1705D5",
    "0x65632BD40923ED32E452e4323751c47F03Cf1822",
    "0xD88797736DCFd89A2e30F0ec49b9201210E8f1E2",
    "0x88c53C9ab000634c6662Ed9eceA6A33e0D783e1C",
    "0xcc592D0A75A58639C7782aE38Aad36c04ddf0e71",
    "0xB035a54D326d5E30CB242387eD5624a5925a73A2",
    "0x783165E69C7980210883f150c1990F8f4d06416b",
    "0x1332a577B37De603e2b73A0eca601524e8CCfbce",
    "0x01F32A024Cc1b6a8cF6cbCcE1cD07250FdBc831d",
    "0x85729e1aAfdF88616175cFf6b51Fc9e46c4768c6",
    "0xe0d3068743F5Ab4fe98eAdB865a38b705366Dcfb",
    "0x8237F0cC8444419Bd03bacF4913B8af90eA02e6b",
    "0x3bae5C9A5a93A1F14A00B8517277356870F49269",
    "0x4Ff23bcec6E5a0C76914AE5e25a7C30FC7e5A88e",
    "0x85a1CbD63e7552a036B98f525a8A5500A15EE2cE",
    "0x3561b6f6517fEf33D75e3d25e4df7a392C5D2559",
    "0x8Ec619C861CB6d99a6BB6988e3088190709B2eDD",
    "0xb4d528D98f5Aa9e18DfdF8Ddcaa059f44a774101",
    "0xA84eA67595A4824Df0F6F2Cc10A0DbD7B6C12CC2",
    "0xCBEF2735aDa7B87b4B5d7f966e40E629F32023a2",
    "0x8ad5ABa6216afaC5cf0E6f5a0eB01A23dC022f03",
    "0x88037d73246b6145B901b4F9785b6D3CEb6b0fcd",
    "0x5fAfaBaA4B3294C51bb284AF020d1E39944baA0A",
    "0x1B8e2c1096468d4BCABe52E203d3D7433Fcc852d",
    "0x4daf65C6BeD0c277FCe27be19389966Eb1F48518",
    "0xC5e21765454eEff96cBC3155A6B9524023Edf519",
    "0xbeb9446349cD86d1cCD97dB86F097B9807f44851",
    "0xbc633F0F274fEc7C750030318dfcd2512A84eb32",
    "0xDA30f8eCF434c0fD46b67b8F3Fc41e8fe575371A",
    "0xc3849287dc3fC6bA3B9F399717430DA55f0cFa02",
    "0xBdF8b33c06BAF54F74E2f305741222B46AF6C0De",
    "0x5b1Cd1557a0D1d39337e8F2fEb486eaE173327D0",
    "0x37F9ea9C138d0948563Fd4D8E87739fb2cA7B9d5",
    "0xd217394dc6502C1541541f988eE5c39A1E074c82",
    "0x688BC734E0f452DD46c6B36f23959Ea25F683177",
    "0xC578498e6EfE001AbA59b72e77ba5e2505cC8f22",
    "0x33686541F23E1d137374Da93af3055Ad6F52C642",
    "0x81f60901aF0C1332940d0fE119190811aD35C857",
    "0xeB5ab54D86710BEdfe443Cc06F567EB60E53dEA5",
    "0x8b659EAD7742A1E611464d20f6b6F7D007F3Fa69",
    "0xAb4fb5276a71Ec64b9D2446E1Eb21FccE840A987",
    "0xbEe1f7e369B3271088Ed58bF225DF13Cd96D32d5",
    "0x48dfB0e68A77b5cBf4Ae5C0DAB2c607c051372bD",
    "0x572E599D2B0225ca86C1677035BCc065f9aEefa7",
    "0x794603C1a0c4799b04Cd8F9406D2b201286CE63A",
    "0x53E1e12CCa78F3Fdb17F4d5175B88F62c2Ee4642",
    "0x90ff60dc045c861dDD77E1451329100F2c6041d7",
    "0xED6F4DACF10d6af5EB1eAf2DE24b695Eb1599bD2",
    "0xBF36596134Db137142f8646775EC7045f7F223a9",
    "0x411B05448Df50d9953873f24d97A77B8EEC4Ccd8",
    "0xB4fE11829d0420D679ada633fbB9C2ba640559c2",
    "0x5421BFCB1CeC95e3b80faB745b60e61706847cC7",
    "0xa0808a934f93ca2ba4947932d0ef150d7b625650",
    "0x6FdBf5170410bD4ea3B841f926B3906c2E155907",
    "0xD57811E76972726AcBe89e57BE5Fa98105DD8247",
    "0x1B8e2c1096468d4BCABe52E203d3D7433Fcc852d",
    "0xed9a750995A84Ba18A4A6a319862c4202d428fEA",
    "0x68EAf1c38ffDBA19B90eabcf8ee9B3E9A73e6908",
    "0x3D08428Fbb0BAbc7699035F300094d598814Bfb7",
    "0xAf263eC04290b2BfBc75748Fc22C465FA8Df76C3",
    "0x9f89fa91440Dd9084182d22ce044d46695Ec5536",
    "0x27092FF6a7Be233F12e68592B4374677175572A2",
    "0x8e3d615F9dd76a408ff9345715BDcEc2F82032C5",
    "0xd97371E5db6de19e47ec76E45EC0e3A712812111",
    "0x7735EaF9d7752C128CF71735Cf9d42098BAa4D06",
    "0x9D12E9EB9DBF94B4Fb4b7B474E2fFc9b6d38Fc50",
    "0xF7ec405B406761e4dED2B851110e1bdcA3873cD7",
    "0x03f528fb4F141660e28Ad57a0fE575bf74a2f3d8",
    "0x186E4f417Aa013871F44B718F72EdA100bC4734D",
    "0x0715FbDd3FFf5D9150441Cb19392754FcdA9A9Ca",
    "0xD112de065Af95f6845280E128A62C3e4E2DE4Fc8",
    "0xcF3094CBefD39DafE3ed1bff831A8fc1545Fe829",
    "0x5a1E8287Ef7aF8e84c0c30736f114236BB9596b2",
    "0x3F087088b4a49EfDC627118D36FF7d957C8Ab38d",
    "0x0f388f7887A4dF5B1d62A3A2e9B10dC050de5995",
    "0x5B4362F592752961927FDc946f142293DBB8A255",
    "0x062ACC6b1f60b85E52Ce91cc17aeFD6f82f0E7AB",
    "0xCabB179ca4f9360e4761121A2363a3AF5587B1aA",
    "0x358Cf44916a83ebf0ff861cd60BBE093F4cE583e",
    "0x8DE0A7F3B9789921bE6934fa132049790A9D8b59",
    "0x93ab3c4e6DAa20b2B7Ea65754a8c11311FbdbA38",
    "0xE10F9c661FE7FA7Eb8023FFf15B032fF89e09303",
    "0x5FCd863b665E91e0cDabCc636905FB4D516eFb0e",
    "0x84dc644720532527a6ad4cbfe8c9a36102c9b53d",
    "0x155a3b74c26955Ca5174500A8f83947d7793bDd2",
    "0x89bd3859efD001b27fCBceE0609646c046856b7b",
    "0x93107B05Ff39f13386eB5914DB1C89AA50a9686F",
    "0x7f76bc9491B39b25145a57f334311403f99760b4",
    "0x7aF820D05488342d5321fb648Ef3553183dE7E9d",
    "0x112A0De2493F2712987C68156808bb388D0b6A9C",
    "0x57cDDe74Dd2f239E2f83AA5C21F4FCBcD346a9e9",
    "0x3112898342C3D1fc12F745F6DeB5D762EACD7578",
    "0xaC167C61509011f0B52d1e74e3308d5E729252Fb",
    "0x2cE1d6960225fDFC8A57E553b5FbB3b3E1C6B61A",
    "0x2F42dF5Ad2F3401cE3D9eFe7064dce7059f298C9",
    "0xa1179dAef159f304021ba3485f390c6D9171Eb89",
    "0x6Cc82C9390652C401d2C6af8cc01601ca4d4790c",
    "0x8A89f1BdC8E619fF37eC9D9C412117656618e37c",
    "0xD2b0EA86D97dDA380C157A5E8b76918D0dD0847D",
    "0x9A6c1c95Ca11f0cF9B053dF3cb883c24D4ebE4a1",
    "0x0AB0C6F400FE00e3238715399ab05Fa593ADCDbE",
    "0x32115E9896b5bfecD3afabBfe50E251D3ba0564d",
    "0xA415Ba552DB0EF948c7D3340C26Ac61772C0AA0f",
    "0x3be2585e4408848EdA54A57A0EA8F20A075B56C2",
    "0xC7565DC959df44777Ef23FcF9f4b15fb5F96a12B",
    "0xEb45d5C4874268D7309985b3EC7956193dAF5bCD",
    "0x8DA9c066812C28F50D1a1ad5a9FBa2aCC54C6C5A",
    "0x20Ad79454538Ba7Eb0EEB1D292cC957701d5047E",
    "0xEDD4CC79977742Dd8321f003194AAa6e459Dc509",
    "0xEFAFC843d3e833397e4ca11802c3C29ef29588e2",
    "0xA26c5F0b89322cd75828d5085Db8164287315df3",
    "0x6570695BC768908e921A077e021effdf653b7502",
    "0x8bf6bB7882E0B52E3680Fe063357cA6Cf6fD90E7",
    "0xFe9243b59d6d2Cc295213201cDd9f7a7714172fc",
    "0x03b21B803FFE24c6F98aef1546C57a3e733e0DB1",
    "0x55945A822edb71ffc62c18Bf6612231f418c18d5",
    "0x376837BaAb5cdf618EDa2eBc73b78eB5097608B3",
    "0xCFf9a63631A775AE5B1F460cC3a95941C354B52E",
    "0x156C995AeDa7F4Da34E4CF8e0d8741CE417EEDFe",
    "0xD2DbfE7A72C575b1CdD92e403095d1d7b9F41FF6",
    "0x8fE1b3233038908234DF4723CDfa4F23394215B0",
    "0x5E53c1d79BF26477E13D9559fe2C841CddDc083f",
    "0xF32Cde290A8eb22819C30600cF59B5E10d150e81",
    "0x6e4d1D11f85C25AaA3ba8788A5C9B4d56aF505D1",
    "0x0B54e088D191adF837BbdF0323C74289C6F6Ee8A",
    "0x2D8f11b3e4010C067Ad964D5d8558e2b61E21f07",
    "0x0aEcd559e4BDF2157d0bF0380E20dAd0535Df37D",
    "0xf6f39FbD44533a2c5f37c5F034dDD62B69BC7E47",
    "0x37989CB0a3AEDb708429f5d2813249194a3ddd7a",
    "0x44039D1eDaa4edac9ff1074e66612B73E51e5cc5",
    "0xe8cb7fDc5141F07950c673fA82D30Db79297EEBb",
    "0x3EAD96cD0702c6119393452c20579C3a75aB4399",
    "0x6868B90BA68E48b3571928A7727201B9efE1D374",
    "0xfF5D98C2A2EB2f27DA61566c22c4C64639E1AB0B",
    "0x494BB457B0DfBD9A9F6943597e4F3D4E57bb1FD2",
    "0x829A27b4dEA03359ae45bFB52d1a8bbbae15ef2b",
    "0x882BdDC22fA977DF75065A7808f9c2356961549E",
    "0xc1d903c67420662faff8d08D32ff4b711e723265",
    "0x999b2f931F4ADEd6218e3d49126D62723aE0A63A",
    "0x209E1E86A70a9e37A7f07f3B6db26334749E50a2",
    "0xBE4f958147e1D4171d5Ef533846E654090E545e9",
    "0x5f9DdD54d19d4A7D6dA010f8A934f9ecfD0149ea",
    "0x51202c5878Da7Ef37B9F634B026CFdB7AA12d664",
    "0x4C65b06a49c7d17A4373DF12fc3060A8457E7499",
    "0xB730bf9c8b97d12d96eb30Beb29382110c2D8433",
    "0x2f623b63EC0B567533034EDEC3d07837cFCC9feE",
    "0xD929139dbE8f1489dA32d33C03d96f3AB988A48a",
    "0x4304391F2fFfCc18CF3C907b9CD9AE43128e333A",
    "0x7E86b0C3D687e43d36e81f54bb4b9293c5E30B33",
    "0xa0975e85945598a2bCFde9177f9171Bb2a8E4f5D",
    "0x4728e9C16452fE13A1d9f44d9a114A5A252F14E6",
    "0x5fCa3C53dA9DEB445e7Cf12c8CD1F4D7cB678C96",
    "0x72f25A92BaFA1E0cBdBB8907648b5757C16e6d42",
    "0xa4f52D66f2557594C99901F4E0E427c63c9FaF4a",
    "0x97ad9AE23dB4E6882c757E0a0E35193700f70d9F",
    "0xE052C0f30c0c92D834eD694fbCD73Ea8377e07a1",
    "0x2779abBe65beff0612dEAa6253143E72b5bf2DEF",
    "0xeb9d49f390e129658493dC884b3ef3225AD49e8b",
    "0xB95231a8029e3C334c9d7464Da2AC1151A13A9d6",
    "0xE91796D1E18a899DB8123C1Ddf84a86a499E6e12",
    "0x8bA3187ed532F373984B50ab07b554e0EC8FBb5C",
    "0x585E0268168Ca2d66829BDAB3757fA09F76FF262",
    "0x100105Dc358a639C091C2E111f660E080E7382cB",
    "0x2e039299209DE1419280127D6823a3db1e7E1EE6",
    "0xbAb4197463943fdCC4303872e6F4c99aA5F1d26c",
    "0xCA1Cd2C5a4CEa64EBBd32d0c128D5972cB530D55",
    "0x0E154A235cCB32f31D4f472Ea4B7f841D29648EB",
    "0xeB46155538c178cFc13D53B101Db174DFaF7D519",
    "0x0Ad76F6fe77683CD4408F21925c1cB03cf9270C3",
    "0x82F885F1aDCA2175C7F62DcB85dB83289C03F69C",
    "0xB79cE19E497B4EF816Fe9A705af2d7B65c1e390d",
    "0xfBCfB8cFE56D9eA1471b4DF7f0b3c91214e360E4",
    "0x64c0353c2bD98fC0661fe167032d51a3945f1CfB",
    "0xE9275ac6c2378c0Fb93C738fF55D54a80b3E2d8a",
    "0xf713727729C8dae3F2772517E5D1A8a5dee6E3E9",
    "0xB14518023ec1E025f42E05Cead7818fC925e2B51",
    "0xECDD10FfEa3c8fca0678CcBc51361a80907693De",
    "0xb715796592f64f79AD866a7eeb7430E96A89bE9c",
    "0x6C9486f50545AE405ea6b882bdee105A5FB78459",
    "0x5A3F81D29B66849a7F986D39Df3D53FA6b6470Ae",
    "0x9B472bC59E8003088c7a04f00bA8ba2b313a4ffa",
    "0x77822bbC28a6cf57E57acB4A98991C728cf8b76B",
    "0xFc0BB39C840567381c8C714828cd23Eaff983D94",
    "0x178e9bF9E406dC194cAE4f006582380d7DFFc536",
    "0x546f73d4291DA0C1237ac9dea6326215B6B865c3",
    "0xe243283c266C65f40a56744624f716754D754742",
    "0xAc878f25Ca8325d434519A857a039CcF46B1921B",
    "0x38c267e40fFBbB127EAc96C117B904724Ba3FeD1",
    "0x329071706252848F14a26D99A43C7B572Ff65fa5",
    "0xb497FC1D63C7e4EE0C21481a4c875E47d8FF245F",
    "0xC511ff8d755Ce88999294a0f05BC787D19235172",
    "0x5Eb898BB8Bc45E98DdF09FF1243c188b66F039c4",
    "0xF2345EE0CDc9CD7DAa125Db9Cc3F257B075a4Df1",
    "0x922b7Ebf28ce398E1Ae7c70f4bbC2443Fe4B47b2",
    "0x0e59FEab7e723Da4e241100A79b1465880754e04",
    "0x07F4b7f3c85Aa8a3fceb113b7A424aB822ce77a9",
    "0x9e51d11f601715d78ff1ab4154c050adf99ea0ae",
    "0x0f7f3cAb4a71f169d1642Dd97A7A30fd9a394F60",
    "0xEEaa1b87C08707B0b921F1fF192F4fF1458837eB",
    "0xC635dC7e540d384876aC4D6178D9971241b8383B",
    "0xf18be8A5FcBD320fDe04843954c1c1A155b9Ae2b",
  ];

  const [value, setValue] = useState(0);
  const [cost, setCost] = useState(0);

  const getTotalSupply = async () => {
    const customprovider = new ethers.providers.JsonRpcProvider(
      "https://mainnet.infura.io/v3/80997b0581a04d009149b879ec3c4e5f"
    );
    const addr = "0x250e674EC63Df4273c493c419D9f1e44035CBdAC";
    const contractInstance = new Contract(addr, contractABI, customprovider);

    const newValue = await contractInstance.totalSupply();

    setValue(ethers.utils.formatUnits(newValue, 0));

    const single = await contractInstance.cost();
    const conv = ethers.utils.formatUnits(single, 0);
    setCost(Number(conv));
    console.log(cost);
  };

  const handleTotalSupply = async () => {
    const totalSupply = await contract.totalSupply();
    setValue(ethers.utils.formatUnits(totalSupply, 0));
    console.log(ethers.utils.formatUnits(totalSupply, 0));
  };

  useEffect(() => {
    // console.log("executed only once!");
    getTotalSupply();
    // handleTotalSupply();
  }, [""]);

  // handleTotalSupply();
  const handleMint = async () => {
    const leafNodes = whitelist.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true,
    });
    const rootHash = "0x" + merkleTree.getRoot().toString("hex");

    // console.log(rootHash);

    // let address = whitelist.indexOf(data?.address);
    let address = whitelist[whitelist.indexOf(data?.address)];
    let hashedAddress = keccak256(address);
    let proof = merkleTree.getHexProof(hashedAddress);
    // console.log(proof);

    let v = merkleTree.verify(proof, hashedAddress, rootHash);
    // console.log(v); // returns true

    // NFT calculation.
    // const single = await contract.cost();
    // console.log(single);
    // const single = 0.005;
    // const toBePaid = JSON.stringify(single);
    // const costOfNFT = ethers.utils.parseEther(toBePaid);

    // const mint = await contract.whitelistMint("1", proof, {
    //   value: "0",
    //   gasLimit: "300000",
    // });
    // const mint = await contract.presaleMint("1", {
    //   value: 0,
    //   gasLimit: "300000",
    // });
    const mint = await contract.mint("1", {
      value: cost,
      gasLimit: "300000",
    });
    console.log(await mint.wait());
  };

  // Get data from wagmi hooks
  const { data } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect();

  return (
    <div className="text-center">
      <div>
        {/* <p
          className="mt-4 font-bold text-5xl text-[#413738]"
          style={{ fontFamily: "Bahnschrift" }}
        >
          {value} /6666
        </p> */}
      </div>

      <div>
        <div
          className="bg-[#413738] px-6 cursor-pointer rounded-full py-2 uppercase text-[#FEE0DF] m-auto  text-xl w-48 sm:w-full"
          onClick={() => {
            connect();
          }}
          style={{ fontFamily: "Bahnschrift" }}
        >
          <p>
            {!!data?.address
              ? `${formatAddress(data?.address)}`
              : "CONNECT WALLET"}
          </p>
        </div>
      </div>

      <div>
        {!!data?.address ? (
          <p
            className="text-[#413738] px-6 cursor-pointer rounded-full py-2 uppercase bg-[#FEE0DF] m-auto mt-1 sm:m-1 w-48 sm:w-full text-xl border-2 cursor-pointer border-solid border-[#413738]"
            style={{ fontFamily: "Bahnschrift" }}
            onClick={handleMint}
          >
            Mint
          </p>
        ) : null}
        {!!data?.address ? (
          <p
            className="text-[#413738] px-6 cursor-pointer rounded-full py-2 uppercase bg-[#FEE0DF] m-auto mt-1 sm:m-1 w-48 sm:w-full text-xl border-2 cursor-pointer border-solid border-[#413738]"
            style={{ fontFamily: "Bahnschrift" }}
            onClick={() => disconnect()}
          >
            Disconnect
          </p>
        ) : null}

        <p
          className="uppercase my-4 text-[#413738] font-bold text-sm"
          style={{ fontFamily: "Bahnschrift" }}
        >
          "SOMETHING ELSE"
        </p>
        <p
          className="uppercase my-4 text-[#413738] font-bold text-sm"
          style={{ fontFamily: "Bahnschrift" }}
        >
          The platform for talk in web3, through CYVIC.
        </p>

        {!!data?.address ? (
          <p
            className="uppercase my-2  text-[#FF0000]"
            style={{ fontSize: "10px" }}
          >
            Ensure to connect to Ethereum Mainnet Network
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Connect;
