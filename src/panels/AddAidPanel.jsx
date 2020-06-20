import React, { Component } from 'react';
import {
  Button, Cell, Div,
  FormLayout, FormLayoutGroup, Input, Select,
} from '@vkontakte/vkui';
import styles from './styles';

class TimeAndDoseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null,
      dose: null,
    };
  }

  onChange(e, type) {
    this.setState({ [type]: e.target.value });
    this.props.change(this.state);
  }

  render() {
    return (
      <Div>
        <Input
          onChange={(e) => this.onChange(e, 'time')}
          type="time"
        />
        <Input
          style={{ marginTop: '1rem' }}
          onChange={(e) => this.onChange(e, 'dose')}
          type="text"
          placeholder="Дозировка"
        />
      </Div>
    );
  }
}

// TODO: Добавить время приёма.
//  В идеале давать пользователю выбирать частоту и расширить количество вариантов
class AddAidPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Лекарство',
      type: 'pills',
      doctor: '',
      dateStart: '',
      dateEnd: '',
      times: [
        {
          dose: '1 таблетка',
          time: '10:00',
        },
      ],
    };
  }

  addTimes() {
    const { times } = this.state;
    const emptyTime = { dose: null, time: null };
    this.setState({ times: [...times, emptyTime] });
  }

  changeTimeAndDoze(e, index) {
    const { times } = this.state;
    times[index] = e;
    this.setState({ times });
  }

  changeName(e) {
    this.setState({ name: e.target.value });
  }

  changeType(e) {
    this.setState({ type: e.target.value });
  }

  changeDoctor(e) {
    this.setState({ doctor: e.target.value });
  }

  changeStartDate(e) {
    this.setState({ dateStart: e.target.value });
  }

  changeEndDate(e) {
    this.setState({ dateEnd: e.target.value });
  }

  render() {
    const {
      name, doctor, dateStart, dateEnd, times,
    } = this.state;
    return (
      <FormLayout>
        <FormLayoutGroup top="Название">
          <Input
            type="text"
            onChange={(e) => this.changeName(e)}
            value={name}
            label="Введите название лекарства"
          />
        </FormLayoutGroup>
        <FormLayoutGroup top="Доктор">
          <Input
            type="text"
            onChange={(e) => this.changeDoctor(e)}
            value={doctor}
            placeholder="Введите имя доктора"
          />
        </FormLayoutGroup>
        <FormLayoutGroup top="Единицы измерения">
          <Select
            onChange={(e) => this.changeType(e)}
            defaultValue="pills"
          >
            <option value="pills">Таблетки</option>
            <option value="syrup">Сироп</option>
            <option value="injection">Инъекция</option>
            <option value="lenses">Линзы</option>
          </Select>
        </FormLayoutGroup>
        <FormLayoutGroup top="Начало приёма">
          <Input
            onChange={(e) => this.changeStartDate(e)}
            value={dateStart}
            type="date"
            label="Выберите начало приёма"
          />
        </FormLayoutGroup>
        <FormLayoutGroup top="Последний день приёма">
          <Input
            onChange={(e) => this.changeEndDate(e)}
            value={dateEnd}
            type="date"
            label="Выберите конец приёма"
          />
        </FormLayoutGroup>

        {
            times.map((v, index) => (

              <FormLayoutGroup
                top="Дозировка и время"
                key={index}
              >
                <TimeAndDoseList
                  change={(e) => this.changeTimeAndDoze(e, index)}
                  {...v}
                />
              </FormLayoutGroup>
            ))
        }
        <FormLayoutGroup>
          <Cell style={styles.cell}>
            <Button
              style={styles.button}
              onClick={() => this.addTimes()}
              size="xl"
            >
              Добавить время приема
            </Button>
          </Cell>
        </FormLayoutGroup>
        <FormLayoutGroup>
          <Cell style={styles.cell}>
            <Button style={styles.button} size="xl">Добавить в аптечку</Button>
          </Cell>
        </FormLayoutGroup>
      </FormLayout>
    );
  }
}

export default AddAidPanel;
