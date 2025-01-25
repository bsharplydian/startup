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

## CSS
- pseudo selectors will work well when I want to show a new inventory item or modify a thing when the user hovers over it
- transformations are absolute, not relative
- have the docs available to reference constantly, there's so much here that trying to memorize it all would be a lost cause
- check out the home page example at [this instruction page](https://github.com/webprogramming260/.github/blob/main/profile/css/practice/practice.md) for a dropdown menu; you might be able to use it for the SRD