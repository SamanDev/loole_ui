import React, { useState } from "react";
import { Header, Modal, Button, Divider, Label, Icon } from "semantic-ui-react";
import CopyText from "components/copy.component";
import CurrencyFormat from "react-currency-format";
var _content = "";
const getGroupBadgeBlock = (sign, amount, label, pos) => {
  if (sign == "Dollar") {
    var nAmount = Number.parseFloat(amount).toFixed(2);
    var nIcon = "dollar";
    var nColor = "red";
  } else {
    var nAmount = Number.parseFloat(amount).toFixed(2);
    var nIcon = "try";
    var nColor = "green";
  }

  return (
    <>
      {pos == "right" && (
        <Label pointing={pos} size="huge" basic color="green">
          {label}
        </Label>
      )}

      <Label
        size="huge"
        title={sign.replace("Dollar", "USD").replace("Point", "Diamonds")}
        basic
      >
        <Icon name={nIcon} color={nColor} />
        {!isNaN(parseFloat(amount)) && isFinite(amount) ? (
          <CurrencyFormat
            value={nAmount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={""}
            renderText={(value) => value}
          />
        ) : (
          amount
        )}
      </Label>
      {pos == "left" && (
        <Label pointing={pos} size="mini" basic color="blue">
          {label}
        </Label>
      )}
    </>
  );
};
function CrCode(prop) {
  const [item, setItem] = useState(prop.note);

  if (item.gateway == "Papara") {
    var _title = (
      <Header as="h1" inverted>
        <img
          src="https://cdn.papara.com/web/logo/papara.svg"
          className="ui  image"
        />{" "}
        {item.mode} <span className="text-muted">({item.status})</span>
      </Header>
    );

    var paydetails = JSON.parse(item.description.split("}")[0] + "}");

    _content = (
      <>
        {_title}
        <Modal.Content>
          <Header as="h2" inverted>
            Send (${item.amount}) To Papara number
          </Header>
          {item.status == "Pending" ? (
            <>
              <div>
                {getGroupBadgeBlock("TL", paydetails.TRY, "", "", "green")} ={" "}
                {getGroupBadgeBlock("Dollar", item.amount, "", "", "green")}
                <br />
                <br />
                <CopyText
                  size="large"
                  color="red"
                  text={paydetails.account}
                />{" "}
                <CopyText size="large" color="red" text={paydetails.name} />
              </div>

              <Divider />
              <Header as="h1" inverted>
                Go To{" "}
                <img
                  src="https://cdn.papara.com/web/logo/papara.svg"
                  className="ui  image"
                />
              </Header>
              <Button fluid color="red" as="a" href={paydetails.qr}>
                Open Papara
              </Button>

              <Divider horizontal inverted>
                OR
              </Divider>
              <Header as="h1" inverted>
                Scan QR Code
              </Header>
              <a href={paydetails.qr} target="_blank">
                <img
                  src={
                    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=10&data=" +
                    encodeURIComponent(paydetails.qr)
                  }
                  style={{
                    background: "gray",
                    width: 222,
                    height: 222,
                    display: "block",
                    marginTop: 6,
                  }}
                />
              </a>

              <Divider />
              <Button.Group size="large" fluid widths="2">
                <Button
                  color="red"
                  type="button"
                  onClick={() => prop.onUpdateItem("NotificationsItem", false)}
                >
                  Cancel this transaction
                </Button>
                <Button.Or />
                <Button
                  type="button"
                  color="red"
                  basic
                  fluid
                  onClick={() => prop.onUpdateItem("openModalCashier", false)}
                >
                  Close
                </Button>
              </Button.Group>
            </>
          ) : (
            <>
              {" "}
              <div style={{ padding: "40px 0" }}>
                <div
                  className="swal2-icon swal2-success swal2-icon-show"
                  style={{ display: "flex" }}
                >
                  <div className="swal2-success-circular-line-left"></div>
                  <span className="swal2-success-line-tip"></span>{" "}
                  <span className="swal2-success-line-long"></span>
                  <div className="swal2-success-ring"></div>{" "}
                  <div className="swal2-success-fix"></div>
                  <div className="swal2-success-circular-line-right"></div>
                </div>
                <h2 className="swal2-title">{item.status}</h2>
              </div>
              <Divider />
              <Button.Group size="large" fluid widths="2">
                <Button
                  type="button"
                  color="red"
                  basic
                  fluid
                  onClick={() => prop.onUpdateItem("openModalCashier", false)}
                >
                  Close
                </Button>
              </Button.Group>
            </>
          )}
        </Modal.Content>
      </>
    );

    return _content;
  }
}

export default CrCode;
