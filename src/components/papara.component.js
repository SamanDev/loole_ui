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
          src="https://cdn.papara.com/web/logo/papara.svg"
          className="ui  image"
        />{" "}
        {item.mode} <span className="text-muted">({item.status})</span>
      </Header>
    );
    var paydetails = JSON.parse(item.description);
    _content = (
      <>
        {_title}
        <Modal.Content>
          <Header as="h2" inverted>
            Send To Papara number
          </Header>
          <div>
            <CopyText size="large" text={paydetails.address} />
          </div>
          <a href={paydetails.qrcode_url} target="_blank">
            <img
              src={
                "https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=10&data=" +
                paydetails.qrcode_url
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
          <Header as="h2" inverted>
            Total Amount (${item.amount}) To Send
          </Header>
          <div>
            <CopyText size="large" text={paydetails.amount} alter="TL" />
          </div>

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
