import React, { Component } from 'react';
import {
  Footer,
  FormLayout, FormLayoutGroup, Input, Select,
} from '@vkontakte/vkui';

// TODO: Добавить время приёма.
//  В идеале давать пользователю выбирать частоту и расширить количество вариантов
class AddAidPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Лекарство',
      type: 'pills',
    };
  }

  changeName(e) {
    this.setState({ name: e.target.value });
  }

  changeType(e) {
    this.setState({ type: e.target.value });
  }

  render() {
    const { name } = this.state;
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
        <FormLayoutGroup top="Продолжительность приёма">
          <Select defaultValue="endless">
            <option value="endless">Без даты окончания</option>
            <option value="week">1 неделя</option>
            <option value="month">1 месяц</option>
          </Select>
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
