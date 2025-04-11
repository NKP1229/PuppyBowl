import { useEffect, useState } from "react";
import { useGetPuppiesQuery } from "./puppySlice";
import { useNavigate } from "react-router-dom";
/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
export default function PuppyList({ setSelectedPuppyId }) {
  // TODO: Get data from getPuppies query
  const { status, isLoading, data: allPuppies } = useGetPuppiesQuery();
  const [puppies, setListOfPuppies] = useState([]);
  const navigate = useNavigate();
  
  const [searched, setSearched] = useState('');
  const handleChange = (e) => {
    setSearched(e.target.value);
  };
  const searchedDogs = puppies.filter(dog =>
    dog.name.toLowerCase().startsWith(searched.toLowerCase())
  );
  
  useEffect(() => {
    if (status === "fulfilled") {
      setListOfPuppies(allPuppies);
    }

  }, [status]);
  
  if(isLoading){
    return (<h1>Loading</h1>);
  }
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="search-container">
              <input 
                type="text" 
                className="form-control search-input" 
                placeholder="Search Player Name..."
                value={searched}
                onChange={handleChange}
              />
              <i className="fas fa-search search-icon"></i>
            </div>
          </div>
        </div>
      </div>
      <article>
        <h2>Roster</h2>
        <ul className="puppies">
          {isLoading && <li>Loading puppies...</li>}
          {searchedDogs.map((p) => (
            <li key={p.id}>
            <h3>
              {p.name} #{p.id}
            </h3>
            <figure>
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <button onClick={() => navigate(`/selected/${p.id}`)}>{/* <button onClick={() => navigate() setSelectedPuppyId(p.id)}> */}
              See details
            </button>
          </li>
          ))}
        </ul>
      </article>
    </>
  );
}
