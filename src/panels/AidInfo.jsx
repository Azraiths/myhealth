import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Cell,
  FormLayout, FormLayoutGroup, List, Separator, Text,
} from '@vkontakte/vkui';

const AidInfo = (props) => {
  const {
    user_id, medical, medtype, doctor, dstart, dfinish, times,
  } = props;

  const style = {
    topLabel: {
      width: '100%',
      padding: '0 11.5px',
      display: 'inline-block',
    },
    separator: {
      margin: '0 1px',
    },

    mainLabel: {
      width: '100%',
      padding: '0 11.5px',
      display: 'inline-block',
    },

    timeCard: {
      time: {
        fontWeight: 'bold',
        color: 'black',
      },
      dose: {
        paddingLeft: '10px',
      },
    },
  };

  return (
    <FormLayout>
      <FormLayoutGroup top="Название">
        <Text style={style.topLabel}>{medical}</Text>
      </FormLayoutGroup>
      <FormLayoutGroup top="Назначил врач">
        <Text style={style.topLabel}>{doctor}</Text>
      </FormLayoutGroup>
      <FormLayoutGroup top="Тип">
        <Text style={style.topLabel}>{medtype}</Text>
      </FormLayoutGroup>
      <Separator style={style.separator} />
      <FormLayout>
        <FormLayoutGroup top="ИНФОРАЦИЯ О ПРИЕМЕ" />
        <FormLayoutGroup top="Дата начала приема">
          <Text style={style.mainLabel}>{dstart}</Text>
        </FormLayoutGroup>
        <FormLayoutGroup top="Дата окончания приема">
          <Text style={style.mainLabel}>{dfinish}</Text>
        </FormLayoutGroup>
        <List>
          { times.map((v, index) => (

            <Cell key={index} before={<Text style={style.timeCard.time}>{v.time}</Text>}>
              <Text style={style.timeCard.dose}>{v.dose}</Text>
            </Cell>
          ))}
        </List>
      </FormLayout>
    </FormLayout>
  );
};

AidInfo.propTypes = {
  user_id: PropTypes.string.isRequired,
  medical: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  doctor: PropTypes.string.isRequired,
  dstart: PropTypes.instanceOf(Date).isRequired,
  dfinish: PropTypes.instanceOf(Date).isRequired,
  times: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default AidInfo;
