# Simple-webp

## About
This micro lib replace images with attr `data-webp` to webp image if webp supported.
And if image is loaded — do nothing, else change src to `.webp`.

## Usage

Via Bower

```bash
bower install simple-webp --save
```
or [download the zip](https://github.com/ymatuhin/simple-webp/archive/master.zip).

Put in header

```html
  <script async src="simple-webp.min.js"></script>
```

Wrap your image in noscript with data-webp attribute

```html
  <noscript data-webp><img src="example.jpg" alt=""></noscript>
```

## License

(The MIT License)

Copyright (c) 2015 Yury ymatuhin@yandex.ru

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
