import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Image, 
  Video,
  MoreHorizontal,
  Folder,
  Tag,
  Trash,
  Edit,
  Calendar,
  Download
} from 'lucide-react';
import { mockMedia } from '../utils/mockData';

const ContentLibrary = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState(null);
  
  // Get all unique tags from media
  const allTags = Array.from(new Set(mockMedia.flatMap(media => media.tags || [])));
  
  // Filter media by search query and tag
  const filteredMedia = mockMedia.filter(media => {
    const matchesSearch = !searchQuery || 
      media.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = !filterTag || media.tags?.includes(filterTag);
    
    return matchesSearch && matchesTag;
  });

  const toggleMediaSelection = (media) => {
    if (selectedMedia.find(m => m.id === media.id)) {
      setSelectedMedia(selectedMedia.filter(m => m.id !== media.id));
    } else {
      setSelectedMedia([...selectedMedia, media]);
    }
  };

  const clearSelection = () => {
    setSelectedMedia([]);
  };

  const handleFilterByTag = (tag) => {
    setFilterTag(filterTag === tag ? null : tag);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by tag, name..."
            className="bg-white text-sm rounded-lg pl-10 pr-4 py-2.5 w-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex">
            <button
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            icon={<Filter size={16} />}
          >
            Filter
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={16} />}
          >
            Upload
          </Button>
        </div>
      </div>
      
      {/* Selection Info */}
      {selectedMedia.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between">
          <span className="text-sm text-blue-700">
            {selectedMedia.length} {selectedMedia.length === 1 ? 'item' : 'items'} selected
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearSelection}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
            >
              Use Selected
            </Button>
          </div>
        </div>
      )}

      {/* Tags Filter */}
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag, index) => (
          <button
            key={index}
            className={`text-sm px-3 py-1 rounded-full ${
              filterTag === tag
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handleFilterByTag(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>
      
      {/* Content Grid/List */}
      <Card>
        {filteredMedia.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-base font-medium text-gray-900">No media found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || filterTag 
                ? 'Try adjusting your search or filter criteria'
                : 'Upload some media to get started'}
            </p>
            <div className="mt-6">
              <Button
                variant="primary"
                icon={<Plus size={16} />}
              >
                Upload New Media
              </Button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredMedia.map((media) => (
              <div 
                key={media.id} 
                className={`
                  group relative aspect-square rounded-lg overflow-hidden border 
                  ${selectedMedia.find(m => m.id === media.id) 
                    ? 'ring-2 ring-blue-500 border-blue-500' 
                    : 'border-gray-200 hover:border-gray-300'}
                `}
              >
                {/* Media preview */}
                <img
                  src={media.thumbnailUrl || media.url}
                  alt={media.tags?.[0] || 'Media'}
                  className="w-full h-full object-cover"
                />
                
                {/* Media type indicator */}
                <div className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full">
                  {media.type === 'image' ? (
                    <Image size={14} className="text-white" />
                  ) : (
                    <Video size={14} className="text-white" />
                  )}
                </div>
                
                {/* Selection checkbox */}
                <div 
                  className="absolute top-2 left-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMediaSelection(media);
                  }}
                >
                  <div className={`
                    w-5 h-5 rounded border-2 
                    ${selectedMedia.find(m => m.id === media.id) 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-white bg-black bg-opacity-25 group-hover:opacity-100 opacity-0'}
                    flex items-center justify-center transition-opacity duration-200
                  `}>
                    {selectedMedia.find(m => m.id === media.id) && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="primary"
                      size="sm"
                    >
                      Use Media
                    </Button>
                  </div>
                </div>
                
                {/* Info footer */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="flex gap-1 mb-1">
                        {(media.tags || []).slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-xs text-white opacity-80">
                            #{tag}
                          </span>
                        ))}
                        {(media.tags || []).length > 2 && (
                          <span className="text-xs text-white opacity-80">
                            +{(media.tags || []).length - 2}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white">
                        {formatDate(media.uploadedAt)}
                      </p>
                    </div>
                    <div className="relative">
                      <button className="p-1 rounded-full bg-black bg-opacity-50 text-white">
                        <MoreHorizontal size={14} />
                      </button>
                      {/* Dropdown menu would go here */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredMedia.map((media) => (
              <div 
                key={media.id} 
                className={`
                  py-3 flex items-center hover:bg-gray-50 
                  ${selectedMedia.find(m => m.id === media.id) ? 'bg-blue-50' : ''}
                `}
              >
                {/* Checkbox */}
                <div className="pl-4 pr-3">
                  <input
                    type="checkbox"
                    checked={!!selectedMedia.find(m => m.id === media.id)}
                    onChange={() => toggleMediaSelection(media)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </div>
                
                {/* Media thumbnail */}
                <div className="pr-4">
                  <div className="relative w-12 h-12 rounded overflow-hidden">
                    <img
                      src={media.thumbnailUrl || media.url}
                      alt={media.tags?.[0] || 'Media'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 p-0.5 bg-black bg-opacity-50 text-xs text-white">
                      {media.type === 'image' ? 'IMG' : 'VID'}
                    </div>
                  </div>
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1 mb-1">
                    {(media.tags || []).map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    Uploaded {formatDate(media.uploadedAt)}
                  </p>
                </div>
                
                {/* Type */}
                <div className="px-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                    {media.type}
                  </span>
                </div>
                
                {/* Actions */}
                <div className="pr-4 flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100">
                    <Calendar size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100">
                    <Tag size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100">
                    <Edit size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100">
                    <Download size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ContentLibrary;
