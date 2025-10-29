import React from 'react';

const KeywordTags = ({ keywords, maxItems = 10 }) => {
  const displayKeywords = keywords?.slice(0, maxItems) || [];

  if (!displayKeywords.length) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Keywords</h4>
      <div className="flex flex-wrap gap-2">
        {displayKeywords.map((keyword) => (
          <span
            key={keyword.id}
            className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
          >
            {keyword.name}
          </span>
        ))}
        {keywords && keywords.length > maxItems && (
          <span className="inline-block px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-full">
            +{keywords.length - maxItems} more
          </span>
        )}
      </div>
    </div>
  );
};

export default KeywordTags;