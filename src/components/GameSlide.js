import React, { useState } from "react";
import { printMatchBlock,printGameBlock,printGameBlockMobile } from "components/include";

import $ from "jquery";
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
export default function GameSlide() {
  var responsive = $(window).width();
    
  const getBlockGames = () => {
      
    if (Games != []) {
      return Games.games.map((item, i) => {
       
          
        if (responsive >= 768) {
          
          return (
           
            <Carousel.Item key={i}>
            {printGameBlock(item)}

            </Carousel.Item>
          )
        } else{
          return (
           
            <Carousel.Item key={i}>
            {printGameBlockMobile(item)}

            </Carousel.Item>
          )
        }
      }
      )
    }

  }
  return (
    <>
     <div className="container" style={{marginTop:60}}>
    <h4 className="header-text text-center" style={{color: '#fff'}}>GAMES YOU CAN PLAY</h4>
                    <div className="info " style={{maxWidth:700,margin:'auto'}}>
                   
                    <Carousel>
                    {getBlockGames()}
                    </Carousel>
                    </div>
                    </div>
                    </>
  );
}