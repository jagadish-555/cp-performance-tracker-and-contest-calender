import conf from '../conf/conf.js';
import { Client, Account, ID, Databases, Query } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) 
            .setProject(conf.appwriteProjectId) 


        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }


    async createAccount({ email, password, name, codeforcesId, leetcodeId, codechefId }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {

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


                return this.login({ email, password });
            }

            return userAccount;
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error;
        }
    }


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


    async getCurrentUser() {
        try {
            const user = await this.account.get(); 
            console.log("AuthService :: getCurrentUser :: user", user);
            return user;
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error);
            if (error.code === 401) {
                console.warn("AuthService :: getCurrentUser :: Unauthorized. No active session.");
            }
            return null; 
        }
    }


    async logout() {
        try {
            await this.account.deleteSessions(); 
            console.log("AuthService :: logout :: User logged out successfully");
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
        }
    }


    async getUserProfile() {
        try {
            const currentUser = await this.getCurrentUser();


            if (!currentUser) {
                throw new Error("No logged-in user");
            }


            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userId", currentUser.$id) 
                ]
            );

            if (result.total > 0) {
                return result.documents[0]; 
            } else {
                throw new Error("User profile not found");
            }

        } catch (error) {
            console.error("AuthService :: getUserProfile :: error", error);
            throw error;
        }
    }
}


const authService = new AuthService();
export default authService;
