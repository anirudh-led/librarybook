import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PieChart = () => {
    const [chartData, setChartData] = useState({ labels: [], values: [] });

    useEffect(() => {
        const fetchBookCounts = async () => {
            try {
                const response = await fetch('/api/books');
                const data = await response.json();

                const issuedBooks = data.filter(book => book.issued);
                const issuedToCount = {};

                issuedBooks.forEach(book => {
                    const issuedTo = book.issuedTo || 'Unknown';
                    issuedToCount[issuedTo] = (issuedToCount[issuedTo] || 0) + 1;
                });

                const labels = Object.keys(issuedToCount);
                const values = Object.values(issuedToCount);

                setChartData({ labels, values });

                const ctx = document.getElementById('pieChart').getContext('2d');
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Books Issued To',
                            data: values,
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                    }
                });
            } catch (error) {
                console.error('Error fetching book counts:', error);
            }
        };

        fetchBookCounts();
    }, []); 

    return (
        <div className="w-full h-72">
            <canvas id="pieChart"></canvas>
        </div>
    );
};

export default PieChart;
