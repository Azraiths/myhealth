import React, { Component } from 'react';
import { Group, List, Cell } from '@vkontakte/vkui';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';

class ExpensesPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Group>
        <List>
          <Cell before={<Icon28MoneyCircleOutline />}>ПАНЕЛЬ</Cell>
          <Cell before={<Icon28MoneyCircleOutline />}>ПАНЕЛЬ</Cell>
          <Cell before={<Icon28MoneyCircleOutline />}>ПАНЕЛЬ</Cell>
        </List>
      </Group>
    );
  }
}

export default ExpensesPanel;
