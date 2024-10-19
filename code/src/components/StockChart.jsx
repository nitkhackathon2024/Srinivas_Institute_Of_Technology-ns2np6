    // StockChart.jsx
    import React, { useEffect, useRef } from 'react';
    import Chart from 'chart.js/auto';

    const StockChart = () => {
        const chartRef = useRef(null);
        const chartInstance = useRef(null);

        // Sample stock data
        const stockData = [
            { date: "2024-10-17", open: 220.63, high: 237.37, low: 215.798, close: 232.88 },
            { date: "2024-09-30", open: 201.91, high: 224.15, low: 199.335, close: 221.08 },
            { date: "2024-08-30", open: 192.81, high: 202.17, low: 181.81, close: 202.13 },
            { date: "2024-07-31", open: 173.45, high: 196.26, low: 173.38, close: 192.14 },
            { date: "2024-06-28", open: 166.54, high: 178.46, low: 163.53, close: 172.95 },
            { date: "2024-05-31", open: 165.69, high: 175.46, low: 162.62, close: 166.85 }
        ];

        // Extract dates and closing prices for the chart
        const dates = stockData.map(data => data.date);
        const closePrices = stockData.map(data => data.close);

        useEffect(() => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Closing Price',
                        data: closePrices,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                color: 'rgb(0, 0, 0)'
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    },
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Date',
                                color: '#666'
                            },
                            ticks: {
                                color: '#666'
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Price (USD)',
                                color: '#666'
                            },
                            ticks: {
                                color: '#666'
                            }
                        }
                    }
                }
            });

            return () => {
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }
            };
        }, [dates, closePrices]);

        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-md">
                    <canvas ref={chartRef} />
                </div>
            </div>
        );
    };

    export default StockChart;