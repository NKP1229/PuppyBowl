import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddPuppyMutation } from "./puppySlice";
/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */
export default function PuppyForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [addPuppy] = useAddPuppyMutation();
  const { isLoading, error } = useAddPuppyMutation();
  // TODO: Use the `addPuppy` mutation to add a puppy when the form is submitted

  async function postPuppy(event) {
    event.preventDefault();
    // Placeholder image w/ random photos of dogs
    const imageUrl = "https://loremflickr.com/200/300/dog";
    const status = "bench";
    const teamId = "456";
    try{
      //console.log("name:", name, ", breed: ",breed);
      const response = await addPuppy({name, breed, status, imageUrl, teamId});
      console.log(response);
      navigate('/');
    }
    catch(error){
      console.error(error.message);
    }
  }

  return (
    <div className="form">
      <h2>Add a Puppy</h2>
      <form onSubmit={postPuppy}>
        <div className="form-group">
          <label>
            Name
            <input
              name="puppyName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Breed
            <input
              name="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add to Roster</button>
        {isLoading && <output>Uploading puppy information...</output>}
        {error && <output>{error.message}</output>}
      </form>
    </div>
  );
}
