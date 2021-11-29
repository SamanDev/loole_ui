import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons'
import { faDesktop, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import Avatar from 'react-avatar';
import Countdown from "react-countdown";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useLocation } from "react-router-dom";
import CurrencyFormat from 'react-currency-format';
import userService from "services/user.service";
import eventBus from "views/eventBus";
import { faInstagram,faTwitch, faYoutube,faTwitter } from '@fortawesome/free-brands-svg-icons';
import Moment from 'moment';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Alert,
  Form,
  InputGroup,
  Navbar,
  Nav,
  OverlayTrigger,
  Table,
  Tooltip,
  Container,
  Row,
  Col,
  Carousel,
  TabContent,
  TabPane,
  Tab,ListGroup
  
} from "react-bootstrap";
import { useHistory } from "react-router";

  import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  import {
    userState
  } from 'atoms';
  var moment = require('moment');

  export const  setUserToken  = (tokenUser) =>{
    const [token,setToken] = useRecoilState(userState);
    console.log(token);
        setToken(tokenUser);
        console.log(token);
  }
  
    
export const  getQueryVariable  = (variable ,q) =>{
  if(q){
    var query = q;
  }else{
    var query = window.location.search.substring(1);
  }
  
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
export const  getPageVariable  = () =>{
  var query = window.location.href;
  var vars = query.split("/")[4];
  if(typeof vars == 'undefined'){vars = query.split("/")[3];}
  //console.log(vars)
      return vars;
    
}

export const  get_date_locale  = (thisDate) =>{
       
  var d = new Date(thisDate);
  var b =d.toLocaleDateString()+' '+d.toTimeString().split(' ')[0]
return b;
}
export const  date_edit  = (thisDate) =>{
  var  newThisDate = thisDate.toString();
  
  
  if(newThisDate.indexOf(' ')==-1 && newThisDate.indexOf('-')==-1 ){
    
    thisDate  = date_locale(thisDate)
    
    
  }
  if(newThisDate.indexOf(' ')>-1 && newThisDate.indexOf('-')>-1 ){
    thisDate = thisDate.replace(' ','T')+'00-08:00';
    //thisDate  = date_locale(thisDate)
   
  }
  //console.log('thisDate: '+thisDate)
    var mom = moment(thisDate).format();
  //thisDate = thisDate.replace('+00:00','-08:00');
  //console.log('momennt: '+mom)
  return mom;
}
export const  date_locale  = (thisDate) =>{
       
  var d = new Date(thisDate);

return d.toLocaleDateString();
}
export const isJson = (item) =>{
  item = typeof item !== "string"
      ? JSON.stringify(item)
      : item;

  try {
      item = JSON.parse(item);
  } catch (e) {
      return false;
  }

  if (typeof item === "object" && item !== null) {
      return true;
  }

  return false;
}
export const  setAvatar  = (name) =>{
      var str = name;
     
      if (str){
        var res = str.substring(0, 1);
        res  = res + ' '+ str.substring(1, 2);
      }
                      
      return res
    }
    
      export const  getIcon  = (name) =>{
      if(name=='Mobile'){return faMobileAlt}
      if(name=='PS4'||name=='PS5'){return faPlaystation}
      if(name=='XBox'){return faXbox}
      if(name=='PC'){return faDesktop}
      
    }
    export const  getColor  = (amount) =>{
    
      if(amount<24){return 'success'}
      else if(amount<40){return 'warning'}
      else if(amount>=40){return 'danger'}
     
    }
    export const  getMatchTitle  = (level,totalPlayer) =>{
    var mTitle = "Round 1"
    if(totalPlayer==4){
      
      if(level==1){mTitle = "SemiFinal"}
      if(level==2){mTitle = "Final"}
     
    }
    if(totalPlayer==8){
     
      if(level==2){mTitle = "SemiFinal"}
      if(level==3){mTitle = "Final"}
    }
    if(totalPlayer==16){
      if(level==2){mTitle = "Round 2"}
      if(level==3){mTitle = "SemiFinal"}
      if(level==4){mTitle = "Final"}
      //if(level==4){mTitle = "3rd Place"} 
    }
    if(totalPlayer==32){
      if(level==2){mTitle = "Round 2"}
      if(level==3){mTitle = "Round 3"}
      if(level==4){mTitle = "SemiFinal"}
      if(level==5){mTitle = "Final"}
      //if(level==5){mTitle = "3rd Place"} 
    }
      return mTitle
    }
    export const  getGroupBadge  = (sign,amount,classes) =>{
      if (sign == 'Dollar'){
        var nAmount = Number.parseFloat(amount).toFixed(2);
      }else{
        var nAmount = Number.parseFloat(amount).toFixed(0);
      }
      
     
        return (
          <div style={{height:30,padding:'2px 0'}}><Badge variant={getColor(amount)} className={"badgegroup "+classes}>
                                        <span className="cur"><img
                              alt={"loole "+sign}
                             
                              src={"/assets/images/"+sign+".svg"}
                            ></img></span>
                            <CurrencyFormat value={nAmount} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span className="lable">{value}</span>} />
                                       
                                        </Badge></div>
        )
       
      }
    export const  getGroupBadgeList  = (sign,amount,classes) =>{
      if (sign == 'Dollar'){
        var nAmount = Number.parseFloat(amount).toFixed(2);
      }else{
        var nAmount = Number.parseFloat(amount).toFixed(0);
      }
        return (
          <Badge variant={getColor(amount)} className={classes}>
                                          <span className="cur" style={{float:'left'}}><img
                                alt={"loole dollar"}
                               
                                src={"/assets/images/"+sign+".svg"}
                              ></img></span>
                              <CurrencyFormat value={nAmount} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span className="lable">&nbsp; <b>{value}</b></span>} />
                                         
                                          </Badge>
        )
       
      }
      export const  getGroupBadgePrice  = (sign,amount,classes) =>{
        if (sign == 'Dollar'){
          var nAmount = Number.parseFloat(amount).toFixed(2);
        }else{
          var nAmount = Number.parseFloat(amount).toFixed(0);
        }
          return (
            <div style={{height:30,padding:'2px 0',transform:'scale(1.2)',zIndex:-1,position:'relative'}}><Badge variant={getColor(amount)} className={"badgegroup"}>
                                          <span className="cur"><img
                                alt={"loole "+sign}
                               
                                src={"/assets/images/"+sign+".svg"}
                              ></img></span>
                              <CurrencyFormat value={nAmount} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span className="lable">&nbsp; <b>{value}</b> &nbsp; Prize </span>} />
                                         
                                          </Badge></div>
          )
         
        }
        export const getModalTag = (filtermode) => {
         // console.log(filtermode)
          if(filtermode.indexOf(' - ')>-1){
            var filter = filtermode.split(" - ")[0];
            var controlname = filtermode.split(" - ")[1];
          }else{
            var filter = filtermode;
          var controlname = filtermode;
          }
          
          let tagsof = {}
          
          if(filter=='8Pool'){
             tagsof = {
              customClass:'tag',
              title: "Connect Your 8Pool Account",
              focusConfirm: false,
              html: `<div class="card-plain card text-left" >
              <ol><li>Open player profile in 8BallPool</li><li>Copy Unique ID</li><li>Paste the Unique ID below
              <div className="form-group">
              <label>Enter your Unique ID</label>
                <input class="form-control" id="tagid" type="tel" pattern="[0-9]" /></div>
       </li><li>and then enter your 8BallPool Nickname below
       <div className="form-group">
       <label>Enter your Nickname</label>
       <input class="form-control" id="tagname" type="text" /></div>
    </li></ol>
       
              
              `,
            
              icon: "warning",
              showCancelButton: true,
              cancelButtonColor: "grey",
              confirmButtonText: "Connect",
            
              showLoaderOnConfirm: true,
              preConfirm: (login) => {
                if (
                  document.getElementById("tagid").value &&
                  document.getElementById("tagname").value
                ) {
                  return {
                    tagid:
                      document.getElementById("tagid").value,
                     tagname:
                      document.getElementById("tagname").value,
                  };
                } else {
                  Swal.showValidationMessage(`All fields are required!!`);
                }
              },
            
              allowOutsideClick: () => !Swal.isLoading(),
            };
          }
          if(filter=='Social'){
            
              var accMode = controlname + ' Account'
              var tagMode = controlname + ' ID'
              var holderMode = ''
            
           
            
             tagsof = {
              customClass:'tag',
              title: 'Connect Your '+accMode+'',
              focusConfirm: false,
              html: `<div class="card-plain card text-left" >
              <div className="form-group">
              <label>Enter your `+tagMode+`</label>
                <input class="form-control" id="tagid" type="text" placeholder="`+holderMode+`" /></div>
                </div>
              
              `,
              icon: "warning",
              showCancelButton: true,
              cancelButtonColor: "grey",
              confirmButtonText: "Connect",
            
              showLoaderOnConfirm: true,
              preConfirm: (login) => {
                if (
                  document.getElementById("tagid").value
                ) {
                  return {
                    tagid:
                      document.getElementById("tagid").value
                  };
                } else {
                  Swal.showValidationMessage(`All fields are required!!`);
                }
              },
            
              allowOutsideClick: () => !Swal.isLoading(),
            };
          }
          if(controlname=='PS4'||controlname=='PS5'||controlname=='PSN'||controlname=='XBOX'){
            if(controlname=='PS4'||controlname=='PS5'||controlname=='PSN'){
              var accMode = 'PSN Account'
              var tagMode = 'PSN ID'
              var holderMode = ''
            }
            if(controlname=='XBOX'){
              var accMode = 'XBOX Account'
              var tagMode = 'XBOX ID'
              var holderMode = ''
            }
           
            
             tagsof = {
              customClass:'tag',
              title: 'Connect Your '+accMode+'',
              focusConfirm: false,
              html: `<div class="card-plain card text-left" >
              <div className="form-group">
              <label>Enter your `+tagMode+`</label>
                <input class="form-control" id="tagid" type="text" placeholder="`+holderMode+`" /></div>
                </div>
              
              `,
              icon: "warning",
              showCancelButton: true,
              cancelButtonColor: "grey",
              confirmButtonText: "Connect",
            
              showLoaderOnConfirm: true,
              preConfirm: (login) => {
                if (
                  document.getElementById("tagid").value
                ) {
                  return {
                    tagid:
                      document.getElementById("tagid").value
                  };
                } else {
                  Swal.showValidationMessage(`All fields are required!!`);
                }
              },
            
              allowOutsideClick: () => !Swal.isLoading(),
            };
          }
          if(filter=='ClashRoyale'){
           
              var accMode = 'ClashRoyale Account'
              var tagMode = 'ClashRoyale PlayerTag'
              var holderMode = '#123456'
        
            
             tagsof = {
              customClass:'tag',
              title: 'Connect Your '+accMode+'',
              focusConfirm: false,
             
              html: `<div class="card-plain card text-left" >
              <ol><li>Open player profile in Clash Royale</li> <li>Long-press on your player tag</li> <li>Tap “Copy Tag”</li><li>Paste the Player Tag below
              <div className="form-group">
              <label>Clash Royale Player Tag</label>
                <input class="form-control" id="tagid" type="text" placeholder="`+holderMode+`" /></div>
                </div>
       </li></ol>
       
              
              `,
              icon: "warning",
              showCancelButton: true,
              cancelButtonColor: "grey",
              confirmButtonText: "Connect",
            
              showLoaderOnConfirm: true,
              preConfirm: (login) => {
                if (
                  document.getElementById("tagid").value
                ) {
                  return {
                    tagid:
                      document.getElementById("tagid").value
                  };
                } else {
                  Swal.showValidationMessage(`All fields are required!!`);
                }
              },
            
              allowOutsideClick: () => !Swal.isLoading(),
            };
          }
          if(filter=='CallOfDuty' || filter=='CallOfDuty Warzone'){
            
            
            tagsof = {
              customClass:'tag',
             title: 'Expose Public Match Data',
             focusConfirm: false,
             html: `<div class="card-plain card text-left" ><ol><li>Login to the <a target="_blank" rel="noreferrer noopenner" href="https://profile.callofduty.com/cod/login"><span data-ignore="true">Call of Duty</span> website.</a></li><li>Find the <a href="https://profile.callofduty.com/cod/profile" target="_blank" rel="noreferrer noopenner">account preference</a> page.</li><li>Click on the Account Linking tab. Here you will find the <span data-ignore="true">PlayStation</span>, <span data-ignore="true">Xbox</span>, <span data-ignore="true">Battle.net</span>, or <span data-ignore="true">Steam</span> accounts that you've connected.</li><li>Set <strong>Searchable</strong> and <strong>Data Visible</strong> to <strong>All</strong></li></ol></div>`,
             icon: "info",
             showCancelButton: true,
             cancelButtonColor: "grey",
             confirmButtonText: "Continue",
           
             showLoaderOnConfirm: true,
             preConfirm: (login) => {
               
                 return {
                   tagid:
                   filter+'2'
                 };
              
             },
           
             allowOutsideClick: () => !Swal.isLoading(),
           };
         }
         if(filter=='Fortnite'){
            
            
          tagsof = {
            customClass:'tag',
           title: 'Make your Fortnite stats public',
           focusConfirm: false,
           html: `<div class="card-plain card text-left" ><ol><li>Launch the game <span data-ignore="true">Fortnite</span></li><li>Enter the Battle Royale mode</li><li>Go to your Settings</li><li>Navigate to your Account Settings Tab</li><li>Toggle "Show On Leaderboard" option to Yes</li></ol></div>`,
           icon: "info",
           showCancelButton: true,
           cancelButtonColor: "grey",
           confirmButtonText: "Continue",
         
           showLoaderOnConfirm: true,
           preConfirm: (login) => {
             
               return {
                 tagid:
                 filter+'2'
               };
            
           },
         
           allowOutsideClick: () => !Swal.isLoading(),
         };
       }
       if(filter=='CallOfDuty2' || filter=='CallOfDuty Warzone2'){
            
            
        tagsof = {
          customClass:'tag',
          
         title: 'Connect Your Activition Account',
         focusConfirm: false,
         html: `<div class="card-plain card text-left" >
         <ol><li>Click/hover on your username and click "Account" or <a href="https://profile.callofduty.com/cod/profile" target="_blank" rel="noreferrer noopener">go here</a></li><li>Under "Account" copy the long string that appears after "ID"</li><li>Paste your ID below
         <div className="form-group">
         <label>ACTIVISION ID</label>
         <input class="form-control" id="tagid" type="text" placeholder="XXXXXX#00000" /></div>
         <div className="form-group">
         <label>Platform</label>
         <select class="form-control" id="tagplatform">
         <option value="PSN">Playstation Network</option>
         <option value="xbl">Xbox Live</option>
         <option value="steam">Steam</option>
         <option value="battle">Battle.net</option>
         </select>
         </div>
         </li></ol>
           
             </div>
            
            `,
            icon: "warning",
            showCancelButton: true,
         cancelButtonColor: "grey",
         confirmButtonText: "Connect",
       
         showLoaderOnConfirm: true,
         preConfirm: (login) => {
          if (
            document.getElementById("tagid").value
          ) {
            return {
              tagid:
                document.getElementById("tagid").value,
                tagplatform:document.getElementById("tagplatform").value,
            };
          } else {
            Swal.showValidationMessage(`All fields are required!!`);
          }
         },
       
         allowOutsideClick: () => !Swal.isLoading(),
       };
     }
     if(filter=='Fortnite2'){
            
            
      tagsof = {
        customClass:'tag',
       title: 'Paste your Epic ID',
       focusConfirm: false,
       html: `
       <div class="card-plain card text-left" >
       <ol><li>Go to <a href="https://epicgames.com" target="_blank" rel="noreferrer noopenner" data-ignore="true">epicgames.com</a> and login to your <span data-ignore="true">Epic</span> account.</li><li>Click/hover on your username and click "Account" or <a href="https://www.epicgames.com/account/personal?productName=epicgames&amp;lang=en" target="_blank" rel="noreferrer noopener">go here</a></li><li>Under "Account ID" copy the long string that appears after "ID"</li><li>Paste the ID below
       <div className="form-group">
          <label>Epic account ID</label>
          <input class="form-control" id="tagid" type="text" placeholder="Your Epic account ID" /></div>
       </li></ol>
            </div>
          
          `,
          icon: "warning",
          showCancelButton: true,
       cancelButtonColor: "grey",
       confirmButtonText: "Connect",
     
       showLoaderOnConfirm: true,
       preConfirm: (login) => {
        if (
          document.getElementById("tagid").value
        ) {
          return {
            tagid:
              document.getElementById("tagid").value
          };
        } else {
          Swal.showValidationMessage(`All fields are required!!`);
        }
       },
     
       allowOutsideClick: () => !Swal.isLoading(),
     };
    }
          return tagsof
        }
        export const  addTime = (datetime, hours) => {
      var result = new Date(datetime);
    
      result.setHours(result.getHours() + hours);
          
      return result;
    }
    export const renderer = ({ days,hours, minutes, seconds, completed,dateExpired }) => {
      
      if (completed) {
        // Render a complete state
        //return <Completionist />;
        return (
          <>Started</>
          );
      } else {
        // Render a countdown
        return (

        <span>
           {days > 0? (
             <>
          {days} <small style={{color: 'inherit'}}>days </small>  
          </>
           ):(null)}
           {hours > 0 ? (
             <>
             {hours > 9 ? (
             <>
          {hours}:
          </>
           ):(
             <>
             0{hours}:
             </>
           )}
          
          </>
           ):(null)}
           {minutes > 9 ? (
             <>
          {minutes}:
          </>
           ):(
             <>
             0{minutes}:
             </>
           )}
           {seconds > 9 ? (
             <>
          {seconds}
          </>
           ):(
             <>
             0{seconds}
             </>
           )}
           
        </span>
        );
      }
      };
      export const getCode = ( code ) => {
        
       if(code){
        return(
          <span >
          {code.toString().split("").map(function(char, index){
              return <span className="char" key={index}>{char}</span>;
          })}
          </span>
      );
       }
        
   
      
      };
      export const getGameTag = ( game,userTags ) => {
        var res = 'Not Connected'
        var resName = ''
if(userTags){
  userTags.map(function(tag){
          
    if (tag.gameName==game){
res=tag.tagId
resName = tag.nickName
if(resName=='')resName='Connected'
if(res!=''&&game=='ClashRoyale')res='#'+res
    }

   
})
}
res=res.split('@@')[0]
if(res== 'Not Connected') {
  return ( <p style={{opacity:.5,margin:0,lineHeight:'20px'}}><small className="text-muted"><b>{res}</b><br/>Click to connect</small></p>)
}else{
  return (<p style={{margin:0,lineHeight:'20px'}}><small><b>{resName}</b><br/>{res}</small></p>)
}
  

   
      
      };
      export const getSocialTag = ( game,userTags ) => {
        var res = 'Not Connected'
        var resName = ''
        
if(userTags){
  userTags.map(function(tag){
          
    if (tag.accountName==game){
res=tag.accountId
resName = ''
if(resName=='')resName='Connected'
    }
    })
}
res=res.split('@@')[0]
if(res== 'Not Connected') {
  return ( <span style={{opacity:.5}}><small className="text-muted"><b>{res}</b> - Connect Your {game}</small></span>)
}else{
  return (<span><small><b>{resName}</b> - {res}</small></span>)
}
  

   
      
      };
      export const userDetails = ( currentUser ) => {
        var  flag='ir'
        if (currentUser.country.value && currentUser.country.value !=  flag){flag = currentUser.country.value }
        return (
          <>
        
                   
                     
                    <div className="card-description text-center" style={{marginBottom:30}}>
                      <Card.Title as="h5" style={{marginBottom:0,marginTop:15}}>{currentUser.username} <img src={"/assets/images/famfamfam_flag_icons/png/"+flag+".png"} /></Card.Title>
                      <small style={{fontSize:10}}>{currentUser.lastLogin}</small><br/>
                        <ListGroup horizontal style={{display:'inline-flex',marginTop:10}}>
                        {(haveSocialTag('Instagram',currentUser.userSocialAccounts)) && (<ListGroup.Item action><FontAwesomeIcon  icon={faInstagram} style={{color: '#e95950'}}/></ListGroup.Item>)}
                        {(haveSocialTag('Twitch',currentUser.userSocialAccounts)) && (<ListGroup.Item action><FontAwesomeIcon  icon={faTwitch} style={{color: '#6441a5'}} /></ListGroup.Item>)}
                        {(haveSocialTag('Youtube',currentUser.userSocialAccounts)) && (<ListGroup.Item action><FontAwesomeIcon  icon={faYoutube} style={{color: '#FF0000'}}/></ListGroup.Item>)}
                        {(haveSocialTag('Twitter',currentUser.userSocialAccounts)) && (<ListGroup.Item action><FontAwesomeIcon  icon={faTwitter} style={{color: '#00acee'}} /></ListGroup.Item>)}
  
  
  
  
</ListGroup>
                        </div>
                        </>
        )
      }
      export const haveSocialTag = ( platform, userTags ) => {
        var res = 'Not Connected'
        var resName = ''
if(userTags){
  userTags.map(function(tag){
          
    if (tag.accountName==platform){
res=tag.accountId

    }

   
})
}
if(res== 'Not Connected') {
  return false
}else{
  return true
}
  

   
      
      };
      export const getPlayerTag = ( player,playerTags,mode,gameName ) => {
        var val = '';
  playerTags.map((tag, w) => {
          
    if (tag.username==player){
      if(mode== 'nickname') {
  
        val=tag.nickName
      }else if(mode== 'console') {
  
        val=tag.gamePlatform
        if(val=='Mobile'){val=gameName}
      }else{
  val=tag.tagId
  val=val.split('@@')[0]
}


}
})
return (val)
   };

   export const haveGameTag = ( game,userTags ) => {
    var res = 'Not Connected'
    var resName = ''
if(userTags){
userTags.map(function(tag){
      
if (tag.gameName==game){
res=tag.tagId
res=res.split('@@')[0]
}


})
}
if(res== 'Not Connected') {
return false
}else{
return true
}



  
  };
  export const printBlockChallenge = (newItem,filtermode) => {
    const history = useHistory();
    var filter = filtermode;
    if  (filter == "all"){filter=''}
    if  (filter == "NoMobile"){filter='Console'}
    if(newItem.length == 0){
      //history.push("/home");
      return (
    
        <Col xl="12" style={{textAlign: "center",color:'rgba(0,0,0,.5)'}}>
        <div >
        <img
                        alt="nodata"
                        style={{ height: 80 }}
                        src="/assets/images/nodata.svg"
                      ></img>
<h4>Empty List.</h4>
<h5>You currently don't have any {filter} event.</h5>
</div>
          

        </Col>
      )
    }else{
      return newItem.map((item, i) => {
     
        return (

          <Col lg="4" xl="3" key={i}>
            {printMatchBlock(item)}

          </Col>
        )
      } 
    )
    }
    
  }
   export const haveGetway = ( userTags,game ) => {
    var res = 'Not Connected'
    
if(userTags){
userTags.map(function(tag){
      
if (tag.name==game && tag.active){
res=tag.name
}


})
}
if(res== 'Not Connected') {
return false
}else{
return true
}



  
  };
   export const haveGetwayMode = ( userTags,game ) => {
    var res = 'Not Connected'
    
if(userTags){
userTags.map(function(tag){
      
if (tag.mode==game && tag.active){
res=tag.name
}


})
}
if(res== 'Not Connected') {
return false
}else{
return true
}



  
  };
  export const handleTagForm = (game,platform,currentUser) => {
    if(currentUser.accessToken){
        const resetPw = async () => {
          const swalval = await Swal.fire(getModalTag(game));
          
          let v = (swalval && swalval.value) || swalval.dismiss;
          
          if (v) {
            if (v.tagid) {
              var gameName,gamePlatform,gameID,gameNickname;
              gameName = game;
                if (v.tagid == game+"2") {
                  handleTagForm(game+'2',platform,currentUser)
                }else if (v.tagid == game+"3") {
                  handleTagForm(game+'3',platform,currentUser)
                }else{
                  
                  gameID = '';
                  gameNickname = '';
                  if (v.tagid != "") {
                  
                  
                    gameID = v.tagid.replace('#','')
                  }
                  if (v.tagname && v.tagname != "") {
                 
                    gameNickname = v.tagname;
                  }
                  if (v.tagplatform && v.tagplatform != "") {
                 
                    gamePlatform = v.tagplatform
                  }
                  
                
                    handleSaveTags(gameName,gamePlatform,gameID,gameNickname);
                  
                }
                
              }
              
              //setformdata(swalval);
              
            
          }
        };
    if(!haveGameTag(game,currentUser.userTags))                  resetPw();
    }
      }
      export const handleSaveTags = (gameName,gamePlatform,gameID,gameNickname) => {
        
        Swal.fire({
          title: '<br/>Please Wait...',
          text: 'Is working..',
          customClass:'tag',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          didOpen: () => {
              Swal.showLoading()
          }
      })
      
        userService
          .saveTags(
           
            gameName,
            gamePlatform,
            gameID,
            gameNickname,
    
          )
          .then(
            (response) => {
             
              let jsonBool = isJson(response);
       
              if (jsonBool) {
               
                
                  
                  Swal.fire("", "Data saved successfully.", "success");
                  //window.location.reload(false);
              } else {
               
                  Swal.fire("", response, "error");
               
              }
            
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              Swal.fire("Error!", resMessage, "error");
            }
          );
      }
  export const haveAdmin = ( userTags ) => {
  var isAdmin = false;
  if(userTags){
    userTags.map(function(tag){
      
      if (tag.name=='ROLE_ADMIN'){
      isAdmin = true;
      }
      })
  }


return isAdmin




  
  };
      export const  printRequired = () => {
     
    
        
        return (
            <>
            
          <div className="alert alert-danger " role="alert" style={{position:'relative',top:-12,fontSize:12,padding:5}}>
            This field is required!
            
          </div>
          </>
        );
        
      
  }
  
  
  export const  editDateTime = (datee) => {
    
          
           
           //dt = Moment(dt).format('YYYY-MM-DDThh:mm:ss.0')
           //var date = new Date();
           
            try{
              var dt = datee;
              var datenew = new Date(dt);
              
              var dateExpired = datenew.toISOString();
           
             } catch (e) {
              var dt = datee.replace(' ','T') + '00Z';
              console.log(dt)
              var dtN = Moment(dt).format('YYYY-MM-DDThh:mm:ss.000-08:00')
              console.log(dtN)
               var datenew = new Date(dtN);
               var dateExpired = datenew.toISOString();
               
            }
            return dateExpired
              
  }
  function genMatch(lvl, matchCount, title) {
    var matchSample = {
      startTime: 1619728571000,
      winner: "Salar",
      matchPlayers: [
        {
          ready: false,
          username: "vahid",
        },
        {
          ready: false,
          username: "Yaran12",
        },
      ],
    };
    var matchSampleull = {
      startTime: 1619728571000,
      winner: null,
      matchPlayers: [
        {
          id: 257,
          username: null,
          tagName: null,
          ready: false,
        },
        {
          id: 257,
          username: null,
          tagName: null,
          ready: false,
        },
      ],
    };
    var nullmatch = {
      id: 100000,
      level: 1,
      title: "",
      matches: [],
    };
    nullmatch.level = lvl;
    nullmatch.title = title;
    for (let index = 0; index < matchCount; index++) {
      if (lvl == 3 && 12 == 1) {
        nullmatch.matches.push(matchSample);
      } else {
        nullmatch.matches.push(matchSample);
      }
      //e.log(item.players[index].username)
      if (index < 9) {
        // nullmatch.matches.matchPlayers[0].push(item.players[index])
      }
    }
  
    return nullmatch;
  }
  export const editEvent = (item,eventIDQ,matchIDQ,currentUser) => {
    //console.log('item:'+JSON.stringify(item))
    var nullplayer = {
      id: 100000,
      
      username: false,
      ready: false,
    };
    var mymatchFind = null;
    var matchLevelFind =null
    var isJoin = false;

var isEdit= false;
var isEditTime = 0;
    
    if(!item){
      
      isEdit= true;
    
    //  reGetevents()
    }else{
    
    clearTimeout(isEditTime)
    if(isEdit==false){
      isEdit= true;
      //console.log('item:'+item)
     // isEdit= true;
    isJoin = false;
          
    var activePlayer = 0;
   var   isInPlayers = false;
 var matchidFind = []
 var finalChat = []
 
 var lists = [];

           
    activePlayer = 0;
  
    if (typeof item === "undefined") {
      //this.props.history.push("/panel/dashboard");
    }
    
    if (item.gameMode == "Tournament") {
      if (!item.tournamentPayout) {
        item.tournamentPayout = "1-8, 65.00, 35.00|9-64, 50.00, 30.00, 20.00";
      }
    }
    if (item.gameMode == "League") {
      if (!item.scoreTemplate) {
        item.scoreTemplate = {
          "kills": 20,
          "damageDone": 0.06,
          "timePlayed": 0.04,
          "teamPlacement": [
            {
              "type": "eq",
              "trigger": "1",
              "multiplier": "0",
              "addition": "240",
              "altText": "1st Place"
            },
            {
              "type": "lte",
              "trigger": "3",
              "multiplier": "0",
              "addition": "60",
              "altText": "2nd or 3rd Place"
            },
            {
              "type": "lte",
              "trigger": "8",
              "multiplier": "0",
              "addition": "20",
              "altText": "4th to 8th Place"
            }
          ]
        };
      }
    }
    
    if (item.gameMode == "League") {
      item.tournamentPayout='1-4, 100.00|5-7, 65.00, 35.00|8-10, 50.00, 30.00, 20.00|11-20, 45.00, 28.00, 17.00, 10.00|21-40, 36.00, 23.00, 15.00, 11.00, 8.00, 7.00|41-70, 30.00, 20.00, 14.00, 10.00, 8.00, 7.00, 6.00, 5.00|71-100, 29.00, 18.00, 12.50, 10.00, 8.00, 6.50, 5.50, 4.50, 3.50, 2.50|101-200, 28.00, 17.50, 11.50, 8.50, 7.00, 5.50, 4.50, 3.50, 2.50, 1.50, 1.00x10|201-400, 27.00, 16.50, 10.50, 8.00, 6.25, 4.75, 3.75, 2.75, 1.75, 1.25, 0.75x10, 0.50x20|401-700, 26.00, 15.50, 10.00, 7.50, 6.00, 4.50, 3.50, 2.50, 1.50, 1.00, 0.65x10, 0.40x20, 0.25x30|701-1000, 25.00, 15.00, 10.00, 7.25, 5.50, 4.25, 3.25, 2.25, 1.25, 0.75, 0.55x10, 0.40x20, 0.25x30, 0.15x30'
    }
    
    
    
    if (!item.winner) {
      item.winner = [];
      item.winner.push(nullplayer);
    }
    if (!item.rules) {
      item.info = {
        conditions: [
          "Thank you for participating in our COD: Warzone Beta tournament",
          "During the Beta scores may be altered, removed or updated as we test the implementation of our scoring systems",
          "Only games played after you join the tournament are counted",
          "SMURF accounts are not allowed on Repeat.gg and will be banned",
        ],
      };
      item.rules =
        "<p>Refer to the tournament details to see what game modes are tracked</p><p>Smurfing (creating a new account to compete with) will result in an immediate and permanent ban from <span data-ignore='true'>Repeat.gg</span> and all winnings will be forfeited.</p><p>You must play the minimum number of games in order to get paid out in a tournament. The minimum number of games to play is the same as the number of games we count for your score, which can be found in the Tournament Details.</p>";
     
    }
    if (!item.matchLevel) {
      item.matchLevel = [];
      if (item.totalPlayer == 4) {
       
        item.matchLevel.push(genMatch(1, 2, "SemiFinal"));
        item.matchLevel.push(genMatch(2, 1, "Final"));
      }
      if (item.totalPlayer == 8) {
        item.matchLevel.push(genMatch(1, 4, "Round 1"));
        item.matchLevel.push(genMatch(2, 2, "SemiFinal"));
        item.matchLevel.push(genMatch(3, 1, "Final"));
      }
      if (item.totalPlayer == 16) {
        item.matchLevel.push(genMatch(1, 8, "Round 1"));
        item.matchLevel.push(genMatch(2, 4, "Round 2"));
        item.matchLevel.push(genMatch(3, 2, "SemiFinal"));
        
        item.matchLevel.push(genMatch(4, 1, "Final"));
        //item.matchLevel.push(genMatch(4, 1, "3rd Place"));
      }
      if (item.totalPlayer == 32) {
        item.matchLevel.push(genMatch(1, 16, "Round 1"));
        item.matchLevel.push(genMatch(2, 8, "Round 2"));
        item.matchLevel.push(genMatch(3, 4, "Round 3"));
        item.matchLevel.push(genMatch(4, 2, "SemiFinal"));
        
        item.matchLevel.push(genMatch(5, 1, "Final"));
        //item.matchLevel.push(genMatch(5, 1, "3rd Place"));
      }
    }
                var old = JSON.stringify(item).replace(/"Tournament Player1"/g, false).replace(/"Tournament Player"/g, false); //convert to JSON string
                var newArray = JSON.parse(old);
                newArray.current_brackets = [];
                newArray.potential_brackets = [];
                 item = newArray;
    
        //var events = eventGet;
        
        if (item.tournamentPayout) {
          var payArr = item.tournamentPayout.split("|");
          var totalPay = item.prize
          for (var i = 0; i < payArr.length; i++) {
            var paylvl = payArr[i].split(", ");
            var payplyer = paylvl[0].split("-");
        var tItem = item.players.length;
        if(item.status=='Pending' || item.gameMode == "League"){tItem = item.totalPlayer}
            // console.log(payplyer[0])
            if (
              parseInt(payplyer[0]) <= tItem &&
              parseInt(payplyer[1]) >= tItem
            ) {
              for (var j = 1; j < paylvl.length; j++) {
                if(paylvl[j].indexOf('x')==-1){paylvl[j] = paylvl[j]+'x1'}
                var intX = paylvl[j].split("x");
                item.current_brackets.push({
                  prize: (intX[0]* totalPay) / 100,
                  percent: intX[0],
                number: intX[1],
                });
              }
            }
          }
          for (var i = payArr.length - 1; i < payArr.length; i++) {
            
            var paylvl = payArr[i].split(", ");
            var payplyer = paylvl[0].split("-");
            var tItem = item.players.length;
        if(item.status=='Pending' || item.gameMode == "League"){tItem = item.totalPlayer}
            if (
              parseInt(payplyer[0]) <= tItem &&
              parseInt(payplyer[1]) >= tItem
            ) {
            for (var j = 1; j < paylvl.length; j++) {
              if(paylvl[j].indexOf('x')==-1){paylvl[j] = paylvl[j]+'x1'}
              var intX = paylvl[j].split("x");
              item.potential_brackets.push({
                prize: (intX[0] * totalPay) / 100,
                percent: intX[0],
                number: intX[1],
              });
            }
          }
          }
        }
    
         lists = item.matchTables;
         matchidFind = item.matchTables[0];
        
        if(matchIDQ){
          lists.map((tblmatch, w) => {
            //console.log(tblmatch.id == parseInt(eventIDQ))
            if(parseInt(tblmatch.id) == parseInt(matchIDQ)){
              matchidFind = tblmatch;
            }
          }
      
          )
          
            //matchidFind = lists.filter( (list) => list.id === );
          }
          
          if((item.status=='InPlay' || item.status=='Pending' || item.status=='Ready') && item.gameMode=='Tournament'){
            lists.map((tblmatch, w) => {
              tblmatch.startTime = date_edit(tblmatch.startTime)
              if(tblmatch.status=='InPlay' || tblmatch.status=='Pending' || tblmatch.status=='Ready'){
                if(!matchLevelFind){matchLevelFind = tblmatch;}
              }
              if(tblmatch.status!='Finished' && (tblmatch.matchPlayers[0].username==currentUser.username || tblmatch.matchPlayers[1].username==currentUser.username)){
                mymatchFind = tblmatch;
              }
            }
        
            )
            
              //matchidFind = lists.filter( (list) => list.id === );
            }
        //matchidFind.status = 'InPlay'
        
        item.expire = date_edit(item.expire)
       item.startTime = date_edit(item.startTime)
       item.finished = date_edit(item.finished)
      
       if(!matchidFind){matchidFind = {
        "id": item.id,
        "winner": null,
        "status": item.status,
        "level": null,
        "matchCode": null,
        "startTime": "2021-11-29T12:18:01.000+00:00",
        "matchPlayers": [],
        "matchChats": []
    }}
    console.log(matchidFind)
        if(item.chats!='null'){
          {item.chats.map((itemnew, i) => {
            finalChat.push(itemnew)
          })}
          {finalChat.map((itemnew, i) => {
            
              itemnew.time = date_edit(itemnew.time)
             
            
           
            })}
            
            item.chats  = finalChat;
        }
        
        // this creates the intial state of this component based on the collapse routes
        // that it gets through routes prop
        

        finalChat = []
        if(matchidFind.matchChats!='null'){
          {matchidFind.matchChats.map((itemnew, i) => {
            finalChat.push(itemnew)
          })}
          {finalChat.map((itemnew, i) => {
           
              itemnew.time = date_edit(itemnew.time)
              
            })}
            
            matchidFind.matchChats  = finalChat;
        }
        
       
       item.expire = date_edit(item.expire)
         var dateExpired = item.expire;
         
        if (matchidFind && item.gameMode != "Tournament" && item.gameMode != "League") {
          
         
          if (!item.players[1]) {
            item.players.push(nullplayer);
          }
          if (matchidFind && !matchidFind.matchPlayers[0]) {
            matchidFind.matchPlayers.push(nullplayer);
          }
          if (matchidFind && !matchidFind.matchPlayers[1]) {
            matchidFind.matchPlayers.push(nullplayer);
          }
          matchidFind.matchPlayers.sort((a, b) => (a.id > b.id ? 1 : -1));
        }
         isInPlayers = false;
        if (item.gameMode != "League") {
        if((matchidFind.matchPlayers[0].username ==
          currentUser.username ||
          matchidFind.matchPlayers[1].username ==
            currentUser.username)){
              isInPlayers = true;
            }
          }
        if(item.gameMode == "Tournament" && !eventIDQ){
          var expiryDate = new Date(dateExpired);
          expiryDate.setHours(expiryDate.getHours() + matchidFind.level);
        }
        if(item.gameMode == "Tournament" && matchIDQ) {
        if (!item.players[0]) {
          item.players.push(nullplayer);
        }
        if (!item.players[1]) {
          item.players.push(nullplayer);
        }
        }
        item.matchidFind = matchidFind
        return  item
       
          
        
       
      }else{
        //isEdit= false;

        isEditTime = setTimeout(() => {
          //console.log('isedit:'+isEdit)
          isEdit= false;
          
        }, 2000);
      }
    }
  }
  export const  printMatchBlock = (item) => {
   
  var _mode=' 1 v 1 '
          var _color = '#404040'
          var dateEdited = date_edit(item.expire);
      
          var dateExpired = dateEdited;
        
  var now = new Date();
 
  
   //console.log(item.gameName)
  var dateNow = now.toISOString();
  
  
          if(item.gameMode == 'Tournament'||item.gameMode == 'League'){_mode = item.gameMode}
          if(item.gameMode == 'Tournament'||item.gameMode == 'League'){
           // _mode = " $"+(item.totalPlayer * item.amount)*90/100+' '
            //_color = 'orange'
          }
         
          if (item.winner)  {_mode = setAvatar(item.winner)}
          
          return (
            <Link  to={'/panel/lobby?ref='+getPageVariable() +'&id='+item.id}>
            <Card className="card-user chall" >
            <Card.Header className="no-padding">
              <div className="card-image">
              <img
                            alt={item.gameName}
                           
                            src={require("assets/images/games/"+item.gameName+".jpg").default}
                          ></img>
              </div>
              <div className="text-center"   style={{position:'absolute',right:0,left:0,marginTop:-50}}>
                {item.winner && item.winner !== null ? (
                  <Avatar size="80"  style={{boxShadow: '0px 0px 20px 20px rgba(0,0,0,0.2)'}}  round={true} name={_mode} />
                ):(
                  <Avatar size="80" textSizeRatio={6} style={{boxShadow: '0px 0px 20px 20px rgba(0,0,0,0.2)'}} color={_color} round={true} value={_mode} />
                )}
              
              </div>
            </Card.Header>
            <Card.Body>
              
    <Row>
  <Col  xs="7">
  <Card.Title as="h5" style={{fontSize:15}} >{item.gameName}</Card.Title>
  <small className="text-muted">{item.gameMode}<br/></small>
  <small className="text-muted">Prize<br/></small>
  {item.players[0] ? (
                <small>
                {item.players.map((user, z) => (
                  <span key={z}>
                  {(z<5)?(
                    <>
            {(z<4)?(
              <Avatar size="25"  title={user.username} round={true} name={setAvatar(user.username)} />
            ):(
  <Avatar  size="25"  round={true} value={"+"+(item.players.length-4)} color="gray" />
            )}
             
            </>
            ):(null)}
           </span>
  
  ))}
  </small>
    ):(
      <span>
  <Avatar size="25" round={true} name="?" src="https://graph.facebook.com/100008343750912/picture?width=200&height=200" color="lightgray" />
  <Avatar size="25" round={true} name="?" src="https://graph.facebook.com/100008343750912/picture?width=200&height=200" color="gray" />
  </span>
    )}
    <br/>
    {item.gameMode=='Tournament3' ? (
      <span>
    <small className="text-muted">Start Time</small>
    {item.totalPlayer == "4" ? (
      <>
              <br/>
              <small className="text-muted">Final Match</small>
              </>
              ):(
                <>
                <br/>
                <small className="text-muted">SemiFinal Match</small>
                <br/>
                <small className="text-muted">Final Match</small>
                </>
              )}
                     </span>
                      ):(
                        <small className="text-muted">Avalable until</small>
                      )}
    <br/><small className="text-muted">Status</small>
    
  </Col>
  <Col className="text-muted text-right" xs="5">
  <small className="text-muted"><FontAwesomeIcon fixedWidth icon={getIcon(item.gameConsole)}  /> {item.gameConsole}<br/></small>
 
  {getGroupBadge(item.inSign,item.amount,'small right')}
                                     
  {getGroupBadge(item.outSign,item.prize,'small right')}
  
  <small className="text-muted">{item.players.length}/{item.totalPlayer}<br/></small>
  {item.gameMode=='Tournament3' ? (
      <span>
   
  <small className="text-muted"> <Countdown renderer={renderer} date={dateExpired} /></small>
    {item.totalPlayer == "4" ? (
      <>
              <br/>
              <small className="text-muted">
                <Countdown renderer={renderer} date={addTime(dateExpired,1)} />
                </small>
              </>
              ):(
                
                 <>
               <br/>
              <small className="text-muted">
                <Countdown renderer={renderer} date={addTime(dateExpired,1)} />
                </small>
                <br/>
              <small className="text-muted">
                <Countdown renderer={renderer} date={addTime(dateExpired,2)}/>
                </small>
                
                </>
              )}
                     </span>
                      ):(
                        <small className="text-muted"> {dateExpired? (
                          <div ><Countdown renderer={renderer} date={addTime(dateExpired,0)} /></div>
                          ):(
                            <div> No  limit</div>
                          )}</small>
                      )}
  
  <small className="text-muted">{item.status}</small>
  
    </Col>
  </Row>
   
              
            </Card.Body>
            
          </Card>
          </Link>
          )
        }
        export const  printProductBlock = (item) => {
          var _mode=' 1 v 1 '
          var _color = '#404040'
         
          return (
            <Link  to={'/panel/lobby?id='+item.id}>
            <Card className="card-user chall" >
            <Card.Header className="no-padding">
              <div className="card-image">
              <img
                            alt={item.name}
                           
                            src={item.image}
                          ></img>
              </div>
             
            </Card.Header>
            <Card.Body>
            <Card.Title as="h5" style={{fontSize:15}} >{item.name}</Card.Title>
    <Row>
  
  <Col className="text-muted text-right">
 
  {getGroupBadge('point',item.cost,'small right')}
      
    </Col>
  </Row>
   
              
            </Card.Body>
            
          </Card>
          </Link>
          )
        }
        export const  printGameBlock = (item) => {
          return(
           <>
            <img
              className="d-block w-100"
              src={"/assets/images/games/"+item.name+".jpg"}
              alt={item.name}
            />
            <Carousel.Caption>
              <h3>{item.name}</h3>
              <p>Play {item.name} for Real Money.</p>
              <Button to={"/game/"+item.name} as={Link} variant="danger" className="btn-fill">Play {item.name} for Cash now!</Button>
              <p>Avalable for: {item.gameconsole.map((consolename, z) => (
    <small className="text-muted" key={z}><FontAwesomeIcon fixedWidth icon={getIcon(consolename.consolename)}  /> {(consolename.consolename)} </small>
  ))}</p>
              
            </Carousel.Caption>
          </>
         
          
          )
        }
        export const  printGameBlockMobile = (item) => {
          return(
           <>
            <img
              className="d-block w-100"
              src={"/assets/images/games/"+item.name+".jpg"}
              alt={item.name}
            />
            <Carousel.Caption>
              <h3>{item.name}</h3>
              <p>Play {item.name} for Real Money.</p>
              <Button to={"/game/"+item.name} as={Link} variant="danger" className="btn-fill btn-sm">Play {item.name} now!</Button>
              <p>{item.gameconsole.map((consolename, z) => (
    <small  key={z}><FontAwesomeIcon fixedWidth icon={getIcon(consolename.consolename)}  /> {(consolename.consolename)} </small>
  ))}</p>
              
            </Carousel.Caption>
          </>
         
          
          )
        }