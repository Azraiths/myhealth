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
import getExpenses from '../models/getExpenses';

class ExpensesPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: null,
      expenses: [
      ],
    };
  }

  async componentDidMount() {
    const { user } = this.props;
    const data = await getExpenses(user);
    this.setState({ expenses: data });
  }

  render() {
    const { expenses } = this.state;
    return (
      <Group>
        {
          expenses.length === 0 ? (
            <EmptyStateAidKit
              action={(
                <Button
                  onClick={() => this.props.openExpensesModal()}
                  style={styles.button}
                >
                  Добавить купленное лекарство
                </Button>
)}
            />
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
                          before={<Pill width="42px" height="42px" style={{ paddingRight: '10px' }} />}
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
