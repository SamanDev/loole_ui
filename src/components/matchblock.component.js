import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Avatar from "react-avatar";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

import {setAvatar,getColorStatus,getIcon,getGroupBadgeBlock,rendererBig,printStatus,getMatchTitle,findMatch}  from "components/include.js";
import {
  Icon,
  Label,
  Card,Statistic,Divider,
  Image} from "semantic-ui-react";
// react-bootstrap components
import { useHistory } from "react-router";

var moment = require("moment");
 function MatchBlock(prop) {
  const history = useHistory();
    var _mode = " 1 vs 1 ";
    var _color = "#404040";
    var item = prop.item;
    var lists = item.matchTables;
   

    lists.sort((a, b) => (a.level > b.level ? 1 : -1));
  
   var matchLevelFind = findMatch(item);
     
    if (item.gameMode == "Tournament" || item.gameMode == "League"  ) {
      _mode = item.gameMode;
    }
    var _finishTxt = 'Not Joinable';
 
  if (item?.status=='Canceled' || item?.status=='Expired' || item?.status=='Finished') { _finishTxt = 'Not Avalable'}
  item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)
  var timestring1 = item.expire;
  var timestring2 = new Date();
  var startdate = moment(timestring1).format();
  var expected_enddate = moment(timestring2).format();

    return (
    
        
     
        <Card  color={getColorStatus(item.status)}  as={Link} to={"/lobby?id=" + item.id} >
         <Label  size="mini" color={getColorStatus(item.status)} ribbon style={{zIndex:2,maxWidth:170,position:'absolute',top:15,left:-10}}>
         {item.status == 'Pending' &&  ( <Icon loading name='spinner' />)}
         {item.status == 'Finished' &&  ( <Icon  name='check' color="green" />)}
         {(item.status=='Canceled' || item.status=='Expired') &&  ( <Icon  name='times'  />)}
         {item.status}
          </Label>
        <Image
                alt={item.gameName}
                src={"/assets/images/games/" + item.gameName + ".jpg"}
                fluid
          style={{background:'gray !important'}}
                wrapped ui={false}/>
                <div
              className={"text-center cover "+item.status}
               >
              <div style={{ transform: "scale(.8)",padding: '10px 0',height:185}}>
                {printStatus(item,_mode,_color, item.status+'@@@'+_finishTxt,item.status,'no')}
              {item.status=='InPlay'&& item.gameMode == "Tournament" &&  
       (
      <><Divider inverted fitted></Divider>     <Statistic inverted color="violet" size="mini">
  <Statistic.Label>Match Level</Statistic.Label>
  <Statistic.Value>
    {getMatchTitle(matchLevelFind.level, item.totalPlayer)}
  </Statistic.Value>
</Statistic></>)}
                {item.gameMode == 'League' ?  ( 


              <Countdown renderer={rendererBig} txt="@@@Avalable until" colorfinish={getColorStatus(item.status)} finish={item.status+'@@@Not Avalable'} match={item}  date={item.expire} mode={_mode} color={_color} />
                ):( 
                <> <Countdown renderer={rendererBig} txt="@@@Avalable until" colorfinish={getColorStatus(item.status)} finish={item.status+'@@@Not Avalable'} match={item}  date={item.expire} mode={_mode} color={_color} />
                </>
                )}
              
        </div>
        {item.players[0] ? (
                  <>
                  
                    {item.players.map((user, z) => (
                      <span key={z}>
                        {z < 5 ? (
                          <>
                            {z < 4 ? (
                              <Avatar
                                size="25"
                                title={user.username}
                                round={true}
                                name={setAvatar(user.username)}
                              />
                            ) : (
                              <Avatar
                                size="25"
                                round={true}
                                value={"+" + (item.players.length - 4)}
                                color="gray"
                              />
                            )}
                          </>
                        ) : null}
                      </span>
                    ))}
                  </>
                ) : (
                  <span>
                    <Avatar
                      size="25"
                      round={true}
                      name="?"
                      src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
                      color="lightgray"
                    />
                    <Avatar
                      size="25"
                      round={true}
                      name="?"
                      src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
                      color="gray"
                    />
                  </span>
                )}
            </div>
            <div className="content extra">
              
            <Card.Header >
                  {item.gameName}<Label style={{ float: "right"}} size="small" basic>
                  <FontAwesomeIcon fixedWidth icon={getIcon(item.gameConsole)} />{" "}
                  {item.gameConsole}
                
                </Label>
                </Card.Header>
               
          <Card.Description>
          
        <div className="content left floated " style={{minHeight:10,padding:2}}>{getGroupBadgeBlock(item.outSign, item.prize, "Prize","left","green")}</div>
        <div className="content right floated " style={{minHeight:10,padding:2}}>
        {getGroupBadgeBlock(item.inSign, item.amount, "Fee","right","blue")}
        </div>
    </Card.Description>
    </div>
    
        </Card>
    
    
    );
  };
  export default MatchBlock;