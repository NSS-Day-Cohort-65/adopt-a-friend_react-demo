//useState (userLocationChoice)
//useEffect (watch for userLocationChoice to change, find location)
//html for form
//click event on submit button
//create function for click event that will post to api


//fieldset for type
//fieldset for location
//fieldset for name
//fieldset for age
import { useState } from "react"

export const NewAnimalForm = ({locations, types, setAnimals}) => {
    const [newAnimal, setNewAnimal] = useState({
        name: "",
        age: "",
        typeId: 0,
        locationId: 0
    })

    const handleClick = (event) => {
        event.preventDefault()
        fetch('http://localhost:8088/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnimal),
      })
        .then((res) => res.json())
        .then(() => {
          fetch('http://localhost:8088/animals')
            .then((res) => res.json())
            .then((itemsData) => {
              setAnimals(itemsData)
              setNewAnimal({
                name: '',
                age: '',
                typeId: 0,
                locationId: 0
              })
            })
        })
    }

    return (
        <form>
            <fieldset>
                <label>Name: </label>
                <input
                    required
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder="animal"
                    value={newAnimal.name}
                    onChange={(event) => {
                        const copy = { ...newAnimal }
                        copy.name = event.target.value
                        setNewAnimal(copy)
                    }}
                />
            </fieldset>
            <fieldset>
                    {
                    locations.map((location) => {
                        return (
                            <div key={location.id} className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        value={location.id}
                                        checked={newAnimal.locationId === location.id}
                                        onChange={(event) => {  
                                            const copy = { ...newAnimal }
                                            copy.locationId = parseInt(event.target.value)
                                            setNewAnimal(copy)
                                        }}
                                    />
                                    {location.name}
                                </label>
                            </div>
                        )
                    })}
               
            </fieldset>
            <fieldset>
            {
                    types.map((type) => {
                        return (
                            <div key={type.id} className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        value={type.id}
                                        checked={newAnimal.typeId === type.id}
                                        onChange={(event) => {  
                                            const copy = { ...newAnimal }
                                            copy.typeId = parseInt(event.target.value)
                                            setNewAnimal(copy)
                                        }}
                                    />
                                    {type.type}
                                </label>
                            </div>
                        )
                    })}
            </fieldset>
            <fieldset>
                <label>Age: </label>
                <input
                    required
                    id="age"
                    type="text"
                    className="form-control"
                    placeholder="age"
                    value={newAnimal.age}
                    onChange={(event) => {
                        const copy = { ...newAnimal }
                        copy.age = event.target.value
                        setNewAnimal(copy)
                    }}
                />
            </fieldset>
            <button onClick={(event => {
                handleClick(event)
            })}>Add New Animal</button>
        </form>
    )
}