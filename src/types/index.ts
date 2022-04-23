import { Directory, File } from "../utils/fs";

export type Content = Directory | File;
export type ContentType = "d" | "f";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
