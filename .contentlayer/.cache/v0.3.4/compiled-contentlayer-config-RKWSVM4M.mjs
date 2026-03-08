// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    excerpt: { type: "string", required: true },
    cover: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    featured: { type: "boolean", required: false, default: false },
    // Enhanced fields for social/media feed
    format: {
      type: "enum",
      options: ["article", "video", "gallery", "status"],
      default: "article",
      required: false
    },
    videoUrl: { type: "string", required: false },
    images: { type: "list", of: { type: "string" }, required: false },
    author: {
      type: "string",
      required: false,
      default: "Tammaha Team"
    },
    authorAvatar: { type: "string", required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.sourceFileName.replace(/\.mdx$/, "")}`
    },
    readingTime: {
      type: "string",
      resolve: (doc) => {
        const words = doc.body.raw.split(/\s+/gu).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
      }
    }
  }
}));
var Event = defineDocumentType(() => ({
  name: "Event",
  filePathPattern: "events/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    excerpt: { type: "string", required: true },
    cover: { type: "string", required: false },
    location: { type: "string", required: true }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/events/${doc._raw.sourceFileName.replace(/\.mdx$/, "")}`
    }
  }
}));
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    excerpt: { type: "string", required: true },
    cover: { type: "string", required: false },
    status: {
      type: "enum",
      options: ["ongoing", "completed", "planned"],
      default: "ongoing"
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/actions/${doc._raw.sourceFileName.replace(/\.mdx$/, "")}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Event, Project]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-RKWSVM4M.mjs.map
