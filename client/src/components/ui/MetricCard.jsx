import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getIconByName } from '../../utils/mockData';

const MetricCard = ({ metric }) => {
  const { label, value, change, icon } = metric;
  const isPositive = change && change > 0;
  
  const IconComponent = icon ? getIconByName(icon) : null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
          
          {change !== undefined && (
            <div className="mt-2 flex items-center">
              {isPositive ? (
                <span className="flex items-center text-green-600 text-xs font-medium">
                  <ArrowUpRight size={14} className="mr-1" />
                  {Math.abs(change)}%
                </span>
              ) : (
                <span className="flex items-center text-red-600 text-xs font-medium">
                  <ArrowDownRight size={14} className="mr-1" />
                  {Math.abs(change)}%
                </span>
              )}
              <span className="text-gray-500 text-xs ml-1">vs last week</span>
            </div>
          )}
        </div>
        
        {IconComponent && (
          <div className="p-2 bg-blue-50 rounded-lg">
            <IconComponent className="h-5 w-5 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
