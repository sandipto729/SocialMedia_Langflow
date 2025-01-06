import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  Download,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Search,
  Film,
  Image as ImageIcon,
  Images,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import EnhancedChatClient from "./EnhancedChatClient";

// Generate more realistic mock data
const generateMockData = () => {
  const startDate = new Date("2024-01-01");
  const endDate = new Date("2024-03-31");
  const posts = [];
  const postTypes = ["Reel", "Carousel", "Static"];

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const numPosts = Math.floor(Math.random() * 3) + 1; // 1-3 posts per day

    for (let i = 0; i < numPosts; i++) {
      const postType = postTypes[Math.floor(Math.random() * postTypes.length)];
      const baseEngagement = {
        Reel: { likes: [800, 2000], shares: [100, 500], comments: [50, 300] },
        Carousel: {
          likes: [500, 1500],
          shares: [80, 300],
          comments: [30, 200],
        },
        Static: { likes: [300, 1000], shares: [50, 200], comments: [20, 150] },
      }[postType];

      const randomInRange = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

      posts.push({
        Post_ID: `${date.toISOString().split("T")[0]}-${i + 1}`,
        Post_Type: postType,
        Likes: randomInRange(baseEngagement.likes[0], baseEngagement.likes[1]),
        Shares: randomInRange(
          baseEngagement.shares[0],
          baseEngagement.shares[1]
        ),
        Comments: randomInRange(
          baseEngagement.comments[0],
          baseEngagement.comments[1]
        ),
        Date_Posted: date.toISOString().split("T")[0],
      });
    }
  }

  return posts;
};

const mockPosts = generateMockData();

// DateRangePicker Component
const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background"
        />
      </div>
      <span className="text-muted-foreground">to</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        className="px-3 py-2 border rounded-md bg-background"
      />
    </div>
  );
};

// DashboardHeader Component
const DashboardHeader = ({
  dateRange,
  setDateRange,
  selectedTypes,
  setSelectedTypes,
  onRefresh,
  onExport,
}) => {
  return (
    <div className="p-4 space-y-4 bg-card rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <DateRangePicker
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onStartDateChange={(date) => setDateRange([date, dateRange[1]])}
          onEndDateChange={(date) => setDateRange([dateRange[0], date])}
        />
        <div className="flex gap-2">
          <Select
            value={selectedTypes}
            onValueChange={(value) => setSelectedTypes(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Post Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Reel">Reel</SelectItem>
              <SelectItem value="Carousel">Carousel</SelectItem>
              <SelectItem value="Static">Static</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onExport}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// PerformanceCards Component
const PerformanceCards = ({ data }) => {
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
  ];

  const getPostTypeIcon = (type) => {
    switch (type) {
      case "Reel":
        return <Film className="h-4 w-4" />;
      case "Carousel":
        return <Images className="h-4 w-4" />;
      case "Static":
        return <ImageIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Post Distribution</CardTitle>
          <CardDescription>Breakdown by post type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data.postDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="hsl(var(--chart-1))">
                {data.postDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Summary</CardTitle>
          <CardDescription>Average engagement by type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.engagementSummary.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getPostTypeIcon(item.type)}
                  <span>{item.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{item.rate.toFixed(1)}%</span>
                  {item.trend > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Engagement</CardTitle>
          <CardDescription>All-time totals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Likes</p>
                <p className="text-2xl font-bold">
                  {data.totals.likes.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shares</p>
                <p className="text-2xl font-bold">
                  {data.totals.shares.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Comments</p>
                <p className="text-2xl font-bold">
                  {data.totals.comments.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// PerformanceChart Component
const PerformanceChart = ({ data }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Post Performance Over Time</CardTitle>
        <CardDescription>Daily engagement metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="likes"
              stroke="hsl(var(--chart-1))"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="shares"
              stroke="hsl(var(--chart-2))"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="comments"
              stroke="hsl(var(--chart-3))"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// TypeComparisonChart Component
const TypeComparisonChart = ({ data }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Post Type Comparison</CardTitle>
        <CardDescription>Average engagement by post type</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="likes" fill="hsl(var(--chart-1))" />
            <Bar dataKey="shares" fill="hsl(var(--chart-2))" />
            <Bar dataKey="comments" fill="hsl(var(--chart-3))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// DataGrid Component
const DataGrid = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Details</CardTitle>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search posts..."
            className="max-w-sm"
            type="search"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-2 text-left">Post ID</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-right">Likes</th>
                <th className="p-2 text-right">Shares</th>
                <th className="p-2 text-right">Comments</th>
                <th className="p-2 text-right">Engagement Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.map((post) => (
                <tr key={post.Post_ID} className="border-b">
                  <td className="p-2">{post.Post_ID}</td>
                  <td className="p-2">{post.Post_Type}</td>
                  <td className="p-2">{post.Date_Posted}</td>
                  <td className="p-2 text-right">
                    {post.Likes.toLocaleString()}
                  </td>
                  <td className="p-2 text-right">
                    {post.Shares.toLocaleString()}
                  </td>
                  <td className="p-2 text-right">
                    {post.Comments.toLocaleString()}
                  </td>
                  <td className="p-2 text-right">
                    {(
                      ((post.Likes + post.Shares + post.Comments) /
                        (post.Likes + post.Shares + post.Comments)) *
                      100
                    ).toFixed(1)}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [state, setState] = useState({
    posts: mockPosts,
    dateRange: ["2024-01-01", "2024-03-31"],
    selectedPostTypes: "all",
    search: "",
  });

  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      const withinDateRange =
        post.Date_Posted >= state.dateRange[0] &&
        post.Date_Posted <= state.dateRange[1];
      const matchesType =
        state.selectedPostTypes === "all" ||
        post.Post_Type === state.selectedPostTypes;
      const matchesSearch = state.search
        ? post.Post_ID.toLowerCase().includes(state.search.toLowerCase()) ||
          post.Post_Type.toLowerCase().includes(state.search.toLowerCase())
        : true;
      return withinDateRange && matchesType && matchesSearch;
    });
  }, [state.dateRange, state.selectedPostTypes, state.search]);

  const aggregatedData = useMemo(() => {
    const postCounts = {
      Reel: 0,
      Carousel: 0,
      Static: 0,
    };

    const totalEngagement = {
      Reel: { likes: 0, shares: 0, comments: 0, count: 0 },
      Carousel: { likes: 0, shares: 0, comments: 0, count: 0 },
      Static: { likes: 0, shares: 0, comments: 0, count: 0 },
    };

    let totals = { likes: 0, shares: 0, comments: 0 };

    // Process filtered posts
    filteredPosts.forEach((post) => {
      postCounts[post.Post_Type]++;
      totalEngagement[post.Post_Type].likes += post.Likes;
      totalEngagement[post.Post_Type].shares += post.Shares;
      totalEngagement[post.Post_Type].comments += post.Comments;
      totalEngagement[post.Post_Type].count++;

      totals.likes += post.Likes;
      totals.shares += post.Shares;
      totals.comments += post.Comments;
    });

    // Calculate averages and trends
    const calculateEngagementRate = (type) => {
      if (totalEngagement[type].count === 0) return 0;
      const total =
        totalEngagement[type].likes +
        totalEngagement[type].shares +
        totalEngagement[type].comments;
      return (total / (totalEngagement[type].count * 3)) * 100;
    };

    // Prepare chart data
    const performanceData = [];
    const dateMap = new Map();

    filteredPosts.forEach((post) => {
      const date = post.Date_Posted;
      if (!dateMap.has(date)) {
        dateMap.set(date, { date, likes: 0, shares: 0, comments: 0 });
      }
      const dayData = dateMap.get(date);
      dayData.likes += post.Likes;
      dayData.shares += post.Shares;
      dayData.comments += post.Comments;
    });

    const sortedDates = Array.from(dateMap.values()).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    return {
      postDistribution: Object.entries(postCounts).map(([name, value]) => ({
        name,
        value,
      })),
      engagementSummary: Object.keys(totalEngagement).map((type) => ({
        type,
        rate: calculateEngagementRate(type),
        trend: Math.random() > 0.5 ? 1 : -1, // Simplified trend calculation
      })),
      performanceData: sortedDates,
      typeComparison: Object.entries(totalEngagement).map(([type, data]) => ({
        type,
        likes: data.count ? Math.round(data.likes / data.count) : 0,
        shares: data.count ? Math.round(data.shares / data.count) : 0,
        comments: data.count ? Math.round(data.comments / data.count) : 0,
      })),
      totals,
    };
  }, [filteredPosts]);

  const handleRefresh = () => {
    // In a real app, this would fetch new data from the API
    setState((prev) => ({ ...prev, posts: generateMockData() }));
  };

  const handleExport = () => {
    // Create CSV content
    const csvContent = [
      ["Post ID", "Type", "Date", "Likes", "Shares", "Comments"].join(","),
      ...filteredPosts.map((post) =>
        [
          post.Post_ID,
          post.Post_Type,
          post.Date_Posted,
          post.Likes,
          post.Shares,
          post.Comments,
        ].join(",")
      ),
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "social-media-analytics.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [chatExpanded, setChatExpanded] = useState(false);

  // Function to handle AI button click
  const handleAiButtonClick = () => {
    setChatExpanded(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link
              to={"/"}
              className="text-2xl font-bold text-primary-600 cursor-pointer flex gap-4 justify-center items-center">
              <img src="/insightly.svg" alt="Logo" className="h-10" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Button
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                onClick={handleAiButtonClick}>
                Get Answers with Ai!
              </Button>
            </div>
          </nav>
        </div>
      </header>
      <div className="min-h-screen bg-background p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto space-y-6 mt-16">
          <DashboardHeader
            dateRange={state.dateRange}
            setDateRange={(range) =>
              setState((prev) => ({ ...prev, dateRange: range }))
            }
            selectedTypes={state.selectedPostTypes}
            setSelectedTypes={(types) =>
              setState((prev) => ({ ...prev, selectedPostTypes: types }))
            }
            onRefresh={handleRefresh}
            onExport={handleExport}
          />

          <PerformanceCards
            data={{
              postDistribution: aggregatedData.postDistribution,
              engagementSummary: aggregatedData.engagementSummary,
              totals: aggregatedData.totals,
            }}
          />

          <PerformanceChart data={aggregatedData.performanceData} />

          <TypeComparisonChart data={aggregatedData.typeComparison} />

          <DataGrid data={filteredPosts} />
        </motion.div>
        <EnhancedChatClient
          isExpanded={chatExpanded}
          setIsExpanded={setChatExpanded}
        />
      </div>
      <div className="pt-12">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
