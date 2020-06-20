import React, { Component } from 'react';

import {
  Group, Card, CardGrid, Cell, Placeholder,
} from '@vkontakte/vkui';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';

import PropTypes from 'prop-types';
import { ReactComponent as Pill } from '../img/aptechka_28.svg';
import AidInfo from './AidInfo';

Array.prototype.isEmpty = function () {
  return this.length === 0;
};

class AidKitPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [
        {
          user_id: '404',
          medical: 'Panadol',
          doctor: 'Сидоров',
          type: 'Таблетки',
          dstart: '2020-06-10',
          dfinish: '2020-06-25',
          times: [
            {
              dose: '1 таблетка',
              time: '10:00',
            },
          ],
        },
      ],
    };
  }

  render() {
    const { medicines } = this.state;
    const { goToInfo } = this.props;

    return (
      <Group>
        <CardGrid>
          {
            medicines.map((v) => (
              <Card key={v.name} onClick={() => this.props.goToInfo(v)} size="l" mode="shadow">
                <Cell before={<Avatar src={pill} />} description={v.description}>{v.name}</Cell>
              </Card>
            ))
          }
        </CardGrid>
        { medicines.isEmpty()
          && (
          <Placeholder
            stretched
            icon={<Pill style={{ height: '48px', width: '48px' }} />}
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

AidKitPanel.propTypes = {
  goToInfo: PropTypes.func.isRequired,

};

export default AidKitPanel;
