import React, { useRef, useState, useEffect } from "react";
import Card from "../components/ui/Card";
import axios from "axios";
import Button from "../components/ui/Button";
import {
  UploadCloud,
  Image,
  Video,
  Calendar,
  Clock,
  Sparkles,
  X,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Check,
} from "lucide-react";
import { platforms } from "../utils/mockData";

const CreatePost = () => {
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  // const [suggestedCaptions, setSuggestedCaptions] = useState([]);
  // const [suggestedHashtags, setSuggestedHashtags] = useState([]);

  // Demo AI-suggested hashtags
  const suggestedHashtags = [
    "ContentCreator",
    "SocialMediaTips",
    "DigitalMarketing",
    "GrowthHacking",
    "BusinessTips",
  ];

  // Demo AI-suggested captions
  const suggestedCaptions = [
    "Looking to take your social media game to the next level? These tips will help you engage with your audience more effectively!",
    "The key to social media success is consistency. Check out how we maintain our posting schedule to maximize engagement!",
    "Behind every successful campaign is a well-planned content strategy. Here's how we approach content planning for optimal results.",
  ];

  // useEffect(() => {
  //   const fetchAIContent = async () => {
  //     try {
  //       const { data } = await axios.post(
  //         "https://trendsync-1d7b.onrender.com/api/ai/captions",
  //         {
  //           topic: "digital marketing", // you can make this dynamic later
  //         }
  //       );
  //       setSuggestedCaptions(data.captions);

  //       const res = await axios.post("https://trendsync-1d7b.onrender.com/api/ai/hashtags", {
  //         topic: "digital marketing",
  //       });
  //       setSuggestedHashtags(res.data.hashtags);
  //     } catch (err) {
  //       console.error("AI fetch error", err);
  //     }
  //   };

  //   fetchAIContent();
  // }, []);

  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const addHashtag = () => {
    if (hashtag && !hashtags.includes(hashtag)) {
      setHashtags([...hashtags, hashtag]);
      setHashtag("");
    }
  };

  const removeHashtag = (tag) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const addSuggestedHashtag = (tag) => {
    if (!hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
    }
  };

  const applyAISuggestion = (suggestion) => {
    setCaption(suggestion);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  step === s
                    ? "bg-blue-600 text-white"
                    : step > s
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-400"
                }
              `}
            >
              {step > s ? <Check size={16} /> : s}
            </div>
            {s < 4 && (
              <div
                className={`w-12 h-1 ${
                  step > s ? "bg-blue-200" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };

const handleSubmitPost = async () => {
  if (
    !caption ||
    !selectedPlatforms.length ||
    !uploadedUrls.length ||
    !date ||
    !time
  ) {
    alert("Please fill all required fields before scheduling.");
    return;
  }

  const postData = {
    caption,
    hashtags,
    platforms: selectedPlatforms,
    mediaUrls: uploadedUrls,
    scheduledFor: new Date(`${date}T${time}`),
  };

  try {
    setLoading(true);
    const token = localStorage.getItem("token"); // Or however your auth works

    const res = await axios.post("https://trendsync-1d7b.onrender.com/api/posts", postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Post scheduled successfully!");
    setStep(1); // Reset to Step 1
    setCaption("");
    setUploadedUrls([]);
    setSelectedFiles([]);
    setHashtags([]);
    setSelectedPlatforms([]);
    setDate("");
    setTime("");
  } catch (err) {
    console.error("Failed to schedule post:", err);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  // Step 1: Upload Media
  const renderStep1 = () => {
    const handleFileChange = async (e) => {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);

      const formData = new FormData();
      files.forEach((file) => formData.append("media", file));

      try {
        const res = await axios.post(
          "https://trendsync-1d7b.onrender.com/api/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Upload Success:", res.data);

        // 🔥 Fix: Save returned file URLs to main state
        setUploadedUrls((prev) => [...prev, res.data.url]);
      } catch (err) {
        console.error("Upload Error:", err);
      }
    };

    return (
      <div className="space-y-6">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          <div className="mx-auto flex justify-center mb-4">
            <UploadCloud size={48} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Drag and drop your media here
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Support for images (JPG, PNG, GIF) and videos (MP4, MOV)
          </p>
          <Button variant="primary">Browse Files</Button>
        </div>

        {/* Previews */}
        <div className="grid grid-cols-4 gap-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-100 rounded-md overflow-hidden border border-gray-200"
            >
              {file.type.startsWith("image") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Video />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Step 2: Write Caption
  const renderStep2 = () => {
    const applyAISuggestion = (text) => {
      setCaption(text);
    };

    return (
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="caption"
              className="block text-sm font-medium text-gray-700"
            >
              Write a caption
            </label>
            <div className="flex items-center">
              <Sparkles size={16} className="text-blue-500 mr-1" />
              <span className="text-xs text-blue-600 font-medium">
                AI assistance
              </span>
            </div>
          </div>
          <textarea
            id="caption"
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="What do you want to say about this post?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
          <p className="text-xs text-right mt-1 text-gray-500">
            {caption.length}/2200 characters
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center mb-3">
            <Sparkles size={16} className="text-blue-500 mr-2" />
            <h4 className="text-sm font-medium text-gray-800">
              AI Suggested Captions
            </h4>
          </div>
          <div className="space-y-3">
            {suggestedCaptions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 bg-white rounded-md border border-blue-100 cursor-pointer hover:border-blue-300 transition-colors duration-200"
                onClick={() => applyAISuggestion(suggestion)}
              >
                <p className="text-sm text-gray-800">{suggestion}</p>
                <button className="text-xs text-blue-600 mt-2 font-medium">
                  Use this caption
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Step 3: Hashtags & Platforms
  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Add hashtags
            </label>
            <div className="flex items-center">
              <Sparkles size={16} className="text-blue-500 mr-1" />
              <span className="text-xs text-blue-600 font-medium">
                AI suggested
              </span>
            </div>
          </div>

          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a hashtag"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addHashtag()}
            />
            <Button variant="primary" onClick={addHashtag}>
              Add
            </Button>
          </div>

          {/* Hashtag chips */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {hashtags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-blue-100 text-blue-800 text-sm rounded-full px-3 py-1"
                >
                  #{tag}
                  <button
                    onClick={() => removeHashtag(tag)}
                    className="ml-1.5 text-blue-500 hover:text-blue-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* AI Suggestions */}
          <div className="mt-4">
            <p className="text-xs font-medium text-gray-500 mb-2">
              TRENDING HASHTAGS IN YOUR INDUSTRY
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedHashtags.map((tag) => (
                <button
                  key={tag}
                  className={`text-sm rounded-full px-3 py-1 ${
                    hashtags.includes(tag)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => addSuggestedHashtag(tag)}
                  disabled={hashtags.includes(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select platforms
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {platforms.map((platform) => {
              const isSelected = selectedPlatforms.includes(platform.id);
              return (
                <button
                  key={platform.id}
                  className={`flex items-center p-4 rounded-lg border-2 transition-colors duration-200 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => togglePlatform(platform.id)}
                >
                  <div
                    className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center mr-3`}
                  >
                    {platform.id === "instagram" && (
                      <Instagram size={20} className="text-white" />
                    )}
                    {platform.id === "twitter" && (
                      <Twitter size={20} className="text-white" />
                    )}
                    {platform.id === "linkedin" && (
                      <Linkedin size={20} className="text-white" />
                    )}
                    {platform.id === "facebook" && (
                      <Facebook size={20} className="text-white" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{platform.name}</p>
                    {isSelected && (
                      <p className="text-xs text-gray-500">Will be posted</p>
                    )}
                  </div>
                  {isSelected && (
                    <div className="ml-auto">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-blue-600" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Step 4: Schedule
  const renderStep4 = () => {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Schedule your post
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex items-center mb-2">
                <Calendar size={16} className="text-gray-400 mr-2" />
                <label htmlFor="date" className="block text-sm text-gray-600">
                  Date
                </label>
              </div>
              <input
                type="date"
                id="date"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Clock size={16} className="text-gray-400 mr-2" />
                <label htmlFor="time" className="block text-sm text-gray-600">
                  Time
                </label>
              </div>
              <input
                type="time"
                id="time"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Sparkles size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">
                  AI Recommended Timing
                </p>
                <p className="text-sm text-gray-600">
                  Based on your audience's activity patterns, we recommend
                  posting on{" "}
                  <span className="font-medium">Wednesday at 7:30 PM</span> for
                  maximum engagement.
                </p>
                <button className="text-xs text-blue-600 mt-2 font-medium">
                  Apply recommended time
                </button>
              </div>
            </div>
          </div>
        </div>

        <Card title="Post Preview">
          <div className="flex items-start mb-4">
            <img
              src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=200"
              alt="Selected media"
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div>
              <p className="text-sm text-gray-800 font-medium mb-1">
                {caption || "No caption added yet."}
              </p>
              <div className="flex flex-wrap gap-1">
                {hashtags.map((tag) => (
                  <span key={tag} className="text-xs text-blue-600">
                    #{tag}{" "}
                  </span>
                ))}
              </div>
              <div className="flex mt-2 gap-1">
                {selectedPlatforms.map((platform) => (
                  <span
                    key={platform}
                    className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-1" />
            <span>
              {date ? new Date(date).toLocaleDateString() : "Date not set"}
            </span>
            <span className="mx-2">•</span>
            <Clock size={16} className="mr-1" />
            <span>{time || "Time not set"}</span>
          </div>
        </Card>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {renderStepIndicator()}

      <Card>
        {renderCurrentStep()}

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>
            Back
          </Button>

          {step < 4 ? (
            <Button variant="primary" onClick={nextStep}>
              Continue
            </Button>
          ) : (
            <Button
              variant="primary"
              icon={<Calendar size={16} />}
              onClick={handleSubmitPost}
              disabled={loading}
            >
              {loading ? "Scheduling..." : "Schedule Post"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CreatePost;
