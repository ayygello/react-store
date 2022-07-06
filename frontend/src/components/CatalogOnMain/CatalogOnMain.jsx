import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {
  fetchCategoriesRequest,
  fetchItemsRequest,
  fetchLoadMoreRequest,
  fetchSelectedItemsRequest,
  selectCatalogId,
} from '../../redux/features/catalog/catalogSlice';

const CatalogOnMain = () => {
  const { categories, catalog, catalogId, offset } = useSelector(
    (state) => state.catalog
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    catalogId === null
      ? dispatch(fetchItemsRequest())
      : dispatch(fetchSelectedItemsRequest(catalogId));
  }, [dispatch, catalogId]);

  const handleOnLoadMore = (offset) => {
    dispatch(fetchLoadMoreRequest(offset));
  };

  return (
    <section className='catalog'>
      <h2 className='text-center'>Каталог</h2>
      <ul className='catalog-categories nav justify-content-center'>
        <li className='nav-item'>
          <NavLink
            to='/'
            onClick={() => dispatch(selectCatalogId(null))}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Все
          </NavLink>
        </li>
        {categories.map((el) => (
          <li className='nav-item' key={el.id}>
            <NavLink
              to={`?categoryId=${el.id}`}
              onClick={() => dispatch(selectCatalogId(el.id))}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {el.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className='row'>
        {catalog.map((el) => (
          <div className='col-4' key={el.id}>
            <div className='card catalog-item-card'>
              <img
                src={el.images[0]}
                className='card-img-top img-fluid'
                alt={el.title}
              />
              <div className='card-body'>
                <p className='card-text'>{el.title}</p>
                <p className='card-text'>{el.price}</p>
                <Link to='/products/1.html' className='btn btn-outline-primary'>
                  Заказать
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center'>
        {offset !== null ? (
          <button
            className='btn btn-outline-primary'
            onClick={() => handleOnLoadMore(offset)}
          >
            Загрузить ещё
          </button>
        ) : null}
        {/* {offset !== null ? (
            <button
              className='btn btn-outline-primary'
              onClick={() => handleOnLoadMore(cat, offset)}
            >
              Загрузить ещё
            </button>
          ) : null} */}
      </div>
    </section>
  );
};

export default CatalogOnMain;
