![logo](tokbox-logo.png)

# Accelerator Annotation for JavaScript<br/>

[![Build Status](https://travis-ci.org/opentok/accelerator-annotation-js.svg?branch=master)](https://travis-ci.org/opentok/accelerator-annotation-js)
[![GitHub release](https://img.shields.io/github/release/opentok/accelerator-annotation-js.svg)](./README.md)
[![license MIT](https://img.shields.io/github/license/opentok/accelerator-annotation-js.svg)](./LICENSE)
[![npm](https://img.shields.io/npm/v/opentok-annotation.svg)](https://www.npmjs.com/package/opentok-annotation)


## Quick start

The OpenTok Accelerator Annotation provides functionality you can add to your OpenTok applications that enables users to have the ability to annotate on a local or remote screen.
This section shows you how to prepare and use the OpenTok Annotations Accelerator Pack as part of an application.

## Install

```bash
$ npm install --save opentok-annotation
```
If using browserify or webpack:
```javascript
const annotation = require('opentok-annotation');
```
Otherwise, include the accelerator pack in your html:
```html
<script src="../your/path/to/opentok-annotation.js"></script>
```
 . . . and it will be available in global scope as `AnnotationAccPack`
 
-----------------

Click [here](https://www.npmjs.com/search?q=opentok-acc-pack) for a list of all OpenTok accelerator packs.

## Explore the code

The following `options` fields are used in the `AnnotationAccPack` constructor:<br/>

| Feature        | Field  | Required |
| ------------- | ------------- | -----|
| Set the OpenTok session  (object).| `session` |`true`|
| Set the Common layer API (object) - Automatically set if using [Core](https://github.com/opentok/accelerator-core-js). | `accPack` |`false`|
| Set the callback to receive the image data on screen capture (function). | `onScreenCapture` |`false`|

To initialize the accelerator pack:

```javascript
var annotation = new annotationAccPack(options);
```
Once initialized, the following methods are available:

### `start`

*Creates an external window (if required) and links the annotation toolbar to the session.  An external window is ONLY required if sharing the current browser window.*

```javascript
@param {Object} session
@param {Object} [options]
@param {Boolean} [options.screensharing] - Using an external window
@param {Array} [options.items] - Custom set of tools
@param {Array} [options.colors] - Custom color palette
@returns {Promise} < Resolve: undefined | {Object} Reference to external annotation window >
```

### `linkCanvas`

*Create and link a canvas to the toolbar and session.  See notes about [resizing the canvas](#resizing-canvas) below*

```javascript
@param {Object} pubSub - Either the publisher(sharing) or subscriber(viewing)
@param {Object} container - The parent container for the canvas element
@param {Object} options
@param {Object} [options.externalWindow] - Reference to the an external annotation window (publisher only)
@param {Object} [options.absoluteParent] - Reference element for resize if other than container
```

### `resizeCanvas`

*Trigger a manual resize of the canvas.*

### `addSubscriberToExternalWindow`

*Add a subscriber's video to the external annotation window.*

```javascript
@param {Object} stream - The subscriber stream object
```

### `end`

*End annotation, clean up the toolbar and canvas(es)*
***

The `AnnotationAccPack`  triggers the following events via the common layer:

| Event        | Description  |
| ------------- | ------------- |
| `startAnnotation` | Annotation linked to session and toolbar created.|
| `linkAnnotation ` | Annotation canvas has been linked to the toolbar. |
| `resizeCanvas` | The annotation canvas has been resized. |
| `annotationWindowClosed` (screen sharing only)  | The external annotation window has been closed.|
| `endAnnotation` | Annotation has ended.  Toolbar and canvases have been cleaned up. |

If using the common layer, you can subscribe to these events by calling `registerEventListener` on  `_accPack` and providing a callback function:

```javascript
accPack.registerEventListener('eventName', callback);
```

If using the [Accelerator Core](https://github.com/opentok/accelerator-core-js) you can subscribe to these events by calling `on` on  `otCore` and providing a callback function:

```javascript
otCore.on('eventName', callback)
```

### Best Practices for Resizing the Canvas
<a name="resizing-canvas"></a>

The `linkCanvas` method refers to a parent DOM element called the `absoluteParent`.  When resizing the canvas, the annotation accelerator pack also resizes the canvas container element using inline properties.  Because of this, we need another element to reference for dimensions.  For this, we use the `absoluteParent`.


### Multiparty video communication sample app using the Screensharing and Accelerator Annotation with best-practices for Javascript [here](https://github.com/opentok/accelerator-sample-apps-js).
