import React from "react";
import { Table } from "semantic-ui-react";
import CheckboxToggle from "components/toggle.component";
var moment = require("moment");
const headerRow = ["Name", "Value"];
function isDate(name, myDate, user) {
  if (name === "country") {
    var res = (
      <>
        <img src={"/assets/images/famfamfam_flag_icons/png/" + user + ".png"} />{" "}
        {myDate}
      </>
    );
  } else {
    var res = myDate;
    if (
      myDate?.toString().indexOf(":") > -1 &&
      myDate?.toString().indexOf("T") > -1 &&
      myDate?.toString().indexOf(":00:00") == -1
    )
      res = moment(myDate).startOf("second").fromNow();
    if (
      myDate?.toString().indexOf(":") > -1 &&
      myDate?.toString().indexOf("T") > -1 &&
      myDate?.toString().indexOf(":00:00") > -1
    )
      res =
        moment(myDate).format("MM-DD-YYYY") +
        " (" +
        moment(myDate).startOf("second").fromNow() +
        ")";
  }

  return res;
}

const TableExampleWarningShorthand = (prop) => {
  const renderBodyRow = ({ name, value, user }, i) => ({
    key: `row-${i}`,
    cells: [
      name || "No name specified",
      typeof value == "boolean"
        ? {
            key: `statusrow-${i}`,
            content: (
              <CheckboxToggle
                check={value}
                user={user}
                userkey={name}
                onChange={prop.updateUserObj}
              />
            ),
          }
        : {
            key: `statusrow-${i}`,
            content: isDate(name, value, user),
          },
    ],
  });

  return (
    <Table
      celled
      headerRow={headerRow}
      renderBodyRow={renderBodyRow}
      tableData={
        prop.data[0] || [{ name: undefined, value: undefined, user: undefined }]
      }
    />
  );
};

export default TableExampleWarningShorthand;
