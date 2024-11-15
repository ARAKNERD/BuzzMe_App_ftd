import React, { Component } from 'react';
import Chart from "react-apexcharts";
import Loader from '../../Components/Common/Loader';
import ajaxBank from '../../util/remote/ajaxBank';

class AirtimePurchasesChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            statData: null, // Initial statData is null
            series: [],
            options: {
                chart: {
                    type: 'donut',
                    width: '100%',
                    height: 'auto',
                },
                labels: [], // Optional labels
                dataLabels: {
                    enabled: false, // Disable data labels (values on top of the chart)
                },
                legend: {
                    position: 'bottom', // Position the legend below the chart
                    horizontalAlign: 'left', // Center the legend horizontally
                    verticalAlign: 'bottom', // Align the legend vertically at the bottom
                    itemMargin: {
                        horizontal: 15,
                        vertical: 10, // Adjust vertical margin between legend items
                    },
                   
                    formatter: function(seriesName, opts) {
                        // Format the legend to show "Month - Purchases"
                        const purchaseAmount = opts.w.globals.series[opts.seriesIndex];
                        return `${seriesName} - UGX. ${purchaseAmount}`; // e.g., "January - 1500"
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: '100%',
                        },
                        legend: {
                            position: 'bottom',
                            horizontalAlign: 'center',
                        }
                    }
                }]
            },
        };
    }

    getMonthlyBuzztimePurchased = async () => {
        const server_response = await ajaxBank.fetchBuzzTimeUsedEachMonth();
        if (server_response.status === 'OK') {
            const data = server_response.details;
            const months = [];
            const purchases = [];

            // Extract months and purchases from the response
            Object.keys(data.months).forEach((index) => {
                months.push(data.months[index]);
            });
            Object.keys(data.totals).forEach((index) => {
                purchases.push(data.totals[index].total * 1); // Ensure total is a number
            });

            // Update the state with the new data
            this.setState({
                statData: data,
                series: purchases, // Set the series data
                options: {
                    ...this.state.options, // Keep the previous options intact
                    labels: months, // Set the dynamic labels
                },
            });
        }
    };

    allValuesZero = (values) => {
        return values.every(value => value === 0);
    };
    componentDidMount() {
        this.getMonthlyBuzztimePurchased()
    }

    render() {
        const { series, options, statData } = this.state;
        const isDataEmpty = statData && this.allValuesZero(series);
        return (
            <div className="col-lg-6">
                <div className="card height-auto" style={{ borderRadius: '10px' }}>
                    <div className="card-body">
                        <div className="card-option d-flex">
                            <div>
                                <h6 className="card-title mb-1">Buzztime Purchases</h6>
                            </div>
                            <div className="card-option-title ml-auto">
                                <div className="btn-group p-0">
                                    <button className="btn btn-light btn-sm" type="button">This Year</button>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '100%' }}>
                        {isDataEmpty ? (
                                <div className="no-data-message">
                                    <p>No buzztime purchases this year.</p>
                                </div>
                            ) : statData ? (
                                <Chart options={options} series={series} type="donut" width="100%" height="400px" />
                            ) : (
                                <Loader />  // Show loader until data is available
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AirtimePurchasesChart;