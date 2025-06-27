import {
  Calendar,
  BarChart3,
  MessageSquare,
  Heart,
  Share,
  Users,
  Image as ImageIcon
} from 'lucide-react';

// Generate a random date within the last month
const randomDate = (daysBack = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  return date;
};

// Generate a random future date for scheduling
const randomFutureDate = (daysAhead = 30) => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * daysAhead));
  date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  return date;
};

// Random engagement numbers
const randomEngagement = () => ({
  likes: Math.floor(Math.random() * 1000),
  comments: Math.floor(Math.random() * 100),
  shares: Math.floor(Math.random() * 50)
});

// Mock media items
export const mockMedia = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=200',
    tags: ['teamwork', 'office', 'meeting'],
    uploadedAt: randomDate()
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=200',
    tags: ['productivity', 'coffee', 'laptop'],
    uploadedAt: randomDate()
  },
  {
    id: '3',
    type: 'image',
    url: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=200',
    tags: ['office', 'brainstorming', 'collaboration'],
    uploadedAt: randomDate()
  },
  {
    id: '4',
    type: 'image',
    url: 'https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg?auto=compress&cs=tinysrgb&w=200',
    tags: ['nature', 'mountain', 'travel'],
    uploadedAt: randomDate()
  },
  {
    id: '5',
    type: 'video',
    url: 'https://example.com/video1.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=200',
    tags: ['tutorial', 'product', 'demo'],
    uploadedAt: randomDate()
  },
  {
    id: '6',
    type: 'image',
    url: 'https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg',
    thumbnailUrl: 'https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg?auto=compress&cs=tinysrgb&w=200',
    tags: ['sunset', 'beach', 'vacation'],
    uploadedAt: randomDate()
  }
];

// Mock post data
export const mockPosts = [
  {
    id: '1',
    caption: 'Excited to share our latest product innovations with the world! #ProductLaunch #Innovation',
    hashtags: ['ProductLaunch', 'Innovation', 'Technology', 'Future'],
    media: [mockMedia[0]],
    platforms: ['instagram', 'linkedin'],
    scheduledFor: randomFutureDate(),
    status: 'scheduled',
    engagement: randomEngagement()
  },
  {
    id: '2',
    caption: 'Working from home or office? Share your preference in the comments below!',
    hashtags: ['WFH', 'RemoteWork', 'OfficeLife', 'WorkplaceFlexibility'],
    media: [mockMedia[1]],
    platforms: ['facebook', 'twitter'],
    scheduledFor: randomFutureDate(7),
    status: 'scheduled',
    engagement: randomEngagement()
  },
  {
    id: '3',
    caption: 'Our team brainstorming the next big thing. Stay tuned for exciting updates!',
    hashtags: ['TeamWork', 'Innovation', 'Collaboration', 'StartupLife'],
    media: [mockMedia[2]],
    platforms: ['instagram', 'linkedin', 'facebook'],
    scheduledFor: new Date(new Date().setDate(new Date().getDate() - 2)),
    status: 'published',
    engagement: randomEngagement()
  },
  {
    id: '4',
    caption: 'Nature inspires our creativity. Taking time to disconnect and recharge.',
    hashtags: ['Inspiration', 'NatureLovers', 'Mindfulness', 'CreativeProcess'],
    media: [mockMedia[3]],
    platforms: ['instagram'],
    scheduledFor: new Date(new Date().setDate(new Date().getDate() - 5)),
    status: 'published',
    engagement: randomEngagement()
  },
  {
    id: '5',
    caption: 'Check out our quick tutorial on maximizing productivity with our tool!',
    hashtags: ['Tutorial', 'Productivity', 'LifeHacks', 'TimeManagement'],
    media: [mockMedia[4]],
    platforms: ['youtube', 'linkedin', 'facebook'],
    scheduledFor: randomFutureDate(3),
    status: 'draft',
    engagement: randomEngagement()
  }
];

// Mock team members
export const mockTeamMembers = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'admin',
    lastActive: new Date()
  },
  {
    id: '2',
    name: 'Sam Reynolds',
    email: 'sam@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'editor',
    lastActive: new Date(new Date().setHours(new Date().getHours() - 2))
  },
  {
    id: '3',
    name: 'Taylor Kim',
    email: 'taylor@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'editor',
    lastActive: new Date(new Date().setDate(new Date().getDate() - 1))
  },
  {
    id: '4',
    name: 'Jordan Patel',
    email: 'jordan@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    role: 'viewer',
    lastActive: new Date(new Date().setDate(new Date().getDate() - 3))
  }
];

// Mock analytics data
export const mockAnalyticsData = [
  { period: 'Monday', engagementRate: 4.2, reach: 2410, impressions: 3250, clicks: 187 },
  { period: 'Tuesday', engagementRate: 3.8, reach: 2100, impressions: 2900, clicks: 162 },
  { period: 'Wednesday', engagementRate: 5.1, reach: 2800, impressions: 3600, clicks: 215 },
  { period: 'Thursday', engagementRate: 4.5, reach: 2500, impressions: 3300, clicks: 195 },
  { period: 'Friday', engagementRate: 6.2, reach: 3200, impressions: 4100, clicks: 278 },
  { period: 'Saturday', engagementRate: 7.8, reach: 3950, impressions: 5200, clicks: 342 },
  { period: 'Sunday', engagementRate: 6.5, reach: 3400, impressions: 4500, clicks: 310 }
];

// Mock AI recommendations
export const mockAIRecommendations = [
  {
    id: '1',
    type: 'timing',
    content: 'Consider scheduling your Instagram posts between 7-9pm for 22% better engagement.',
    reason: 'Based on your audience activity patterns and industry benchmarks.'
  },
  {
    id: '2',
    type: 'hashtag',
    content: '#WorkFromAnywhere and #DigitalNomad are trending in your industry.',
    reason: 'These hashtags have shown 35% more engagement in the past week.'
  },
  {
    id: '3',
    type: 'caption',
    content: 'Try asking questions in your captions to increase comment engagement.',
    reason: 'Posts with questions receive 40% more comments on average.'
  },
  {
    id: '4',
    type: 'content',
    content: 'Your carousel posts are outperforming single image posts by 17%.',
    reason: 'Consider creating more multi-slide content for better engagement.'
  }
];

// Dashboard metrics
export const mockMetrics = [
  {
    label: 'Total Posts',
    value: mockPosts.length,
    change: 12.5,
    icon: 'Calendar'
  },
  {
    label: 'Engagement Rate',
    value: '5.4%',
    change: 3.2,
    icon: 'BarChart3'
  },
  {
    label: 'Comments',
    value: 342,
    change: 18.7,
    icon: 'MessageSquare'
  },
  {
    label: 'Likes',
    value: '2.4K',
    change: 7.3,
    icon: 'Heart'
  },
  {
    label: 'Shares',
    value: 876,
    change: -2.1,
    icon: 'Share'
  }
];

// Platform data for dropdown/selection
export const platforms = [
  { id: 'instagram', name: 'Instagram', color: 'bg-pink-500' },
  { id: 'twitter', name: 'Twitter', color: 'bg-blue-400' },
  { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700' },
  { id: 'facebook', name: 'Facebook', color: 'bg-blue-600' }
];

// Function to get icon component by name
export const getIconByName = (name) => {
  const icons = {
    Calendar,
    BarChart3,
    MessageSquare,
    Heart,
    Share,
    Users,
    ImageIcon
  };

  return icons[name] || Calendar;
};
