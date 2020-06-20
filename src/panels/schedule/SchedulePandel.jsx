import React, { Component } from 'react';

import {
  Group, Card, CardGrid, Cell, Text, Link,
} from '@vkontakte/vkui';

import PropTypes from 'prop-types';
import { ReactComponent as Pill } from '../../img/aptechka_28.svg';
import EmptyStateAidKit from '../../components/EmptyStateAidKit';
import getTrackUntilMidnight from '../../api/getTrackUntilMidnight';
import getTrackingFullDay from '../../api/getTrackingFullDay';

Array.prototype.isEmpty = function () {
  return this.length === 0;
};
class SchedulePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [
      ],
      isLinkVisible: true,
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

  async getAllTracking() {
    const { user } = this.props;
    const res = await getTrackingFullDay(user);
    this.setState({ medicines: res, isLinkVisible: false });
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
      link: {
        color: '#6DC9AD',
        marginTop: '10px',
      },
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
          {
            this.state.isLinkVisible
              ? (
                <Link onClick={() => this.getAllTracking()} style={styles.link}>Посмотреть всю историю приёма</Link>
              ) : ''
          }
        </CardGrid>
        { medicines.isEmpty()
          && (
          <EmptyStateAidKit
            header="Лекарства не назначены."
            message="Похоже, у вас нет назначенных лекарств на ближайшее время. Чтобы добавить лекарство, перейдите в аптечку."
          />
          )}

      </Group>
    );
  }
}

SchedulePanel.propTypes = {
  goToInfo: PropTypes.func.isRequired,

};

export default SchedulePanel;
