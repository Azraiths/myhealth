import React, { Component } from 'react';
import {
  Group, Card, CardGrid, Cell,
} from '@vkontakte/vkui';

import PropTypes from 'prop-types';
import { ReactComponent as Pill } from '../img/aptechka_28.svg';
import EmptyStateAidKit from '../components/EmptyStateAidKit';
import getDoctorReceipts from '../models/getDoctorReceipts';

class ReceiptsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipts: [],
    };
  }

  async componentDidMount() {
    const { user } = this.props;
    const res = await getDoctorReceipts(user);
    const parsed = res.map((v) => {
      const times = JSON.parse(v.times);
      return {
        ...v, times,
      };
    });
    this.setState({ receipts: parsed });
  }

  render() {
    const { receipts } = this.state;
    const { goToReceipt } = this.props;

    return (
      <Group>
        <CardGrid>
          {
                        receipts.map((v) => (
                          <Card key={v.medical} onClick={() => goToReceipt(v)} size="l" mode="shadow">
                            <Cell before={<Pill />} description={`Назначил: ${v.doctor_name}`}>{v.medical}</Cell>
                          </Card>
                        ))
                    }
        </CardGrid>
        {
                    receipts.isEmpty()
                    && (
                    <EmptyStateAidKit
                      header="Назначений пока нет"
                      message="Когда врач сделает назначение, оно появится здесь"
                    />
                    )
                }

      </Group>
    );
  }
}

ReceiptsPanel.propTypes = {
  goToReceipt: PropTypes.func.isRequired,
  user: PropTypes.number.isRequired,
};

export default ReceiptsPanel;
