"use client";

import * as React from "react";
import Card from "@/components/Card";
import { Button } from "@/components/Button";

export default function MemberDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-primary-text">Welcome back!</h1>
        <p className="text-secondary-text mt-1">Here&apos;s your savings and payments at a glance</p>
      </header>

      {/* Financial Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-success-green/10 to-info-cyan/10 border-success-green/20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-secondary-text">Total Contributions</span>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-3xl font-bold text-primary-text">$1,240</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-success-green">↗ +3% this month</span>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-accent-blue/10 to-financial-blue/10 border-accent-blue/20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-secondary-text">Active Groups</span>
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-3xl font-bold text-primary-text">3</p>
            <p className="text-sm text-secondary-text mt-2">Next payout in 12 days</p>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-warning-amber/10 to-premium-gold/10 border-warning-amber/20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-secondary-text">Next Due Payment</span>
              <span className="text-2xl">⏰</span>
            </div>
            <p className="text-3xl font-bold text-primary-text">$100</p>
            <p className="text-sm text-warning-amber mt-2">Due in 2 days</p>
          </div>
        </Card>
      </section>

      {/* Main content grid */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Upcoming Payments */}
        <Card className="xl:col-span-2">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-primary-text">Upcoming Payments</h3>
              <Button size="sm" variant="secondary" className="bg-gradient-to-r from-accent-blue to-financial-blue text-white">
                Pay All
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-elevated-background border border-border hover:border-accent-blue/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-financial-blue flex items-center justify-center">
                      <span className="text-white font-semibold">A</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-primary-text">Group A - Monthly Savings</p>
                    <p className="text-sm text-secondary-text">Due: Dec 15, 2024 • 2 days left</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-bold text-primary-text">$100</span>
                  <Button size="sm" className="bg-gradient-to-r from-success-green to-info-cyan">
                    Pay Now
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-elevated-background border border-border hover:border-accent-blue/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-info-cyan to-accent-blue flex items-center justify-center">
                      <span className="text-white font-semibold">C</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-primary-text">Group C - Weekly Savings</p>
                    <p className="text-sm text-secondary-text">Due: Dec 18, 2024 • 5 days left</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-bold text-primary-text">$50</span>
                  <Button size="sm" variant="secondary" className="bg-warning-amber/10 text-warning-amber hover:bg-warning-amber/20">
                    Schedule
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-elevated-background border border-border opacity-60">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-muted-text to-secondary-text flex items-center justify-center">
                      <span className="text-white font-semibold">B</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-primary-text">Group B - Bi-weekly Savings</p>
                    <p className="text-sm text-secondary-text">Due: Dec 22, 2024 • 9 days left</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-bold text-primary-text">$75</span>
                  <Button size="sm" variant="ghost" disabled>
                    Upcoming
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Groups */}
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-primary-text mb-6">Active Groups</h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-success-green/10 to-info-cyan/10 border border-success-green/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-primary-text">Group A</span>
                  <span className="text-xs bg-success-green/20 text-success-green px-2 py-1 rounded-full">On track</span>
                </div>
                <p className="text-sm text-secondary-text">Monthly • $100</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-secondary-text mb-1">
                    <span>Progress</span>
                    <span>8/12 cycles</span>
                  </div>
                  <div className="w-full bg-elevated-background rounded-full h-2">
                    <div className="bg-gradient-to-r from-success-green to-info-cyan h-2 rounded-full" style={{width: '67%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-to-r from-accent-blue/10 to-financial-blue/10 border border-accent-blue/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-primary-text">Group B</span>
                  <span className="text-xs bg-accent-blue/20 text-accent-blue px-2 py-1 rounded-full">80% collected</span>
                </div>
                <p className="text-sm text-secondary-text">Bi-weekly • $75</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-secondary-text mb-1">
                    <span>Progress</span>
                    <span>6/8 cycles</span>
                  </div>
                  <div className="w-full bg-elevated-background rounded-full h-2">
                    <div className="bg-gradient-to-r from-accent-blue to-financial-blue h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-to-r from-warning-amber/10 to-premium-gold/10 border border-warning-amber/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-primary-text">Group C</span>
                  <span className="text-xs bg-warning-amber/20 text-warning-amber px-2 py-1 rounded-full">2 cycles left</span>
                </div>
                <p className="text-sm text-secondary-text">Weekly • $50</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-secondary-text mb-1">
                    <span>Progress</span>
                    <span>10/12 cycles</span>
                  </div>
                  <div className="w-full bg-elevated-background rounded-full h-2">
                    <div className="bg-gradient-to-r from-warning-amber to-premium-gold h-2 rounded-full" style={{width: '83%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" className="w-full mt-6 text-sm">
              View all groups →
            </Button>
          </div>
        </Card>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-accent-blue/50 transition-colors cursor-pointer">
          <div className="p-6 text-center">
            <div className="text-3xl mb-3">💳</div>
            <h3 className="font-medium text-primary-text mb-1">Quick Pay</h3>
            <p className="text-sm text-secondary-text">Pay all due amounts</p>
          </div>
        </Card>
        
        <Card className="hover:border-accent-blue/50 transition-colors cursor-pointer">
          <div className="p-6 text-center">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-medium text-primary-text mb-1">View Reports</h3>
            <p className="text-sm text-secondary-text">Payment history</p>
          </div>
        </Card>
        
        <Card className="hover:border-accent-blue/50 transition-colors cursor-pointer">
          <div className="p-6 text-center">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-medium text-primary-text mb-1">Join Group</h3>
            <p className="text-sm text-secondary-text">Find new groups</p>
          </div>
        </Card>
        
        <Card className="hover:border-accent-blue/50 transition-colors cursor-pointer">
          <div className="p-6 text-center">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-medium text-primary-text mb-1">Group Chat</h3>
            <p className="text-sm text-secondary-text">Connect with members</p>
          </div>
        </Card>
      </section>
    </div>
  );
}