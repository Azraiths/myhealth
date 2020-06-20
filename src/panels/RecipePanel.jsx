import React, { Component } from 'react';

import {
  Group, Card, CardGrid, Cell, Text,
} from '@vkontakte/vkui';

import EmptyStateAidKit from '../components/EmptyStateAidKit';
import getTrackUntilMidnight from '../models/getTrackUntilMidnight';
import getTrackingFullDay from '../models/getTrackingFullDay';

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

    const res = await getTrackUntilMidnight(user);

    this.setState({ medicines: res });
  }

  render() {
    const { medicines } = this.state;
    const styles = {
      font: { fontWeight: 'bold', color: 'black', paddingRight: '10px' },
    };
    return (
      <Group>
        <CardGrid>
          {
              medicines.map((v) => (
                <Card key={v.medical} size="l" mode="shadow">
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

export default RecipePanel;
