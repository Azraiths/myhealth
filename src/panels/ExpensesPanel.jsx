import React, { Component } from 'react';
import {
  Group,
  List,
  Cell,
  RichCell,
  Text,
  Button,
} from '@vkontakte/vkui';
import { ReactComponent as Pill } from '../img/aptechka_28.svg';
import styles from './styles';
import EmptyStateAidKit from '../components/EmptyStateAidKit';

class ExpensesPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: null,
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

  onClose(e) {
    this.setState({ activeModal: null });
  }

  render() {
    const { expenses } = this.state;
    return (
      <Group>
        {
          expenses.length === 0 ? (
            <EmptyStateAidKit />
          )
            : (
              <List>
                {
                      expenses.map((v) => (
                        <RichCell
                          key={v.dpurch}
                          after={<Text style={{ fontWeight: 'bold' }}>{`-${v.cost}₽`}</Text>}
                          text={v.amount}
                          caption={v.dpurch}
                          before={<Pill width="48px" height="48px" style={{ paddingRight: '10px' }} />}
                        >
                          {v.medical}
                        </RichCell>
                      ))
                    }
              </List>
            )
        }
        <Cell style={styles.cell}>
          <Button
            onClick={() => this.props.openExpensesModal()}
            style={styles.button}
          >
            Добавить купленное лекарство
          </Button>
        </Cell>
      </Group>
    );
  }
}

export default ExpensesPanel;
