// npm i react-select
import React from "react";
import Select from "react-select";

const CustomSelect = React.memo(({data, handleSelectChange}) => {
	let styleSetting = {
		primaryColor: "orange",
		secondaryColor: "lightcoral",
		textColor: "white",
		width: "270px",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		fontSize: "14px",
		fontWeight: "600",
	};
	return (
		<Select
			defaultValue={data[0]}
			options={data}
			styles={{
				control: (provided, state) => ({
					...provided,
					width: styleSetting.width,
					backgroundColor: styleSetting.backgroundColor,
					borderColor: state.isFocused ? styleSetting.primaryColor : "#AF743E",
					borderWidth: "2px",
					boxShadow:
						"3px 3px 6px 0px rgba(255,186,83,1), 6px 6px 20px 6px rgba(255,192,98,1)",
					"&:hover": {
						borderColor: styleSetting.primaryColor,
					},
				}),
				option: (provided, state) => ({
					...provided,
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
					fontSize: styleSetting.fontSize,
					fontWeight: styleSetting.fontWeight,
					color: state.isSelected ? styleSetting.textColor : styleSetting.primaryColor,
					backgroundColor: state.isSelected ? styleSetting.secondaryColor : styleSetting.backgroundColor,
					"&:hover": {
						color: styleSetting.textColor,
						backgroundColor: styleSetting.primaryColor,
					},
					"&:active": {
						color: styleSetting.textColor,
						backgroundColor: styleSetting.secondaryColor,
					},
				}),
				singleValue: (provided) => ({
					...provided,
					fontSize: styleSetting.fontSize,
					fontWeight: styleSetting.fontWeight,
					color: styleSetting.primaryColor,
				}),
				menu: (provided, _state) => ({
					...provided,
					width: styleSetting.width,
					backgroundColor: styleSetting.backgroundColor,
					borderRadius: "4px",
					boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
				}),
				menuList: (provided) => ({
					...provided,
					maxHeight: "200px",
					overflowY: "auto",
					scrollbarWidth: "thin",
					scrollbarColor: "#999 #eee",
					"&::-webkit-scrollbar": {
						width: "6px",
					},
					"&::-webkit-scrollbar-track": {
						background: styleSetting.backgroundColor,
					},
					"&::-webkit-scrollbar-thumb": {
						background: "#666",
						borderRadius: "4px",
					},
				}),
				dropdownIndicator: (provided) => ({
					...provided,
					color: styleSetting.primaryColor,
					"&:hover": {
						color: styleSetting.primaryColor,
					},
				}),
			}}
			isSearchable={false}
			onChange={handleSelectChange}
		/>
	);
});

export default CustomSelect;
