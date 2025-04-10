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
  // const { getPuppy } = useGetPuppyQuery();
  // const [ addPuppy ] = useAddPuppyMutation();
  // const [ deleteAPuppy ] = useDeletePuppyMutation();
  const [puppies, setListOfPuppies] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (status === "fulfilled") {
      setListOfPuppies(allPuppies);
      //console.log(allPuppies);
    }

  }, [status]);
  // const Add = async (name, breed) => {
  //   try {
  //     const response = await addPuppy({name, breed}).unwrap();
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // const Get = async (id) => {
  //   try {
  //     const response = await getPuppy(id).unwrap();
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const Delete = async (id) => {
  //   try {
  //     const response = await deleteAPuppy(id).unwrap();
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  if(isLoading){
    return (<h1>Loading</h1>);
  }
  return (
    <article>
      <h2>Roster</h2>
      <ul className="puppies">
        {isLoading && <li>Loading puppies...</li>}
        {allPuppies.map((p) => (
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
  );
}
