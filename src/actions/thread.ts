import fs from "fs";

export async function thread(messages: string[]) {
  console.log("Threaded messages: ");
  messages.forEach((message, i) => {
    console.log(i, message);
    console.log("\n---\n");
    const data = { message };
    const jsonData = JSON.stringify(data) + "\n";
    fs.appendFileSync("messages.jsonl", jsonData);
  });
}
