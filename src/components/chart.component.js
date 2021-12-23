import React, { PureComponent, useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Moment from "moment";
import { Link, useLocation } from "react-router-dom";

function editCounry(options){
    options.sort((a, b) => (a.id > b.id) ? 1 : -1)
    var moment = require("moment");
    var  newArray = [data]
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
const data = {
  "id": 0,
  "date": "2021-12-23T17:06:35.000+00:00",
  "net": 0,
  "profit": 0,
  "eventId": 0,
  "matchId": 0,
  "newdate": "12-23",
  "mydate": "12-23-2021"
};

const ChartStat = (prop) => {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  var _key = prop.findStateId(myState, "profileUser")
  if (!_key) { _key = prop.findStateId(myState, "currentUser");}
  const currentUser = _key
   
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