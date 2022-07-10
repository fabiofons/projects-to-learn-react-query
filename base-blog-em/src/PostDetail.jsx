import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const { id } = post;
  const { data, isLoading, isError, error } = useQuery(["comments", id], () =>
    fetchComments(id)
  );

  const deleteMutation = useMutation(deletePost);
  const updateMutacion = useMutation(updatePost);
  if (isLoading) return <h2>Loading comments..</h2>;
  if (isError)
    return (
      <>
        <h2>Oops, something went wrong</h2>
        <p>{error.message}</p>
      </>
    );

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(id)}>Delete</button>{" "}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Deleting Post</p>
      )}
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error deleting the Post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Post deleted</p>
      )}
      <button onClick={() => updateMutacion.mutate(id)}>Update title</button>
      {updateMutacion.isLoading && <p style={{ color: "purple" }}>Updating</p>}
      {updateMutacion.isError && <p style={{ color: "red" }}>Error</p>}
      {updateMutacion.isSuccess && <p style={{ color: "green" }}>Updated</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
