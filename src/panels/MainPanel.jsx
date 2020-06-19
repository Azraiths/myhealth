import React from 'react';
import Icon28MoneyCircleOutline from '@vkontakte/icons/dist/28/money_circle_outline';
import {
  View, Panel, Epic, TabbarItem, Tabbar, PanelHeader,
} from '@vkontakte/vkui';
import AidKitPanel from './AidKitPanel';
import RecipePanel from './RecipePanel';
import ExpensesPanel from './ExpensesPanel';

class MainPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStory: 'more',
    };
    this.onStoryChange = this.onStoryChange.bind(this);
  }

  onStoryChange(e) {
    this.setState({ activeStory: e.currentTarget.dataset.story });
  }

  render() {
    const { activeStory } = this.state;
    return (
      <Epic
        activeStory={this.state.activeStory}
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
        <View id="aidKit" activePanel="aidKit">
          <Panel id="aidKit">
            <PanelHeader>Аптечка</PanelHeader>
            <AidKitPanel />
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
