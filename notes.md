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
- up next:
    - add styles to be used when the user wants to remove an item
    - touch up table style

#### questions i need to answer
- who can create games?
    - anyone, it will just have different positions
- who can see characters?
    - dm can see all; players can only see characters they themselves created (or they can see the other ones but they're grayed out)
- who can create characters within games?
    - only players

## React!
### reading notes
- you'll need to include your `<nav>` element inside of your `<Routes>` element since your first page is different than the others
    -actully use two Routes elements, one of them with the nav and the other with the main content