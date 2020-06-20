import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import './panels/main.css';
// eslint-disable-next-line import/extensions
import MainPanel from './panels/MainPanel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });

    const user = await bridge.send('VKWebAppGetUserInfo');

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    console.log(user);
    return (
      <MainPanel user={user} />
    );
  }
}

export default App;
