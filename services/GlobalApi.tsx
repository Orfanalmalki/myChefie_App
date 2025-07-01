import axios from "axios";
import OpenAI from "openai";

const axiosClient = axios.create({
  baseURL: "http://145.94.159.5:1337/api",
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
  },
});

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});

const BASE_URL = "https://aigurulab.tech";

const GetUserByEmail = (email: string) =>
  axiosClient.get("/user-lists?filters[email][$eq]=" + email);

const CreateNewUser = (data: any) =>
  axiosClient.post("/user-lists", { data: data });

const GetCategories = () => axiosClient.get("/categories?populate=*");

const AiModel = async (prompt: string) =>
  await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-exp:free",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

//    model: "google/gemini-2.0-flash-exp:free",
//    model: "deepseek/deepseek-chat-v3-0324:free",
//    model: "deepseek/deepseek-r1-0528:free",

const GenerateAiImage = async (input: string) =>
  await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: input,
      model: "sdxl", //'flux'
      aspectRatio: "1:1", //Applicable to Flux model only
    },
    {
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_AIGURULAB_API_KEY, // Your API Key
        "Content-Type": "application/json", // Content Type
      },
    }
  );

export default {
  GetUserByEmail,
  CreateNewUser,
  GetCategories,
  AiModel,
  GenerateAiImage,
};
