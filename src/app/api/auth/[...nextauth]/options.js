import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

import User from '@/models/user';
import Collection from '@/models/collection';
import { connectToDB } from '@/db';

export const options = {
	//secret: process.env.NEXTAUTH_SECRET,
    providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],
    callbacks: {
		async session({ session }) {
			
			try {
				await connectToDB();
				// store the user id from MongoDB to session
				console.log('Getting session');
				const sessionUser = await User.findOne({ email: session.user.email });
				session.user.id = sessionUser._id.toString();
	
				return session;
			} 
			catch (error) {
				console.log(error);
				return null;
			}
      	},
		async signIn({ account, profile, user, credentials }) {
			try {
				await connectToDB();

				// check if user already exists
				const userExists = await User.findOne({ email: profile.email });

				// if not, create a new document and save user in MongoDB
				if (!userExists) {
					
					const user = await User.create({
						email: profile.email,
						username: profile.name.replaceAll(" ", "").toLowerCase(),
						image: profile.picture,
					});

					await Collection.create({
						creator: user._id.toString()
					});
				}

				return true
			} 
			catch (error) {
				console.log("Error checking if user exists: ", error.message);
				return false
			}
		},
	}
}