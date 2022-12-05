/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
// import { NormalButton } from 'component-ui-bioflux';
import { NormalButton, PriorityBadge } from 'component-ui-bioflux';

class Page1 extends Component {
  state = {
    messages: [
      {
        text: 'user2 has joined the conversation',
        timestamp: 1578366389250,
        type: 'notification',
      },
      {
        author: {
          username: 'user1',
          id: 1,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
        },
        text: 'Hi',
        type: 'text',
        timestamp: 1578366393250,
      },
      {
        author: { username: 'user2', id: 2, avatarUrl: null },
        text: 'Show two buttons',
        type: 'text',
        timestamp: 1578366425250,
        buttons: [
          {
            type: 'URL',
            title: 'Yahoo',
            payload: 'http://www.yahoo.com',
          },
          {
            type: 'URL',
            title: 'Example',
            payload: 'http://www.example.com',
          },
        ],
      },
      {
        author: {
          username: 'user1',
          id: 1,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
        },
        text: "What's up?",
        type: 'text',
        timestamp: 1578366425250,
        hasError: true,
      },
    ],
  };

  handleOnSendMessage = (message) => {
    this.setState({
      messages: this.state.messages.concat({
        author: {
          username: 'user1',
          id: 1,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
        },
        text: message,
        timestamp: +new Date(),
        type: 'text',
      }),
    });
  };

  render() {
    // console.log('ChatBox', NormalButton);
    // console.log('NormalButton', Button);
    return (
      <div>
        Hello Biocare Cardiac
        <NormalButton buttonName="hello button" />
        <PriorityBadge isEmergent />
      </div>
    );
  }
}

export default Page1;
