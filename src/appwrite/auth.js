import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

//Making a class that will handle all the auth related operations
// such as creating an account, logging in, getting current user, and logging out
//Then we will export an instance of this class to be used in the app
//This will allow us to use the same instance of the class throughout the app

//By this approach, we can easily change service provider in the future
//Like updating the constructor to use Firebase or Supabase instead of Appwrite
//Then change internal methods to match the new service provider's API
//This will help to remove vendor lock-in problem this problem is like a common problem in software development this problem say it is very costly to change the service provider once you have integrated it into your application

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    // If the user is not logged in, return null
    // This will be used to check if the user is logged in or not

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
