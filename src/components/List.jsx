import UserInfo from "./UserListInfo";
import "./List.css";
import { useState } from "react";
import useGetUsers from "../hooks/useGetUsers";

function List() {
  const [search, setSearch] = useState("");
  const users = useGetUsers(search);
  
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const filteredUsers = Array.isArray(users) ? users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase())
  ) : [];

  const records = filteredUsers.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredUsers.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const maxPageNumbersToShow = 5;
  const startPage = Math.max(currentPage - Math.floor(maxPageNumbersToShow / 2), 1);
  const endPage = Math.min(startPage + maxPageNumbersToShow - 1, npage);
  const visiblePageNumbers = numbers.slice(startPage - 1, endPage);

  return (
    <>
      <div className="list-container">
        <h2>Users</h2>
        <input
          className="input"
          alt="Hello, World"
          placeholder="Searching user by name"
          onChange={handleSearch}
        />
        {records.map((user) => {
          return <UserInfo key={user.id} name={user.name} email={user.email} />;
        })}
      </div>

      <nav className="user-pagination">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" onClick={prePage}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {visiblePageNumbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <a href="#" className="page-link" onClick={() => changeCPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next" onClick={nextPage}>
              <span aria-hidden="true" >&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );

  function nextPage() {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }
}

export default List;
