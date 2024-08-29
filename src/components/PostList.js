import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const PostList = ({ posts, onEdit }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Posts</h2>
      {posts.map(post => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
            <p>Status: {post.status}</p>
            <Button onClick={() => onEdit(post)}>Edit</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostList;