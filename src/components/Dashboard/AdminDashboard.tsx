"use client";

import * as React from "react";
import KpiCard from "@/components/KpiCard";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-text">Dashboard</h1>
          <p className="text-secondary-text mt-1">Overview of groups, members, and financials</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="hidden sm:flex">
            📊 Generate Report
          </Button>
          <Button className="bg-gradient-to-r from-financial-blue to-accent-blue hover:from-financial-blue/90 hover:to-accent-blue/90">
            ✨ Create Group
          </Button>
        </div>
      </header>

      {/* KPI Cards */}
      <section aria-labelledby="kpi-cards" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <h2 id="kpi-cards" className="sr-only">Key metrics</h2>
        
        <KpiCard 
          label="Total Groups" 
          value="12" 
          sublabel="10 active, 2 paused" 
          action={
            <div className="flex items-center text-success-green">
              <span className="text-xs">↗ +2</span>
            </div>
          }
        />
        
        <KpiCard 
          label="Total Members" 
          value="248" 
          sublabel="+12 this month" 
          action={
            <div className="flex items-center text-success-green">
              <span className="text-xs">↗ +5%</span>
            </div>
          }
        />
        
        <KpiCard 
          label="Financial Volume" 
          value="$56,200" 
          sublabel="+5% vs last month" 
          action={
            <div className="flex items-center text-success-green">
              <span className="text-xs">↗ +$2.8k</span>
            </div>
          }
        />
        
        <KpiCard 
          label="Completion Rate" 
          value="82%" 
          sublabel="34 completed" 
          action={
            <div className="flex items-center text-warning-amber">
              <span className="text-xs">↗ +3%</span>
            </div>
          }
        />
      </section>

      {/* Main content grid */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Priority Alerts */}
        <Card className="xl:col-span-2 p-0 overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary-text">Priority Alerts</h3>
                <p className="text-sm text-secondary-text">Overdue payments and pending approvals</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-danger/10 text-danger">
                  🔴 3 urgent
                </span>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            <div className="p-6 flex items-center justify-between hover:bg-elevated-background transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-danger to-warning-amber flex items-center justify-center">
                    <span className="text-white text-sm">⚠️</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-text">John D. overdue: $200 in Group A</p>
                  <p className="text-xs text-secondary-text">Due 3 days ago • Group A</p>
                </div>
              </div>
              <Button size="sm" variant="secondary" className="bg-warning-amber/10 text-warning-amber hover:bg-warning-amber/20">
                Send reminder
              </Button>
            </div>
            
            <div className="p-6 flex items-center justify-between hover:bg-elevated-background transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-info-cyan to-accent-blue flex items-center justify-center">
                    <span className="text-white text-sm">👥</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-text">Approval pending: 3 new member requests</p>
                  <p className="text-xs text-secondary-text">Review queue • Groups B, C, D</p>
                </div>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-info-cyan to-accent-blue">
                Review
              </Button>
            </div>
            
            <div className="p-6 flex items-center justify-between hover:bg-elevated-background transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success-green to-info-cyan flex items-center justify-center">
                    <span className="text-white text-sm">💰</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary-text">Group E payout ready for processing</p>
                  <p className="text-xs text-secondary-text">$1,200 • 5 members • Due today</p>
                </div>
              </div>
              <Button size="sm" variant="secondary" className="bg-success-green/10 text-success-green hover:bg-success-green/20">
                Process
              </Button>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-primary-text mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-success-green mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-primary-text">Payment received: $100</p>
                  <p className="text-xs text-secondary-text">Group B • Alice • 2 min ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-info-cyan mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-primary-text">New member joined: Rahul</p>
                  <p className="text-xs text-secondary-text">Group C • 15 min ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent-blue mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-primary-text">Group A payout processed</p>
                  <p className="text-xs text-secondary-text">$800 • 1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-warning-amber mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-primary-text">Group D cycle completed</p>
                  <p className="text-xs text-secondary-text">8 members • 2 hours ago</p>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" className="w-full mt-4 text-sm">
              View all activity →
            </Button>
          </div>
        </Card>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary-text">Group Health</h3>
              <span className="text-2xl">📊</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary-text">Healthy Groups</span>
                <span className="text-sm font-medium text-success-green">8/12</span>
              </div>
              <div className="w-full bg-elevated-background rounded-full h-2">
                <div className="bg-gradient-to-r from-success-green to-info-cyan h-2 rounded-full" style={{width: '67%'}}></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary-text">Payment Collection</h3>
              <span className="text-2xl">💳</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary-text">This Month</span>
                <span className="text-sm font-medium text-primary-text">$12,400</span>
              </div>
              <div className="w-full bg-elevated-background rounded-full h-2">
                <div className="bg-gradient-to-r from-accent-blue to-financial-blue h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary-text">Member Engagement</h3>
              <span className="text-2xl">👥</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-secondary-text">Active Members</span>
                <span className="text-sm font-medium text-primary-text">89%</span>
              </div>
              <div className="w-full bg-elevated-background rounded-full h-2">
                <div className="bg-gradient-to-r from-premium-gold to-warning-amber h-2 rounded-full" style={{width: '89%'}}></div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}