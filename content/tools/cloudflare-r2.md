---
slug: cloudflare-r2
title: "Cloudflare R2 - S3-Compatible Storage Without Egress Fees"
description: "Store unlimited data in Cloudflare R2 with zero egress fees. S3-compatible API means easy migration. 10GB free storage,永远 zero egress."
category: Cloudflare
tags: [cloudflare, cloudflare-r2, r2-storage, s3-alternative, object-storage, zero-egress, aws-s3-alternative]
website: https://developers.cloudflare.com/r2/
pricing: free
logo: /images/tools/cloudflare-r2.png
features:
  - "10GB free storage"
  - "Zero egress fees - forever"
  - "S3-compatible API"
  - "Automatic global replication"
  - "Works with Cloudflare Images"
  - "No bandwidth charges"
pros:
  - "Massive cost savings vs AWS S3"
  - "Easy S3 migration"
  - "Integrated with Workers and Pages"
  - "No egress anxiety"
  - "Predictable pricing"
cons:
  - "Smaller ecosystem than S3"
  - "Fewer integrations"
  - "No S3 Select"
alternatives:
  - AWS S3
  - Google Cloud Storage
  - Azure Blob Storage
  - Backblaze B2
createdAt: 2026-05-09
updatedAt: 2026-05-09
publishedAt: 2026-05-09
---

# Cloudflare R2 Storage

## The Storage Solution That Doesn't Nickel-and-Dime You

AWS S3 charges you to:
- Store your data: $0.023/GB/month
- **Download your data**: $0.09/GB

That's right. They charge you to take your own data out.

Cloudflare R2 says **fuck that**.

## R2 vs S3

| | Cloudflare R2 | AWS S3 |
|--|---------------|--------|
| Storage (1TB) | $0 | $23 |
| Egress (1TB) | **$0** | $90 |
| **Total** | **$0** | **$113** |

You're paying $113/month for 1TB on S3. On R2? **$0.**

## Migration is Easy

R2 is S3-compatible. Your existing code works:

```javascript
// Before (S3)
const s3 = new S3Client({ ... })

// After (R2) - just change the endpoint
const r2 = new S3Client({
  region: 'auto',
  endpoint: 'https://xxx.r2.cloudflarestorage.com',
  credentials: { accessKeyId, secretAccessKey }
})
```

## Use Cases

- **Static Assets**: Images, videos, downloads
- **User Uploads**: Profile pics, attachments
- **Backups**: No egress fear
- **Media Streaming**: No bandwidth anxiety

## The Verdict

R2 is the storage platform developers actually want. Zero egress fees means you can actually use your data.

**Stop paying AWS to access your own files.**
