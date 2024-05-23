import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api/axios'
import "./DetailPage.css"

export default function DetailPage() {

  const { movieId } = useParams();    // useParams를 이용해서 movieId 가져옴
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `/movie/${movieId}`
        )
        if (response.status === 200) {
          //console.log('response', response)
          setMovie(response.data);
        }
      }
      catch (error) {
        console.log('error', error);
        if (error.response.status === 404) {
          navigate('*')
          setTimeout(() => {
            alert('⚠잘못된 접근입니다. 메인페이지로 이동합니다.');
            navigate('/');
          }, 100);
        }
      }
    }
    fetchData();
  }, [movieId]);    // movieId가 바뀔 때마다 호출해줌

  if (!movie) return <div>...loading</div>

  return (
    <section>
      <img
        className="modal__poster-img"
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />

      <div className='movie__content'>
        <p className='movie__details'>
          <span style={{ color: '#46d369' }}>
            {movie.backdrop_path ? Math.floor(Math.random() * (101)) + '% for you' : ''}{" "}
          </span>
          {movie.release_date ? movie.release_date : movie.first_air_date}
        </p>
        <h2 className='movie__title'>{movie.title ? movie.title : movie.name}</h2>
        <p className='movie__vote_average'> {movie.vote_average ? '✔ 평점 : ' + Math.round(movie.vote_average * 10) / 10 : ''}</p>   {/* 소수점 1자리로 반올림 */}
        <p className='movie__overview'> {movie.overview}</p>
      </div>
    </section>
  );
}
