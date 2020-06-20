import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Footer,
  FormLayout, FormLayoutGroup, Select, Separator, Text,
} from '@vkontakte/vkui';

// TODO: Заменить Text на правильный элемент
const AidInfo = (props) => {
  const { name, type } = props;

  const style = {
    label: {
      width: '100%',
      padding: '0 11.5px',
      display: 'inline-block',
    },
    separator: {
      margin: '0 11.5px',
    },
  };

  return (
    <FormLayout>
      <FormLayoutGroup top="Название">
        <Text style={style.label}>{name}</Text>
      </FormLayoutGroup>
      <FormLayoutGroup top="Единица измерения">
        <Text style={style.label}>{type}</Text>
      </FormLayoutGroup>
      <Separator style={style.separator} />
    </FormLayout>
  );
};

AidInfo.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default AidInfo;
