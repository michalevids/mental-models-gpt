import { mentionsTimeline } from "../actions/mentions";
import { reply } from "../actions/reply";

class EngagementAgent {
  async respondToMentions(): Promise<void> {
    const mentions = await mentionsTimeline();

    for (const mention of mentions.data) {
      const response = `Thanks for the mention, @${mention.author_id}!`;
      await reply(response, mention.id);
      console.log(`Replied to mention: ${mention.id}`);
    }
  }
}

export const engagementAgent = new EngagementAgent();
