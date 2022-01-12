import React from 'react';
import SockJsClient from 'react-stomp';
import { Client, Message } from '@stomp/stompjs';
import { USERSOCKETURL, USERSOCKETPUBLICURL } from "const";
function connectStompClient() {
    const isLoggedIn = getLoggedIn();
    if (isLoggedIn) {
      const stompClient = new Client({
        brokerURL: wsDomainUrl + '/stompEndpoint',
        connectHeaders: { Authorization: authHeader() },
        debug: console.log,
        reconnectDelay: 2500,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000
      });
  
      // Creates new websockets if necessary
      let websocketsAreNotAvailableInTheBrowser = typeof WebSocket !== 'function';
  
      if (websocketsAreNotAvailableInTheBrowser) {
        stompClient.webSocketFactory = () => new SockJS(httpDomainUrl + '/stompEndpoint');
      }
  
      // Subscribes to websockets endpoints
      stompClient.onConnect = (frame) => {
        const chats: IChats = store.getState().chats.chats;
  
        // Gets all subscriptions form redux store and calls unsubscribe() on them
        unsubscribeAllWebsocketSubscriptions();
       
        // Clears the old subscriptions from redux store
        store.dispatch<any>(subscriptionActions.clearWebsocketSubscriptions());
  
        // Creates new subscriptions and sends them to Redux store
        subscribeToChats(stompClient, chats); 
  
        // Creates new subscriptions and sends them to Redux store
        subscribeToInvites(stompClient);
      };
  
      // Handles errors
      stompClient.onStompError = (frame: IFrame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      };
  
      stompClient.activate();
  
      // Puts stomp client in the Redux store
      store.dispatch<any>(subscriptionActions.addClient(stompClient));
      return stompClient;
    }
  }
  
  export function unsubscribeAllWebsocketSubscriptions() {
    const subscriptions = store.getState().subscriptions.websocketSubscriptions;
    subscriptions.map((sub) => sub.unsubscribe());
  }
  
const socket = SockJS(USERSOCKETURL);
const ws = Stomp.over(socket);
class UserWebsocket extends React.Component {
state = {
  ws,
  timeStamp: Date.now(),
  maxReconnect:1
};
componentDidMount() {
 this.setupWebSocket();
  }
  setupWebSocket = () => {
 const webSoc = this.state.ws;
 webSoc.connect({}, this.connect);
 webSoc.message = (body) => this.setState({ timeStamp: Date.now()});
   webSoc.error = (err) => {
    if (this.state.maxReconnect > 0) {
      this.setState({ maxReconnect: this.state.maxReconnect - 1 }, this.connect);
      }
    };
  }
 
  connect = () => {
 const channels = webSocketUrls[this.props.name];
 this.setState({ maxReconnect: this.props.maxReconnect });
 channels.forEach((channel) => {
   const webSoc=this.state.ws;
   webSoc.subscribe(channel.route, channel.callback);
   webSoc.send(registration.route, { timeStamp:           this.state.timeStamp.toString() }, 'timeStamp');
    });
  }
render() {
    return <span />;
  }
}
WebSocket.defaultProps = {
  name: 'something',
  maxReconnect: 5,
};
export default new UserWebsocket();