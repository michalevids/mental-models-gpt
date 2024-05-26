import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { thread } from "../actions/thread";

const mentalModels = [
  "First Principles Thinking",
  "Second-Order Thinking",
  "Inversion",
  "Occam's Razor",
  "The Pareto Principle",
  // Add more mental models here
];
const taskPrompt = `You manage a twitter account about mental models.
   Your task is to explain a mental model in a series of tweets.
   Each tweet should be no longer than 280 characters.
   Separate tweets with three dashes "---".
  `;

const introPrompt = `Explain the details of the mental model "{model}" in a series of tweets.`;
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", taskPrompt],
  ["human", introPrompt],
]);
const model = new ChatOpenAI({ model: "gpt-4o", temperature: 0.7 });
const parser = new StringOutputParser();
const chain = promptTemplate.pipe(model).pipe(parser);

function chooseMentalModel() {
  return mentalModels[Math.floor(Math.random() * mentalModels.length)];
}

async function explainMentalModel(model: string): Promise<void> {
  const introContent = await chain.invoke({ model });

  return await thread(splitContentIntoTweets(introContent));
}

function splitContentIntoTweets(content: string): string[] {
  return content.split("---").map((tweet) => tweet.trim());
}

export async function planner(): Promise<void> {
  const model = chooseMentalModel();
  return await explainMentalModel(model);
}
