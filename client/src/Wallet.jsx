import { useRef } from "react";
import server from "./server";

function Wallet({ setAddress, balance, setBalance, setSignature }) {
  const addRef = useRef();
  const signRef = useRef();

  async function submitHandler(evt) {
    const address = addRef.current.value;
    const signature = signRef.current.value;
    setAddress(address);
    setSignature(signature);
    if (address && signature) {
      const {
        data: { balance },
      } = await server.get(`balance`, {
        params: {
          address: address,
          signature: signature,
        },
      });
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Address
        <input ref={addRef} placeholder="Type an address, for example: 0x..." />
      </label>

      <label>
        Signature
        <input ref={signRef} placeholder="Signature for 'Approve.'" />
      </label>

      {balance ? (
        <div className="balance">Balance: {balance}</div>
      ) : (
        <button onClick={submitHandler}>Get Balance</button>
      )}
    </div>
  );
}

export default Wallet;
