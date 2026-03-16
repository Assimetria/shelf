const express = require('express')
const router = express.Router()
const {
  asyncHandler,
  successResponse,
  errorResponse,
  authenticate,
} = require('../../../lib/@system/Helpers')
const db = require('../../../db')

// ───────────────────────────────────────────────────────────────────────────
// GET /api/bookmarks - List bookmarks
// ───────────────────────────────────────────────────────────────────────────
router.get(
  '/api/bookmarks',
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user.id
    const { collection, tag, q, limit = 50, offset = 0 } = req.query

    let query = `
      SELECT b.*, c.name as collection_name, c.color as collection_color
      FROM bookmarks b
      LEFT JOIN collections c ON b.collection_id = c.id
      WHERE b.user_id = $1
    `
    const params = [userId]
    let paramIdx = 2

    if (collection) {
      query += ` AND b.collection_id = $${paramIdx++}`
      params.push(collection)
    }

    if (tag) {
      query += ` AND $${paramIdx++} = ANY(b.tags)`
      params.push(tag)
    }

    if (q) {
      query += ` AND (b.title ILIKE $${paramIdx} OR b.description ILIKE $${paramIdx} OR b.url ILIKE $${paramIdx})`
      params.push(`%${q}%`)
      paramIdx++
    }

    query += ` ORDER BY b.created_at DESC LIMIT $${paramIdx++} OFFSET $${paramIdx++}`
    params.push(parseInt(limit, 10), parseInt(offset, 10))

    const result = await db.query(query, params)
    res.json(successResponse(result.rows, { dataKey: 'bookmarks' }))
  })
)

// ───────────────────────────────────────────────────────────────────────────
// GET /api/bookmarks/stats - Dashboard stats
// ───────────────────────────────────────────────────────────────────────────
router.get(
  '/api/bookmarks/stats',
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user.id

    const stats = await db.query(
      `SELECT
        (SELECT COUNT(*) FROM bookmarks WHERE user_id = $1) as total_bookmarks,
        (SELECT COUNT(*) FROM collections WHERE user_id = $1) as total_collections,
        (SELECT COUNT(DISTINCT unnest) FROM bookmarks, unnest(tags) WHERE user_id = $1) as total_tags,
        (SELECT COUNT(*) FROM bookmarks WHERE user_id = $1 AND created_at > NOW() - INTERVAL '7 days') as recent_saves
      `,
      [userId]
    )

    res.json(successResponse(stats.rows[0], { dataKey: 'stats' }))
  })
)

// ───────────────────────────────────────────────────────────────────────────
// POST /api/bookmarks - Create bookmark
// ───────────────────────────────────────────────────────────────────────────
router.post(
  '/api/bookmarks',
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user.id
    const { title, url, description, collection_id, tags } = req.body

    if (!url) {
      return res.status(400).json(errorResponse('URL is required'))
    }

    const result = await db.query(
      `INSERT INTO bookmarks (user_id, title, url, description, collection_id, tags, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
       RETURNING *`,
      [userId, title || url, url, description || null, collection_id || null, tags || []]
    )

    res.status(201).json(successResponse(result.rows[0], { dataKey: 'bookmark' }))
  })
)

// ───────────────────────────────────────────────────────────────────────────
// PATCH /api/bookmarks/:id - Update bookmark
// ───────────────────────────────────────────────────────────────────────────
router.patch(
  '/api/bookmarks/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user.id
    const { id } = req.params
    const { title, url, description, collection_id, tags } = req.body

    const existing = await db.query(
      'SELECT * FROM bookmarks WHERE id = $1 AND user_id = $2',
      [id, userId]
    )

    if (!existing.rows[0]) {
      return res.status(404).json(errorResponse('Bookmark not found'))
    }

    const result = await db.query(
      `UPDATE bookmarks SET
        title = COALESCE($3, title),
        url = COALESCE($4, url),
        description = COALESCE($5, description),
        collection_id = COALESCE($6, collection_id),
        tags = COALESCE($7, tags),
        updated_at = NOW()
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, userId, title, url, description, collection_id, tags]
    )

    res.json(successResponse(result.rows[0], { dataKey: 'bookmark' }))
  })
)

// ───────────────────────────────────────────────────────────────────────────
// DELETE /api/bookmarks/:id - Delete bookmark
// ───────────────────────────────────────────────────────────────────────────
router.delete(
  '/api/bookmarks/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user.id
    const { id } = req.params

    const result = await db.query(
      'DELETE FROM bookmarks WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    )

    if (!result.rows[0]) {
      return res.status(404).json(errorResponse('Bookmark not found'))
    }

    res.json(successResponse(null, { message: 'Bookmark deleted' }))
  })
)

// ───────────────────────────────────────────────────────────────────────────
// GET /api/collections - List collections
// ───────────────────────────────────────────────────────────────────────────
router.get(
  '/api/collections',
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user.id

    const result = await db.query(
      `SELECT c.*, COUNT(b.id) as bookmark_count
       FROM collections c
       LEFT JOIN bookmarks b ON b.collection_id = c.id
       WHERE c.user_id = $1
       GROUP BY c.id
       ORDER BY c.name ASC`,
      [userId]
    )

    res.json(successResponse(result.rows, { dataKey: 'collections' }))
  })
)

// ───────────────────────────────────────────────────────────────────────────
// POST /api/collections - Create collection
// ───────────────────────────────────────────────────────────────────────────
router.post(
  '/api/collections',
  authenticate,
  asyncHandler(async (req, res) => {
    const userId = req.user.id
    const { name, color, description } = req.body

    if (!name) {
      return res.status(400).json(errorResponse('Name is required'))
    }

    const result = await db.query(
      `INSERT INTO collections (user_id, name, color, description, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING *`,
      [userId, name, color || '#6366F1', description || null]
    )

    res.status(201).json(successResponse(result.rows[0], { dataKey: 'collection' }))
  })
)

module.exports = router
