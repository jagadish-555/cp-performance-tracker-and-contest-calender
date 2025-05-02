import conf from '../conf/conf.js';
import { Client, Account, ID, Databases, Query } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Set Appwrite endpoint
            .setProject(conf.appwriteProjectId) // Set Appwrite project ID
            // .setCookieFallback(true); // Enable cookie fallback for session management

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }

    // Create account and login the user
    async createAccount({ email, password, name, codeforcesId, leetcodeId, codechefId }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // Create a user profile document in the database
                await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    ID.unique(),
                    {
                        userId: userAccount.$id,
                        codeforcesId,
                        leetcodeId,
                        codechefId
                    }
                );

                // Login the user after account creation
                return this.login({ email, password });
            }

            return userAccount;
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error;
        }
    }

    // Login the user using email and password
    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("AuthService :: login :: session created", session);
            return session;
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error;
        }
    }

    // Get the current logged-in user
    async getCurrentUser() {
        try {
            const user = await this.account.get(); // Fetch the current authenticated user
            console.log("AuthService :: getCurrentUser :: user", user);
            return user;
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error);
            if (error.code === 401) {
                console.warn("AuthService :: getCurrentUser :: Unauthorized. No active session.");
            }
            return null; // Return null if the user is not authenticated
        }
    }

    // Logout the current user
    async logout() {
        try {
            await this.account.deleteSessions(); // Delete all sessions to log out the user
            console.log("AuthService :: logout :: User logged out successfully");
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
        }
    }

    // Fetch user profile based on the logged-in user
    async getUserProfile() {
        try {
            const currentUser = await this.getCurrentUser();

            // Ensure the user is logged in
            if (!currentUser) {
                throw new Error("No logged-in user");
            }

            // Query for the user's profile document
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userId", currentUser.$id) // Match the profile by userId
                ]
            );

            if (result.total > 0) {
                return result.documents[0]; // Return the first matched profile
            } else {
                throw new Error("User profile not found");
            }

        } catch (error) {
            console.error("AuthService :: getUserProfile :: error", error);
            throw error;
        }
    }
}

// Instantiate and export the AuthService
const authService = new AuthService();
export default authService;