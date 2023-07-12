export const AnimalList = ({ animals, locations, types }) => {
    return (
        <div className="App">
            {
                animals.map((animal) => {
                    const foundType = types.find(type => type.id === animal.typeId)
                    const foundLocation = locations.find(location => location.id === animal.locationId)
                    return <section key={animal.id} className="animal_card">
                        <div>{animal.name}</div>
                        <div>{foundType.type}</div>
                        <div>{foundLocation.name}</div>
                    </section>
                })
            }
        </div>
    )
}