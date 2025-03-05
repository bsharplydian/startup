import React from 'react';
import './inventory.css';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export function Inventory(props) {
    const gameID = JSON.parse(localStorage.getItem("currInv"))[0]
    const charID = JSON.parse(localStorage.getItem("currInv"))[1]
    const [inventory, setInventory] = React.useState(JSON.parse(localStorage.getItem("invs/" + gameID + "/" + charID)))
    const [equipment, setEquipment] = React.useState(inventory["equipment"])
    const [magicItems, setMagicItems] = React.useState(inventory["magic_items"])

    // form data
    const [addName, setAddName] = React.useState('')
    const [addCategory, setAddCategory] = React.useState('')
    const [addNumDice, setAddNumDice] = React.useState('')
    const [addDamageDie, setAddDamageDie] = React.useState('')
    const [addDamageType, setAddDamageType] = React.useState('')
    const [addProperties, setAddProperties] = React.useState([])
    const [addWeight, setAddWeight] = React.useState('')
    const [addCost, setAddCost] = React.useState('')
    const [addCurrency, setAddCurrency] = React.useState('')
    const [addDescription, setAddDescription] = React.useState('')

    const properties = [
        "Ammunition", "Finesse", "Heavy", "Light", "Loading",
        "Monk", "Reach", "Special", "Thrown", "Two-Handed", "Versatile"
    ];
    const handlePropertyChange = (e) => {
        if (addProperties.includes(e)) {
            setAddProperties(addProperties.filter((item) => item !== e))
        } else {
            setAddProperties([...addProperties, e])
        }
    }
    // 5e-bits data
    // const [equipmentCategories, setEquipmentCategories] = React.useState({})
    // const [equipmentLibrary, setEquipmentLibrary] = React.useState({})
    // const [magicItemsLibrary, setMagicItemsLibrary] = React.useState({})
    // const [damageTypes, setDamageTypes] = React.useState({})
    // const [weaponProperties, setWeaponProperties] = React.useState({})

    const charGame = JSON.parse(localStorage.getItem("games/" + gameID))
    const charInfo = getCharInfo(charID, charGame["players"])

    const charName = charInfo["charName"]
    function getCharInfo(id, players) {
        for (const i in players) {
            if (players[i]["charID"] === id) {
                return players[i]
            }
        }
    }
    function addItem() {
        let newItem = {
            name: addName,
            category: addCategory,
            numDice: addNumDice,
            damageDie: addDamageDie,
            damageType: addDamageType,
            properties: addProperties,
            weight: addWeight,
            cost: addCost,
            currency: addCurrency,
            description: addDescription
        }
        let newEquipment = equipment
        let newInventory = inventory
        newEquipment.push(newItem)
        newInventory["equipment"] = newEquipment

        localStorage.setItem("invs/" + gameID + "/" + charID, JSON.stringify(newInventory))
        setAddName('')
        setAddCategory('')
        setAddNumDice('')
        setAddDamageDie('')
        setAddDamageType('')
        setAddProperties([])
        setAddWeight('')
        setAddCost('')
        setAddCurrency('')
        setAddDescription('')
        setEquipment([...newEquipment])
        setInventory(newInventory)
    }
    function deleteItem(index) {
        let newEquipment = equipment;
        let newInventory = inventory;
        newEquipment.splice(index, 1);
        newInventory["equipment"] = newEquipment;
        localStorage.setItem("invs/" + gameID + "/" + charID, JSON.stringify(newInventory))
        setEquipment([...newEquipment])
        setInventory(newInventory)
    }
    // const myHeaders = new Headers();
    // myHeaders.append("Accept", "application/json");
    // const requestOptions = {
    //     method: "GET",
    //     headers: myHeaders,
    //     redirect: "follow"
    // };

    // fetch("https://www.dnd5eapi.co/api/2014/equipment-categories", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => {
    //         setEquipmentCategories(JSON.parse(result))
    //     }
    //     )
    //     .catch((error) => console.error(error)
    //     )

    // fetch("https://www.dnd5eapi.co/api/2014/equipment", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => {
    //         setEquipmentLibrary(JSON.parse(result))
    //     }
    //     )
    //     .catch((error) => console.error(error)
    //     )
    // fetch("https://www.dnd5eapi.co/api/2014/magic-items", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => {
    //         setMagicItemsLibrary(JSON.parse(result))
    //     }
    //     )
    //     .catch((error) => console.error(error)
    //     )
    // fetch("https://www.dnd5eapi.co/api/2014/damage-types", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => {
    //         setDamageTypes(JSON.parse(result))
    //     }
    //     )
    //     .catch((error) => console.error(error)
    //     )
    // fetch("https://www.dnd5eapi.co/api/2014/damage-types", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => {
    //         setDamageTypes(JSON.parse(result))
    //     }
    //     )
    //     .catch((error) => console.error(error)
    //     )
    // fetch("https://www.dnd5eapi.co/api/2014/weapon-properties", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => {
    //         setWeaponProperties(JSON.parse(result))
    //     }
    //     )
    //     .catch((error) => console.error(error)
    //     )


    function InventoryAccordion() {
        return (
            <Accordion className="inventory-accordion">
                <Accordion.Item key="header">
                    <div className="item-info-header item-info">
                        <div className="attr">
                            Name
                        </div>
                        <div className="attr type-outside">
                            Type
                        </div>
                        <div className="attr damage-outside">
                            Damage
                        </div>
                        <div className="attr properties-outside">
                            Properties
                        </div>
                        <div className="attr weight-outside">
                            Weight
                        </div>
                        <div className="attr cost-outside">
                            Cost
                        </div>
                    </div>
                </Accordion.Item>
                {equipment.map((item, index) => {
                    return (
                        <Accordion.Item eventKey={index.toString()} key={index.toString()}>
                            <Accordion.Header>
                                <div className="item-info">
                                    <div className="attr">
                                        {item["name"]}
                                    </div>
                                    <div className="attr type-outside">
                                        {item["category"]}
                                    </div>
                                    <div className="attr damage-outside">
                                        {item["numDice"]}{item["damageDie"]} {item["damageType"]}
                                    </div>
                                    <div className="attr properties-outside">
                                        {item["properties"]}
                                    </div>
                                    <div className="attr weight-outside">
                                        {item["weight"]}
                                    </div>
                                    <div className="attr cost-outside">
                                        {item["cost"]} {item["currency"]}
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="attr-inside type-inside">
                                    <div className="type-label">Type</div>
                                    <div className="type-value">{item["category"]}</div>
                                </div>
                                <div className="attr-inside damage-inside">
                                    <div className="damage-label">Damage</div>
                                    <div className="damage-value">{item["numDice"]}{item["damageDie"]} {item["damageType"]}</div>
                                </div>
                                <div className="attr-inside properties-inside">
                                    <div className="properties-label">Properties</div>
                                    <div className="properties-value">{item["properties"]}</div>
                                </div>
                                <div className="attr-inside weight-inside">
                                    <div className="weight-label">Weight</div>
                                    <div className="weight-value">{item["weight"]}</div>
                                </div>
                                <div className="attr-inside cost-inside">
                                    <div className="cost-label">Cost</div>
                                    <div className="cost-value">{item["cost"]} {item["currency"]}</div>
                                </div>
                                <div className="description-label">
                                    Description
                                </div>
                                <div className="description">
                                    {item["description"] || "This item has no description."}
                                </div>
                                <Dropdown>
                                    <Dropdown.Toggle className="remove-items-button">⋯</Dropdown.Toggle>
                                    <Dropdown.Menu data-bs-theme="dark">
                                        <Dropdown.Item onClick={() => deleteItem(index)}>Delete Item</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        )
    }
    return (
        <main>
            <Link className="char-select-link" to="/games">{"\u2190"} back to character select</Link>

            <div className="inventory-modules">
                <div className="inventory-left">
                    <div className="name-module">
                        <h2 className="char-name">{charName}</h2>
                        <button className="btn btn-secondary notif-button" type="submit">New Item!</button>
                    </div>
                    <div className="equipment inventory-module">
                        <h3>Equipment</h3>
                        <InventoryAccordion />
                    </div>
                    <div className="magic-items inventory-module">
                        <h3>Magic Items <span>(1/3 Attuned)</span></h3>
                        <Accordion className="inventory-accordion">
                            <Accordion.Item>
                                <div className="item-info-header item-info">
                                    <div className="attr">
                                        Name
                                    </div>
                                    <div className="attr attunement-outside">
                                        Attuned?
                                    </div>
                                    <div className="attr rarity-outside">
                                        Rarity
                                    </div>
                                    <div className="attr magic-type-outside">
                                        Type
                                    </div>
                                </div>
                            </Accordion.Item>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <div className="item-info">
                                        <div className="attr">
                                            Ring of Protection
                                        </div>
                                        <div className="attr">
                                            yes
                                        </div>
                                        <div className="attr rarity-outside">
                                            Rare
                                        </div>
                                        <div className="attr magic-type-outside">
                                            Ring
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="attr-inside rarity-inside">
                                        <div className="rarity-label">Rarity</div>
                                        <div className="rarity-value">Rare</div>
                                    </div>
                                    <div className="attr-inside magic-type-inside">
                                        <div className="magic-type-label">Type</div>
                                        <div className="magic-type-value">Ring</div>
                                    </div>
                                    <div className="magic-description-label">
                                        Description
                                    </div>
                                    <div className="magic-description">
                                        Ring, rare (requires attunement)
                                        You gain a +1 bonus to AC and saving throws while wearing this ring.
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>


                        </Accordion>
                        <div className="button-group">
                            <button type="submit" className="change-attunement-button btn btn-primary">Change Attunement</button>
                            <button type="submit" className="remove-items-button btn btn-primary">Remove Items</button>
                        </div>
                        {/* <!-- x/3 note, 3 is clickable and can be edited, but isn't just in a fillable box (like the what if scores on canvas) -->
                        <!-- highlight attuned items --> */}
                    </div>
                </div>
                <div className="inventory-right">
                    <div className="item-form-container inventory-module">
                        <div className="item-form" autoComplete="off">
                            <div className="form-element">
                                <h3>Add an Item</h3>
                            </div>
                            <div className="form-element">
                                <label className="form-label" htmlFor="srd">Search the SRD</label>
                                <div className="form-input-module">
                                    <input className="form-input" id="srd" type="search" autoComplete="off" disabled={true} placeholder="3rd party API will be here next phase"></input>
                                </div>
                            </div>
                            <div className="form-element">
                                <label className="form-label" htmlFor="name">Name</label>
                                <div className="form-input-module">
                                    <input className="form-input" id="name" type="text" autoComplete="off" value={addName} onChange={(e) => { setAddName(e.target.value) }}></input>
                                </div>
                            </div>
                            <div className="form-element">
                                <label className="form-label" htmlFor="type">Equipment Category</label>
                                <div className="form-input-module">
                                    <select className="form-input" id="type" name="type" value={addCategory} onChange={(e) => { setAddCategory(e.target.value) }}>
                                        <option value=""></option>
                                        <option value="Adventuring Gear">Adventuring Gear</option>
                                        <option value="Ammunition">Ammunition</option>
                                        <option value="Arcane Foci">Arcane Foci</option>
                                        <option value="Armor">Armor</option>
                                        <option value="Artisan's Tools">Artisan's Tools</option>
                                        <option value="Druidic Foci">Druidic Foci</option>
                                        <option value="List Placeholder">list placeholder</option>
                                    </select>
                                </div>
                            </div>
                            {/* <!-- It'd be cool if the equipment category determined when other inputs like damage show up --> */}
                            <div className="form-element">
                                <label className="form-label" htmlFor="damage">Damage</label>
                                <div className="form-input-module">
                                    <input className="form-input" type="number" size="1" value={addNumDice} onChange={(e) => { setAddNumDice(e.target.value) }}></input>
                                    <select className="form-input" id="dice" name="dice" value={addDamageDie} onChange={(e) => { setAddDamageDie(e.target.value) }}>
                                        <option value="-">-</option>
                                        <option value="d4">d4</option>
                                        <option value="d6">d6</option>
                                        <option value="d8">d8</option>
                                        <option value="d10">d10</option>
                                        <option value="d12">d12</option>
                                        <option value="d20">d20</option>
                                    </select>
                                    <select className="form-input" id="damage-type" name="damage-type" value={addDamageType} onChange={(e) => { setAddDamageType(e.target.value) }}>
                                        <option value="-">-</option>
                                        <option value="bludgeoning">bludgeoning</option>
                                        <option value="slashing">slashing</option>
                                        <option value="piercing">piercing</option>
                                        <option value="fire">fire</option>
                                        <option value="thunder">thunder</option>
                                        <option value="lightning">lightning</option>
                                        <option value="cold">cold</option>
                                        <option value="poison">poison</option>
                                        <option value="acid">acid</option>
                                        <option value="radiant">radiant</option>
                                        <option value="necrotic">necrotic</option>
                                        <option value="force">force</option>
                                        <option value="psychic">psychic</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-element">
                                <label className="form-label" htmlFor="properties">Properties</label>
                                <div className="form-input-module">
                                    <div className="btn-group form-input row row-cols-2" role="group">
                                        {properties.map((property, index) => (
                                            <React.Fragment key={property}>
                                                <input
                                                    type="checkbox"
                                                    className="btn-check"
                                                    id={`btncheck${index}`}
                                                    autoComplete="off"
                                                    checked={addProperties.includes(property)}
                                                    onChange={() => handlePropertyChange(property)}></input>
                                                <label className="btn btn-outline-primary" htmlFor={`btncheck${index}`}>{property}</label>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="form-element">
                                <label className="form-label" htmlFor="weight">Weight</label>
                                <div className="form-input-module">
                                    <input className="form-input" id="weight" type="number" value={addWeight} onChange={(e) => { setAddWeight(e.target.value) }}></input>
                                </div>
                            </div>
                            <div className="form-element">
                                <label className="form-label" htmlFor="cost">Cost</label>
                                <div className="form-input-module">
                                    <input className="form-input" id="cost" type="number" value={addCost} onChange={(e) => { setAddCost(e.target.value) }}></input>
                                    <select className="form-input" id="currency" name="currency" value={addCurrency} onChange={(e) => { setAddCurrency(e.target.value) }}>
                                        <option value=""></option>
                                        <option value="gp">gp</option>
                                        <option value="sp">sp</option>
                                        <option value="cp">cp</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-element form-description">
                                <label className="form-label" htmlFor="description">Description</label>
                                <div className="form-input-module">
                                    <textarea className="form-input" name="description" cols="40" rows="5" autoComplete="off" value={addDescription} onChange={(e) => { setAddDescription(e.target.value) }}></textarea>
                                </div>
                            </div>
                            <div className="form-element add-item-button-element">
                                <button onClick={() => addItem()} className="add-item-button form-input btn btn-primary">Add Item</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}