import React, { Component } from 'react';
import Chart from "react-apexcharts";
import Loader from '../Common/Loader';
import ajaxBank from '../../util/remote/ajaxBank';

class AccountActivationsChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            statData: null, 
            series: [],
            options: {
                chart: {
                    type: 'donut',
                    width: '100%',
                    height: 'auto',
                },
                labels: [],
                dataLabels: {
                    enabled: false, // Disable data labels (values on top of the chart)
                },
                legend: {
                    position: 'bottom', 
                    horizontalAlign: 'left', 
                    verticalAlign: 'bottom', 
                    itemMargin: {
                        horizontal: 15,
                        vertical: 10,
                    },
                   
                    formatter: function(seriesName, opts) {
                        // Format the legend to show "Month - Purchases"
                        const purchaseAmount = opts.w.globals.series[opts.seriesIndex];
                        return `${seriesName} - UGX. ${purchaseAmount}`; 
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

    getAccountActivationsMonthly = async () => {
        const server_response = await ajaxBank.fetchAccountActivationsEachMonth();
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
        this.getAccountActivationsMonthly()
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
                                <h6 className="card-title mb-1">Account Activations</h6>
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
                                    <p>No account activations this year.</p>
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

export default AccountActivationsChart;