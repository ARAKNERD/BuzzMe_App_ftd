import React, { useState, useEffect, useContext } from 'react';
import Chart from "react-apexcharts";
import ajaxCallStation from '../../util/remote/ajaxCallStation';
import Loader from '../Common/Loader';
import SchoolContext from '../../Context/SchoolContext';

const SchoolLogsChart = () => {
    // Access school details from context
    const { schoolDetails } = useContext(SchoolContext);
    const schoolID = schoolDetails ? schoolDetails.school_id : null;

    const [statData, setStatData] = useState(null);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});
    const [loading, setLoading] = useState(true);

    // Set the series data
    const setChartSeries = (amount) => {
        setSeries([
            {
                name: 'Buzz Voice calls',
                type: 'bar',
                data: amount.buzz_voice
            },
            {
                name: 'Buzz Video calls',
                type: 'bar',
                data: amount.buzz_video
            },
            {
                name: 'GSM calls',
                type: 'bar',
                data: amount.gsm
            }
        ]);
    };

    // Set the chart options
    const setChartOptions = (months) => {
        setOptions({
            chart: {
                type: 'bar',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '90%',
                    horizontal: false,
                }
            },
            colors: ['#042954', '#FF6600', '#28a745'],
            stroke: {
                width: [0, 2, 4],
                curve: 'smooth'
            },
            fill: {
                opacity: [0.85, 0.25, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100]
                }
            },
            labels: months,
            markers: {
                size: 0
            },
            yaxis: {
                title: {
                    display: false
                },
                min: 0,
                tickAmount: 7
            },
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y) {
                        if (typeof y !== "undefined") {
                            return y.toFixed(0) + " calls";
                        }
                        return y;
                    }
                }
            },
            grid: {
                borderColor: '#f1f1f1'
            }
        });
    };

  
    const getCallCategoriesTotal = async () => {
        if (!schoolID) {
            console.error("School ID is missing!");
            return;
        }

        try {
            const server_response = await ajaxCallStation.callsSumForSchool(schoolID);
            if (server_response.status === 'OK') {
                const data = server_response.details;
                const months = [];
                const amount = {
                    buzz_voice: [],
                    buzz_video: [],
                    gsm: []
                };

                Object.keys(data.months).forEach((index) => {
                    months.push(data.months[index]);
                    const buzzVoiceTotal = data.totals.buzz_voice[index] ? data.totals.buzz_voice[index].total * 1 : 0;
                    const buzzVideoTotal = data.totals.buzz_video[index] ? data.totals.buzz_video[index].total * 1 : 0;
                    const gsmTotal = data.totals.gsm[index] ? data.totals.gsm[index].total * 1 : 0;

                    amount.buzz_voice.push(buzzVoiceTotal);
                    amount.buzz_video.push(buzzVideoTotal);
                    amount.gsm.push(gsmTotal);
                });

                setChartOptions(months);
                setChartSeries(amount);
                setStatData(data);
                setLoading(false);
            } else {
                setLoading(false);
                console.error('Failed to load data!');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

   
    useEffect(() => {
        if (schoolID) {
            getCallCategoriesTotal();
        }
    }, [schoolID]);

    if (loading) {
        return (
            <div className="col-6-xxxl col-12">
                <div className="card custom-card overflow-hidden" style={{ borderRadius: "10px" }}>
                    <div className="card-body">
                        <Loader />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="col-6-xxxl col-12">
            <div className="card custom-card overflow-hidden" style={{ borderRadius: "10px" }}>
                <div className="card-body">
                    <div className="card-option d-flex">
                        <div>
                            <h6 className="card-title mb-1">Call Categories</h6>
                            <p className="text-muted card-sub-title">Total number of completed calls in the different call categories each month</p>
                        </div>
                        <div className="card-option-title ml-auto">
                            <div className="btn-group p-0">
                                <button className="btn btn-light btn-sm" type="button">This Year</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {statData && options && series && (
                            <Chart options={options} series={series} height={350} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolLogsChart;
