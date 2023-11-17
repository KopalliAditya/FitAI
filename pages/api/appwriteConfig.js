import { Client, Account, Databases   } from "appwrite";
import axios from 'axios';


const client = new Client();
 
const appwriteEndpoint = 'https://cloud.appwrite.io/v1'
const appwrite_api_key = '65557380817400ef2359';
const api_key = '82f0c137ac28a80df90c4d4bd156f6e24dee79f3184c0df74d8fa08777c7e6ae2f4a701f231384625fb38b06a7cfb79ef44a06a0320487372506cdc6fc094ae8a98c9feeb9d761ab1caadc4a6151cd477fef435ea516682651f0ed420bd2f99cbc0775227a6ada80aa626305685796aaed6e82e593b0d2c86c19ec27240103f2';

// Replace with your actual database key
const database_key = '65557413e2b6853085c6';
//const database_key = process.env.REACT_APP_DATABASE_APPWRITE_API_KEY;


// Set the endpoint URL and project ID for the client
client
  .setEndpoint(appwriteEndpoint)
  .setProject(appwrite_api_key);

// Create a new account instance using the client
export const account = new Account(client);

// Create a new databases instance using the client and database ID
export const databases = new Databases(client, database_key);


// Function to get all users
export const getUsers = async () => {
  try {
    const response = await axios.get('https://cloud.appwrite.io/v1/users', {
      headers: {
        'X-Appwrite-Project': appwrite_api_key,
        'X-Appwrite-Key': api_key,
      },
    });

    const usersList = response.data.users;
    return usersList;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
