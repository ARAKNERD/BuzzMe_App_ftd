import React, { Component } from 'react';
import Chart from "react-apexcharts";
import ajaxCallStation from '../../util/remote/ajaxCallStation';
import Loader from '../Common/Loader';

class ChatCategoriesChart extends Component {

    state = {
        testing: false,
        statData: false,
        series: [],
        options: {}
    };

    setSeries = (purchases) => {
        this.setState({
          series: [
            {
              name: 'Buzz Chat Messages',
              type: 'bar',
              data: purchases.buzz_chat
            },
            {
              name: 'Buzz Audio Messages',
              type: 'bar',
              data: purchases.buzz_audio
            },
            {
              name: 'GSM messages',
              type: 'bar',
              data: purchases.gsm
            }
          ]
        });
    };

    setOptions = (months) => {
        this.setState({
          options: {
            chart: {
              type: 'bar', 
            //   stacked: true,
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              bar: {
                columnWidth: '90%' ,
                horizontal: false,

              }
            },
            colors: ['#042954','#28a745', '#FF6600'],
            stroke: {
              width: [0, 2, 4], // Set stroke width for each series
              curve: 'smooth' 
            },
            fill: {
              opacity: [0.85, 0.25, 1], // Set different opacity for each series
              gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
              }
            },
            labels: months, // Set the labels as months
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
                    return "UGX. " + y.toFixed(0); // Fix the concatenation here
                  }
                  return y;
                }
              }
            },
            grid: {
              borderColor: '#f1f1f1'
            }
          }
        });
    };
  

    getChatCategoriesCost = async () => {
        const server_response = await ajaxCallStation.chatCategoriesCostEachMonth();
        if (server_response.status === 'OK') {
          this.setState(
            {
              statData: server_response.details,
            },
            () => {
              const data = this.state.statData;
              const months = [];
              const purchases = {
                buzz_chat: [],
                buzz_audio: [],
                gsm: []
              };
      
              // Loop through the months and collect the totals
              Object.keys(data.months).forEach((index) => {
                months.push(data.months[index]);
                // Initialize the totals for each category for the current month
                const buzzChatTotal = data.totals.buzz_chat[index] ? data.totals.buzz_chat[index].total * 1 : 0;
                const buzzAudioTotal = data.totals.buzz_audio[index] ? data.totals.buzz_audio[index].total * 1 : 0;
                const gsmTotal = data.totals.gsm[index] ? data.totals.gsm[index].total * 1 : 0;
      
                // Push the totals into the corresponding category array
                purchases.buzz_chat.push(buzzChatTotal);
                purchases.buzz_audio.push(buzzAudioTotal);
                purchases.gsm.push(gsmTotal);
              });
      
              // Set options for months
              this.setOptions(months);
      
              // Set series data for the three categories: buzz_voice, buzz_video, gsm
              this.setSeries(purchases);
            }
          );
        }
    };

    componentDidMount() {
        this.getChatCategoriesCost()
    }

    render() {
        return (
        <div className="col-lg-12">
            <div className="card custom-card overflow-hidden" style={{borderRadius: "10px"}}>
            <div className="card-body">
                <div className="card-option d-flex">
                <div>
                    <h6 className="card-title mb-1">Chat Categories</h6>
                    <p className="text-muted card-sub-title">Income from the different chat categories each month</p>
                </div>
                <div className="card-option-title ml-auto">
                    <div className="btn-group p-0">
                    
                    <button className="btn btn-light btn-sm" type="button">This Year</button>
                                    
                    </div>
                </div>
                </div>
                <div>

                {this.state.statData && this.state.options && this.state.series && <Chart
                                                                                        options={this.state.options}
                                                                                        series={this.state.series}
                                                                                        height={350}
                                                                                    /> }
                {!this.state.statData && <Loader/>}

                </div>
            </div>
            </div>
        </div>
            
        );
    }
}

export default ChatCategoriesChart;