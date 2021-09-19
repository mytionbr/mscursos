import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import PostCard from "./PostCard/PostCard";
import useStyles from "./styles";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../../core/MessageBox/MessageBox";
import LoadingBox from "../../../core/LoadingBox/LoadingBox";
import { findPosts } from "../../../../actions/postActions";
import scrollTo from "../../../../utils/scrollTo";

function PostList(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const postFind = useSelector((state) => state.postFind);
  const { loading, error, data } = postFind;

  const handlePagination = (event, value) => {
    scrollTo()
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
          overflow: 'auto',
        }}
      >
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox type="error">{error}</MessageBox>
        ) : (
          <>
            {
            data.posts.length > 0 
            ? data.posts.map((post) => (
              <PostCard
                title={post.titulo}
                isAnswered={post.solucionado}
                tags={post.tags}
                totalResponses={post.total_respostas}
                user={post.aluno}
                dateUpdate={post.data_atualizacao}
                postId={post.post_id}
              />
            ))
          : (
            <MessageBox type="info" >
              Nenhum post encontrada
            </MessageBox>
          )}

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
