/**
 * @custom AnalyticsDashboardPage — Overview analytics dashboard
 * High-level KPIs, activity feed, quick-glance charts, content health score.
 * Links to detailed Engagement Analytics for deep dives.
 */
import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Users,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileText,
  RefreshCw,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
} from 'recharts'
import { DashboardLayout } from '../../../components/@system/Dashboard/DashboardLayout'
import { cn } from '../../../lib/@system/utils'

// ─── Constants ────────────────────────────────────────────────────
const BRAND = {
  primary: '#0891B2',
  primaryLight: '#ecfeff',
  primaryDark: '#0e7490',
}

const CHART_COLORS = ['#0891B2', '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc']
const STATUS_COLORS = {
  excellent: '#10b981',
  good: '#0891B2',
  fair: '#f59e0b',
  poor: '#ef4444',
}

// ─── Mock Data ────────────────────────────────────────────────────
function generateOverviewData() {
  const now = new Date()
  const dailyData = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const base = 800 + Math.floor(Math.random() * 600)
    dailyData.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      impressions: base + Math.floor(Math.random() * 400),
      engagement: Math.floor(base * (0.03 + Math.random() * 0.04)),
      followers: Math.floor(Math.random() * 15) + 2,
    })
  }
  return dailyData
}

function generateContentMixData() {
  return [
    { name: 'Text Posts', value: 42, color: '#0891B2' },
    { name: 'Listicles', value: 24, color: '#06b6d4' },
    { name: 'Stories', value: 18, color: '#22d3ee' },
    { name: 'Carousels', value: 10, color: '#67e8f9' },
    { name: 'Polls', value: 6, color: '#a5f3fc' },
  ]
}

function generateRecentActivity() {
  return [
    { id: 1, type: 'published', title: '5 AI trends reshaping B2B marketing', time: '2h ago', metric: '1,240 impressions' },
    { id: 2, type: 'milestone', title: 'Reached 5,000 followers', time: '5h ago', metric: '+127 this week' },
    { id: 3, type: 'engagement', title: 'Hot take on remote work went viral', time: '8h ago', metric: '89 comments' },
    { id: 4, type: 'scheduled', title: 'How-to guide for startup founders', time: '12h ago', metric: 'Tomorrow 9:00 AM' },
    { id: 5, type: 'published', title: 'My hiring framework for early-stage', time: '1d ago', metric: '2,100 impressions' },
    { id: 6, type: 'engagement', title: 'Listicle: 7 tools every PM needs', time: '2d ago', metric: '45 shares' },
  ]
}

function generateTopPosts() {
  return [
    { id: 1, title: 'The uncomfortable truth about AI in hiring...', impressions: 4820, engagement: 6.2, likes: 189, comments: 67 },
    { id: 2, title: '7 tools that saved me 10 hours/week', impressions: 3950, engagement: 5.8, likes: 156, comments: 42 },
    { id: 3, title: 'Why I stopped chasing LinkedIn virality', impressions: 3100, engagement: 7.1, likes: 134, comments: 89 },
    { id: 4, title: 'My 90-day content strategy breakdown', impressions: 2800, engagement: 4.9, likes: 98, comments: 31 },
    { id: 5, title: 'Hot take: Remote work is here to stay', impressions: 2450, engagement: 5.4, likes: 112, comments: 56 },
  ]
}

function computeHealthScore() {
  const consistency = 82 // posting consistency
  const engagement = 74 // engagement rate vs avg
  const growth = 68 // follower growth rate
  const quality = 88 // avg post quality
  const overall = Math.round((consistency + engagement + growth + quality) / 4)
  return { overall, consistency, engagement, growth, quality }
}

// ─── Component ────────────────────────────────────────────────────
export { AnalyticsDashboardPage }
export default function AnalyticsDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [dailyData, setDailyData] = useState([])
  const [contentMix, setContentMix] = useState([])
  const [activity, setActivity] = useState([])
  const [topPosts, setTopPosts] = useState([])
  const [healthScore, setHealthScore] = useState(null)

  const loadData = useCallback(() => {
    setDailyData(generateOverviewData())
    setContentMix(generateContentMixData())
    setActivity(generateRecentActivity())
    setTopPosts(generateTopPosts())
    setHealthScore(computeHealthScore())
  }, [])

  useEffect(() => {
    loadData()
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [loadData])

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    loadData()
    setTimeout(() => setRefreshing(false), 800)
  }, [loadData])

  // Aggregate KPIs from daily data
  const kpis = useMemo(() => {
    if (!dailyData.length) return null
    const totalImpressions = dailyData.reduce((s, d) => s + d.impressions, 0)
    const totalEngagement = dailyData.reduce((s, d) => s + d.engagement, 0)
    const totalFollowers = dailyData.reduce((s, d) => s + d.followers, 0)
    const avgEngRate = ((totalEngagement / totalImpressions) * 100).toFixed(1)
    return {
      impressions: totalImpressions,
      engagement: totalEngagement,
      followers: totalFollowers,
      engagementRate: avgEngRate,
      postsPublished: 24,
      scheduledPosts: 8,
    }
  }, [dailyData])

  const activityIcons = {
    published: CheckCircle2,
    milestone: Award,
    engagement: Flame,
    scheduled: Clock,
  }

  const activityColors = {
    published: 'text-emerald-500',
    milestone: 'text-amber-500',
    engagement: 'text-orange-500',
    scheduled: 'text-blue-500',
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Overview of your LinkedIn content performance</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-24 mb-3" />
                <div className="h-8 bg-slate-200 rounded w-20 mb-2" />
                <div className="h-3 bg-slate-200 rounded w-32" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            {kpis && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                  icon={Eye}
                  label="Total Impressions"
                  value={kpis.impressions.toLocaleString()}
                  change={12.4}
                  positive
                />
                <KpiCard
                  icon={Heart}
                  label="Total Engagement"
                  value={kpis.engagement.toLocaleString()}
                  change={8.2}
                  positive
                />
                <KpiCard
                  icon={Users}
                  label="New Followers"
                  value={`+${kpis.followers}`}
                  change={5.1}
                  positive
                />
                <KpiCard
                  icon={Target}
                  label="Engagement Rate"
                  value={`${kpis.engagementRate}%`}
                  change={-0.3}
                  positive={false}
                />
              </div>
            )}

            {/* Main Grid: Chart + Health Score */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Impressions & Engagement Trend */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-slate-900">30-Day Performance</h2>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: BRAND.primary }} />
                      Impressions
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      Engagement
                    </span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={dailyData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                    <defs>
                      <linearGradient id="gradImpressions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={BRAND.primary} stopOpacity={0.15} />
                        <stop offset="100%" stopColor={BRAND.primary} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradEngagement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} interval={6} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={45} />
                    <Tooltip
                      contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
                      labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                    />
                    <Area type="monotone" dataKey="impressions" stroke={BRAND.primary} fill="url(#gradImpressions)" strokeWidth={2} />
                    <Area type="monotone" dataKey="engagement" stroke="#10b981" fill="url(#gradEngagement)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Content Health Score */}
              {healthScore && (
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <h2 className="text-base font-semibold text-slate-900 mb-4">Content Health</h2>
                  <div className="flex justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                        <circle
                          cx="50" cy="50" r="42" fill="none"
                          stroke={healthScore.overall >= 80 ? STATUS_COLORS.excellent : healthScore.overall >= 60 ? STATUS_COLORS.good : STATUS_COLORS.fair}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${(healthScore.overall / 100) * 264} 264`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-slate-900">{healthScore.overall}</span>
                        <span className="text-xs text-slate-500">/ 100</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <HealthMetric label="Consistency" value={healthScore.consistency} />
                    <HealthMetric label="Engagement" value={healthScore.engagement} />
                    <HealthMetric label="Growth" value={healthScore.growth} />
                    <HealthMetric label="Quality" value={healthScore.quality} />
                  </div>
                </div>
              )}
            </div>

            {/* Second Row: Content Mix + Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Content Mix Pie */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Content Mix</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={contentMix}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {contentMix.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Share']}
                      contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {contentMix.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="truncate">{item.name}</span>
                      <span className="text-slate-400 ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats Cards */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Quick Stats</h2>
                <div className="space-y-4">
                  <QuickStat icon={FileText} label="Posts Published" value={kpis?.postsPublished ?? 0} subtitle="this month" />
                  <QuickStat icon={Calendar} label="Scheduled" value={kpis?.scheduledPosts ?? 0} subtitle="upcoming" />
                  <QuickStat icon={Clock} label="Best Time" value="Tue 9 AM" subtitle="highest engagement" />
                  <QuickStat icon={Zap} label="Avg. Reach" value="1,240" subtitle="per post" />
                  <QuickStat icon={MessageSquare} label="Response Rate" value="92%" subtitle="comments replied" />
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h2 className="text-base font-semibold text-slate-900 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {activity.map((item) => {
                    const Icon = activityIcons[item.type] || Activity
                    const colorClass = activityColors[item.type] || 'text-slate-400'
                    return (
                      <div key={item.id} className="flex gap-3 items-start">
                        <div className={cn('mt-0.5 flex-shrink-0', colorClass)}>
                          <Icon size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-800 font-medium truncate">{item.title}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span>{item.time}</span>
                            <span className="text-slate-300">·</span>
                            <span>{item.metric}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Top Performing Posts */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-slate-900">Top Performing Posts</h2>
                <button className="flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: BRAND.primary }}>
                  View all analytics <ChevronRight size={12} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wider">Post</th>
                      <th className="text-right py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wider">Impressions</th>
                      <th className="text-right py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wider">Eng. Rate</th>
                      <th className="text-right py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wider">Likes</th>
                      <th className="text-right py-2 px-2 text-xs font-medium text-slate-500 uppercase tracking-wider">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPosts.map((post, i) => (
                      <tr key={post.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                              style={{ backgroundColor: i < 3 ? BRAND.primary : '#94a3b8' }}
                            >
                              {i + 1}
                            </span>
                            <span className="font-medium text-slate-900 truncate max-w-xs">{post.title}</span>
                          </div>
                        </td>
                        <td className="text-right py-3 px-2 text-slate-700">{post.impressions.toLocaleString()}</td>
                        <td className="text-right py-3 px-2">
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: post.engagement >= 6 ? '#ecfdf5' : post.engagement >= 4 ? '#ecfeff' : '#fef3c7',
                              color: post.engagement >= 6 ? '#059669' : post.engagement >= 4 ? '#0891b2' : '#d97706',
                            }}
                          >
                            {post.engagement}%
                          </span>
                        </td>
                        <td className="text-right py-3 px-2 text-slate-700">{post.likes}</td>
                        <td className="text-right py-3 px-2 text-slate-700">{post.comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Posting Schedule Heatmap (simplified bar chart by day of week) */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h2 className="text-base font-semibold text-slate-900 mb-4">Engagement by Day of Week</h2>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart
                  data={[
                    { day: 'Mon', engagement: 145 },
                    { day: 'Tue', engagement: 210 },
                    { day: 'Wed', engagement: 178 },
                    { day: 'Thu', engagement: 165 },
                    { day: 'Fri', engagement: 132 },
                    { day: 'Sat', engagement: 68 },
                    { day: 'Sun', engagement: 52 },
                  ]}
                  margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickLine={false} axisLine={false} width={40} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Bar dataKey="engagement" fill={BRAND.primary} radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

// ─── Sub-components ───────────────────────────────────────────────

function KpiCard({ icon: Icon, label, value, change, positive }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-500">{label}</span>
        <div className="p-2 rounded-lg" style={{ backgroundColor: BRAND.primaryLight }}>
          <Icon size={16} style={{ color: BRAND.primary }} />
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      {change !== undefined && (
        <div className={cn('flex items-center gap-1 text-xs font-medium', positive ? 'text-emerald-600' : 'text-red-500')}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {positive ? '+' : ''}{change}%
          <span className="text-slate-400 font-normal ml-1">vs prev period</span>
        </div>
      )}
    </div>
  )
}

function HealthMetric({ label, value }) {
  const color = value >= 80 ? STATUS_COLORS.excellent : value >= 60 ? STATUS_COLORS.good : value >= 40 ? STATUS_COLORS.fair : STATUS_COLORS.poor
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium text-slate-800">{value}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

function QuickStat({ icon: Icon, label, value, subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: BRAND.primaryLight }}>
        <Icon size={14} style={{ color: BRAND.primary }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="text-sm font-semibold text-slate-900">{value}</div>
      </div>
      <span className="text-xs text-slate-400">{subtitle}</span>
    </div>
  )
}
