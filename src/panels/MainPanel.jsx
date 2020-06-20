import React from 'react';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import {
  View, Panel, Epic, TabbarItem, Tabbar, PanelHeader, platform, ANDROID,
} from '@vkontakte/vkui';
import PanelHeaderButton from '@vkontakte/vkui/dist/es6/components/PanelHeaderButton/PanelHeaderButton';
import AidKitPanel from './AidKitPanel';
import RecipePanel from './RecipePanel';
import ExpensesPanel from './ExpensesPanel';
import AddAidPanel from './AddAidPanel';
import AidInfo from './AidInfo';

class MainPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStory: 'more',
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

  goToInfo(medicine) {
    console.log(medicine);
    this.setState({ aidKitActivePanel: 'aidInfo', chosenMedicine: medicine });
  }

  render() {
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
              <Icon28MoneyCircleOutline />
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
              right={<PanelHeaderButton onClick={() => this.setState({ aidKitActivePanel: 'addNewAid' })}><Icon28AddOutline /></PanelHeaderButton>}
              separator={false}
            >
              Аптечка
            </PanelHeader>
            <AidKitPanel goToInfo={(e) => this.goToInfo(e)} />
          </Panel>
          <Panel id="addNewAid">
            <PanelHeader
              left={(
                <PanelHeaderButton onClick={() => this.setState({ aidKitActivePanel: 'aidKit' })}>
                  {osName === ANDROID ? <Icon24Back /> : <Icon28ChevronBack />}
                </PanelHeaderButton>
                )}
            >
              Добавить лекарство
            </PanelHeader>
            <AddAidPanel />
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
            <RecipePanel />
          </Panel>
        </View>
        <View id="expenses" activePanel="expenses">
          <Panel id="expenses">
            <PanelHeader>Расходы</PanelHeader>
            <ExpensesPanel />
          </Panel>
        </View>
      </Epic>
    );
  }
}
export default MainPanel;
