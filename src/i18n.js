// npm install react-i18next i18next
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
	// 英文
	en: {
		translation: {
			border: "Border",
			population: "Population",
			arcsColor: "Arcs Color",
			polygonsColor: "Polygons Color",
			additionalInformation: "Additional information",
		},
	},
	// 繁體中文
	"zh-TW": {
		translation: {
			border: "框線",
			population: "人口",
			arcsColor: "弧形顏色",
			polygonsColor: "多邊形顏色",
			additionalInformation: "附加資訊",
		},
	},
	// 簡體中文
	"zh-CN": {
		translation: {
			border: "框线",
			population: "人口",
			arcsColor: "弧形颜色",
			polygonsColor: "多边形颜色",
			additionalInformation: "附加信息",
		},
	},
	// 日語
	ja: {
		translation: {
			border: "枠線",
			population: "人口",
			arcsColor: "アークの色",
			polygonsColor: "ポリゴンの色",
			additionalInformation: "追加情報",
		},
	},
	// 韓語
	ko: {
		translation: {
			border: "테두리",
			population: "인구",
			arcsColor: "아크 색상",
			polygonsColor: "다각형 색상",
			additionalInformation: "추가 정보",
		},
	},
	// 德語
	de: {
		translation: {
			border: "Rahmen",
			population: "Bevölkerung",
			arcsColor: "Bogenfarbe",
			polygonsColor: "Flächenfarbe",
			additionalInformation: "Zusätzliche Informationen",
		},
	},
	// 法語
	fr: {
		translation: {
			border: "Bordure",
			population: "Population",
			arcsColor: "Couleur des arcs",
			polygonsColor: "Couleur des polygones",
			additionalInformation: "Informations supplémentaires",
		},
	},
	// 西班牙語
	es: {
		translation: {
			border: "Borde",
			population: "Población",
			arcsColor: "Color de los Arcos",
			polygonsColor: "Color de los Polígonos",
			additionalInformation: "Información adicional",
		},
	},
	// 阿拉伯語
	ar: {
		translation: {
			border: "حدود",
			population: "السكان",
			arcsColor: "لون الأقواس",
			polygonsColor: "لون المضلعات",
			additionalInformation: "معلومات إضافية",
		},
	},
	// 孟加拉語
	bn: {
		translation: {
			border: "বর্ডার",
			population: "জনসংখ্যা",
			arcsColor: "আর্ক রঙ",
			polygonsColor: "বহুভুজ রঙ",
			additionalInformation: "অতিরিক্ত তথ্য",
		},
	},
	// 波斯語
	fa: {
		translation: {
			border: "حاشیه",
			population: "جمعیت",
			arcsColor: "رنگ قوس‌ها",
			polygonsColor: "رنگ چندضلعی‌ها",
			additionalInformation: "اطلاعات اضافی",
		},
	},
	// 希臘語
	el: {
		translation: {
			border: "Περίγραμμα",
			population: "Πληθυσμός",
			arcsColor: "Χρώμα τόξων",
			polygonsColor: "Χρώμα πολυγώνων",
			additionalInformation: "Πρόσθετες πληροφορίες",
		},
	},
	// 希伯來語
	he: {
		translation: {
			border: "מסגרת",
			population: "אוכלוסייה",
			arcsColor: "צבע הקשתות",
			polygonsColor: "צבע המצולעים",
			additionalInformation: "מידע נוסף",
		},
	},
	// 印地語
	hi: {
		translation: {
			border: "सीमा",
			population: "जनसंख्या",
			arcsColor: "क्षेत्रों का रंग",
			polygonsColor: "बहुभुजों का रंग",
			additionalInformation: "अतिरिक्त जानकारी",
		},
	},
	// 匈牙利語
	hu: {
		translation: {
			border: "Keret",
			population: "Népesség",
			arcsColor: "Ívek színe",
			polygonsColor: "Sokszög színe",
			additionalInformation: "További információ",
		},
	},
	// 印度尼西亞語
	id: {
		translation: {
			border: "Batas",
			population: "Populasi",
			arcsColor: "Warna Busur",
			polygonsColor: "Warna Poligon",
			additionalInformation: "Informasi Tambahan",
		},
	},
	// 意大利語
	it: {
		translation: {
			border: "Bordo",
			population: "Popolazione",
			arcsColor: "Colore degli Archi",
			polygonsColor: "Colore dei Poligoni",
			additionalInformation: "Informazioni aggiuntive",
		},
	},
	// 荷蘭語
	nl: {
		translation: {
			border: "Rand",
			population: "Bevolking",
			arcsColor: "Kleur van Bogen",
			polygonsColor: "Kleur van Polygoon",
			additionalInformation: "Aanvullende informatie",
		},
	},
	// 波蘭語
	pl: {
		translation: {
			border: "Ramka",
			population: "Ludność",
			arcsColor: "Kolor Łuków",
			polygonsColor: "Kolor Wielokątów",
			additionalInformation: "Dodatkowe informacje",
		},
	},
	// 葡萄牙語
	pt: {
		translation: {
			border: "Borda",
			population: "População",
			arcsColor: "Cor dos Arcos",
			polygonsColor: "Cor dos Polígonos",
			additionalInformation: "Informações adicionais",
		},
	},
	// 俄語
	ru: {
		translation: {
			border: "Граница",
			population: "Население",
			arcsColor: "Цвет дуг",
			polygonsColor: "Цвет полигонов",
			additionalInformation: "Дополнительная информация",
		},
	},
	// 瑞典語
	sv: {
		translation: {
			border: "Ram",
			population: "Befolkning",
			arcsColor: "Bågens färg",
			polygonsColor: "Polygoners färg",
			additionalInformation: "Ytterligare information",
		},
	},
	// 土耳其語
	tr: {
		translation: {
			border: "Kenar",
			population: "Nüfus",
			arcsColor: "Yayların Rengi",
			polygonsColor: "Poligonların Rengi",
			additionalInformation: "Ek bilgi",
		},
	},
	// 烏克蘭語
	uk: {
		translation: {
			border: "Межа",
			population: "Населення",
			arcsColor: "Колір дуг",
			polygonsColor: "Колір багатокутників",
			additionalInformation: "Додаткова інформація",
		},
	},
	// 烏爾都語
	ur: {
		translation: {
			border: "حد",
			population: "آبادی",
			arcsColor: "آرک کا رنگ",
			polygonsColor: "بہوگول کا رنگ",
			additionalInformation: "اضافی معلومات",
		},
	},
	// 越南語
	vi: {
		translation: {
			border: "Viền",
			population: "Dân số",
			arcsColor: "Màu Cung",
			polygonsColor: "Màu Đa giác",
			additionalInformation: "Thông tin bổ sung",
		},
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en", // 預設語言
	keySeparator: false, // 不使用 `.` 作為鍵的分隔符
	fallbackLng: "en", // 如果當前切換的語言沒有對應的翻譯則使用這個語言，
	interpolation: {
		escapeValue: false, // 不需要進行 HTML 轉義
	},
});

export default i18n;
