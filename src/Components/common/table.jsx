import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './TableBody';

const Table = ({ onSort, sortColumn, columns, data, user }) => {
	return (
		<table className="table">
			<TableHeader onSort={onSort} columns={columns} sortColumn={sortColumn} />
			<TableBody data={data} user={user} columns={columns} />
		</table>
	);
};

export default Table;
