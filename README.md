# JavaScript DOMController Boilerplate

A basic boilerplate for controlling your page. This DOMController Object is intended to provide structure to your event binds and basic page interaction.

Two variations of the DOMController are provided:

#### A JSON formatted Object

A slightly easier to understand variation of this boilerplate and applicable for most any webpage interaction control.

#### A prototype Class

A prototype "Class" that is compatible with dependency systems like [RequireJS](http://requirejs.org/) and [CommonJS](http://www.commonjs.org/), but operates just fine without them. While the DOMController Object is intended to operate as a [singleton](http://en.wikipedia.org/wiki/Singleton_pattern) Object, it is written in a manner that it could be instantiated multiple times. This boilerplate could be adapted for use as a pattern for any type of modular code structure.

## Dependencies

This project uses [jQuery](http://jquery.com/)

## Files in this Repo

##### `main.documented.js`

This is the heavily documented version of the JSON formatted DOMController Boilerplate and should probably only used for reference.

##### `main.js`

If you wish to use the JSON formatted DOMController in your own project, base it off this file. It contains the minimal documentation for use and operation and has the example code found in `main.documented.js` removed.

##### `main.class.documented.js`

This is the heavily documented version of the prototype "Class" DOMController Boilerplate and should probably only used for reference.

##### `main.class.js`

If you wish to use the prototype "Class" DOMController in your own project, base it off this file. It contains the minimal documentation for use and operation and has the example code found in `main.class.documented.js` removed.

## Creators

**Dave Shepard**

- <https://twitter.com/kynatro>
- <https://github.com/kynatro>

## Copyright and license

Code and documentation copyright 2015 Digital Telepathy. Code released under [the MIT license](https://github.com/digital-telepathy/dom-controller-boilerplate/blob/master/LICENSE).
