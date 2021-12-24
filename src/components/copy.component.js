import React,{useState, useEffect} from 'react'
import { Button, Modal,Menu ,Icon,Container, Header,Popup,Label} from 'semantic-ui-react'
import Swal from "sweetalert2";
const Toast = Swal.mixin({
    toast: false,
    position: "center",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
  
  });
function copyDo(txxt) {
    navigator.clipboard.writeText(txxt)
    Toast.fire({
        icon: "success",
        title: "Text Copied.",
     
      });
}
function copyText(prop) {
    const [item, setItem] = useState(prop.text);
    const [itemid, setItemid] = useState(prop.itemid);
    const [alter, setAlter] = useState(prop.alter);
    const [size, setSize] = useState(prop.size);
    useEffect(() => {
      setItem(prop.text)

     },[prop.text]);
     useEffect(() => {
      setItemid(prop.itemid)

     },[prop.itemid]);
       useEffect(() => {
      
        setSize(prop.size)
       },[prop.size]);
       useEffect(() => {
        setAlter(prop.alter)
      
         
        
       },[prop.alter]);
           if(item){
            return (
              <Popup content='Copy to Clipboard' size='mini' {...prop}  position='top center'  trigger={<Label as='a'  {...prop}  onClick={() =>  copyDo(item)}>{item} <Label.Detail>{alter}</Label.Detail></Label>} />
            )
           }else{
            return (
              <Popup content='Copy to Clipboard' size='mini' {...prop}  position='top center'  trigger={<p  {...prop}  onClick={() =>  copyDo(itemid)}>{itemid}</p>} />
            )
           }
      
    
}

export default copyText