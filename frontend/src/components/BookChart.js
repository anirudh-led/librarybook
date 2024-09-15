import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const BookChart = () => {
    const [issuedBooksCount, setIssuedBooksCount] = useState(0);
    const [nonIssuedBooksCount, setNonIssuedBooksCount] = useState(0);

    useEffect(() => {
        const fetchBookCounts = async () => {
            try {
                const response = await fetch('/books/count');
                const data = await response.json();
                setIssuedBooksCount(data.issuedBooksCount);
                setNonIssuedBooksCount(data.nonIssuedBooksCount);

                const ctx = document.getElementById('bookChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Issued Books', 'Non-Issued Books'],
                        datasets: [{
                            label: 'Number of Books',
                            data: [data.issuedBooksCount, data.nonIssuedBooksCount],
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 99, 132, 0.2)'
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
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
            <canvas id="bookChart"></canvas>
        </div>
    );
};

export default BookChart;
