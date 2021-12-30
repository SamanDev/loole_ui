import React from "react";
import { Image,Card } from 'semantic-ui-react'
import { NavLink, Link } from "react-router-dom";
// react-bootstrap components
import Games from "server/Games";
export default function GameSlide() {
  
  return (
    <>
     <div className="container" style={{marginTop:60}}>
    <h4 className="header-text text-center" style={{color: '#fff'}}>GAMES YOU CAN PLAY</h4>
    <Image.Group size='medium'>
                   
                    {Games.games.map((item, i) => {
         return (
            
          <Image bordered
          key={i.toString()}
      src={"/assets/images/games/" + item.name + ".jpg"}
      alt={item.name}
      as={Link}
      size='medium'
      to={"/game/" + item.name}
    
    />)
        }
        )
      }
  
    
               
                    </Image.Group>
                    </div>
                    </>
  );
}