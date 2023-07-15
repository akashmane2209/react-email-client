export interface EmailList {
  list: Email[];
  total: number;
}

export interface Email {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: number;
  subject: string;
  short_description: string;
}

export interface EmailItem {
  id: string;
  body: string;
}

export type Filter = "all" | "unread" | "read" | "favourites";
