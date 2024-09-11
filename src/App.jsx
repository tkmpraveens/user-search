import "./App.css";

import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import Card from "./Card";

const App = () => {
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    searchUserList(debouncedSearch);
  }, [debouncedSearch]);

  const getUserList = async () => {
    setIsLoading(true);
    const URL = "https://dummyjson.com/users";
    const response = await fetch(URL);
    const data = await response.json();
    setUserList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userList) searchUserList("");
  }, [userList]);

  const searchUserList = (searchTerm) => {
    console.log("Calling search API...");

    const list = userList?.users?.filter((item) => {
      const { firstName, lastName } = item ?? {};
      const name = firstName.toLowerCase() + lastName.toLowerCase();
      return searchTerm === "" ? true : name.includes(searchTerm.toLowerCase());
    });
    setFilteredUserList(list);
  };

  const renderUserList = filteredUserList?.map((user, index) => {
    return <Card key={user?.id ?? index} user={user} index={index} />;
  });

  const resultLabel = isLoading
    ? "Loading list of users..."
    : `Showing ${
        filteredUserList?.length === userList?.users?.length
          ? ` all ${filteredUserList?.length ?? 0} results`
          : ` ${filteredUserList?.length ?? 0} results out of ${
              userList?.users?.length ?? 0
            }`
      }`;

  return (
    <div className="app">
      <div className="header">
        <span>USER SEARCH</span>
        <input
          className="search"
          type="search"
          placeholder="Search user with first name or last name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="result">
        <p className="label">{resultLabel}</p>
        <div className="result-list">{renderUserList}</div>
      </div>
    </div>
  );
};

export default App;
