import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { New } from "../screens/User/New";
import { Pools } from "../screens/Pools/Pools";
import { PlusCircle, SoccerBall, UserCircle } from "phosphor-react-native";
import { useTheme } from "native-base";
import { Platform } from "react-native";
import { Find } from "../screens/Find/Find";
import { Details } from "../screens/Details/Details";
import { User } from "../screens/User/User";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes = () => {
  const { colors, sizes } = useTheme();
  const size = sizes[8];

  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: "absolute",
          height: 85,
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: "relative",
          top: Platform.OS === "android" ? -10 : 0,
        },
      }}
    >
      <Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size} />,
          tabBarLabel: "",
        }}
      />
      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: "",
        }}
      />
      <Screen
        name="user"
        component={User}
        options={{
          tabBarIcon: ({ color }) => <UserCircle color={color} size={size} />,
          tabBarLabel: "",
        }}
      />
      <Screen
        name="find"
        component={Find}
        options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null }}
      />
      <Screen
        name="details"
        component={Details}
        options={{ tabBarStyle: { display: "none" }, tabBarButton: () => null }}
      />
    </Navigator>
  );
};
