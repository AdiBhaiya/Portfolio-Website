import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "./Navbar";
import IntroComponent from "./IntroComponent";

const Home = () => {
	window.localStorage.setItem("page", 0);

	const [Acads, setAcads] = useState({});
	const [XP, setXP] = useState({});

	const fetchAcad = async () => {
		setAcads(JSON.parse(window.localStorage.getItem("acadData ")));
	}; // Fetch the academic details of the user (here, Aditya Pandey)

	const fetchXP = async () => {
		setXP(JSON.parse(window.localStorage.getItem("XPData ")));
	}; // Fetch the experience details of the user (here, Aditya Pandey)

	// const fetchAcad = async () => {
	// 	let acadData = await axios.get("/api/acads");
	// 	setAcads(acadData.data);
	// }; // Fetch the academic details of the user (here, Aditya Pandey)
	// const fetchXP = async () => {
	// 	let XPData = await axios.get("/api/xps");
	// 	setXP(XPData.data);
	// }; // Fetch the experience details of the user (here, Aditya Pandey)

	useEffect(() => {
		fetchAcad();
		fetchXP();
	}, []);

	// PAGINATION XP STARTS
	const [curXPPage, setCurXPPage] = useState(1);
	const xpsPerPage = 6;
	const lastXPIndex = curXPPage * xpsPerPage;
	const firstXPIndex = lastXPIndex - xpsPerPage;
	const currentXPs = Object.values(XP).slice(firstXPIndex, lastXPIndex);
	const totalXPPages = Math.ceil(Object.values(XP).length / xpsPerPage);
	const handleXPPageChange = (pageNumber) => {
		setCurXPPage(pageNumber);
	};
	// PAGINATION XP ENDS

	return (
		<>
			<Navbar navElem="homeNav" />
			<AnimatePresence>
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }} className="spacing">
					<div className="homeContainer">
						<div className="col-1">
							<IntroComponent />

							<div className="homeComponent">
								<div className="homeComponentHeading">EDUCATION</div>
								<div className="xpScroll">
									{Object.values(Acads).map((elem) => {
										return (
											<div key={elem.id} className="homeAcadContent">
												<div className="homeAcadHeading"> {elem.name} </div>
												<div className="homeAcadSubContent">
													{elem.start} - {elem.end}
												</div>
												<div className="homeAcadSubContent">{elem.school}</div>
												<div className="homeAcadSubContent">{elem.location}</div>
												<div className="homeAcadSubContent">{elem.board}</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>

						<div className="col-2">
							<div className="homeComponent">
								<div className="homeComponentHeading">EXPERIENCE</div>
								<div className="homeXP xpScroll">
									{currentXPs.map((elem) => {
										// {Object.values(XP).map((elem) => {
										return (
											<div key={elem.id} className="homeXPContent">
												<img src={elem.logo} alt="Not Found" className="homeXPimg" />
												<div>
													<div className="homeAcadHeading">{elem.name}</div>
													<div className="homeAcadSubContent">Role: {elem.xp}</div>
													{elem.to !== "" || elem.to ? (
														<>
															<div className="homeAcadSubContent">From: {elem.from}</div>
															<div className="homeAcadSubContent">To: {elem.to}</div>
														</>
													) : (
														<>
															<div className="homeAcadSubContent">In: {elem.from}</div>
														</>
													)}
												</div>
											</div>
										);
									})}
									<div className="pagination">
										{Array.from({ length: totalXPPages }, (_, index) => (
											<div key={index}>
												{totalXPPages > 1 ? (
													<button className={`paginationButton ${curXPPage === index + 1 ? "active" : ""}`} onClick={() => handleXPPageChange(index + 1)}>
														{index + 1}
													</button>
												) : (
													<></>
												)}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	);
};

export default Home;
