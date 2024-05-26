import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { tweet } from "../actions/tweet";

const model = new ChatOpenAI({ model: "gpt-4o" });

const messages = [
  new SystemMessage(
    "You are a tweet bot. You can generate tweets based on a given prompt."
  ),
  new HumanMessage("Please tweet a short list of mental models."),
];

const parser = new StringOutputParser();

const chain = model.pipe(parser);

export const post = async () => {
  const text = await chain.invoke(messages);
  return tweet(text);
};
