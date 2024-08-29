import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import Dashboard from './components/Dashboard';
import PostEditor from './components/PostEditor';
import PostList from './components/PostList';

function App() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Mock data for testing
    setPosts([
      { id: 1, title: 'First Post', content: 'This is the first post', status: 'published', scheduledDate: '2024-09-01T12:00', views: 100 },
      { id: 2, title: 'Second Post', content: 'This is the second post', status: 'draft', scheduledDate: '2024-08-15T09:00', views: 0 },
    ]);
  }, []);

  const handleSavePost = (newPost) => {
    if (newPost.id) {
      setPosts(posts.map(post => post.id === newPost.id ? newPost : post));
    } else {
      setPosts([...posts, { ...newPost, id: Date.now() }]);
    }
    setActiveTab('posts');
  };

  return (
    <div className="container mx-auto p-4 bg-white text-black">
      <h1 className="text-3xl font-bold mb-4">Untangle CMS</h1>
      
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard" onClick={() => setActiveTab('dashboard')}>Dashboard</TabsTrigger>
          <TabsTrigger value="posts" onClick={() => setActiveTab('posts')}>Posts</TabsTrigger>
          <TabsTrigger value="editor" onClick={() => setActiveTab('editor')}>Post Editor</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" activeValue={activeTab}>
          <Dashboard posts={posts} />
        </TabsContent>

        <TabsContent value="posts" activeValue={activeTab}>
          <PostList posts={posts} onEdit={(post) => {
            setActiveTab('editor');
          }} />
        </TabsContent>
        
        <TabsContent value="editor" activeValue={activeTab}>
          <PostEditor onSave={handleSavePost} onCancel={() => setActiveTab('posts')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;