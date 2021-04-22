import React, { useState } from "react";
import { printMatchBlock,printGameBlockMobile } from "components/include";

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
  
  const getBlockGames = () => {
      
    if (Games != []) {
      return Games.games.map((item, i) => {
       
          
        
          
          return (
           
            <Carousel.Item key={i}>
            {printGameBlockMobile(item)}

            </Carousel.Item>
          )
          
      }
      )
    }

  }
  return (
    <>
     <div className="container" style={{padding:0,height:350}}>
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