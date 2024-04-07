import { useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import FoodCards from './FoodCards';

const App = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchFoodItems = async (foodName) => {
    try {
      setFoodItems([]);
      setLoading(true);
      foodName = foodName ? foodName : 'burger';
      const response = await fetch(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${foodName}&page=1&page_size=10&json=1`
      );
      const data = await response.json();
      setFoodItems(data.products);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  let foodList = (
      <div className={'empty'}>
        <h2>No food found</h2>
      </div>
  );

  let loadingCards = <PageisLoading />;

  if (loading) {
    foodList = loadingCards;
  }

  if (foodItems.length > 0 && !loading) {
    foodList = (
        <div className={'container'}>
          {foodItems?.map((value, index) => (
              <FoodCards key={index} foodItem={value} />
          ))}
        </div>
    );
  }

  return (
      <main className="app">
        {/* header */}
        <h1>Food Land</h1>

        {/* search */}
        <search className="search">
          <input
              placeholder={'Search for foods'}
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
          />
          <img
              src={SearchIcon}
              alt="Search"
              onClick={() => {
                searchFoodItems(searchTerm);
              }}
          />
        </search>

        {/* foodList */}
        {foodList}
      </main>
  );
};

function PageisLoading() {
  return <h1> Page is loading.....</h1>;
}

export default App;
