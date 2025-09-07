"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  subItems?: NavigationItem[];
}

interface NavigationProps {
  items: NavigationItem[];
  userRole: "admin" | "member";
}

export function Navigation({ items, userRole }: NavigationProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  // Auto-expand active sections
  React.useEffect(() => {
    const activeParents: string[] = [];
    
    items.forEach(item => {
      if (item.subItems) {
        const hasActiveSubItem = item.subItems.some(subItem => 
          pathname === subItem.href || pathname.startsWith(subItem.href + "/")
        );
        if (hasActiveSubItem || pathname === item.href || pathname.startsWith(item.href + "/")) {
          activeParents.push(item.href);
        }
      }
    });

    setExpandedItems(prev => {
      const newExpanded = [...new Set([...prev, ...activeParents])];
      return newExpanded;
    });
  }, [pathname, items]);

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => {
    // Exact match for the main path
    if (pathname === href) return true;
    
    // For sub-paths, ensure we're matching the correct section
    if (pathname.startsWith(href + "/")) {
      // Make sure we're not matching partial segments
      const pathSegments = pathname.split('/').filter(Boolean);
      const hrefSegments = href.split('/').filter(Boolean);
      
      // Check if all href segments match the beginning of path segments
      return hrefSegments.every((segment, index) => pathSegments[index] === segment);
    }
    
    return false;
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems.includes(item.href);
    const active = isActive(item.href);

    return (
      <li key={item.href} className="relative">
        <div className="flex items-center">
          <Link
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
              active
                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            } ${level > 0 ? "ml-6" : ""}`}
          >
            {item.icon && (
              <span className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="flex-1">{item.label}</span>
          </Link>
          {hasSubItems && (
            <button
              onClick={() => toggleExpanded(item.href)}
              className="p-1 hover:bg-gray-100 rounded"
              aria-expanded={isExpanded}
            >
              <svg
                className={`w-4 h-4 transition-transform ${
                  isExpanded ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
        {hasSubItems && isExpanded && (
          <ul className="mt-1 space-y-1">
            {item.subItems!.map(subItem => renderNavigationItem(subItem, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className="flex-1 space-y-1 px-2 py-4" aria-label="Main navigation">
      <ul className="space-y-1">
        {items.map(item => renderNavigationItem(item))}
      </ul>
    </nav>
  );
}

export default Navigation;
