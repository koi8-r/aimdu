export default (e) => {
    const el = e.$el
    // console.warn(el.getBBox())
    let wo = el.offsetWidth
    let wc = el.clientWidth
    let ws = getComputedStyle(el).getPropertyValue("width")
    // let ws = el.currentStyle("width")
    let wr = el.getBoundingClientRect().width
    console.warn([wo, wc, ws, wr])
}
