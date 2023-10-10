import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TaskService from "../services/ApiService";
import Pagination from "../components/Pagination";
import GiphyList from "../components/GiphyList";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [giphyData, setGiphyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const imgsPerPage = 9;

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      let response = await TaskService.saveSearch({ query: searchValue });
      let resData = await response;
      let body = JSON.parse(resData.data.data);
      setCurrentPage(1);
      setGiphyData(body.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const lastPostIndex = currentPage * imgsPerPage;
  const firstPostIndex = lastPostIndex - imgsPerPage;
  const currentData = giphyData.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <Header />
      <div className="container pt-5">
        <div className="row mb-4">
          <div className="col-md-4 ">
            <input
              id="search"
              type="search"
              value={searchValue}
              className="form-control"
              placeholder="Buscar"
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-dark" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          {isLoading && searchValue ? (
            <p>Loading...</p>
          ) : (
            <>
              <GiphyList data={currentData} />
              <Pagination
                totalPosts={giphyData.length}
                postsPerPage={imgsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </>
          )}

          {searchValue && !isLoading && giphyData.length === 0 && (
            <p>There are no records to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
