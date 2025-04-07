import { Tabs } from 'expo-router';
import { icons } from '../../constants/icons';
import "../globals.css";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider } from '@/context/AuthContext';

interface TabIconInterFace {
    focus: boolean
    icon: any
    title: any
    size: any
    color: any
}

const TabIcon = ({ focus, icon, title, size, color }: TabIconInterFace) => {
    return (
        <>
            <Ionicons name={title} size={size} color={color} />
        </>
    )
}

const TabLayout = () => {
    return (
        <AuthProvider>
            <Tabs screenOptions={{
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#808080",
                tabBarLabelPosition: "below-icon",
                tabBarLabelStyle: {
                    fontFamily: "poppins",
                    fontWeight: 300
                },
                tabBarItemStyle: {
                    alignItems: "center",
                    justifyContent: "center"
                },
                tabBarStyle: {
                    borderRadius: 40,
                    backgroundColor: "#17105e",
                    borderTopWidth: 0,
                    position: "absolute",
                    bottom: 6,
                    right: 6,
                    left: 6,
                    elevation: 0,
                    height: 60,
                    paddingTop: 4,
                    paddingBottom: 0,
                },
            }}>
                <Tabs.Screen
                    name='index'
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => (
                            <TabIcon focus={focused} icon={icons.home} title='home' size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='search'
                    options={{
                        title: "Search",
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => (
                            <TabIcon focus={focused} icon={icons.search} title='search' size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='favourite'
                    options={{
                        title: "Favourite",
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => (
                            <TabIcon focus={focused} icon={icons.favourite} title='bookmark' size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='profile'
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ focused, size, color }) => (
                            <TabIcon focus={focused} icon={icons.profile} title='person-circle' size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </AuthProvider>
    )
}

export default TabLayout;