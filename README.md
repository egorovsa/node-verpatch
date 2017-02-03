# node-verpatch

A node wrapper for [Verpatch](http://www.codeproject.com/Articles/37133/Simple-Version-Resource-Tool-for-Windows)

Rebuild from [npm Verpatch](https://www.npmjs.com/package/verpatch)

Added support MacOs and Linux

## Getting started

`npm install node-verpatch`

## Usage

##### Linux & Mac OS X

- [wine](http://www.winehq.org/), You can [use wine installations guide](https://www.davidbaumgold.com/tutorials/wine-mac/)

```
var verpatch = require('node-verpatch');

verpatch('./path/to/executable/app.exe', '1.0.0', {
        product: 'Desktop Application name',
        company: 'Your company',
        desc: "Desktop Application Description",
        copyright: 'Copyright 2017 Your Company. All rights reserved.'
        publisher: 'publisher'
    }).then(()=>{
        //  ok
    }, error => {
        console.error(error);
    });

```

## Options

### Standard Options

* `desc` - description
* `pb` - private build
* `company` - company
* `(c)` - copyright
* `product` - product name
* `pv` - product version

### Other options

You can store any other key/value you wish