import React, { Component } from 'react';
import {
  Group, Card, CardGrid, Cell,
} from '@vkontakte/vkui';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';

class AidKitPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [
        {
          name: 'Таблеточка',
          type: 'pills',
          description: 'Каждые 3 часа - 08:00, 11:00, 14:00, 17:00 и 20:00',
        },
        {
          name: 'Таблеточка 2',
          type: 'pills',
          description: 'Каждые 3 часа - 08:00, 11:00, 14:00, 17:00 и 20:00',
        },
        {
          name: 'Таблеточка 3',
          type: 'pills',
          description: 'Каждые 3 часа - 08:00, 11:00, 14:00, 17:00 и 20:00',
        },
      ],
    };
  }

  render() {
    const { medicines } = this.state;
    return (
      <Group>
        <CardGrid>
          {
            medicines.map((v) => (
              <Card key={v.name} onClick={() => this.props.goToInfo(v)} size="l" mode="shadow">
                <Cell before={<Icon28MoneyCircleOutline />} description={v.description}>{v.name}</Cell>
              </Card>
            ))
          }
        </CardGrid>
      </Group>
    );
  }
}

export default AidKitPanel;
