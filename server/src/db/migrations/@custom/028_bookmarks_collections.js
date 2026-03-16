'use strict'

/**
 * Migration 028 — Bookmarks and Collections (Shelf core)
 *
 * Creates:
 *   1. collections — user-owned bookmark folders with color coding
 *   2. bookmarks — saved URLs with metadata, tags, and collection assignment
 */

exports.up = async (db) => {
  await db.none(`
    CREATE TABLE IF NOT EXISTS collections (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(200) NOT NULL,
      description TEXT,
      color VARCHAR(7) DEFAULT '#6366F1',
      parent_id INTEGER REFERENCES collections(id) ON DELETE SET NULL,
      position INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_collections_user ON collections(user_id);
    CREATE INDEX IF NOT EXISTS idx_collections_parent ON collections(parent_id);
  `)

  await db.none(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      collection_id INTEGER REFERENCES collections(id) ON DELETE SET NULL,
      title VARCHAR(500) NOT NULL,
      url TEXT NOT NULL,
      description TEXT,
      favicon TEXT,
      tags TEXT[] DEFAULT '{}',
      is_favourite BOOLEAN DEFAULT FALSE,
      is_read BOOLEAN DEFAULT FALSE,
      reading_progress INTEGER DEFAULT 0,
      extracted_text TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);
    CREATE INDEX IF NOT EXISTS idx_bookmarks_collection ON bookmarks(collection_id);
    CREATE INDEX IF NOT EXISTS idx_bookmarks_tags ON bookmarks USING GIN(tags);
    CREATE INDEX IF NOT EXISTS idx_bookmarks_created ON bookmarks(user_id, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_bookmarks_search ON bookmarks USING GIN(
      to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(description, '') || ' ' || COALESCE(extracted_text, ''))
    );
  `)
}

exports.down = async (db) => {
  await db.none('DROP TABLE IF EXISTS bookmarks CASCADE')
  await db.none('DROP TABLE IF EXISTS collections CASCADE')
}
