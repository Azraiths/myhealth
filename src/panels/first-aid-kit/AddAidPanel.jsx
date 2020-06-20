import React, { Component } from 'react';
import {
  Button, Cell, Div,
  FormLayout, FormLayoutGroup, Input, Select,
} from '@vkontakte/vkui';
import getAidKitTracking from '../../api/getAidKitTracking';
import styles from '../styles';
import addTracking from '../../api/addTracking';
import { ReactComponent as ConfirmLogo } from '../../img/confirm_41.svg';
import { ReactComponent as AddLogo } from '../../img/add_41.svg';

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
      medical: 'Лекарство',
      medtype: 'Таблетка',
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

  async sendData() {
    const { user } = this.props;
    const {
      medical,
      medtype,
      doctor,
      dateStart,
      dateEnd,
      times,
    } = this.state;
    const props = {
      medical,
      medtype,
      doctor,
      dstart: dateStart,
      dfinish: dateEnd,
      user_id: user,
      times,
    };
    const res = await addTracking(props);
    this.props.onModalClose();
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
    this.setState({ medical: e.target.value });
  }

  changeType(e) {
    this.setState({ medtype: e.target.value });
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
            defaultValue="Таблетки"
          >
            <option value="Таблетки">Таблетки</option>
            <option value="Сироп">Сироп</option>
            <option value="Инъекция">Инъекция</option>
            <option value="Линзы">Линзы</option>
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
            <AddLogo
              onClick={() => this.addTimes()}
            />
          </Cell>
        </FormLayoutGroup>
        <FormLayoutGroup>
          <Cell style={styles.cell}>
            <Button onClick={() => this.sendData()} style={styles.button} size="xl">Добавить в аптечку</Button>
          </Cell>
        </FormLayoutGroup>
      </FormLayout>
    );
  }
}

export default AddAidPanel;
