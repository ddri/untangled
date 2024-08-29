import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Calendar, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value, icon: Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const Dashboard = ({ posts, onCreatePost, onViewAllPosts }) => {
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(post => post.status === 'published').length;
  const draftPosts = posts.filter(post => post.status === 'draft').length;
  const scheduledPosts = posts.filter(post => post.status === 'scheduled').length;

  const recentPosts = posts.slice(0, 5);  // Get the 5 most recent posts

  // Calculate total views
  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);

  // Prepare data for the chart
  const chartData = posts.map(post => ({
    name: post.title.slice(0, 20) + (post.title.length > 20 ? '...' : ''),  // Truncate long titles
    views: post.views || 0
  })).sort((a, b) => b.views - a.views).slice(0, 5);  // Sort by views and get top 5

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Posts" value={totalPosts} icon={FileText} />
        <StatCard title="Published Posts" value={publishedPosts} icon={FileText} />
        <StatCard title="Draft Posts" value={draftPosts} icon={FileText} />
        <StatCard title="Scheduled Posts" value={scheduledPosts} icon={Calendar} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentPosts.map(post => (
              <li key={post.id} className="flex justify-between items-center">
                <span>{post.title}</span>
                <span className="text-sm text-muted-foreground">{post.status}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Post Views</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button onClick={onCreatePost}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
        <Button variant="outline" onClick={onViewAllPosts}>
          View All Posts
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;