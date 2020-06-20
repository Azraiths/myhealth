import React from 'react';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import {
  View, Panel, Epic, TabbarItem, Tabbar, PanelHeader, platform, ANDROID,
} from '@vkontakte/vkui';
import PanelHeaderButton from '@vkontakte/vkui/dist/es6/components/PanelHeaderButton/PanelHeaderButton';
import Icon28MarketAddBadgeOutline from '@vkontakte/icons/dist/28/market_add_badge_outline';
import AidKitPanel from './first-aid-kit/AidKitPanel';
import SchedulePanel from './schedule/SchedulePandel';
import ReceiptPanel from './receipt/ReceiptsPanel';
import ExpensesPanel from './expenses/ExpensesPanel';
import AddAidPanel from './first-aid-kit/AddAidPanel';
import AidInfo from './first-aid-kit/AidInfo';
import styles from './styles';
import { ReactComponent as Recipe } from '../img/raspisanie_28.svg';
import AddExpensesModal from '../components/AddExpensesModal';
import ReceiptInfo from './receipt/ReceiptInfo';
import CreateReceiptPanel from './receipt/CreateReceiptPanel';
import { ReactComponent as Schedule } from '../img/raspisanie_new_28.svg';

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
      activeStory: 'aidKit',
      /**
       * Внутри главной панели Epic есть подразделы, как фрагмент в андроиде.
       * Для каждой главной панели если понадобится создаём свой стейт с дефолтным значением
       */
      aidKitActivePanel: 'aidKit',
      receiptActivePanel: 'receipt',
      /**
       * Выбранное лекарство при нажатии на карточку в AidKitPanel. Передаётся в AidInfo
       */
      chosenMedicine: null,
      selectedReceipt: null,
    };
    this.onStoryChange = this.onStoryChange.bind(this);
  }

  onStoryChange(e) {
    this.setState({ activeStory: e.currentTarget.dataset.story });
  }

  /**
     * Переходим в панель информации о медикаменте и перекидываем нужные пропсы
     * @param medicine
     */
  goToInfo(medicine) {
    this.setState({ aidKitActivePanel: 'aidInfo', chosenMedicine: medicine });
  }

  /**
     * При открытии панели ловим ивент из AddExpensesModal, ставим активную панель в ModalRoot
     * @param e String название панели
     */
  openExpensesModal(e) {
    this.setState({ modal: 'addBoughtMedicine' });
  }

  onModalClose() {
    this.setState({ modal: null });
  }

  goToReceipt(receipt) {
    this.setState({ receiptActivePanel: 'receiptInfo', selectedReceipt: receipt });
  }

  render() {
    const { user } = this.props;
    const osName = platform();
    const {
      activeStory, aidKitActivePanel, chosenMedicine, selectedReceipt, receiptActivePanel,
    } = this.state;
    return (
      <Epic
        activeStory={activeStory}
        tabbar={(
          <Tabbar>
            <TabbarItem
              onClick={this.onStoryChange}
              selected={activeStory === 'aidKit'}
              data-story="aidKit"
              text="Аптечка"
            >
              <Icon28MarketAddBadgeOutline />
            </TabbarItem>
            <TabbarItem
              onClick={this.onStoryChange}
              selected={activeStory === 'schedule'}
              data-story="schedule"
              text="Расписание"
            >
              <Schedule style={{ fill: activeStory === 'schedule' ? styles.icon.color : '#99a2ad' }} />
            </TabbarItem>
            <TabbarItem
              onClick={this.onStoryChange}
              selected={activeStory === 'receipt'}
              data-story="receipt"
              text="Рецепты"
            >
              <Recipe style={{ fill: activeStory === 'receipt' ? styles.icon.color : '#99a2ad' }} />
            </TabbarItem>
            <TabbarItem
              onClick={this.onStoryChange}
              selected={activeStory === 'expenses'}
              data-story="expenses"
              text="Расходы"
            >
              <Icon28MoneyCircleOutline />
            </TabbarItem>
          </Tabbar>
              )}
      >
        <View id="aidKit" activePanel={aidKitActivePanel}>
          <Panel id="aidKit">
            <PanelHeader
              left={(
                <PanelHeaderButton onClick={() => this.setState({ aidKitActivePanel: 'addNewAid' })}>
                  <Icon28AddOutline style={styles.icon} />
                </PanelHeaderButton>
              )}
              separator={false}
            >
              Аптечка
            </PanelHeader>
            {
                  user
                    ? (
                      <AidKitPanel
                        user={user}
                        goToInfo={(e) => this.goToInfo(e)}
                      />
                    ) : ''
              }

          </Panel>
          <Panel id="addNewAid">
            <PanelHeader
              left={(
                <PanelHeaderButton onClick={() => this.setState({ aidKitActivePanel: 'aidKit' })}>
                  {osName === ANDROID ? <Icon24Back style={styles.icon} /> : <Icon28ChevronBack style={styles.icon} />}
                </PanelHeaderButton>
                )}
            >
              Добавить лекарство
            </PanelHeader>
            <AddAidPanel onModalClose={() => this.setState({ aidKitActivePanel: 'aidKit' })} user={user} />
          </Panel>

          <Panel id="aidInfo">
            <PanelHeader
              left={(
                <PanelHeaderButton onClick={() => this.setState({ aidKitActivePanel: 'aidKit' })}>
                  {osName === ANDROID ? <Icon24Back /> : <Icon28ChevronBack />}
                </PanelHeaderButton>
                )}
            >
              Информация о лекарстве
            </PanelHeader>
            <AidInfo {...chosenMedicine} />
          </Panel>

        </View>
        <View id="schedule" activePanel="schedule">
          <Panel id="schedule">
            <PanelHeader>Расписание</PanelHeader>
            {
                      user
                        ? (
                          <SchedulePanel
                            user={user}
                          />
                        ) : ''
                  }

          </Panel>
        </View>
        <View id="receipt" activePanel={receiptActivePanel}>
          <Panel id="receipt">
            <PanelHeader left={(
              <PanelHeaderButton onClick={() => this.setState({ receiptActivePanel: 'createReceiptPanel' })}>
                <Icon28AddOutline style={styles.icon} />
              </PanelHeaderButton>
            )}
            >
              Рецепты
            </PanelHeader>
            {
                  user
                    ? (
                      <ReceiptPanel
                        user={user}
                        goToReceipt={(e) => this.goToReceipt(e)}
                      />
                    ) : ''
              }

          </Panel>
          <Panel id="createReceiptPanel">
            <PanelHeader
              left={(
                <PanelHeaderButton onClick={() => this.setState({ receiptActivePanel: 'receipt' })}>
                  {osName === ANDROID ? <Icon24Back style={styles.icon} /> : <Icon28ChevronBack style={styles.icon} />}
                </PanelHeaderButton>
                    )}
            >
              Создать рецепт
            </PanelHeader>
            <CreateReceiptPanel user={user} onClose={() => this.setState({ receiptActivePanel: 'receipt' })} />
          </Panel>
          <Panel id="receiptInfo">
            <PanelHeader
              left={(
                <PanelHeaderButton onClick={() => this.setState({ receiptActivePanel: 'receipt' })}>
                  {osName === ANDROID ? <Icon24Back /> : <Icon28ChevronBack />}
                </PanelHeaderButton>
                    )}
            >
              Информация о рецепте
            </PanelHeader>
            <ReceiptInfo {...selectedReceipt} />
          </Panel>
        </View>
        <View
          id="expenses"
          activePanel="expenses"
          modal={(
            <AddExpensesModal
              user={user}
              onModalClose={(e) => this.onModalClose(e)}
              activeModal={this.state.modal}
            />
            )}
        >
          <Panel id="expenses">
            <PanelHeader>Расходы</PanelHeader>
            {
                  user
                    ? (
                      <ExpensesPanel user={user} openExpensesModal={(e) => this.openExpensesModal(e)} />
                    ) : ''
              }
          </Panel>
        </View>
      </Epic>
    );
  }
}
export default MainPanel;
