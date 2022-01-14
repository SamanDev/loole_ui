import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
} from "recharts";

function editCounry(options, options2) {
  options?.sort((a, b) => (a.date > b.date ? 1 : -1));
  var moment = require("moment");
  var newArray = [data];

  options?.map((item, w) => {
    var finalmydate = moment(item.date).format("MM-DD-YYYY");
    var finaldate = moment(item.date).format("MM-DD");
    item.newdate = finaldate;
    item.mydate = finalmydate;
    item.matchcount = options.length + (newArray.length - options.length);
    newArray.push(item);
  });
  if (newArray.length == 0) {
    options2?.sort((a, b) => (a.id > b.id ? 1 : -1));
    var filteredArray = options2.filter(function (item, i) {
      try {
        var _eid = item.description.split(": ")[1].toString().split(" -")[0];
      } catch (e) {
        var _eid = 0;
      }
      try {
        var _eid2 = options2[i + 1]?.description
          .split(": ")[1]
          .toString()
          .split(" -")[0];
      } catch (e) {
        var _eid2 = 0;
      }

      if (
        (item.coin == "Point" &&
          (item.mode.indexOf("Registered") > -1 ||
            item.mode.indexOf("Point") > -1 ||
            item.mode.indexOf("Win") > -1) &&
          _eid != _eid2) ||
        item.mode == "Point"
      ) {
        return item;
      }
    });
    var _net = 0;
    var _prf = 0;
    filteredArray?.map((item, w) => {
      _net = parseInt(
        item.mode.indexOf("Registered") > -1 || item.mode.indexOf("Point") > -1
          ? item.amount
          : item.amount * -1
      );
      _prf = _prf + _net;
      try {
        var _eid = item.description.split(": ")[1].toString().split(" -")[0];
      } catch (e) {
        var _eid = 0;
      }
      var finalmydate = moment(item.createDate).format("MM-DD-YYYY");
      var finaldate = moment(item.createDate).format("MM-DD");
      item.mydate = finalmydate;
      item.newdate = finaldate;
      item.date = finaldate;
      item.profitP = Number.parseInt(_prf);
      item.eventId = _eid;
      item.net = Number.parseInt(_net);
      item.matchcount = w + 1;
      newArray.push(item);
    });
  }
  var _new = newArray.slice(-120);

  return _new;
}
const data = {
  id: 0,
  matchcount: 0,
  date: "2021-12-23T17:06:35.000+00:00",
  net: 0,
  profit: 0,
  profitP: 0,
  eventId: 0,
  matchId: 0,
  newdate: "12-23",
  mydate: "12-23-2021",
};

const ChartStat = (prop) => {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  var _key = prop.findStateId(myState, "profileUser");
  if (!_key) {
    _key = prop.findStateId(myState, "currentUser");
  }
  const currentUser = _key;
  var _data = editCounry(currentUser.userAnalyses, currentUser.usersReports);

  const CustomizedDot = (props) => {
    const { cx, cy, value } = props;
    const z = _data.find((item) => item.profit == value);

    const _val = z.net;
    if (Number.parseFloat(_val) > 0) {
      return (
        <svg
          x={cx - 5}
          y={cy - 5}
          height={10}
          width={10}
          fill="green"
          viewBox="0 0 10 10"
        >
          <circle cx="5" cy="5" r="4" fill="green" />
        </svg>
      );
    }
    if (Number.parseFloat(_val) == 0) {
      return (
        <svg
          x={cx - 5}
          y={cy - 5}
          height={10}
          width={10}
          fill="gray"
          viewBox="0 0 10 10"
        >
          <circle cx="5" cy="5" r="4" fill="gray" />
        </svg>
      );
    }

    return (
      <svg
        x={cx - 5}
        y={cy - 5}
        height={10}
        width={10}
        fill="red"
        viewBox="0 0 10 10"
      >
        <circle cx="5" cy="5" r="4" fill="red" />
      </svg>
    );
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      var _d = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="label">
            Date: <span className="val">{_d.mydate}</span>
          </p>
          <p className="label">
            Net:{" "}
            <span className="val">
              {Number.parseFloat(_d.net) > 0 ? (
                <span className="text-success">+{_d.net}</span>
              ) : (
                <span className="text-danger">{_d.net}</span>
              )}
            </span>
          </p>
          <p className="label">
            Profit:{" "}
            <span className="val">
              {Number.parseFloat(_d.profit) > 0 ? (
                <span className="text-success">+{_d.profit}</span>
              ) : (
                <span className="text-danger">{_d.profit}</span>
              )}
            </span>
          </p>
          <p className="label">
            EventID: <span className="val">{_d.eventId}</span>
          </p>
        </div>
      );
    }

    return null;
  };

  const CustomizedLabel = ({ x, y, stroke, value }) => {
    return (
      <text
        x={x}
        y={y}
        dy={-10}
        fill="#ffffff"
        fontSize={10}
        textAnchor="middle"
      >
        {value}$
      </text>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        background: "rgba(0,0,0,1)",
        borderRadius: 20,
        padding: "40px 20px 10px 0px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          isAnimationActive={false}
          width={500}
          height={300}
          data={_data}
          margin={{
            top: 15,
            right: 30,
            left: 0,
            bottom: 15,
          }}
        >
          <XAxis
            dataKey="matchcount"
            stroke="#777"
            interval={0}
            tickMargin={5}
            fontSize={10}
          />
          <YAxis stroke="#777" label="$" domain={[-200, 200]} fontSize={10} />
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="linear"
            dataKey="profit"
            stroke="#8884d8"
            label={<CustomizedLabel />}
            dot={<CustomizedDot />}
            activeDot={<CustomizedDot />}
          />

          <ReferenceLine
            y="0"
            stroke="#5d0000"
            viewBox={{ x: 0, height: 2500 }}
          />
          <Brush
            fill="#000"
            stroke="#777"
            startIndex={_data.length - 20}
            height={20}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ChartStat;
