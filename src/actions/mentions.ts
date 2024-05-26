type Mention = {
  id: string;
  author_id: string;
  text: string;
};

export async function mentionsTimeline(): Promise<{ data: Mention[] }> {
  // This function will be implemented in the next step
  return { data: [] };
}
