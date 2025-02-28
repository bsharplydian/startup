import React from 'react';
import './inventory.css';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

export function Inventory(props) {
    let charGame = JSON.parse(localStorage.getItem("games/" + JSON.parse(localStorage.getItem("currInv"))[0]))
    let charInfo = getCharInfo(JSON.parse(localStorage.getItem("currInv"))[1], charGame)
    console.log(charInfo)
    let charName = charInfo["charName"]
    function getCharInfo(id, game) {
        for (const i in game["players"]) {
            if (game["players"][i]["charID"] === id) {
                return game["players"][i]
            }
        }
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
                        <Accordion className="inventory-accordion">
                            <Accordion.Item>
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
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <div className="item-info">
                                        <div className="attr">
                                            Quarterstaff
                                        </div>
                                        <div className="attr type-outside">
                                            Weapon
                                        </div>
                                        <div className="attr damage-outside">
                                            1d6 bludgeoning
                                        </div>
                                        <div className="attr properties-outside">
                                            Versatile (1d8)
                                        </div>
                                        <div className="attr weight-outside">
                                            4
                                        </div>
                                        <div className="attr cost-outside">
                                            2 sp
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="attr-inside type-inside">
                                        <div className="type-label">Type</div>
                                        <div className="type-value">Weapon</div>
                                    </div>
                                    <div className="attr-inside damage-inside">
                                        <div className="damage-label">Damage</div>
                                        <div className="damage-value">1d6 bludgeoning</div>
                                    </div>
                                    <div className="attr-inside properties-inside">
                                        <div className="properties-label">Properties</div>
                                        <div className="properties-value">Versatile (1d8)</div>
                                    </div>
                                    <div className="attr-inside weight-inside">
                                        <div className="weight-label">Weight</div>
                                        <div className="weight-value">4</div>
                                    </div>
                                    <div className="attr-inside cost-inside">
                                        <div className="cost-label">Cost</div>
                                        <div className="cost-value">2 sp</div>
                                    </div>
                                    <div className="description-label">
                                        Description
                                    </div>
                                    <div className="empty-description">
                                        This item has no description.
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    <div className="item-info">
                                        <div className="attr">
                                            Mysterious Note
                                        </div>
                                        <div className="attr type-outside">

                                        </div>
                                        <div className="attr damage-outside">

                                        </div>
                                        <div className="attr properties-outside">

                                        </div>
                                        <div className="attr weight-outside">

                                        </div>
                                        <div className="attr cost-outside">

                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="attr-inside type-inside">

                                    </div>
                                    <div className="attr-inside damage-inside">

                                    </div>
                                    <div className="attr-inside properties-inside">

                                    </div>
                                    <div className="attr-inside weight-inside">

                                    </div>
                                    <div className="attr-inside cost-inside">

                                    </div>
                                    <div className="description-label">
                                        Description
                                    </div>
                                    <div className="description">
                                        An assassin's order found on the body of a mercenary. It's signed O.W.H.
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>
                                    <div className="item-info">
                                        <div className="attr">
                                            Torch (10)
                                        </div>
                                        <div className="attr type-outside">
                                            Adventuring Gear
                                        </div>
                                        <div className="attr damage-outside">
                                            1 fire
                                        </div>
                                        <div className="attr properties-outside">

                                        </div>
                                        <div className="attr weight-outside">
                                            1
                                        </div>
                                        <div className="attr cost-outside">
                                            1 cp
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="attr-inside type-inside">
                                        <div className="type-label">Type</div>
                                        <div className="type-value">Adventuring Gear</div>
                                    </div>
                                    <div className="attr-inside damage-inside">
                                        <div className="damage-label">Damage</div>
                                        <div className="damage-value">1 fire</div>
                                    </div>
                                    <div className="attr-inside properties-inside">

                                    </div>
                                    <div className="attr-inside weight-inside">
                                        <div className="weight-label">Weight</div>
                                        <div className="weight-value">1</div>
                                    </div>
                                    <div className="attr-inside cost-inside">
                                        <div className="cost-label">Cost</div>
                                        <div className="cost-value">1 cp</div>
                                    </div>
                                    <div className="description-label">
                                        Description
                                    </div>
                                    <div className="description">
                                        A torch burns htmlFor 1 hour, providing bright light in a 20-foot radius and dim light htmlFor an additional 20 feet. If you make a melee attack with a burning torch and hit, it deals 1 fire damage.
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <div className="button-group">
                            <button type="submit" className="remove-items-button btn btn-primary">Remove Items</button>
                        </div>
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
                        <form className="item-form" autoComplete="off">
                            <div className="form-element">
                                <h3>Add an Item</h3>
                            </div>
                            <div className="form-element">
                                <label className="form-label" htmlFor="srd">Search the SRD</label>
                                <div className="form-input-module">
                                    <input className="form-input" id="srd" type="search"></input>
                                </div>
                            </div>
                            <div className="form-element">
                                <label className="form-label" htmlFor="name">Name</label>
                                <div className="form-input-module">
                                    <input className="form-input" id="name" type="text"></input>
                                </div>
                            </div>
                            <div className="form-element">
                                <label className="form-label" htmlFor="type">Equipment Category</label>
                                <div className="form-input-module">
                                    <select className="form-input" id="type" name="type">
                                        <option value="adventuring-gear">Adventuring Gear</option>
                                        <option value="ammunition">Ammunition</option>
                                        <option value="arcane-foci">Arcane Foci</option>
                                        <option value="armor">Armor</option>
                                        <option value="artisans-tools">Artisan's Tools</option>
                                        <option value="druidic-foci">Druidic Foci</option>
                                        <option value="placeholder">list placeholder</option>
                                    </select>
                                </div>
                            </div>
                            {/* <!-- It'd be cool if the equipment category determined when other inputs like damage show up --> */}
                            <div className="form-element">
                                <label className="form-label" htmlFor="damage">Damage</label>
                                <div className="form-input-module">
                                    <input className="form-input" type="text" size="1"></input>
                                    <select className="form-input" id="dice" name="dice">
                                        <option value="-">-</option>
                                        <option value="d4">d4</option>
                                        <option value="d6">d6</option>
                                        <option value="d8">d8</option>
                                        <option value="d10">d10</option>
                                        <option value="d12">d12</option>
                                        <option value="d20">d20</option>
                                    </select>
                                    <select className="form-input" id="damage-type" name="damage-type">
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
                                        <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="btncheck1">Ammunition</label>

                                        <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="btncheck2">Finesse</label>

                                        <input type="checkbox" className="btn-check" id="btncheck3" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="btncheck3">Heavy</label>

                                        <input type="checkbox" className="btn-check" id="btncheck4" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="btncheck4">Light</label>

                                        <input type="checkbox" className="btn-check" id="btncheck5" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="btncheck5">Loading</label>

                                        <input type="checkbox" className="btn-check" id="btncheck6" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="btncheck6">Monk</label>

                                        <input type="checkbox" className="btn-check" id="btncheck7" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="btncheck7">Reach</label>

                                        <input type="checkbox" className="btn-check" id="btncheck8" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="btncheck8">Special</label>

                                        <input type="checkbox" className="btn-check" id="btncheck9" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="btncheck9">Thrown</label>

                                        <input type="checkbox" className="btn-check" id="btncheck10" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="btncheck10">Two-Handed</label>

                                        <input type="checkbox" className="btn-check" id="btncheck11" autoComplete="off"></input>
                                        <label className="btn btn-outline-primary" htmlFor="btncheck11">Versatile</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-element">
                                <label className="form-label" htmlFor="weight">Weight</label>
                                <div className="form-input-module">
                                    <input className="form-input" id="weight" type="number"></input>
                                </div>
                            </div>
                            <div className="form-element">
                                <label className="form-label" htmlFor="cost">Cost</label>
                                <div className="form-input-module">
                                    <input className="form-input" id="cost" type="number"></input>
                                    <select className="form-input" id="currency" name="currency">
                                        <option value="gp">gp</option>
                                        <option value="sp">sp</option>
                                        <option value="cp">cp</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-element form-description">
                                <label className="form-label" htmlFor="description">Description</label>
                                <div className="form-input-module">
                                    <textarea className="form-input" name="description" cols="40" rows="5"></textarea>
                                </div>
                            </div>
                            <div className="form-element add-item-button-element">
                                <button type="submit" className="add-item-button form-input btn btn-primary">Add Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}