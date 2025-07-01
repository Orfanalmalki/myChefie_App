import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/services/GlobalApi";

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState();

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    const result = await GlobalApi.GetCategories();

    // console.log(result.data.data);

    setCategoryList(result?.data?.data);
  };
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={styles.heading}>Category</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        scrollEnabled={false}
        renderItem={({ item, index }: any) => (
          <View style={styles.categoryContainer}>
            <Image
              source={{ uri: item?.image?.url }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>{item?.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "poppins-bold",
    fontSize: 20,
  },
  categoryImage: { width: 40, height: 40 },
  categoryContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    marginTop: 8,
  },
  categoryName: { fontFamily: "poppins", marginTop: 3 },
});
