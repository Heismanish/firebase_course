import logo from "./logo.svg";
import "./App.css";
import Auth from "./Components/Auth.js";
import { db, auth, storage } from "./config/firebase";
import {
	getDocs,
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ref, uploadBytes } from "firebase/storage";

function App() {
	const [movieList, setMovieList] = useState([]);

	// Movie states:
	const [newMovieTitle, setNewMovieTitle] = useState("");
	const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
	const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
	const [updatedMovieTitle, setUpdatedMovieTitle] = useState("");

	// FIle upload state
	const [fileUpload, setFileUpload] = useState(null);

	const moviesCollectionRef = collection(db, "movies");

	// Reading Data from database
	const getMovieList = async () => {
		try {
			const data = await getDocs(moviesCollectionRef);
			const filteredData = data.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			setMovieList(filteredData);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getMovieList();
	}, [movieList]);

	// CREATE MOVIE
	const onSubmitMovie = async () => {
		try {
			console.log(newMovieTitle);
			const movie = {
				name: newMovieTitle,
				releaseDate: newMovieReleaseDate,
				recievedAnOscar: isNewMovieOscar,
				userId: auth?.currentUser?.uid,
			};
			await addDoc(moviesCollectionRef, movie);

			// refetching values from db
			getMovieList();

			// clearing values
			// setNewMovieTitle("");
			// setNewMovieReleaseDate(0);
			// setIsNewMovieOscar(false);
		} catch (err) {
			console.log(err);
		}
	};

	// DELETE MOVIE
	const deleteMovie = async (id) => {
		try {
			const movieDoc = doc(db, "movies", id);
			await deleteDoc(movieDoc);
		} catch (error) {
			console.log(error);
		}
	};

	// Update Movie
	const updateMovie = async (id) => {
		try {
			const movieDoc = doc(db, "movies", id);
			await updateDoc(movieDoc, { name: updatedMovieTitle });
		} catch (error) {
			console.log(error);
		}
	};

	// Upload file
	const uploadFile = async () => {
		if (!fileUpload) return;
		const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
		try {
			await uploadBytes(filesFolderRef, fileUpload);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App">
			<Auth></Auth>

			<div>
				<input
					placeholder="Movie Title..."
					onChange={(e) => setNewMovieTitle(e.target.value)}
				/>
				<input
					placeholder="Release Date..."
					type="number"
					onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
				/>
				<input
					type="checkbox"
					checked={isNewMovieOscar}
					onChange={(e) => setIsNewMovieOscar(e.target.checked)}
				/>
				<label>Recieved an oscar</label>
				<button onClick={onSubmitMovie}>Submit Movie</button>
			</div>

			<div>
				{movieList.map((movie) => (
					<div>
						<h1 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
							{movie.name}
						</h1>
						<p>Date: {movie.releaseDate}</p>
						<button onClick={() => deleteMovie(movie.id)}>Delete movie</button>

						<input
							placeholder="new title"
							onChange={(e) => setUpdatedMovieTitle(e.target.value)}
						/>
						<button onClick={() => updateMovie(movie.id)}> Update Title</button>
					</div>
				))}
			</div>
			<input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
			<button onClick={uploadFile}>Upload file</button>
		</div>
	);
}

export default App;
