"use client";

import * as React from "react";
import Card from "@/components/Card";

interface ChartDataPoint {
  label: string;
  value: number;
  date?: Date;
}

interface FinancialChartProps {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  type: "line" | "bar" | "pie" | "area";
  height?: number;
  showLegend?: boolean;
  currency?: boolean;
  percentage?: boolean;
  color?: string;
}

export function FinancialChart({
  title,
  subtitle,
  data,
  type,
  height = 300,
  showLegend = false,
  currency = false,
  percentage = false,
  color = "#3B82F6"
}: FinancialChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const formatValue = (value: number) => {
    if (currency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }
    if (percentage) {
      return `${value.toFixed(1)}%`;
    }
    return value.toLocaleString();
  };

  const getBarHeight = (value: number) => {
    if (range === 0) return 50;
    return ((value - minValue) / range) * (height - 60) + 20;
  };

  const getLinePoints = () => {
    const width = 400;
    const padding = 40;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - 60;

    return data.map((point, index) => {
      const x = padding + (index * chartWidth) / (data.length - 1);
      const y = chartHeight - ((point.value - minValue) / range) * chartHeight + 30;
      return `${x},${y}`;
    }).join(' ');
  };

  const renderLineChart = () => (
    <svg width="100%" height={height} viewBox="0 0 400 300" className="overflow-visible">
      {/* Grid lines */}
      <defs>
        <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      {/* Line */}
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        points={getLinePoints()}
      />
      
      {/* Data points */}
      {data.map((point, index) => {
        const x = 40 + (index * 320) / (data.length - 1);
        const y = 270 - ((point.value - minValue) / range) * 240;
        return (
          <g key={index}>
            <circle
              cx={x}
              cy={y}
              r="4"
              fill={color}
              stroke="white"
              strokeWidth="2"
            />
            <text
              x={x}
              y={y - 15}
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              {formatValue(point.value)}
            </text>
          </g>
        );
      })}
      
      {/* X-axis labels */}
      {data.map((point, index) => {
        const x = 40 + (index * 320) / (data.length - 1);
        return (
          <text
            key={index}
            x={x}
            y={290}
            textAnchor="middle"
            className="text-xs fill-gray-500"
          >
            {point.label}
          </text>
        );
      })}
    </svg>
  );

  const renderBarChart = () => (
    <div className="flex items-end justify-between h-full px-4 pb-8">
      {data.map((point, index) => (
        <div key={index} className="flex flex-col items-center flex-1 mx-1">
          <div className="text-xs text-gray-600 mb-2">
            {formatValue(point.value)}
          </div>
          <div
            className="w-full rounded-t-md transition-all duration-300 hover:opacity-80"
            style={{
              height: `${getBarHeight(point.value)}px`,
              backgroundColor: color,
              minHeight: '4px'
            }}
          />
          <div className="text-xs text-gray-500 mt-2 text-center">
            {point.label}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPieChart = () => {
    const total = data.reduce((sum, point) => sum + point.value, 0);
    let currentAngle = 0;
    const radius = 80;
    const centerX = 120;
    const centerY = 120;

    return (
      <div className="flex items-center gap-6">
        <svg width="240" height="240" viewBox="0 0 240 240">
          {data.map((point, index) => {
            const angle = (point.value / total) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const startAngleRad = (startAngle * Math.PI) / 180;
            const endAngleRad = (endAngle * Math.PI) / 180;
            
            const x1 = centerX + radius * Math.cos(startAngleRad);
            const y1 = centerY + radius * Math.sin(startAngleRad);
            const x2 = centerX + radius * Math.cos(endAngleRad);
            const y2 = centerY + radius * Math.sin(endAngleRad);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            currentAngle += angle;
            
            const colors = [
              '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
              '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
            ];
            
            return (
              <path
                key={index}
                d={pathData}
                fill={colors[index % colors.length]}
                stroke="white"
                strokeWidth="2"
                className="hover:opacity-80 transition-opacity"
              />
            );
          })}
        </svg>
        
        {showLegend && (
          <div className="space-y-2">
            {data.map((point, index) => {
              const colors = [
                '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
                '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
              ];
              const percentage = ((point.value / data.reduce((sum, p) => sum + p.value, 0)) * 100).toFixed(1);
              
              return (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="text-gray-700">{point.label}</span>
                  <span className="text-gray-500">({percentage}%)</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case "line":
      case "area":
        return renderLineChart();
      case "bar":
        return renderBarChart();
      case "pie":
        return renderPieChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <Card>
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
      
      <div style={{ height: type === "pie" ? "auto" : `${height}px` }}>
        {renderChart()}
      </div>
    </Card>
  );
}

export default FinancialChart;
