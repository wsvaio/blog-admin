import { get, post, patch, put, del } from "@/apis/request";
export const getArticle = get("/article/:id?");
export const postArticle = post("/article");
export const putArticle = put("/article");
export const delArticle = del("/article");

export const upload = post("/upload");
