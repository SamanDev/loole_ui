import React, { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { genLink } from "components/include.js";
function ModalExampleShorthand(prop) {
  const [key, setKey] = useState(prop.mykey);
  const [item, setItem] = useState(prop.note);
  const [defaultOpen, setDefaultOpen] = useState(false);

  useEffect(() => {
    setItem(prop.note);
  }, [prop.note]);
  if (location.pathname.toString().indexOf("cashier") == -1 && !defaultOpen) {
    // if(key == 0 && !defaultOpen){setDefaultOpen(true)}
  }
  if (item.coinValue) {
    var Coin = item.coin;
    var _titleLink = Coin + " " + item.mode;

    return (
      <Menu.Item
        onClick={() => {
          prop.onUpdateItem("NotificationsItem", item);
          prop.onUpdateItem("cashierMethod", "CryptoCurrencies");
          prop.onUpdateItem("openModalCashier", true);
        }}
      >
        <Icon.Group style={{ marginBottom: 10 }}>
          <Icon
            loading
            size="big"
            color="green"
            name="circle notch"
            style={{ margin: 0 }}
          />
          <Icon name="dollar" />
        </Icon.Group>

        {_titleLink}
      </Menu.Item>
    );
  } else {
    return <Link className="item" to={genLink(item.id)}></Link>;
  }
}

export default ModalExampleShorthand;
