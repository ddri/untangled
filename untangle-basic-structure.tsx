import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock API functions
const mockFetchPosts = () => Promise.resolve([
  { id: 1, title: 'First Post', content: 'This is the first post', status: 'draft', scheduledDate: '2024-09-01T12:00', views: 0, tags: ['React', 'JavaScript'] },
  { id: 2, title: 'Second Post', content: 'This is the second post', status: 'published', scheduledDate: '2024-08-15T09:00', views: 150, tags: ['Node.js', 'API'] },
]);

const mockCreatePost = (post) => Promise.resolve({ ...post, id: Date.now(), views: 0 });
const mockUpdatePost = (post) => Promise.resolve(post);
const mockDeletePost = (id) => Promise.resolve(id);

// Custom Rich Text Editor Hook
const useRichTextEditor = (initialValue = '') => {
  const [content, setContent] = useState(initialValue);
  const editorRef = useRef(null);

  const handleBold = () => {
    document.execCommand('bold', false, null);
  };

  const handleItalic = () => {
    document.execCommand('italic', false, null);
  };

  const handleUnderline = () => {
    document.execCommand('underline', false, null);
  };

  return {
    content,
    setContent,
    editorRef,
    handleBold,
    handleItalic,
    handleUnderline,
  };
};

const RichTextEditor = ({ value, onChange }) => {
  const { content, setContent, editorRef, handleBold, handleItalic, handleUnderline } = useRichTextEditor(value);

  useEffect(() => {
    onChange(content);
  }, [content, onChange]);

  return (
    <div className="border rounded-md p-2">
      <div className="mb-2">
        <Button type="button" onClick={handleBold} className="mr-2">B</Button>
        <Button type="button" onClick={handleItalic} className="mr-2">I</Button>
        <Button type="button" onClick={handleUnderline}>U</Button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] p-2 border rounded-md"
        onInput={(e) => setContent(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

const PostForm = ({ post, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(post || { title: '', content: '', status: 'draft', scheduledDate: '', tags: [] });
  const [newTag, setNewTag] = useState('');

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="title"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Post Title"
        required
      />
      <RichTextEditor
        value={formData.content}
        onChange={(content) => handleChange('content', content)}
      />
      <Select 
        value={formData.status} 
        onValueChange={(value) => handleChange('status', value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="published">Published</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="datetime-local"
        name="scheduledDate"
        value={formData.scheduledDate}
        onChange={(e) => handleChange('scheduledDate', e.target.value)}
        required
      />
      <div>
        <div className="flex space-x-2 mb-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
          />
          <Button type="button" onClick={handleAddTag}>Add Tag</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map(tag => (
            <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 text-red-500">&times;</button>
            </span>
          ))}
        </div>
      </div>
      <div className="flex space-x-2">
        <Button type="submit">Save</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

const PostList = ({ posts, onEdit, onDelete }) => (
  <div className="space-y-4">
    {posts.map(post => (
      <Card key={post.id}>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <p className="text-sm text-gray-500 mt-2">Status: {post.status}</p>
          <p className="text-sm text-gray-500">Scheduled for: {post.scheduledDate}</p>
          <p className="text-sm text-gray-500">Views: {post.views}</p>
          <div className="mt-2">
            {post.tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2">{tag}</span>
            ))}
          </div>
          <div className="flex space-x-2 mt-2">
            <Button onClick={() => onEdit(post)}>Edit</Button>
            <Button variant="destructive" onClick={() => onDelete(post.id)}>Delete</Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const CalendarView = ({ posts }) => {
  const [date, setDate] = useState(new Date());

  const scheduledPosts = posts.filter(post => {
    const postDate = new Date(post.scheduledDate);
    return postDate.getFullYear() === date.getFullYear() &&
           postDate.getMonth() === date.getMonth() &&
           postDate.getDate() === date.getDate();
  });

  return (
    <div className="flex space-x-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <div>
        <h3 className="text-lg font-semibold mb-2">Scheduled Posts for {date.toDateString()}</h3>
        {scheduledPosts.map(post => (
          <Card key={post.id} className="mb-2">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Scheduled for: {new Date(post.scheduledDate).toLocaleTimeString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AnalyticsDashboard = ({ posts }) => {
  const viewData = posts.map(post => ({
    name: post.title,
    views: post.views
  }));

  const tagData = posts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const pieData = Object.entries(tagData).map(([name, value]) => ({ name, value }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Post Views</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={viewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tag Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

const Untangle = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    mockFetchPosts().then(setPosts);
  }, []);

  const handleCreatePost = (newPost) => {
    mockCreatePost(newPost).then(createdPost => {
      setPosts(prev => [...prev, createdPost]);
      setEditingPost(null);
    });
  };

  const handleUpdatePost = (updatedPost) => {
    mockUpdatePost(updatedPost).then(updated => {
      setPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
      setEditingPost(null);
    });
  };

  const handleDeletePost = (id) => {
    mockDeletePost(id).then(() => {
      setPosts(prev => prev.filter(p => p.id !== id));
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Untangle CMS</h1>
      
      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="create">Create Post</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts">
          <PostList 
            posts={posts} 
            onEdit={setEditingPost} 
            onDelete={handleDeletePost} 
          />
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</CardTitle>
            </CardHeader>
            <CardContent>
              <PostForm 
                post={editingPost} 
                onSubmit={editingPost ? handleUpdatePost : handleCreatePost} 
                onCancel={() => setEditingPost(null)} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarView posts={posts} />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard posts={posts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Untangle;
