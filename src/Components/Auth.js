import React, { useState } from "react";
import { auth, googleProvider, githubProvider } from "../config/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";

export default function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// console.log(auth?.currentUser?.email);

	// Auth
	const signIn = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.log(err);
		}
	};

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (err) {
			console.log(err);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div>
			<input
				placeholder="Email"
				type="email"
				onChange={(e) => setEmail(e.target.value)}
			></input>
			<input
				placeholder="Password"
				type="password"
				onChange={(e) => setPassword(e.target.value)}
			></input>
			<button onClick={signIn}>Sign In</button>
			<button onClick={signInWithGoogle}>Sign In with Google</button>

			<button
				onClick={logout}
				style={{ backgroundColor: auth?.currentUser ? "green" : "red" }}
			>
				Logout
			</button>
		</div>
	);
}
