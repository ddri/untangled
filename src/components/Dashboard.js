import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Dashboard = ({ posts }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <Card>
        <CardHeader>
          <CardTitle>Post Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Posts: {posts.length}</p>
          <p>Published Posts: {posts.filter(post => post.status === 'published').length}</p>
          <p>Draft Posts: {posts.filter(post => post.status === 'draft').length}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;