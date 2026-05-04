export const SKILLS_LIST = [
  'Web Development', 'UI/UX Design', 'Graphic Design', 'Content Writing',
  'Video Editing', 'Photography', 'Social Media', 'Data Analysis',
  'Mobile Apps', 'Python', 'React', 'Illustration', 'SEO', 'Copywriting'
];

export const CATEGORIES = ['All', 'Design', 'Development', 'Writing', 'Marketing', 'Video', 'Data'];

export const MOCK_FREELANCERS = [
  {
    id: 1, name: 'Arjun Mehta', rollNo: 'CE24B041',
    avatar: 'AM', avatarColor: '#c8f135',
    title: 'Full-Stack Developer', rating: 4.9, reviews: 14,
    skills: ['React', 'Web Development', 'Python'], hourlyRate: 350,
    bio: 'Building fast, clean web apps. Available for projects big or small.',
    category: 'Development', completedProjects: 18,
  },
  {
    id: 2, name: 'Priya Sharma', rollNo: 'CE24B048',
    avatar: 'PS', avatarColor: '#ffd4a3',
    title: 'UI/UX & Brand Designer', rating: 5.0, reviews: 9,
    skills: ['UI/UX Design', 'Figma', 'Illustration'], hourlyRate: 400,
    bio: 'Crafting intuitive interfaces with a strong visual identity.',
    category: 'Design', completedProjects: 12,
  },
  {
    id: 3, name: 'Karthik Rajan', rollNo: 'CE24B073',
    avatar: 'KR', avatarColor: '#b5d5ff',
    title: 'Content Writer & Copywriter', rating: 4.8, reviews: 21,
    skills: ['Content Writing', 'Copywriting', 'SEO'], hourlyRate: 250,
    bio: 'Words that convert. SEO-optimised content for brands and startups.',
    category: 'Writing', completedProjects: 31,
  },
  {
    id: 4, name: 'Sneha Iyer', rollNo: 'CE24B076',
    avatar: 'SI', avatarColor: '#ffc8d4',
    title: 'Video Editor & Animator', rating: 4.7, reviews: 7,
    skills: ['Video Editing', 'After Effects', 'Social Media'], hourlyRate: 500,
    bio: 'Reels, YouTube edits, motion graphics — tell your story visually.',
    category: 'Video', completedProjects: 9,
  },
  {
    id: 5, name: 'Dev Patel', rollNo: 'CE24B080',
    avatar: 'DP', avatarColor: '#d4c8ff',
    title: 'Data Analyst', rating: 4.6, reviews: 5,
    skills: ['Data Analysis', 'Python', 'Tableau'], hourlyRate: 450,
    bio: 'Turning raw data into decisions. Dashboards, models, insights.',
    category: 'Data', completedProjects: 7,
  },
  {
    id: 6, name: 'Ananya Krishnan', rollNo: 'CE24B085',
    avatar: 'AK', avatarColor: '#c8f5d4',
    title: 'Social Media & Marketing', rating: 4.9, reviews: 16,
    skills: ['Social Media', 'Graphic Design', 'Copywriting'], hourlyRate: 300,
    bio: 'Grew 3 campus clubs to 10k+ followers. Let me grow your brand.',
    category: 'Marketing', completedProjects: 22,
  },
];

export const MOCK_PROJECTS = [
  {
    id: 1, title: 'Landing Page for EdTech Startup',
    client: 'BrightLearn', budget: 8000, deadline: '7 days',
    category: 'Development', skills: ['React', 'Web Development'],
    description: 'We need a clean, conversion-focused landing page built in React with animations. Mobile-first.',
    applicants: 4, postedAgo: '2h ago',
  },
  {
    id: 2, title: 'Brand Identity for Food Stall',
    client: 'Tiffin Express', budget: 5000, deadline: '5 days',
    category: 'Design', skills: ['Graphic Design', 'Illustration'],
    description: 'Logo, color palette, packaging design for a campus food stall. Fun and approachable vibe.',
    applicants: 7, postedAgo: '5h ago',
  },
  {
    id: 3, title: '4 Instagram Reels per Month',
    client: 'FitClub IIT', budget: 3000, deadline: 'Ongoing',
    category: 'Video', skills: ['Video Editing', 'Social Media'],
    description: 'Looking for a video editor to create 4 monthly reels for our gym club. Trendy transitions.',
    applicants: 2, postedAgo: '1d ago',
  },
  {
    id: 4, title: 'SEO Blog Articles (5 posts)',
    client: 'StudyHacks Blog', budget: 4500, deadline: '10 days',
    category: 'Writing', skills: ['Content Writing', 'SEO'],
    description: '5 well-researched, SEO-optimised blog posts on productivity and student life. 800–1000 words each.',
    applicants: 11, postedAgo: '3h ago',
  },
  {
    id: 5, title: 'Sales Dashboard in Tableau',
    client: 'Campus Store Co.', budget: 6000, deadline: '6 days',
    category: 'Data', skills: ['Data Analysis', 'Tableau'],
    description: 'Build an interactive Tableau dashboard from our sales CSV. Need filters, trends, top SKUs.',
    applicants: 3, postedAgo: '12h ago',
  },
  {
    id: 6, title: 'WhatsApp Campaign Strategy',
    client: 'E-Cell IIT', budget: 2500, deadline: '4 days',
    category: 'Marketing', skills: ['Social Media', 'Copywriting'],
    description: 'Plan and write a 2-week WhatsApp broadcast campaign for our startup weekend event.',
    applicants: 6, postedAgo: '20h ago',
  },
];

export const TICKER_ITEMS = [
  '🎓 50+ Student Freelancers',
  '💼 Active Projects Available',
  '⚡ Same-Day Responses',
  '🏅 100% Campus Verified',
  '🤝 Trusted by 20+ Clients',
  '🚀 Post a Project Free',
];
