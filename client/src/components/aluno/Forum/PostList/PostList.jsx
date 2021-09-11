import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import PostCard from "./PostCard/PostCard";
import useStyles from "./styles";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../../core/MessageBox/MessageBox";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import { findPosts } from "../../../../actions/postActions";

function PostList(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const postFind = useSelector((state) => state.postFind);
  const { loading, error, data } = postFind;

  const handlePagination = (event, value) => {
    dispatch(
      findPosts({
        titulo: data.params.titulo || "",
        categoria: data.params.categoria || '',
        curso: data.params.categoria || '',
        opcao: data.params.opcao || '',
        pagination: value,        
      })
    );
  };

  useEffect(()=>{
    dispatch(findPosts({
      titulo: '',
      categoria: '',
      curso: '',
      opcao: 'TODOS',}))
  },[dispatch])

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <>
            {data.posts.map((post) => (
              <PostCard
                title={post.titulo}
                isAnswered={post.respondido}
                tags={post.tags}
                totalResponses={post.total_respostas}
                user={post.aluno}
                dateUpdate={post.update_date}
                postId={post.post_id}
              />
            ))}

            <div className={classes.row}>
              <Pagination
                className={classes.pagination}
                page={data.page}
                count={data.totalPages}
                color="secondary"
                onChange={handlePagination}
              />
            </div>
          </>
        )}
      </Box>
    </>
  );
}

export default PostList;
