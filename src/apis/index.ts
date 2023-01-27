import { get, post, patch, put, del } from "@/apis/request";
export const getArticle = get("/blog/article/:id?");
export const postArticle = post("/blog/article");
export const putArticle = put("/blog/article");
export const delArticle = del("/blog/article/:id");

export const getTag = get("/blog/tag/:id?");
export const postTag = post("/blog/tag");
export const putTag = put("/blog/tag");
export const delTag = del("/blog/tag/:id");

export const getType = get("/blog/type/:id?");
export const postType = post("/blog/type");
export const putType = put("/blog/type");
export const delType = del("/blog/type/:id");

export const getComment = get("/blog/comment/:id?");
export const postComment = post("/blog/comment");
export const putComment = put("/blog/comment");
export const delComment = del("/blog/comment/:id");

export const upload = post("/common/upload");
