import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./SearchPage.css"
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {

  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const searchTerm = query.get("q")
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm);
    }
  }, [debounceSearchTerm])    // searchTerm 바뀔 때마다 새로 영화 데이터 가져옴

  const fetchSearchMovie = async (searchTerm) => {
    console.log('searchTerm', searchTerm)
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      )
      console.log(request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  }

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (   // searchTerm에 해당 영화 데이터가 있을 경우
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
            return (
              <div className="movie" key={movie.id}>
                <div
                  onClick={() => navigate(`/${movie.id}`)}  // 포스터 클릭 시 상세 페이지로 이동하도록
                  className="movie__column-poster"
                >
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            )
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자 하는 검색어"{debounceSearchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    )
  }

  return renderSearchResults();
}
