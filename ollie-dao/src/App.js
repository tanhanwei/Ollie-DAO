import { Outlet, Link } from "react-router-dom";
import { ethers } from "ethers";
import { getAddress, signMessage } from "./Components/ethers-services";
import { useState } from "react";
import {
  connectOllieDaoContract,
  getAllDaos,
} from "./Components/ethers-services";

export default function App() {
  const [walletAddress, setWalletAddress] = useState();

  const loginBtnHandler = async () => {
    const address = await getAddress();
    await signMessage();
    setWalletAddress(address);
  };

  //detect if Metamask wallet is changed
  window.ethereum.on("accountsChanged", function () {
    getAddress().then((address) => {
      setWalletAddress(address);
      // TODO "refresh" page
    });
  });

  const readContractHandler = async () => {
    connectOllieDaoContract();
    await getAllDaos();
  };

  return (
    <div>
      <button onClick={loginBtnHandler}>Connect Metamask Wallet</button>
      <h2>Wallet: {walletAddress}</h2>
      <button onClick={readContractHandler}>Get all DAOs</button>
      <h1>Ollie DAO</h1>
    </div>
  );
}
