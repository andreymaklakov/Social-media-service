import httpService from "./http.service";

const commentEndPoint = "comment/";

const commentService = {
  creareComment: async (comment) => {
    const { data } = await httpService.post(commentEndPoint, comment);
    return data;
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentEndPoint, {
      params: {
        orderBy: "pageId",
        equalTo: pageId
      }
    });
    return data;
  },
  deleteComment: async (id) => {
    const { data } = await httpService.delete(commentEndPoint + id);
    return data;
  }
};

export default commentService;
