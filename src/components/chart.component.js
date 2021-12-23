import React, { PureComponent, useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Moment from "moment";
import { Link, useLocation } from "react-router-dom";
function editCounry(options){
    options.sort((a, b) => (a.id > b.id) ? 1 : -1)
    var moment = require("moment");
    var  newArray = []
    options.map((item, w) => {
      
   var finalmydate = moment(item.date).format('MM-DD-YYYY')
   var finaldate = moment(item.date).format('MM-DD')
        item.newdate  = finaldate
        item.mydate  = finalmydate
     
      newArray.push(item)
    })
    console.log(newArray)
    return newArray
  }
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const ChartStat = (prop) => {
    const [myState, setMyState] = useState(prop.myState);
    useEffect(() => {
      setMyState(prop.myState);
    }, [prop.myState]);
    const currentUser = prop.findStateId(myState, "currentUser");
    const handleClick = (data, index) => {
        console.log(data)
        
      };
    const getIntroOfPage = (label) => {
        if (label === 'Page A') {
          return "Page A is about men's clothing";
        }
        if (label === 'Page B') {
          return "Page B is about women's dress";
        }
        if (label === 'Page C') {
          return "Page C is about women's bag";
        }
        if (label === 'Page D') {
          return 'Page D is about household goods';
        }
        if (label === 'Page E') {
          return 'Page E is about food';
        }
        if (label === 'Page F') {
          return 'Page F is about baby food';
        }
        return '';
      };
    const CustomTooltip = ({ active, payload, label }) => {
        
        if (active && payload && payload.length) {
            var _d  = payload[0].payload;
          return (
            <div className="custom-tooltip">
                <p className="label">Date: <span className="val">{_d.mydate}</span></p>
                <p className="label">Net: <span className="val">{Number.parseFloat(_d.net) > 0 ?(<span className="text-success">+{_d.net}</span>):(<span className="text-danger">{_d.net}</span>)}</span></p>
                <p className="label">Profit: <span className="val">{Number.parseFloat(_d.profit) > 0 ?(<span className="text-success">+{_d.profit}</span>):(<span className="text-danger">{_d.profit}</span>)}</span></p>
                <p className="label">EventID: <span className="val">{_d.eventId}</span></p>
          
            </div>
          );
        }
      
        return null;
      };
      
    return (
        <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
        
          width={500}
          height={300}
          data={editCounry(currentUser.userAnalyses)}
          margin={{
            top: 15,
            right: 30,
            left: 0,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="6 6" />
          <XAxis dataKey="eventId" />
          <YAxis />
          <Tooltip  content={<CustomTooltip />}/>
        
          <Line type='linear' dataKey="profit" stroke="#8884d8"   />
        
        </LineChart>
      </ResponsiveContainer></div>
    );
  
}
export default ChartStat;