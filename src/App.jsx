import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [recherche, setRecherche] = useState("");
  const [rechercheList, setRechercheList] = useState([]);

  const handleChange = (e) => {
    setRecherche(e.target.value);
  };

  const actu = async () => {
    console.log("recherche", recherche);
    let response = await fetch(
      `https://fr.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${recherche}&format=json`
    );
    let donnees = await response.json();
    setRechercheList(donnees[3]);
    console.log("donnee", donnees);
  };

  useEffect(() => {}, [recherche]);

  const renderMyList = () => {
    if (rechercheList.length > 0) {
      return rechercheList.map((item, key) => {
        return (
          <div className="render-container">
            <span>{key + 1} - </span>
            <a href={item}>{item}</a>
          </div>
        );
      });
    } else {
      return <h3>Vous n'avez pas encore effectué de recherche</h3>;
    }
  };

  return (
    <>
      <h1> Mes recherches Wikipedia</h1>
      <input onChange={handleChange} />
      <button onClick={actu}>wikiSearch</button>
      <div>{renderMyList()}</div>
    </>
  );
}

export default App;
