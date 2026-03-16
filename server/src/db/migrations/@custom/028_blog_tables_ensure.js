'use strict'

/**
 * Migration 028 – Ensure blog_posts table exists
 *
 * The blog API (GET /api/blog) returns 500 because the blog_posts table
 * is missing. Migration 012 should have created it but may have been
 * recorded in schema_migrations without the table actually existing
 * (e.g. after a schema_migrations reset + partial re-run).
 *
 * This migration re-applies the blog_posts schema using
 * CREATE TABLE IF NOT EXISTS, so it is safe whether 012 ran or not.
 */

const fs = require('fs')
const path = require('path')

const SCHEMAS_DIR = path.join(__dirname, '../../schemas/@custom')

exports.up = async (db) => {
  const sql = fs.readFileSync(path.join(SCHEMAS_DIR, 'blog_posts.sql'), 'utf8')
  await db.none(sql)
  console.log('[028_blog_tables_ensure] ensured blog_posts table exists')
}

exports.down = async (db) => {
  // No-op: do not drop blog_posts — owned by migration 012
  console.log('[028_blog_tables_ensure] down: no-op (blog_posts owned by 012)')
}
