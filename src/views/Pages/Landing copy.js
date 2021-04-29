import React, { Component } from "react";
import $ from "jquery";
import Countdown from "react-countdown";
import userService from "services/user.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import eventBus from "views/eventBus";
import { printMatchBlock,printGameBlock } from "components/include";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Media,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Spinner,
  Carousel
} from "react-bootstrap";
import Games from "server/Games";
export default class Landing extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      events: userService.getCurrentEvent()
    };

  }

  componentDidMount() {
  
      
    eventBus.on("eventsData", (event) => {
     // alert("socket events: "+event);
    
      this.setState({ events: event, isLoading: false });
      console.log("change state: " + this.state.isLoading);
      
    });

  }
  
  render() {
    if (!this.state.events.length){
      userService.getEvents();
      
      return  <div className="parallax filter-gradient gray section-gray" data-color="red">
      <div className="parallax-background">
          <img className="parallax-background-image" src="assets/img/showcases/showcase-1/bg.jpg"/>
      </div>
      <div className= "container">
      <h4 style={{textAlign: "center",marginTop:300,color:'#fff'}}>Loading 
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" /></h4>
      </div>
  </div>;
    }
    let { events, isLoading } = this.state;
    events=JSON.parse(events);
    const getBlockGames = () => {
      
      if (Games != []) {
        return Games.games.map((item, i) => {
         
            
          
            
            return (
             
              <Carousel.Item key={i}>
              {printGameBlock(item)}
  
              </Carousel.Item>
            )
            
        }
        )
      }
  
    }
    const getBlockChallenge = (filtermode,f,t) => {
      
      if (events != []) {
        return events.map((item, i) => {
          if ((item.gameConsole == filtermode || item.gameMode == filtermode || filtermode == 'all') || (item.gameConsole != 'Mobile' && filtermode == 'NoMobile')) {
            item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)
            {item.players.map((player, j) => {
             //if(player.username == currentUser.username && (item.status=='Pending' || item.status=='Ready' || item.status=='InPlay' )){this.props.history.push("/panel/lobby?id="+item.id);}
            })}
            var timestamp = item.expire
            var date = new Date(timestamp);
            //date.setMinutes(date.getMinutes() + item.timeMinute);
            var now = new Date();
            var dateExpired = date.toISOString();
            
             
            var dateNow = now.toISOString();
            
            if(i>=f  &&  i<t){
            
            return (
  
              <Col md="3" xl="4" key={i}>
                {printMatchBlock(item)}
  
              </Col>
            )
            }
          } else {
            return null;
          }
        }
        )
      }
  
    }
	const renderer = ({ days,hours, minutes, seconds, completed }) => {
		if (completed) {
		  // Render a complete state
		  return <Completionist />;
		} else {
		  // Render a countdown
		  return (
			<span>
			  {days} <small>days</small> {hours}:{minutes}:{seconds}
			</span>
		  );
		}
	  };
    const elements = ['1', '2-4_01', '2-4_02','2-4_03'];
    return (
      
    <>
    
    <div className="wrapper">
            <div className="parallax filter-gradient gray section-gray" data-color="red">
                <div className="parallax-background">
                    <img className="parallax-background-image" src="assets/img/showcases/showcase-1/bg.jpg"/>
                </div>
                <div className= "container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="description">
                                <h2>With Loole App you can make money from your games skils</h2>
                                <br/>
                                <p>Now gaming is not just about spending time, it is about making money and having fun.</p>
                                <p>Any gamer or player who wants to make money from his skill must install the Loole app on his phone because you can make money with the Loole. He only plays with players around the world who claim to be like you.</p>
                                <h5><br/><br/></h5>
                            </div>
                            <div className="buttons">
                                <button className="btn btn-fill btn-neutral">
                                <i className="fa fa-apple"></i> Appstore
                                </button>
                                <button className="btn btn-simple btn-neutral">
                                <i className="fa fa-android"></i>
                                </button>
                                <button className="btn btn-simple btn-neutral">
                                <i className="fa fa-windows"></i>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-5  hidden-xs">
                            <div className="parallax-image">
                                <img className="phone" src="assets/img/showcases/showcase-1/iphone.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section section-gray section-clients section-no-padding">
                <div className="container text-center">
                    <h4 className="header-text">They were the first to go PlayIT</h4>
                    <p>
                    How're you? The Loole introduces the players to each other and puts my pair of money in a safe place. After the game, the winner sends a video according to the Loole guide to prove his victory and takes his money.<br/>Also, there is no operator for deposit and withdrawal and everything is instant and automatic.
                    </p>
                   
<div className="row card-stats">
<div className="col-lg-3 col-md-6 col-xs-12 ">
<div className="counter-box bg-color-1 card">
<div className="fact-count">
<h3>5,285</h3>
<p>Happy Users</p>
</div>
<div className="icon-o"><i className="lni-users"></i></div>
</div>
</div>
<div className="col-lg-3 col-md-6 col-xs-12">
<div className="counter-box bg-color-2 card">
<div className="fact-count">
<h3>1,352</h3>
<p>Total Matches</p>
</div>
<div className="icon-o"><i className="lni-thumbs-up"></i></div>
</div>
</div>
<div className="col-lg-3 col-md-6 col-xs-12">
<div className="counter-box bg-color-3 card">
<div className="fact-count">
<h3>$10,016.69</h3>
<p>Loole Bank</p>
</div>
<div className="icon-o"><i className="lni-eye"></i></div>
</div>
</div>
<div className="col-lg-3 col-md-6 col-xs-12">
<div className="counter-box bg-color-4 card">
<div className="fact-count">
<h3>$83.08</h3>
<p>Total Commissions</p>
</div>
<div className="icon-o"><i className="lni-emoji-smile"></i></div>
</div>
</div>

                    </div>
                  
                </div>
            </div>
            <div className="section " style={{padding: 0}}>
                <div className="parallax filter-gradient orange" data-color="orange" style={{height:'800px'}}>
                    <div className="parallax-background">
                        <img className="parallax-background-image" src="assets/img/bg.jpg"/>
                    </div>
                    <div className="container" style={{marginTop:100}}>
                    <h4 className="header-text text-center" style={{color: '#fff'}}>GAMES YOU CAN PLAY</h4>
                    <Carousel>
                    {getBlockGames()}
                    </Carousel>
                    </div>
                </div>
            </div>
            <div className="section section-presentation section-gray  section-no-padding"  style={{padding: 0,margin:0,overflow:'visible'}}>
                <div className="container">
                
                    <div className="row">
                        <div className="col-md-6">
                            <div className="description">
                                
                                <h4 className="header-text">Online Deposit</h4><p>The account is charged online using the Perfect Money voucher or Cryptocurrency.</p>
                                <h4 className="header-text">Online Cash back</h4><p>You get dollars online using Perfect Money vouchers or Cryptocurrency. There is no middle operator, everything is automatic</p>
                                <h4 className="header-text">24/7 Support</h4><p>Whatever problem you have, our supporters are by your side until it is resolved.</p>
                            </div>
                        </div>
                        <div className="col-md-6 hidden-xs">
                        <img src="assets/img/showcases/showcase-1/iphones.png" style={{top:-50,zIndex:2}}/>
                        </div>
                    </div>
                </div>
           
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                        <img src="assets/img/showcases/showcase-1/iphones.png" style={{top:0,zIndex:2}}/>
                        </div>
                        <div className="col-md-6">
                        <div className="description">
                        <h4 className="header-text">Loole proudly</h4><p>Receives ten percent of the total prizes as a profit for his unique services.</p>
                        <h4 className="header-text">Do not miss the commission</h4><p>In appreciation of the referral users, Loole pays a commission of ten percent of its profit.</p>
                        <h4 className="header-text">Also gives a gift</h4><p>Receive a $5 gift charge by registering and installing the app.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section section-no-padding" style={{padding: 0}}>
                <div className="parallax filter-gradient blue" data-color="orange" style={{height:'800px'}}>
                    <div className="parallax-background">
                        <img className="parallax-background-image" src="assets/img/bg.jpg"/>
                    </div>
                    <div className="info">
                    
                    <h4 className="header-text text-center" style={{color: '#fff'}}>How it works</h4>
                    <p>Gaming Frog is a platform where you can challenge other gamers for real money on the line. Once you find a match you’ll play on your console (PS4/Xbox One), report results and we’ll deposit the money to the winner. There are other ways to win through multiplayer tourneys and monthly leader-board challenges.</p>
                    <div className="row">
                    {elements.map((value, index) => {
        return <div className="col-md-3" key={index}><img src={"https://www.gamingfrog.com/wp-content/uploads/2020/08/How-it-works-"+value+".jpg"} style={{width: '100%'}}/></div>
      })}
                    </div>
                    </div>
                </div>
            </div>
            
           
            <div className="section section-gray section-no-padding">
                <div className="container">
                    <h4 className="header-text text-center">Is it Real Cash?</h4>
                    <p className="header-text text-center">Absolutly YES! Cash on the table.</p>
                    <Carousel>
                    <Carousel.Item interval={5000}><Row >
                        {getBlockChallenge('all',0,3)}
                      </Row></Carousel.Item>
                      <Carousel.Item interval={5000}><Row >
                        {getBlockChallenge('all',3,6)}
                      </Row></Carousel.Item>
  </Carousel>
                    
                 
                </div>
            </div>
            <div className="section section-no-padding">
                <div className="parallax filter-gradient gray" data-color="orange">
                    <div className="parallax-background">
                        <img className="parallax-background-image flipped" src="assets/img/bg.jpg"/>
                    </div>
                    <div className="info">
                    
                        <h1>Download this landing page for free!</h1>
                        <p>Beautiful multipurpose bootstrap landing page.</p>
                        <a href="http://www.creative-tim.com/product/awesome-landing-page" className="btn btn-neutral btn-lg btn-fill">DOWNLOAD</a>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <div className="container">
                    <nav className="pull-left">
                        <ul>
                            <li>
                                <a href="#">
                                Home
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                Company
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                Blog
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="social-area pull-right">
                        <a className="btn btn-social btn-facebook btn-simple">
                        <i className="fa fa-facebook-square"></i>
                        </a>
                        <a className="btn btn-social btn-twitter btn-simple">
                        <i className="fa fa-twitter"></i>
                        </a>
                        <a className="btn btn-social btn-pinterest btn-simple">
                        <i className="fa fa-pinterest"></i>
                        </a>
                    </div>
                    <div className="copyright">
                        &copy; 2016 <a href="http://www.creative-tim.com">Creative Tim</a>, made with love
                    </div>
                </div>
            </footer>
        </div>
      </>
    );
  }
}