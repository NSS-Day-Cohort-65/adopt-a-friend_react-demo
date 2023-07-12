import { useEffect, useState } from 'react';
import './App.css';
import { AnimalList } from './animals/AnimalList';
import { NewAnimalForm } from './animals/NewAnimalForm';

//a list of animals

//useState [animals, setAnimals]
//useEffect to fetch (GET) animals from the api and watch for state changes
//useState [types, setTypes]
//fetch (GET) types from api in existing useEffect
//useState [locations, setLocations]
//fetch (GET) locations from the api in existing useEffect

export const Adopt_A_Friend = () => {
  const [animals, setAnimals] = useState([])
  const [types, setTypes] = useState([])
  const [locations, setLocations] = useState([])

  // Response: json() method
  // It returns a promise which resolves with the result of parsing the body text as JSON.
  // Note that despite the method being named json(), the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.
  useEffect(() => {
    fetch("http://localhost:8088/animals")
      // the first .then the response is still in text format until you invoke .json() on it which turns it into JavaScript format that you can then use in your application
      .then((res) => res.json())
      // the second .then is when the response is in JavaScript format
      .then((data) => {
        //this is where we invoke the setter function and pass the data from our fetch
        setAnimals(data)
      })

    fetch("http://localhost:8088/types")
      .then((res) => res.json())
      .then((data) => {
        setTypes(data)
      })

    fetch("http://localhost:8088/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data)
      })

  }, []) //An empty dependency array will watch for the initial render of the component and only run the callback on that initial run

  return (
    <>
      <NewAnimalForm locations={locations} types={types} setAnimals={setAnimals} />
      <AnimalList animals={animals} types={types} locations={locations} />
    </>
  )
}