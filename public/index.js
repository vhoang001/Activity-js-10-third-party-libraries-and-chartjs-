async function main() {
    const apiKey = '1df40ae5397d4d248e70baa924b1bc80';
    const symbols = 'GME,MSFT,DIS,BNTX';
    const url = `https://api.twelvedata.com/time_series?symbol=${symbols}&interval=1day&outputsize=30&apikey=${apiKey}`;

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    try {
        // const response = await fetch(url);
        // if (!response.ok) {
        //     throw new Error('Network response was not ok: ' + response.statusText);
        // }
        // const result = await response.json();

        // Using mock data for development
        const result = mockData;

        const { GME, MSFT, DIS, BNTX } = result;
        const stocks = [GME, MSFT, DIS, BNTX];

        // Reverse the values once and use them throughout
        stocks.forEach(stock => stock.values.reverse());

        new Chart(timeChartCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: stocks[0].values.map(value => value.datetime),
                datasets: stocks.map(stock => ({
                    label: stock.meta.symbol,
                    data: stock.values.map(value => parseFloat(value.high)),
                    backgroundColor: getColor(stock.meta.symbol),
                    borderColor: getColor(stock.meta.symbol),
                    borderWidth: 1
                }))
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

        console.log(stocks[0].values);  // Logging the first stock's values to check the order and content

    } catch (error) {
        console.error('Failed to fetch data: ', error);
    }
}

main();

function getColor(stockSymbol) {
    const colors = {
        'GME': 'rgba(61, 161, 61, 0.7)',
        'MSFT': 'rgba(209, 4, 25, 0.7)',
        'DIS': 'rgba(18, 4, 209, 0.7)',
        'BNTX': 'rgba(166, 43, 158, 0.7)'
    };
    return colors[stockSymbol] || 'rgba(0,0,0,0.7)';  // Default color if the symbol is not matched
}
