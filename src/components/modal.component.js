import React,{useState, useEffect} from 'react'
import { Button, Modal,Menu ,Icon,Container, Header,Popup,Label} from 'semantic-ui-react'
import { Link, useLocation } from "react-router-dom";
import CopyText  from "components/copy.component";
import {
    setAvatar,
    getColor,
    getIcon,
    renderer,
    getQueryVariable,
    getCode,
    getGroupBadge,
    getGroupBadgeList,
    getGroupBadgePrice,
    getModalTag,
    getGameTag,
    getMatchTitle,
    haveGameTag,
    getPlayerTag,
    vsComponentTitle,
    isJson,
    haveAdmin,
    handleTagForm,
    rendererBig,
    printEventBTN,
    vsComponentPlayer,
    getColorStatus
  } from "components/include";
var _content = '';
function ModalExampleShorthand(prop) {
    const [item, setItem] = useState(prop.note);
    useEffect(() => {
        setItem(prop.note)
      
         
        
       },[prop.note]);
    if (item.coinValue) {
   
      
        var Coin = item.coin;
        var _titleLink = Coin + ' ' + item.mode;
        var _title = (<Header as='h1' inverted><img src={"https://www.coinpayments.net/images/coins/"+Coin.split(".")[0]+".png"} class="ui avatar image"/>  {Coin + ' ' + item.mode} <span className="text-muted">({item.status})</span></Header>);
        var paydetails = JSON.parse(item.description);
         _content = (<>
         <Container fluid style={{padding:'1.25rem 1.5rem'}}>
      <Header as='h2' inverted>Send To Address</Header>
      <p><CopyText size="small" text={paydetails.address}/></p>
      <img src={paydetails.qrcode_url} style={{background:'gray',width:222,height:222,display:'block'}}/>
      <Header as='h2' inverted>Total Amount To Send</Header>
      <p><CopyText size="big" text={paydetails.amount} alter={Coin}/></p>
      <Header as='h3' inverted>Send only <span className="text-danger">{Coin}</span> to this deposit address.</Header>
                                          
    </Container>
         
                                          
                                          </>)
           
      return (
        <Modal
        basic
          trigger={<Menu.Item as='a' className="firstNotice">
               <Icon.Group style={{marginBottom:10}}>
          <Icon loading size='big' color='green' name='circle notch' style={{margin:0}} />
          <Icon name='dollar' />
        </Icon.Group><br/>
          
          {_titleLink}
        </Menu.Item>}
          header={_title}
          content={_content}
          size='tiny'
          actions={[{ key: 'done', content: 'Done' }]}
        />
      )
    } else{
       
    var _title = item.gameName + ' (' + item.status+')';
    
  return (
    <Link  to={"/panel/lobby?id=" + item.id}>
    <Menu.Item as='a'>
        
           <Icon.Group style={{marginBottom:10}}>
      <Icon loading size='big' color={getColorStatus(item.status)} name='circle notch' style={{margin:0}} />
     
    </Icon.Group><br/>
      
      {_title}
      
    </Menu.Item></Link>
  )
    }
}

export default ModalExampleShorthand