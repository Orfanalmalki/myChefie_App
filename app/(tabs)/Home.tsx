import { View, Text, ScrollView } from "react-native";
import React from "react";
import colors from "@/services/colors";
import IntroHeader from "@/components/IntroHeader";
import CreateRecipe from "@/components/CreateRecipe";
import CategoryList from "@/components/CategoryList";

export default function Home() {
  return (
    <ScrollView
      style={{
        height: "100%",
        backgroundColor: colors.WHITE,
        padding: 25,
      }}
    >
      <IntroHeader />
      <CreateRecipe />
      <CategoryList />
    </ScrollView>
  );
}
