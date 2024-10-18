
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Analysis = ({timeSeries}) => {
const [ESP,setESP]=useState("")
  const [peRatio, setPeRatio] = useState(0);
    const [pbRatio, setPbRatio] = useState(0);

const analysisfetch=async()=>{
    try {
        let url="https://www.alphavantage.co/query?function=EARNINGS&symbol=IBM&apikey=SOB758HXOL5ESIZ4";
        const response = await axios.get(url);
        const data=response.data.annualEarnings
        console.log(data[0]);
        setESP(data[0])

        const ratio1=  timeSeries["1. open"]/ESP.reportedEPS
        console.log(ratio1);
        
        setPeRatio(ratio1)
        
        const ratio2= timeSeries["4. close"]/ESP.reportedEPS
        console.log(ratio2);
        setPbRatio(ratio2)
        
    } catch (error) {
        console.error(error);
    }
    }

    const Price_to_Earnings_Ratio=async()=>{

        
    }
    
    // const sharesOutstanding = parseFloat(stockData.annualReports[0].commonStockSharesOutstanding);


  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
    <h1 className="text-3xl font-bold mb-8 text-gray-800">Financial Ratio Analysis</h1>
    <button
      onClick={analysisfetch}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300 border-2"
    >
      Analyze
    </button>
    {peRatio===0?<h1>loading</h1>:(
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Financial Ratios</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Price-to-Earnings Ratio</p>
            <p className="text-lg font-bold text-gray-800">{peRatio}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Price-to-Book Ratio</p>
            <p className="text-lg font-bold text-gray-800">{pbRatio}</p>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default Analysis
