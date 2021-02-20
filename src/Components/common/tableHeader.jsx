import React, { Component } from 'react';

class TableHeader extends Component {
	raiseSort = path => {
		const sortColumn = { ...this.props.sortColumn };
		if (sortColumn.path === path)
			sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
		else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}
		if (!path) return null;

		this.props.onSort(sortColumn);
	};

	sortIcon = column => {
		const { sortColumn } = this.props;
		if (column.path === sortColumn.path)
			if (sortColumn.order === 'asc')
				return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
			else return <i className="fa fa-sort-desc" aria-hidden="true"></i>;
		return null;
	};

	render() {
		return (
			<thead>
				<tr>
					{this.props.columns.map(column => (
						<th
							style={column.path ? { cursor: 'pointer' } : null}
							onClick={() => this.raiseSort(column.path)}
							key={column.path || column.key}
						>
							{column.label} {this.sortIcon(column)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;
