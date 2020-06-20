import React from 'react';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import {
  View, Panel, Epic, TabbarItem, Tabbar, PanelHeader, platform, ANDROID, Button, Cell,
} from '@vkontakte/vkui';
import PanelHeaderButton from '@vkontakte/vkui/dist/es6/components/PanelHeaderButton/PanelHeaderButton';
import AidKitPanel from './AidKitPanel';
import RecipePanel from './RecipePanel';
import ExpensesPanel from './ExpensesPanel';
import AddAidPanel from './AddAidPanel';
import AidInfo from './AidInfo';
import styles from './styles';
import { ReactComponent as Recipe } from '../img/raspisanie_28.svg';
import AddExpensesModal from '../components/AddExpensesModal';

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
      /**
       * Выбранное лекарство при нажатии на карточку в AidKitPanel. Передаётся в AidInfo
       */
      chosenMedicine: null,
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

  render() {
    const { user } = this.props;
    const osName = platform();
    const { activeStory, aidKitActivePanel, chosenMedicine } = this.state;
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
              <Icon28MoneyCircleOutline />
            </TabbarItem>
            <TabbarItem
              onClick={this.onStoryChange}
              selected={activeStory === 'recipe'}
              data-story="recipe"
              text="Рецепты"
            >
              <Recipe style={{ fill: activeStory === 'recipe' ? styles.icon.color : '#99a2ad' }} />
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
            <AddAidPanel user={user} />
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
        <View id="recipe" activePanel="recipe">
          <Panel id="recipe">
            <PanelHeader>Рецепты</PanelHeader>
            {
                  user
                    ? (
                      <RecipePanel
                        user={user}
                      />
                    ) : ''
              }

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
            <ExpensesPanel openExpensesModal={(e) => this.openExpensesModal(e)} />
          </Panel>
        </View>
      </Epic>
    );
  }
}
export default MainPanel;
