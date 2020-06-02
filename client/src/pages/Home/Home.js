import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../../store/auth";
import { GET_POSTS } from "../../graphql/posts";
import PostForm from "../../components/PostForm/PostForm";
import PostCard from "../../components/PostCard/PostCard";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data, error } = useQuery(GET_POSTS);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <p>Hello World</p>
    </Grid>
  );
}

export default Home;
