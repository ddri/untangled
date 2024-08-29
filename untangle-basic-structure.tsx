import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostEditor from './PostEditor';
import PostList from './PostList';
import Dashboard from './Dashboard';

// Mock API functions (unchanged)
const mockFetchPosts = () => Promise.resolve([
  { id: 1, title: 'First Post', content: 'This is the first post', status: 'published', scheduledDate: '2024-09-01T12:00', views: 100 },
  { id: 2, title: 'Second Post', content: 'This is the second post', status: 'draft', scheduledDate: '2024-08-15T09:00', views: 0 },
  { id: 3, title: 'Third Post', content: 'This is the third post', status: 'scheduled', scheduledDate: '2024-10-01T10:00', views: 0 },
]);

const mockCreatePost = (post) => Promise.resolve({ ...post, id: Date.now(), views: 0 });
const mockUpdatePost = (post) => Promise.resolve(post);
const mockDeletePost = (id) => Promise.resolve(id);

const Untangle = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    mockFetchPosts().then(setPosts);
  }, []);

  const handleSavePost = (post) => {
    if (post.id) {
      mockUpdatePost(post).then(updated => {
        setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
        setEditingPost(null);
        setActiveTab('posts');
      });
    } else {
      mockCreatePost(post).then(created => {
        setPosts(prev => [...prev, created]);
        setEditingPost(null);
        setActiveTab('posts');
      });
    }
  };

  const handleDeletePost = (id) => {
    mockDeletePost(id).then(() => {
      setPosts(prev => prev.filter(p => p.id !== id));
    });
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setActiveTab('editor');
  };

  const handleViewAllPosts = () => {
    setActiveTab('posts');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Untangle CMS</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="editor">Post Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <Dashboard 
            posts={posts}
            onCreatePost={handleCreatePost}
            onViewAllPosts={handleViewAllPosts}
          />
        </TabsContent>

        <TabsContent value="posts">
          <PostList 
            posts={posts} 
            onEdit={(post) => { setEditingPost(post); setActiveTab('editor'); }} 
            onDelete={handleDeletePost} 
          />
        </TabsContent>
        
        <TabsContent value="editor">
          <PostEditor 
            post={editingPost} 
            onSave={handleSavePost} 
            onCancel={() => setActiveTab('posts')} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Untangle;