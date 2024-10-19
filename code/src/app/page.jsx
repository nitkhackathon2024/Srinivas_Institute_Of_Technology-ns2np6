"use client";
import { useState } from "react";
import { RiH3, RiStockFill } from "react-icons/ri";
import { stock } from "@/const";
import axios from "axios";
import Analysis from "@/components/Analysis";

export default function Home() {
  const [selectedStock, setSelectedStock] = useState("");
  const [timeSeries, setTimeSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  //   const handleAnalyze = () => {
  //     if (selectedStock) {
  //       console.log(`Analyzing ${selectedStock}`);

  //     } else {
  //       console.log("Please select a stock first");
  //     }
  //   };
  // console.log(process.env.API_KEY);

  const fetch = async () => {
    const apiurl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${selectedStock}&apikey=SOB758HXOL5ESIZ4`;
    try {
      const response = await axios.get(apiurl);
      const data = response.data["Monthly Time Series"];

      if (data) {
        // Get the first 50 entries
        const first50Entries = Object.entries(data)
          .slice(0, 50)
          .map(([date, info]) => ({
            date,
            ...info,
          }));
        setTimeSeries(first50Entries);
        setLoading(false);
        console.log(timeSeries);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex  justify-center  align-top">
          <h1 className="text-6xl  font-bold  hover:text-blue-500 hover:scale-105 transition hover:ease-in-out delay-200 ">Real-Time Equity Analysis</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center mb-6">
            Analyze Stocks in Real-Time
          </h2>

          <div className="w-full md:w-fill">
            <label
              htmlFor="options"
              className="block text-xl font-bold text-black"
            >
              select the stock:
            </label>
            <select
              id="options"
              name="options"
              onChange={(e) => {
                setSelectedStock(e.target.value);
              }}
              className="mt-1 block w-full md:w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {stock.map((stock) => (
                <option id={stock.id} value={stock.name}>
                  {stock.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={fetch}
            className="w-full border-2 hover:cursor-pointer"
            // disabled={!selectedStock}
          >
            Analyze <RiStockFill className="ml-2 h-4 w-4" />
          </button>
        </div>
      </main>
      <stockChart />
      
      {loading ? (
        <h3></h3>
      ) : (
        <div class="relative overflow-x-auto border-2">
          <table class="w-full text-sm text-left rtl:text-right text-black dark:text-black">
            <thead class="text-xs text-black uppercase bg-white-50 dark:bg-blue-900 dark:text-white">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  open
                </th>
                <th scope="col" class="px-6 py-3">
                  High
                </th>
                <th scope="col" class="px-6 py-3">
                  Low
                </th>
                <th scope="col" class="px-6 py-3">
                  close
                </th>
                <th scope="col" class="px-6 py-3">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody>
              {timeSeries.map((time) => (
                <tr
                  class="bg-white border-b dark:bg-white dark:border-gray-700"
                  id={time.date}
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    {time.date}
                  </th>
                  <td class="px-6 py-4">{time["1. open"]}</td>
                  <td class="px-6 py-4">{time["2. high"]}</td>
                  <td class="px-6 py-4">{time["3. low"]}</td>
                  <td class="px-6 py-4">{time["4. close"]}</td>
                  <td class="px-6 py-4">{time["5. volume"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <hr />
      <Analysis timeSeries={timeSeries[0]}  />
    </div>
  );
}
