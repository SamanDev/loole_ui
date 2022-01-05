import React, { Component } from 'react'
import { Button,Form, Grid, Image, Transition,Segment } from 'semantic-ui-react'

const transitions = [
  'jiggle',
  'flash',
  'shake',
  'pulse',
  'tada',
  'bounce',
  'glow',
]

const options = transitions.map((name) => ({
  key: name,
  text: name,
  value: name,
}))
var timer;
export default class TransitionExampleTransitionExplorer extends Component {
  constructor(props) {
    super(props);
    //this.toggleVisibility = this.toggleVisibility.bind(this);
   
    this.state = { animation: this.props.animation, duration: this.props.duration, objanim: this.props.objanim, visible: true }
  }
  componentDidMount() {
    this.setState({ objanim: this.props.objanim });
     timer = setInterval(() => {
      clearTimeout(timer)
      this.toggleVisibility()
     
    },5000)
    
}

  toggleVisibility = () => {
    
    this.setState((prevState) => ({ visible: !prevState.visible }))
    //console.log('hi')
    
    //timer2 = setTimeout(() =>{this.setNew();console.log('hi');},2000)
   // setTimeout(() => {this.setNew()},2000)
  }
    

  render() {
    const { animation, duration, visible,objanim } = this.state
    
    return (
      <>
     
        <Transition
            animation={animation}
            duration={duration}
            visible={visible}
           
           
          >
           <div>{objanim}</div>
          </Transition>
 
      </>
    )
  }
}