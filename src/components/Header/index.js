import React, { 
	useState 
} from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

const Header = ({ headers, onSorting }) => {
	const [sortingField, setSortingField] = useState("");
	const [sortingOrder, setSortingOrder] = useState("asc");

	const onSortingChange = (field) => {
		console.log(field, sortingOrder)
		const order =
			field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

		setSortingField(field);
		setSortingOrder(order);
		onSorting(field, order);
	};

	return (
		<thead>
			<tr>
				{headers.map(({ name, field, sortable }) => (
					<th
						key={name}
						onClick={() =>
							sortable ? onSortingChange(field) : null
						}
					>
						{name}

						{sortingField && sortingField === field && (
							sortingOrder  === "asc" ?
							<FontAwesomeIcon icon={ "fa-solid fa-arrow-down"} />
							:
							<FontAwesomeIcon icon={ "fa-solid fa-arrow-up"} />
						)}
					</th>
				))}
			</tr>
		</thead>
	);
};

export default Header;