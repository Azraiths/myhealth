import React, { Component } from 'react';
import {
  Group, List, Cell, RichCell,
} from '@vkontakte/vkui';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';
import { ReactComponent as Pill } from '../img/aptechka_28.svg';

class ExpensesPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [
        {
          user_id: 404,
          medical: 'Анальгин',
          pharm: 'Сидоров',
          dpurch: '2020-06-20',
          amount: '1 Пачка, 20шт.',
          cost: 500,
        },
        {
          user_id: 404,
          medical: 'Анальгин',
          pharm: 'Сидоров',
          dpurch: '2020-06-05',
          amount: '1 Пачка, 40шт.',
          cost: 450,
        },
      ],
    };
  }

  render() {
    const { expenses } = this.state;
    return (
      <Group>
        <List>
          {
            expenses.map((v) => (
              <RichCell
                after={`-${v.cost}₽`}
                text={v.amount}
                caption={v.dpurch}
                before={<Pill />}
              >
                {v.medical}
              </RichCell>
            ))
          }
        </List>
      </Group>
    );
  }
}

export default ExpensesPanel;
