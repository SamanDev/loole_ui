import React, { Component } from "react";
import { Transition } from "semantic-ui-react";
var myInterval;
export default class TransitionExampleTransitionExplorer extends Component {
  constructor(props) {
    super(props);
    this.myStopFunction = this.myStopFunction.bind(this);
    this.myTimer = this.myTimer.bind(this);
    this.state = {
      animation: this.props.animation,
      duration: this.props.duration,
      objanim: this.props.objanim,
      visible: true,
    };
  }
  toggleVisibility = () => {
    this.setState((prevState) => ({ visible: !prevState.visible }));
  };
  componentDidMount() {
    this.myStopFunction();
    myInterval = setInterval(this.myTimer, this.props.duration + 3000);
  }
  componentWillUnmount() {
    this.myStopFunction();
  }
  myStopFunction = () => {
    clearInterval(myInterval);
  };
  myTimer = () => {
    this.toggleVisibility();
  };
  render() {
    const { animation, duration, visible, objanim } = this.state;

    return (
      <>
        <Transition animation={animation} duration={duration} visible={visible}>
          <div>{objanim}</div>
        </Transition>
      </>
    );
  }
}
