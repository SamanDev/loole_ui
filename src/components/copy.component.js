import React, { useState, useEffect } from "react";
import { Popup, Label, Segment } from "semantic-ui-react";
import Swal from "sweetalert2";
import copy from "copy-to-clipboard";

const Toast = Swal.mixin({
  toast: false,
  position: "center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: false,
});
function copyDo(txxt) {
  //alert();
  copy(txxt);
  //navigator.clipboard.writeText(txxt.toString());
  Toast.fire({
    icon: "success",
    title: "Text Copied.",
  });
}
function copyText(prop) {
  const [item, setItem] = useState(prop.text);
  const [myID, setMyID] = useState(prop.myid);
  const [alter, setAlter] = useState(prop.alter);
  const [size, setSize] = useState(prop.size);
  useEffect(() => {
    setItem(prop.text);
  }, [prop.text]);
  useEffect(() => {
    setMyID(prop.myid);
  }, [prop.myid]);
  useEffect(() => {
    setSize(prop.size);
  }, [prop.size]);
  useEffect(() => {
    setAlter(prop.alter);
  }, [prop.alter]);
  if (item) {
    return (
      <Popup
        content="Copy to Clipboard"
        size="mini"
        {...prop}
        position="top center"
        trigger={
          <Label as="a" {...prop} onClick={() => copyDo(item)}>
            {item}
            {alter && <Label.Detail>{alter}</Label.Detail>}
          </Label>
        }
      />
    );
  } else {
    return (
      <Popup
        content="Copy to Clipboard"
        {...prop}
        position="top center"
        trigger={
          <div
            {...prop}
            style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}
            onClick={() => copyDo(myID)}
          >
            {myID}
          </div>
        }
      />
    );
  }
}

export default copyText;
