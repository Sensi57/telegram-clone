export type Message = {
  id: string;
  text: string;
  ts: number;
  sent: boolean;
  status?: "pending" | "failed";
};
