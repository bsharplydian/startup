# CS 260 notes

## Setup
GitHub conflicts:
 - easily merged using VS Code, which allows you to choose a commit to keep

## HTML
I'm familiar with basic HTML, so this section was mostly review. There were a few things I thought were interesting:
- \<img> tags don't have a closing tag since they don't contain any text
- scaling the width of an image automatically scales the height
- links require the https:// prefix to work correctly
- I wonder if there's a way to store the header or footer information separately so that it can be easily duplicated and modified across pages
### Playing with HTML examples and Deploying Simon
- I really like the workflow of modifying my HTML through VS Code. Having a mock version of the page running on localhost makes it super easy to update and tweak things quickly.
- Running the deploy script helped me understand how my key fits into the picture. I need to give my domain my private key to prove that I'm authorized to deploy a set of changes.
### Working on startup HTML
- I'm not sure the best way to organize the games and inventory. In the end I settled for lists and tables, but I may need to change the implementation if styling it the way I want doesn't work.
- Eventually decided to put the icon and name on the login screen into the header. I might put it back to the middle of the screen once I can try out some different styles.
- maybe put the inventory sections into a table for two columns? You might need to use css for that instead
- ^the answer to this question is flexbox with two sections

## CSS
- pseudo selectors will work well when I want to show a new inventory item or modify a thing when the user hovers over it
- transformations are absolute, not relative
- have the docs available to reference constantly, there's so much here that trying to memorize it all would be a lost cause
- check out the home page example at [this instruction page](https://github.com/webprogramming260/.github/blob/main/profile/css/practice/practice.md) for a dropdown menu; you might be able to use it for the SRD

### plans/notes for startup CSS
- flexbox with two or three sections for inventory page; use media query to modify for mobile
    - maybe have a section for the first column and a section for the second column, with the second section containing the magic item inventory and the new item form
- flexbox system:
    - parent has a set width/height
    - parent has display: flex;
    - parent has a flex direction
    - child has flex: min max;
- use bootstrap for dropdown menus/search results?
- accordion would be super useful for inventory items, if you can figure out a way to put a bunch of the info in the menu bar
    - accordion works! use bootstrap and override the default styles
- up next: fix 'add game' button, add an 'add character' button to each game (and add a way to put in the information, it might be just a name and a pic)

- [this guy](https://forum.bootstrapstudio.io/t/i-want-to-do-a-table-with-accordion-rows/10261) has a similar problem to me with the inventory stuff. maybe check out their solution

#### questions i need to answer
- who can create games?
    - anyone, it will just have different positions
- who can see characters?
    - dm can see all; players can only see characters they themselves created (or they can see the other ones but they're grayed out)
- who can create characters within games?
    - only players
- what if you want to make a character outside of a game? is it too ambitious to make that an option?

## React!
### reading notes
- you'll need to include your `<nav>` element inside of your `<Routes>` element since your first page is different than the others
    -actully use two Routes elements, one of them with the nav and the other with the main content
### goals for react implementation
- add game button shows/hides menu
    - adding a game puts it into the local storage as json

- add character button shows/hides dropdown
    - adding a character puts it into local storage under game
- dynamic searchbar in add item
    - adding an item builds json and puts it into local storage
#### functions needed:
/games:
- [x] addGame - takes a game name and a role, and creates a game with the format `{gameName: "gameName", dm: "dmName", characters:[{playerName: "kyler", charName: "zetramah"}, ...]}`
- [x] addChar - takes a character name (given by a dropdown), the player's username, and a game name (given by the accordion section) and adds that character and player to the "characters" portion of the given game
- [x] chars should send player to the correct inventory when clicked, confirming that they are authorized to view the page. This is done by getting the correct name and inventory items from the database (or in this case, local storage)

/inventory:
- [ ] addItem - takes item information for each input box and puts it in local storage. equipment/magic items list should update.
- [ ] removeItems - adds check boxes to onscreen item list, storing each checked item and then removing them from the equipment or magic items stored data
- [ ] attuneItems - adds check boxes to onscreen magic item list, getting current state of each item and then storing the modified state when the user clicks 'done'
- [ ] searchSRD - displays a dynamic dropdown menu as user types, then disables the input if the user selects an item

### syntax stuff
| syntax | description |
| ---: | --- |
| `{condition && (<html>)}` | html only displays when condition is true |
| `const [var, varSetter] = React.useState(initialVar)` | defines a var and varSetter function. var initializes with the value of initialVar. |
| `React.useEffect(() => {}, [])` | sets up a function to render based on updates from items in the dependency list (if dependency list is not included, it renders every frame; if it is included but empty, it renders on the first frame only) |

### frontend functionality I still need to add
- join games button
- delete items from inventory
- delete game
- dynamic searchbar
- view new item added by dm button

## Service
- I've thought of a good rule for users to interact with other users' content
    1. a user can only see games they are a part of
    2. a user can request to join a game via an add code of some sort (add a 'join game' button)
    3. a user can view, but not edit, other characters' inventories in a shared game (unless they are the DM)

### http endpoint lifecycle
1. in jsx, const response = await fetch("endpoint", {method, body, headers})
2. in index.js, apiRouter.{httpMethod}("endpoint", async function takes req and res as params)
3. in jsx, response is received
4. if endpoint contains a /:id, it can be queried with req.params.id