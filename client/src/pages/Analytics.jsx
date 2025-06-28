import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import {
  Calendar,
  Download,
  BarChart,
  PieChart,
  LineChart,
  ArrowUpRight,
  ExternalLink,
  Share2,
} from "lucide-react";
import { mockAnalyticsData, mockPosts, platforms } from "../utils/mockData";
import axios from "axios";

const Analytics = () => {
  const [dateRange, setDateRange] = useState("7days");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [analyticsData, setAnalyticsData] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  // Helper to get latest posts with engagement
  const getRecentPostsWithEngagement = () => {
     return [...recentPosts]
      .filter((post) => post.status === "published" && post.engagement)
      .sort(
        (a, b) =>
          new Date(b.scheduledFor).getTime() -
          new Date(a.scheduledFor).getTime()
      )
      .slice(0, 5);
  };

  // Get platform color
  const getPlatformColor = (platformId) => {
    const platform = platforms.find((p) => p.id === platformId);
    return platform ? platform.color : "bg-gray-500";
  };

  /**
 * useEffect hook to fetch analytics and recent published posts data on component mount.
 *
 * - fetchAnalytics: Retrieves analytics data from the backend API using the stored JWT token,
 *   and updates the `analyticsData` state. Logs an error to the console if the request fails.
 * - fetchPosts: Retrieves all posts from the backend API using the stored JWT token,
 *   filters for published posts, and updates the `recentPosts` state. Logs an error to the console if the request fails.
 *
 * This effect runs only once when the component mounts.
 */
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://trendsync-1d7b.onrender.com/api/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalyticsData(res.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://trendsync-1d7b.onrender.com/api/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const publishedPosts = res.data.filter(
          (post) => post.status === "published"
        );
        setRecentPosts(publishedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchAnalytics();
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      {/* Filters and Date Range */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              className={`px-3 py-1.5 text-sm rounded-md ${
                dateRange === "7days"
                  ? "bg-white shadow-sm font-medium"
                  : "text-gray-600"
              }`}
              onClick={() => setDateRange("7days")}
            >
              Last 7 days
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-md ${
                dateRange === "30days"
                  ? "bg-white shadow-sm font-medium"
                  : "text-gray-600"
              }`}
              onClick={() => setDateRange("30days")}
            >
              Last 30 days
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-md ${
                dateRange === "custom"
                  ? "bg-white shadow-sm font-medium"
                  : "text-gray-600"
              }`}
              onClick={() => setDateRange("custom")}
            >
              Custom
            </button>
          </div>

          {dateRange === "custom" && (
            <div className="flex ml-3">
              <input
                type="date"
                className="p-1.5 border border-gray-300 rounded-md text-sm"
              />
              <span className="mx-2 text-gray-400 self-center">-</span>
              <input
                type="date"
                className="p-1.5 border border-gray-300 rounded-md text-sm"
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <select
            className="text-sm border border-gray-300 rounded-md p-1.5"
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
          >
            <option value="all">All Platforms</option>
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>

          <Button variant="outline" size="sm" icon={<Download size={16} />}>
            Export
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="Total Reach"
          className="bg-gradient-to-br from-blue-50 to-white"
        >
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">18.4K</h3>
              <p className="flex items-center text-sm text-green-600 font-medium mt-1">
                <ArrowUpRight size={16} className="mr-1" />
                8.2% vs previous period
              </p>
            </div>
            <div className="flex-shrink-0">
              <BarChart size={48} className="text-blue-200" />
            </div>
          </div>
        </Card>

        <Card
          title="Engagement Rate"
          className="bg-gradient-to-br from-blue-50 to-white"
        >
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">5.2%</h3>
              <p className="flex items-center text-sm text-green-600 font-medium mt-1">
                <ArrowUpRight size={16} className="mr-1" />
                1.3% vs previous period
              </p>
            </div>
            <div className="flex-shrink-0">
              <PieChart size={48} className="text-blue-200" />
            </div>
          </div>
        </Card>

        <Card
          title="Link Clicks"
          className="bg-gradient-to-br from-blue-50 to-white"
        >
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">924</h3>
              <p className="flex items-center text-sm text-red-600 font-medium mt-1">
                <ArrowUpRight size={16} className="mr-1 rotate-90" />
                3.1% vs previous period
              </p>
            </div>
            <div className="flex-shrink-0">
              <LineChart size={48} className="text-blue-200" />
            </div>
          </div>
        </Card>
      </div>

      {/* Engagement Chart */}
      <Card title="Engagement Over Time">
        <div className="aspect-[3/1] bg-white p-4">
          {/* Chart would go here - using placeholder */}
          <div className="relative h-full">
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-[80%]">
              {mockAnalyticsData.map((data, i) => (
                <div key={i} className="flex flex-col items-center w-full">
                  <div
                    className="w-8 bg-blue-500 rounded-t-md transition-all duration-500"
                    style={{ height: `${(data.engagementRate / 8) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">
                    {data.period.substring(0, 3)}
                  </span>
                </div>
              ))}
            </div>

            {/* Y-axis labels */}
            <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between text-xs text-gray-400">
              <div>8%</div>
              <div>6%</div>
              <div>4%</div>
              <div>2%</div>
              <div>0%</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Platform Breakdown & Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Platform Breakdown">
          <div className="space-y-4">
            {platforms.map((platform) => {
              // Calculate random values for this demo
              const reachValue = Math.floor(Math.random() * 8000) + 2000;
              const engagementValue = (Math.random() * 4 + 2).toFixed(1);

              return (
                <div key={platform.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center mr-3`}
                  >
                    <span className="text-white font-bold">
                      {platform.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {platform.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {reachValue.toLocaleString()} reach
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${platform.color.replace(
                          "bg-",
                          "bg-opacity-80 bg-"
                        )}`}
                        style={{ width: `${Math.random() * 70 + 30}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        {engagementValue}% engagement
                      </span>
                      <span className="text-xs text-blue-600">
                        View details
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Recent Posts Performance">
          <div className="space-y-4">
            {getRecentPostsWithEngagement().map((post) => (
              <div
                key={post.id}
                className="flex items-start border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
              >
                {post.media[0] && (
                  <img
                    src={post.media[0].thumbnailUrl || post.media[0].url}
                    alt="Post preview"
                    className="w-12 h-12 object-cover rounded-md mr-3 flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm line-clamp-2 text-gray-700 mb-1">
                      {post.caption}
                    </p>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {new Date(post.scheduledFor).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <span className="text-red-500 mr-1">♥</span>
                      <span className="text-xs font-medium">
                        {post.engagement?.likes || 0}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-blue-500 mr-1">💬</span>
                      <span className="text-xs font-medium">
                        {post.engagement?.comments || 0}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500 mr-1">↗</span>
                      <span className="text-xs font-medium">
                        {post.engagement?.shares || 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex mt-1">
                    {post.platforms.map((platform) => (
                      <div
                        key={platform}
                        className={`w-2 h-2 rounded-full ${getPlatformColor(
                          platform
                        )} mr-1`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              size="sm"
              icon={<ExternalLink size={14} />}
            >
              View All Posts
            </Button>
          </div>
        </Card>
      </div>

      {/* AI Insights */}
      <Card
        title="AI Performance Insights"
        subtitle="Smart recommendations based on your content performance"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Calendar size={18} className="text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-800">
                Optimal Posting Times
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              Your content performs 32% better when posted between 7-9pm on
              weekdays.
            </p>
            <button className="text-xs text-blue-600 font-medium mt-3 flex items-center">
              Apply to scheduler
              <ArrowUpRight size={12} className="ml-1" />
            </button>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <BarChart size={18} className="text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-800">
                Content Performance
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              Posts with images + carousel get 47% more engagement than single
              image posts.
            </p>
            <button className="text-xs text-blue-600 font-medium mt-3 flex items-center">
              See content analysis
              <ArrowUpRight size={12} className="ml-1" />
            </button>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Share2 size={18} className="text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-800">
                Audience Insights
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              Your audience is most active on Instagram and LinkedIn with high
              engagement on professional content.
            </p>
            <button className="text-xs text-blue-600 font-medium mt-3 flex items-center">
              View audience profile
              <ArrowUpRight size={12} className="ml-1" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
// This code defines the Analytics page of a social media management application.
// It includes features like filtering by date range and platform, displaying key metrics, and providing actionable insights for users.