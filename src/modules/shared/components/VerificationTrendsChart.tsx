import React from 'react';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  BarChartIcon,
  Grid
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';

interface ChartDataPoint {
  month: string;
  value: number;
  label: string;
}

const VerificationTrendsChart = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Monthly');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Sample data points for the chart
  const chartData: ChartDataPoint[] = [
    { month: 'Jan', value: 20000, label: '20K' },
    { month: 'Feb', value: 25000, label: '25K' },
    { month: 'Mar', value: 22000, label: '22K' },
    { month: 'Apr', value: 28000, label: '28K' },
    { month: 'May', value: 35000, label: '35K' },
    { month: 'Jun', value: 37458, label: '37.5K' },
    { month: 'Jul', value: 32000, label: '32K' },
    { month: 'Aug', value: 38000, label: '38K' },
    { month: 'Sep', value: 34000, label: '34K' },
    { month: 'Oct', value: 36000, label: '36K' },
    { month: 'Nov', value: 39000, label: '39K' },
    { month: 'Dec', value: 35000, label: '35K' }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));
  const minValue = Math.min(...chartData.map(d => d.value));
  const range = maxValue - minValue;

  // Generate SVG path for the curve
  const generatePath = () => {
    const width = 760;
    const height = 200;
    const padding = 40;

    const points = chartData.map((point, index) => {
      const x = padding + (index * (width - 2 * padding)) / (chartData.length - 1);
      const y = height - padding - ((point.value - minValue) / range) * (height - 2 * padding);
      return { x, y, value: point.value, month: point.month, label: point.label };
    });

    // Create smooth curve using quadratic bezier curves
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      
      if (i === 1) {
        // First curve
        const cp1x = prev.x + (curr.x - prev.x) * 0.5;
        const cp1y = prev.y;
        path += ` Q ${cp1x} ${cp1y} ${curr.x} ${curr.y}`;
      } else if (i === points.length - 1) {
        // Last curve
        const cp1x = prev.x + (curr.x - prev.x) * 0.5;
        const cp1y = curr.y;
        path += ` Q ${cp1x} ${cp1y} ${curr.x} ${curr.y}`;
      } else {
        // Middle curves
        const cp1x = prev.x + (curr.x - prev.x) * 0.5;
        const cp1y = prev.y + (curr.y - prev.y) * 0.3;
        path += ` Q ${cp1x} ${cp1y} ${curr.x} ${curr.y}`;
      }
    }

    return { path, points };
  };

  const { path, points } = generatePath();

  // Generate grid lines
  const generateGridLines = () => {
    const width = 760;
    const height = 200;
    const padding = 40;
    const gridLines = [];

    // Horizontal grid lines (5 lines)
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * (height - 2 * padding)) / 5;
      gridLines.push(
        <line
          key={`h-${i}`}
          x1={padding}
          y1={y}
          x2={width - padding}
          y2={y}
          stroke="#f1f5f9"
          strokeWidth="1"
        />
      );
    }

    // Vertical grid lines
    chartData.forEach((_, index) => {
      const x = padding + (index * (width - 2 * padding)) / (chartData.length - 1);
      gridLines.push(
        <line
          key={`v-${index}`}
          x1={x}
          y1={padding}
          x2={x}
          y2={height - padding}
          stroke="#f1f5f9"
          strokeWidth="1"
        />
      );
    });

    return gridLines;
  };

  // Y-axis labels
  const generateYAxisLabels = () => {
    const height = 200;
    const padding = 40;
    const labels = [];

    for (let i = 0; i <= 5; i++) {
      const value = minValue + (range * (5 - i)) / 5;
      const y = padding + (i * (height - 2 * padding)) / 5;
      const formattedValue = value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value.toString();
      
      labels.push(
        <text
          key={`y-${i}`}
          x={padding - 10}
          y={y + 4}
          textAnchor="end"
          className="text-xs fill-gray-500"
        >
          {formattedValue}
        </text>
      );
    }

    return labels;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Verification Trends</h3>
          <p className="text-sm text-gray-500">as of 14 May 2021, 09:41 PM</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Trending view</span>
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <svg 
            width="100%" 
            viewBox="0 0 760 240"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Definitions for gradients and patterns */}
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ef4444" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
              </linearGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#ef4444" floodOpacity="0.2"/>
              </filter>
            </defs>

            {/* Grid Lines */}
            {generateGridLines()}

            {/* Y-axis labels */}
            {generateYAxisLabels()}

            {/* X-axis labels */}
            {chartData.map((point, index) => {
              const x = 40 + (index * (760 - 80)) / (chartData.length - 1);
              return (
                <text
                  key={`x-${index}`}
                  x={x}
                  y={230}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {point.month}
                </text>
              );
            })}

            {/* Area fill */}
            <path
              d={`${path} L ${points[points.length - 1].x} 200 L ${points[0].x} 200 Z`}
              fill="url(#areaGradient)"
            />

            {/* Main trend line */}
            <path
              d={path}
              stroke="#ef4444"
              strokeWidth="3"
              fill="none"
              filter="url(#shadow)"
              className="drop-shadow-sm"
            />

            {/* Data points */}
            {points.map((point, index) => (
              <g key={`point-${index}`}>
                {/* Hover area */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="12"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                
                {/* Visible point */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={hoveredPoint === index ? "6" : "4"}
                  fill="#ef4444"
                  stroke="white"
                  strokeWidth="2"
                  className="transition-all duration-200"
                />

                {/* Highlight for peak value */}
                {point.value === 37458 && (
                  <>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="8"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      opacity="0.5"
                    />
                    <text
                      x={point.x}
                      y={point.y - 15}
                      textAnchor="middle"
                      className="text-sm font-semibold fill-gray-700"
                    >
                      {point.value.toLocaleString()}
                    </text>
                  </>
                )}

                {/* Tooltip on hover */}
                {hoveredPoint === index && (
                  <g>
                    <rect
                      x={point.x - 30}
                      y={point.y - 35}
                      width="60"
                      height="25"
                      rx="4"
                      fill="rgba(0, 0, 0, 0.8)"
                    />
                    <text
                      x={point.x}
                      y={point.y - 18}
                      textAnchor="middle"
                      className="text-xs fill-white font-medium"
                    >
                      {point.label}
                    </text>
                  </g>
                )}
              </g>
            ))}

            {/* Trend indicator */}
            <g transform="translate(680, 50)">
              <rect
                x="0"
                y="0"
                width="60"
                height="30"
                rx="15"
                fill="#22c55e"
                opacity="0.1"
              />
              <TrendingUpIcon className="w-4 h-4" x="8" y="8" fill="#22c55e" />
              <text x="28" y="20" className="text-xs fill-green-600 font-medium">+12%</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Chart Statistics */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-bold text-gray-900">37,458</p>
          <p className="text-xs text-gray-500">Peak Value</p>
        </div>
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-bold text-green-600">+16.5%</p>
          <p className="text-xs text-gray-500">Growth Rate</p>
        </div>
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-bold text-gray-900">31,250</p>
          <p className="text-xs text-gray-500">Average</p>
        </div>
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-bold text-blue-600">12</p>
          <p className="text-xs text-gray-500">Data Points</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Verification Requests</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Completed Verifications</span>
        </div>
      </div>
    </div>
  );
};

export default VerificationTrendsChart;