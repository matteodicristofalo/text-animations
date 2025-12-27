import { HtmlTextElementTag } from "./jsx";

export type WithTag<T> = T & { tag: HtmlTextElementTag };
export type WithoutTag<T> = Omit<T, "tag">;
