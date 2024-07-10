import Web3 from "web3"
import { useState } from "react"


const Sign=()=>{

    const [signature, setSignature] = useState('')
    

   /// 1. Define Domain data types in an object

   const domain = [
        {name: "name", type: "string"},
        {name: "version", type: "string"},
        {name: "chainId", type: "uint256"},
        {name: "verifyingContract", type: "address"},
    ]

    /// 2. Define the data types for the data to be signed

    const docHashDataType = [

        {name: "docHash", type: "bytes32"},     /// data type for: the generated document's hash to be signed
        {name: "nonce", type: "uint256"}        /// data type for: the nonce to be signed
                
    ]

    
    /// 3.  Initialize the actual domain data to be signed
    let domainData = {
        name: "Zeconomy",       /// The name registered in the smart contract
        version: "1",           /// The version registered in the smart contract
        chainId: 11155111,         /// The chain id for the blockchain network in use
        verifyingContract: "0xc5564050EB77D7D84d7b57C7313073D1b180fd51"     /// The address of the contract that will be verifying the signatures
    }

   

    const hashExample = "0xaae0087ac5683b761dfb98ae214d47beae54badd4c6929ff373cc3d4fe882707" ///  A dummy data for a bytes32 document hash

    const nonce = 0;     /// I used nonce 0, a dummy value but the nonce will be fetched from the smart contract

    /// 4.  Initialize the doc data

    const docData = {
        docHash: hashExample,
        nonce: nonce
    }


    /// 5.  Process all data to be signed
    let data = JSON.stringify({
        types : {
            EIP712Domain: domain,
            DocumentHashData: docHashDataType
        },
    
        domain: domainData,
        primaryType: "DocumentHashData",
        message: docData
    
    })

    /// 6. Function to generate the signature
    const sign=async(data, setSignature)=>{
    
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()
        const signer = accounts[0]
    

        console.log(signer)
        
    
        const signature = await web3.currentProvider.request(
            {
                method: "eth_signTypedData_v3",
                params: [signer, data],
                from: signer,
                id: 4
            })

        
                   
            
    
         
            console.log(signature)
            setSignature(signature)
            
            
    
        
    }


    
    

    return (
        <div>
            <button onClick={()=>sign(data, setSignature)}>Authorize Transaction</button>
            <p>{signature.length > 0 && "signature: " + signature}</p>
        </div>
    )

}

export default Sign