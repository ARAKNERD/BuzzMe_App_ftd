import React, { Component } from 'react';
import Chart from "react-apexcharts";
import ajaxCallStation from '../util/remote/ajaxCallStation';
import Loader from '../Components/Common/Loader';

class WeeklyLogsChart extends Component {

   state={
    testing:false,
    statData:false,
    series: false,
    options: false
  }

  componentDidMount() {
    this.getWeeklyLogs()
  }

  setSeries = (calls) =>{
    this.setState({
      series:[
        {
          name: 'Total Calls',
          type: 'line',
          data: calls
        }]
      
    })
  }

  setOptions = (days)=>{
    this.setState({
      options:{
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        colors: ['#042954', '#042954'],
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: days,
        },
      }         
    })
  }
  

  getWeeklyLogs=async() =>{
    const server_response = await ajaxCallStation.countWeeklyCalls()
    if(server_response.status === 'OK'){
      this.setState({
        statData:server_response.details
      },()=>{
        const data = this.state.statData
        const days = []
        const calls = []
        Object.keys(data.days).map((index, key)=>{
          days.push(data.days[index])
        })
        Object.keys(data.totals).map((index, key)=>{
          calls.push(data.totals[index].total*1)
        })
        this.setOptions(days)
        this.setSeries(calls)
      }
      )

    }
  }

  render() {
    return (
      <div className="col-lg-6">
        <div className="card custom-card overflow-hidden" style={{borderRadius: "10px"}}>
          <div className="card-body">
            <div className="card-option d-flex">
              <div>
                <h6 className="card-title mb-1">Weekly Call Logs</h6>
                <p className="text-muted card-sub-title">Number of buzz calls made each day</p>
              </div>
              <div className="card-option-title ml-auto">
                <div className="btn-group p-0">
                  
                  <button className="btn btn-light btn-sm" type="button">This Week</button>
                                
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

export default WeeklyLogsChart;