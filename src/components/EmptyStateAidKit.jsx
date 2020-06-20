import { Placeholder } from '@vkontakte/vkui';
import React from 'react';
import { ReactComponent as Pill } from '../img/aptechka_28.svg';

const EmptyStateAidKit = () => (
  <Placeholder
    stretched
    icon={<Pill style={{ height: '48px', width: '48px' }} />}
    header="В вашей аптечке пусто."
  >
    Лекарства можно добавить кнопкой
    в правом верхнем углу экрана.
  </Placeholder>
);

export default EmptyStateAidKit;
