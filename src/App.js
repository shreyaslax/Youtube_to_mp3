import { useState } from "react";

function App() {
	const [url, setUrl] = useState("");
	const [audiolink, setAudioLink] = useState(""); // stores the retrieved audio link

	const handleSubmit = async (e) => {
		e.preventDefault();
		const videoId = url.split("v=")[1].substring(0, 11);

		try {
			const response = await fetch(
				`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,
				{
					method: "GET",
					headers: {
						"X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
						"X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com/dl",
					},
				}
			);

			if (response.ok) {
				const data = await response.json();
				setAudioLink(data?.link); // API returns the MP3 download link in the 'link' property
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			setAudioLink(""); // Reset the MP3 link if there is an error with the API call
		}
	};

	// to handle new URL
	const handleNewAudio = () => {
		setUrl("");
		setAudioLink("");
	};

	return (
		<div className="app">
			<span className="logo">youtube2mp3</span>
			<section className="content">
				<h1 className="content_title">YouTube to MP3 Converter</h1>
				<p className="content_description">
					Transform YouTube videos into MP3s in just a few clicks!
				</p>
				<form className="form" onSubmit={handleSubmit}>
					<input
						placeholder="Paste a YouTube Video URL..."
						type="text"
						className="form_input"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
					<button type="submit" className="form_button">
						Search
					</button>
				</form>

				{audiolink ? (
					<a href={audiolink} className="download_btn" onClick={handleNewAudio}>
						Download MP3
					</a>
				) : (
					""
				)}
			</section>
		</div>
	);
}

export default App;
