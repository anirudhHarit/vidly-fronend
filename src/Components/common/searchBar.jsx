import React from 'react';

const SearchBar = ({ value, onChange }) => {
	return (
		<div className="form-group">
			<input
				value={value}
				className="form-control my-3"
				placeholder="Search..."
				name="searchKeywords"
				onChange={e => onChange(e.currentTarget.value)}
			/>
		</div>
	);
};

export default SearchBar;
