# READ

- ```html
  <div style= "display:flex" >
  ```

- [vue render src](https://github.com/vuejs/vue/blob/dev/src/core/instance/render.js)
- [vue next tick](https://github.com/vuejs/vue/blob/dev/src/core/util/next-tick.js)
- [Хуки жизненного цикла Vue.js](https://habr.com/company/mailru/blog/350962/)
- [Building a PDF Viewer with Vue - Part 1](https://rossta.net/blog/building-a-pdf-viewer-with-vue-part-1.html)
- [Building a PDF Viewer with Vue - Part 2](https://rossta.net/blog/building-a-pdf-viewer-with-vue-part-2.html)
- [Building a PDF Viewer with Vue - Part 3](https://rossta.net/blog/extracting-a-data-component-in-vue.html)
- [How To Build Vue Components Like A Pro 😎](https://blog.bitsrc.io/how-to-build-vue-components-like-a-pro-fd89fd4d524d)
- [Understanding Rendering Process with Virtual DOM In Vue.js](https://medium.com/@koheimikami/understanding-rendering-process-with-virtual-dom-in-vue-js-a6e602811782)
- [What’s The Deal With Vue’s Virtual DOM?](https://medium.com/js-dojo/whats-the-deal-with-vue-s-virtual-dom-3ed4fc0dbb20)

- ```javascript
  mounted: function() {
      this.w = this.$refs.iframe.clientWidth  // updated -> rerender
      on:resize = function() {
          this.rerender()
      }
  }
  ```

- Vue magic:
  - ```javascript
    Vue.compile('<div>{{ x }}</div>').render.apply(this, h)
    ```
  - merged vnode attributes: `this.$attrs.x`
