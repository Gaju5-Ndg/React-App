import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Screens/Home';
import Events from './Screens/Events';
import Login from './Screens/login';
import signup from './Screens/signup';
import Update from './Screens/Update';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs(navigation) {
  return (
    <NavigationContainer >

     {/* <Stack.Screen name='Update' component={Update} /> */}

    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarActiveTintColor: '#00f5d4'
      }}
    >

<Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={'#006d77'} size={size} />
          ),
        }}
      />

<Tab.Screen
        name="Update"
        component={Update}
        options={{
          tabBarLabel: 'Edit',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="update" color={'#006d77'} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={'#006d77'} size={size} />
          ),
        }}
      />

      

<Tab.Screen
        name="Stations"
        component={Events}
        options={{
          tabBarLabel: 'Station',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={'#006d77'} size={size} />
          ),
          // tabBarBadge:12,
        }}
      />



<Tab.Screen
        name="Signup"
        component={signup}
        options={{
          tabBarLabel: 'Signup',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={'#006d77'} size={size} />
          ),
          // tabBarBadge:12,
        }}
      />

      {/* <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={'#006d77'} size={size} />
          ),
          tabBarBadge: 3,
        }}
      /> */}
      {/* <Tab.Screen
        name="Archives"
        component={Archives}
        options={{
          tabBarLabel: 'Archives',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="archive" color={'#006d77'} size={size} />
          ),
          // tabBarBadge:20
        }}
      /> */}

{/* <Tab.Screen
        name="Update"
        component={Update}
        options={{
          tabBarLabel: 'Update',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="update" color={'#006d77'} size={size} />
          )
        }}
      /> */}
    </Tab.Navigator>
    </NavigationContainer>
  );
}
export default MyTabs;