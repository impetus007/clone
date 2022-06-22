import logo from "./logo.svg";
import "./App.css";
import Card from "./components /Card";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function App() {
  const [inputText, setInputText] = useState();
  const [data, setData] = useState();

  const searchpokemon = (e) => {
    e.preventDefault();
    const url = `https://pokeapi.co/api/v2/pokemon/${inputText}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  return (
    <div className="App">
      <div className="header">
        {data ? <h1>{data.species.name}</h1> : <h1>Pokemon</h1>}
      </div>
    <div>
    <form
        className=" form mt-6  flex justify-center"
        onSubmit={searchpokemon}
      >
        <Stack spacing={2} direction="row">
          <TextField
            className="ml-4"
            onChange={(e) => setInputText(e.target.value)}
            id="outlined-basic"
            label="pokemon"
            variant="outlined"
          />
          <Button className="mr-4" type="submit" variant="contained">
            Search
          </Button>
        </Stack>
      </form>
      <div className="flex justify-center">
        <Card data={data} />
      </div>
    </div>
      

    </div>
  );
}

export default App;
