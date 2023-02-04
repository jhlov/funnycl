import { ItemType } from "aws-sdk/clients/ssmincidents";

export interface Group {
  name: string;
  score: number;
  color: string;
  items: { [key: ItemType]: number };
}
