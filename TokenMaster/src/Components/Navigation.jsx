import React from 'react'
import {ethers} from 'ethers';

const Navigation = ({setAccount, account,contract}) => {
  const connectHandler = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]); // Set the first account
      console.log(accounts);
      console.log(contract);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };
  return (
    <nav>
    <div className='nav__brand'>
      <h1>tokenmaster</h1>

      <input className='nav__search' type="text" placeholder='Find millions of experiences' />

      <ul className='nav__links'>
        <li><a href="/">Concerts</a></li>
        <li><a href="/">Sports</a></li>
        <li><a href="/">Arts & Theater</a></li>
        <li><a href="/">More</a></li>
      </ul>
    </div>

    {account ? (
      <button
        type="button"
        className='nav__connect'
      >
        {account.slice(0, 6) + '...' + account.slice(-4)}
      </button>
    ) : (
      <button
        type="button"
        className='nav__connect'
        onClick={connectHandler}
      >
        Connect
      </button>
    )}
  </nav>
  )
}

export default Navigation