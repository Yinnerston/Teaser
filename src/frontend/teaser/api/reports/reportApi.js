import axiosAPIClient from "../axiosAPIClient";

/**
 * Post a comment to the endpoint api/v1/posts/comment/report
 * @param {*} commentID
 * @returns
 */
export function postCommentReport(commentID) {
  const response = axiosAPIClient
    .post("posts/comment/report", {
      comment_id: commentID,
    })
    .then((res) => res.data)
    .catch(function (error) {
      console.log("error from data :", error.toJSON());
    });
  return response;
}
