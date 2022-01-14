import React, { Component } from "react";
import { Transition } from "semantic-ui-react";

const transitions = [
  "jiggle",
  "flash",
  "shake",
  "pulse",
  "tada",
  "bounce",
  "glow",
];

const options = transitions.map((name) => ({
  key: name,
  text: name,
  value: name,
}));
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

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.

    if (props.objanim !== state.objanim) {
      return {
        objanim: props.objanim,
        animation: props.animation,
        duration: props.duration,
      };
    }
    return null;
  }

  render() {
    const { animation, duration, visible, objanim } = this.state;

    return (
      <>
        <Transition
          animation={animation}
          duration={duration}
          visible={visible}
          directional={true}
          unmountOnShow={true}
          transitionOnMount={true}
          unmountOnHide={true}
          onShow={this.toggleVisibility}
          onHide={this.toggleVisibility}
        >
          <div>{objanim}</div>
        </Transition>
      </>
    );
  }
}
