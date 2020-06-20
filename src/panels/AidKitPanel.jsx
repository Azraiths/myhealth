import React, { Component } from 'react';

import {
  Group, Card, CardGrid, Cell, Footer, Placeholder,
} from '@vkontakte/vkui';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';
import Div from '@vkontakte/vkui/dist/components/Div/Div';

Array.prototype.isEmpty = function () {
  return this.length == 0;
};

class AidKitPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [

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
        { medicines.isEmpty()

          && (
          <Placeholder
            header="В вашей аптечке пусто."
          >
            Лекарства можно добавить кнопкой
            в правом верхнем углу экрана.
          </Placeholder>
          )}

      </Group>
    );
  }
}

export default AidKitPanel;
