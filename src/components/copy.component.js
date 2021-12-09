import React,{useState, useEffect} from 'react'
import { Button, Modal,Menu ,Icon,Container, Header,Popup,Label} from 'semantic-ui-react'
import Swal from "sweetalert2";
const Toast = Swal.mixin({
    toast: false,
    position: "center",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
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
    const [alter, setAlter] = useState(prop.alter);
    const [size, setSize] = useState(prop.size);
    useEffect(() => {
        setItem(prop.text)
  
       },[prop.text]);
       useEffect(() => {
      
        setSize(prop.size)
       },[prop.size]);
       useEffect(() => {
        setAlter(prop.alter)
      
         
        
       },[prop.alter]);
           
      return (
        <Popup content='Copy to Clipboard' size='mini' inverted position='top center'  trigger={<Label as='a'  size={size}  onClick={() =>  copyDo(item)}>{item} <Label.Detail>{alter}</Label.Detail></Label>} />
      )
    
}

export default copyText