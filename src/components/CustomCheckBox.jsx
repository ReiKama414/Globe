import React from "react";
import style from "./custom.module.sass";

const CustomCheckBox = React.memo(({text, value, onChange}) => {
	return (
		<label className={style.cs_cb}>
			<input type="checkbox" checked={value} onChange={onChange} />
			<span>{text}</span>
		</label>
	);
});

export default CustomCheckBox;
