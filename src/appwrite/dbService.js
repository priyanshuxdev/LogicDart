import { Client, Databases, Storage, ID, Query } from "appwrite";
import { config } from "../config/config";

class DBService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createBlogPost({
    title,
    slug,
    featuredImage,
    content,
    status,
    userId,
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        {
          title,
          featuredImage,
          content,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Service Error :: createBlogPostError", error);
    }
  }

  async updateBlogPost(slug, { title, featuredImage, content, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          featuredImage,
          content,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service Error :: updateBlogPostError", error);
    }
  }

  async deleteBlogPost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service Error :: deleteBlogPostError", error);
      return false;
    }
  }

  async getBlogPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service Error :: getBlogPostError", error);
    }
  }

  async getBlogPosts() {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Appwrite Service Error :: getBlogPostsError", error);
    }
  }

  //file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service Error :: fileUploadError", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Service Error :: deleteFileError", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const dbService = new DBService();

export { dbService };
