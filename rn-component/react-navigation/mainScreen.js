import React from 'react';
import {
    createBottomTabNavigator,
    createStackNavigator,
} from 'react-navigation';
import { Image , StyleSheet } from 'react-native';
import constants from "./common/constants";
import LinePage from './pages/LinePage';
import TicketPage from './pages/TicketPage';
import ActivityPage from './pages/ActivityPage';
import MinePage from './pages/MinePage';


const LineStack = createStackNavigator({
    Line: {screen:LinePage},
},
    {
        navigationOptions: {
            header: null
        }
    }
);

const TicketStack = createStackNavigator({
    Ticket: {screen:TicketPage},
},
    {
        navigationOptions: {
            header: null
        }
    }
);

const ActivityStack = createStackNavigator({
        Activity: {screen:ActivityPage},
},
    {
        navigationOptions: {
            header: null
        }
    }
);

const MineStack = createStackNavigator({
    Mine: {screen:MinePage},
},
    {
        navigationOptions: {
            header: null
        }
    }
);

export default createBottomTabNavigator(
    {
        线路: LineStack,
        车票: TicketStack,
        活动:ActivityStack,
        我的:MineStack
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === '线路') {
                    iconName = focused ? require('../image/main/line5.png'): require('../image/main/line3.png');
                } else if (routeName === '车票') {
                    iconName = focused ? require('../image/main/ticket5.png'): require('../image/main/ticket3.png');
                } else if (routeName === '活动') {
                    iconName = focused ? require('../image/main/active_2.png'): require('../image/main/active.png');
                } else if(routeName === '我的') {
                    iconName = focused ? require('../image/main/my5.png'): require('../image/main/my3.png');
                }
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Image source={iconName} style={styles.footImage} resizeMode={'contain'} />;
            }
        }),
        tabBarOptions:{
            labelStyle:{
                alignItems:'center',
                marginBottom:5
            },
            activeTintColor: '#00c6ad',
            inactiveTintColor: 'gray',
        }
    }
);

const styles = StyleSheet.create({
    footImage:{
        width:constants.window.width * 0.05,
        marginBottom: -3,
    }
});