import React, { useRef } from 'react';
import "./MovieModal.css";
import useOnClickOutside from '../../hooks/useOnClickOutside';

function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen
}) {
  const ref = useRef();
  useOnClickOutside(ref, () => { setModalOpen(false) });

  return (
    <div className='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span
            onClick={() => setModalOpen(false)}
            className='modal-close'
          >
            X
          </span>

          <img
            className='modal__poster-img'
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt='modal__poster-img'
          />

          <div className='modal__content'>
            <p className='modal__details'>
              <span style={{ color: '#46d369' }}>
                {Math.floor(Math.random() * (101))}% for you{" "}
              </span>
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className='modal__title'>{title ? title : name}</h2>
            <p className='modal__vote_average'> ✔ 평점: {Math.round(vote_average * 10) / 10}</p>
            <p className='modal__overview'> {overview}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MovieModal