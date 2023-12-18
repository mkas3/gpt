import { Tabs } from 'expo-router';
import { HistorySVG } from '../../components/Tabs/Icons/SVG/HistorySVG';
import { ChatSVG } from '../../components/Tabs/Icons/SVG/ChatSVG';
import { SettingsTabIcon } from '../../components/Tabs/Icons/Settings';
import {TabBar} from '../../components/Tabs/TabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      initialRouteName='chat'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
      />
      <Tabs.Screen
        name='first-start'
        options={{
          lazy: true,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name='history'
        options={{
          title: 'История',
          tabBarIcon: (props) => <HistorySVG selected={props.focused} />,
        }}
      />
      <Tabs.Screen
        name='chat'
        options={{
          title: 'Чат',
          tabBarIcon: (props) => <ChatSVG selected={props.focused} />,
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Настройки',
          tabBarIcon: (props) => <SettingsTabIcon selected={props.focused} />,
        }}
      />
    </Tabs>
  );
}
