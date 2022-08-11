import React, { useEffect, useState, useMemo } from "react";
import { TableHeader, Pagination, Search } from "./components";
import Select from "./components/Select";
import Button from "react-bootstrap/Button";

const App = () => {
	const [records, setRecords] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [searchGender, setSearchGender] = useState("");
	const [sorting, setSorting] = useState({ field: "", order: "" });

	const ITEMS_PER_PAGE = 10;

	const headers = [
		{ name: "No", field: "no", sortable: false },
		{ name: "Full Name", field: "fullname", sortable: true },
		{ name: "Gender", field: "gender", sortable: true },
		{ name: "Email Address", field: "email", sortable: true },
		{ name: "Phone Number", field: "phone", sortable: true },
		{ name: "Address", field: "address", sortable: true },
		{ name: "Nationality", field: "nationality", sortable: true },
		{ name: "Picture", field: "picture", sortable: false },
	];

	const getData = (page) => {
		fetch(`https://randomuser.me/api/?page=${page}&results=10`)
			.then((res) => res.json())
			.then(response => {
				let newRecords = response?.results.map( (rs, i) => {
					return {
						id: rs.id.value,
						fullname: `${rs.name.first} ${rs.name.last}`,
						gender: rs.gender,
						email: rs.email,
						phone: rs.phone,
						address: `${rs.location.street.name} ${rs.location.street.number}, ${rs.location.city}, ${rs.location.country} `,
						nationality: rs.nat,
						picture: rs.picture.thumbnail,
					}
				})
				setRecords(newRecords);
			});
	};

	useEffect(() => {
		getData(1);
	}, []);

	const recordsData = useMemo(() => {
		let computedRecords = records;

		if (search) {
			computedRecords = computedRecords.filter(
				record =>
					record.fullname.toLowerCase().includes(search.toLowerCase())  ||
					record.gender.toLowerCase().includes(search.toLowerCase())  ||
					record.email.toLowerCase().includes(search.toLowerCase())  ||
					record.phone.toLowerCase().includes(search.toLowerCase())  ||
					record.address.toLowerCase().includes(search.toLowerCase())  ||
					record.nationality.toLowerCase().includes(search.toLowerCase()) 
			);
		}

		if(searchGender) {
			computedRecords = computedRecords.filter(
				record => record.gender === searchGender
			);
		}

		//Sorting records
		if (sorting.field) {
			const reversed = sorting.order === "asc" ? 1 : -1;
			computedRecords = computedRecords.sort(
				(a, b) =>
					reversed * a[sorting.field].localeCompare(b[sorting.field])
			);
		}

		return computedRecords;
	}, [records, search, searchGender, sorting]);

	return (
		<>
			<div className="row my-4 mx-3 ">
				<div className="col-auto d-flex flex-row gap-2">
					<Search
						onSearch={value => {
							setSearch(value);
						}}
					/>
					<Select
						onSearch={ value => {
							setSearchGender(value);
						}}
					/>
					<Button 
						variant="primary"
						onClick={
							() => {
								setSearch("");
								setSearchGender("");
							}
						}
					>
						Reset Filter
					</Button>
				</div>
			</div>

			<table className="table table-striped mx-4">
				<TableHeader
					headers={headers}
					onSorting={(field, order) =>
						setSorting({ field, order })
					}
				/>
				<tbody>
					{recordsData?.map((record, i) => (
						<tr key={"record-"+record.id+"-"+i}>
							<th scope="row">
								{((currentPage - 1) * 10) + i + 1}
							</th>
							<td>{record.fullname}</td>
							<td>{record.gender}</td>
							<td>{record.phone}</td>
							<td>{record.email}</td>
							<td>{record.address}</td>
							<td>{record.nationality}</td>
							<td>
								<img 
									src={record.picture}
									alt={record.fullname+" picture"}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			
			<div className="my-2 mx-4 d-flex justify-content-end">
				<Pagination
					total={search ? recordsData.length : 50}
					recordsPerPage={ITEMS_PER_PAGE}
					currentPage={currentPage}
					onPageChange={page => {
						setCurrentPage(page); 
						getData(page);
					}}
				/>
			</div>
		</>
	);
};

export default App;