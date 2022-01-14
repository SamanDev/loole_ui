import React, { useState } from "react";
import { Header, Modal, Button, Divider } from "semantic-ui-react";
import CopyText from "components/copy.component";

var _content = "";
function CrCode(prop) {
  const [item, setItem] = useState(prop.note);

  if (item.coinValue) {
    var Coin = item.coin;

    var _title = (
      <Header as="h1" inverted>
        <img
          src={
            "https://www.coinpayments.net/images/coins/" +
            Coin.split(".")[0] +
            ".png"
          }
          className="ui avatar image"
        />{" "}
        {Coin + " " + item.mode}{" "}
        <span className="text-muted">({item.status})</span>
      </Header>
    );
    var paydetails = JSON.parse(item.description);
    _content = (
      <>
        {_title}
        <Modal.Content>
          <Header as="h2" inverted>
            Send To Address
          </Header>
          <div>
            <CopyText size="large" text={paydetails.address} />
          </div>
          <img
            src={paydetails.qrcode_url}
            style={{
              background: "gray",
              width: 222,
              height: 222,
              display: "block",
              marginTop: 6,
            }}
          />
          <Header as="h2" inverted>
            Total Amount (${item.amount}) To Send
          </Header>
          <div>
            <CopyText size="large" text={paydetails.amount} alter={Coin} />
          </div>
          <Header as="h3" inverted>
            Send only <span className="text-danger">{Coin}</span> to this
            deposit address.
          </Header>
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
        </Modal.Content>
      </>
    );

    return _content;
  }
}

export default CrCode;
