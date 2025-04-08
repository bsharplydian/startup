import React from 'react';
import './inventory.css';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from "react-bootstrap/Dropdown";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import { ErrorToast } from "../errorToast.jsx"
import { NotifToasts } from "../notifToasts.jsx"


export function Inventory(props) {
    const [errorText, setErrorText] = React.useState(null)
    const [notifTexts, setNotifTexts] = React.useState([])

    const [inventory, setInventory] = React.useState([])
    const [charName, setCharName] = React.useState("")
    const [loading, setLoading] = React.useState(true)

    // const [equipment, setEquipment] = React.useState(inventory["equipment"])
    // const [magicItems, setMagicItems] = React.useState(inventory["magic_items"])

    // form data
    const [itemSearchText, setItemSearchText] = React.useState('')
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

    // 5e-bits data
    const [equipmentLibrary, setEquipmentLibrary] = React.useState([])
    const [equipmentCategories, setEquipmentCategories] = React.useState([])


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
    React.useEffect(() => {
        fetch(`/api/games/${props.gameID}/players/${props.playerID}/equipment-items`)
            .then((response) => {
                if (!(response.ok)) {
                    throw new Error("You have not selected a character.")
                }
                return response.json()
            })
            .then((inventory) => { setInventory(inventory); setLoading(false); })
            .catch((error) => {
                setErrorText(error.message)
            }

            )
    }, [loading])
    React.useEffect(() => {
        fetch(`/api/games/${props.gameID}/players`)
            .then((response) => response.json())
            .then((players) => {
                // console.log("players: ", players)
                setCharName(players.find((obj) => obj.playerID === props.playerID).characterName)
            })
    }, [])
    React.useEffect(() => {
        const url = "https://www.dnd5eapi.co/api/2014/equipment";
        fetch(url)
            .then((response) => response.json())
            .then((result) => {
                setEquipmentLibrary(result.results);
            });
    }, []);

    React.useEffect(() => {
        fetch("https://www.dnd5eapi.co/api/2014/equipment-categories")
            .then((response) => response.json())
            .then((result) => {
                setEquipmentCategories(result.results)
            }
            )
            .catch((error) => console.error(error)
            )
    }, [])

    React.useEffect(() => {
        setNotifTexts(["test1", "test2", "test3"])
    }, [])


    function sanitize(str) {
        const reg = /[\[\]\(\)\{\}\*\+\?\.\^\$\|\\]/;
        return str.replace(reg, (match) => (""))
    }
    async function addItem() {
        setLoading(true)
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

        let newInventory = await fetch(`/api/games/${props.gameID}/players/${props.playerID}/equipment-items`, {
            method: "post",
            body: JSON.stringify(newItem),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })


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
        setInventory(newInventory)
    }
    async function addItemSRD(item) {
        let itemData = await fetch(`https://www.dnd5eapi.co/api/2014/equipment/${item.index}`, {
            redirect: "follow"
        })
            .then((response) => response.json())
            .then((result) => {
                setAddName(result.name)
                setAddCategory(result.equipment_category?.name)
                setAddNumDice(result.damage?.damage_dice.split('d')[0])
                if (result.damage) {
                    setAddDamageDie('d' + result.damage?.damage_dice.split('d')[1])
                } else {
                    setAddDamageDie('')
                }
                setAddDamageType(result.damage?.damage_type.index)
                setAddProperties(result.properties?.map((property) => property.name))
                setAddWeight(result.weight)
                setAddCost(result.cost?.quantity)
                setAddCurrency(result.cost?.unit)
                if (result.desc.length > 0) {
                    setAddDescription(result.desc)
                } else {
                    setAddDescription("")
                }
            }

            )
            .catch((error) => console.error(error));
    }
    async function deleteItem(index) {
        setLoading(true)
        let newInventory = { ...inventory }
        newInventory = await fetch(`/api/games/${props.gameID}/players/${props.playerID}/equipment-items/${index}`, {
            method: "delete",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        setInventory({ ...newInventory })
    }



    function InventoryAccordion() {
        if (loading) {
            // console.log("loading!")
            return <div>Loading items...</div>
        }
        else {
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
                    {(inventory["equipment"] !== undefined) && inventory?.equipment?.map((item, index) => {
                        if (item === null) {
                            return
                        }
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
                                            {item["properties"].map((itemName, index) => {
                                                if (index !== item["properties"]?.length - 1) {
                                                    return itemName + ", "
                                                } else {
                                                    return itemName
                                                }
                                            })}
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
                                        <Dropdown.Toggle className="remove-element-button">⋯</Dropdown.Toggle>
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
    }
    return (
        <main>
            <ErrorToast message={errorText} onHide={() => setErrorText(null)}></ErrorToast>
            <NotifToasts messages={notifTexts} onHide={(index) => {
                let newNotifTexts = [...notifTexts]
                newNotifTexts[index] = null
                setNotifTexts(newNotifTexts)
            }
            }></NotifToasts>
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
                                    <Dropdown>
                                        <Dropdown.Toggle>Search</Dropdown.Toggle>
                                        <Dropdown.Menu data-bs-theme="dark">
                                            <input type="text" placeholder="enter item name" value={itemSearchText} onChange={(e) => {
                                                setItemSearchText(sanitize(e.target.value))
                                            }}></input>
                                            {equipmentLibrary.map((item, index) => {
                                                if (item.name.toLowerCase().search(itemSearchText.toLowerCase()) !== -1) {
                                                    return (
                                                        <Dropdown.Item key={item.name} onClick={() => { addItemSRD(item) }}>
                                                            {item.name}
                                                        </Dropdown.Item>
                                                    );
                                                }
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
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
                                        {equipmentCategories?.map((category) =>
                                            <option value={category.name} key={category.index}>{category.name}</option>
                                        )}
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