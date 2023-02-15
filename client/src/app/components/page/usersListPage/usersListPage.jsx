import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "../../common/pagination";
import paginate from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import TextField from "../../common/form/textField";
import { useSelector } from "react-redux";
import {
  getProfessions,
  getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsers } from "../../../store/users";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "", order: "asc" });
  const [inputData, setInputData] = useState({ search: "" });

  const currentUserId = useSelector(getCurrentUserId());

  const users = useSelector(getUsers());
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());

  const handleDelete = (id) => {
    // setUsers((prevState) => prevState.filter((user) => user._id !== id));
    console.log(id);
  };

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }

      return user;
    });

    console.log(newArray);
  };

  const handleProfessionSelect = (item) => {
    setCurrentPage(1);
    setSelectedProf(item);
    if (inputData.search) {
      setInputData((prevState) => ({ ...prevState, search: "" }));
    }
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearFilter = () => {
    setSelectedProf();
    if (inputData.search) {
      setInputData((prevState) => ({ ...prevState, search: "" }));
    }
  };

  const handleSearchChange = (target) => {
    setInputData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
    setSelectedProf();
  };

  const pageSize = 8;

  if (users) {
    function filterUsers(data) {
      const filteredUsers = data.filter((user) => {
        if (selectedProf) {
          return user.profession === selectedProf._id;
        }
        if (inputData.search) {
          return user.name
            .toLowerCase()
            .includes(inputData.search.toLowerCase());
        }
        return true;
      });

      return filteredUsers.filter((user) => user._id !== currentUserId);
    }

    const filteredUsers = filterUsers(users);

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    userCrop.length ||
      (filteredUsers.length && handlePageChange(currentPage - 1));

    const count = filteredUsers.length;

    return (
      <div className="d-flex">
        {professions && !professionsLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />

            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Сброс фильтров
            </button>
          </div>
        )}

        <div className="d-flex flex-column">
          <h2>
            <SearchStatus length={count} />
          </h2>

          <form>
            <TextField
              name="search"
              value={inputData.search}
              onChange={handleSearchChange}
              placeholder="Search..."
            />
          </form>

          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}

          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};

export default UsersListPage;
