
# link-to-bin

A tool to link or unlink an executable to `~/.local/bin`.

## How to install it?

First you need to have [Node.js](https://nodejs.org) on your system, then you can install it like this:

```sh
npm i -g link-to-bin
```

## What does it do?

E.g. if you have `mySuperScript.js` and call 
```sh
link-to-bin mySuperScript.js
``` 
then it will make `~/.local/bin/mySuperScript` link to that script!

It will also make sure that it is set with executable permission.

But it's up to you to put the correct [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)), e.g. `#!/usr/bin/env node` if it's a Node.js script!

## The End

Take care!

Go eat a banana, it's good for you.
