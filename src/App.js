import './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Navbar from './Components/Navbar';
import BookList from './Components/BookList';

function App() {

  const [books,setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleSearch = async (queryyy) => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${queryyy}`
        );

        if (response.data.items) { // Check if items exist in the response
          setBooks(response.data.items);
        } else {
          setBooks([]); // If no items, reset the books state
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    handleSearch(searchQuery); // Pass the searchQuery directly
  }, [searchQuery]);
  

  useEffect(()=>{
    
    const DataFetch = async ()=>{

      try{
        const resultsHerry = await axios.get("https://www.googleapis.com/books/v1/volumes?q=harry+potter");
        const resultsSharelock = await axios.get("https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes"); 
        const AllData = resultsHerry.data.items.concat(resultsSharelock.data.items)
        // console.log(AllData)
        setBooks(()=>AllData);
      }
      catch(error){console.log(error,"error Fetching time.....")}
    }
    DataFetch()
  },[]);
  
  // console.log(books,"bokesdfas",books.length>1)
  return (
    <div className="App">
      <Navbar onSearch={setSearchQuery} />
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <div className="no-results"></div>
      )}
    </div>
  );
}

export default App;