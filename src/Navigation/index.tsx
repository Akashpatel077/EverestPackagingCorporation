import React from "react";
import AuthContainer from "./auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const MainStack = createNativeStackNavigator();

const MainContainer = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown:false}}>
        <MainStack.Screen name={"Auth"} component={AuthContainer} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;