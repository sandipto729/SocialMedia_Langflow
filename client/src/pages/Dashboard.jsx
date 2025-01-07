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
import SummaryApi from "../common";

import Chart from "react-apexcharts";

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
              <SelectItem value="reel">Reel</SelectItem>
              <SelectItem value="carousel">Carousel</SelectItem>
              <SelectItem value="static_image">Static Iamge</SelectItem>
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

  const postDistributionOptions = {
    chart: {
      type: 'pie',
    },
    labels: data.postDistribution.map(item => item.name),
    colors: COLORS,
    legend: {
      position: 'bottom',
    },
  };

  const postDistributionSeries = data.postDistribution.map(item => item.value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Engagement</CardTitle>
          <CardDescription>All-time totals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">likes</p>
                <p className="text-2xl font-bold">
                  {data.totals.likes.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">shares</p>
                <p className="text-2xl font-bold">
                  {data.totals.shares.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">comments</p>
                <p className="text-2xl font-bold">
                  {data.totals.comments.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Post Distribution</CardTitle>
          <CardDescription>Breakdown by post type</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart
            options={postDistributionOptions}
            series={postDistributionSeries}
            type="pie"
            height={200}
          />
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
                  <span>{item.rate}%</span>
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

      
    </div>
  );
};



//TypeComparisonChart Component

const TypeComparisonChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 400,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: data.map(item => item.type),
    },
    yaxis: {
      title: {
        text: 'Engagement'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        }
      }
    }
  };

  const chartSeries = [
    {
      name: 'Likes',
      data: data.map(item => item.likes)
    },
    {
      name: 'Shares',
      data: data.map(item => item.shares)
    },
    {
      name: 'Comments',
      data: data.map(item => item.comments)
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Post Type Comparison</CardTitle>
        <CardDescription>Average engagement by post type</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={400}
        />
      </CardContent>
    </Card>
  );
};

// PerformanceChart Component
const PerformanceChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      height: 400,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: data.map(item => item.date),
    },
    yaxis: {
      title: {
        text: 'Engagement',
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    colors: ['#FF4560', '#00E396', '#008FFB'],
  };

  const chartSeries = [
    {
      name: 'Likes',
      data: data.map(item => item.likes),
    },
    {
      name: 'Shares',
      data: data.map(item => item.shares),
    },
    {
      name: 'Comments',
      data: data.map(item => item.comments),
    },
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Post Performance Over Time</CardTitle>
        <CardDescription>Daily engagement metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={400}
        />
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
                <th className="p-2 text-right">likes</th>
                <th className="p-2 text-right">shares</th>
                <th className="p-2 text-right">comments</th>
                <th className="p-2 text-right">Average Sentiment Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((post) => (
                <tr key={post.post_id} className="border-b">
                  <td className="p-2">{post._id}</td>
                  <td className="p-2">{post.post_type}</td>
                  <td className="p-2">{post.date}</td>
                  <td className="p-2 text-right">
                    {post.likes.toLocaleString()}
                  </td>
                  <td className="p-2 text-right">
                    {post.shares.toLocaleString()}
                  </td>
                  <td className="p-2 text-right">
                    {post.comments.toLocaleString()}
                  </td>
                  <td className="p-2 text-right">
                    {post.avg_sentiment_score.toFixed(2)}
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

  const [mockPosts, setMockPosts] = useState([]); 
  const [state, setState] = useState({
    posts: [], 
    dateRange: ["2024-01-01", "2025-03-31"],
    selectedPostTypes: "all",
    search: "",
  });

  // Fetch data from API and update both mockPosts and state.posts
  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch(SummaryApi.FetchData.url, {
        method: SummaryApi.FetchData.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("Fetched data:", data);
      setMockPosts(data); 
      setState((prevState) => ({ ...prevState, posts: data }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  // Filter posts based on date range, type, and search criteria
  
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    console.log('Filtering with:', state.dateRange, state.selectedPostTypes, state.search);
    console.log('Posts:', state.posts); // Log the posts to see their structure

    const newFilteredPosts = state.posts.filter((post) => {
      const withinDateRange =
        post.date >= state.dateRange[0] && post.date <= state.dateRange[1];
      const matchesType =
        state.selectedPostTypes === 'all' ||
        post.post_type === state.selectedPostTypes;
      const matchesSearch = state.search
        ? post.post_id.toLowerCase().includes(state.search.toLowerCase()) ||
          post.post_type.toLowerCase().includes(state.search.toLowerCase())
        : true;

      console.log(`Post ${post.post_id} matches filtering criteria?`, withinDateRange, matchesType, matchesSearch);

      return withinDateRange && matchesType && matchesSearch;
    });

    setFilteredPosts(newFilteredPosts);
  }, [state.posts, state.dateRange, state.selectedPostTypes, state.search]); // Re-run the effect when any of these change

  // Now you can use filteredPosts in your component
  // console.log('filteredPosts', filteredPosts);


  // Aggregated data for engagement summary and type comparison
  const aggregatedData = useMemo(() => {
    const postCounts = {
      reel: 0,
      carousel: 0,
      static_image: 0,
    };
  
    const totalEngagement = {
      reel: { likes: 0, shares: 0, comments: 0, count: 0 },
      carousel: { likes: 0, shares: 0, comments: 0, count: 0 },
      static_image: { likes: 0, shares: 0, comments: 0, count: 0 },
    };
  
    let totals = { likes: 0, shares: 0, comments: 0 };
  
    // Process filtered posts
    console.log("filteredPosts", filteredPosts);
    filteredPosts.forEach((post) => {
      console.log("post", post);
  
      // Check if post type exists in totalEngagement, initialize if missing
      if (!totalEngagement[post.post_type]) {
        totalEngagement[post.post_type] = { likes: 0, shares: 0, comments: 0, count: 0 };
      }
  
      postCounts[post.post_type]++;
      totalEngagement[post.post_type].likes += post.likes;
      totalEngagement[post.post_type].shares += post.shares;
      totalEngagement[post.post_type].comments += post.comments;
      totalEngagement[post.post_type].count++;
  
      totals.likes += post.likes;
      totals.shares += post.shares;
      totals.comments += post.comments;
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
      const date = post.date;
      if (!dateMap.has(date)) {
        dateMap.set(date, { date, likes: 0, shares: 0, comments: 0 });
      }
      const dayData = dateMap.get(date);
      dayData.likes += post.likes;
      dayData.shares += post.shares;
      dayData.comments += post.comments;
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
      ["Post ID", "Type", "Date", "likes", "shares", "comments"].join(","),
      ...filteredPosts.map((post) =>
        [
          post._id,
          post.post_type,
          post.date,
          post.likes,
          post.shares,
          post.comments,
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
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
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

          <TypeComparisonChart data={aggregatedData.typeComparison} />
          <PerformanceChart data={aggregatedData.performanceData} />

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
