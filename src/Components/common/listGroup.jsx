import React from 'react';

const ListGroup = props => {
	const {
		genres,
		genreSelect,
		textProperty,
		valueProperty,
		selectedGenre,
	} = props;
	return (
		<ul className="list-group">
			{genres.map(genre => (
				<li
					key={genre[valueProperty]}
					style={{ cursor: 'pointer' }}
					onClick={() => genreSelect(genre)}
					className={
						genre === selectedGenre
							? 'list-group-item active'
							: 'list-group-item'
					}
				>
					{genre[textProperty]}
				</li>
			))}
		</ul>
	);
};

ListGroup.defaultProps = {
	textProperty: 'name',
	valueProperty: '_id',
};

export default ListGroup;
