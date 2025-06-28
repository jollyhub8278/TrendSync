import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { ChevronLeft, ChevronRight, PenSquare, Filter } from "lucide-react";
import { platforms } from "../utils/mockData";
import { useEffect } from "react";
import axios from "axios";

const Calendar = () => {
  const getImageUrl = (url) => {
    return url.startsWith("http") ? url : `https://trendsync-1d7b.onrender.com${url}`;
  };

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState("week");
  const [filterPlatforms, setFilterPlatforms] = useState([]);
  const [posts, setPosts] = useState([]);

 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://trendsync-1d7b.onrender.com/api/posts/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data);
      console.log("Loaded posts:", res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  fetchPosts();
}, []);


  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const togglePlatformFilter = (platform) => {
    if (filterPlatforms.includes(platform)) {
      setFilterPlatforms(filterPlatforms.filter((p) => p !== platform));
    } else {
      setFilterPlatforms([...filterPlatforms, platform]);
    }
  };

const getPostsForDate = (date) => {
  return posts.filter((post) => {
    const postDate = new Date(post.scheduledFor);
    console.log("Comparing:", postDate.toDateString(), "==", date.toDateString());
    return (
      postDate.toDateString() === date.toDateString() &&
      (filterPlatforms.length === 0 ||
        post.platforms.some((platform) => filterPlatforms.includes(platform)))
    );
  });
};


  const generateDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const prevMonthLastDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    ).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        prevMonthLastDay - i
      );
      days.push({ date, isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      days.push({ date, isCurrentMonth: true });
    }

    const lastDayOfWeek = lastDayOfMonth.getDay();
    const remainingDays = 6 - lastDayOfWeek;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        i
      );
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  };

  const generateWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const generateHours = () => {
    const hours = [];
    for (let i = 8; i < 20; i++) {
      hours.push(i);
    }
    return hours;
  };

  const formatPostTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getPlatformColor = (platformId) => {
    const platform = platforms.find((p) => p.id === platformId);
    return platform ? platform.color : "bg-gray-500";
  };


  const renderPostCard = (post) => {
    return (
      <div
        key={post._id} // ✅ Use _id instead of id (MongoDB default)
        className="p-2 mb-2 rounded-md border border-gray-200 bg-white shadow-sm hover:shadow transition-shadow duration-200 cursor-move"
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex">
            {post.platforms.slice(0, 2).map((platform) => (
              <div
                key={platform}
                className={`w-2 h-2 rounded-full ${getPlatformColor(
                  platform
                )} mr-1`}
              ></div>
            ))}
            {post.platforms.length > 2 && (
              <span className="text-xs text-gray-500">
                +{post.platforms.length - 2}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {formatPostTime(new Date(post.scheduledFor))}
          </span>
        </div>

        <div className="flex items-start">
          {post.mediaUrls && post.mediaUrls.length > 0 && (
            <img
              src={getImageUrl(post.mediaUrls[0])}
              alt="Post media"
              className="w-8 h-8 object-cover rounded-sm mr-2 flex-shrink-0"
            />
          )}

          <p
            className="text-xs text-gray-700 line-clamp-2"
            title={post.caption}
          >
            {post.caption}
          </p>
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const days = generateDays();
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map(({ date, isCurrentMonth }, index) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            const postsForDate = getPostsForDate(date);

            return (
              <div
                key={index}
                className={`
                  min-h-[100px] p-1 border rounded-md transition-colors duration-200
                  ${
                    !isCurrentMonth
                      ? "bg-gray-50 text-gray-400 border-gray-100"
                      : "bg-white border-gray-200"
                  }
                  ${isToday ? "border-blue-300" : ""}
                  ${isSelected ? "ring-2 ring-blue-500 ring-offset-1" : ""}
                `}
                onClick={() => setSelectedDate(date)}
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-xs font-medium ${
                      isToday ? "text-blue-600" : ""
                    }`}
                  >
                    {date.getDate()}
                  </span>
                  {postsForDate.length > 0 && (
                    <span className="text-xs px-1.5 rounded-full bg-blue-100 text-blue-700">
                      {postsForDate.length}
                    </span>
                  )}
                </div>

                <div className="overflow-y-auto max-h-[80px]">
                  {postsForDate.slice(0, 2).map((post) => renderPostCard(post))}
                  {postsForDate.length > 2 && (
                    <div className="text-xs text-center text-gray-500 mt-1">
                      +{postsForDate.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = generateWeekDays();

    return (
      <div>
        <div className="grid grid-cols-7 gap-3 mb-4">
          {weekDays.map((date, index) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected =
              date.toDateString() === selectedDate.toDateString();

            return (
              <div
                key={index}
                className="text-center"
                onClick={() => setSelectedDate(date)}
              >
                <div
                  className={`
                    inline-block rounded-full w-8 h-8 flex items-center justify-center mb-1 cursor-pointer
                    ${isToday ? "bg-blue-100 text-blue-700" : ""}
                    ${isSelected ? "bg-blue-600 text-white" : ""}
                  `}
                >
                  {date.getDate()}
                </div>
                <div className="text-xs font-medium text-gray-500">
                  {
                    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
                      date.getDay()
                    ]
                  }
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7 gap-3">
          {weekDays.map((date, index) => {
            const postsForDate = getPostsForDate(date);

            return (
              <div key={index} className="space-y-2">
                {postsForDate.map((post) => renderPostCard(post))}
                {postsForDate.length === 0 && (
                  <div className="border border-dashed border-gray-200 rounded-md p-2 h-20 flex items-center justify-center">
                    <button className="text-xs text-gray-400 hover:text-blue-600">
                      + Add post
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = generateHours();
    const postsForDate = getPostsForDate(selectedDate);

    return (
      <div className="grid grid-cols-1 gap-2">
        {hours.map((hour) => {
          const postsAtHour = postsForDate.filter((post) => {
            const postDate = new Date(post.scheduledFor);
            return postDate.getHours() === hour;
          });

          return (
            <div key={hour} className="flex">
              <div className="w-16 text-xs text-right pr-4 text-gray-500 pt-2">
                {hour % 12 === 0 ? 12 : hour % 12}
                {hour < 12 ? " AM" : " PM"}
              </div>
              <div className="flex-1">
                <div className="h-px bg-gray-200 relative top-3 mb-2"></div>
                <div className="space-y-2">
                  {postsAtHour.map((post) => renderPostCard(post))}
                  {postsAtHour.length === 0 && (
                    <div className="border border-dashed border-gray-200 rounded-md p-2 h-16 flex items-center justify-center mb-2">
                      <button className="text-xs text-gray-400 hover:text-blue-600">
                        + Add post
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Button
            variant="outline"
            size="sm"
            icon={<ChevronLeft size={16} />}
            onClick={prevMonth}
          ></Button>
          <h2 className="text-xl font-bold text-gray-900 mx-4">
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <Button
            variant="outline"
            size="sm"
            icon={<ChevronRight size={16} />}
            onClick={nextMonth}
          ></Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-lg shadow-sm">
            <button
              className={`px-3 py-1.5 text-sm ${
                viewType === "month"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-600"
              }`}
              onClick={() => setViewType("month")}
            >
              Month
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${
                viewType === "week"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-600"
              }`}
              onClick={() => setViewType("week")}
            >
              Week
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${
                viewType === "day"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-600"
              }`}
              onClick={() => setViewType("day")}
            >
              Day
            </button>
          </div>

          <Button variant="outline" size="sm" icon={<PenSquare size={16} />}>
            New Post
          </Button>

          <div className="relative inline-block">
            <Button variant="outline" size="sm" icon={<Filter size={16} />}>
              Filter
            </Button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 hidden">
              <div className="p-2">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  PLATFORMS
                </p>
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`filter-${platform.id}`}
                      checked={filterPlatforms.includes(platform.id)}
                      onChange={() => togglePlatformFilter(platform.id)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`filter-${platform.id}`}
                      className="text-sm text-gray-700"
                    >
                      {platform.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card>
        {viewType === "month" && renderMonthView()}
        {viewType === "week" && renderWeekView()}
        {viewType === "day" && renderDayView()}
      </Card>
    </div>
  );
};

export default Calendar;
