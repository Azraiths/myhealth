import React, { Component } from 'react';

import {
  Group, Card, CardGrid, Cell, Placeholder, Text,
} from '@vkontakte/vkui';

import PropTypes from 'prop-types';
import { ReactComponent as Pill } from '../img/aptechka_28.svg';
import EmptyStateAidKit from '../components/EmptyStateAidKit';

Array.prototype.isEmpty = function () {
  return this.length === 0;
};
class RecipePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [
        {
          time: '10:00',
          type: 'Таблетки',
          dose: '1.5 половинки',
          medical: 'Супрастин',
        },
        {
          time: '12:00',
          type: 'Укол',
          dose: '5мг',
          medical: 'Дексаметазон',
        },
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
                  <Cell before={<Text style={styles.font}>{v.time}</Text>} description={`${v.type} - ${v.dose}`}>{v.medical}</Cell>
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
