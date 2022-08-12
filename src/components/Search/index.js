import React from "react";

const Search = ({ search, setSearch }) => {

	const onInputChange = value => {
		setSearch(value);
	};

	return (
		<input
			type="text"
			className="form-control"
			style={{ width: "240px" }}
			placeholder="Search"
			value={search}
			onChange={e => onInputChange(e.target.value)}
		/>
	);
};

export default Search;