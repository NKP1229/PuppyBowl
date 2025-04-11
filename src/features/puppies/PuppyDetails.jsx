/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */
import { useParams } from "react-router-dom";
import { useGetPuppyQuery } from "./puppySlice";
import { useDeletePuppyMutation } from "./puppySlice";
export default function PuppyDetails() {
  // TODO: Grab data from the `getPuppy` query
  const {id} = useParams();
  const { isLoading, data: puppy } = useGetPuppyQuery(id);
  const deletePuppy = useDeletePuppyMutation();
  // TODO: Use the `deletePuppy` mutation to remove a puppy when the button is clicked
  async function removePuppy(id) {
    // setSelectedPuppyId(Id);
    const response = await deletePuppy(id);
    console.log(response);
  }
  // There are 3 possibilities:
  let $details;
  // 1. A puppy has not yet been selected.
  if (!id) {
    $details = <p>Please select a puppy to see more details.</p>;
  }
  //  2. A puppy has been selected, but results have not yet returned from the API.
  else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  }
  // 3. Information about the selected puppy has returned from the API.
  else {
    $details = (
      <>
        <h3>
          {puppy.data.player.name} #{puppy.data.player.id}
        </h3>
        <p>{puppy.data.player.breed}</p>
        <p>Team {puppy.data.player.team?.name ?? "Unassigned"}</p>
        <button onClick={() => removePuppy(puppy.data.player.id)}>
          Remove from roster
        </button>
        <figure>
          <img src={puppy.data.player.imageUrl} alt={puppy.data.player.name} />
        </figure>
      </>
    );
  }

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {$details}
    </aside>
  );
}
