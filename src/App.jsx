import { Provider } from "react-redux";
import store from "./store/store";

import PuppyDetails from "./features/puppies/PuppyDetails";
import PuppyList from "./features/puppies/PuppyList";
import PuppyForm from "./features/puppies/PuppyForm";
import Nav from "./Nav";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";

/**
 * @component
 * This app shows a list of puppy bowl players from the API.
 * Users can view players in the roster, add a player to the roster,
 * see more details about a specific player, and remove a player from the roster.
 */
export default function App() {

  return (
    <Provider store={store}>
      <h1>Puppy Bowl</h1>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<PuppyList />}></Route>
          <Route path="/form" element={<PuppyForm />}></Route>
          <Route path="/selected/:id" element={<PuppyDetails/>}></Route>
        </Routes>
      </BrowserRouter>
      {/* <h1>Puppy Bowl</h1>
      <PuppyForm />
      <main>
        <PuppyList setSelectedPuppyId={setSelectedPuppyId} />
        <PuppyDetails
          selectedPuppyId={selectedPuppyId}
          setSelectedPuppyId={setSelectedPuppyId}
        />
      </main> */}
    </Provider>
  );
}
