import React,{ useState,useEffect } from 'react'
import {ethers} from "ethers"
import Navigation from './Components/Navigation';
import Card from './Components/Card';
import SeatChart from './Components/SeatChart';



function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [occasions, setOccasions] = useState([])
  const [occasion, setOccasion] = useState({})
  const [toggle, setToggle] = useState(false);
  const [provider, setProvider] = useState(null);

 const contractAddress= "0x5421a03c57e72e54e69470714a39de0f2138e31a";
 const abi = [{"type":"constructor","inputs":[{"name":"_name","type":"string","internalType":"string"},{"name":"_symbol","type":"string","internalType":"string"}],"stateMutability":"nonpayable"},{"type":"function","name":"approve","inputs":[{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"balanceOf","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"getApproved","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"getOccasion","inputs":[{"name":"_id","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"tuple","internalType":"struct Ticketing.Occasion","components":[{"name":"id","type":"uint256","internalType":"uint256"},{"name":"name","type":"string","internalType":"string"},{"name":"cost","type":"uint256","internalType":"uint256"},{"name":"tickets","type":"uint256","internalType":"uint256"},{"name":"maxTickets","type":"uint256","internalType":"uint256"},{"name":"date","type":"string","internalType":"string"},{"name":"time","type":"string","internalType":"string"},{"name":"location","type":"string","internalType":"string"}]}],"stateMutability":"view"},{"type":"function","name":"getSeatsTaken","inputs":[{"name":"_id","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"uint256[]","internalType":"uint256[]"}],"stateMutability":"view"},{"type":"function","name":"hasBought","inputs":[{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"isApprovedForAll","inputs":[{"name":"owner","type":"address","internalType":"address"},{"name":"operator","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"list","inputs":[{"name":"_name","type":"string","internalType":"string"},{"name":"_cost","type":"uint256","internalType":"uint256"},{"name":"_maxTickets","type":"uint256","internalType":"uint256"},{"name":"_date","type":"string","internalType":"string"},{"name":"_time","type":"string","internalType":"string"},{"name":"_location","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"mint","inputs":[{"name":"_id","type":"uint256","internalType":"uint256"},{"name":"_seat","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"ownerOf","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"safeTransferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"seatTaken","inputs":[{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"setApprovalForAll","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"approved","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"supportsInterface","inputs":[{"name":"interfaceId","type":"bytes4","internalType":"bytes4"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"tokenURI","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"totalOccasions","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"transferFrom","inputs":[{"name":"from","type":"address","internalType":"address"},{"name":"to","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"withdraw","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"Approval","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"name":"owner","type":"address","indexed":true,"internalType":"address"},{"name":"operator","type":"address","indexed":true,"internalType":"address"},{"name":"approved","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"name":"from","type":"address","indexed":true,"internalType":"address"},{"name":"to","type":"address","indexed":true,"internalType":"address"},{"name":"tokenId","type":"uint256","indexed":true,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ERC721IncorrectOwner","inputs":[{"name":"sender","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"},{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InsufficientApproval","inputs":[{"name":"operator","type":"address","internalType":"address"},{"name":"tokenId","type":"uint256","internalType":"uint256"}]},{"type":"error","name":"ERC721InvalidApprover","inputs":[{"name":"approver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidOperator","inputs":[{"name":"operator","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidOwner","inputs":[{"name":"owner","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidReceiver","inputs":[{"name":"receiver","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721InvalidSender","inputs":[{"name":"sender","type":"address","internalType":"address"}]},{"type":"error","name":"ERC721NonexistentToken","inputs":[{"name":"tokenId","type":"uint256","internalType":"uint256"}]}];
 const Load = async () => {   
  try {     
    // Check if ethereum is available
    if (window.ethereum) {
      console.log('Ethereum provider found');      
    }
    console.log("Hello world")
    // Initialize provider     
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider);  // Set provider     

    console.log('Current account:', account);

    console.log("Hello world")

    // Request accounts
    const accounts = await provider.send("eth_requestAccounts", []);
    
    const currentAccount = accounts[0];
    
    // Set account
    setAccount(currentAccount);
    console.log('Connected account:', currentAccount);

    // Initialize contract     
    const contract = new ethers.Contract(contractAddress, abi, provider);
    setContract(contract);    
    console.log('Contract:', contract);
    
    // Listen for account changes     
    window.ethereum.on('accountsChanged', async (accounts) => {       
      setAccount(accounts[0]);       
      console.log('Account changed to:', accounts[0]);     
    });      

    const totalOccasions = await contract.totalOccasions();     
    console.log('Total Occasions:', totalOccasions.toString());
    
    const occasions = []

    for (var i = 1; i <= totalOccasions; i++) {
      const occasion = await contract.getOccasion(i)
      occasions.push(occasion)
    }
    setOccasions(occasions);
    console.log('Occasions:', occasions);
  } catch (error) {     
    console.error('Error loading provider or contract:', error);   
  } 
}; 

useEffect(() => {   
  Load(); 
}, [])

  return (
    <>
      <div>
      <header>
        <Navigation account={account} setAccount={setAccount} contract={contract}/>

        <h2 className="header__title"><strong>Event</strong> Tickets{}</h2>
      </header>

      <div className='cards'>
        {occasions.map((occasion, index) => (
          <Card
            occasion={occasion}
            id={index + 1}
            contract={contract}
            provider={provider}
            account={account}
            toggle={toggle}
            setToggle={setToggle}
            setOccasion={setOccasion}
            key={index}
          />
        ))}
      </div>

      {toggle && (
        <SeatChart
          occasion={occasion}
          contract={contract}
          provider={provider}
          setToggle={setToggle}
        />
      )}
      </div>
    </>
  )
}

export default App
