import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import colors from "@/services/colors";
import Button from "./Button";
import GlobalApi from "@/services/GlobalApi";
import Prompt from "./../services/Prompt";

// import GENERATE_RECIPE_OPTION_PROMPT from "./../services/Prompt";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import LoadingDialog from "./LoadingDialog";

export default function CreateRecipe() {
  const [userInput, setUserInput] = useState<string>();
  const [recipeOptions, setRecipeOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [openLoading, setOpenLoading] = useState(false);
  {
    /** Hard Coded OnGenerate you can use it if you reach the limit **/
    //**** **************  */
    // const OnGenerate = async () => {
    //   if (!userInput) {
    //     Alert.alert("Please enter details");
    //     return;
    //   }
    //   setLoading(true);
    //   // Replace API call with hardcoded results
    //   const codedResults = [
    //     {
    //       recipeName: "🔥 Korean Fire Chicken & Rice 🔥",
    //       description:
    //         "Gochujang-glazed chicken with a kick! A flavor bomb of sweet, savory, and fiery spice that will make you sweat. Serve over fluffy white rice.",
    //       ingredients: [
    //         "Chicken thighs (boneless, skinless)",
    //         "Gochujang (Korean chili paste)",
    //         "Soy sauce",
    //         "Rice vinegar",
    //         "Honey",
    //         "Ginger",
    //         "Garlic",
    //         "Sesame oil",
    //         "Gochugaru (Korean chili flakes)",
    //         "Onion",
    //         "Green onions",
    //         "Sesame seeds",
    //       ],
    //     },
    //     {
    //       recipeName: "🌶️ Sichuan Chili Chicken & Rice 🌶️",
    //       description:
    //         "A classic Sichuan dish with crispy fried chicken coated in a mouth-numbing and fragrant chili sauce. A delightful explosion of flavors!",
    //       ingredients: [
    //         "Chicken breast (cubed)",
    //         "Soy sauce",
    //         "Shaoxing wine",
    //         "Cornstarch",
    //         "Peanut oil (for frying)",
    //         "Dried red chilies",
    //         "Sichuan peppercorns",
    //         "Ginger",
    //         "Garlic",
    //         "Sugar",
    //         "Black vinegar",
    //         "Chicken broth",
    //         "Scallions",
    //         "Peanuts (roasted)",
    //       ],
    //     },
    //     {
    //       recipeName: "🥭 Jerk Chicken with Mango Salsa & Rice 🥭",
    //       description:
    //         "Caribbean heat with a sweet twist! Spicy jerk-marinated chicken meets refreshing mango salsa & served on a bed of tasty rice.",
    //       ingredients: [
    //         "Chicken drumsticks/thighs",
    //         "Scotch bonnet peppers (or habanero)",
    //         "Allspice",
    //         "Thyme",
    //         "Garlic",
    //         "Ginger",
    //         "Brown sugar",
    //         "Soy sauce",
    //         "Lime juice",
    //         "Onion",
    //         "Mango",
    //         "Red bell pepper",
    //         "Red onion",
    //         "Cilantro",
    //       ],
    //     },
    //   ];
    //   setRecipeOptions(codedResults); // ✅ directly assign the hardcoded data
    //   setLoading(false);
    //   actionSheetRef.current?.show();
    // };
    // const OnGenerate = async () => {
    //   if (!userInput) {
    //     Alert.alert("Please enter details");
    //     return;
    //   }
    //   setLoading(true);
    //   const result = await GlobalApi.AiModel(
    //     userInput + Prompt.GENERATE_RECIPE_OPTION_PROMPT
    //   );
    //   console.log(result?.choices[0].message?.content);
    //   const content = result?.choices[0].message?.content;
    //   content && setRecipeOptions(JSON.parse(content));
    //   setLoading(false);
    //   actionSheetRef.current?.show();
    // };
  }

  const OnGenerate = async () => {
    if (!userInput) {
      Alert.alert("Please enter details");
      return;
    }

    setLoading(true);
    try {
      const result = await GlobalApi.AiModel(
        userInput + Prompt.GENERATE_RECIPE_OPTION_PROMPT
      );
      let content = result?.choices?.[0]?.message?.content;
      console.log("Raw AI content:", content);

      // ✅ Extract JSON safely (remove markdown or explanations)
      const jsonString = content
        ?.replace(/^[\s\S]*?```json/, "") // remove before ```json
        .replace(/```[\s\S]*$/, "") // remove after closing ```
        .trim();

      const parsed = JSON.parse(jsonString || "[]");

      if (Array.isArray(parsed)) {
        setRecipeOptions(parsed);
      } else {
        Alert.alert("Unexpected data format from AI.");
        setRecipeOptions([]);
      }

      actionSheetRef.current?.show();
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      Alert.alert("Error", "Could not generate recipes. Please try again.");
      setRecipeOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const GenerateCompleteRecipe = async (option: any) => {
    actionSheetRef.current?.hide();
    setOpenLoading(true);
    const PROMPT =
      "RecipeName:" +
      option.recipeName +
      "Description:" +
      option?.discription +
      Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;
    const result = await GlobalApi.AiModel(PROMPT);
    const content: any = result?.choices?.[0]?.message?.content;
    console.log(content?.imagePrompt);
    setOpenLoading(false);
  };
  const GenerateRecipeAiImage = async (imagePrompt: string) => {
    const result = await GlobalApi.GenerateAiImage(imagePrompt);
    console.log(result.data.image);
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/pan.gif")}
        style={styles.panImage}
      />
      <Text style={styles.heading}>
        Warm up your stove, and let's get cooking!
      </Text>
      <Text style={styles.subHeading}>Make something for your LOVE </Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        placeholder="What do you want to create? Add ingredients etc. "
        onChangeText={(value) => setUserInput(value)}
      />
      <Button
        label={"Generate Recipe"}
        onPress={() => OnGenerate()}
        loading={loading}
        icon={"sparkles"}
      />
      <LoadingDialog visible={openLoading} />
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContainer}>
          <Text style={styles.heading}>Select Recipe</Text>
          <View>
            {Array.isArray(recipeOptions) &&
              recipeOptions.map((item: any, index: number) => (
                <TouchableOpacity
                  onPress={() => GenerateCompleteRecipe(item)}
                  key={index}
                  style={styles.recipeOptionContainer}
                >
                  <Text style={styles.recipeNameText}>{item?.recipeName}</Text>
                  <Text style={styles.descriptionText}>
                    {item?.description}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ActionSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 15,
    backgroundColor: colors.SECONDARY,
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
  },
  panImage: {
    width: 80,
    height: 80,
  },
  heading: {
    fontFamily: "poppins",
    fontSize: 20,
    textAlign: "center",
  },
  subHeading: { fontFamily: "poppins", fontSize: 15, marginTop: 6 },
  textInput: {
    backgroundColor: colors.WHITE,
    width: "100%",
    borderRadius: 15,
    height: 120,
    marginTop: 8,
    fontSize: 16,
    padding: 15,
    textAlignVertical: "top",
  },
  actionSheetContainer: {
    padding: 25,
  },
  recipeNameText: { fontFamily: "poppins-bold", fontSize: 16 },
  descriptionText: { fontFamily: "poppins", color: colors.GRAY },
  recipeOptionContainer: {
    borderColor: colors.SECONDARY,
    // backgroundColor: colors.PRIMARY,
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 15,
    marginTop: 15,
  },
});
