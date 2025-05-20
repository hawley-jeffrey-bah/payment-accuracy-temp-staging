function initSparklines() {
    const sparklinesCharts = document.getElementsByClassName("sparklines-chart");
    for (let i = 0; i < sparklinesCharts.length; i++) {
        const ctx = sparklinesCharts[i].getContext('2d');
        const datapoints = JSON.parse(sparklinesCharts[i].getAttribute('data-series'));

        let currentYear = parseInt(sparklinesCharts[i].getAttribute('data-cy'));
        let firstYear = (currentYear - (datapoints.length - 1));
        let labels = ['FY ' + firstYear]

        // use the min/max as specified in the attributes,
        //   unless a datapoint would fall outside that range
        // padding prevents cutting off points at extremes of range
        const padding = 0.5
        let max = Math.max(...datapoints);
        max = Math.max(max, parseInt(sparklinesCharts[i].getAttribute('data-max')));
        max += padding;
        let min = Math.min(...datapoints);
        min = Math.min(min, parseInt(sparklinesCharts[i].getAttribute('data-min')));
        min -= padding;

        if (datapoints.length > 1) {
            for (let i = 0; i < (datapoints.length - 2); ++i) {
                labels.push('')
            }
            labels.push('FY ' + currentYear);
        }

        const color = sparklinesCharts[i].getAttribute('data-color')

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                    labels: labels,
                    datasets: [{
                        label: '',
                        data: datapoints,
                        borderColor: color,
                        borderWidth: 3,
                        pointRadius: 0
                    }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    x: {
                        display: true,
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        min: min,
                        max: max,
                        display: true,
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                elements: {
                    line: {
                        fill: false
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initSparklines();
});