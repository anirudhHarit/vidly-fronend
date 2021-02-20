import React from 'react';
import _ from 'lodash';

const Pagination = ({ pageSize, totalMovies, pageChange, currentPage }) => {
	const totalPages = totalMovies / pageSize;
	if (totalPages <= 1) return null;
	const pages = _.range(1, totalPages + 1);
	return (
		<nav>
			<ul className="pagination">
				{pages.map(page => (
					<li
						key={page}
						onClick={() => pageChange(page)}
						className={currentPage === page ? 'page-item active' : 'page-item'}
					>
						<button className="page-link">{page}</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
