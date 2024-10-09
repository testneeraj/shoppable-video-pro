(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) n(i);
    new MutationObserver(i => {
        for (const r of i)
            if (r.type === "childList")
                for (const o of r.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && n(o)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function e(i) {
        const r = {};
        return i.integrity && (r.integrity = i.integrity), i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? r.credentials = "include" : i.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r
    }

    function n(i) {
        if (i.ep) return;
        i.ep = !0;
        const r = e(i);
        fetch(i.href, r)
    }
})();
var I = "top",
    R = "bottom",
    k = "right",
    P = "left",
    pe = "auto",
    Pt = [I, R, k, P],
    _t = "start",
    Ot = "end",
    nn = "clippingParents",
    ze = "viewport",
    At = "popper",
    rn = "reference",
    Be = Pt.reduce(function(s, t) {
        return s.concat([t + "-" + _t, t + "-" + Ot])
    }, []),
    Ge = [].concat(Pt, [pe]).reduce(function(s, t) {
        return s.concat([t, t + "-" + _t, t + "-" + Ot])
    }, []),
    on = "beforeRead",
    an = "read",
    ln = "afterRead",
    cn = "beforeMain",
    un = "main",
    dn = "afterMain",
    fn = "beforeWrite",
    hn = "write",
    pn = "afterWrite",
    _n = [on, an, ln, cn, un, dn, fn, hn, pn];

function z(s) {
    return s ? (s.nodeName || "").toLowerCase() : null
}

function V(s) {
    if (s == null) return window;
    if (s.toString() !== "[object Window]") {
        var t = s.ownerDocument;
        return t && t.defaultView || window
    }
    return s
}

function mt(s) {
    var t = V(s).Element;
    return s instanceof t || s instanceof Element
}

function H(s) {
    var t = V(s).HTMLElement;
    return s instanceof t || s instanceof HTMLElement
}

function Xe(s) {
    if (typeof ShadowRoot > "u") return !1;
    var t = V(s).ShadowRoot;
    return s instanceof t || s instanceof ShadowRoot
}

function ui(s) {
    var t = s.state;
    Object.keys(t.elements).forEach(function(e) {
        var n = t.styles[e] || {},
            i = t.attributes[e] || {},
            r = t.elements[e];
        !H(r) || !z(r) || (Object.assign(r.style, n), Object.keys(i).forEach(function(o) {
            var a = i[o];
            a === !1 ? r.removeAttribute(o) : r.setAttribute(o, a === !0 ? "" : a)
        }))
    })
}

function di(s) {
    var t = s.state,
        e = {
            popper: {
                position: t.options.strategy,
                left: "0",
                top: "0",
                margin: "0"
            },
            arrow: {
                position: "absolute"
            },
            reference: {}
        };
    return Object.assign(t.elements.popper.style, e.popper), t.styles = e, t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow),
        function() {
            Object.keys(t.elements).forEach(function(n) {
                var i = t.elements[n],
                    r = t.attributes[n] || {},
                    o = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : e[n]),
                    a = o.reduce(function(c, d) {
                        return c[d] = "", c
                    }, {});
                !H(i) || !z(i) || (Object.assign(i.style, a), Object.keys(r).forEach(function(c) {
                    i.removeAttribute(c)
                }))
            })
        }
}
const Qe = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: ui,
    effect: di,
    requires: ["computeStyles"]
};

function U(s) {
    return s.split("-")[0]
}
var pt = Math.max,
    ue = Math.min,
    St = Math.round;

function Fe() {
    var s = navigator.userAgentData;
    return s != null && s.brands && Array.isArray(s.brands) ? s.brands.map(function(t) {
        return t.brand + "/" + t.version
    }).join(" ") : navigator.userAgent
}

function mn() {
    return !/^((?!chrome|android).)*safari/i.test(Fe())
}

function Nt(s, t, e) {
    t === void 0 && (t = !1), e === void 0 && (e = !1);
    var n = s.getBoundingClientRect(),
        i = 1,
        r = 1;
    t && H(s) && (i = s.offsetWidth > 0 && St(n.width) / s.offsetWidth || 1, r = s.offsetHeight > 0 && St(n.height) / s.offsetHeight || 1);
    var o = mt(s) ? V(s) : window,
        a = o.visualViewport,
        c = !mn() && e,
        d = (n.left + (c && a ? a.offsetLeft : 0)) / i,
        u = (n.top + (c && a ? a.offsetTop : 0)) / r,
        E = n.width / i,
        m = n.height / r;
    return {
        width: E,
        height: m,
        top: u,
        right: d + E,
        bottom: u + m,
        left: d,
        x: d,
        y: u
    }
}

function Ze(s) {
    var t = Nt(s),
        e = s.offsetWidth,
        n = s.offsetHeight;
    return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
        x: s.offsetLeft,
        y: s.offsetTop,
        width: e,
        height: n
    }
}

function gn(s, t) {
    var e = t.getRootNode && t.getRootNode();
    if (s.contains(t)) return !0;
    if (e && Xe(e)) {
        var n = t;
        do {
            if (n && s.isSameNode(n)) return !0;
            n = n.parentNode || n.host
        } while (n)
    }
    return !1
}

function Q(s) {
    return V(s).getComputedStyle(s)
}

function fi(s) {
    return ["table", "td", "th"].indexOf(z(s)) >= 0
}

function it(s) {
    return ((mt(s) ? s.ownerDocument : s.document) || window.document).documentElement
}

function _e(s) {
    return z(s) === "html" ? s : s.assignedSlot || s.parentNode || (Xe(s) ? s.host : null) || it(s)
}

function ys(s) {
    return !H(s) || Q(s).position === "fixed" ? null : s.offsetParent
}

function hi(s) {
    var t = /firefox/i.test(Fe()),
        e = /Trident/i.test(Fe());
    if (e && H(s)) {
        var n = Q(s);
        if (n.position === "fixed") return null
    }
    var i = _e(s);
    for (Xe(i) && (i = i.host); H(i) && ["html", "body"].indexOf(z(i)) < 0;) {
        var r = Q(i);
        if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return i;
        i = i.parentNode
    }
    return null
}

function Kt(s) {
    for (var t = V(s), e = ys(s); e && fi(e) && Q(e).position === "static";) e = ys(e);
    return e && (z(e) === "html" || z(e) === "body" && Q(e).position === "static") ? t : e || hi(s) || t
}

function Je(s) {
    return ["top", "bottom"].indexOf(s) >= 0 ? "x" : "y"
}

function Bt(s, t, e) {
    return pt(s, ue(t, e))
}

function pi(s, t, e) {
    var n = Bt(s, t, e);
    return n > e ? e : n
}

function En() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}

function vn(s) {
    return Object.assign({}, En(), s)
}

function bn(s, t) {
    return t.reduce(function(e, n) {
        return e[n] = s, e
    }, {})
}
var _i = function(t, e) {
    return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
        placement: e.placement
    })) : t, vn(typeof t != "number" ? t : bn(t, Pt))
};

function mi(s) {
    var t, e = s.state,
        n = s.name,
        i = s.options,
        r = e.elements.arrow,
        o = e.modifiersData.popperOffsets,
        a = U(e.placement),
        c = Je(a),
        d = [P, k].indexOf(a) >= 0,
        u = d ? "height" : "width";
    if (!(!r || !o)) {
        var E = _i(i.padding, e),
            m = Ze(r),
            h = c === "y" ? I : P,
            g = c === "y" ? R : k,
            f = e.rects.reference[u] + e.rects.reference[c] - o[c] - e.rects.popper[u],
            v = o[c] - e.rects.reference[c],
            b = Kt(r),
            y = b ? c === "y" ? b.clientHeight || 0 : b.clientWidth || 0 : 0,
            A = f / 2 - v / 2,
            p = E[h],
            T = y - m[u] - E[g],
            w = y / 2 - m[u] / 2 + A,
            C = Bt(p, w, T),
            N = c;
        e.modifiersData[n] = (t = {}, t[N] = C, t.centerOffset = C - w, t)
    }
}

function gi(s) {
    var t = s.state,
        e = s.options,
        n = e.element,
        i = n === void 0 ? "[data-popper-arrow]" : n;
    i != null && (typeof i == "string" && (i = t.elements.popper.querySelector(i), !i) || gn(t.elements.popper, i) && (t.elements.arrow = i))
}
const yn = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: mi,
    effect: gi,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
};

function $t(s) {
    return s.split("-")[1]
}
var Ei = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};

function vi(s, t) {
    var e = s.x,
        n = s.y,
        i = t.devicePixelRatio || 1;
    return {
        x: St(e * i) / i || 0,
        y: St(n * i) / i || 0
    }
}

function As(s) {
    var t, e = s.popper,
        n = s.popperRect,
        i = s.placement,
        r = s.variation,
        o = s.offsets,
        a = s.position,
        c = s.gpuAcceleration,
        d = s.adaptive,
        u = s.roundOffsets,
        E = s.isFixed,
        m = o.x,
        h = m === void 0 ? 0 : m,
        g = o.y,
        f = g === void 0 ? 0 : g,
        v = typeof u == "function" ? u({
            x: h,
            y: f
        }) : {
            x: h,
            y: f
        };
    h = v.x, f = v.y;
    var b = o.hasOwnProperty("x"),
        y = o.hasOwnProperty("y"),
        A = P,
        p = I,
        T = window;
    if (d) {
        var w = Kt(e),
            C = "clientHeight",
            N = "clientWidth";
        if (w === V(e) && (w = it(e), Q(w).position !== "static" && a === "absolute" && (C = "scrollHeight", N = "scrollWidth")), w = w, i === I || (i === P || i === k) && r === Ot) {
            p = R;
            var S = E && w === T && T.visualViewport ? T.visualViewport.height : w[C];
            f -= S - n.height, f *= c ? 1 : -1
        }
        if (i === P || (i === I || i === R) && r === Ot) {
            A = k;
            var O = E && w === T && T.visualViewport ? T.visualViewport.width : w[N];
            h -= O - n.width, h *= c ? 1 : -1
        }
    }
    var D = Object.assign({
            position: a
        }, d && Ei),
        j = u === !0 ? vi({
            x: h,
            y: f
        }, V(e)) : {
            x: h,
            y: f
        };
    if (h = j.x, f = j.y, c) {
        var L;
        return Object.assign({}, D, (L = {}, L[p] = y ? "0" : "", L[A] = b ? "0" : "", L.transform = (T.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + f + "px)" : "translate3d(" + h + "px, " + f + "px, 0)", L))
    }
    return Object.assign({}, D, (t = {}, t[p] = y ? f + "px" : "", t[A] = b ? h + "px" : "", t.transform = "", t))
}

function bi(s) {
    var t = s.state,
        e = s.options,
        n = e.gpuAcceleration,
        i = n === void 0 ? !0 : n,
        r = e.adaptive,
        o = r === void 0 ? !0 : r,
        a = e.roundOffsets,
        c = a === void 0 ? !0 : a,
        d = {
            placement: U(t.placement),
            variation: $t(t.placement),
            popper: t.elements.popper,
            popperRect: t.rects.popper,
            gpuAcceleration: i,
            isFixed: t.options.strategy === "fixed"
        };
    t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, As(Object.assign({}, d, {
        offsets: t.modifiersData.popperOffsets,
        position: t.options.strategy,
        adaptive: o,
        roundOffsets: c
    })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, As(Object.assign({}, d, {
        offsets: t.modifiersData.arrow,
        position: "absolute",
        adaptive: !1,
        roundOffsets: c
    })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-placement": t.placement
    })
}
const ts = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: bi,
    data: {}
};
var te = {
    passive: !0
};

function yi(s) {
    var t = s.state,
        e = s.instance,
        n = s.options,
        i = n.scroll,
        r = i === void 0 ? !0 : i,
        o = n.resize,
        a = o === void 0 ? !0 : o,
        c = V(t.elements.popper),
        d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return r && d.forEach(function(u) {
        u.addEventListener("scroll", e.update, te)
    }), a && c.addEventListener("resize", e.update, te),
        function() {
            r && d.forEach(function(u) {
                u.removeEventListener("scroll", e.update, te)
            }), a && c.removeEventListener("resize", e.update, te)
        }
}
const es = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function() {},
    effect: yi,
    data: {}
};
var Ai = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
};

function ae(s) {
    return s.replace(/left|right|bottom|top/g, function(t) {
        return Ai[t]
    })
}
var Ti = {
    start: "end",
    end: "start"
};

function Ts(s) {
    return s.replace(/start|end/g, function(t) {
        return Ti[t]
    })
}

function ss(s) {
    var t = V(s),
        e = t.pageXOffset,
        n = t.pageYOffset;
    return {
        scrollLeft: e,
        scrollTop: n
    }
}

function ns(s) {
    return Nt(it(s)).left + ss(s).scrollLeft
}

function wi(s, t) {
    var e = V(s),
        n = it(s),
        i = e.visualViewport,
        r = n.clientWidth,
        o = n.clientHeight,
        a = 0,
        c = 0;
    if (i) {
        r = i.width, o = i.height;
        var d = mn();
        (d || !d && t === "fixed") && (a = i.offsetLeft, c = i.offsetTop)
    }
    return {
        width: r,
        height: o,
        x: a + ns(s),
        y: c
    }
}

function Ci(s) {
    var t, e = it(s),
        n = ss(s),
        i = (t = s.ownerDocument) == null ? void 0 : t.body,
        r = pt(e.scrollWidth, e.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
        o = pt(e.scrollHeight, e.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
        a = -n.scrollLeft + ns(s),
        c = -n.scrollTop;
    return Q(i || e).direction === "rtl" && (a += pt(e.clientWidth, i ? i.clientWidth : 0) - r), {
        width: r,
        height: o,
        x: a,
        y: c
    }
}

function is(s) {
    var t = Q(s),
        e = t.overflow,
        n = t.overflowX,
        i = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(e + i + n)
}

function An(s) {
    return ["html", "body", "#document"].indexOf(z(s)) >= 0 ? s.ownerDocument.body : H(s) && is(s) ? s : An(_e(s))
}

function Ft(s, t) {
    var e;
    t === void 0 && (t = []);
    var n = An(s),
        i = n === ((e = s.ownerDocument) == null ? void 0 : e.body),
        r = V(n),
        o = i ? [r].concat(r.visualViewport || [], is(n) ? n : []) : n,
        a = t.concat(o);
    return i ? a : a.concat(Ft(_e(o)))
}

function je(s) {
    return Object.assign({}, s, {
        left: s.x,
        top: s.y,
        right: s.x + s.width,
        bottom: s.y + s.height
    })
}

function Oi(s, t) {
    var e = Nt(s, !1, t === "fixed");
    return e.top = e.top + s.clientTop, e.left = e.left + s.clientLeft, e.bottom = e.top + s.clientHeight, e.right = e.left + s.clientWidth, e.width = s.clientWidth, e.height = s.clientHeight, e.x = e.left, e.y = e.top, e
}

function ws(s, t, e) {
    return t === ze ? je(wi(s, e)) : mt(t) ? Oi(t, e) : je(Ci(it(s)))
}

function Si(s) {
    var t = Ft(_e(s)),
        e = ["absolute", "fixed"].indexOf(Q(s).position) >= 0,
        n = e && H(s) ? Kt(s) : s;
    return mt(n) ? t.filter(function(i) {
        return mt(i) && gn(i, n) && z(i) !== "body"
    }) : []
}

function Ni(s, t, e, n) {
    var i = t === "clippingParents" ? Si(s) : [].concat(t),
        r = [].concat(i, [e]),
        o = r[0],
        a = r.reduce(function(c, d) {
            var u = ws(s, d, n);
            return c.top = pt(u.top, c.top), c.right = ue(u.right, c.right), c.bottom = ue(u.bottom, c.bottom), c.left = pt(u.left, c.left), c
        }, ws(s, o, n));
    return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a
}

function Tn(s) {
    var t = s.reference,
        e = s.element,
        n = s.placement,
        i = n ? U(n) : null,
        r = n ? $t(n) : null,
        o = t.x + t.width / 2 - e.width / 2,
        a = t.y + t.height / 2 - e.height / 2,
        c;
    switch (i) {
        case I:
            c = {
                x: o,
                y: t.y - e.height
            };
            break;
        case R:
            c = {
                x: o,
                y: t.y + t.height
            };
            break;
        case k:
            c = {
                x: t.x + t.width,
                y: a
            };
            break;
        case P:
            c = {
                x: t.x - e.width,
                y: a
            };
            break;
        default:
            c = {
                x: t.x,
                y: t.y
            }
    }
    var d = i ? Je(i) : null;
    if (d != null) {
        var u = d === "y" ? "height" : "width";
        switch (r) {
            case _t:
                c[d] = c[d] - (t[u] / 2 - e[u] / 2);
                break;
            case Ot:
                c[d] = c[d] + (t[u] / 2 - e[u] / 2);
                break
        }
    }
    return c
}

function Dt(s, t) {
    t === void 0 && (t = {});
    var e = t,
        n = e.placement,
        i = n === void 0 ? s.placement : n,
        r = e.strategy,
        o = r === void 0 ? s.strategy : r,
        a = e.boundary,
        c = a === void 0 ? nn : a,
        d = e.rootBoundary,
        u = d === void 0 ? ze : d,
        E = e.elementContext,
        m = E === void 0 ? At : E,
        h = e.altBoundary,
        g = h === void 0 ? !1 : h,
        f = e.padding,
        v = f === void 0 ? 0 : f,
        b = vn(typeof v != "number" ? v : bn(v, Pt)),
        y = m === At ? rn : At,
        A = s.rects.popper,
        p = s.elements[g ? y : m],
        T = Ni(mt(p) ? p : p.contextElement || it(s.elements.popper), c, u, o),
        w = Nt(s.elements.reference),
        C = Tn({
            reference: w,
            element: A,
            strategy: "absolute",
            placement: i
        }),
        N = je(Object.assign({}, A, C)),
        S = m === At ? N : w,
        O = {
            top: T.top - S.top + b.top,
            bottom: S.bottom - T.bottom + b.bottom,
            left: T.left - S.left + b.left,
            right: S.right - T.right + b.right
        },
        D = s.modifiersData.offset;
    if (m === At && D) {
        var j = D[i];
        Object.keys(O).forEach(function(L) {
            var at = [k, R].indexOf(L) >= 0 ? 1 : -1,
                lt = [I, R].indexOf(L) >= 0 ? "y" : "x";
            O[L] += j[lt] * at
        })
    }
    return O
}

function $i(s, t) {
    t === void 0 && (t = {});
    var e = t,
        n = e.placement,
        i = e.boundary,
        r = e.rootBoundary,
        o = e.padding,
        a = e.flipVariations,
        c = e.allowedAutoPlacements,
        d = c === void 0 ? Ge : c,
        u = $t(n),
        E = u ? a ? Be : Be.filter(function(g) {
            return $t(g) === u
        }) : Pt,
        m = E.filter(function(g) {
            return d.indexOf(g) >= 0
        });
    m.length === 0 && (m = E);
    var h = m.reduce(function(g, f) {
        return g[f] = Dt(s, {
            placement: f,
            boundary: i,
            rootBoundary: r,
            padding: o
        })[U(f)], g
    }, {});
    return Object.keys(h).sort(function(g, f) {
        return h[g] - h[f]
    })
}

function Di(s) {
    if (U(s) === pe) return [];
    var t = ae(s);
    return [Ts(s), t, Ts(t)]
}

function Li(s) {
    var t = s.state,
        e = s.options,
        n = s.name;
    if (!t.modifiersData[n]._skip) {
        for (var i = e.mainAxis, r = i === void 0 ? !0 : i, o = e.altAxis, a = o === void 0 ? !0 : o, c = e.fallbackPlacements, d = e.padding, u = e.boundary, E = e.rootBoundary, m = e.altBoundary, h = e.flipVariations, g = h === void 0 ? !0 : h, f = e.allowedAutoPlacements, v = t.options.placement, b = U(v), y = b === v, A = c || (y || !g ? [ae(v)] : Di(v)), p = [v].concat(A).reduce(function(vt, J) {
            return vt.concat(U(J) === pe ? $i(t, {
                placement: J,
                boundary: u,
                rootBoundary: E,
                padding: d,
                flipVariations: g,
                allowedAutoPlacements: f
            }) : J)
        }, []), T = t.rects.reference, w = t.rects.popper, C = new Map, N = !0, S = p[0], O = 0; O < p.length; O++) {
            var D = p[O],
                j = U(D),
                L = $t(D) === _t,
                at = [I, R].indexOf(j) >= 0,
                lt = at ? "width" : "height",
                M = Dt(t, {
                    placement: D,
                    boundary: u,
                    rootBoundary: E,
                    altBoundary: m,
                    padding: d
                }),
                K = at ? L ? k : P : L ? R : I;
            T[lt] > w[lt] && (K = ae(K));
            var Gt = ae(K),
                ct = [];
            if (r && ct.push(M[j] <= 0), a && ct.push(M[K] <= 0, M[Gt] <= 0), ct.every(function(vt) {
                return vt
            })) {
                S = D, N = !1;
                break
            }
            C.set(D, ct)
        }
        if (N)
            for (var Xt = g ? 3 : 1, Ae = function(J) {
                var Vt = p.find(function(Zt) {
                    var ut = C.get(Zt);
                    if (ut) return ut.slice(0, J).every(function(Te) {
                        return Te
                    })
                });
                if (Vt) return S = Vt, "break"
            }, kt = Xt; kt > 0; kt--) {
                var Qt = Ae(kt);
                if (Qt === "break") break
            }
        t.placement !== S && (t.modifiersData[n]._skip = !0, t.placement = S, t.reset = !0)
    }
}
const wn = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: Li,
    requiresIfExists: ["offset"],
    data: {
        _skip: !1
    }
};

function Cs(s, t, e) {
    return e === void 0 && (e = {
        x: 0,
        y: 0
    }), {
        top: s.top - t.height - e.y,
        right: s.right - t.width + e.x,
        bottom: s.bottom - t.height + e.y,
        left: s.left - t.width - e.x
    }
}

function Os(s) {
    return [I, k, R, P].some(function(t) {
        return s[t] >= 0
    })
}

function Ii(s) {
    var t = s.state,
        e = s.name,
        n = t.rects.reference,
        i = t.rects.popper,
        r = t.modifiersData.preventOverflow,
        o = Dt(t, {
            elementContext: "reference"
        }),
        a = Dt(t, {
            altBoundary: !0
        }),
        c = Cs(o, n),
        d = Cs(a, i, r),
        u = Os(c),
        E = Os(d);
    t.modifiersData[e] = {
        referenceClippingOffsets: c,
        popperEscapeOffsets: d,
        isReferenceHidden: u,
        hasPopperEscaped: E
    }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
        "data-popper-reference-hidden": u,
        "data-popper-escaped": E
    })
}
const Cn = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: Ii
};

function Pi(s, t, e) {
    var n = U(s),
        i = [P, I].indexOf(n) >= 0 ? -1 : 1,
        r = typeof e == "function" ? e(Object.assign({}, t, {
            placement: s
        })) : e,
        o = r[0],
        a = r[1];
    return o = o || 0, a = (a || 0) * i, [P, k].indexOf(n) >= 0 ? {
        x: a,
        y: o
    } : {
        x: o,
        y: a
    }
}

function xi(s) {
    var t = s.state,
        e = s.options,
        n = s.name,
        i = e.offset,
        r = i === void 0 ? [0, 0] : i,
        o = Ge.reduce(function(u, E) {
            return u[E] = Pi(E, t.rects, r), u
        }, {}),
        a = o[t.placement],
        c = a.x,
        d = a.y;
    t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += d), t.modifiersData[n] = o
}
const On = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: xi
};

function Mi(s) {
    var t = s.state,
        e = s.name;
    t.modifiersData[e] = Tn({
        reference: t.rects.reference,
        element: t.rects.popper,
        strategy: "absolute",
        placement: t.placement
    })
}
const rs = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: Mi,
    data: {}
};

function Ri(s) {
    return s === "x" ? "y" : "x"
}

function ki(s) {
    var t = s.state,
        e = s.options,
        n = s.name,
        i = e.mainAxis,
        r = i === void 0 ? !0 : i,
        o = e.altAxis,
        a = o === void 0 ? !1 : o,
        c = e.boundary,
        d = e.rootBoundary,
        u = e.altBoundary,
        E = e.padding,
        m = e.tether,
        h = m === void 0 ? !0 : m,
        g = e.tetherOffset,
        f = g === void 0 ? 0 : g,
        v = Dt(t, {
            boundary: c,
            rootBoundary: d,
            padding: E,
            altBoundary: u
        }),
        b = U(t.placement),
        y = $t(t.placement),
        A = !y,
        p = Je(b),
        T = Ri(p),
        w = t.modifiersData.popperOffsets,
        C = t.rects.reference,
        N = t.rects.popper,
        S = typeof f == "function" ? f(Object.assign({}, t.rects, {
            placement: t.placement
        })) : f,
        O = typeof S == "number" ? {
            mainAxis: S,
            altAxis: S
        } : Object.assign({
            mainAxis: 0,
            altAxis: 0
        }, S),
        D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        j = {
            x: 0,
            y: 0
        };
    if (w) {
        if (r) {
            var L, at = p === "y" ? I : P,
                lt = p === "y" ? R : k,
                M = p === "y" ? "height" : "width",
                K = w[p],
                Gt = K + v[at],
                ct = K - v[lt],
                Xt = h ? -N[M] / 2 : 0,
                Ae = y === _t ? C[M] : N[M],
                kt = y === _t ? -N[M] : -C[M],
                Qt = t.elements.arrow,
                vt = h && Qt ? Ze(Qt) : {
                    width: 0,
                    height: 0
                },
                J = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : En(),
                Vt = J[at],
                Zt = J[lt],
                ut = Bt(0, C[M], vt[M]),
                Te = A ? C[M] / 2 - Xt - ut - Vt - O.mainAxis : Ae - ut - Vt - O.mainAxis,
                ii = A ? -C[M] / 2 + Xt + ut + Zt + O.mainAxis : kt + ut + Zt + O.mainAxis,
                we = t.elements.arrow && Kt(t.elements.arrow),
                ri = we ? p === "y" ? we.clientTop || 0 : we.clientLeft || 0 : 0,
                fs = (L = D == null ? void 0 : D[p]) != null ? L : 0,
                oi = K + Te - fs - ri,
                ai = K + ii - fs,
                hs = Bt(h ? ue(Gt, oi) : Gt, K, h ? pt(ct, ai) : ct);
            w[p] = hs, j[p] = hs - K
        }
        if (a) {
            var ps, li = p === "x" ? I : P,
                ci = p === "x" ? R : k,
                dt = w[T],
                Jt = T === "y" ? "height" : "width",
                _s = dt + v[li],
                ms = dt - v[ci],
                Ce = [I, P].indexOf(b) !== -1,
                gs = (ps = D == null ? void 0 : D[T]) != null ? ps : 0,
                Es = Ce ? _s : dt - C[Jt] - N[Jt] - gs + O.altAxis,
                vs = Ce ? dt + C[Jt] + N[Jt] - gs - O.altAxis : ms,
                bs = h && Ce ? pi(Es, dt, vs) : Bt(h ? Es : _s, dt, h ? vs : ms);
            w[T] = bs, j[T] = bs - dt
        }
        t.modifiersData[n] = j
    }
}
const Sn = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: ki,
    requiresIfExists: ["offset"]
};

function Vi(s) {
    return {
        scrollLeft: s.scrollLeft,
        scrollTop: s.scrollTop
    }
}

function Hi(s) {
    return s === V(s) || !H(s) ? ss(s) : Vi(s)
}

function Wi(s) {
    var t = s.getBoundingClientRect(),
        e = St(t.width) / s.offsetWidth || 1,
        n = St(t.height) / s.offsetHeight || 1;
    return e !== 1 || n !== 1
}

function Bi(s, t, e) {
    e === void 0 && (e = !1);
    var n = H(t),
        i = H(t) && Wi(t),
        r = it(t),
        o = Nt(s, i, e),
        a = {
            scrollLeft: 0,
            scrollTop: 0
        },
        c = {
            x: 0,
            y: 0
        };
    return (n || !n && !e) && ((z(t) !== "body" || is(r)) && (a = Hi(t)), H(t) ? (c = Nt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : r && (c.x = ns(r))), {
        x: o.left + a.scrollLeft - c.x,
        y: o.top + a.scrollTop - c.y,
        width: o.width,
        height: o.height
    }
}

function Fi(s) {
    var t = new Map,
        e = new Set,
        n = [];
    s.forEach(function(r) {
        t.set(r.name, r)
    });

    function i(r) {
        e.add(r.name);
        var o = [].concat(r.requires || [], r.requiresIfExists || []);
        o.forEach(function(a) {
            if (!e.has(a)) {
                var c = t.get(a);
                c && i(c)
            }
        }), n.push(r)
    }
    return s.forEach(function(r) {
        e.has(r.name) || i(r)
    }), n
}

function ji(s) {
    var t = Fi(s);
    return _n.reduce(function(e, n) {
        return e.concat(t.filter(function(i) {
            return i.phase === n
        }))
    }, [])
}

function Ki(s) {
    var t;
    return function() {
        return t || (t = new Promise(function(e) {
            Promise.resolve().then(function() {
                t = void 0, e(s())
            })
        })), t
    }
}

function Yi(s) {
    var t = s.reduce(function(e, n) {
        var i = e[n.name];
        return e[n.name] = i ? Object.assign({}, i, n, {
            options: Object.assign({}, i.options, n.options),
            data: Object.assign({}, i.data, n.data)
        }) : n, e
    }, {});
    return Object.keys(t).map(function(e) {
        return t[e]
    })
}
var Ss = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};

function Ns() {
    for (var s = arguments.length, t = new Array(s), e = 0; e < s; e++) t[e] = arguments[e];
    return !t.some(function(n) {
        return !(n && typeof n.getBoundingClientRect == "function")
    })
}

function me(s) {
    s === void 0 && (s = {});
    var t = s,
        e = t.defaultModifiers,
        n = e === void 0 ? [] : e,
        i = t.defaultOptions,
        r = i === void 0 ? Ss : i;
    return function(a, c, d) {
        d === void 0 && (d = r);
        var u = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, Ss, r),
                modifiersData: {},
                elements: {
                    reference: a,
                    popper: c
                },
                attributes: {},
                styles: {}
            },
            E = [],
            m = !1,
            h = {
                state: u,
                setOptions: function(b) {
                    var y = typeof b == "function" ? b(u.options) : b;
                    f(), u.options = Object.assign({}, r, u.options, y), u.scrollParents = {
                        reference: mt(a) ? Ft(a) : a.contextElement ? Ft(a.contextElement) : [],
                        popper: Ft(c)
                    };
                    var A = ji(Yi([].concat(n, u.options.modifiers)));
                    return u.orderedModifiers = A.filter(function(p) {
                        return p.enabled
                    }), g(), h.update()
                },
                forceUpdate: function() {
                    if (!m) {
                        var b = u.elements,
                            y = b.reference,
                            A = b.popper;
                        if (Ns(y, A)) {
                            u.rects = {
                                reference: Bi(y, Kt(A), u.options.strategy === "fixed"),
                                popper: Ze(A)
                            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(O) {
                                return u.modifiersData[O.name] = Object.assign({}, O.data)
                            });
                            for (var p = 0; p < u.orderedModifiers.length; p++) {
                                if (u.reset === !0) {
                                    u.reset = !1, p = -1;
                                    continue
                                }
                                var T = u.orderedModifiers[p],
                                    w = T.fn,
                                    C = T.options,
                                    N = C === void 0 ? {} : C,
                                    S = T.name;
                                typeof w == "function" && (u = w({
                                    state: u,
                                    options: N,
                                    name: S,
                                    instance: h
                                }) || u)
                            }
                        }
                    }
                },
                update: Ki(function() {
                    return new Promise(function(v) {
                        h.forceUpdate(), v(u)
                    })
                }),
                destroy: function() {
                    f(), m = !0
                }
            };
        if (!Ns(a, c)) return h;
        h.setOptions(d).then(function(v) {
            !m && d.onFirstUpdate && d.onFirstUpdate(v)
        });

        function g() {
            u.orderedModifiers.forEach(function(v) {
                var b = v.name,
                    y = v.options,
                    A = y === void 0 ? {} : y,
                    p = v.effect;
                if (typeof p == "function") {
                    var T = p({
                            state: u,
                            name: b,
                            instance: h,
                            options: A
                        }),
                        w = function() {};
                    E.push(T || w)
                }
            })
        }

        function f() {
            E.forEach(function(v) {
                return v()
            }), E = []
        }
        return h
    }
}
var Ui = me(),
    qi = [es, rs, ts, Qe],
    zi = me({
        defaultModifiers: qi
    }),
    Gi = [es, rs, ts, Qe, On, wn, Sn, yn, Cn],
    os = me({
        defaultModifiers: Gi
    });
const Nn = Object.freeze(Object.defineProperty({
    __proto__: null,
    afterMain: dn,
    afterRead: ln,
    afterWrite: pn,
    applyStyles: Qe,
    arrow: yn,
    auto: pe,
    basePlacements: Pt,
    beforeMain: cn,
    beforeRead: on,
    beforeWrite: fn,
    bottom: R,
    clippingParents: nn,
    computeStyles: ts,
    createPopper: os,
    createPopperBase: Ui,
    createPopperLite: zi,
    detectOverflow: Dt,
    end: Ot,
    eventListeners: es,
    flip: wn,
    hide: Cn,
    left: P,
    main: un,
    modifierPhases: _n,
    offset: On,
    placements: Ge,
    popper: At,
    popperGenerator: me,
    popperOffsets: rs,
    preventOverflow: Sn,
    read: an,
    reference: rn,
    right: k,
    start: _t,
    top: I,
    variationPlacements: Be,
    viewport: ze,
    write: hn
}, Symbol.toStringTag, {
    value: "Module"
}));
/*!
 * Bootstrap v5.3.2 (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
const tt = new Map,
    Oe = {
        set(s, t, e) {
            tt.has(s) || tt.set(s, new Map);
            const n = tt.get(s);
            if (!n.has(t) && n.size !== 0) {
                console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n.keys())[0]}.`);
                return
            }
            n.set(t, e)
        },
        get(s, t) {
            return tt.has(s) && tt.get(s).get(t) || null
        },
        remove(s, t) {
            if (!tt.has(s)) return;
            const e = tt.get(s);
            e.delete(t), e.size === 0 && tt.delete(s)
        }
    },
    Xi = 1e6,
    Qi = 1e3,
    Ke = "transitionend",
    $n = s => (s && window.CSS && window.CSS.escape && (s = s.replace(/#([^\s"#']+)/g, (t, e) => `#${CSS.escape(e)}`)), s),
    Zi = s => s == null ? `${s}` : Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase(),
    Ji = s => {
        do s += Math.floor(Math.random() * Xi); while (document.getElementById(s));
        return s
    },
    tr = s => {
        if (!s) return 0;
        let {
            transitionDuration: t,
            transitionDelay: e
        } = window.getComputedStyle(s);
        const n = Number.parseFloat(t),
            i = Number.parseFloat(e);
        return !n && !i ? 0 : (t = t.split(",")[0], e = e.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(e)) * Qi)
    },
    Dn = s => {
        s.dispatchEvent(new Event(Ke))
    },
    G = s => !s || typeof s != "object" ? !1 : (typeof s.jquery < "u" && (s = s[0]), typeof s.nodeType < "u"),
    et = s => G(s) ? s.jquery ? s[0] : s : typeof s == "string" && s.length > 0 ? document.querySelector($n(s)) : null,
    xt = s => {
        if (!G(s) || s.getClientRects().length === 0) return !1;
        const t = getComputedStyle(s).getPropertyValue("visibility") === "visible",
            e = s.closest("details:not([open])");
        if (!e) return t;
        if (e !== s) {
            const n = s.closest("summary");
            if (n && n.parentNode !== e || n === null) return !1
        }
        return t
    },
    st = s => !s || s.nodeType !== Node.ELEMENT_NODE || s.classList.contains("disabled") ? !0 : typeof s.disabled < "u" ? s.disabled : s.hasAttribute("disabled") && s.getAttribute("disabled") !== "false",
    Ln = s => {
        if (!document.documentElement.attachShadow) return null;
        if (typeof s.getRootNode == "function") {
            const t = s.getRootNode();
            return t instanceof ShadowRoot ? t : null
        }
        return s instanceof ShadowRoot ? s : s.parentNode ? Ln(s.parentNode) : null
    },
    de = () => {},
    Yt = s => {
        s.offsetHeight
    },
    In = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null,
    Se = [],
    er = s => {
        document.readyState === "loading" ? (Se.length || document.addEventListener("DOMContentLoaded", () => {
            for (const t of Se) t()
        }), Se.push(s)) : s()
    },
    W = () => document.documentElement.dir === "rtl",
    F = s => {
        er(() => {
            const t = In();
            if (t) {
                const e = s.NAME,
                    n = t.fn[e];
                t.fn[e] = s.jQueryInterface, t.fn[e].Constructor = s, t.fn[e].noConflict = () => (t.fn[e] = n, s.jQueryInterface)
            }
        })
    },
    x = (s, t = [], e = s) => typeof s == "function" ? s(...t) : e,
    Pn = (s, t, e = !0) => {
        if (!e) {
            x(s);
            return
        }
        const n = 5,
            i = tr(t) + n;
        let r = !1;
        const o = ({
                       target: a
                   }) => {
            a === t && (r = !0, t.removeEventListener(Ke, o), x(s))
        };
        t.addEventListener(Ke, o), setTimeout(() => {
            r || Dn(t)
        }, i)
    },
    as = (s, t, e, n) => {
        const i = s.length;
        let r = s.indexOf(t);
        return r === -1 ? !e && n ? s[i - 1] : s[0] : (r += e ? 1 : -1, n && (r = (r + i) % i), s[Math.max(0, Math.min(r, i - 1))])
    },
    sr = /[^.]*(?=\..*)\.|.*/,
    nr = /\..*/,
    ir = /::\d+$/,
    Ne = {};
let $s = 1;
const xn = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    },
    rr = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

function Mn(s, t) {
    return t && `${t}::${$s++}` || s.uidEvent || $s++
}

function Rn(s) {
    const t = Mn(s);
    return s.uidEvent = t, Ne[t] = Ne[t] || {}, Ne[t]
}

function or(s, t) {
    return function e(n) {
        return ls(n, {
            delegateTarget: s
        }), e.oneOff && l.off(s, n.type, t), t.apply(s, [n])
    }
}

function ar(s, t, e) {
    return function n(i) {
        const r = s.querySelectorAll(t);
        for (let {
            target: o
        } = i; o && o !== this; o = o.parentNode)
            for (const a of r)
                if (a === o) return ls(i, {
                    delegateTarget: o
                }), n.oneOff && l.off(s, i.type, t, e), e.apply(o, [i])
    }
}

function kn(s, t, e = null) {
    return Object.values(s).find(n => n.callable === t && n.delegationSelector === e)
}

function Vn(s, t, e) {
    const n = typeof t == "string",
        i = n ? e : t || e;
    let r = Hn(s);
    return rr.has(r) || (r = s), [n, i, r]
}

function Ds(s, t, e, n, i) {
    if (typeof t != "string" || !s) return;
    let [r, o, a] = Vn(t, e, n);
    t in xn && (o = (g => function(f) {
        if (!f.relatedTarget || f.relatedTarget !== f.delegateTarget && !f.delegateTarget.contains(f.relatedTarget)) return g.call(this, f)
    })(o));
    const c = Rn(s),
        d = c[a] || (c[a] = {}),
        u = kn(d, o, r ? e : null);
    if (u) {
        u.oneOff = u.oneOff && i;
        return
    }
    const E = Mn(o, t.replace(sr, "")),
        m = r ? ar(s, e, o) : or(s, o);
    m.delegationSelector = r ? e : null, m.callable = o, m.oneOff = i, m.uidEvent = E, d[E] = m, s.addEventListener(a, m, r)
}

function Ye(s, t, e, n, i) {
    const r = kn(t[e], n, i);
    r && (s.removeEventListener(e, r, !!i), delete t[e][r.uidEvent])
}

function lr(s, t, e, n) {
    const i = t[e] || {};
    for (const [r, o] of Object.entries(i)) r.includes(n) && Ye(s, t, e, o.callable, o.delegationSelector)
}

function Hn(s) {
    return s = s.replace(nr, ""), xn[s] || s
}
const l = {
    on(s, t, e, n) {
        Ds(s, t, e, n, !1)
    },
    one(s, t, e, n) {
        Ds(s, t, e, n, !0)
    },
    off(s, t, e, n) {
        if (typeof t != "string" || !s) return;
        const [i, r, o] = Vn(t, e, n), a = o !== t, c = Rn(s), d = c[o] || {}, u = t.startsWith(".");
        if (typeof r < "u") {
            if (!Object.keys(d).length) return;
            Ye(s, c, o, r, i ? e : null);
            return
        }
        if (u)
            for (const E of Object.keys(c)) lr(s, c, E, t.slice(1));
        for (const [E, m] of Object.entries(d)) {
            const h = E.replace(ir, "");
            (!a || t.includes(h)) && Ye(s, c, o, m.callable, m.delegationSelector)
        }
    },
    trigger(s, t, e) {
        if (typeof t != "string" || !s) return null;
        const n = In(),
            i = Hn(t),
            r = t !== i;
        let o = null,
            a = !0,
            c = !0,
            d = !1;
        r && n && (o = n.Event(t, e), n(s).trigger(o), a = !o.isPropagationStopped(), c = !o.isImmediatePropagationStopped(), d = o.isDefaultPrevented());
        const u = ls(new Event(t, {
            bubbles: a,
            cancelable: !0
        }), e);
        return d && u.preventDefault(), c && s.dispatchEvent(u), u.defaultPrevented && o && o.preventDefault(), u
    }
};

function ls(s, t = {}) {
    for (const [e, n] of Object.entries(t)) try {
        s[e] = n
    } catch {
        Object.defineProperty(s, e, {
            configurable: !0,
            get() {
                return n
            }
        })
    }
    return s
}

function Ls(s) {
    if (s === "true") return !0;
    if (s === "false") return !1;
    if (s === Number(s).toString()) return Number(s);
    if (s === "" || s === "null") return null;
    if (typeof s != "string") return s;
    try {
        return JSON.parse(decodeURIComponent(s))
    } catch {
        return s
    }
}

function $e(s) {
    return s.replace(/[A-Z]/g, t => `-${t.toLowerCase()}`)
}
const X = {
    setDataAttribute(s, t, e) {
        s.setAttribute(`data-bs-${$e(t)}`, e)
    },
    removeDataAttribute(s, t) {
        s.removeAttribute(`data-bs-${$e(t)}`)
    },
    getDataAttributes(s) {
        if (!s) return {};
        const t = {},
            e = Object.keys(s.dataset).filter(n => n.startsWith("bs") && !n.startsWith("bsConfig"));
        for (const n of e) {
            let i = n.replace(/^bs/, "");
            i = i.charAt(0).toLowerCase() + i.slice(1, i.length), t[i] = Ls(s.dataset[n])
        }
        return t
    },
    getDataAttribute(s, t) {
        return Ls(s.getAttribute(`data-bs-${$e(t)}`))
    }
};
class Ut {
    static get Default() {
        return {}
    }
    static get DefaultType() {
        return {}
    }
    static get NAME() {
        throw new Error('You have to implement the static method "NAME", for each component!')
    }
    _getConfig(t) {
        return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
    }
    _configAfterMerge(t) {
        return t
    }
    _mergeConfigObj(t, e) {
        const n = G(e) ? X.getDataAttribute(e, "config") : {};
        return {
            ...this.constructor.Default,
            ...typeof n == "object" ? n : {},
            ...G(e) ? X.getDataAttributes(e) : {},
            ...typeof t == "object" ? t : {}
        }
    }
    _typeCheckConfig(t, e = this.constructor.DefaultType) {
        for (const [n, i] of Object.entries(e)) {
            const r = t[n],
                o = G(r) ? "element" : Zi(r);
            if (!new RegExp(i).test(o)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${o}" but expected type "${i}".`)
        }
    }
}
const cr = "5.3.2";
class Y extends Ut {
    constructor(t, e) {
        super(), t = et(t), t && (this._element = t, this._config = this._getConfig(e), Oe.set(this._element, this.constructor.DATA_KEY, this))
    }
    dispose() {
        Oe.remove(this._element, this.constructor.DATA_KEY), l.off(this._element, this.constructor.EVENT_KEY);
        for (const t of Object.getOwnPropertyNames(this)) this[t] = null
    }
    _queueCallback(t, e, n = !0) {
        Pn(t, e, n)
    }
    _getConfig(t) {
        return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
    }
    static getInstance(t) {
        return Oe.get(et(t), this.DATA_KEY)
    }
    static getOrCreateInstance(t, e = {}) {
        return this.getInstance(t) || new this(t, typeof e == "object" ? e : null)
    }
    static get VERSION() {
        return cr
    }
    static get DATA_KEY() {
        return `bs.${this.NAME}`
    }
    static get EVENT_KEY() {
        return `.${this.DATA_KEY}`
    }
    static eventName(t) {
        return `${t}${this.EVENT_KEY}`
    }
}
const De = s => {
        let t = s.getAttribute("data-bs-target");
        if (!t || t === "#") {
            let e = s.getAttribute("href");
            if (!e || !e.includes("#") && !e.startsWith(".")) return null;
            e.includes("#") && !e.startsWith("#") && (e = `#${e.split("#")[1]}`), t = e && e !== "#" ? $n(e.trim()) : null
        }
        return t
    },
    _ = {
        find(s, t = document.documentElement) {
            return [].concat(...Element.prototype.querySelectorAll.call(t, s))
        },
        findOne(s, t = document.documentElement) {
            return Element.prototype.querySelector.call(t, s)
        },
        children(s, t) {
            return [].concat(...s.children).filter(e => e.matches(t))
        },
        parents(s, t) {
            const e = [];
            let n = s.parentNode.closest(t);
            for (; n;) e.push(n), n = n.parentNode.closest(t);
            return e
        },
        prev(s, t) {
            let e = s.previousElementSibling;
            for (; e;) {
                if (e.matches(t)) return [e];
                e = e.previousElementSibling
            }
            return []
        },
        next(s, t) {
            let e = s.nextElementSibling;
            for (; e;) {
                if (e.matches(t)) return [e];
                e = e.nextElementSibling
            }
            return []
        },
        focusableChildren(s) {
            const t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(e => `${e}:not([tabindex^="-"])`).join(",");
            return this.find(t, s).filter(e => !st(e) && xt(e))
        },
        getSelectorFromElement(s) {
            const t = De(s);
            return t && _.findOne(t) ? t : null
        },
        getElementFromSelector(s) {
            const t = De(s);
            return t ? _.findOne(t) : null
        },
        getMultipleElementsFromSelector(s) {
            const t = De(s);
            return t ? _.find(t) : []
        }
    },
    ge = (s, t = "hide") => {
        const e = `click.dismiss${s.EVENT_KEY}`,
            n = s.NAME;
        l.on(document, e, `[data-bs-dismiss="${n}"]`, function(i) {
            if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), st(this)) return;
            const r = _.getElementFromSelector(this) || this.closest(`.${n}`);
            s.getOrCreateInstance(r)[t]()
        })
    },
    ur = "alert",
    dr = "bs.alert",
    Wn = `.${dr}`,
    fr = `close${Wn}`,
    hr = `closed${Wn}`,
    pr = "fade",
    _r = "show";
class Ee extends Y {
    static get NAME() {
        return ur
    }
    close() {
        if (l.trigger(this._element, fr).defaultPrevented) return;
        this._element.classList.remove(_r);
        const e = this._element.classList.contains(pr);
        this._queueCallback(() => this._destroyElement(), this._element, e)
    }
    _destroyElement() {
        this._element.remove(), l.trigger(this._element, hr), this.dispose()
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const e = Ee.getOrCreateInstance(this);
            if (typeof t == "string") {
                if (e[t] === void 0 || t.startsWith("_") || t === "constructor") throw new TypeError(`No method named "${t}"`);
                e[t](this)
            }
        })
    }
}
ge(Ee, "close");
F(Ee);
const mr = "button",
    gr = "bs.button",
    Er = `.${gr}`,
    vr = ".data-api",
    br = "active",
    Is = '[data-bs-toggle="button"]',
    yr = `click${Er}${vr}`;
class ve extends Y {
    static get NAME() {
        return mr
    }
    toggle() {
        this._element.setAttribute("aria-pressed", this._element.classList.toggle(br))
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const e = ve.getOrCreateInstance(this);
            t === "toggle" && e[t]()
        })
    }
}
l.on(document, yr, Is, s => {
    s.preventDefault();
    const t = s.target.closest(Is);
    ve.getOrCreateInstance(t).toggle()
});
F(ve);
const Ar = "swipe",
    Mt = ".bs.swipe",
    Tr = `touchstart${Mt}`,
    wr = `touchmove${Mt}`,
    Cr = `touchend${Mt}`,
    Or = `pointerdown${Mt}`,
    Sr = `pointerup${Mt}`,
    Nr = "touch",
    $r = "pen",
    Dr = "pointer-event",
    Lr = 40,
    Ir = {
        endCallback: null,
        leftCallback: null,
        rightCallback: null
    },
    Pr = {
        endCallback: "(function|null)",
        leftCallback: "(function|null)",
        rightCallback: "(function|null)"
    };
class fe extends Ut {
    constructor(t, e) {
        super(), this._element = t, !(!t || !fe.isSupported()) && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = !!window.PointerEvent, this._initEvents())
    }
    static get Default() {
        return Ir
    }
    static get DefaultType() {
        return Pr
    }
    static get NAME() {
        return Ar
    }
    dispose() {
        l.off(this._element, Mt)
    }
    _start(t) {
        if (!this._supportPointerEvents) {
            this._deltaX = t.touches[0].clientX;
            return
        }
        this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX)
    }
    _end(t) {
        this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), x(this._config.endCallback)
    }
    _move(t) {
        this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX
    }
    _handleSwipe() {
        const t = Math.abs(this._deltaX);
        if (t <= Lr) return;
        const e = t / this._deltaX;
        this._deltaX = 0, e && x(e > 0 ? this._config.rightCallback : this._config.leftCallback)
    }
    _initEvents() {
        this._supportPointerEvents ? (l.on(this._element, Or, t => this._start(t)), l.on(this._element, Sr, t => this._end(t)), this._element.classList.add(Dr)) : (l.on(this._element, Tr, t => this._start(t)), l.on(this._element, wr, t => this._move(t)), l.on(this._element, Cr, t => this._end(t)))
    }
    _eventIsPointerPenTouch(t) {
        return this._supportPointerEvents && (t.pointerType === $r || t.pointerType === Nr)
    }
    static isSupported() {
        return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
    }
}
const xr = "carousel",
    Mr = "bs.carousel",
    rt = `.${Mr}`,
    Bn = ".data-api",
    Rr = "ArrowLeft",
    kr = "ArrowRight",
    Vr = 500,
    Ht = "next",
    bt = "prev",
    Tt = "left",
    le = "right",
    Hr = `slide${rt}`,
    Le = `slid${rt}`,
    Wr = `keydown${rt}`,
    Br = `mouseenter${rt}`,
    Fr = `mouseleave${rt}`,
    jr = `dragstart${rt}`,
    Kr = `load${rt}${Bn}`,
    Yr = `click${rt}${Bn}`,
    Fn = "carousel",
    ee = "active",
    Ur = "slide",
    qr = "carousel-item-end",
    zr = "carousel-item-start",
    Gr = "carousel-item-next",
    Xr = "carousel-item-prev",
    jn = ".active",
    Kn = ".carousel-item",
    Qr = jn + Kn,
    Zr = ".carousel-item img",
    Jr = ".carousel-indicators",
    to = "[data-bs-slide], [data-bs-slide-to]",
    eo = '[data-bs-ride="carousel"]',
    so = {
        [Rr]: le,
        [kr]: Tt
    },
    no = {
        interval: 5e3,
        keyboard: !0,
        pause: "hover",
        ride: !1,
        touch: !0,
        wrap: !0
    },
    io = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        pause: "(string|boolean)",
        ride: "(boolean|string)",
        touch: "boolean",
        wrap: "boolean"
    };
class qt extends Y {
    constructor(t, e) {
        super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = _.findOne(Jr, this._element), this._addEventListeners(), this._config.ride === Fn && this.cycle()
    }
    static get Default() {
        return no
    }
    static get DefaultType() {
        return io
    }
    static get NAME() {
        return xr
    }
    next() {
        this._slide(Ht)
    }
    nextWhenVisible() {
        !document.hidden && xt(this._element) && this.next()
    }
    prev() {
        this._slide(bt)
    }
    pause() {
        this._isSliding && Dn(this._element), this._clearInterval()
    }
    cycle() {
        this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval)
    }
    _maybeEnableCycle() {
        if (this._config.ride) {
            if (this._isSliding) {
                l.one(this._element, Le, () => this.cycle());
                return
            }
            this.cycle()
        }
    }
    to(t) {
        const e = this._getItems();
        if (t > e.length - 1 || t < 0) return;
        if (this._isSliding) {
            l.one(this._element, Le, () => this.to(t));
            return
        }
        const n = this._getItemIndex(this._getActive());
        if (n === t) return;
        const i = t > n ? Ht : bt;
        this._slide(i, e[t])
    }
    dispose() {
        this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
    }
    _configAfterMerge(t) {
        return t.defaultInterval = t.interval, t
    }
    _addEventListeners() {
        this._config.keyboard && l.on(this._element, Wr, t => this._keydown(t)), this._config.pause === "hover" && (l.on(this._element, Br, () => this.pause()), l.on(this._element, Fr, () => this._maybeEnableCycle())), this._config.touch && fe.isSupported() && this._addTouchEventListeners()
    }
    _addTouchEventListeners() {
        for (const n of _.find(Zr, this._element)) l.on(n, jr, i => i.preventDefault());
        const e = {
            leftCallback: () => this._slide(this._directionToOrder(Tt)),
            rightCallback: () => this._slide(this._directionToOrder(le)),
            endCallback: () => {
                this._config.pause === "hover" && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), Vr + this._config.interval))
            }
        };
        this._swipeHelper = new fe(this._element, e)
    }
    _keydown(t) {
        if (/input|textarea/i.test(t.target.tagName)) return;
        const e = so[t.key];
        e && (t.preventDefault(), this._slide(this._directionToOrder(e)))
    }
    _getItemIndex(t) {
        return this._getItems().indexOf(t)
    }
    _setActiveIndicatorElement(t) {
        if (!this._indicatorsElement) return;
        const e = _.findOne(jn, this._indicatorsElement);
        e.classList.remove(ee), e.removeAttribute("aria-current");
        const n = _.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
        n && (n.classList.add(ee), n.setAttribute("aria-current", "true"))
    }
    _updateInterval() {
        const t = this._activeElement || this._getActive();
        if (!t) return;
        const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
        this._config.interval = e || this._config.defaultInterval
    }
    _slide(t, e = null) {
        if (this._isSliding) return;
        const n = this._getActive(),
            i = t === Ht,
            r = e || as(this._getItems(), n, i, this._config.wrap);
        if (r === n) return;
        const o = this._getItemIndex(r),
            a = h => l.trigger(this._element, h, {
                relatedTarget: r,
                direction: this._orderToDirection(t),
                from: this._getItemIndex(n),
                to: o
            });
        if (a(Hr).defaultPrevented || !n || !r) return;
        const d = !!this._interval;
        this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = r;
        const u = i ? zr : qr,
            E = i ? Gr : Xr;
        r.classList.add(E), Yt(r), n.classList.add(u), r.classList.add(u);
        const m = () => {
            r.classList.remove(u, E), r.classList.add(ee), n.classList.remove(ee, E, u), this._isSliding = !1, a(Le)
        };
        this._queueCallback(m, n, this._isAnimated()), d && this.cycle()
    }
    _isAnimated() {
        return this._element.classList.contains(Ur)
    }
    _getActive() {
        return _.findOne(Qr, this._element)
    }
    _getItems() {
        return _.find(Kn, this._element)
    }
    _clearInterval() {
        this._interval && (clearInterval(this._interval), this._interval = null)
    }
    _directionToOrder(t) {
        return W() ? t === Tt ? bt : Ht : t === Tt ? Ht : bt
    }
    _orderToDirection(t) {
        return W() ? t === bt ? Tt : le : t === bt ? le : Tt
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const e = qt.getOrCreateInstance(this, t);
            if (typeof t == "number") {
                e.to(t);
                return
            }
            if (typeof t == "string") {
                if (e[t] === void 0 || t.startsWith("_") || t === "constructor") throw new TypeError(`No method named "${t}"`);
                e[t]()
            }
        })
    }
}
l.on(document, Yr, to, function(s) {
    const t = _.getElementFromSelector(this);
    if (!t || !t.classList.contains(Fn)) return;
    s.preventDefault();
    const e = qt.getOrCreateInstance(t),
        n = this.getAttribute("data-bs-slide-to");
    if (n) {
        e.to(n), e._maybeEnableCycle();
        return
    }
    if (X.getDataAttribute(this, "slide") === "next") {
        e.next(), e._maybeEnableCycle();
        return
    }
    e.prev(), e._maybeEnableCycle()
});
l.on(window, Kr, () => {
    const s = _.find(eo);
    for (const t of s) qt.getOrCreateInstance(t)
});
F(qt);
const ro = "collapse",
    oo = "bs.collapse",
    zt = `.${oo}`,
    ao = ".data-api",
    lo = `show${zt}`,
    co = `shown${zt}`,
    uo = `hide${zt}`,
    fo = `hidden${zt}`,
    ho = `click${zt}${ao}`,
    Ie = "show",
    Ct = "collapse",
    se = "collapsing",
    po = "collapsed",
    _o = `:scope .${Ct} .${Ct}`,
    mo = "collapse-horizontal",
    go = "width",
    Eo = "height",
    vo = ".collapse.show, .collapse.collapsing",
    Ue = '[data-bs-toggle="collapse"]',
    bo = {
        parent: null,
        toggle: !0
    },
    yo = {
        parent: "(null|element)",
        toggle: "boolean"
    };
class jt extends Y {
    constructor(t, e) {
        super(t, e), this._isTransitioning = !1, this._triggerArray = [];
        const n = _.find(Ue);
        for (const i of n) {
            const r = _.getSelectorFromElement(i),
                o = _.find(r).filter(a => a === this._element);
            r !== null && o.length && this._triggerArray.push(i)
        }
        this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
    }
    static get Default() {
        return bo
    }
    static get DefaultType() {
        return yo
    }
    static get NAME() {
        return ro
    }
    toggle() {
        this._isShown() ? this.hide() : this.show()
    }
    show() {
        if (this._isTransitioning || this._isShown()) return;
        let t = [];
        if (this._config.parent && (t = this._getFirstLevelChildren(vo).filter(a => a !== this._element).map(a => jt.getOrCreateInstance(a, {
            toggle: !1
        }))), t.length && t[0]._isTransitioning || l.trigger(this._element, lo).defaultPrevented) return;
        for (const a of t) a.hide();
        const n = this._getDimension();
        this._element.classList.remove(Ct), this._element.classList.add(se), this._element.style[n] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
        const i = () => {
                this._isTransitioning = !1, this._element.classList.remove(se), this._element.classList.add(Ct, Ie), this._element.style[n] = "", l.trigger(this._element, co)
            },
            o = `scroll${n[0].toUpperCase()+n.slice(1)}`;
        this._queueCallback(i, this._element, !0), this._element.style[n] = `${this._element[o]}px`
    }
    hide() {
        if (this._isTransitioning || !this._isShown() || l.trigger(this._element, uo).defaultPrevented) return;
        const e = this._getDimension();
        this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`, Yt(this._element), this._element.classList.add(se), this._element.classList.remove(Ct, Ie);
        for (const i of this._triggerArray) {
            const r = _.getElementFromSelector(i);
            r && !this._isShown(r) && this._addAriaAndCollapsedClass([i], !1)
        }
        this._isTransitioning = !0;
        const n = () => {
            this._isTransitioning = !1, this._element.classList.remove(se), this._element.classList.add(Ct), l.trigger(this._element, fo)
        };
        this._element.style[e] = "", this._queueCallback(n, this._element, !0)
    }
    _isShown(t = this._element) {
        return t.classList.contains(Ie)
    }
    _configAfterMerge(t) {
        return t.toggle = !!t.toggle, t.parent = et(t.parent), t
    }
    _getDimension() {
        return this._element.classList.contains(mo) ? go : Eo
    }
    _initializeChildren() {
        if (!this._config.parent) return;
        const t = this._getFirstLevelChildren(Ue);
        for (const e of t) {
            const n = _.getElementFromSelector(e);
            n && this._addAriaAndCollapsedClass([e], this._isShown(n))
        }
    }
    _getFirstLevelChildren(t) {
        const e = _.find(_o, this._config.parent);
        return _.find(t, this._config.parent).filter(n => !e.includes(n))
    }
    _addAriaAndCollapsedClass(t, e) {
        if (t.length)
            for (const n of t) n.classList.toggle(po, !e), n.setAttribute("aria-expanded", e)
    }
    static jQueryInterface(t) {
        const e = {};
        return typeof t == "string" && /show|hide/.test(t) && (e.toggle = !1), this.each(function() {
            const n = jt.getOrCreateInstance(this, e);
            if (typeof t == "string") {
                if (typeof n[t] > "u") throw new TypeError(`No method named "${t}"`);
                n[t]()
            }
        })
    }
}
l.on(document, ho, Ue, function(s) {
    (s.target.tagName === "A" || s.delegateTarget && s.delegateTarget.tagName === "A") && s.preventDefault();
    for (const t of _.getMultipleElementsFromSelector(this)) jt.getOrCreateInstance(t, {
        toggle: !1
    }).toggle()
});
F(jt);
const Ps = "dropdown",
    Ao = "bs.dropdown",
    gt = `.${Ao}`,
    cs = ".data-api",
    To = "Escape",
    xs = "Tab",
    wo = "ArrowUp",
    Ms = "ArrowDown",
    Co = 2,
    Oo = `hide${gt}`,
    So = `hidden${gt}`,
    No = `show${gt}`,
    $o = `shown${gt}`,
    Yn = `click${gt}${cs}`,
    Un = `keydown${gt}${cs}`,
    Do = `keyup${gt}${cs}`,
    wt = "show",
    Lo = "dropup",
    Io = "dropend",
    Po = "dropstart",
    xo = "dropup-center",
    Mo = "dropdown-center",
    ft = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    Ro = `${ft}.${wt}`,
    ce = ".dropdown-menu",
    ko = ".navbar",
    Vo = ".navbar-nav",
    Ho = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
    Wo = W() ? "top-end" : "top-start",
    Bo = W() ? "top-start" : "top-end",
    Fo = W() ? "bottom-end" : "bottom-start",
    jo = W() ? "bottom-start" : "bottom-end",
    Ko = W() ? "left-start" : "right-start",
    Yo = W() ? "right-start" : "left-start",
    Uo = "top",
    qo = "bottom",
    zo = {
        autoClose: !0,
        boundary: "clippingParents",
        display: "dynamic",
        offset: [0, 2],
        popperConfig: null,
        reference: "toggle"
    },
    Go = {
        autoClose: "(boolean|string)",
        boundary: "(string|element)",
        display: "string",
        offset: "(array|string|function)",
        popperConfig: "(null|object|function)",
        reference: "(string|element|object)"
    };
class q extends Y {
    constructor(t, e) {
        super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = _.next(this._element, ce)[0] || _.prev(this._element, ce)[0] || _.findOne(ce, this._parent), this._inNavbar = this._detectNavbar()
    }
    static get Default() {
        return zo
    }
    static get DefaultType() {
        return Go
    }
    static get NAME() {
        return Ps
    }
    toggle() {
        return this._isShown() ? this.hide() : this.show()
    }
    show() {
        if (st(this._element) || this._isShown()) return;
        const t = {
            relatedTarget: this._element
        };
        if (!l.trigger(this._element, No, t).defaultPrevented) {
            if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Vo))
                for (const n of [].concat(...document.body.children)) l.on(n, "mouseover", de);
            this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(wt), this._element.classList.add(wt), l.trigger(this._element, $o, t)
        }
    }
    hide() {
        if (st(this._element) || !this._isShown()) return;
        const t = {
            relatedTarget: this._element
        };
        this._completeHide(t)
    }
    dispose() {
        this._popper && this._popper.destroy(), super.dispose()
    }
    update() {
        this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
    }
    _completeHide(t) {
        if (!l.trigger(this._element, Oo, t).defaultPrevented) {
            if ("ontouchstart" in document.documentElement)
                for (const n of [].concat(...document.body.children)) l.off(n, "mouseover", de);
            this._popper && this._popper.destroy(), this._menu.classList.remove(wt), this._element.classList.remove(wt), this._element.setAttribute("aria-expanded", "false"), X.removeDataAttribute(this._menu, "popper"), l.trigger(this._element, So, t)
        }
    }
    _getConfig(t) {
        if (t = super._getConfig(t), typeof t.reference == "object" && !G(t.reference) && typeof t.reference.getBoundingClientRect != "function") throw new TypeError(`${Ps.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
        return t
    }
    _createPopper() {
        if (typeof Nn > "u") throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
        let t = this._element;
        this._config.reference === "parent" ? t = this._parent : G(this._config.reference) ? t = et(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
        const e = this._getPopperConfig();
        this._popper = os(t, this._menu, e)
    }
    _isShown() {
        return this._menu.classList.contains(wt)
    }
    _getPlacement() {
        const t = this._parent;
        if (t.classList.contains(Io)) return Ko;
        if (t.classList.contains(Po)) return Yo;
        if (t.classList.contains(xo)) return Uo;
        if (t.classList.contains(Mo)) return qo;
        const e = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
        return t.classList.contains(Lo) ? e ? Bo : Wo : e ? jo : Fo
    }
    _detectNavbar() {
        return this._element.closest(ko) !== null
    }
    _getOffset() {
        const {
            offset: t
        } = this._config;
        return typeof t == "string" ? t.split(",").map(e => Number.parseInt(e, 10)) : typeof t == "function" ? e => t(e, this._element) : t
    }
    _getPopperConfig() {
        const t = {
            placement: this._getPlacement(),
            modifiers: [{
                name: "preventOverflow",
                options: {
                    boundary: this._config.boundary
                }
            }, {
                name: "offset",
                options: {
                    offset: this._getOffset()
                }
            }]
        };
        return (this._inNavbar || this._config.display === "static") && (X.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
            name: "applyStyles",
            enabled: !1
        }]), {
            ...t,
            ...x(this._config.popperConfig, [t])
        }
    }
    _selectMenuItem({
                        key: t,
                        target: e
                    }) {
        const n = _.find(Ho, this._menu).filter(i => xt(i));
        n.length && as(n, e, t === Ms, !n.includes(e)).focus()
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const e = q.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof e[t] > "u") throw new TypeError(`No method named "${t}"`);
                e[t]()
            }
        })
    }
    static clearMenus(t) {
        if (t.button === Co || t.type === "keyup" && t.key !== xs) return;
        const e = _.find(Ro);
        for (const n of e) {
            const i = q.getInstance(n);
            if (!i || i._config.autoClose === !1) continue;
            const r = t.composedPath(),
                o = r.includes(i._menu);
            if (r.includes(i._element) || i._config.autoClose === "inside" && !o || i._config.autoClose === "outside" && o || i._menu.contains(t.target) && (t.type === "keyup" && t.key === xs || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
            const a = {
                relatedTarget: i._element
            };
            t.type === "click" && (a.clickEvent = t), i._completeHide(a)
        }
    }
    static dataApiKeydownHandler(t) {
        const e = /input|textarea/i.test(t.target.tagName),
            n = t.key === To,
            i = [wo, Ms].includes(t.key);
        if (!i && !n || e && !n) return;
        t.preventDefault();
        const r = this.matches(ft) ? this : _.prev(this, ft)[0] || _.next(this, ft)[0] || _.findOne(ft, t.delegateTarget.parentNode),
            o = q.getOrCreateInstance(r);
        if (i) {
            t.stopPropagation(), o.show(), o._selectMenuItem(t);
            return
        }
        o._isShown() && (t.stopPropagation(), o.hide(), r.focus())
    }
}
l.on(document, Un, ft, q.dataApiKeydownHandler);
l.on(document, Un, ce, q.dataApiKeydownHandler);
l.on(document, Yn, q.clearMenus);
l.on(document, Do, q.clearMenus);
l.on(document, Yn, ft, function(s) {
    s.preventDefault(), q.getOrCreateInstance(this).toggle()
});
F(q);
const qn = "backdrop",
    Xo = "fade",
    Rs = "show",
    ks = `mousedown.bs.${qn}`,
    Qo = {
        className: "modal-backdrop",
        clickCallback: null,
        isAnimated: !1,
        isVisible: !0,
        rootElement: "body"
    },
    Zo = {
        className: "string",
        clickCallback: "(function|null)",
        isAnimated: "boolean",
        isVisible: "boolean",
        rootElement: "(element|string)"
    };
class zn extends Ut {
    constructor(t) {
        super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null
    }
    static get Default() {
        return Qo
    }
    static get DefaultType() {
        return Zo
    }
    static get NAME() {
        return qn
    }
    show(t) {
        if (!this._config.isVisible) {
            x(t);
            return
        }
        this._append();
        const e = this._getElement();
        this._config.isAnimated && Yt(e), e.classList.add(Rs), this._emulateAnimation(() => {
            x(t)
        })
    }
    hide(t) {
        if (!this._config.isVisible) {
            x(t);
            return
        }
        this._getElement().classList.remove(Rs), this._emulateAnimation(() => {
            this.dispose(), x(t)
        })
    }
    dispose() {
        this._isAppended && (l.off(this._element, ks), this._element.remove(), this._isAppended = !1)
    }
    _getElement() {
        if (!this._element) {
            const t = document.createElement("div");
            t.className = this._config.className, this._config.isAnimated && t.classList.add(Xo), this._element = t
        }
        return this._element
    }
    _configAfterMerge(t) {
        return t.rootElement = et(t.rootElement), t
    }
    _append() {
        if (this._isAppended) return;
        const t = this._getElement();
        this._config.rootElement.append(t), l.on(t, ks, () => {
            x(this._config.clickCallback)
        }), this._isAppended = !0
    }
    _emulateAnimation(t) {
        Pn(t, this._getElement(), this._config.isAnimated)
    }
}
const Jo = "focustrap",
    ta = "bs.focustrap",
    he = `.${ta}`,
    ea = `focusin${he}`,
    sa = `keydown.tab${he}`,
    na = "Tab",
    ia = "forward",
    Vs = "backward",
    ra = {
        autofocus: !0,
        trapElement: null
    },
    oa = {
        autofocus: "boolean",
        trapElement: "element"
    };
class Gn extends Ut {
    constructor(t) {
        super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null
    }
    static get Default() {
        return ra
    }
    static get DefaultType() {
        return oa
    }
    static get NAME() {
        return Jo
    }
    activate() {
        this._isActive || (this._config.autofocus && this._config.trapElement.focus(), l.off(document, he), l.on(document, ea, t => this._handleFocusin(t)), l.on(document, sa, t => this._handleKeydown(t)), this._isActive = !0)
    }
    deactivate() {
        this._isActive && (this._isActive = !1, l.off(document, he))
    }
    _handleFocusin(t) {
        const {
            trapElement: e
        } = this._config;
        if (t.target === document || t.target === e || e.contains(t.target)) return;
        const n = _.focusableChildren(e);
        n.length === 0 ? e.focus() : this._lastTabNavDirection === Vs ? n[n.length - 1].focus() : n[0].focus()
    }
    _handleKeydown(t) {
        t.key === na && (this._lastTabNavDirection = t.shiftKey ? Vs : ia)
    }
}
const Hs = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    Ws = ".sticky-top",
    ne = "padding-right",
    Bs = "margin-right";
class qe {
    constructor() {
        this._element = document.body
    }
    getWidth() {
        const t = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - t)
    }
    hide() {
        const t = this.getWidth();
        this._disableOverFlow(), this._setElementAttributes(this._element, ne, e => e + t), this._setElementAttributes(Hs, ne, e => e + t), this._setElementAttributes(Ws, Bs, e => e - t)
    }
    reset() {
        this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, ne), this._resetElementAttributes(Hs, ne), this._resetElementAttributes(Ws, Bs)
    }
    isOverflowing() {
        return this.getWidth() > 0
    }
    _disableOverFlow() {
        this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
    }
    _setElementAttributes(t, e, n) {
        const i = this.getWidth(),
            r = o => {
                if (o !== this._element && window.innerWidth > o.clientWidth + i) return;
                this._saveInitialAttribute(o, e);
                const a = window.getComputedStyle(o).getPropertyValue(e);
                o.style.setProperty(e, `${n(Number.parseFloat(a))}px`)
            };
        this._applyManipulationCallback(t, r)
    }
    _saveInitialAttribute(t, e) {
        const n = t.style.getPropertyValue(e);
        n && X.setDataAttribute(t, e, n)
    }
    _resetElementAttributes(t, e) {
        const n = i => {
            const r = X.getDataAttribute(i, e);
            if (r === null) {
                i.style.removeProperty(e);
                return
            }
            X.removeDataAttribute(i, e), i.style.setProperty(e, r)
        };
        this._applyManipulationCallback(t, n)
    }
    _applyManipulationCallback(t, e) {
        if (G(t)) {
            e(t);
            return
        }
        for (const n of _.find(t, this._element)) e(n)
    }
}
const aa = "modal",
    la = "bs.modal",
    B = `.${la}`,
    ca = ".data-api",
    ua = "Escape",
    da = `hide${B}`,
    fa = `hidePrevented${B}`,
    Xn = `hidden${B}`,
    Qn = `show${B}`,
    ha = `shown${B}`,
    pa = `resize${B}`,
    _a = `click.dismiss${B}`,
    ma = `mousedown.dismiss${B}`,
    ga = `keydown.dismiss${B}`,
    Ea = `click${B}${ca}`,
    Fs = "modal-open",
    va = "fade",
    js = "show",
    Pe = "modal-static",
    ba = ".modal.show",
    ya = ".modal-dialog",
    Aa = ".modal-body",
    Ta = '[data-bs-toggle="modal"]',
    wa = {
        backdrop: !0,
        focus: !0,
        keyboard: !0
    },
    Ca = {
        backdrop: "(boolean|string)",
        focus: "boolean",
        keyboard: "boolean"
    };
class Lt extends Y {
    constructor(t, e) {
        super(t, e), this._dialog = _.findOne(ya, this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new qe, this._addEventListeners()
    }
    static get Default() {
        return wa
    }
    static get DefaultType() {
        return Ca
    }
    static get NAME() {
        return aa
    }
    toggle(t) {
        return this._isShown ? this.hide() : this.show(t)
    }
    show(t) {
        this._isShown || this._isTransitioning || l.trigger(this._element, Qn, {
            relatedTarget: t
        }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Fs), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)))
    }
    hide() {
        !this._isShown || this._isTransitioning || l.trigger(this._element, da).defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(js), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()))
    }
    dispose() {
        l.off(window, B), l.off(this._dialog, B), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
    }
    handleUpdate() {
        this._adjustDialog()
    }
    _initializeBackDrop() {
        return new zn({
            isVisible: !!this._config.backdrop,
            isAnimated: this._isAnimated()
        })
    }
    _initializeFocusTrap() {
        return new Gn({
            trapElement: this._element
        })
    }
    _showElement(t) {
        document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
        const e = _.findOne(Aa, this._dialog);
        e && (e.scrollTop = 0), Yt(this._element), this._element.classList.add(js);
        const n = () => {
            this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, l.trigger(this._element, ha, {
                relatedTarget: t
            })
        };
        this._queueCallback(n, this._dialog, this._isAnimated())
    }
    _addEventListeners() {
        l.on(this._element, ga, t => {
            if (t.key === ua) {
                if (this._config.keyboard) {
                    this.hide();
                    return
                }
                this._triggerBackdropTransition()
            }
        }), l.on(window, pa, () => {
            this._isShown && !this._isTransitioning && this._adjustDialog()
        }), l.on(this._element, ma, t => {
            l.one(this._element, _a, e => {
                if (!(this._element !== t.target || this._element !== e.target)) {
                    if (this._config.backdrop === "static") {
                        this._triggerBackdropTransition();
                        return
                    }
                    this._config.backdrop && this.hide()
                }
            })
        })
    }
    _hideModal() {
        this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
            document.body.classList.remove(Fs), this._resetAdjustments(), this._scrollBar.reset(), l.trigger(this._element, Xn)
        })
    }
    _isAnimated() {
        return this._element.classList.contains(va)
    }
    _triggerBackdropTransition() {
        if (l.trigger(this._element, fa).defaultPrevented) return;
        const e = this._element.scrollHeight > document.documentElement.clientHeight,
            n = this._element.style.overflowY;
        n === "hidden" || this._element.classList.contains(Pe) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(Pe), this._queueCallback(() => {
            this._element.classList.remove(Pe), this._queueCallback(() => {
                this._element.style.overflowY = n
            }, this._dialog)
        }, this._dialog), this._element.focus())
    }
    _adjustDialog() {
        const t = this._element.scrollHeight > document.documentElement.clientHeight,
            e = this._scrollBar.getWidth(),
            n = e > 0;
        if (n && !t) {
            const i = W() ? "paddingLeft" : "paddingRight";
            this._element.style[i] = `${e}px`
        }
        if (!n && t) {
            const i = W() ? "paddingRight" : "paddingLeft";
            this._element.style[i] = `${e}px`
        }
    }
    _resetAdjustments() {
        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
    }
    static jQueryInterface(t, e) {
        return this.each(function() {
            const n = Lt.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof n[t] > "u") throw new TypeError(`No method named "${t}"`);
                n[t](e)
            }
        })
    }
}
l.on(document, Ea, Ta, function(s) {
    const t = _.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && s.preventDefault(), l.one(t, Qn, i => {
        i.defaultPrevented || l.one(t, Xn, () => {
            xt(this) && this.focus()
        })
    });
    const e = _.findOne(ba);
    e && Lt.getInstance(e).hide(), Lt.getOrCreateInstance(t).toggle(this)
});
ge(Lt);
F(Lt);
const Oa = "offcanvas",
    Sa = "bs.offcanvas",
    Z = `.${Sa}`,
    Zn = ".data-api",
    Na = `load${Z}${Zn}`,
    $a = "Escape",
    Ks = "show",
    Ys = "showing",
    Us = "hiding",
    Da = "offcanvas-backdrop",
    Jn = ".offcanvas.show",
    La = `show${Z}`,
    Ia = `shown${Z}`,
    Pa = `hide${Z}`,
    qs = `hidePrevented${Z}`,
    ti = `hidden${Z}`,
    xa = `resize${Z}`,
    Ma = `click${Z}${Zn}`,
    Ra = `keydown.dismiss${Z}`,
    ka = '[data-bs-toggle="offcanvas"]',
    Va = {
        backdrop: !0,
        keyboard: !0,
        scroll: !1
    },
    Ha = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        scroll: "boolean"
    };
class nt extends Y {
    constructor(t, e) {
        super(t, e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
    }
    static get Default() {
        return Va
    }
    static get DefaultType() {
        return Ha
    }
    static get NAME() {
        return Oa
    }
    toggle(t) {
        return this._isShown ? this.hide() : this.show(t)
    }
    show(t) {
        if (this._isShown || l.trigger(this._element, La, {
            relatedTarget: t
        }).defaultPrevented) return;
        this._isShown = !0, this._backdrop.show(), this._config.scroll || new qe().hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(Ys);
        const n = () => {
            (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(), this._element.classList.add(Ks), this._element.classList.remove(Ys), l.trigger(this._element, Ia, {
                relatedTarget: t
            })
        };
        this._queueCallback(n, this._element, !0)
    }
    hide() {
        if (!this._isShown || l.trigger(this._element, Pa).defaultPrevented) return;
        this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(Us), this._backdrop.hide();
        const e = () => {
            this._element.classList.remove(Ks, Us), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new qe().reset(), l.trigger(this._element, ti)
        };
        this._queueCallback(e, this._element, !0)
    }
    dispose() {
        this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
    }
    _initializeBackDrop() {
        const t = () => {
                if (this._config.backdrop === "static") {
                    l.trigger(this._element, qs);
                    return
                }
                this.hide()
            },
            e = !!this._config.backdrop;
        return new zn({
            className: Da,
            isVisible: e,
            isAnimated: !0,
            rootElement: this._element.parentNode,
            clickCallback: e ? t : null
        })
    }
    _initializeFocusTrap() {
        return new Gn({
            trapElement: this._element
        })
    }
    _addEventListeners() {
        l.on(this._element, Ra, t => {
            if (t.key === $a) {
                if (this._config.keyboard) {
                    this.hide();
                    return
                }
                l.trigger(this._element, qs)
            }
        })
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const e = nt.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (e[t] === void 0 || t.startsWith("_") || t === "constructor") throw new TypeError(`No method named "${t}"`);
                e[t](this)
            }
        })
    }
}
l.on(document, Ma, ka, function(s) {
    const t = _.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName) && s.preventDefault(), st(this)) return;
    l.one(t, ti, () => {
        xt(this) && this.focus()
    });
    const e = _.findOne(Jn);
    e && e !== t && nt.getInstance(e).hide(), nt.getOrCreateInstance(t).toggle(this)
});
l.on(window, Na, () => {
    for (const s of _.find(Jn)) nt.getOrCreateInstance(s).show()
});
l.on(window, xa, () => {
    for (const s of _.find("[aria-modal][class*=show][class*=offcanvas-]")) getComputedStyle(s).position !== "fixed" && nt.getOrCreateInstance(s).hide()
});
ge(nt);
F(nt);
const Wa = /^aria-[\w-]*$/i,
    ei = {
        "*": ["class", "dir", "id", "lang", "role", Wa],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    },
    Ba = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
    Fa = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
    ja = (s, t) => {
        const e = s.nodeName.toLowerCase();
        return t.includes(e) ? Ba.has(e) ? !!Fa.test(s.nodeValue) : !0 : t.filter(n => n instanceof RegExp).some(n => n.test(e))
    };

function Ka(s, t, e) {
    if (!s.length) return s;
    if (e && typeof e == "function") return e(s);
    const i = new window.DOMParser().parseFromString(s, "text/html"),
        r = [].concat(...i.body.querySelectorAll("*"));
    for (const o of r) {
        const a = o.nodeName.toLowerCase();
        if (!Object.keys(t).includes(a)) {
            o.remove();
            continue
        }
        const c = [].concat(...o.attributes),
            d = [].concat(t["*"] || [], t[a] || []);
        for (const u of c) ja(u, d) || o.removeAttribute(u.nodeName)
    }
    return i.body.innerHTML
}
const Ya = "TemplateFactory",
    Ua = {
        allowList: ei,
        content: {},
        extraClass: "",
        html: !1,
        sanitize: !0,
        sanitizeFn: null,
        template: "<div></div>"
    },
    qa = {
        allowList: "object",
        content: "object",
        extraClass: "(string|function)",
        html: "boolean",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        template: "string"
    },
    za = {
        entry: "(string|element|function|null)",
        selector: "(string|element)"
    };
class Ga extends Ut {
    constructor(t) {
        super(), this._config = this._getConfig(t)
    }
    static get Default() {
        return Ua
    }
    static get DefaultType() {
        return qa
    }
    static get NAME() {
        return Ya
    }
    getContent() {
        return Object.values(this._config.content).map(t => this._resolvePossibleFunction(t)).filter(Boolean)
    }
    hasContent() {
        return this.getContent().length > 0
    }
    changeContent(t) {
        return this._checkContent(t), this._config.content = {
            ...this._config.content,
            ...t
        }, this
    }
    toHtml() {
        const t = document.createElement("div");
        t.innerHTML = this._maybeSanitize(this._config.template);
        for (const [i, r] of Object.entries(this._config.content)) this._setContent(t, r, i);
        const e = t.children[0],
            n = this._resolvePossibleFunction(this._config.extraClass);
        return n && e.classList.add(...n.split(" ")), e
    }
    _typeCheckConfig(t) {
        super._typeCheckConfig(t), this._checkContent(t.content)
    }
    _checkContent(t) {
        for (const [e, n] of Object.entries(t)) super._typeCheckConfig({
            selector: e,
            entry: n
        }, za)
    }
    _setContent(t, e, n) {
        const i = _.findOne(n, t);
        if (i) {
            if (e = this._resolvePossibleFunction(e), !e) {
                i.remove();
                return
            }
            if (G(e)) {
                this._putElementInTemplate(et(e), i);
                return
            }
            if (this._config.html) {
                i.innerHTML = this._maybeSanitize(e);
                return
            }
            i.textContent = e
        }
    }
    _maybeSanitize(t) {
        return this._config.sanitize ? Ka(t, this._config.allowList, this._config.sanitizeFn) : t
    }
    _resolvePossibleFunction(t) {
        return x(t, [this])
    }
    _putElementInTemplate(t, e) {
        if (this._config.html) {
            e.innerHTML = "", e.append(t);
            return
        }
        e.textContent = t.textContent
    }
}
const Xa = "tooltip",
    Qa = new Set(["sanitize", "allowList", "sanitizeFn"]),
    xe = "fade",
    Za = "modal",
    ie = "show",
    Ja = ".tooltip-inner",
    zs = `.${Za}`,
    Gs = "hide.bs.modal",
    Wt = "hover",
    Me = "focus",
    tl = "click",
    el = "manual",
    sl = "hide",
    nl = "hidden",
    il = "show",
    rl = "shown",
    ol = "inserted",
    al = "click",
    ll = "focusin",
    cl = "focusout",
    ul = "mouseenter",
    dl = "mouseleave",
    fl = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: W() ? "left" : "right",
        BOTTOM: "bottom",
        LEFT: W() ? "right" : "left"
    },
    hl = {
        allowList: ei,
        animation: !0,
        boundary: "clippingParents",
        container: !1,
        customClass: "",
        delay: 0,
        fallbackPlacements: ["top", "right", "bottom", "left"],
        html: !1,
        offset: [0, 6],
        placement: "top",
        popperConfig: null,
        sanitize: !0,
        sanitizeFn: null,
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        title: "",
        trigger: "hover focus"
    },
    pl = {
        allowList: "object",
        animation: "boolean",
        boundary: "(string|element)",
        container: "(string|element|boolean)",
        customClass: "(string|function)",
        delay: "(number|object)",
        fallbackPlacements: "array",
        html: "boolean",
        offset: "(array|string|function)",
        placement: "(string|function)",
        popperConfig: "(null|object|function)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        selector: "(string|boolean)",
        template: "string",
        title: "(string|element|function)",
        trigger: "string"
    };
class Rt extends Y {
    constructor(t, e) {
        if (typeof Nn > "u") throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
        super(t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle()
    }
    static get Default() {
        return hl
    }
    static get DefaultType() {
        return pl
    }
    static get NAME() {
        return Xa
    }
    enable() {
        this._isEnabled = !0
    }
    disable() {
        this._isEnabled = !1
    }
    toggleEnabled() {
        this._isEnabled = !this._isEnabled
    }
    toggle() {
        if (this._isEnabled) {
            if (this._activeTrigger.click = !this._activeTrigger.click, this._isShown()) {
                this._leave();
                return
            }
            this._enter()
        }
    }
    dispose() {
        clearTimeout(this._timeout), l.off(this._element.closest(zs), Gs, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose()
    }
    show() {
        if (this._element.style.display === "none") throw new Error("Please use show on visible elements");
        if (!(this._isWithContent() && this._isEnabled)) return;
        const t = l.trigger(this._element, this.constructor.eventName(il)),
            n = (Ln(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
        if (t.defaultPrevented || !n) return;
        this._disposePopper();
        const i = this._getTipElement();
        this._element.setAttribute("aria-describedby", i.getAttribute("id"));
        const {
            container: r
        } = this._config;
        if (this._element.ownerDocument.documentElement.contains(this.tip) || (r.append(i), l.trigger(this._element, this.constructor.eventName(ol))), this._popper = this._createPopper(i), i.classList.add(ie), "ontouchstart" in document.documentElement)
            for (const a of [].concat(...document.body.children)) l.on(a, "mouseover", de);
        const o = () => {
            l.trigger(this._element, this.constructor.eventName(rl)), this._isHovered === !1 && this._leave(), this._isHovered = !1
        };
        this._queueCallback(o, this.tip, this._isAnimated())
    }
    hide() {
        if (!this._isShown() || l.trigger(this._element, this.constructor.eventName(sl)).defaultPrevented) return;
        if (this._getTipElement().classList.remove(ie), "ontouchstart" in document.documentElement)
            for (const i of [].concat(...document.body.children)) l.off(i, "mouseover", de);
        this._activeTrigger[tl] = !1, this._activeTrigger[Me] = !1, this._activeTrigger[Wt] = !1, this._isHovered = null;
        const n = () => {
            this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), l.trigger(this._element, this.constructor.eventName(nl)))
        };
        this._queueCallback(n, this.tip, this._isAnimated())
    }
    update() {
        this._popper && this._popper.update()
    }
    _isWithContent() {
        return !!this._getTitle()
    }
    _getTipElement() {
        return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip
    }
    _createTipElement(t) {
        const e = this._getTemplateFactory(t).toHtml();
        if (!e) return null;
        e.classList.remove(xe, ie), e.classList.add(`bs-${this.constructor.NAME}-auto`);
        const n = Ji(this.constructor.NAME).toString();
        return e.setAttribute("id", n), this._isAnimated() && e.classList.add(xe), e
    }
    setContent(t) {
        this._newContent = t, this._isShown() && (this._disposePopper(), this.show())
    }
    _getTemplateFactory(t) {
        return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new Ga({
            ...this._config,
            content: t,
            extraClass: this._resolvePossibleFunction(this._config.customClass)
        }), this._templateFactory
    }
    _getContentForTemplate() {
        return {
            [Ja]: this._getTitle()
        }
    }
    _getTitle() {
        return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
    }
    _initializeOnDelegatedTarget(t) {
        return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig())
    }
    _isAnimated() {
        return this._config.animation || this.tip && this.tip.classList.contains(xe)
    }
    _isShown() {
        return this.tip && this.tip.classList.contains(ie)
    }
    _createPopper(t) {
        const e = x(this._config.placement, [this, t, this._element]),
            n = fl[e.toUpperCase()];
        return os(this._element, t, this._getPopperConfig(n))
    }
    _getOffset() {
        const {
            offset: t
        } = this._config;
        return typeof t == "string" ? t.split(",").map(e => Number.parseInt(e, 10)) : typeof t == "function" ? e => t(e, this._element) : t
    }
    _resolvePossibleFunction(t) {
        return x(t, [this._element])
    }
    _getPopperConfig(t) {
        const e = {
            placement: t,
            modifiers: [{
                name: "flip",
                options: {
                    fallbackPlacements: this._config.fallbackPlacements
                }
            }, {
                name: "offset",
                options: {
                    offset: this._getOffset()
                }
            }, {
                name: "preventOverflow",
                options: {
                    boundary: this._config.boundary
                }
            }, {
                name: "arrow",
                options: {
                    element: `.${this.constructor.NAME}-arrow`
                }
            }, {
                name: "preSetPlacement",
                enabled: !0,
                phase: "beforeMain",
                fn: n => {
                    this._getTipElement().setAttribute("data-popper-placement", n.state.placement)
                }
            }]
        };
        return {
            ...e,
            ...x(this._config.popperConfig, [e])
        }
    }
    _setListeners() {
        const t = this._config.trigger.split(" ");
        for (const e of t)
            if (e === "click") l.on(this._element, this.constructor.eventName(al), this._config.selector, n => {
                this._initializeOnDelegatedTarget(n).toggle()
            });
            else if (e !== el) {
                const n = e === Wt ? this.constructor.eventName(ul) : this.constructor.eventName(ll),
                    i = e === Wt ? this.constructor.eventName(dl) : this.constructor.eventName(cl);
                l.on(this._element, n, this._config.selector, r => {
                    const o = this._initializeOnDelegatedTarget(r);
                    o._activeTrigger[r.type === "focusin" ? Me : Wt] = !0, o._enter()
                }), l.on(this._element, i, this._config.selector, r => {
                    const o = this._initializeOnDelegatedTarget(r);
                    o._activeTrigger[r.type === "focusout" ? Me : Wt] = o._element.contains(r.relatedTarget), o._leave()
                })
            }
        this._hideModalHandler = () => {
            this._element && this.hide()
        }, l.on(this._element.closest(zs), Gs, this._hideModalHandler)
    }
    _fixTitle() {
        const t = this._element.getAttribute("title");
        t && (!this._element.getAttribute("aria-label") && !this._element.textContent.trim() && this._element.setAttribute("aria-label", t), this._element.setAttribute("data-bs-original-title", t), this._element.removeAttribute("title"))
    }
    _enter() {
        if (this._isShown() || this._isHovered) {
            this._isHovered = !0;
            return
        }
        this._isHovered = !0, this._setTimeout(() => {
            this._isHovered && this.show()
        }, this._config.delay.show)
    }
    _leave() {
        this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => {
            this._isHovered || this.hide()
        }, this._config.delay.hide))
    }
    _setTimeout(t, e) {
        clearTimeout(this._timeout), this._timeout = setTimeout(t, e)
    }
    _isWithActiveTrigger() {
        return Object.values(this._activeTrigger).includes(!0)
    }
    _getConfig(t) {
        const e = X.getDataAttributes(this._element);
        for (const n of Object.keys(e)) Qa.has(n) && delete e[n];
        return t = {
            ...e,
            ...typeof t == "object" && t ? t : {}
        }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
    }
    _configAfterMerge(t) {
        return t.container = t.container === !1 ? document.body : et(t.container), typeof t.delay == "number" && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), typeof t.title == "number" && (t.title = t.title.toString()), typeof t.content == "number" && (t.content = t.content.toString()), t
    }
    _getDelegateConfig() {
        const t = {};
        for (const [e, n] of Object.entries(this._config)) this.constructor.Default[e] !== n && (t[e] = n);
        return t.selector = !1, t.trigger = "manual", t
    }
    _disposePopper() {
        this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null)
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const e = Rt.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof e[t] > "u") throw new TypeError(`No method named "${t}"`);
                e[t]()
            }
        })
    }
}
F(Rt);
const _l = "popover",
    ml = ".popover-header",
    gl = ".popover-body",
    El = {
        ...Rt.Default,
        content: "",
        offset: [0, 8],
        placement: "right",
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        trigger: "click"
    },
    vl = {
        ...Rt.DefaultType,
        content: "(null|string|element|function)"
    };
class us extends Rt {
    static get Default() {
        return El
    }
    static get DefaultType() {
        return vl
    }
    static get NAME() {
        return _l
    }
    _isWithContent() {
        return this._getTitle() || this._getContent()
    }
    _getContentForTemplate() {
        return {
            [ml]: this._getTitle(),
            [gl]: this._getContent()
        }
    }
    _getContent() {
        return this._resolvePossibleFunction(this._config.content)
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const e = us.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof e[t] > "u") throw new TypeError(`No method named "${t}"`);
                e[t]()
            }
        })
    }
}
F(us);
const bl = "scrollspy",
    yl = "bs.scrollspy",
    ds = `.${yl}`,
    Al = ".data-api",
    Tl = `activate${ds}`,
    Xs = `click${ds}`,
    wl = `load${ds}${Al}`,
    Cl = "dropdown-item",
    yt = "active",
    Ol = '[data-bs-spy="scroll"]',
    Re = "[href]",
    Sl = ".nav, .list-group",
    Qs = ".nav-link",
    Nl = ".nav-item",
    $l = ".list-group-item",
    Dl = `${Qs}, ${Nl} > ${Qs}, ${$l}`,
    Ll = ".dropdown",
    Il = ".dropdown-toggle",
    Pl = {
        offset: null,
        rootMargin: "0px 0px -25%",
        smoothScroll: !1,
        target: null,
        threshold: [.1, .5, 1]
    },
    xl = {
        offset: "(number|null)",
        rootMargin: "string",
        smoothScroll: "boolean",
        target: "element",
        threshold: "array"
    };
class be extends Y {
    constructor(t, e) {
        super(t, e), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = getComputedStyle(this._element).overflowY === "visible" ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
            visibleEntryTop: 0,
            parentScrollTop: 0
        }, this.refresh()
    }
    static get Default() {
        return Pl
    }
    static get DefaultType() {
        return xl
    }
    static get NAME() {
        return bl
    }
    refresh() {
        this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
        for (const t of this._observableSections.values()) this._observer.observe(t)
    }
    dispose() {
        this._observer.disconnect(), super.dispose()
    }
    _configAfterMerge(t) {
        return t.target = et(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, typeof t.threshold == "string" && (t.threshold = t.threshold.split(",").map(e => Number.parseFloat(e))), t
    }
    _maybeEnableSmoothScroll() {
        this._config.smoothScroll && (l.off(this._config.target, Xs), l.on(this._config.target, Xs, Re, t => {
            const e = this._observableSections.get(t.target.hash);
            if (e) {
                t.preventDefault();
                const n = this._rootElement || window,
                    i = e.offsetTop - this._element.offsetTop;
                if (n.scrollTo) {
                    n.scrollTo({
                        top: i,
                        behavior: "smooth"
                    });
                    return
                }
                n.scrollTop = i
            }
        }))
    }
    _getNewObserver() {
        const t = {
            root: this._rootElement,
            threshold: this._config.threshold,
            rootMargin: this._config.rootMargin
        };
        return new IntersectionObserver(e => this._observerCallback(e), t)
    }
    _observerCallback(t) {
        const e = o => this._targetLinks.get(`#${o.target.id}`),
            n = o => {
                this._previousScrollData.visibleEntryTop = o.target.offsetTop, this._process(e(o))
            },
            i = (this._rootElement || document.documentElement).scrollTop,
            r = i >= this._previousScrollData.parentScrollTop;
        this._previousScrollData.parentScrollTop = i;
        for (const o of t) {
            if (!o.isIntersecting) {
                this._activeTarget = null, this._clearActiveClass(e(o));
                continue
            }
            const a = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
            if (r && a) {
                if (n(o), !i) return;
                continue
            }!r && !a && n(o)
        }
    }
    _initializeTargetsAndObservables() {
        this._targetLinks = new Map, this._observableSections = new Map;
        const t = _.find(Re, this._config.target);
        for (const e of t) {
            if (!e.hash || st(e)) continue;
            const n = _.findOne(decodeURI(e.hash), this._element);
            xt(n) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, n))
        }
    }
    _process(t) {
        this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(yt), this._activateParents(t), l.trigger(this._element, Tl, {
            relatedTarget: t
        }))
    }
    _activateParents(t) {
        if (t.classList.contains(Cl)) {
            _.findOne(Il, t.closest(Ll)).classList.add(yt);
            return
        }
        for (const e of _.parents(t, Sl))
            for (const n of _.prev(e, Dl)) n.classList.add(yt)
    }
    _clearActiveClass(t) {
        t.classList.remove(yt);
        const e = _.find(`${Re}.${yt}`, t);
        for (const n of e) n.classList.remove(yt)
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const e = be.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (e[t] === void 0 || t.startsWith("_") || t === "constructor") throw new TypeError(`No method named "${t}"`);
                e[t]()
            }
        })
    }
}
l.on(window, wl, () => {
    for (const s of _.find(Ol)) be.getOrCreateInstance(s)
});
F(be);
const Ml = "tab",
    Rl = "bs.tab",
    Et = `.${Rl}`,
    kl = `hide${Et}`,
    Vl = `hidden${Et}`,
    Hl = `show${Et}`,
    Wl = `shown${Et}`,
    Bl = `click${Et}`,
    Fl = `keydown${Et}`,
    jl = `load${Et}`,
    Kl = "ArrowLeft",
    Zs = "ArrowRight",
    Yl = "ArrowUp",
    Js = "ArrowDown",
    ke = "Home",
    tn = "End",
    ht = "active",
    en = "fade",
    Ve = "show",
    Ul = "dropdown",
    si = ".dropdown-toggle",
    ql = ".dropdown-menu",
    He = `:not(${si})`,
    zl = '.list-group, .nav, [role="tablist"]',
    Gl = ".nav-item, .list-group-item",
    Xl = `.nav-link${He}, .list-group-item${He}, [role="tab"]${He}`,
    ni = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    We = `${Xl}, ${ni}`,
    Ql = `.${ht}[data-bs-toggle="tab"], .${ht}[data-bs-toggle="pill"], .${ht}[data-bs-toggle="list"]`;
class It extends Y {
    constructor(t) {
        super(t), this._parent = this._element.closest(zl), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), l.on(this._element, Fl, e => this._keydown(e)))
    }
    static get NAME() {
        return Ml
    }
    show() {
        const t = this._element;
        if (this._elemIsActive(t)) return;
        const e = this._getActiveElem(),
            n = e ? l.trigger(e, kl, {
                relatedTarget: t
            }) : null;
        l.trigger(t, Hl, {
            relatedTarget: e
        }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(e, t), this._activate(t, e))
    }
    _activate(t, e) {
        if (!t) return;
        t.classList.add(ht), this._activate(_.getElementFromSelector(t));
        const n = () => {
            if (t.getAttribute("role") !== "tab") {
                t.classList.add(Ve);
                return
            }
            t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), l.trigger(t, Wl, {
                relatedTarget: e
            })
        };
        this._queueCallback(n, t, t.classList.contains(en))
    }
    _deactivate(t, e) {
        if (!t) return;
        t.classList.remove(ht), t.blur(), this._deactivate(_.getElementFromSelector(t));
        const n = () => {
            if (t.getAttribute("role") !== "tab") {
                t.classList.remove(Ve);
                return
            }
            t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), l.trigger(t, Vl, {
                relatedTarget: e
            })
        };
        this._queueCallback(n, t, t.classList.contains(en))
    }
    _keydown(t) {
        if (![Kl, Zs, Yl, Js, ke, tn].includes(t.key)) return;
        t.stopPropagation(), t.preventDefault();
        const e = this._getChildren().filter(i => !st(i));
        let n;
        if ([ke, tn].includes(t.key)) n = e[t.key === ke ? 0 : e.length - 1];
        else {
            const i = [Zs, Js].includes(t.key);
            n = as(e, t.target, i, !0)
        }
        n && (n.focus({
            preventScroll: !0
        }), It.getOrCreateInstance(n).show())
    }
    _getChildren() {
        return _.find(We, this._parent)
    }
    _getActiveElem() {
        return this._getChildren().find(t => this._elemIsActive(t)) || null
    }
    _setInitialAttributes(t, e) {
        this._setAttributeIfNotExists(t, "role", "tablist");
        for (const n of e) this._setInitialAttributesOnChild(n)
    }
    _setInitialAttributesOnChild(t) {
        t = this._getInnerElement(t);
        const e = this._elemIsActive(t),
            n = this._getOuterElement(t);
        t.setAttribute("aria-selected", e), n !== t && this._setAttributeIfNotExists(n, "role", "presentation"), e || t.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t, "role", "tab"), this._setInitialAttributesOnTargetPanel(t)
    }
    _setInitialAttributesOnTargetPanel(t) {
        const e = _.getElementFromSelector(t);
        e && (this._setAttributeIfNotExists(e, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`))
    }
    _toggleDropDown(t, e) {
        const n = this._getOuterElement(t);
        if (!n.classList.contains(Ul)) return;
        const i = (r, o) => {
            const a = _.findOne(r, n);
            a && a.classList.toggle(o, e)
        };
        i(si, ht), i(ql, Ve), n.setAttribute("aria-expanded", e)
    }
    _setAttributeIfNotExists(t, e, n) {
        t.hasAttribute(e) || t.setAttribute(e, n)
    }
    _elemIsActive(t) {
        return t.classList.contains(ht)
    }
    _getInnerElement(t) {
        return t.matches(We) ? t : _.findOne(We, t)
    }
    _getOuterElement(t) {
        return t.closest(Gl) || t
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const e = It.getOrCreateInstance(this);
            if (typeof t == "string") {
                if (e[t] === void 0 || t.startsWith("_") || t === "constructor") throw new TypeError(`No method named "${t}"`);
                e[t]()
            }
        })
    }
}
l.on(document, Bl, ni, function(s) {
    ["A", "AREA"].includes(this.tagName) && s.preventDefault(), !st(this) && It.getOrCreateInstance(this).show()
});
l.on(window, jl, () => {
    for (const s of _.find(Ql)) It.getOrCreateInstance(s)
});
F(It);
const Zl = "toast",
    Jl = "bs.toast",
    ot = `.${Jl}`,
    tc = `mouseover${ot}`,
    ec = `mouseout${ot}`,
    sc = `focusin${ot}`,
    nc = `focusout${ot}`,
    ic = `hide${ot}`,
    rc = `hidden${ot}`,
    oc = `show${ot}`,
    ac = `shown${ot}`,
    lc = "fade",
    sn = "hide",
    re = "show",
    oe = "showing",
    cc = {
        animation: "boolean",
        autohide: "boolean",
        delay: "number"
    },
    uc = {
        animation: !0,
        autohide: !0,
        delay: 5e3
    };
class ye extends Y {
    constructor(t, e) {
        super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
    }
    static get Default() {
        return uc
    }
    static get DefaultType() {
        return cc
    }
    static get NAME() {
        return Zl
    }
    show() {
        if (l.trigger(this._element, oc).defaultPrevented) return;
        this._clearTimeout(), this._config.animation && this._element.classList.add(lc);
        const e = () => {
            this._element.classList.remove(oe), l.trigger(this._element, ac), this._maybeScheduleHide()
        };
        this._element.classList.remove(sn), Yt(this._element), this._element.classList.add(re, oe), this._queueCallback(e, this._element, this._config.animation)
    }
    hide() {
        if (!this.isShown() || l.trigger(this._element, ic).defaultPrevented) return;
        const e = () => {
            this._element.classList.add(sn), this._element.classList.remove(oe, re), l.trigger(this._element, rc)
        };
        this._element.classList.add(oe), this._queueCallback(e, this._element, this._config.animation)
    }
    dispose() {
        this._clearTimeout(), this.isShown() && this._element.classList.remove(re), super.dispose()
    }
    isShown() {
        return this._element.classList.contains(re)
    }
    _maybeScheduleHide() {
        this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
            this.hide()
        }, this._config.delay)))
    }
    _onInteraction(t, e) {
        switch (t.type) {
            case "mouseover":
            case "mouseout": {
                this._hasMouseInteraction = e;
                break
            }
            case "focusin":
            case "focusout": {
                this._hasKeyboardInteraction = e;
                break
            }
        }
        if (e) {
            this._clearTimeout();
            return
        }
        const n = t.relatedTarget;
        this._element === n || this._element.contains(n) || this._maybeScheduleHide()
    }
    _setListeners() {
        l.on(this._element, tc, t => this._onInteraction(t, !0)), l.on(this._element, ec, t => this._onInteraction(t, !1)), l.on(this._element, sc, t => this._onInteraction(t, !0)), l.on(this._element, nc, t => this._onInteraction(t, !1))
    }
    _clearTimeout() {
        clearTimeout(this._timeout), this._timeout = null
    }
    static jQueryInterface(t) {
        return this.each(function() {
            const e = ye.getOrCreateInstance(this, t);
            if (typeof t == "string") {
                if (typeof e[t] > "u") throw new TypeError(`No method named "${t}"`);
                e[t](this)
            }
        })
    }
}
ge(ye);
F(ye);
$(document).ready(function() {
    var s = document.getElementsByClassName("story__slider"),
        t = 0,
        e = 0;
    $("#videoModal").on("show.bs.modal", function(m) {
        document.querySelectorAll(".story__slide video").forEach(g => {
            $(g).parent(".story__slide").attr("data-swiper-autoplay", g.duration * 1e3)
        }), s = new Swiper(".story__slider", {
            speed: 1,
            watchSlidesProgress: !0,
            slidesPerView: 1,
            autoplay: {
                delay: 5e3,
                disableOnInteraction: !1,
                stopOnLastSlide: !0
            },
            navigation: {
                nextEl: ".story__next",
                prevEl: ".story__prev"
            },
            pagination: {
                el: ".story__pagination",
                renderBullet: function(g, f) {
                    return '<div class="' + f + '"><div class="swiper-pagination-progress"></div> </div>'
                }
            },
            on: {
                autoplayTimeLeft(g, f, v) {
                    let b = document.querySelectorAll(".story__slider .swiper-slide")[g.activeIndex],
                        y = document.querySelectorAll(".story__slider .swiper-pagination-progress")[g.realIndex],
                        A = b.dataset.swiperAutoplay ? parseInt(b.dataset.swiperAutoplay) : g.params.autoplay.delay,
                        p = Math.min(Math.max(parseFloat(((A - f) * 100 / A).toFixed(1)), 0), 100) + "%";
                    gsap.set(y, {
                        width: p
                    })
                },
                transitionEnd(g) {
                    let f = $(".story__slider .swiper-pagination-progress"),
                        v = f.slice(0, g.realIndex),
                        b = f.slice(g.realIndex, f.length);
                    v.length && gsap.set(v, {
                        width: "100%"
                    }), b.length && gsap.set(b, {
                        width: "0%"
                    });
                    let y = document.querySelectorAll(".story__slider .swiper-slide")[g.realIndex];
                    y.querySelector("video") && (y.querySelector("video").currentTime = 0)
                }
            }
        }), s.init()
    }), $("#videoModal").on("hidden.bs.modal", function(m) {
        s && s.destroy(), $("#userComment").val(""), $(".story__modal").removeClass("full-height-popup"), $(".story__prev").removeClass("active-popup"), $(".story__next").removeClass("active-popup"), $(".story__product-popup-cta").addClass("active"), $(".story__product-popup").addClass("active"), E()
    });

    function n() {
        $(".products__landing-wrapper").addClass("active"), $(".products").addClass("hide")
    }

    function i() {
        $(".products__landing-wrapper").removeClass("active"), $(".products").removeClass("hide"), $(".search-input").val(""), u()
    }

    function r() {
        $(".products__single-wrapper").addClass("active")
    }

    function o() {
        $(".products__single-wrapper").removeClass("active")
    }

    function a() {
        $(".products__single-wrapper").addClass("active"), $(".products").addClass("hide")
    }

    function c() {
        $(".products__single-wrapper").removeClass("active"), $(".products").removeClass("hide")
    }

    function d() {
        $(".search__bar-wrapper").addClass("active"), $(".search-icon").addClass("hide")
    }

    function u() {
        $(".search__bar-wrapper").removeClass("active"), $(".search-icon").removeClass("hide")
    }
    $(".link-all-products").click(function() {
        n()
    }), $(".products__landing .back-link").click(function() {
        i()
    }), $(".open-landing-product").click(function() {
        r()
    }), $(".products__single .back-link").click(function() {
        o()
    }), $(".products__wrapper-stacked").click(function() {
        a()
    }), $(".products__single .back-link").click(function() {
        c(), n()
    }), $(".search-icon").click(function() {
        d()
    }), $(".btn-search-close").click(function() {
        u(), $(".search-input").val("")
    }),
        function() {
            var m = $(".qty-input");
            if (m.length) {
                var h = m.find(".product-qty"),
                    g = m.find(".qty-count"),
                    f = parseInt(h.attr("min")),
                    v = parseInt(h.attr("max"));
                h.change(function() {
                    var b = $(this),
                        y = b.siblings(".qty-count--minus"),
                        A = b.siblings(".qty-count--add"),
                        p = parseInt(b.val());
                    isNaN(p) || p <= f ? (b.val(f), y.attr("disabled", !0)) : (y.attr("disabled", !1), p >= v ? (b.val(v), A.attr("disabled", !0)) : (b.val(p), A.attr("disabled", !1)))
                }), g.click(function() {
                    var b = this.dataset.action,
                        y = $(this),
                        A = y.siblings(".product-qty"),
                        p = parseInt(A.val());
                    b == "add" ? (p += 1, p >= f + 1 && y.siblings(".qty-count--minus").attr("disabled", !1), p >= v && y.attr("disabled", !0)) : (p = p <= f ? f : p -= 1, p == f && y.attr("disabled", !0), p < v && y.siblings(".qty-count--add").attr("disabled", !1)), A.val(p)
                })
            }
        }();

    function E() {
        $(".story-popup").fadeOut(300), document.querySelectorAll(".story__slide video").forEach(h => {
            h.currentTime = t, h.play()
        }), s && (e = s.activeIndex, s.slideTo(e), s.autoplay.start()), $(".story__modal").removeClass("full-height-popup"), $(".story__prev").removeClass("active-popup"), $(".story__next").removeClass("active-popup")
    }
    $(".open-popup").on("click", function(m) {
        m.preventDefault(), $(this).hasClass("open-popup-h-full") ? $(".story__modal").addClass("full-height-popup") : $(".story__modal").removeClass("full-height-popup"), $(".story-popup").fadeIn(300), s && s.autoplay && s.autoplay.stop(), document.querySelectorAll(".story__slide video").forEach((g, f) => {
            g.paused || (t = g.currentTime), g.pause(), g.currentTime = t
        }), $(".story__prev").addClass("active-popup"), $(".story__next").addClass("active-popup")
    }), $(".story-popup__close").on("click", function() {
        E()
    }), $(".story__product-popup-cta").on("click", function() {
        $(this).toggleClass("active"), $(this).next(".story__product-popup").toggleClass("active")
    })
});