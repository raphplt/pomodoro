"use client";
import { useState, useEffect } from "react";
import Header from "./components/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/footer";

export default function Home() {
	const [time, setTime] = useState(25 * 60);
	const [breakTime, setBreakTime] = useState(5 * 60);
	const [currentTimer, setCurrentTimer] = useState(time);
	const [session, setSession] = useState(true);
	const [running, setRunning] = useState(false);

	useEffect(() => {
		let interval: any = null;

		if (running) {
			interval = setInterval(() => {
				setCurrentTimer((prevTime) => {
					if (prevTime > 0) {
						return prevTime - 1;
					} else {
						setSession(!session);

						return session ? breakTime : time;
					}
				});
			}, 1000);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [running, time, breakTime, session, currentTimer]);

	const startTimer = () => {
		setRunning(true);
	};

	const pauseTimer = () => {
		setRunning(false);
	};

	const resetTimer = () => {
		setRunning(false);
		setSession(true);
		setCurrentTimer(25 * 60);
	};

	const formattedTime = () => {
		const minutes = Math.floor(currentTimer / 60);
		const seconds = currentTimer % 60;
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
			2,
			"0"
		)}`;
	};

	useEffect(() => {
		document.title = `${
			session ? "Work Time" : "Break Time"
		} - ${formattedTime()}`;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formattedTime]);

	return (
		<main className={`${session ? "bg-red-300" : "bg-green-300"}`}>
			<Header />
			<main className="flex font-roboto min-h-screen flex-col items-center justify-between p-32">
				<section
					className={`${
						session ? "bg-red-400" : "bg-green-400"
					} py-10 px-28 rounded-xl text-gray-800 drop-shadow-sm`}
				>
					{session ? (
						<h2 className="text-4xl text-center mb-8">Session de travail</h2>
					) : (
						<h2 className="text-4xl text-center mb-8">Pause</h2>
					)}
					<h1 className="text-9xl">{formattedTime()}</h1>
					{running ? (
						<div className="mt-8 flex">
							<button
								onClick={pauseTimer}
								className="font-montserrat font-semibold flex items-center justify-center gap-3 text-2xl w-2/3 mx-auto"
							>
								Pause
								<FontAwesomeIcon icon={faPause} />
							</button>

							<button
								onClick={resetTimer}
								className="font-montserrat font-semibold flex items-center justify-center gap-3 text-2xl w-2/3 mx-auto"
							>
								Reset
								<FontAwesomeIcon icon={faStop} />
							</button>
						</div>
					) : (
						<button
							onClick={startTimer}
							className="font-montserrat font-semibold flex items-center justify-center gap-3 text-2xl mt-8 w-2/3 mx-auto"
						>
							Start
							<FontAwesomeIcon icon={faPlay} />
						</button>
					)}
				</section>
			</main>
			<Footer />
		</main>
	);
}
