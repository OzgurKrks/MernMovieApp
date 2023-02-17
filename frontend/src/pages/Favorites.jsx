import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFavorites } from "../features/favoriteSlice";
import { Space, Table } from "antd";
import { deleteFavorite } from "../features/favoriteSlice";

function Favorites() {
  const dispatch = useDispatch();
  const { goals } = useSelector((state) => state.favorite);
  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch, goals]);

  const columns = [
    {
      title: "Movie Title",
      dataIndex: "movieTitle",
      key: "movieTitle",
      width: 1 / 5,

      render: (text) => <p>{text}</p>,
    },
    {
      title: "Movie Image",
      dataIndex: "movieImage",
      width: 1 / 5,

      key: "movieImage",

      render: (text) => (
        <img
          className='w-auto '
          src={"https://image.tmdb.org/t/p/original" + text}
          alt='/'
        ></img>
      ),
    },
    {
      title: "Run Time",
      dataIndex: "movieRunTime",
      key: "movieRunTime",
      width: 1 / 5,
    },
    {
      title: "Vote Average",
      dataIndex: "vote",
      key: "vote",
      width: 1 / 5,
    },
    {
      title: "Action",
      key: "action",
      width: 1 / 5,
      render: (_, record) => (
        <Space size='middle'>
          <div
            className='cursor-pointer hover:opacity-75'
            onClick={() => dispatch(deleteFavorite(record._id))}
          >
            Delete
          </div>
        </Space>
      ),
    },
  ];
  const data = goals;

  return (
    <div className='min-h-[650px]'>
      <Table className='w-screen  ' columns={columns} dataSource={data} />
      ;;
    </div>
  );
}

export default Favorites;
