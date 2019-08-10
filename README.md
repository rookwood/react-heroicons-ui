> # react-heroicons-ui

React components for Steve Schroger's
[heroicons-ui](https://github.com/sschoger/heroicons-ui), a set of 104 free
premium SVG icons.

A list of all included icons is available at
[react-heroicons-ui.netlify.com](https://react-heroicons-ui.netlify.com)

## Quickstart

Installation:

```
$ npm install react-heroicons-ui
```

Usage:

```js
import React from "react";
import { IconThumbsUp } from "react-heroicons-ui";

const YourComponent = () => <IconThumbsUp height={40} fill="rebeccapurple" />;
```

## Props

All props are given directly to the outputted SVG.

## Changes from the original icons

The original icons all have `class="heroicons-ui"` set on the inner `<path>` of
the icons. This class has been removed in order to give complete control of the
props to ther end-user and minimize bundle size.
