import React, { Component } from 'react';
import {
  Button,
  Footer,
  FormLayout, FormLayoutGroup, Input, Select,
} from '@vkontakte/vkui';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';
import styles from './styles';

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
    };
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
      name, doctor, dateStart, dateEnd,
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
            label="Введите название лекарства"
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
            type="date"
            label="Выберите начало приёма"
          />
        </FormLayoutGroup>
        <FormLayoutGroup top="Последний день приёма">
          <Input
            onChange={(e) => this.changeEndDate(e)}
            type="date"
            label="Выберите конец приёма"
          />
        </FormLayoutGroup>
        <FormLayoutGroup style={{ display: 'flex' }}>
          <Button style={styles.button} size="l">Добавить</Button>
        </FormLayoutGroup>
        <Footer>
          Для добавления лекарства, нажмите на галочку в
          правом верхнем углу экрана.
        </Footer>
      </FormLayout>
    );
  }
}

export default AddAidPanel;
