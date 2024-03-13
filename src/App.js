// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import Table from './components/Table';
import Pagination from './components/Pagination';
import DataLimitInput from './components/DataLimitInput';



const App = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(3); // Default limit set to 3
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default items per page set to 3
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities`, {
          params: { countryIds: 'IN', namePrefix: query, limit: itemsPerPage, offset: (currentPage - 1) * itemsPerPage },
          headers: {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': '4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe'
          }
        });

        setData(response.data.data);
        setTotalPages(Math.ceil(response.data.metadata.totalCount / itemsPerPage));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (query !== '') {
      fetchData();
    } else {
      setData([]);
      setTotalPages(0);
    }
  }, [query, currentPage, itemsPerPage]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    if(newItemsPerPage>10){
      alert("Maximum limit exceeded. Maximum limit is 10.");
      return;
    }
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div>
      <SearchBox onSearch={handleSearch} />
      <Table data={data} query={query} loading={loading}/>
      {totalPages > 0 && !loading && (
        <Pagination currentPage={currentPage} totalPage={totalPages} onPageChange={handlePageChange} />
      )}
      {!loading && data?.length>0 && (<DataLimitInput value={itemsPerPage} onChange={handleItemsPerPageChange} />)}
    </div>
  );
};

export default App;
