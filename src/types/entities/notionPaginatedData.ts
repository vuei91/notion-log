import { Notion } from "./notion";

export interface NotionPaginatedData {
  error?: Error;
  data?: Notion[];
}
