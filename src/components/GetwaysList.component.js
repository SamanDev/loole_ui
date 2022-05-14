import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import {
  Input,
  Segment,
  Button,
  Dimmer,
  Loader,
  Modal,
  Form,
} from "semantic-ui-react";

import GlobalContext from "context/GlobalState";
import adminService from "services/admin.service";
import Swal from "sweetalert2";
import CheckboxToggle from "components/toggle.component";
import { useAllGetways } from "services/hooks";
const noDataComponent = (
  <div
    style={{
      minHeight: 300,
      position: "relative",
      marginTop: 20,
      width: "100%",
    }}
  >
    <Dimmer active inverted>
      <div
        style={{
          textAlign: "center",
          color: "rgba(0,0,0,.5)",
          paddingTop: 30,
          width: "100%",
        }}
      >
        <img
          alt="nodata"
          style={{ height: 80 }}
          src="/assets/images/nodata.svg"
        ></img>
        <h4>Empty List.</h4>
        <h5>You currently don't have any report.</h5>
      </div>
    </Dimmer>
  </div>
);
var moment = require("moment");

const FilterComponent = ({ filterText, onFilter }) => (
  <>
    <Input
      icon="search"
      placeholder="Search..."
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
  </>
);

function Admin(prop) {
  const context = useContext(GlobalContext);
  //const { data: events } = useAllEvents();
  const [myState, setMyState] = useState(prop.myState);
  const { data: getwaysList, isLoading } = useAllGetways();
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [getName, setGetName] = React.useState("");
  const [getMode, setGetMode] = React.useState("");

  const [getLoad, setGetLoad] = React.useState(false);
  const OpenChashier = (open) => {
    setFirstOpen(open);
  };
  const setGetNameVal = (e) => {
    setGetName(e.target.value);
  };
  const setGetModeVal = (e) => {
    setGetMode(e.target.value);
  };
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);

  useEffect(() => {
    if (getwaysList) {
      setDataTransaction(getwaysList);
    }
  }, [getwaysList]);

  const [filterText, setFilterText] = React.useState("");
  const [exMode, setExMode] = React.useState("Data");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [dataTransaction, setDataTransaction] = React.useState([]);
  const filteredItems = dataTransaction.filter((item) =>
    item.name.toString().toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      format: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      format: (row) => row.name,
      width: "250px",
      sortable: true,
    },
    {
      name: "Mode",
      selector: (row) => row.mode,
      format: (row) => row.mode,

      sortable: true,
    },
    {
      name: "Active",
      selector: (row) => row.active,
      format: (row) => (
        <CheckboxToggle
          check={row.active}
          user={row}
          userkey="userActivate"
          onChange={updateUserObj}
        />
      ),
      sortable: true,
    },
  ];
  const addGetway = (e, data) => {
    if (!getMode || !getName) {
      return false;
    }
    setGetLoad(true);
    adminService.addGateway(getName, getMode).then((response) => {
      if (response) {
        Swal.fire({
          title: "Success",
          text: "Saved",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: `Ok`,
        }).then(() => {
          prop.onReset("Getways");
          setFirstOpen(false);
          setGetLoad(false);
        });
      }
    });
  };
  const updateUserObj = (e, data) => {
    console.log(data);
    var _key = data.userkey;
    var curU = JSON.parse(JSON.stringify(data.user));
    //curU[''+_key+'']=data.checked

    console.log(data);
    adminService
      .updateUserByAdmin(curU.id, _key, data.checked)
      .then((response) => {
        if (response) {
          Swal.fire({
            title: "Success",
            text: response.data,
            icon: "success",
            showCancelButton: false,
            confirmButtonText: `Ok`,
          });
        }
      });
  };
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        <Button
          color="red"
          style={{ position: "absolute", top: -40 }}
          onClick={() => OpenChashier(true)}
        >
          Add New Getway
        </Button>
        <FilterComponent
          setExMode={setExMode}
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      </>
    );
  }, [filterText, resetPaginationToggle, dataTransaction]);
  if (isLoading) {
    return (
      <>
        <Segment style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Segment>
      </>
    );
  }
  return (
    <>
      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        size="mini"
        style={{ height: "auto" }}
      >
        <Modal.Header>Add New Getway</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input value={getName} onChange={setGetNameVal} />
            </Form.Field>
            <Form.Field>
              <label>Mode</label>
              <input value={getMode} onChange={setGetModeVal} />
            </Form.Field>

            <br />
            <br />
            <Button
              type="submit"
              loading={getLoad}
              disabled={getLoad}
              color="black"
              fluid
              onClick={addGetway}
            >
              Submit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
      <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
        <DataTable
          columns={columns}
          data={filteredItems}
          defaultSortFieldId={1}
          defaultSortAsc={false}
          title="Getways List"
          noDataComponent={noDataComponent}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
        />
      </div>
    </>
  );
}

export default Admin;
