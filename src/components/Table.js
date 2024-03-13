import React from 'react';
import './Table.css'; 

const Table = ({ data, query, loading }) => {
  return (
    <div className="table-container">
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <table className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.length == 0 && !loading ?
              (
                query?.length ? (

                  <tr>
                    <td colSpan={3}>
                      No Result Found
                    </td>
                  </tr>
                ):
                (
                  <tr>
                    <td colSpan={3}>
                      Start Searching
                    </td>
                  </tr>
                )
            ) :
              (
                !loading && (
                  data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <img src={`https://countryflagsapi.com/png/${item.countryCode}`} alt={item.countryCode} />
                        {item.country}
                      </td>
                    </tr>
                  ))
                )
              )
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
