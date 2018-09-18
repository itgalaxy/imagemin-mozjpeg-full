# imagemin-mozjpeg-full

[![NPM version](https://img.shields.io/npm/v/imagemin-mozjpeg-full.svg)](https://www.npmjs.org/package/imagemin-mozjpeg-full)
[![Travis Build Status](https://img.shields.io/travis/itgalaxy/imagemin-mozjpeg-full/master.svg?label=build)](https://travis-ci.org/itgalaxy/imagemin-mozjpeg-full)
[![dependencies Status](https://david-dm.org/itgalaxy/imagemin-mozjpeg-full/status.svg)](https://david-dm.org/itgalaxy/imagemin-mozjpeg-full)
[![devDependencies Status](https://david-dm.org/itgalaxy/imagemin-mozjpeg-full/dev-status.svg)](https://david-dm.org/itgalaxy/imagemin-mozjpeg-full?type=dev)

Imagemin plugin for all mozjpeg binaries (cjpeg and jpegtran).

What is difference between [imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg):

- Contains binaries delivered by `mozjpeg`: `cjpeg` and `jpegtran` (feel free to send a PR with new binary).
- No security vulnerabilities.
- Latest version.

## Installation

```shell
$ npm install imagemin-mozjpeg
```

## Usage

### Cjpeg (alias mozjpeg)

```js
const imagemin = require("imagemin");
const imageminCjpeg = require("imagemin-mozjpeg").cjpeg;

(async () => {
  await imagemin(["images/*.jpg"], "build/images", {
    use: [imageminCjpeg()]
  });

  console.log("Images optimized");
})();
```

### Jpegtran

```js
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-mozjpeg").jpegtran;

(async () => {
  await imagemin(["images/*.jpg"], "build/images", {
    use: [imageminJpegtran()]
  });

  console.log("Images optimized");
})();
```

## API

### imageminMozjpeg(options)(buffer)

Returns a `Promise<Buffer>`.

#### Options

##### quality

Type: `number`

Compression quality, in range `0` (worst) to `100` (perfect).

##### progressive

Type: `boolean`
Default: `true`

`false` creates baseline JPEG file.

##### targa

Type: `boolean`
Default: `false`

Input file is Targa format (usually not needed).

##### revert

Type: `boolean`
Default: `false`

Revert to standard defaults instead of mozjpeg defaults.

##### fastCrush

Type: `boolean`
Default: `false`

Disable progressive scan optimization.

##### dcScanOpt

Type: `number`
Default: `1`

Set DC scan optimization mode.

- `0` One scan for all components
- `1` One scan per component
- `2` Optimize between one scan for all components and one scan for 1st component plus one scan for remaining components

##### trellis

Type: `boolean`
Default: `true`

[Trellis optimization](https://en.wikipedia.org/wiki/Trellis_quantization).

##### trellisDC

Type: `boolean`
Default: `true`

Trellis optimization of DC coefficients.

##### tune

Type: `string`
Default: `hvs-psnr`

Set Trellis optimization method. Available methods: `psnr`, `hvs-psnr`, `ssim`, `ms-ssim`

##### overshoot

Type: `boolean`
Default: `true`

Black-on-white deringing via overshoot.

##### arithmetic

Type: `boolean`
Default: `false`

Use [arithmetic coding](https://en.wikipedia.org/wiki/Arithmetic_coding).

##### dct

Type: `string`
Default: `int`

Set [DCT](https://en.wikipedia.org/wiki/Discrete_cosine_transform) method:

- `int` Use integer DCT
- `fast` Use fast integer DCT (less accurate)
- `float` Use floating-point DCT

##### quantBaseline

Type: `boolean`
Default: `false`

Use 8-bit quantization table entries for baseline JPEG compatibility.

##### quantTable

Type: `number`

Use predefined quantization table.

- `0` JPEG Annex K
- `1` Flat
- `2` Custom, tuned for MS-SSIM
- `3` ImageMagick table by N. Robidoux
- `4` Custom, tuned for PSNR-HVS
- `5` Table from paper by Klein, Silverstein and Carney

##### smooth

Type: `number`

Set the strength of smooth dithered input. (1...100)

##### maxMemory

Type: `number`

Set the maximum memory to use in kilobytes.

##### sample

Type: `string[]`

Set component sampling factors. Each item should be in the format `HxV`, for example `2x1`.

#### buffer

Type: `buffer`

Buffer to optimize.

### imageminJpegtran(options)(buffer)

Returns a promise for a buffer.

#### Options

##### revert

Type: `boolean`
Default: `false`

Use default options for `jpegtran` (`mozjpeg` change default options of `jpegtran`).
Example `progressive` option is `true` by default.
Optimize Huffman table is enabled by default (`--optimize` flag).

For more information about default options please run:

```shell
node_modules/.bin/jpegtran --help
```

##### progressive

Type: `boolean`
Default: `true` (`mozjpeg` enable this by default, you can be disable using `revert` option)

Lossless conversion to progressive.

##### arithmetic

Type: `boolean`
Default: `false`

Use [arithmetic coding](http://en.wikipedia.org/wiki/Arithmetic_coding).

#### buffer

Type: `buffer`

Buffer to optimize.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
