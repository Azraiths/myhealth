import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Footer,
  FormLayout, FormLayoutGroup, Input, Select, Text,
} from '@vkontakte/vkui';

//TODO: Заменить Text на правильный элемент
const AidInfo = (props) => {
  const { name, type } = props;
  return (
    <FormLayout>
      <FormLayoutGroup top="Название">
        <Text>{name}</Text>
      </FormLayoutGroup>
      <FormLayoutGroup top="Единица измерения">
        <Text>{type}</Text>
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
};

AidInfo.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default AidInfo;
