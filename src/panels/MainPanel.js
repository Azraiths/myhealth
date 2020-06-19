import React from "react";
import Icon28MoneyCircleOutline from "@vkontakte/icons/dist/28/money_circle_outline";
import {View, Panel, Epic,TabbarItem, Tabbar, PanelHeader } from "@vkontakte/vkui";
import AidKitPanel from "./AidKitPanel";
import RecipePanel from "./RecipePanel";
import ExpensesPanel from "./ExpensesPanel";

class MainPanel extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            activeStory: 'more'
        };
        this.onStoryChange = this.onStoryChange.bind(this);
    }

    onStoryChange (e) {
        this.setState({ activeStory: e.currentTarget.dataset.story })
    }

    render () {

        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'feed'}
                        data-story="feed"
                        text="Новости"
                    ><Icon28MoneyCircleOutline /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'discover'}
                        data-story="discover"
                        text="Поиск"
                    ><Icon28MoneyCircleOutline /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'messages'}
                        data-story="messages"
                        label="12"
                        text="Сообщения"
                    ><Icon28MoneyCircleOutline /></TabbarItem>
                </Tabbar>
            }>
                <View id="feed" activePanel="feed">
                    <Panel id="feed">
                        <PanelHeader>Аптечка</PanelHeader>
                        <AidKitPanel/>
                    </Panel>
                </View>
                <View id="discover" activePanel="discover">
                    <Panel id="discover">
                        <PanelHeader>Рецепты</PanelHeader>
                        <RecipePanel/>
                    </Panel>
                </View>
                <View id="messages" activePanel="messages">
                    <Panel id="messages">
                        <PanelHeader>Расходы</PanelHeader>
                        <ExpensesPanel/>
                    </Panel>
                </View>
            </Epic>
        )
    }
}
export default MainPanel;
