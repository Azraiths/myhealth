import React, { Component } from 'react';
import {
  FormLayout,
  FormLayoutGroup,
  Input,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeaderButton,
} from '@vkontakte/vkui';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';

class AddExpensesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      cost: null,
      amount: null,
      pharmacyName: null,
    };
  }

  onClose(e) {
    const {
      name, cost, amount, pharmacyName,
    } = this.state;
    console.log(this.state);
    this.props.onModalClose(e);
  }

  onTextChange(e, type) {
    this.setState({ [type]: e.target.value });
  }

  render() {
    return (
      <ModalRoot
        onClose={(e) => this.onClose(e)}
        activeModal={this.props.activeModal}
      >
        <ModalPage
          id="addBoughtMedicine"
          header={(
            <ModalPageHeader
              left={<PanelHeaderButton onClick={(e) => this.onClose(e)}><Icon24Cancel /></PanelHeaderButton>}
              right={<PanelHeaderButton onClick={(e) => this.onClose(e)}><Icon24Done /></PanelHeaderButton>}
            >
              Добавить покупку
            </ModalPageHeader>
                    )}
        >
          <FormLayout>
            <FormLayoutGroup top="Название">
              <Input
                type="text"
                placeholder="Введите название лекарства"
                onChange={(e) => this.onTextChange(e, 'name')}
              />
            </FormLayoutGroup>
            <FormLayoutGroup top="Цена">
              <Input
                type="text"
                placeholder="Введите цену лекарства в рублях"
                onChange={(e) => this.onTextChange(e, 'cost')}
              />
            </FormLayoutGroup>
            <FormLayoutGroup top="Размер упаковки, количество и т.д.">
              <Input
                type="text"
                placeholder="Введите размер упаковки"
                onChange={(e) => this.onTextChange(e, 'amount')}
              />
            </FormLayoutGroup>
            <FormLayoutGroup top="Название аптеки">
              <Input
                type="text"
                placeholder="Введите название аптеки"
                onChange={(e) => this.onTextChange(e, 'pharmacyName')}
              />
            </FormLayoutGroup>
          </FormLayout>
        </ModalPage>
      </ModalRoot>
    );
  }
}
export default AddExpensesModal;
