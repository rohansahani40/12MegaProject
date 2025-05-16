import conf from "../conf.js";
import { Client, Databases, Storage, Query, Id } from "appwrite";

export class AppwriteService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,

        {
          title,
          content,
          featuredImage,
          userId,
          createdAt: Date.now(),
          userId,
        }
      );
    } catch (error) {
      console.log("AppwriteService::createPost::error", error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, documentId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        {
          title,
          content,
          featuredImage,
          status: "published",
        }
      );
    } catch (error) {
      console.log("AppwriteService::updatePost::error", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("AppwriteService::deletePost::error", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("AppwriteService::getPost::error", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active ")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("AppwriteService::getPosts::error", error);
    }
  }
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        Id.unique(),
        file
      );
    } catch (error) {
      console.log("AppwriteService::uploadFile::error", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(fileId);
      return true;
    } catch (error) {
      console.log("AppwriteService::deleteFile::error", error);
      return false;
      return;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;
