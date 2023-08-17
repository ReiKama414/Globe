// npm install react-color --save
import React from "react";
import {SketchPicker} from "react-color";
import style from "./custom.module.sass";

const CustomColorPicker = ({color, name, showPicker, onClick, onChange}) => (
	<div className={style.cs_cp}>
		<button style={{backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}} onClick={onClick}>
			<span>{name}</span>
		</button>
		{showPicker && <SketchPicker color={color} onChange={onChange} />}
	</div>
);

export default CustomColorPicker;
