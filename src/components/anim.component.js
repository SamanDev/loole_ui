import React, { Component } from "react";
import { Transition } from "semantic-ui-react";
var timer;
export default class TransitionExampleTransitionExplorer extends Component {
  constructor(props) {
    super(props);

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
    timer = setInterval(() => {
      this.toggleVisibility();
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(timer);
  }
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
