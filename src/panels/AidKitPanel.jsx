import React, { Component } from 'react';

import {
  Group, Card, CardGrid, Cell, Placeholder,
} from '@vkontakte/vkui';

import PropTypes from 'prop-types';
import { ReactComponent as Pill } from '../img/aptechka_28.svg';
import EmptyStateAidKit from '../components/EmptyStateAidKit';
import getAidKitTracking from '../models/getAidKitTracking';

Array.prototype.isEmpty = function () {
  return this.length === 0;
};

class AidKitPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [],
    };
  }

  async componentDidMount() {
    const { user } = this.props;
    console.log(user);
    const res = await getAidKitTracking(user);
    // const times = JSON.parse(res.times);
    const parsed = res.map((v) => {
      const times = JSON.parse(v.times);
      return {
        ...v, times,
      };
    });
    this.setState({ medicines: parsed });
  }

  render() {
    const { medicines } = this.state;
    const { goToInfo } = this.props;

    return (
      <Group>
        <CardGrid>
          {
            medicines.map((v) => (
              <Card key={v.medical} onClick={() => goToInfo(v)} size="l" mode="shadow">
                <Cell before={<Pill />} description={`Назначение сделал: ${v.doctor}`}>{v.medical}</Cell>
              </Card>
            ))
          }
        </CardGrid>
        { medicines.isEmpty()
          && (
          <EmptyStateAidKit />
          )}

      </Group>
    );
  }
}

AidKitPanel.propTypes = {
  goToInfo: PropTypes.func.isRequired,
  user: PropTypes.number.isRequired,
};

export default AidKitPanel;
