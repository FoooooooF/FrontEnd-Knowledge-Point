# 网页图片加载优化
>（六）图片在渲染前指定大小：因为img元素是内联元素，所以在加载图片后会改变宽高，严重的情况会导致整个页面重排，所以最好在渲染前就指定其大小，或者让其脱离文档流。

根据[Google Page Speed](https://code.google.com/speed/page-speed/docs/rendering.html#SpecifyImageDimensions)，如果通过CSS或HTML指定维度并不重要，只要CSS定位到IMG标记本身而不是父元素：
```
When the browser lays out the page, it needs to be able to flow around replaceable elements such as images. It can begin to render a page even before images are downloaded, provided that it knows the dimensions to wrap non-replaceable elements around. If no dimensions are specified in the containing document, or if the dimensions specified don’t match those of the actual images, the browser will require a reflow and repaint once the images are downloaded. To prevent reflows, specify the width and height of all images, either in the HTML tag, or in CSS.
```
但是，请注意，建议不要使用这些尺寸调整图像大小，即始终使用实际尺寸：
```
Don’t use width and height specifications to scale images on the fly. If an image file is actually 60 x 60 pixels, don’t set the dimensions to 30 x 30 in the HTML or CSS. If the image needs to be smaller, scale it in an image editor and set its dimensions to match (see Optimize images for details.)
```
## 参考
1. [延迟加载图像–完整指南](https://imagekit.io/blog/lazy-loading-images-complete-guide/)
2. [网站性能优化实战——从12.67s到1.06s的故事 :star:](https://juejin.im/post/5b6fa8c86fb9a0099910ac91)