export type Confession = {
  type: "text" | "photo" | "video" | "voice" | "sticker";
  content: string | {
    file_id: string;
    file_unique_id: string;
  };
  status: "pending" | "approved";
  createdAt: Date;
  telegramUserId: string;
  username?: string | null;
};
