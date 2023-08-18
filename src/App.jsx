import React, {useEffect, useState, useRef, useCallback} from "react";
import Globe from "react-globe.gl";
import cx from "classnames";
// npm install three
import * as THREE from "three";
// import EarthTexture from "./assets/earth-texture.png";
import CustomSelect from "./components/CustomSelect";
import CustomCheckBox from "./components/CustomCheckBox";
import CustomColorPicker from "./components/CustomColorPicker";
import EarthClouds from "./assets/earth-clouds.png";
import CountryData from "./datasets/ne_110m_admin_0_countries.geojson";
import style from "./App.module.sass";
// npm i --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGears, faHouseFlag} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

const ARC_REL_LEN = 0.4; // relative to whole arc
const FLIGHT_TIME = 1000;
const CONTRIES = [
	{cc: "en", value: "NAME_EN", label: "English (English)"}, // 英語
	{cc: "zh-TW", value: "NAME_ZHT", label: "繁體中文 (Traditional Chinese) "},
	{cc: "zh-CN", value: "NAME_ZH", label: "简体中文 (Simplified Chinese) "},
	{cc: "ja", value: "NAME_JA", label: "日本語 (Japanese)"}, // 日語
	{cc: "ko", value: "NAME_KO", label: "한국어 (Korean)"}, // 韓語
	{cc: "de", value: "NAME_DE", label: "Deutsch (German)"}, // 德語
	{cc: "fr", value: "NAME_FR", label: "Français (French)"}, // 法語
	{cc: "es", value: "NAME_ES", label: "Español (Spanish)"}, // 西班牙語
	{cc: "ar", value: "NAME_AR", label: "العربية (Arabic)"}, // 阿拉伯語
	{cc: "bn", value: "NAME_BN", label: "বাংলা (Bengali)"}, // 孟加拉語
	{cc: "fa", value: "NAME_FA", label: "فارسی (Persian)"}, // 波斯語
	{cc: "el", value: "NAME_EL", label: "Ελληνικά (Greek)"}, // 希臘語
	{cc: "he", value: "NAME_HE", label: "עִבְרִית (Hebrew)"}, // 希伯來語
	{cc: "hi", value: "NAME_HI", label: "हिन्दी (Hindi)"}, // 印地語
	{cc: "hu", value: "NAME_HU", label: "Magyar (Hungarian)"}, // 匈牙利語
	{cc: "id", value: "NAME_ID", label: "Bahasa Indonesia (Indonesian)"}, // 印度尼西亞語
	{cc: "it", value: "NAME_IT", label: "Italiano (Italian)"}, // 意大利語
	{cc: "nl", value: "NAME_NL", label: "Nederlands (Dutch)"}, // 荷蘭語
	{cc: "pl", value: "NAME_PL", label: "Polski (Polish)"}, // 波蘭語
	{cc: "pt", value: "NAME_PT", label: "Português (Portuguese)"}, // 葡萄牙語
	{cc: "ru", value: "NAME_RU", label: "русский (Russian)"}, // 俄語
	{cc: "sv", value: "NAME_SV", label: "Svenska (Swedish)"}, // 瑞典語
	{cc: "tr", value: "NAME_TR", label: "Türkçe (Turkish)"}, // 土耳其語
	{cc: "uk", value: "NAME_UK", label: "українська (Ukrainian)"}, // 烏克蘭語
	{cc: "ur", value: "NAME_UR", label: "اردو (Urdu)"}, // 烏爾都語
	{cc: "vi", value: "NAME_VI", label: "Tiếng Việt (Vietnamese)"}, // 越南語
];

const App = () => {
	const globeMaterial = new THREE.MeshPhongMaterial();

	globeMaterial.bumpScale = 20;
	new THREE.TextureLoader().load("//unpkg.com/three-globe/example/img/earth-water.png", (texture) => {
		globeMaterial.specularMap = texture;
		globeMaterial.specular = new THREE.Color("grey");
		globeMaterial.shininess = 15;
	});

	const World = () => {
		const {t, i18n} = useTranslation();
		const globeEl = useRef();
		const [time, setTime] = useState(new Date());

		const [arcsData, setArcsData] = useState([]);
		const [ringsData, setRingsData] = useState([]);

		const [countries, setCountries] = useState({features: []});
		const [hoverD, setHoverD] = useState();

		const [selectedTranslation, setSelectedTranslation] = useState(CONTRIES[0]);
		const [toggleFlag, setToggleFlag] = useState(false);

		const [checkedState, setCheckedState] = useState({
			checkedStroke: false,
			checkedInfoShow: false,
		});

		const initialColors = [
			{name: "arcsColor", color: {r: 255, g: 143, b: 0, a: 1}, showPicker: false},
			{name: "polygonsColor", color: {r: 244, g: 65, b: 51, a: 0.4}, showPicker: false},
		];
		const [colorPickers, setColorPickers] = useState(initialColors);

		const prevCoords = useRef({lat: 0, lng: 0});

		useEffect(() => {
			// time ticker
			// const frameTicker = () => {
			// 	requestAnimationFrame(frameTicker);
			// 	setTime((time) => new Date(+time + 8.88));
			// };
			// frameTicker();

			// setInterval: There may be precision issues because JavaScript runs on a single thread and can be affected by other code.
			// requestAnimationFrame: Callbacks may pause due to switching pages or tracking other elements.

			const interval = setInterval(() => {
				setTime(new Date());
			}, 1000);

			return () => clearInterval(interval);
		}, []);

		const numberWithCommas = (num) => {
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		};

		const handleTranslationChange = useCallback(
			(selectedTranslation) => {
				setSelectedTranslation(selectedTranslation);
				i18n.changeLanguage(selectedTranslation.cc);
			},
			[i18n]
		);

		const handleChange = useCallback((name) => {
			setCheckedState((prevState) => ({
				...prevState,
				[name]: !prevState[name],
			}));
		}, []);

		const handleColorChange = (index, newColor) => {
			const updatedColorPickers = [...colorPickers];
			updatedColorPickers[index].color = newColor.rgb;
			setColorPickers(updatedColorPickers);
		};

		const togglePicker = (index) => {
			const updatedColorPickers = colorPickers.map((colorPicker, i) => ({
				...colorPicker,
				showPicker: i === index ? !colorPicker.showPicker : false,
			}));
			setColorPickers(updatedColorPickers);
		};

		useEffect(() => {
			const globe = globeEl.current;

			setTimeout(() => {
				// wait for scene to be populated (asynchronously)
				const directionalLight = globe.scene().children.find((obj3d) => obj3d.type === "DirectionalLight");
				// change light position to see the specularMap's effect
				directionalLight && directionalLight.position.set(1, 1, 1);
			});

			// Auto-rotate
			globe.controls().autoRotate = true;
			globe.controls().autoRotateSpeed = 0.33;

			// Camera Start Position
			globe.pointOfView({lat: 23.6978, lng: 120.9605, altitude: 1.75}, 5000);

			// Add clouds sphere
			const CLOUDS_ALT = 0.005;
			const CLOUDS_ROTATION_SPEED = -0.007;

			new THREE.TextureLoader().load(EarthClouds, (cloudsTexture) => {
				const clouds = new THREE.Mesh(
					new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
					new THREE.MeshPhongMaterial({map: cloudsTexture, transparent: true})
				);
				globe.scene().add(clouds);

				const rotateClouds = () => {
					clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
					requestAnimationFrame(rotateClouds);
				};
				rotateClouds();
			});

			// Load Contries data
			fetch(CountryData)
				.then((res) => res.json())
				.then(setCountries);
		}, []);

		const emitArc = useCallback(({lat: endLat, lng: endLng}) => {
			const {lat: startLat, lng: startLng} = prevCoords.current;
			prevCoords.current = {lat: endLat, lng: endLng};

			// add and remove arc after 1 cycle
			const arc = {startLat, startLng, endLat, endLng};
			setArcsData((curArcsData) => [...curArcsData, arc]);
			setTimeout(() => setArcsData((curArcsData) => curArcsData.filter((d) => d !== arc)), FLIGHT_TIME * 2);

			// add and remove start rings
			const srcRing = {lat: startLat, lng: startLng};
			setRingsData((curRingsData) => [...curRingsData, srcRing]);
			setTimeout(
				() => setRingsData((curRingsData) => curRingsData.filter((r) => r !== srcRing)),
				FLIGHT_TIME * ARC_REL_LEN
			);

			// add and remove target rings
			setTimeout(() => {
				const targetRing = {lat: endLat, lng: endLng};
				setRingsData((curRingsData) => [...curRingsData, targetRing]);
				setTimeout(
					() => setRingsData((curRingsData) => curRingsData.filter((r) => r !== targetRing)),
					FLIGHT_TIME * ARC_REL_LEN
				);
			}, FLIGHT_TIME);
		}, []);

		const emitArc2 = useCallback(
			(_polygon, _event, {lat: endLat, lng: endLng}) => {
				emitArc({lat: endLat, lng: endLng});
			},
			[emitArc]
		);

		return (
			<>
				{/* --------------------------- Globe --------------------------- */}
				<Globe
					ref={globeEl}
					animateIn={false}
					globeMaterial={globeMaterial}
					globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
					bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
					backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
					lineHoverPrecision={0}
					// Callback function for (left-button) clicks on the globe.
					onGlobeClick={emitArc}
					// Arcs Layer
					arcsData={arcsData}
					arcColor={() =>
						`rgba(${colorPickers[0].color.r}, ${colorPickers[0].color.g}, ${colorPickers[0].color.b}, ${colorPickers[0].color.a})`
					}
					arcDashLength={ARC_REL_LEN}
					arcDashGap={2}
					arcDashInitialGap={1}
					arcDashAnimateTime={FLIGHT_TIME}
					arcsTransitionDuration={0}
					// Rings Layer
					ringsData={ringsData}
					ringAltitude={0.01}
					ringColor={() => (t) =>
						`rgba(${colorPickers[0].color.r}, ${colorPickers[0].color.g}, ${colorPickers[0].color.b}, ${1 - t})`} // `rgba(244, 65, 51,${1 - t})`}
					ringMaxRadius={5}
					ringPropagationSpeed={5}
					ringRepeatPeriod={(FLIGHT_TIME * ARC_REL_LEN) / 3}
					// Polygons Layer
					polygonsData={countries.features}
					// polygonAltitude={(d) => (d === hoverD ? 0.15 : 0.01)}
					polygonCapColor={(d) =>
						d === hoverD
							? `rgba(${colorPickers[1].color.r}, ${colorPickers[1].color.g}, ${colorPickers[1].color.b}, ${colorPickers[1].color.a})`
							: "rgba(0, 0, 0, 0)"
					}
					polygonSideColor={() => "rgba(0, 0, 0, 0)"}
					polygonStrokeColor={() => (checkedState.checkedStroke ? "#111" : "transparent")}
					polygonLabel={({properties: d}) => `
						<h3>${d[selectedTranslation.value]}</h3>
						${
							checkedState.checkedInfoShow
								? `<b>${d.ADMIN} (${d.ISO_A2_EH})</b> <br />
						${t("population")}: <i>${numberWithCommas(d.POP_EST)} (${d.POP_YEAR})</i>`
								: ""
						}
						
					`}
					onPolygonClick={emitArc2}
					onPolygonHover={setHoverD}
					polygonsTransitionDuration={300}
				/>

				{/* --------------------------- Menu --------------------------- */}
				<div className={style.globe_menu}>
					<button className={style.toggle_btn} onClick={() => window.location.href = "\\"}>
						<FontAwesomeIcon icon={faHouseFlag} />
					</button>
					<button className={style.toggle_btn} onClick={() => setToggleFlag(!toggleFlag)}>
						<FontAwesomeIcon icon={faGears} />
					</button>
					<div className={cx(style.base_content, {[style.toggle_content]: !toggleFlag})}>
						<CustomSelect data={CONTRIES} handleSelectChange={handleTranslationChange} />
						<CustomCheckBox
							text={t("border")}
							value={checkedState.checkedStroke}
							onChange={() => handleChange("checkedStroke")}
						/>
						<CustomCheckBox
							text={t("additionalInformation")}
							value={checkedState.checkedInfoShow}
							onChange={() => handleChange("checkedInfoShow")}
						/>
						{colorPickers.map((color, index) => (
							<CustomColorPicker
								key={index}
								color={color.color}
								name={t(color.name)}
								showPicker={color.showPicker}
								onClick={() => togglePicker(index)}
								onChange={(newColor) => handleColorChange(index, newColor)}
							/>
						))}
					</div>
				</div>
				<div className={style.time_log}>{time.toString()}</div>
			</>
		);
	};

	return (
		<div className={style.App}>
			<header className={style.App_header}>
				<World />
			</header>
		</div>
	);
};

export default App;
