import { Placeholder } from '@vkontakte/vkui';
import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Pill } from '../img/aptechka_28.svg';

const EmptyStateAidKit = (props) => {
  const {
    placeholderIcon, header, message, action,
  } = props;

  const properties = {
    action: action || null,
    icon: placeholderIcon || <Pill style={{ height: '48px', width: '48px' }} />,
    header: header || 'В вашей аптечке пусто.',
    message: message || 'Лекарства можно добавить кнопкой в правом верхнем углу экрана.',
  };

  return (
    <Placeholder
      stretched
      {...properties}
    >
      {properties.message}
    </Placeholder>
  );
};

EmptyStateAidKit.propTypes = {
  placeholderIcon: PropTypes.instanceOf(React.Component),
  header: PropTypes.string,
  message: PropTypes.string,
};
export default EmptyStateAidKit;
