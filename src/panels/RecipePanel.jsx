import React, { Component } from 'react';

import {
  Group, Card, CardGrid, Cell, Text,
} from '@vkontakte/vkui';

import PropTypes from 'prop-types';
import { ReactComponent as Pill } from '../img/aptechka_28.svg';
import EmptyStateAidKit from '../components/EmptyStateAidKit';
import getTrackUntilMidnight from '../models/getTrackUntilMidnight';
import getAidKitTracking from '../models/getAidKitTracking';

Array.prototype.isEmpty = function () {
  return this.length === 0;
};
class RecipePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [
      ],
    };
  }

  getTimeRemaining(time) {
    const today = new Date();
    const hours = time.substring(0, 2);
    if (today.getHours() < hours) {
      return today.getHours() - hours;
    }
    return false;
  }

  async componentDidMount() {
    const { user } = this.props;

    const res = await getTrackUntilMidnight(404);

    this.setState({ medicines: res });
  }

  render() {
    const { medicines } = this.state;
    const { goToInfo } = this.props;
    const styles = {
      font: { fontWeight: 'bold', color: 'black', paddingRight: '10px' },
    };
    return (
      <Group>
        <CardGrid>
          {
              medicines.map((v) => (
                <Card key={v.medical} onClick={() => goToInfo(v)} size="l" mode="shadow">
                  <Cell before={<Text style={styles.font}>{v.time}</Text>} description={`${v.medtype} - ${v.dose}`}>{v.medical}</Cell>
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

RecipePanel.propTypes = {
  goToInfo: PropTypes.func.isRequired,

};

export default RecipePanel;
