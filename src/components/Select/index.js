import React, { 
	useState 
} from "react";

const Select = ({ onSearch }) => {

	const [searchGender, setSearchGender] = useState("");

	const onSelectChange = value => {
		setSearchGender(value);
		onSearch(value, "Gender");
	};

	return (
		<select
			type="text"
			className="form-control"
			style={{ width: "240px" }}
			placeholder="Search"
			value={searchGender}
			onChange={e => onSelectChange(e.target.value)}
		>
			<option value="">All</option>
			<option value="female">Female</option>
			<option value="male">Male</option>
		</select>
	);
};

export default Select;