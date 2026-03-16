import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../../../components/@system/Header/Header'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/@system/Card/Card'
import { Button } from '../../../components/@system/ui/button'
import { Badge } from '../../../components/@system/ui/badge'
import {
  Bookmark,
  FolderOpen,
  Tag,
  Clock,
  Plus,
  Upload,
  ExternalLink,
  Search,
  MoreHorizontal,
  TrendingUp,
  Star,
} from 'lucide-react'
import styles from './ShelfDashboardPage.module.scss'

// Mock data — replace with API calls (api.get('/bookmarks'), etc.)
const MOCK_STATS = {
  totalBookmarks: 342,
  collections: 18,
  tags: 47,
  recentSaves: 23,
}

const MOCK_BOOKMARKS = [
  {
    id: 1,
    title: 'React Server Components Explained',
    url: 'https://react.dev/blog/server-components',
    collection: 'Engineering',
    tags: ['react', 'frontend'],
    savedAt: '2026-03-16T10:30:00Z',
    favicon: null,
  },
  {
    id: 2,
    title: 'The Future of AI in Product Development',
    url: 'https://example.com/ai-product-dev',
    collection: 'Research',
    tags: ['ai', 'product'],
    savedAt: '2026-03-15T16:45:00Z',
    favicon: null,
  },
  {
    id: 3,
    title: 'Design Systems at Scale',
    url: 'https://example.com/design-systems',
    collection: 'Design',
    tags: ['design', 'systems'],
    savedAt: '2026-03-15T09:20:00Z',
    favicon: null,
  },
  {
    id: 4,
    title: 'PostgreSQL Performance Tuning Guide',
    url: 'https://example.com/pg-tuning',
    collection: 'Engineering',
    tags: ['database', 'postgres'],
    savedAt: '2026-03-14T14:10:00Z',
    favicon: null,
  },
  {
    id: 5,
    title: 'Building a Second Brain — Summary',
    url: 'https://example.com/second-brain',
    collection: 'Reading',
    tags: ['productivity', 'knowledge'],
    savedAt: '2026-03-14T08:55:00Z',
    favicon: null,
  },
]

const MOCK_COLLECTIONS = [
  { id: 1, name: 'Engineering', count: 89, color: '#3B82F6' },
  { id: 2, name: 'Design', count: 54, color: '#8B5CF6' },
  { id: 3, name: 'Research', count: 67, color: '#EC4899' },
  { id: 4, name: 'Reading', count: 45, color: '#10B981' },
  { id: 5, name: 'Inspiration', count: 38, color: '#F59E0B' },
  { id: 6, name: 'Tools', count: 29, color: '#6366F1' },
]

function StatCard({ icon: Icon, label, value, trend }) {
  return (
    <Card className={styles.statCard}>
      <CardContent className={styles.statContent}>
        <div className={styles.statIcon}>
          <Icon size={20} />
        </div>
        <div className={styles.statInfo}>
          <p className={styles.statValue}>{value}</p>
          <p className={styles.statLabel}>{label}</p>
        </div>
        {trend && (
          <div className={styles.statTrend}>
            <TrendingUp size={14} />
            <span>{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function BookmarkRow({ bookmark }) {
  const domain = (() => {
    try {
      return new URL(bookmark.url).hostname.replace('www.', '')
    } catch {
      return bookmark.url
    }
  })()

  const timeAgo = (() => {
    const diff = Date.now() - new Date(bookmark.savedAt).getTime()
    const hours = Math.floor(diff / 3600000)
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  })()

  return (
    <div className={styles.bookmarkRow}>
      <div className={styles.bookmarkIcon}>
        <Bookmark size={16} />
      </div>
      <div className={styles.bookmarkInfo}>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bookmarkTitle}
        >
          {bookmark.title}
          <ExternalLink size={12} className={styles.externalIcon} />
        </a>
        <div className={styles.bookmarkMeta}>
          <span className={styles.bookmarkDomain}>{domain}</span>
          <span className={styles.metaSep}>in</span>
          <span className={styles.bookmarkCollection}>{bookmark.collection}</span>
        </div>
      </div>
      <div className={styles.bookmarkTags}>
        {bookmark.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className={styles.tag}>
            {tag}
          </Badge>
        ))}
      </div>
      <span className={styles.bookmarkTime}>{timeAgo}</span>
    </div>
  )
}

function CollectionItem({ collection }) {
  return (
    <div className={styles.collectionItem}>
      <div className={styles.collectionColor} style={{ backgroundColor: collection.color }} />
      <span className={styles.collectionName}>{collection.name}</span>
      <span className={styles.collectionCount}>{collection.count}</span>
    </div>
  )
}

export function ShelfDashboardPage() {
  const [stats] = useState(MOCK_STATS)
  const [bookmarks] = useState(MOCK_BOOKMARKS)
  const [collections] = useState(MOCK_COLLECTIONS)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className={styles.main}>
        {/* Welcome */}
        <div className={styles.welcome}>
          <div>
            <h1 className={styles.welcomeTitle}>Your Library</h1>
            <p className={styles.welcomeSubtitle}>
              {stats.totalBookmarks} items saved across {stats.collections} collections
            </p>
          </div>
          <div className={styles.welcomeActions}>
            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search bookmarks..."
                className={styles.searchInput}
              />
            </div>
            <Button className={styles.primaryBtn}>
              <Plus size={16} />
              Save Bookmark
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <StatCard icon={Bookmark} label="Total Bookmarks" value={stats.totalBookmarks} trend="+12%" />
          <StatCard icon={FolderOpen} label="Collections" value={stats.collections} />
          <StatCard icon={Tag} label="Tags" value={stats.tags} />
          <StatCard icon={Clock} label="Saved This Week" value={stats.recentSaves} trend="+8%" />
        </div>

        {/* Main content */}
        <div className={styles.contentGrid}>
          {/* Recent bookmarks */}
          <Card className={styles.recentCard}>
            <CardHeader className={styles.recentHeader}>
              <CardTitle className={styles.recentTitle}>Recent Saves</CardTitle>
              <Link to="/app/library" className={styles.viewAll}>
                View all
              </Link>
            </CardHeader>
            <CardContent className={styles.recentContent}>
              {bookmarks.map((bm) => (
                <BookmarkRow key={bm.id} bookmark={bm} />
              ))}
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Collections */}
            <Card>
              <CardHeader className={styles.sideHeader}>
                <CardTitle className={styles.sideTitle}>Collections</CardTitle>
                <button className={styles.iconBtn}>
                  <Plus size={16} />
                </button>
              </CardHeader>
              <CardContent className={styles.collectionsContent}>
                {collections.map((col) => (
                  <CollectionItem key={col.id} collection={col} />
                ))}
              </CardContent>
            </Card>

            {/* Quick actions */}
            <Card>
              <CardHeader>
                <CardTitle className={styles.sideTitle}>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className={styles.quickActions}>
                <Button variant="outline" className={styles.actionBtn}>
                  <FolderOpen size={16} />
                  New Collection
                </Button>
                <Button variant="outline" className={styles.actionBtn}>
                  <Upload size={16} />
                  Import Bookmarks
                </Button>
                <Button variant="outline" className={styles.actionBtn}>
                  <Star size={16} />
                  View Favourites
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
