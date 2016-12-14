! function t(e, i, n) {
    function r(o, a) {
        if (!i[o]) {
            if (!e[o]) {
                var u = "function" == typeof require && require;
                if (!a && u) return u(o, !0);
                if (s) return s(o, !0);
                var l = new Error("Cannot find module '" + o + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var h = i[o] = {
                exports: {}
            };
            e[o][0].call(h.exports, function(t) {
                var i = e[o][1][t];
                return r(i ? i : t)
            }, h, h.exports, t, e, i, n)
        }
        return i[o].exports
    }
    for (var s = "function" == typeof require && require, o = 0; o < n.length; o++) r(n[o]);
    return r
}({
    1: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            o = t("./framework"),
            a = n(o),
            u = t("./config"),
            l = n(u),
            h = t("dom-classes"),
            c = n(h),
            f = t("dom-create-element"),
            d = n(f),
            p = t("jquery"),
            m = n(p),
            g = t("gsap");
        n(g);
        TweenLite.defaultEase = Power4.easeInOut;
        var v = function() {
            function t() {
                r(this, t), this.view = l["default"].$view
            }
            return s(t, [{
                key: "init",
                value: function() {
                    this.createDOM(), this.addEvents()
                }
            }, {
                key: "createDOM",
                value: function() {
                    this.logo = (0, d["default"])({
                        selector: "span",
                        styles: "btn-logo",
                        html: "Benjamin Guedj"
                    }), this.projects = (0, d["default"])({
                        selector: "span",
                        styles: "btn btn-projects",
                        html: '<div class="overflow-hidden"><span>Back to home</span><span>All projects</span><span>Close</span></div>'
                    }), this.about = (0, d["default"])({
                        selector: "span",
                        styles: "btn btn-about",
                        html: '<div class="overflow-hidden"><span>About</span><span>Close</span></div>'
                    }), l["default"].$body.insertBefore(this.about, this.view), l["default"].$body.insertBefore(this.projects, this.view), l["default"].$body.insertBefore(this.logo, this.view)
                }
            }, {
                key: "addEvents",
                value: function() {
                    (0, m["default"])(this.logo).on("click", function() {
                        return a["default"].go("/")
                    }), (0, m["default"])(this.about).on("click", function() {
                        c["default"].has(l["default"].$body, "is-about") ? a["default"].go("/") : a["default"].go("/about")
                    })
                }
            }]), t
        }();
        i["default"] = new v, e.exports = i["default"]
    }, {
        "./config": 3,
        "./framework": 4,
        "dom-classes": 32,
        "dom-create-element": 34,
        gsap: 43,
        jquery: 46
    }],
    2: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            o = t("../framework"),
            a = n(o),
            u = t("../config"),
            l = n(u),
            h = t("../utils"),
            c = n(h),
            f = t("../tweens"),
            d = n(f),
            p = t("dom-classes"),
            m = n(p),
            g = t("dom-create-element"),
            v = (n(g), t("../lib/overview")),
            y = n(v),
            T = t("underscore"),
            _ = n(T),
            b = t("gsap"),
            w = (n(b), t("../lib/SplitText")),
            S = n(w),
            x = t("jquery"),
            P = n(x);
        t("jquery-mousewheel")(P["default"]);
        var A = function() {
            function t(e) {
                r(this, t), this.createBound(), this.listener = e.listener, this.ui = e.ui, this.ui.projects = document.querySelector(".btn-projects"), this.ui.about = document.querySelector(".btn-about"), this.index = 0, this.percts = l["default"].percts(), this.interacting = !0, this.open = !1, this.state = !1, this.data = [], this.pos = {}, this.debouncedResize = _["default"].debounce(this.debounceResize, 300), this.init()
            }
            return s(t, [{
                key: "createBound",
                value: function() {
                    var t = this;
                    ["handler", "swipes", "scroll", "goToProject", "go", "goFromSlide"].forEach(function(e) {
                        return t[e] = t[e].bind(t)
                    })
                }
            }, {
                key: "init",
                value: function() {
                    var t = this;
                    this.split = new S["default"](this.ui.titleEl, {
                        type: "chars"
                    }), c["default"].js.sliceArray(this.ui.infosBg).forEach(function(e) {
                        var i = {
                            color: e.getAttribute("data-color"),
                            href: e.getAttribute("data-href")
                        };
                        t.data.push(i)
                    }), this.setColor(), this.setCurrent(), this.on()
                }
            }, {
                key: "goFromSlide",
                value: function(t) {
                    t.preventDefault(), m["default"].has(l["default"].$body, "is-ready") && (window.currentIndex = this.index, window.transitionSlide = !0, a["default"].go(this.data[this.index].href))
                }
            }, {
                key: "resize",
                value: function(t, e) {
                    this.getCache()
                }
            }, {
                key: "debounceResize",
                value: function(t, e) {
                    var i = this;
                    m["default"].has(l["default"].$body, "is-overview") ? ! function() {
                        var n = i.pos.scale,
                            r = .05;
                        c["default"].js.sliceArray(i.ui.slide).forEach(function(s, o) {
                            var a = o > i.index ? o - i.index : i.index - o,
                                u = t * (n + r) * a,
                                l = o === i.index ? 0 : o > i.index ? -Math.abs(u) : u;
                            TweenLite.set(s, {
                                x: l,
                                scale: n,
                                width: t,
                                clip: c["default"].css.getRect(0, t, e, 0)
                            })
                        }), TweenLite.set(i.ui.slide[i.index], {
                            x: 0
                        })
                    }() : (c["default"].js.sliceArray(this.ui.title).forEach(function(t, e) {
                        var n = d["default"].title(e, i.index);
                        TweenLite.set(t, {
                            x: n
                        })
                    }), c["default"].js.sliceArray(this.ui.slide).forEach(function(t, e) {
                        var n = d["default"].slide.x(e, i.index, i.ui.slide.length - 1),
                            r = d["default"].slide.clip(e, i.index, i.ui.slide.length - 1);
                        TweenLite.set(t, {
                            x: n,
                            clip: r
                        })
                    }), TweenLite.set(this.ui.infos, {
                        clip: c["default"].css.getRect(0, this.percts.fifty, l["default"].height, this.percts.ten)
                    }))
                }
            }, {
                key: "destroy",
                value: function() {
                    this.off(), this.removeEvents(), delete this.smooth, delete this.ui
                }
            }, {
                key: "getCache",
                value: function() {
                    this.pos = {}, this.percts = l["default"].percts(), this.pos.scale = .45, this.pos.scalandmargin = .5, this.pos.slide = {}, this.pos.slide.width = l["default"].width * this.pos.scale, this.pos.slide.half = this.pos.slide.width / 2, this.pos.cache = this.ui.titleEl[0].getBoundingClientRect()
                }
            }, {
                key: "addEvents",
                value: function() {
                    this.smooth = new y["default"]({
                        direction: "horizontal",
                        index: this.index,
                        section: this.ui.transform,
                        page: this.listener,
                        scale: this.ui.scale,
                        slide: this.ui.slide,
                        els: this.ui.ease,
                        title: this.ui.titleOverview,
                        vs: {
                            force: !0,
                            calcY: !0
                        },
                        easer: .1,
                        ease: .1
                    }), this.smooth.init({
                        index: this.index
                    }), (0, P["default"])(this.ui.slide).on("click", this.goToProject)
                }
            }, {
                key: "removeEvents",
                value: function() {
                    m["default"].remove(l["default"].$body, "is-overview"), this.smooth && this.smooth.destroy(), (0, P["default"])(this.ui.slide).off("click", this.goToProject)
                }
            }, {
                key: "handler",
                value: function(t) {
                    t.stopPropagation(), this.state || !m["default"].has(l["default"].$body, "is-ready") || m["default"].has(l["default"].$body, "js-prevent-menu") || (this.state = !0, m["default"].add(l["default"].$body, "js-prevent-menu"), this.open ? this.animateOut() : this.animateIn())
                }
            }, {
                key: "setOpenState",
                value: function() {
                    this.open = !this.open, this.open ? (this.off("overview"), this.addEvents()) : (this.on("overview"), this.removeEvents()), this.state = !1
                }
            }, {
                key: "on",
                value: function(t) {
                    (0, P["default"])(l["default"].$body).on("mousewheel", this.scroll), (0, P["default"])(this.ui.round).on("click", this.goFromSlide), (0, P["default"])(this.ui.titleEl).on("click", this.goFromSlide), t || (0, P["default"])(this.ui.projects).on("click", this.handler)
                }
            }, {
                key: "off",
                value: function(t) {
                    (0, P["default"])(l["default"].$body).off("mousewheel", this.scroll), (0, P["default"])(this.ui.round).off("click", this.goFromSlide), (0, P["default"])(this.ui.titleEl).off("click", this.goFromSlide), t || (0, P["default"])(this.ui.projects).off("click", this.handler)
                }
            }, {
                key: "scroll",
                value: function(t) {
                    if (!this.interacting) {
                        this.interacting = !0;
                        var e = t.originalEvent.wheelDelta / 120 > 0 ? "-" : "+";
                        this.calcIndex(e)
                    }
                }
            }, {
                key: "swipes",
                value: function(t) {
                    if (!this.interacting) {
                        this.interacting = !0;
                        var e = "panleft" === t.type ? "-" : "+";
                        this.calcIndex(e)
                    }
                }
            }, {
                key: "calcIndex",
                value: function(t) {
                    var e = this.index;
                    this.ui.slide.length;
                    "+" === t ? this.index != this.ui.slide.length - 1 && this.index++ : 0 != this.index && this.index--, this.direction = this.index > e ? "next" : "prev", this.tween(), this.setCurrent()
                }
            }, {
                key: "setCurrent",
                value: function() {
                    (0, P["default"])(this.ui.slide).removeClass("is-current"), (0, P["default"])(this.ui.slide[this.index]).addClass("is-current")
                }
            }, {
                key: "go",
                value: function(t) {
                    var e = t.currentTarget.getAttribute("data-href");
                    a["default"].go(e), this.off();
                    var i = new TimelineMax({
                        paused: !0
                    });
                    i.to(this.ui.round, .7, {
                        autoAlpha: 0
                    }), i.to(this.ui.index, .6, {
                        autoAlpha: 0,
                        ease: Expo.easeOut
                    }, 0), i.to(this.ui.infosLayer, .5, {
                        x: "-20%",
                        autoAlpha: 0
                    }, 0), i.to(this.ui.infos, 1.1, {
                        x: -Math.round(.1 * l["default"].width),
                        ease: Expo.easeInOut
                    }, 0), i.to(this.ui.infos, 1.1, {
                        clip: c["default"].css.getRect(0, 0, l["default"].height, 0),
                        ease: Expo.easeInOut
                    }, 0), i.to(this.ui.slide[this.index], 1.1, {
                        zIndex: 10,
                        x: 0
                    }, 0), i.to(this.ui.slide, 1.1, {
                        clip: c["default"].css.getRect(0, l["default"].width, l["default"].height, 0)
                    }, 0), i.staggerTo(this.ui.titleEl, 1, {
                        ease: Expo.easeInOut,
                        autoAlpha: 0,
                        cycle: {
                            y: [-l["default"].height, l["default"].height]
                        }
                    }, .01, 0), i.restart()
                }
            }, {
                key: "setColor",
                value: function() {
                    var t = this.data[parseInt(this.index)];
                    (0, P["default"])(".btn-hover").attr("data-color", t.color), l["default"].$body.setAttribute("data-color", t.color), this.ui.round.setAttribute("href", "/" + t.href), this.ui.round.style.background = "#" + t.color
                }
            }, {
                key: "tween",
                value: function() {
                    var t = this;
                    this.interacting = !0, this.setColor();
                    var e = new TimelineMax({
                        paused: !0,
                        onComplete: function() {
                            t.interacting = !1
                        }
                    });
                    this.index > 0 && (e.to(this.ui.span, .7, {
                        y: "100%"
                    }, 0), e.to(this.ui.bar, .6, {
                        x: -360
                    }, .2), e.to(this.ui.scroll, .3, {
                        autoAlpha: 0
                    }, 1)), e.staggerTo(this.ui.title, 1, {
                        cycle: {
                            display: function(e) {
                                return d["default"].display(e, t.index, t.ui.slide.length - 1)
                            },
                            x: function(e) {
                                return d["default"].title(e, t.index)
                            },
                            delay: function(e) {
                                return e == parseInt(t.index) + 1 || e == parseInt(t.index) - 1 ? 0 : .08
                            }
                        },
                        ease: Expo.easeInOut
                    }, 0, 0), e.staggerTo(this.ui.index, 1, {
                        cycle: {
                            autoAlpha: function(e) {
                                return d["default"].alpha(e, t.index)
                            },
                            x: function(e) {
                                return d["default"].text(e, t.index)
                            },
                            delay: function(e) {
                                return e == parseInt(t.index) + 1 || e == parseInt(t.index) - 1 ? 0 : .1
                            }
                        },
                        ease: Expo.easeInOut
                    }, 0, 0), e.staggerTo(this.ui.infosLayer, .6, {
                        cycle: {
                            autoAlpha: function(e) {
                                return d["default"].alpha(e, t.index)
                            },
                            delay: function(e) {
                                return e == parseInt(t.index) + 1 || e == parseInt(t.index) - 1 ? 0 : .1
                            }
                        },
                        ease: Expo.easeInOut
                    }, 0, .2), e.staggerTo(this.ui.infosLayer, .6, {
                        cycle: {
                            x: function(e) {
                                return d["default"].text(e, t.index)
                            },
                            delay: function(e) {
                                return e == parseInt(t.index) + 1 || e == parseInt(t.index) - 1 ? 0 : .1
                            }
                        },
                        ease: Expo.easeInOut
                    }, 0, .15), e.staggerTo(this.ui.infosBg, 1, {
                        cycle: {
                            x: function(e) {
                                return d["default"].infos(e, t.index)
                            },
                            delay: function(e) {
                                return e == parseInt(t.index) + 1 || e == parseInt(t.index) - 1 ? 0 : .07
                            }
                        },
                        ease: Expo.easeInOut
                    }, 0, 0), e.staggerTo(this.ui.slide, 1.2, {
                        cycle: {
                            display: function(e) {
                                return d["default"].display(e, t.index, t.ui.slide.length - 1)
                            },
                            x: function(e) {
                                return d["default"].slide.x(e, t.index, t.ui.slide.length - 1)
                            }
                        },
                        ease: Power4.easeInOut
                    }, 0, 0), e.staggerTo(this.ui.slide, .7, {
                        cycle: {
                            clip: function(e) {
                                return d["default"].slide.clip(e, t.index, t.ui.slide.length - 1)
                            }
                        },
                        ease: Power4.easeInOut
                    }, 0, 0), e.restart()
                }
            }, {
                key: "animateIn",
                value: function() {
                    var t = this;
                    m["default"].add(l["default"].$body, "is-overview"), m["default"].add(this.ui.projects, "is-active");
                    var e = this.pos.scale,
                        i = .05,
                        n = (.05 * l["default"].width, l["default"].width),
                        r = l["default"].height,
                        s = (this.pos.slide.width / 2, 1.2 * this.pos.cache.height);
                    this.setOpenState();
                    var o = new TimelineMax({
                        paused: !0,
                        onComplete: function() {
                            m["default"].remove(l["default"].$body, "js-prevent-menu")
                        }
                    });
                    o.to(this.ui.round, .3, {
                        x: this.percts.ten
                    }, 0), o.to(this.ui.span, .7, {
                        y: "100%"
                    }, .45), o.to(this.ui.bar, .6, {
                        x: -360
                    }, .45), o.to(this.ui.scroll, .3, {
                        autoAlpha: 0
                    }, 1), o.to(this.ui.slide, .78, {
                        display: "block",
                        scale: e,
                        clip: c["default"].css.getRect(0, n, r, 0)
                    }, 0), o.staggerTo(this.ui.slide, 1.2, {
                        cycle: {
                            x: function(r) {
                                var s = r > t.index ? r - t.index : t.index - r,
                                    o = n * (e + i) * s,
                                    a = r === t.index ? 0 : r > t.index ? -Math.abs(o) : o;
                                return a
                            }
                        }
                    }, 0, 0), o.to(this.ui.slide[this.index], 1.1, {
                        x: 0
                    }, 0), o.to(this.ui.index, .7, {
                        y: -150,
                        autoAlpha: 0,
                        ease: Expo.easeOut
                    }, .3), o.to(this.ui.infosLayer, .5, {
                        x: "-20%",
                        autoAlpha: 0
                    }, 0), o.to(this.ui.infos, 1, {
                        x: -Math.round(.1 * n),
                        ease: Expo.easeInOut
                    }, 0), o.to(this.ui.infos, 1, {
                        clip: c["default"].css.getRect(0, 0, r, this.percts.ten),
                        ease: Expo.easeInOut
                    }, 0), o.staggerTo(this.ui.titleEl, 1, {
                        ease: Expo.easeInOut,
                        cycle: {
                            y: [-(l["default"].height / 2) - s, l["default"].height / 2 + s]
                        }
                    }, .01, 0), o.staggerTo(this.ui.titleOverview, 1.2, {
                        autoAlpha: 1,
                        y: "0%",
                        ease: Expo.easeOut
                    }, .06, .45), o.set(this.ui.titlesContainer, {
                        display: "none"
                    }, 1), o.restart()
                }
            }, {
                key: "animateOut",
                value: function() {
                    var t = this;
                    m["default"].remove(this.ui.projects, "is-active"), m["default"].remove(this.ui.projects, "is-homepage"), m["default"].remove(l["default"].$body, "is-overview");
                    var e = this.index,
                        i = (l["default"].width, l["default"].height, !1);
                    c["default"].js.sliceArray(this.ui.slide).forEach(function(e, n) {
                        if (!i) {
                            var r = e.getBoundingClientRect();
                            r.left > 0 && r.right < l["default"].width && (t.index = n, i = !0)
                        }
                    }), this.smooth.off();
                    var n = l["default"].width * this.pos.scalandmargin,
                        r = this.index > e ? this.index - e : e - this.index,
                        s = this.index < e ? -Math.abs(n * r) : Math.abs(n * r);
                    this.smooth.easer = .4, this.smooth.ease = .5, this.smooth.pos.target = s, TweenLite.set(this.ui.transform, {
                        x: s
                    }), this.setColor(), this.setCurrent(), TweenMax.delayedCall(1.4, function() {
                        t.setOpenState()
                    });
                    var o = new TimelineMax({
                        paused: !0,
                        onComplete: function() {
                            m["default"].remove(l["default"].$body, "js-prevent-menu")
                        }
                    });
                    o.to(this.ui.transform, 1.1, {
                        x: 0
                    }, .3), o.staggerTo(this.ui.slide, 1.1, {
                        cycle: {
                            display: function(e) {
                                return d["default"].display(e, t.index, t.ui.slide.length - 1)
                            },
                            x: function(e) {
                                return d["default"].slide.x(e, t.index, t.ui.slide.length - 1)
                            },
                            clip: function(e) {
                                return d["default"].slide.clip(e, t.index, t.ui.slide.length - 1)
                            }
                        }
                    }, 0, .3), o.to(this.ui.slide, 1.1, {
                        scale: 1
                    }, .3), o.set(this.ui.titlesContainer, {
                        display: "block"
                    }, 0), o.staggerTo(this.ui.titleOverview, .6, {
                        autoAlpha: 0,
                        cycle: {
                            y: ["20%", "-20%"]
                        },
                        ease: Expo.easeInOut
                    }, 0, 0), o.staggerTo(this.ui.titleEl, .1, {
                        x: 0
                    }, 0, 0), o.staggerTo(this.ui.titleEl, 1.1, {
                        autoAlpha: 1,
                        y: 0,
                        ease: Expo.easeInOut
                    }, 0, .45), o.staggerTo(this.split.chars, .1, {
                        x: "0%",
                        autoAlpha: 1
                    }, 0, 0), o.staggerTo(this.ui.title, .1, {
                        cycle: {
                            display: function(e) {
                                return d["default"].display(e, t.index, t.ui.slide.length - 1)
                            },
                            x: function(e) {
                                return d["default"].title(e, t.index)
                            }
                        }
                    }, 0, 0), o.staggerTo(this.ui.index, .9, {
                        y: 0,
                        cycle: {
                            autoAlpha: function(e) {
                                return d["default"].alpha(e, t.index)
                            },
                            x: function(e) {
                                return d["default"].index(e, t.index)
                            }
                        }
                    }, 0, .3), o.to(this.ui.infos, .9, {
                        x: 0
                    }, .3), o.to(this.ui.infos, 1, {
                        clip: c["default"].css.getRect(0, this.percts.fifty, l["default"].height, this.percts.ten)
                    }, .3), o.staggerTo(this.ui.infosLayer, .9, {
                        cycle: {
                            autoAlpha: function(e) {
                                return d["default"].alpha(e, t.index)
                            },
                            x: function(e) {
                                return d["default"].text(e, t.index)
                            }
                        }
                    }, 0, .5), o.staggerTo(this.ui.infosBg, .1, {
                        ease: Expo.easeOut,
                        cycle: {
                            x: function(e) {
                                return d["default"].infos(e, t.index)
                            }
                        }
                    }, 0, 0), o.to(this.ui.round, .3, {
                        autoAlpha: 1,
                        x: 0,
                        clearProps: "transform"
                    }, 1), o.to(this.ui.scroll, .3, {
                        autoAlpha: 1
                    }, .6), o.to(this.ui.bar, 1.7, {
                        x: -180,
                        ease: Power4.easeInOut
                    }, 1.3), o.to(this.ui.span, 1.4, {
                        y: "0%"
                    }, 1.8), o.restart()
                }
            }, {
                key: "goToProject",
                value: function(t) {
                    var e = t.currentTarget,
                        i = e.getAttribute("data-href"),
                        n = e.getAttribute("data-slide"),
                        r = l["default"].width * this.pos.scalandmargin,
                        s = n > parseInt(this.index) ? n - this.index : this.index - n,
                        o = n < parseInt(this.index) ? -Math.abs(r * s) : Math.abs(r * s);
                    m["default"].add(l["default"].$body, "css-prevent-slide-hover"), m["default"].remove(this.ui.projects, "is-active"), this.smooth.off(), this.open = !1, this.smooth.easer = .2, this.smooth.ease = .1, this.smooth.pos.delta = 0, this.smooth.pos.target = o;
                    var u = new TimelineMax({
                        paused: !0,
                        onComplete: function() {
                            m["default"].remove(l["default"].$body, "is-overview"), a["default"].go(i)
                        }
                    });
                    u.to(this.ui.titlesContainer, .6, {
                        autoAlpha: 0
                    }), u.to(this.ui.slide, 1.3, {
                        clip: c["default"].css.getRect(0, 0, l["default"].height, 0)
                    }, 0), u.to(this.ui.slide[n], 1.7, {
                        zIndex: 20,
                        clip: c["default"].css.getRect(0, l["default"].width, l["default"].height, 0)
                    }, 0), u.to(this.ui.ease[n], 1.5, {
                        x: 0
                    }, 0), u.to(this.listener, 2, {
                        scale: 1,
                        ease: Expo.easeOut
                    }, 0), u.to(this.ui.scale, 1, {
                        scale: 1,
                        ease: Expo.easeOut,
                        clearProps: "all"
                    }, 0), u.to(this.ui.slide[n], 1.2, {
                        scale: 1
                    }, .4), u.restart()
                }
            }]), t
        }();
        i["default"] = A, e.exports = i["default"]
    }, {
        "../config": 3,
        "../framework": 4,
        "../lib/SplitText": 5,
        "../lib/overview": 6,
        "../tweens": 15,
        "../utils": 16,
        "dom-classes": 32,
        "dom-create-element": 34,
        gsap: 43,
        jquery: 46,
        "jquery-mousewheel": 45,
        underscore: 54
    }],
    3: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = t("dom-select"),
            r = {
                PATH: "",
                BASE: "/",
                $body: document.body,
                $view: n("#js-view"),
                width: window.innerWidth,
                height: window.innerHeight,
                percts: function() {
                    var t = {
                        five: Math.round(.05 * this.width),
                        ten: Math.round(.1 * this.width),
                        fourty: Math.round(.4 * this.width),
                        fifty: Math.round(.5 * this.width),
                        sixty: Math.round(.6 * this.width),
                        eightyfive: Math.round(.85 * this.width),
                        ninety: Math.round(.9 * this.width),
                        ninetyfive: Math.round(.95 * this.width)
                    };
                    return t
                },
                isMobile: !1
            };
        i["default"] = r, e.exports = i["default"]
    }, {
        "dom-select": 41
    }],
    4: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = t("bigwheel"),
            s = n(r),
            o = (0, s["default"])(function(e) {
                e({
                    initSection: t("./sections/preloader"),
                    routes: t("./routes")
                })
            });
        i["default"] = o, e.exports = i["default"]
    }, {
        "./routes": 9,
        "./sections/preloader": 13,
        bigwheel: 17
    }],
    5: [function(t, e, i) {
        (function(t) {
            "use strict";
            var i = "undefined" != typeof e && e.exports && "undefined" != typeof t ? t : window;
            ! function(t) {
                var e = t.GreenSockGlobals || t,
                    i = function b(t) {
                        var b, i = t.split("."),
                            n = e;
                        for (b = 0; b < i.length; b++) n[i[b]] = n = n[i[b]] || {};
                        return n
                    },
                    n = i("com.greensock.utils"),
                    r = function w(t) {
                        var e = t.nodeType,
                            i = "";
                        if (1 === e || 9 === e || 11 === e) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling) i += w(t)
                        } else if (3 === e || 4 === e) return t.nodeValue;
                        return i
                    },
                    s = document,
                    o = s.defaultView ? s.defaultView.getComputedStyle : function() {},
                    a = /([A-Z])/g,
                    u = function(t, e, i, n) {
                        var r;
                        return (i = i || o(t, null)) ? (t = i.getPropertyValue(e.replace(a, "-$1").toLowerCase()), r = t || i.length ? t : i[e]) : t.currentStyle && (i = t.currentStyle, r = i[e]), n ? r : parseInt(r, 10) || 0
                    },
                    l = function(t) {
                        return t.length && t[0] && (t[0].nodeType && t[0].style && !t.nodeType || t[0].length && t[0][0]) ? !0 : !1
                    },
                    h = function(t) {
                        var e, i, n, r = [],
                            s = t.length;
                        for (e = 0; s > e; e++)
                            if (i = t[e], l(i))
                                for (n = i.length, n = 0; n < i.length; n++) r.push(i[n]);
                            else r.push(i);
                        return r
                    },
                    c = ")eefec303079ad17405c",
                    f = /(?:<br>|<br\/>|<br \/>)/gi,
                    d = s.all && !s.addEventListener,
                    p = "<div style='position:relative;display:inline-block;" + (d ? "*display:inline;*zoom:1;'" : "'"),
                    m = function(t) {
                        t = t || "";
                        var e = -1 !== t.indexOf("++"),
                            i = 1;
                        return e && (t = t.split("++").join("")),
                            function() {
                                return p + (t ? " class='" + t + (e ? i++ : "") + "'>" : ">")
                            }
                    },
                    g = n.SplitText = e.SplitText = function(t, e) {
                        if ("string" == typeof t && (t = g.selector(t)), !t) throw "cannot split a null element.";
                        this.elements = l(t) ? h(t) : [t], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = e || {}, this.split(e)
                    },
                    v = function S(t, e, i) {
                        var n = t.nodeType;
                        if (1 === n || 9 === n || 11 === n)
                            for (t = t.firstChild; t; t = t.nextSibling) S(t, e, i);
                        else(3 === n || 4 === n) && (t.nodeValue = t.nodeValue.split(e).join(i))
                    },
                    y = function(t, e) {
                        for (var i = e.length; --i > -1;) t.push(e[i])
                    },
                    T = function x(t, e, i, n, a) {
                        f.test(t.innerHTML) && (t.innerHTML = t.innerHTML.replace(f, c));
                        var l, h, d, p, g, x, T, _, b, w, S, P, A, M, E = r(t),
                            C = e.type || e.split || "chars,words,lines",
                            O = -1 !== C.indexOf("lines") ? [] : null,
                            D = -1 !== C.indexOf("words"),
                            I = -1 !== C.indexOf("chars"),
                            k = "absolute" === e.position || e.absolute === !0,
                            G = k ? "&#173; " : " ",
                            R = -999,
                            B = o(t),
                            H = u(t, "paddingLeft", B),
                            L = u(t, "borderBottomWidth", B) + u(t, "borderTopWidth", B),
                            N = u(t, "borderLeftWidth", B) + u(t, "borderRightWidth", B),
                            j = u(t, "paddingTop", B) + u(t, "paddingBottom", B),
                            F = u(t, "paddingLeft", B) + u(t, "paddingRight", B),
                            X = u(t, "textAlign", B, !0),
                            V = t.clientHeight,
                            U = t.clientWidth,
                            W = "</div>",
                            z = m(e.wordsClass),
                            q = m(e.charsClass),
                            Y = -1 !== (e.linesClass || "").indexOf("++"),
                            $ = e.linesClass,
                            K = -1 !== E.indexOf("<"),
                            Q = !0,
                            Z = [],
                            J = [],
                            tt = [];
                        for (Y && ($ = $.split("++").join("")), K && (E = E.split("<").join("{{LT}}")), l = E.length, p = z(), g = 0; l > g; g++)
                            if (T = E.charAt(g), ")" === T && E.substr(g, 20) === c) p += (Q ? W : "") + "<BR/>", Q = !1, g !== l - 20 && E.substr(g + 20, 20) !== c && (p += " " + z(), Q = !0), g += 19;
                            else if (" " === T && " " !== E.charAt(g - 1) && g !== l - 1 && E.substr(g - 20, 20) !== c) {
                            for (p += Q ? W : "", Q = !1;
                                " " === E.charAt(g + 1);) p += G, g++;
                            (")" !== E.charAt(g + 1) || E.substr(g + 1, 20) !== c) && (p += G + z(), Q = !0)
                        } else p += I && " " !== T ? q() + T + "</div>" : T;
                        for (t.innerHTML = p + (Q ? W : ""), K && v(t, "{{LT}}", "<"), x = t.getElementsByTagName("*"), l = x.length, _ = [], g = 0; l > g; g++) _[g] = x[g];
                        if (O || k)
                            for (g = 0; l > g; g++) b = _[g], d = b.parentNode === t, (d || k || I && !D) && (w = b.offsetTop, O && d && w !== R && "BR" !== b.nodeName && (h = [], O.push(h), R = w), k && (b._x = b.offsetLeft, b._y = w, b._w = b.offsetWidth, b._h = b.offsetHeight), O && (D !== d && I || (h.push(b), b._x -= H), d && g && (_[g - 1]._wordEnd = !0), "BR" === b.nodeName && b.nextSibling && "BR" === b.nextSibling.nodeName && O.push([])));
                        for (g = 0; l > g; g++) b = _[g], d = b.parentNode === t, "BR" !== b.nodeName ? (k && (P = b.style, D || d || (b._x += b.parentNode._x, b._y += b.parentNode._y), P.left = b._x + "px", P.top = b._y + "px", P.position = "absolute", P.display = "block", P.width = b._w + 1 + "px", P.height = b._h + "px"), D ? d && "" !== b.innerHTML ? J.push(b) : I && Z.push(b) : d ? (t.removeChild(b), _.splice(g--, 1), l--) : !d && I && (w = !O && !k && b.nextSibling, t.appendChild(b), w || t.appendChild(s.createTextNode(" ")), Z.push(b))) : O || k ? (t.removeChild(b), _.splice(g--, 1), l--) : D || t.appendChild(b);
                        if (O) {
                            for (k && (S = s.createElement("div"), t.appendChild(S), A = S.offsetWidth + "px", w = S.offsetParent === t ? 0 : t.offsetLeft, t.removeChild(S)), P = t.style.cssText, t.style.cssText = "display:none;"; t.firstChild;) t.removeChild(t.firstChild);
                            for (M = !k || !D && !I, g = 0; g < O.length; g++) {
                                for (h = O[g], S = s.createElement("div"), S.style.cssText = "display:block;text-align:" + X + ";position:" + (k ? "absolute;" : "relative;"), $ && (S.className = $ + (Y ? g + 1 : "")), tt.push(S), l = h.length, x = 0; l > x; x++) "BR" !== h[x].nodeName && (b = h[x], S.appendChild(b), M && (b._wordEnd || D) && S.appendChild(s.createTextNode(" ")), k && (0 === x && (S.style.top = b._y + "px", S.style.left = H + w + "px"), b.style.top = "0px", w && (b.style.left = b._x - w + "px")));
                                0 === l && (S.innerHTML = "&nbsp;"), D || I || (S.innerHTML = r(S).split(String.fromCharCode(160)).join(" ")), k && (S.style.width = A, S.style.height = b._h + "px"), t.appendChild(S)
                            }
                            t.style.cssText = P
                        }
                        k && (V > t.clientHeight && (t.style.height = V - j + "px", t.clientHeight < V && (t.style.height = V + L + "px")), U > t.clientWidth && (t.style.width = U - F + "px", t.clientWidth < U && (t.style.width = U + N + "px"))), y(i, Z), y(n, J), y(a, tt)
                    },
                    _ = g.prototype;
                _.split = function(t) {
                    this.isSplit && this.revert(), this.vars = t || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
                    for (var e = this.elements.length; --e > -1;) this._originals[e] = this.elements[e].innerHTML, T(this.elements[e], this.vars, this.chars, this.words, this.lines);
                    return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this
                }, _.revert = function() {
                    if (!this._originals) throw "revert() call wasn't scoped properly.";
                    for (var t = this._originals.length; --t > -1;) this.elements[t].innerHTML = this._originals[t];
                    return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
                }, g.selector = t.$ || t.jQuery || function(e) {
                    var i = t.$ || t.jQuery;
                    return i ? (g.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
                }, g.version = "0.3.3"
            }(i),
            function(t) {
                var n = function() {
                    return (i.GreenSockGlobals || i)[t]
                };
                "function" == typeof define && define.amd ? define(["TweenLite"], n) : "undefined" != typeof e && e.exports && (e.exports = n())
            }("SplitText")
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    6: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            a = function(t, e, i) {
                for (var n = !0; n;) {
                    var r = t,
                        s = e,
                        o = i;
                    n = !1, null === r && (r = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(r, s);
                    if (void 0 !== a) {
                        if ("value" in a) return a.value;
                        var u = a.get;
                        if (void 0 === u) return;
                        return u.call(o)
                    }
                    var l = Object.getPrototypeOf(r);
                    if (null === l) return;
                    t = l, e = s, i = o, n = !0, a = l = void 0
                }
            },
            u = t("./smooth"),
            l = n(u),
            h = t("../config"),
            c = n(h),
            f = t("../utils"),
            d = n(f),
            p = t("jquery"),
            m = (n(p), function(t) {
                function e(t) {
                    r(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t), this.scale = 0, this.easer = t.easer, this.index = parseInt(t.index), this.dom.page = t.page, this.dom.scale = t.scale, this.dom.els = d["default"].js.sliceArray(t.els), this.dom.slide = d["default"].js.sliceArray(t.slide), this.dom.title = d["default"].js.sliceArray(t.title)
                }
                return s(e, t), o(e, [{
                    key: "init",
                    value: function(t) {
                        a(Object.getPrototypeOf(e.prototype), "init", this).call(this);
                        var i = t;
                        this.index = i.index
                    }
                }, {
                    key: "resize",
                    value: function() {
                        var t = .5 * c["default"].width * (this.dom.slide.length - (this.index + 1)),
                            i = .5 * c["default"].width * this.index;
                        this.pos.min = -Math.abs(i), this.bounding = Math.abs(t), a(Object.getPrototypeOf(e.prototype), "resize", this).call(this)
                    }
                }, {
                    key: "run",
                    value: function() {
                        this.scale += (Math.abs(this.pos.delta) - this.scale) * this.easer;
                        var t = Math.abs(this.pos.min) + this.bounding,
                            i = d["default"].js.clamp(.86, 1 - this.scale / t, 1).toFixed(3),
                            n = d["default"].js.clamp(.7, 1 - this.scale / 2500, 1).toFixed(3);
                        this.dom.section.style[this.prefix] = "translate3d(" + this.pos.current.toFixed(3) + "px,0,0)", this.dom.page.style[this.prefix] = "scale3d(" + i + "," + i + "," + i + ")", this.dom.scale.style[this.prefix] = "scale3d(" + n + "," + n + "," + n + ")", a(Object.getPrototypeOf(e.prototype), "run", this).call(this)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        a(Object.getPrototypeOf(e.prototype), "destroy", this).call(this), TweenLite.set(this.dom.section, {
                            x: 0
                        }), TweenLite.set(this.dom.page, {
                            x: "0%",
                            scale: 1
                        }), TweenLite.set(this.dom.scale, {
                            clearProps: "transform"
                        })
                    }
                }]), e
            }(l["default"]));
        i["default"] = m, e.exports = i["default"]
    }, {
        "../config": 3,
        "../utils": 16,
        "./smooth": 7,
        jquery: 46
    }],
    7: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            o = t("../config"),
            a = n(o),
            u = t("../utils"),
            l = n(u),
            h = t("dom-classes"),
            c = n(h),
            f = t("dom-create-element"),
            d = (n(f), t("virtual-scroll")),
            p = n(d),
            m = t("gsap"),
            g = (n(m), t("underscore")),
            v = n(g),
            y = t("prefix"),
            T = n(y),
            _ = t("jquery"),
            b = n(_),
            w = function() {
                function t(e) {
                    r(this, t), e = e || {}, this.createBound(), this.isMobile = a["default"].isMobile, this.direction = e.direction || "vertical", this.usevs = {
                        force: "undefined" != typeof e.vs ? e.vs.force : !1,
                        calcY: "undefined" != typeof e.vs ? e.vs.calcY : !1,
                        calcX: "undefined" != typeof e.vs ? e.vs.calcX : !1
                    }, this.vs = this.isMobile || this.usevs.force ? new p["default"]({
                        listener: e.listener || document,
                        mouseMultiplier: 1,
                        touchMultiplier: 1.8,
                        firefoxMultiplier: 2,
                        limitInertia: !1,
                        preventTouch: e.preventTouch || !0
                    }) : null, this.pos = {
                        current: 0,
                        lastCurrent: 0,
                        target: 0,
                        delta: 0,
                        min: 0,
                        height: a["default"].height,
                        direction: null,
                        lastDirection: null
                    }, this.dom = {
                        listener: e.listener || a["default"].$body,
                        section: e.section
                    }, this.cache = null, this.timer = null, this.bounding = 0, this.ease = e.ease || .075, this.debouncedDirect = v["default"].debounce(this.getDirection, 10), this.debouncedResize = v["default"].debounce(this.debounceResize, 300), this.prefix = (0, T["default"])("transform")
                }
                return s(t, [{
                    key: "createBound",
                    value: function() {
                        var t = this;
                        ["calc", "debounce", "resize"].forEach(function(e) {
                            return t[e] = t[e].bind(t)
                        })
                    }
                }, {
                    key: "init",
                    value: function() {
                        this.resize(), !this.usevs.force && this.addFakeScrollHeight(), this.addEvents(), this.scrollbar && this.addFakeScrollBar()
                    }
                }, {
                    key: "calc",
                    value: function(t) {
                        var e = this;
                        if (!c["default"].has(a["default"].$body, "lock-scroll")) {
                            clearTimeout(this.timer);
                            var i = "horizontal" == this.direction ? this.usevs.calcY === !0 ? t.deltaY || t.deltaX : t.deltaX : t.deltaY;
                            this.pos.delta = i, this.pos.target += -1 * i, this.pos.target = l["default"].js.clamp(this.pos.min, this.pos.target, this.bounding), this.debouncedDirect(), this.timer = setTimeout(function() {
                                e.pos.delta = 0
                            }, 200)
                        }
                    }
                }, {
                    key: "debounce",
                    value: function() {
                        this.pos.target = "vertical" == this.direction ? window.scrollY || window.pageYOffset : window.scrollX || window.pageXOffset, this.debouncedDirect()
                    }
                }, {
                    key: "getDirection",
                    value: function() {
                        this.pos.lastDirection = this.pos.direction, this.pos.direction = this.pos.current > this.pos.lastCurrent ? "down" : this.pos.current == this.pos.lastCurrent ? this.pos.lastDirection : "up", this.pos.lastCurrent = this.pos.current
                    }
                }, {
                    key: "run",
                    value: function() {
                        this.pos.current += (this.pos.target - this.pos.current) * this.ease
                    }
                }, {
                    key: "getTransform",
                    value: function(t) {
                        return "vertical" === this.direction ? "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0," + t + ",0,1)" : "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0," + -t + ",0,0,1)"
                    }
                }, {
                    key: "on",
                    value: function() {
                        this.vs.on(this.calc)
                    }
                }, {
                    key: "off",
                    value: function() {
                        this.vs.off(this.calc)
                    }
                }, {
                    key: "addEvents",
                    value: function() {
                        this.on(), (0, b["default"])(window).on("resize", this.resize), TweenLite.ticker.addEventListener("tick", this.run, this, !1, 1)
                    }
                }, {
                    key: "removeEvents",
                    value: function() {
                        this.off(), (0, b["default"])(window).off("resize", this.resize), TweenLite.ticker.removeEventListener("tick", this.run)
                    }
                }, {
                    key: "resize",
                    value: function() {
                        this.pos.height = a["default"].height, this.debouncedResize()
                    }
                }, {
                    key: "debounceResize",
                    value: function() {
                        if (!this.isMobile && !this.usevs.force && this.dom.scroll) {
                            var t = "vertical" === this.direction ? "height" : "width";
                            (0, b["default"])(this.dom.scroll).css(t, this.bounding)
                        }
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.removeEvents(), this.vs.destroy(), (0, b["default"])(this.dom.header).removeClass("is-hidden"), !this.isMobile && !this.usevs.force && this.dom.scroll && this.removeFakeScrollHeight()
                    }
                }]), t
            }();
        i["default"] = w, e.exports = i["default"]
    }, {
        "../config": 3,
        "../utils": 16,
        "dom-classes": 32,
        "dom-create-element": 34,
        gsap: 43,
        jquery: 46,
        prefix: 50,
        underscore: 54,
        "virtual-scroll": 56
    }],
    8: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        var r = t("mobile-detect"),
            s = n(r),
            o = t("./framework"),
            a = n(o),
            u = t("./app"),
            l = n(u),
            h = new s["default"](window.navigator.userAgent);
        h.mobile() ? window.location = "http://mobile.oursroux.com" : (a["default"].init(), l["default"].init())
    }, {
        "./app": 1,
        "./framework": 4,
        "mobile-detect": 48
    }],
    9: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = {
            "/": t("./sections/home"),
            "/home": {
                section: t("./sections/home")
            },
            "/about": {
                section: t("./sections/about")
            },
            "/project/:id": {
                section: t("./sections/section"),
                duplicate: !0
            },
            404: "/"
        };
        i["default"] = n, e.exports = i["default"]
    }, {
        "./sections/about": 10,
        "./sections/home": 12,
        "./sections/section": 14
    }],
    10: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            a = function(t, e, i) {
                for (var n = !0; n;) {
                    var r = t,
                        s = e,
                        o = i;
                    n = !1, null === r && (r = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(r, s);
                    if (void 0 !== a) {
                        if ("value" in a) return a.value;
                        var u = a.get;
                        if (void 0 === u) return;
                        return u.call(o)
                    }
                    var l = Object.getPrototypeOf(r);
                    if (null === l) return;
                    t = l, e = s, i = o, n = !0, a = l = void 0
                }
            },
            u = t("../framework"),
            l = (n(u), t("../config")),
            h = n(l),
            c = t("../utils"),
            f = n(c),
            d = t("dom-classes"),
            p = n(d),
            m = t("gsap"),
            g = (n(m), t("./default")),
            v = n(g),
            y = t("prefix"),
            T = n(y),
            _ = t("jquery"),
            b = n(_),
            w = function(t) {
                function e(t) {
                    r(this, e),
                        a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t), this.top = 0, this.current = 0, this.action = (0, b["default"])(".btn-about"), this.slug = "about", this.prefix = (0, T["default"])("transform")
                }
                return s(e, t), o(e, [{
                    key: "init",
                    value: function(t, i) {
                        a(Object.getPrototypeOf(e.prototype), "init", this).call(this, t, i), this.action.addClass("is-active")
                    }
                }, {
                    key: "dataAdded",
                    value: function(t) {
                        a(Object.getPrototypeOf(e.prototype), "dataAdded", this).call(this), this.addEvents(), t()
                    }
                }, {
                    key: "addEvents",
                    value: function() {
                        (0, b["default"])(window).on("scroll", this.debounced.bind(this)), TweenLite.ticker.addEventListener("tick", this.run, this)
                    }
                }, {
                    key: "removeEvents",
                    value: function() {
                        (0, b["default"])(window).off("scroll"), TweenLite.ticker.removeEventListener("tick", this.run)
                    }
                }, {
                    key: "run",
                    value: function() {
                        this.current += .2 * (this.top - this.current), this.ui.section.style[this.prefix] = "translate3d(0,-" + .1 * this.current + "px,0)"
                    }
                }, {
                    key: "debounced",
                    value: function() {
                        this.top = (0, b["default"])(window).scrollTop()
                    }
                }, {
                    key: "animateIn",
                    value: function(t, e) {
                        window.scrollTo(0, 0), p["default"].add(h["default"].$body, "is-" + this.slug), p["default"].add(h["default"].$body, "is-ready");
                        var i = t.previous && "/project/" === t.previous.route.substring(0, 9),
                            n = new TimelineMax({
                                paused: !0,
                                onCompleteScope: this,
                                onComplete: function() {
                                    p["default"].add(h["default"].$body, "overflow-scroll"), e()
                                }
                            });
                        n.to(this.ui.el, 1.4, {
                            autoAlpha: 1
                        }, i ? .3 : 0), n.to(this.ui.title, 1.1, {
                            autoAlpha: 1,
                            x: "0%",
                            y: "0%"
                        }, i ? .4 : .25), n.to(this.ui.stagger, 1, {
                            autoAlpha: 1,
                            y: "0%"
                        }, .5), n.restart(), f["default"].biggie.setPrevRoute(t)
                    }
                }, {
                    key: "animateOut",
                    value: function(t, e) {
                        this.action.removeClass("is-active"), p["default"].remove(h["default"].$body, "is-" + this.slug);
                        var i = new TimelineMax({
                            paused: !0,
                            onComplete: e
                        });
                        i.to(this.ui.title, .6, {
                            autoAlpha: 0,
                            y: "-70%"
                        }, 0), i.staggerTo(this.ui.stagger, .6, {
                            autoAlpha: 0,
                            x: "30%"
                        }, .01, 0), i.to(this.ui.alpha, .7, {
                            autoAlpha: 0,
                            x: "20%"
                        }, 0), i.restart()
                    }
                }, {
                    key: "destroy",
                    value: function(t, e) {
                        p["default"].remove(h["default"].$body, "overflow-scroll"), this.page.parentNode.removeChild(this.page), e()
                    }
                }]), e
            }(v["default"]);
        i["default"] = w, e.exports = i["default"]
    }, {
        "../config": 3,
        "../framework": 4,
        "../utils": 16,
        "./default": 11,
        "dom-classes": 32,
        gsap: 43,
        jquery: 46,
        prefix: 50
    }],
    11: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            o = t("../framework"),
            a = (n(o), t("../config")),
            u = n(a),
            l = t("../utils"),
            h = n(l),
            c = t("query-dom-components"),
            f = n(c),
            d = t("dom-select"),
            p = (n(d), t("dom-classes")),
            m = (n(p), t("underscore")),
            g = (n(m), function() {
                function t(e) {
                    r(this, t), e = e || {}, this.isMobile = u["default"].isMobile, this.view = u["default"].$view, this.page = null
                }
                return s(t, [{
                    key: "init",
                    value: function(t, e) {
                        var i = this,
                            n = this.view;
                        this.page = h["default"].biggie.loadPage(t, n, function() {
                            i.dataAdded(e)
                        })
                    }
                }, {
                    key: "dataAdded",
                    value: function() {
                        this.ui = (0, f["default"])({
                            el: this.page
                        })
                    }
                }, {
                    key: "resize",
                    value: function(t, e) {
                        u["default"].height = e, u["default"].width = t
                    }
                }]), t
            }());
        i["default"] = g, e.exports = i["default"]
    }, {
        "../config": 3,
        "../framework": 4,
        "../utils": 16,
        "dom-classes": 32,
        "dom-select": 41,
        "query-dom-components": 51,
        underscore: 54
    }],
    12: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            a = function(t, e, i) {
                for (var n = !0; n;) {
                    var r = t,
                        s = e,
                        o = i;
                    n = !1, null === r && (r = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(r, s);
                    if (void 0 !== a) {
                        if ("value" in a) return a.value;
                        var u = a.get;
                        if (void 0 === u) return;
                        return u.call(o)
                    }
                    var l = Object.getPrototypeOf(r);
                    if (null === l) return;
                    t = l, e = s, i = o, n = !0, a = l = void 0
                }
            },
            u = t("../framework"),
            l = (n(u), t("../config")),
            h = n(l),
            c = t("../utils"),
            f = n(c),
            d = t("../tweens"),
            p = n(d),
            m = t("dom-classes"),
            g = n(m),
            v = t("./default"),
            y = n(v),
            T = t("../components/menu"),
            _ = n(T),
            b = t("gsap"),
            w = (n(b), t("jquery")),
            S = n(w),
            x = function(t) {
                function e(t) {
                    r(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t), this.menu = null, this.hammer = null, this.slug = "home", this.percts = h["default"].percts(), this.animateInDone = !1
                }
                return s(e, t), o(e, [{
                    key: "createBound",
                    value: function() {
                        var t = this;
                        [].forEach(function(e) {
                            return t[e] = t[e].bind(t)
                        })
                    }
                }, {
                    key: "dataAdded",
                    value: function(t) {
                        var i = this;
                        a(Object.getPrototypeOf(e.prototype), "dataAdded", this).call(this), this.addEvents(), TweenLite.set(this.ui.slide, {
                            clip: f["default"].css.getRect(0, h["default"].width, h["default"].height, 0)
                        }), TweenLite.set(this.ui.infos, {
                            autoAlpha: 1,
                            clip: f["default"].css.getRect(0, 0, h["default"].height, 0)
                        }), TweenLite.set(this.ui.titleOverview, {
                            autoAlpha: 0
                        }), TweenLite.set(this.ui.index, {
                            autoAlpha: 0
                        }), TweenMax.staggerTo(this.ui.title, .1, {
                            cycle: {
                                x: function(t) {
                                    return p["default"].title(t, i.menu.index)
                                }
                            }
                        }, 0), TweenMax.staggerTo(this.ui.infosLayer, .1, {
                            autoAlpha: 0,
                            cycle: {
                                x: function(t) {
                                    return p["default"].infos(t, i.menu.index)
                                }
                            }
                        }, 0), t()
                    }
                }, {
                    key: "addEvents",
                    value: function() {
                        this.menu = new _["default"]({
                            listener: this.page,
                            ui: this.ui
                        })
                    }
                }, {
                    key: "removeEvents",
                    value: function() {
                        this.menu && this.menu.destroy(), delete this.menu, delete this.ui
                    }
                }, {
                    key: "animateIn",
                    value: function(t, e) {
                        var i = this;
                        g["default"].add(h["default"].$body, "is-" + this.slug);
                        var n = (h["default"].width, t.previous && t.previous.params.id ? (0, S["default"])('.slide[data-slug="' + t.previous.params.id + '"]').attr("data-slide") : 0);
                        if (this.menu.index = n, this.menu.setCurrent(), t.previous && t.previous.params.id) this.animateInDone = !0, this.menu.interacting = !1, this.menu.animateIn(), g["default"].add(h["default"].$body, "is-ready"), g["default"].add(this.page, "has-bg"), (0, S["default"])(".btn-projects").addClass("is-homepage"), e();
                        else {
                            t.previous && this.menu.setColor();
                            var r = new TimelineMax({
                                paused: !0,
                                onComplete: function() {
                                    i.animateInDone = !0, i.menu.interacting = !1, g["default"].add(h["default"].$body, "is-ready"), g["default"].add(i.page, "has-bg"), e()
                                }
                            });
                            r.to(this.page, 1, {
                                x: 0,
                                ease: Expo.easeOut
                            }, 0), r.staggerTo(this.ui.slide, 1.2, {
                                cycle: {
                                    x: function(t) {
                                        return p["default"].slide.x(t, i.menu.index, i.ui.slide.length - 1)
                                    },
                                    ease: Expo.easeOut
                                }
                            }, .01, 0), r.staggerTo(this.ui.titleEl, .77, {
                                x: "0%",
                                autoAlpha: 1
                            }, .08, .4), r.to(this.ui.infos, .8, {
                                clip: f["default"].css.getRect(0, this.percts.fifty, h["default"].height, 0),
                                ease: Expo.easeOut
                            }, .55), r.to(this.ui.infos, .5, {
                                clip: f["default"].css.getRect(0, this.percts.fifty, h["default"].height, this.percts.ten),
                                ease: Expo.easeOut
                            }, .95), r.staggerTo(this.ui.index, .7, {
                                cycle: {
                                    autoAlpha: function(t) {
                                        return p["default"].alpha(t, i.menu.index)
                                    },
                                    x: function(t) {
                                        return p["default"].infos(t, i.menu.index)
                                    }
                                }
                            }, 0, .55), r.staggerTo(this.ui.infosLayer, .6, {
                                cycle: {
                                    autoAlpha: function(t) {
                                        return p["default"].alpha(t, i.menu.index)
                                    }
                                }
                            }, 0, .96), r.staggerTo(this.ui.infosLayer, .5, {
                                cycle: {
                                    x: function(t) {
                                        return p["default"].text(t, i.menu.index)
                                    }
                                },
                                ease: Expo.easeOut
                            }, .1, 0), r.staggerTo(this.ui.infosBg, .8, {
                                cycle: {
                                    x: function(t) {
                                        return p["default"].infos(t, i.menu.index)
                                    }
                                }
                            }, 0, 0), r.staggerTo(this.ui.title, 1.3, {
                                cycle: {
                                    x: function(t) {
                                        return p["default"].title(t, i.menu.index)
                                    }
                                },
                                ease: Expo.easeInOut
                            }, .1, 0), r.staggerTo(this.menu.split.chars, .9, {
                                autoAlpha: 1,
                                x: "0%",
                                ease: Power4.easeOut
                            }, -.008, 0), r.from(this.ui.round, .6, {
                                x: this.percts.ten,
                                autoAlpha: 0,
                                ease: Expo.easeOut,
                                clearProps: "transform"
                            }, .6), r.to(this.ui.scroll, .3, {
                                autoAlpha: 1
                            }, 0), r.to(this.ui.bar, 1.4, {
                                x: -180,
                                ease: Power4.easeInOut
                            }, .6), r.to(this.ui.span, 1.1, {
                                y: "0%"
                            }, .9), r.restart()
                        }
                        f["default"].biggie.setPrevRoute(t)
                    }
                }, {
                    key: "animateOut",
                    value: function(t, e) {
                        g["default"].remove(h["default"].$body, "is-" + this.slug), g["default"].remove(h["default"].$body, "is-ready"), (0, S["default"])(".js-projects").removeClass("is-active");
                        var i = new TimelineMax({
                            paused: !0
                        });
                        if (i.to(this.ui.round, .7, {
                                autoAlpha: 0
                            }), i.to(this.ui.span, .7, {
                                y: "100%"
                            }, 0), i.to(this.ui.bar, .6, {
                                x: -360
                            }, .3), i.to(this.ui.scroll, .3, {
                                autoAlpha: 0
                            }, 1), "/project/" === t.route.substring(0, 9))
                            if (window.transitionSlide === !0) {
                                this.menu.pos.cache.height;
                                i.to(this.ui.index, .6, {
                                    autoAlpha: 0,
                                    ease: Expo.easeOut
                                }, 0), i.to(this.ui.infosLayer, .5, {
                                    x: "-20%",
                                    autoAlpha: 0
                                }, 0), i.to(this.ui.infos, 1.1, {
                                    x: -Math.round(.1 * h["default"].width),
                                    ease: Expo.easeInOut
                                }, 0), i.to(this.ui.infos, 1.1, {
                                    clip: f["default"].css.getRect(0, 0, h["default"].height, this.percts.ten),
                                    ease: Expo.easeInOut
                                }, 0), i.to(this.ui.slide[this.menu.index], 1.1, {
                                    x: 0
                                }, 0), i.to(this.ui.slide, 1.1, {
                                    clip: f["default"].css.getRect(0, h["default"].width, h["default"].height, 0)
                                }, 0), i.staggerTo(this.ui.titleEl, 1, {
                                    ease: Expo.easeInOut,
                                    cycle: {
                                        y: [-h["default"].height, h["default"].height]
                                    }
                                }, .01, 0), i.add(function() {
                                    e()
                                }, 1.1)
                            } else e();
                        else this.menu.open && i.staggerTo(this.ui.slide, .6, {
                            cycle: {
                                y: ["-10%", "10%"]
                            },
                            autoAlpha: 0
                        }, .1, 0), i.staggerTo(this.ui.titleEl, 1, {
                            cycle: {
                                y: ["100%", "-100%"]
                            },
                            autoAlpha: 0
                        }, .1, 0), i.add(function() {
                            e()
                        }, 1);
                        i.restart()
                    }
                }, {
                    key: "resize",
                    value: function(t, i) {
                        a(Object.getPrototypeOf(e.prototype), "resize", this).call(this, t, i), this.menu && this.menu.resize(t, i), this.menu && this.animateInDone && this.menu.debouncedResize(t, i)
                    }
                }, {
                    key: "destroy",
                    value: function(t, e) {
                        var i = this;
                        (0, S["default"])(".btn-projects").removeClass("is-active"), (0, S["default"])(".btn-projects").removeClass("is-homepage"), "/project/" === t.route.substring(0, 9) && 1 != window.transitionSlide ? TweenMax.delayedCall(.6, function() {
                            i.removeEvents(), i.page.parentNode.removeChild(i.page), e()
                        }) : (this.removeEvents(), this.page.parentNode.removeChild(this.page), e())
                    }
                }]), e
            }(y["default"]);
        i["default"] = x, e.exports = i["default"]
    }, {
        "../components/menu": 2,
        "../config": 3,
        "../framework": 4,
        "../tweens": 15,
        "../utils": 16,
        "./default": 11,
        "dom-classes": 32,
        gsap: 43,
        jquery: 46
    }],
    13: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            o = t("../config"),
            a = n(o),
            u = t("../utils"),
            l = n(u),
            h = t("dom-classes"),
            c = n(h),
            f = t("dom-create-element"),
            d = n(f),
            p = t("query-dom-components"),
            m = n(p),
            g = function() {
                function t(e) {
                    r(this, t), this.preloaded = e, this.view = a["default"].$view, this.el = null, this.isMobile = a["default"].isMobile = a["default"].width <= 1024 ? !0 : !1
                }
                return s(t, [{
                    key: "init",
                    value: function(t, e) {
                        c["default"].add(a["default"].$body, "is-loading"), this.createDOM(), e()
                    }
                }, {
                    key: "createDOM",
                    value: function() {
                        var t = this.view.firstChild;
                        this.el = (0, d["default"])({
                            selector: "div",
                            styles: "preloader",
                            html: '<div class="bar js-bar"></div><div class="corner js-corner"><span class="js-index"></span><p>Benjamin Guedj</br>French designer</p><p class="black js-black">Benjamin Guedj</br>French designer</p></div>'
                        }), this.view.insertBefore(this.el, t), this.dom = (0, m["default"])({
                            el: this.el
                        })
                    }
                }, {
                    key: "resize",
                    value: function(t, e) {
                        a["default"].width = t, a["default"].height = e
                    }
                }, {
                    key: "animateIn",
                    value: function(t, e) {
                        var i = this,
                            n = 60,
                            r = 0,
                            s = (a["default"].width, a["default"].height, new TimelineMax({
                                paused: !0
                            }));
                        s.set(this.dom.black, {
                            clip: l["default"].css.getRect(0, 0, 45, 0)
                        }), s.to(this.dom.bar, 2, {
                            x: "0%",
                            ease: Power4.easeInOut
                        }, 0), s.to(this.dom.black, .5, {
                            clip: l["default"].css.getRect(0, 135, 45, 0)
                        }, 1.06), s.to(this.el, 1, {
                            autoAlpha: 1
                        }), s.to(this.dom.black, .5, {
                            autoAlpha: 0
                        }, "-=0.4"), TweenMax.delayedCall(.5, function() {
                            var t = setInterval(function() {
                                n++, r++, r = Math.min(Math.max(r, 0), 100), 10 > r && (r = "0" + r), i.dom.index.innerHTML = r, 100 == r && (clearInterval(t), e(), i.preloaded())
                            }, 800 / n)
                        }), s.restart()
                    }
                }, {
                    key: "animateOut",
                    value: function(t, e) {
                        a["default"].width, a["default"].height;
                        e()
                    }
                }, {
                    key: "destroy",
                    value: function(t, e) {
                        var i = this;
                        c["default"].add(a["default"].$body, "is-loaded"), c["default"].remove(a["default"].$body, "is-loading");
                        var n = (a["default"].width, a["default"].height, new TimelineMax({
                            paused: !0,
                            onComplete: function() {
                                i.view.removeChild(i.el), delete i.ui, e()
                            }
                        }));
                        n.to(this.dom.corner, .4, {
                            autoAlpha: 0,
                            ease: Power4.easeOut
                        }), n.to(this.dom.bar, 1, {
                            x: "100%"
                        }, 0), n.restart()
                    }
                }]), t
            }();
        i["default"] = g, e.exports = i["default"]
    }, {
        "../config": 3,
        "../utils": 16,
        "dom-classes": 32,
        "dom-create-element": 34,
        "query-dom-components": 51
    }],
    14: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            a = function(t, e, i) {
                for (var n = !0; n;) {
                    var r = t,
                        s = e,
                        o = i;
                    n = !1, null === r && (r = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(r, s);
                    if (void 0 !== a) {
                        if ("value" in a) return a.value;
                        var u = a.get;
                        if (void 0 === u) return;
                        return u.call(o)
                    }
                    var l = Object.getPrototypeOf(r);
                    if (null === l) return;
                    t = l, e = s, i = o, n = !0, a = l = void 0
                }
            },
            u = t("../framework"),
            l = n(u),
            h = t("../config"),
            c = n(h),
            f = t("../utils"),
            d = n(f),
            p = t("dom-classes"),
            m = n(p),
            g = t("gsap"),
            v = (n(g), t("hammerjs")),
            y = n(v),
            T = t("./default"),
            _ = n(T),
            b = t("prefix"),
            w = n(b),
            S = t("jquery"),
            x = n(S),
            P = function(t) {
                function e(t) {
                    r(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t), this.createBound(), this.slug = "section", this.top = 0, this.current = 0, this.prefix = (0, w["default"])("transform"), this.pan = {
                        state: !1,
                        delta: 0,
                        pos: 0
                    }
                }
                return s(e, t), o(e, [{
                    key: "createBound",
                    value: function() {
                        var t = this;
                        ["addPan", "movePan", "cancelPan", "onTap"].forEach(function(e) {
                            return t[e] = t[e].bind(t)
                        })
                    }
                }, {
                    key: "dataAdded",
                    value: function(t) {
                        window.prevRoute && "/" === window.prevRoute && TweenLite.set(this.page, {
                            autoAlpha: 0
                        }), a(Object.getPrototypeOf(e.prototype), "dataAdded", this).call(this), this.addEvents(), window.scrollTo(0, 0), t()
                    }
                }, {
                    key: "addEvents",
                    value: function() {
                        this.hammer = new y["default"].Manager(this.ui.pull);
                        this.hammer.add(new y["default"].Pan({
                            threshold: 0,
                            pointers: 0
                        })), this.hammer.add(new y["default"].Tap), this.pan.pos = -Math.abs(c["default"].height - this.ui.pull.getBoundingClientRect().height), this.pan.href = this.ui.pull.getAttribute("data-href"), this.hammer.on("panstart", this.addPan), this.hammer.on("panmove", this.movePan), this.hammer.on("panend", this.cancelPan), this.hammer.on("tap", this.onTap), (0, x["default"])(".btn-projects").on("click", function(t) {
                            l["default"].go("/")
                        }), (0, x["default"])(window).on("scroll", this.debounced.bind(this)), TweenLite.ticker.addEventListener("tick", this.run, this)
                    }
                }, {
                    key: "removeEvents",
                    value: function() {
                        this.hammer.off("panstart", this.addPan), this.hammer.off("panmove", this.movePan), this.hammer.off("panend", this.cancelPan), this.hammer.off("tap", this.onTap), (0, x["default"])(this.ui.projects).off("click"), (0, x["default"])(window).off("scroll"), TweenLite.ticker.removeEventListener("tick", this.run), delete this.hammer, delete this.ui
                    }
                }, {
                    key: "run",
                    value: function() {
                        this.top > c["default"].height / 6 && m["default"].add(this.ui.alpha, "is-hidden"), this.top > c["default"].height ? m["default"].add(c["default"].$body, "dark-header") : m["default"].remove(c["default"].$body, "dark-header")
                    }
                }, {
                    key: "debounced",
                    value: function() {
                        this.top = (0, x["default"])(window).scrollTop()
                    }
                }, {
                    key: "onTap",
                    value: function() {
                        if (!this.pan.state) {
                            this.pan.state = !0, this.ui.next.style.display = "block", this.ui.mask.style.display = "block";
                            var t = this.pan.href,
                                e = new TimelineMax({
                                    paused: !0,
                                    onComplete: function() {
                                        l["default"].go(t)
                                    }
                                });
                            e.to(this.ui.mask, .5, {
                                opacity: 1
                            }), e.to(this.ui.end, .9, {
                                y: this.pan.pos,
                                ease: Expo.easeOut
                            }, 0), e.to(this.ui.next, .9, {
                                y: 0,
                                ease: Expo.easeOut
                            }, 0), e.restart()
                        }
                    }
                }, {
                    key: "addPan",
                    value: function(t) {
                        m["default"].add(c["default"].$body, "is-grabbing")
                    }
                }, {
                    key: "movePan",
                    value: function(t) {
                        this.pan.delta = t.deltaY;
                        var e = .45 * this.pan.delta,
                            i = c["default"].height + this.pan.delta;
                        if (Math.abs(e) > c["default"].height / 4) this.onTap();
                        else {
                            this.pan.state = !1;
                            var n = Math.round(Math.abs(this.pan.delta)),
                                r = d["default"].js.clamp(0, (0 + n / c["default"].height).toFixed(3), 1);
                            this.ui.next.style.display = "block", this.ui.mask.style.display = "block", this.ui.mask.style.opacity = r, TweenLite.set(this.ui.end, {
                                y: e
                            }), TweenLite.set(this.ui.next, {
                                y: i
                            })
                        }
                    }
                }, {
                    key: "cancelPan",
                    value: function(t) {
                        var e = this;
                        if (m["default"].remove(c["default"].$body, "is-grabbing"), !this.pan.state) {
                            var i = new TimelineMax({
                                paused: !0,
                                onComplete: function() {
                                    e.ui.next.style.display = "none", e.ui.mask.style.display = "none"
                                }
                            });
                            i.to(this.ui.mask, .9, {
                                opacity: 0
                            }), i.to(this.ui.end, .9, {
                                y: 0,
                                ease: Expo.easeOut
                            }, 0), i.to(this.ui.next, .9, {
                                y: c["default"].height,
                                ease: Expo.easeOut
                            }, 0), i.restart()
                        }
                    }
                }, {
                    key: "animateIn",
                    value: function(t, e) {
                        m["default"].add(c["default"].$body, "is-" + this.slug), m["default"].add(c["default"].$body, "is-ready");
                        var i = new TimelineMax({
                            paused: !0,
                            onComplete: function() {
                                m["default"].add(c["default"].$body, "overflow-scroll"), m["default"].remove(c["default"].$body, "css-prevent-slide-hover"), e()
                            }
                        });
                        window.prevRoute && "/" === window.prevRoute ? window.transitionSlide === !0 ? (i.set(this.page, {
                            autoAlpha: 1
                        }, 1), i.from(this.ui.title, 1, {
                            autoAlpha: 0
                        }, 1.2)) : i.to(this.page, .1, {
                            autoAlpha: 1
                        }, 0) : window.prevRoute && "/project/" === window.prevRoute.substring(0, 9) ? (i.to(this.page, .2, {
                            autoAlpha: 1
                        }), i.from(this.ui.title, .6, {
                            autoAlpha: 0
                        }, 0)) : i.from(this.page, 1.3, {
                            x: "-100%"
                        }, 0), i.to(this.ui.bar, 1, {
                            y: "0%"
                        }, 0), i.to(this.ui.scroll, 1, {
                            autoAlpha: 1
                        }, .2), i.restart(), window.transitionSlide = !1, d["default"].biggie.setPrevRoute(t)
                    }
                }, {
                    key: "animateOut",
                    value: function(t, e) {
                        if (m["default"].remove(c["default"].$body, "is-" + this.slug), m["default"].remove(c["default"].$body, "is-ready"), "/project/" === t.route.substring(0, 9)) e();
                        else {
                            var i = (0, x["default"])(window).scrollTop(),
                                n = new TimelineMax({
                                    paused: !0,
                                    onComplete: function() {
                                        m["default"].remove(c["default"].$body, "js-prevent-menu"), e()
                                    }
                                });
                            "/" === t.route ? (m["default"].add(c["default"].$body, "lock-scroll"), m["default"].add(c["default"].$body, "js-prevent-menu"), n.set(this.page, {
                                position: "fixed",
                                zIndex: 20,
                                top: -i
                            }, 0), n.to(this.page, 1, {
                                y: i
                            }, 0), n.to(this.ui.cover, 1.1, {
                                scale: .45,
                                ease: Expo.easeInOut
                            }), n.to(this.ui.scroll, 1, {
                                autoAlpha: 0
                            }, .6), n.to(this.ui.bar, .6, {
                                y: "100%"
                            }, .7), n.to(this.page, .3, {
                                autoAlpha: 0
                            })) : "/about" === t.route ? (n.set(this.page, {
                                position: "fixed",
                                zIndex: 20,
                                top: -i
                            }, 0), n.to(this.page, .8, {
                                y: i
                            }, 0)) : n.to(this.page, .7, {
                                autoAlpha: 0
                            }), n.restart()
                        }
                    }
                }, {
                    key: "destroy",
                    value: function(t, e) {
                        "/" === t.route && m["default"].remove(c["default"].$body, "lock-scroll"), this.page.parentNode.removeChild(this.page), m["default"].remove(c["default"].$body, "dark-header"), m["default"].remove(c["default"].$body, "overflow-scroll"), e()
                    }
                }]), e
            }(_["default"]);
        i["default"] = P, e.exports = i["default"]
    }, {
        "../config": 3,
        "../framework": 4,
        "../utils": 16,
        "./default": 11,
        "dom-classes": 32,
        gsap: 43,
        hammerjs: 44,
        jquery: 46,
        prefix: 50
    }],
    15: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = t("./config"),
            s = n(r),
            o = t("./utils"),
            a = n(o),
            u = {
                alpha: function(t, e) {
                    return t === parseInt(e) ? 1 : 0
                },
                display: function l(t, e) {
                    var l = t === parseInt(e) || t == parseInt(e) + 1 || t == parseInt(e) - 1 ? "block" : "none";
                    return l
                },
                title: function(t, e) {
                    var i = s["default"].percts();
                    return t === parseInt(e) ? -i.five : t < parseInt(e) ? i.ninety : i.ninetyfive * -(t - parseInt(e))
                },
                index: function(t, e) {
                    return t === parseInt(e) ? "0%" : t < parseInt(e) ? "100%" : "-100%"
                },
                infos: function(t, e) {
                    return t === parseInt(e) ? "0%" : t < parseInt(e) ? "100%" : "-80%"
                },
                text: function(t, e) {
                    return t === parseInt(e) ? "0%" : t < parseInt(e) ? "10%" : "-10%"
                },
                slide: {
                    x: function(t, e, i) {
                        var n = s["default"].percts(),
                            r = parseInt(e) === i,
                            o = t === parseInt(e) ? r ? 0 : n.ten : t < parseInt(e) ? s["default"].width : n.sixty * -(t - parseInt(e));
                        return o
                    },
                    clip: function(t, e, i) {
                        var n = s["default"].percts(),
                            r = parseInt(e) === i,
                            o = t === parseInt(e) ? a["default"].css.getRect(0, r ? s["default"].width : n.ninety, s["default"].height, 0) : a["default"].css.getRect(0, n.ninety, s["default"].height, 0);
                        return o
                    }
                }
            };
        i["default"] = u, e.exports = i["default"]
    }, {
        "./config": 3,
        "./utils": 16
    }],
    16: [function(t, e, i) {
        "use strict";

        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = t("dom-create-element"),
            s = n(r),
            o = t("please-ajax"),
            a = n(o),
            u = t("./config"),
            l = n(u),
            h = {
                css: {
                    getRect: function(t, e, i) {
                        void 0 === t && (t = 0);
                        var n = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3];
                        return "rect(" + t + "px, " + e + "px, " + i + "px, " + n + "px)"
                    }
                },
                js: {
                    sliceArray: function(t) {
                        return Array.prototype.slice.call(t, 0)
                    },
                    clamp: function(t, e, i) {
                        return Math.max(t, Math.min(e, i))
                    },
                    scrollTop: function() {
                        return window.pageYOffset ? window.pageYOffset : document.documentElement.clientHeight ? document.documentElement.scrollTop : document.body.scrollTop
                    }
                },
                biggie: {
                    setPrevRoute: function(t) {
                        window.prevRoute = t.route
                    },
                    getSlug: function(t) {
                        var e = t.route,
                            i = t.params.id;
                        "/" === e && (e = "/home"), i && (e = e.substring(0, e.length - 3), e += i);
                        var n = "404" === e ? e : e.substr(1),
                            r = n.split("/"),
                            s = r[0];
                        return {
                            route: n,
                            classe: s
                        }
                    },
                    createPage: function(t, e) {
                        var i = (0, s["default"])({
                            selector: "div",
                            id: "page-" + e,
                            styles: "page page-" + e
                        });
                        return i
                    },
                    loadPage: function(t, e, i) {
                        var n = h.biggie.getSlug(t),
                            r = h.biggie.createPage(t, n.classe),
                            s = l["default"].BASE + "rest/" + n.route;
                        return a["default"].get(s, {
                            success: function(t) {
                                r.innerHTML = t.data, i()
                            }
                        }), e.appendChild(r)
                    }
                }
            };
        i["default"] = h, e.exports = i["default"]
    }, {
        "./config": 3,
        "dom-create-element": 34,
        "please-ajax": 49
    }],
    17: [function(t, e, i) {
        (function(i) {
            function n(t) {
                return this instanceof n ? (this.settingsFunc = t, void u.call(this)) : new n(t)
            }
            var r = t("bw-vm"),
                s = t("bw-viewmediator"),
                o = t("bw-router"),
                a = t("dom-event"),
                u = t("events").EventEmitter;
            n.prototype = Object.create(u.prototype), n.prototype.init = function() {
                var t = function(t) {
                        var e = this.s = t;
                        if (void 0 === e) throw new Error("Your settings function must return a settings Object");
                        if (void 0 === e.routes) throw new Error("Your settings object must define routes");
                        e.autoResize = void 0 === e.autoResize ? !0 : e.autoResize, this.previousRoute = void 0, this.depth = [], this.vms = [], this.routes = {}, this.parseRoutes(t.routes), this.router = o(this.routes), this.router.on("route", this.show.bind(this)), this.router.on("route", this.emit.bind(this, "route")), e.autoResize && void 0 !== i.innerWidth && void 0 !== i.innerHeight && (a(i, "resize", this.onResize.bind(this)), this.onResize()), e.initSection ? this.show({
                            section: e.initSection.bind(void 0, this.router.init.bind(this.router))
                        }) : this.router.init()
                    }.bind(this),
                    e = this.settingsFunc(t);
                return e && e.then ? e.then(t) : e && e.routes && t(e), this
            }, n.prototype.parseRoutes = function(t, e) {
                var i = (e || "").split("/").length;
                this.vms.length < i && this.vms.push(r(this.s)), e = e || "";
                for (var n in t) "/" === n.charAt(0) ? (e && (t[n].parent = e), this.routes[e + n] = t[n], t[n].routes && (this.parseRoutes(t[n].routes, e + n), delete t[n].routes)) : this.routes[n] = t[n]
            }, n.prototype.go = function(t, e) {
                return this.router.go(t, e), this
            }, n.prototype.destroy = function() {
                this.router.removeAllListeners("route"), this.router.destroy()
            }, n.prototype.resize = function(t, e) {
                for (var i = 0; i < this.vms.length; i++) this.vms[i].resize(t, e)
            }, n.prototype.show = function(t) {
                var e = t.section,
                    i = t.route || {};
                if (i.previous = this.previousRoute, i.framework = this, i.route) {
                    for (var n = [this.rebuildRoute(i.route, t.path)], r = [e.section || e]; e.parent;) n.unshift(this.rebuildRoute(e.parent, t.path)), e = this.routes[e.parent], r.unshift(e.section || e);
                    var s = this.depth;
                    this.depth = n;
                    for (var o = Math.max(s.length, n.length), a = 0; o > a; a++) a > n.length - 1 ? this.vms[a].clear(i) : s[a] != n[a] && this.vms[a].show(this.parseSection(r[a]), i)
                } else this.vms[0].show(this.parseSection(e.section || e), i);
                this.previousRoute = t.route
            }, n.prototype.rebuildRoute = function(t, e) {
                var e = e.split("/");
                return e.length = t.split("/").length, e.join("/")
            }, n.prototype.parseSection = function(t) {
                if (Array.isArray(t)) {
                    for (var e = 0; e < t.length; e++) "function" == typeof t[e] && (t[e] = new t[e]);
                    return s.apply(void 0, t)
                }
                return "function" == typeof t ? new t : t
            }, n.prototype.onResize = function() {
                this.resize(i.innerWidth, i.innerHeight)
            }, e.exports = n
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "bw-router": 27,
        "bw-viewmediator": 18,
        "bw-vm": 19,
        "dom-event": 20,
        events: 26
    }],
    18: [function(t, e, i) {
        function n() {
            if (!(this instanceof n)) {
                var t = Object.create(n.prototype);
                return n.apply(t, arguments), t
            }
            this.items = Array.prototype.slice.call(arguments)
        }
        n.prototype = {
            init: function(t, e) {
                this.callAll("init", t, e)
            },
            resize: function(t, e) {
                for (var i = 0, n = this.items.length; n > i; i++) "function" == typeof this.items[i].resize && this.items[i].resize(t, e)
            },
            animateIn: function(t, e) {
                this.callAll("animateIn", t, e)
            },
            animateOut: function(t, e) {
                this.callAll("animateOut", t, e)
            },
            destroy: function(t, e) {
                this.callAll("destroy", t, e)
            },
            clear: function(t) {
                this.callAll("clear", data, t)
            },
            callAll: function(t, e, i) {
                function n() {
                    ++r === s && i()
                }
                var r = 0,
                    s = 0;
                this.items.forEach(function(e) {
                    "function" == typeof e[t] && s++
                }), 0 === s ? i() : this.items.forEach(function(i) {
                    "function" == typeof i[t] && i[t].call(i, e, n)
                })
            }
        }, e.exports = n
    }, {}],
    19: [function(t, e, i) {
        function n(t) {
            if (!(this instanceof n)) return new n(t);
            var e = this.s = t || {};
            e.overlap = void 0 === e.overlap ? !0 : e.overlap, e.width = e.width || 980, e.height = e.height || 570, this.cContent = null, this.nContent = null
        }
        var r = n.prototype = {
            show: function(t, e, i) {
                void 0 === i && "function" == typeof e && (i = e, e = null), this.data = e, t != this.nContent && t != this.cContent && (this.nContent && this.nContent.destroy && this.nContent.destroy(this.data, function() {}), this.nContent = t, t.init ? t.init(this.data, this.swap.bind(this, this.nContent, i)) : this.swap(this.nContent, i))
            },
            clear: function(t, e) {
                if (void 0 === e && "function" == typeof t && (e = t, t = null), this.data = t, this.nContent && this.nContent.destroy && this.nContent.destroy(this.data, function() {}), this.cContent) {
                    var i = function(t) {
                        t.destroy && t.destroy(this.data, function() {}), e && e(t)
                    }.bind(this, this.cContent);
                    this.cContent.animateOut ? this.cContent.animateOut(this.data, i) : i()
                }
            },
            resize: function(t, e) {
                var i = this.s;
                i.width = t, i.height = e, this.cContent && this.cContent.resize && this.cContent.resize(t, e)
            },
            swap: function(t, e) {
                if (t == this.nContent) {
                    var i, n = this.s,
                        r = this.cContent,
                        s = function() {
                            n.onEndAniIn && n.onEndAniIn(t, r), e && e(t, r)
                        },
                        o = function() {
                            n.onStartAniIn && n.onStartAniIn(t, this.cContent), this.cContent = t, this.nContent = null, t.animateIn ? t.animateIn(this.data, s) : s()
                        }.bind(this),
                        a = function() {
                            n.onStartAniOut && n.onStartAniOut(t, r), r.animateOut ? r.animateOut(this.data, i) : i()
                        }.bind(this),
                        u = function() {
                            n.onEndAniOut && n.onEndAniOut(t, r), r.destroy && r.destroy(this.data, function() {})
                        }.bind(this);
                    t.resize && t.resize(n.width, n.height), this.cContent ? (i = n.overlap ? u : function() {
                        u(), o()
                    }.bind(this), a(), n.overlap && o()) : o()
                }
            }
        };
        Object.defineProperty(r, "overlap", {
            get: function() {
                return this.s.overlap
            },
            set: function(t) {
                this.s.overlap = t
            }
        }), e.exports = n
    }, {}],
    20: [function(t, e, i) {
        function n(t, e, i, n) {
            if (t instanceof NodeList)
                for (var r = 0, o = t.length; o > r; r++) s(t[r], e, i, n);
            else s(t, e, i, n);
            return i
        }

        function r(t, e, i, n) {
            if (t instanceof NodeList)
                for (var r = 0, s = t.length; s > r; r++) o(t[r], e, i, n);
            else o(t, e, i, n);
            return i
        }

        function s(t, e, i, n) {
            (t.addEventListener || t.attachEvent).call(t, e, i, n)
        }

        function o(t, e, i, n) {
            (t.removeEventListener || t.detachEvent).call(t, e, i, n)
        }
        e.exports = n, e.exports.on = n, e.exports.off = r
    }, {}],
    21: [function(t, e, i) {
        "use strict";

        function n(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        }
        var r = Object.prototype.toString,
            s = Object.prototype.hasOwnProperty;
        e.exports = function(t) {
            if (!t) return console.warn("bindAll requires at least one argument.");
            var e = Array.prototype.slice.call(arguments, 1);
            if (0 === e.length)
                for (var i in t) s.call(t, i) && "function" == typeof t[i] && "[object Function]" == r.call(t[i]) && e.push(i);
            for (var o = 0; o < e.length; o++) {
                var a = e[o];
                t[a] = n(t[a], t)
            }
        }
    }, {}],
    22: [function(t, e, i) {
        (function(e) {
            function n() {
                function t() {}
                try {
                    var e = new Uint8Array(1);
                    return e.foo = function() {
                        return 42
                    }, e.constructor = t, 42 === e.foo() && e.constructor === t && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                } catch (i) {
                    return !1
                }
            }

            function r() {
                return s.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
            }

            function s(t) {
                return this instanceof s ? (this.length = 0, this.parent = void 0, "number" == typeof t ? o(this, t) : "string" == typeof t ? a(this, t, arguments.length > 1 ? arguments[1] : "utf8") : u(this, t)) : arguments.length > 1 ? new s(t, arguments[1]) : new s(t)
            }

            function o(t, e) {
                if (t = m(t, 0 > e ? 0 : 0 | g(e)), !s.TYPED_ARRAY_SUPPORT)
                    for (var i = 0; e > i; i++) t[i] = 0;
                return t
            }

            function a(t, e, i) {
                ("string" != typeof i || "" === i) && (i = "utf8");
                var n = 0 | y(e, i);
                return t = m(t, n), t.write(e, i), t
            }

            function u(t, e) {
                if (s.isBuffer(e)) return l(t, e);
                if (K(e)) return h(t, e);
                if (null == e) throw new TypeError("must start with number, buffer, array or string");
                if ("undefined" != typeof ArrayBuffer) {
                    if (e.buffer instanceof ArrayBuffer) return c(t, e);
                    if (e instanceof ArrayBuffer) return f(t, e)
                }
                return e.length ? d(t, e) : p(t, e)
            }

            function l(t, e) {
                var i = 0 | g(e.length);
                return t = m(t, i), e.copy(t, 0, 0, i), t
            }

            function h(t, e) {
                var i = 0 | g(e.length);
                t = m(t, i);
                for (var n = 0; i > n; n += 1) t[n] = 255 & e[n];
                return t
            }

            function c(t, e) {
                var i = 0 | g(e.length);
                t = m(t, i);
                for (var n = 0; i > n; n += 1) t[n] = 255 & e[n];
                return t
            }

            function f(t, e) {
                return s.TYPED_ARRAY_SUPPORT ? (e.byteLength, t = s._augment(new Uint8Array(e))) : t = c(t, new Uint8Array(e)), t
            }

            function d(t, e) {
                var i = 0 | g(e.length);
                t = m(t, i);
                for (var n = 0; i > n; n += 1) t[n] = 255 & e[n];
                return t
            }

            function p(t, e) {
                var i, n = 0;
                "Buffer" === e.type && K(e.data) && (i = e.data, n = 0 | g(i.length)), t = m(t, n);
                for (var r = 0; n > r; r += 1) t[r] = 255 & i[r];
                return t
            }

            function m(t, e) {
                s.TYPED_ARRAY_SUPPORT ? (t = s._augment(new Uint8Array(e)), t.__proto__ = s.prototype) : (t.length = e, t._isBuffer = !0);
                var i = 0 !== e && e <= s.poolSize >>> 1;
                return i && (t.parent = Q), t
            }

            function g(t) {
                if (t >= r()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
                return 0 | t
            }

            function v(t, e) {
                if (!(this instanceof v)) return new v(t, e);
                var i = new s(t, e);
                return delete i.parent, i
            }

            function y(t, e) {
                "string" != typeof t && (t = "" + t);
                var i = t.length;
                if (0 === i) return 0;
                for (var n = !1;;) switch (e) {
                    case "ascii":
                    case "binary":
                    case "raw":
                    case "raws":
                        return i;
                    case "utf8":
                    case "utf-8":
                        return V(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * i;
                    case "hex":
                        return i >>> 1;
                    case "base64":
                        return z(t).length;
                    default:
                        if (n) return V(t).length;
                        e = ("" + e).toLowerCase(), n = !0
                }
            }

            function T(t, e, i) {
                var n = !1;
                if (e = 0 | e, i = void 0 === i || i === 1 / 0 ? this.length : 0 | i, t || (t = "utf8"), 0 > e && (e = 0), i > this.length && (i = this.length), e >= i) return "";
                for (;;) switch (t) {
                    case "hex":
                        return D(this, e, i);
                    case "utf8":
                    case "utf-8":
                        return M(this, e, i);
                    case "ascii":
                        return C(this, e, i);
                    case "binary":
                        return O(this, e, i);
                    case "base64":
                        return A(this, e, i);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return I(this, e, i);
                    default:
                        if (n) throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(), n = !0
                }
            }

            function _(t, e, i, n) {
                i = Number(i) || 0;
                var r = t.length - i;
                n ? (n = Number(n), n > r && (n = r)) : n = r;
                var s = e.length;
                if (s % 2 !== 0) throw new Error("Invalid hex string");
                n > s / 2 && (n = s / 2);
                for (var o = 0; n > o; o++) {
                    var a = parseInt(e.substr(2 * o, 2), 16);
                    if (isNaN(a)) throw new Error("Invalid hex string");
                    t[i + o] = a
                }
                return o
            }

            function b(t, e, i, n) {
                return q(V(e, t.length - i), t, i, n)
            }

            function w(t, e, i, n) {
                return q(U(e), t, i, n)
            }

            function S(t, e, i, n) {
                return w(t, e, i, n)
            }

            function x(t, e, i, n) {
                return q(z(e), t, i, n)
            }

            function P(t, e, i, n) {
                return q(W(e, t.length - i), t, i, n)
            }

            function A(t, e, i) {
                return 0 === e && i === t.length ? Y.fromByteArray(t) : Y.fromByteArray(t.slice(e, i))
            }

            function M(t, e, i) {
                i = Math.min(t.length, i);
                for (var n = [], r = e; i > r;) {
                    var s = t[r],
                        o = null,
                        a = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
                    if (i >= r + a) {
                        var u, l, h, c;
                        switch (a) {
                            case 1:
                                128 > s && (o = s);
                                break;
                            case 2:
                                u = t[r + 1], 128 === (192 & u) && (c = (31 & s) << 6 | 63 & u, c > 127 && (o = c));
                                break;
                            case 3:
                                u = t[r + 1], l = t[r + 2], 128 === (192 & u) && 128 === (192 & l) && (c = (15 & s) << 12 | (63 & u) << 6 | 63 & l, c > 2047 && (55296 > c || c > 57343) && (o = c));
                                break;
                            case 4:
                                u = t[r + 1], l = t[r + 2], h = t[r + 3], 128 === (192 & u) && 128 === (192 & l) && 128 === (192 & h) && (c = (15 & s) << 18 | (63 & u) << 12 | (63 & l) << 6 | 63 & h, c > 65535 && 1114112 > c && (o = c))
                        }
                    }
                    null === o ? (o = 65533, a = 1) : o > 65535 && (o -= 65536, n.push(o >>> 10 & 1023 | 55296), o = 56320 | 1023 & o), n.push(o), r += a
                }
                return E(n)
            }

            function E(t) {
                var e = t.length;
                if (Z >= e) return String.fromCharCode.apply(String, t);
                for (var i = "", n = 0; e > n;) i += String.fromCharCode.apply(String, t.slice(n, n += Z));
                return i
            }

            function C(t, e, i) {
                var n = "";
                i = Math.min(t.length, i);
                for (var r = e; i > r; r++) n += String.fromCharCode(127 & t[r]);
                return n
            }

            function O(t, e, i) {
                var n = "";
                i = Math.min(t.length, i);
                for (var r = e; i > r; r++) n += String.fromCharCode(t[r]);
                return n
            }

            function D(t, e, i) {
                var n = t.length;
                (!e || 0 > e) && (e = 0), (!i || 0 > i || i > n) && (i = n);
                for (var r = "", s = e; i > s; s++) r += X(t[s]);
                return r
            }

            function I(t, e, i) {
                for (var n = t.slice(e, i), r = "", s = 0; s < n.length; s += 2) r += String.fromCharCode(n[s] + 256 * n[s + 1]);
                return r
            }

            function k(t, e, i) {
                if (t % 1 !== 0 || 0 > t) throw new RangeError("offset is not uint");
                if (t + e > i) throw new RangeError("Trying to access beyond buffer length")
            }

            function G(t, e, i, n, r, o) {
                if (!s.isBuffer(t)) throw new TypeError("buffer must be a Buffer instance");
                if (e > r || o > e) throw new RangeError("value is out of bounds");
                if (i + n > t.length) throw new RangeError("index out of range")
            }

            function R(t, e, i, n) {
                0 > e && (e = 65535 + e + 1);
                for (var r = 0, s = Math.min(t.length - i, 2); s > r; r++) t[i + r] = (e & 255 << 8 * (n ? r : 1 - r)) >>> 8 * (n ? r : 1 - r)
            }

            function B(t, e, i, n) {
                0 > e && (e = 4294967295 + e + 1);
                for (var r = 0, s = Math.min(t.length - i, 4); s > r; r++) t[i + r] = e >>> 8 * (n ? r : 3 - r) & 255
            }

            function H(t, e, i, n, r, s) {
                if (e > r || s > e) throw new RangeError("value is out of bounds");
                if (i + n > t.length) throw new RangeError("index out of range");
                if (0 > i) throw new RangeError("index out of range")
            }

            function L(t, e, i, n, r) {
                return r || H(t, e, i, 4, 3.4028234663852886e38, -3.4028234663852886e38), $.write(t, e, i, n, 23, 4), i + 4
            }

            function N(t, e, i, n, r) {
                return r || H(t, e, i, 8, 1.7976931348623157e308, -1.7976931348623157e308), $.write(t, e, i, n, 52, 8), i + 8
            }

            function j(t) {
                if (t = F(t).replace(tt, ""), t.length < 2) return "";
                for (; t.length % 4 !== 0;) t += "=";
                return t
            }

            function F(t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
            }

            function X(t) {
                return 16 > t ? "0" + t.toString(16) : t.toString(16)
            }

            function V(t, e) {
                e = e || 1 / 0;
                for (var i, n = t.length, r = null, s = [], o = 0; n > o; o++) {
                    if (i = t.charCodeAt(o), i > 55295 && 57344 > i) {
                        if (!r) {
                            if (i > 56319) {
                                (e -= 3) > -1 && s.push(239, 191, 189);
                                continue
                            }
                            if (o + 1 === n) {
                                (e -= 3) > -1 && s.push(239, 191, 189);
                                continue
                            }
                            r = i;
                            continue
                        }
                        if (56320 > i) {
                            (e -= 3) > -1 && s.push(239, 191, 189), r = i;
                            continue
                        }
                        i = (r - 55296 << 10 | i - 56320) + 65536
                    } else r && (e -= 3) > -1 && s.push(239, 191, 189);
                    if (r = null, 128 > i) {
                        if ((e -= 1) < 0) break;
                        s.push(i)
                    } else if (2048 > i) {
                        if ((e -= 2) < 0) break;
                        s.push(i >> 6 | 192, 63 & i | 128)
                    } else if (65536 > i) {
                        if ((e -= 3) < 0) break;
                        s.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
                    } else {
                        if (!(1114112 > i)) throw new Error("Invalid code point");
                        if ((e -= 4) < 0) break;
                        s.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
                    }
                }
                return s
            }

            function U(t) {
                for (var e = [], i = 0; i < t.length; i++) e.push(255 & t.charCodeAt(i));
                return e
            }

            function W(t, e) {
                for (var i, n, r, s = [], o = 0; o < t.length && !((e -= 2) < 0); o++) i = t.charCodeAt(o), n = i >> 8, r = i % 256, s.push(r), s.push(n);
                return s
            }

            function z(t) {
                return Y.toByteArray(j(t))
            }

            function q(t, e, i, n) {
                for (var r = 0; n > r && !(r + i >= e.length || r >= t.length); r++) e[r + i] = t[r];
                return r
            }
            var Y = t("base64-js"),
                $ = t("ieee754"),
                K = t("is-array");
            i.Buffer = s, i.SlowBuffer = v, i.INSPECT_MAX_BYTES = 50, s.poolSize = 8192;
            var Q = {};
            s.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : n(), s.TYPED_ARRAY_SUPPORT && (s.prototype.__proto__ = Uint8Array.prototype, s.__proto__ = Uint8Array), s.isBuffer = function(t) {
                return !(null == t || !t._isBuffer)
            }, s.compare = function(t, e) {
                if (!s.isBuffer(t) || !s.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                if (t === e) return 0;
                for (var i = t.length, n = e.length, r = 0, o = Math.min(i, n); o > r && t[r] === e[r];) ++r;
                return r !== o && (i = t[r], n = e[r]), n > i ? -1 : i > n ? 1 : 0
            }, s.isEncoding = function(t) {
                switch (String(t).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "binary":
                    case "base64":
                    case "raw":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, s.concat = function(t, e) {
                if (!K(t)) throw new TypeError("list argument must be an Array of Buffers.");
                if (0 === t.length) return new s(0);
                var i;
                if (void 0 === e)
                    for (e = 0, i = 0; i < t.length; i++) e += t[i].length;
                var n = new s(e),
                    r = 0;
                for (i = 0; i < t.length; i++) {
                    var o = t[i];
                    o.copy(n, r), r += o.length
                }
                return n
            }, s.byteLength = y, s.prototype.length = void 0, s.prototype.parent = void 0, s.prototype.toString = function() {
                var t = 0 | this.length;
                return 0 === t ? "" : 0 === arguments.length ? M(this, 0, t) : T.apply(this, arguments)
            }, s.prototype.equals = function(t) {
                if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                return this === t ? !0 : 0 === s.compare(this, t)
            }, s.prototype.inspect = function() {
                var t = "",
                    e = i.INSPECT_MAX_BYTES;
                return this.length > 0 && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">"
            }, s.prototype.compare = function(t) {
                if (!s.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                return this === t ? 0 : s.compare(this, t)
            }, s.prototype.indexOf = function(t, e) {
                function i(t, e, i) {
                    for (var n = -1, r = 0; i + r < t.length; r++)
                        if (t[i + r] === e[-1 === n ? 0 : r - n]) {
                            if (-1 === n && (n = r), r - n + 1 === e.length) return i + n
                        } else n = -1;
                    return -1
                }
                if (e > 2147483647 ? e = 2147483647 : -2147483648 > e && (e = -2147483648), e >>= 0, 0 === this.length) return -1;
                if (e >= this.length) return -1;
                if (0 > e && (e = Math.max(this.length + e, 0)), "string" == typeof t) return 0 === t.length ? -1 : String.prototype.indexOf.call(this, t, e);
                if (s.isBuffer(t)) return i(this, t, e);
                if ("number" == typeof t) return s.TYPED_ARRAY_SUPPORT && "function" === Uint8Array.prototype.indexOf ? Uint8Array.prototype.indexOf.call(this, t, e) : i(this, [t], e);
                throw new TypeError("val must be string, number or Buffer")
            }, s.prototype.get = function(t) {
                return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(t)
            }, s.prototype.set = function(t, e) {
                return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(t, e)
            }, s.prototype.write = function(t, e, i, n) {
                if (void 0 === e) n = "utf8", i = this.length, e = 0;
                else if (void 0 === i && "string" == typeof e) n = e, i = this.length, e = 0;
                else if (isFinite(e)) e = 0 | e, isFinite(i) ? (i = 0 | i, void 0 === n && (n = "utf8")) : (n = i, i = void 0);
                else {
                    var r = n;
                    n = e, e = 0 | i, i = r
                }
                var s = this.length - e;
                if ((void 0 === i || i > s) && (i = s), t.length > 0 && (0 > i || 0 > e) || e > this.length) throw new RangeError("attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var o = !1;;) switch (n) {
                    case "hex":
                        return _(this, t, e, i);
                    case "utf8":
                    case "utf-8":
                        return b(this, t, e, i);
                    case "ascii":
                        return w(this, t, e, i);
                    case "binary":
                        return S(this, t, e, i);
                    case "base64":
                        return x(this, t, e, i);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return P(this, t, e, i);
                    default:
                        if (o) throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(), o = !0
                }
            }, s.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var Z = 4096;
            s.prototype.slice = function(t, e) {
                var i = this.length;
                t = ~~t, e = void 0 === e ? i : ~~e, 0 > t ? (t += i, 0 > t && (t = 0)) : t > i && (t = i), 0 > e ? (e += i, 0 > e && (e = 0)) : e > i && (e = i), t > e && (e = t);
                var n;
                if (s.TYPED_ARRAY_SUPPORT) n = s._augment(this.subarray(t, e));
                else {
                    var r = e - t;
                    n = new s(r, void 0);
                    for (var o = 0; r > o; o++) n[o] = this[o + t]
                }
                return n.length && (n.parent = this.parent || this), n
            }, s.prototype.readUIntLE = function(t, e, i) {
                t = 0 | t, e = 0 | e, i || k(t, e, this.length);
                for (var n = this[t], r = 1, s = 0; ++s < e && (r *= 256);) n += this[t + s] * r;
                return n
            }, s.prototype.readUIntBE = function(t, e, i) {
                t = 0 | t, e = 0 | e, i || k(t, e, this.length);
                for (var n = this[t + --e], r = 1; e > 0 && (r *= 256);) n += this[t + --e] * r;
                return n
            }, s.prototype.readUInt8 = function(t, e) {
                return e || k(t, 1, this.length), this[t]
            }, s.prototype.readUInt16LE = function(t, e) {
                return e || k(t, 2, this.length), this[t] | this[t + 1] << 8
            }, s.prototype.readUInt16BE = function(t, e) {
                return e || k(t, 2, this.length), this[t] << 8 | this[t + 1]
            }, s.prototype.readUInt32LE = function(t, e) {
                return e || k(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
            }, s.prototype.readUInt32BE = function(t, e) {
                return e || k(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
            }, s.prototype.readIntLE = function(t, e, i) {
                t = 0 | t, e = 0 | e, i || k(t, e, this.length);
                for (var n = this[t], r = 1, s = 0; ++s < e && (r *= 256);) n += this[t + s] * r;
                return r *= 128, n >= r && (n -= Math.pow(2, 8 * e)), n
            }, s.prototype.readIntBE = function(t, e, i) {
                t = 0 | t, e = 0 | e, i || k(t, e, this.length);
                for (var n = e, r = 1, s = this[t + --n]; n > 0 && (r *= 256);) s += this[t + --n] * r;
                return r *= 128, s >= r && (s -= Math.pow(2, 8 * e)), s
            }, s.prototype.readInt8 = function(t, e) {
                return e || k(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            }, s.prototype.readInt16LE = function(t, e) {
                e || k(t, 2, this.length);
                var i = this[t] | this[t + 1] << 8;
                return 32768 & i ? 4294901760 | i : i
            }, s.prototype.readInt16BE = function(t, e) {
                e || k(t, 2, this.length);
                var i = this[t + 1] | this[t] << 8;
                return 32768 & i ? 4294901760 | i : i
            }, s.prototype.readInt32LE = function(t, e) {
                return e || k(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
            }, s.prototype.readInt32BE = function(t, e) {
                return e || k(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
            }, s.prototype.readFloatLE = function(t, e) {
                return e || k(t, 4, this.length), $.read(this, t, !0, 23, 4)
            }, s.prototype.readFloatBE = function(t, e) {
                return e || k(t, 4, this.length), $.read(this, t, !1, 23, 4)
            }, s.prototype.readDoubleLE = function(t, e) {
                return e || k(t, 8, this.length), $.read(this, t, !0, 52, 8)
            }, s.prototype.readDoubleBE = function(t, e) {
                return e || k(t, 8, this.length), $.read(this, t, !1, 52, 8)
            }, s.prototype.writeUIntLE = function(t, e, i, n) {
                t = +t, e = 0 | e, i = 0 | i, n || G(this, t, e, i, Math.pow(2, 8 * i), 0);
                var r = 1,
                    s = 0;
                for (this[e] = 255 & t; ++s < i && (r *= 256);) this[e + s] = t / r & 255;
                return e + i
            }, s.prototype.writeUIntBE = function(t, e, i, n) {
                t = +t, e = 0 | e, i = 0 | i, n || G(this, t, e, i, Math.pow(2, 8 * i), 0);
                var r = i - 1,
                    s = 1;
                for (this[e + r] = 255 & t; --r >= 0 && (s *= 256);) this[e + r] = t / s & 255;
                return e + i
            }, s.prototype.writeUInt8 = function(t, e, i) {
                return t = +t, e = 0 | e, i || G(this, t, e, 1, 255, 0), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
            }, s.prototype.writeUInt16LE = function(t, e, i) {
                return t = +t, e = 0 | e, i || G(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : R(this, t, e, !0), e + 2
            }, s.prototype.writeUInt16BE = function(t, e, i) {
                return t = +t, e = 0 | e, i || G(this, t, e, 2, 65535, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : R(this, t, e, !1), e + 2
            }, s.prototype.writeUInt32LE = function(t, e, i) {
                return t = +t, e = 0 | e, i || G(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : B(this, t, e, !0), e + 4
            }, s.prototype.writeUInt32BE = function(t, e, i) {
                return t = +t, e = 0 | e, i || G(this, t, e, 4, 4294967295, 0), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : B(this, t, e, !1), e + 4
            }, s.prototype.writeIntLE = function(t, e, i, n) {
                if (t = +t, e = 0 | e, !n) {
                    var r = Math.pow(2, 8 * i - 1);
                    G(this, t, e, i, r - 1, -r)
                }
                var s = 0,
                    o = 1,
                    a = 0 > t ? 1 : 0;
                for (this[e] = 255 & t; ++s < i && (o *= 256);) this[e + s] = (t / o >> 0) - a & 255;
                return e + i
            }, s.prototype.writeIntBE = function(t, e, i, n) {
                if (t = +t, e = 0 | e, !n) {
                    var r = Math.pow(2, 8 * i - 1);
                    G(this, t, e, i, r - 1, -r)
                }
                var s = i - 1,
                    o = 1,
                    a = 0 > t ? 1 : 0;
                for (this[e + s] = 255 & t; --s >= 0 && (o *= 256);) this[e + s] = (t / o >> 0) - a & 255;
                return e + i
            }, s.prototype.writeInt8 = function(t, e, i) {
                return t = +t, e = 0 | e, i || G(this, t, e, 1, 127, -128), s.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), 0 > t && (t = 255 + t + 1), this[e] = 255 & t, e + 1
            }, s.prototype.writeInt16LE = function(t, e, i) {
                return t = +t, e = 0 | e, i || G(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : R(this, t, e, !0), e + 2
            }, s.prototype.writeInt16BE = function(t, e, i) {
                return t = +t, e = 0 | e, i || G(this, t, e, 2, 32767, -32768), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : R(this, t, e, !1), e + 2
            }, s.prototype.writeInt32LE = function(t, e, i) {
                return t = +t, e = 0 | e, i || G(this, t, e, 4, 2147483647, -2147483648), s.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : B(this, t, e, !0), e + 4
            }, s.prototype.writeInt32BE = function(t, e, i) {
                return t = +t, e = 0 | e, i || G(this, t, e, 4, 2147483647, -2147483648), 0 > t && (t = 4294967295 + t + 1), s.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : B(this, t, e, !1), e + 4
            }, s.prototype.writeFloatLE = function(t, e, i) {
                return L(this, t, e, !0, i)
            }, s.prototype.writeFloatBE = function(t, e, i) {
                return L(this, t, e, !1, i)
            }, s.prototype.writeDoubleLE = function(t, e, i) {
                return N(this, t, e, !0, i)
            }, s.prototype.writeDoubleBE = function(t, e, i) {
                return N(this, t, e, !1, i)
            }, s.prototype.copy = function(t, e, i, n) {
                if (i || (i = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && i > n && (n = i), n === i) return 0;
                if (0 === t.length || 0 === this.length) return 0;
                if (0 > e) throw new RangeError("targetStart out of bounds");
                if (0 > i || i >= this.length) throw new RangeError("sourceStart out of bounds");
                if (0 > n) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length), t.length - e < n - i && (n = t.length - e + i);
                var r, o = n - i;
                if (this === t && e > i && n > e)
                    for (r = o - 1; r >= 0; r--) t[r + e] = this[r + i];
                else if (1e3 > o || !s.TYPED_ARRAY_SUPPORT)
                    for (r = 0; o > r; r++) t[r + e] = this[r + i];
                else t._set(this.subarray(i, i + o), e);
                return o
            }, s.prototype.fill = function(t, e, i) {
                if (t || (t = 0), e || (e = 0), i || (i = this.length), e > i) throw new RangeError("end < start");
                if (i !== e && 0 !== this.length) {
                    if (0 > e || e >= this.length) throw new RangeError("start out of bounds");
                    if (0 > i || i > this.length) throw new RangeError("end out of bounds");
                    var n;
                    if ("number" == typeof t)
                        for (n = e; i > n; n++) this[n] = t;
                    else {
                        var r = V(t.toString()),
                            s = r.length;
                        for (n = e; i > n; n++) this[n] = r[n % s]
                    }
                    return this
                }
            }, s.prototype.toArrayBuffer = function() {
                if ("undefined" != typeof Uint8Array) {
                    if (s.TYPED_ARRAY_SUPPORT) return new s(this).buffer;
                    for (var t = new Uint8Array(this.length), e = 0, i = t.length; i > e; e += 1) t[e] = this[e];
                    return t.buffer
                }
                throw new TypeError("Buffer.toArrayBuffer not supported in this browser")
            };
            var J = s.prototype;
            s._augment = function(t) {
                return t.constructor = s, t._isBuffer = !0, t._set = t.set, t.get = J.get, t.set = J.set, t.write = J.write, t.toString = J.toString, t.toLocaleString = J.toString, t.toJSON = J.toJSON, t.equals = J.equals, t.compare = J.compare, t.indexOf = J.indexOf, t.copy = J.copy, t.slice = J.slice, t.readUIntLE = J.readUIntLE, t.readUIntBE = J.readUIntBE, t.readUInt8 = J.readUInt8, t.readUInt16LE = J.readUInt16LE, t.readUInt16BE = J.readUInt16BE, t.readUInt32LE = J.readUInt32LE, t.readUInt32BE = J.readUInt32BE, t.readIntLE = J.readIntLE, t.readIntBE = J.readIntBE, t.readInt8 = J.readInt8, t.readInt16LE = J.readInt16LE, t.readInt16BE = J.readInt16BE, t.readInt32LE = J.readInt32LE, t.readInt32BE = J.readInt32BE, t.readFloatLE = J.readFloatLE, t.readFloatBE = J.readFloatBE, t.readDoubleLE = J.readDoubleLE, t.readDoubleBE = J.readDoubleBE, t.writeUInt8 = J.writeUInt8, t.writeUIntLE = J.writeUIntLE, t.writeUIntBE = J.writeUIntBE, t.writeUInt16LE = J.writeUInt16LE, t.writeUInt16BE = J.writeUInt16BE, t.writeUInt32LE = J.writeUInt32LE, t.writeUInt32BE = J.writeUInt32BE, t.writeIntLE = J.writeIntLE, t.writeIntBE = J.writeIntBE, t.writeInt8 = J.writeInt8, t.writeInt16LE = J.writeInt16LE, t.writeInt16BE = J.writeInt16BE, t.writeInt32LE = J.writeInt32LE, t.writeInt32BE = J.writeInt32BE, t.writeFloatLE = J.writeFloatLE, t.writeFloatBE = J.writeFloatBE, t.writeDoubleLE = J.writeDoubleLE, t.writeDoubleBE = J.writeDoubleBE, t.fill = J.fill, t.inspect = J.inspect, t.toArrayBuffer = J.toArrayBuffer, t
            };
            var tt = /[^+\/0-9A-Za-z-_]/g
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "base64-js": 23,
        ieee754: 24,
        "is-array": 25
    }],
    23: [function(t, e, i) {
        var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        ! function(t) {
            "use strict";

            function e(t) {
                var e = t.charCodeAt(0);
                return e === o || e === c ? 62 : e === a || e === f ? 63 : u > e ? -1 : u + 10 > e ? e - u + 26 + 26 : h + 26 > e ? e - h : l + 26 > e ? e - l + 26 : void 0
            }

            function i(t) {
                function i(t) {
                    l[c++] = t
                }
                var n, r, o, a, u, l;
                if (t.length % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var h = t.length;
                u = "=" === t.charAt(h - 2) ? 2 : "=" === t.charAt(h - 1) ? 1 : 0, l = new s(3 * t.length / 4 - u), o = u > 0 ? t.length - 4 : t.length;
                var c = 0;
                for (n = 0, r = 0; o > n; n += 4, r += 3) a = e(t.charAt(n)) << 18 | e(t.charAt(n + 1)) << 12 | e(t.charAt(n + 2)) << 6 | e(t.charAt(n + 3)), i((16711680 & a) >> 16), i((65280 & a) >> 8), i(255 & a);
                return 2 === u ? (a = e(t.charAt(n)) << 2 | e(t.charAt(n + 1)) >> 4, i(255 & a)) : 1 === u && (a = e(t.charAt(n)) << 10 | e(t.charAt(n + 1)) << 4 | e(t.charAt(n + 2)) >> 2, i(a >> 8 & 255), i(255 & a)), l
            }

            function r(t) {
                function e(t) {
                    return n.charAt(t)
                }

                function i(t) {
                    return e(t >> 18 & 63) + e(t >> 12 & 63) + e(t >> 6 & 63) + e(63 & t)
                }
                var r, s, o, a = t.length % 3,
                    u = "";
                for (r = 0, o = t.length - a; o > r; r += 3) s = (t[r] << 16) + (t[r + 1] << 8) + t[r + 2], u += i(s);
                switch (a) {
                    case 1:
                        s = t[t.length - 1], u += e(s >> 2), u += e(s << 4 & 63), u += "==";
                        break;
                    case 2:
                        s = (t[t.length - 2] << 8) + t[t.length - 1], u += e(s >> 10), u += e(s >> 4 & 63), u += e(s << 2 & 63), u += "="
                }
                return u
            }
            var s = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                o = "+".charCodeAt(0),
                a = "/".charCodeAt(0),
                u = "0".charCodeAt(0),
                l = "a".charCodeAt(0),
                h = "A".charCodeAt(0),
                c = "-".charCodeAt(0),
                f = "_".charCodeAt(0);
            t.toByteArray = i, t.fromByteArray = r
        }("undefined" == typeof i ? this.base64js = {} : i)
    }, {}],
    24: [function(t, e, i) {
        i.read = function(t, e, i, n, r) {
            var s, o, a = 8 * r - n - 1,
                u = (1 << a) - 1,
                l = u >> 1,
                h = -7,
                c = i ? r - 1 : 0,
                f = i ? -1 : 1,
                d = t[e + c];
            for (c += f, s = d & (1 << -h) - 1, d >>= -h, h += a; h > 0; s = 256 * s + t[e + c], c += f, h -= 8);
            for (o = s & (1 << -h) - 1, s >>= -h, h += n; h > 0; o = 256 * o + t[e + c], c += f, h -= 8);
            if (0 === s) s = 1 - l;
            else {
                if (s === u) return o ? NaN : (d ? -1 : 1) * (1 / 0);
                o += Math.pow(2, n), s -= l
            }
            return (d ? -1 : 1) * o * Math.pow(2, s - n)
        }, i.write = function(t, e, i, n, r, s) {
            var o, a, u, l = 8 * s - r - 1,
                h = (1 << l) - 1,
                c = h >> 1,
                f = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                d = n ? 0 : s - 1,
                p = n ? 1 : -1,
                m = 0 > e || 0 === e && 0 > 1 / e ? 1 : 0;
            for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, o = h) : (o = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -o)) < 1 && (o--, u *= 2), e += o + c >= 1 ? f / u : f * Math.pow(2, 1 - c), e * u >= 2 && (o++, u /= 2), o + c >= h ? (a = 0, o = h) : o + c >= 1 ? (a = (e * u - 1) * Math.pow(2, r), o += c) : (a = e * Math.pow(2, c - 1) * Math.pow(2, r), o = 0)); r >= 8; t[i + d] = 255 & a, d += p, a /= 256, r -= 8);
            for (o = o << r | a, l += r; l > 0; t[i + d] = 255 & o, d += p, o /= 256, l -= 8);
            t[i + d - p] |= 128 * m
        }
    }, {}],
    25: [function(t, e, i) {
        var n = Array.isArray,
            r = Object.prototype.toString;
        e.exports = n || function(t) {
            return !!t && "[object Array]" == r.call(t)
        }
    }, {}],
    26: [function(t, e, i) {
        function n() {
            this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
        }

        function r(t) {
            return "function" == typeof t
        }

        function s(t) {
            return "number" == typeof t
        }

        function o(t) {
            return "object" == typeof t && null !== t
        }

        function a(t) {
            return void 0 === t
        }
        e.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function(t) {
            if (!s(t) || 0 > t || isNaN(t)) throw TypeError("n must be a positive number");
            return this._maxListeners = t, this
        }, n.prototype.emit = function(t) {
            var e, i, n, s, u, l;
            if (this._events || (this._events = {}), "error" === t && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
                if (e = arguments[1], e instanceof Error) throw e;
                throw TypeError('Uncaught, unspecified "error" event.')
            }
            if (i = this._events[t], a(i)) return !1;
            if (r(i)) switch (arguments.length) {
                case 1:
                    i.call(this);
                    break;
                case 2:
                    i.call(this, arguments[1]);
                    break;
                case 3:
                    i.call(this, arguments[1], arguments[2]);
                    break;
                default:
                    for (n = arguments.length, s = new Array(n - 1), u = 1; n > u; u++) s[u - 1] = arguments[u];
                    i.apply(this, s)
            } else if (o(i)) {
                for (n = arguments.length, s = new Array(n - 1), u = 1; n > u; u++) s[u - 1] = arguments[u];
                for (l = i.slice(), n = l.length, u = 0; n > u; u++) l[u].apply(this, s)
            }
            return !0
        }, n.prototype.addListener = function(t, e) {
            var i;
            if (!r(e)) throw TypeError("listener must be a function");
            if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, r(e.listener) ? e.listener : e), this._events[t] ? o(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, o(this._events[t]) && !this._events[t].warned) {
                var i;
                i = a(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners, i && i > 0 && this._events[t].length > i && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace())
            }
            return this
        }, n.prototype.on = n.prototype.addListener, n.prototype.once = function(t, e) {
            function i() {
                this.removeListener(t, i), n || (n = !0, e.apply(this, arguments))
            }
            if (!r(e)) throw TypeError("listener must be a function");
            var n = !1;
            return i.listener = e, this.on(t, i), this
        }, n.prototype.removeListener = function(t, e) {
            var i, n, s, a;
            if (!r(e)) throw TypeError("listener must be a function");
            if (!this._events || !this._events[t]) return this;
            if (i = this._events[t], s = i.length, n = -1, i === e || r(i.listener) && i.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
            else if (o(i)) {
                for (a = s; a-- > 0;)
                    if (i[a] === e || i[a].listener && i[a].listener === e) {
                        n = a;
                        break
                    }
                if (0 > n) return this;
                1 === i.length ? (i.length = 0, delete this._events[t]) : i.splice(n, 1), this._events.removeListener && this.emit("removeListener", t, e)
            }
            return this
        }, n.prototype.removeAllListeners = function(t) {
            var e, i;
            if (!this._events) return this;
            if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
            if (0 === arguments.length) {
                for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
                return this.removeAllListeners("removeListener"), this._events = {}, this
            }
            if (i = this._events[t], r(i)) this.removeListener(t, i);
            else
                for (; i.length;) this.removeListener(t, i[i.length - 1]);
            return delete this._events[t], this
        }, n.prototype.listeners = function(t) {
            var e;
            return e = this._events && this._events[t] ? r(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
        }, n.listenerCount = function(t, e) {
            var i;
            return i = t._events && t._events[e] ? r(t._events[e]) ? 1 : t._events[e].length : 0
        }
    }, {}],
    27: [function(t, e, i) {
        (function(i) {
            function n(t) {
                if (!(this instanceof n)) return new n(t);
                var e = this.s = t || {};
                e.postHash = e.postHash || "!", this.lastRoute = null, this.childRouter = null, this.childFullRoute = null, this.childBaseRoute = null, this.router = r(), s.call(this)
            }
            var r = t("routes"),
                s = t("events").EventEmitter,
                o = new(t("location-bar")),
                a = function() {},
                u = n.prototype = Object.create(s.prototype);
            u.init = function() {
                var t, e = this.s;
                if (void 0 === e["/"]) {
                    for (t in e)
                        if ("/" == t[0]) {
                            e.start = t;
                            break
                        }
                } else e.start = "/";
                for (t in e)("/" == t[0] || "404" == t) && this.router.addRoute(t, a);
                return this.onURL = this.onURL.bind(this), i.location ? (o.start({
                    pushState: void 0 !== this.s.pushState ? this.s.pushState : !0
                }), this.hasPushState = o.hasPushState(), o.onChange(this.onURL), o.loadUrl()) : this.onURL(), this
            }, u.destroy = function() {
                i.location && o.stop()
            }, u.add = function(t, e) {
                var i = this.s;
                return i[t] = e, this
            }, u.go = function(t, e) {
                var n, r, s, a;
                if ("/" != t.charAt(0) && (t = "/" + t), s = (this.hasPushState ? "" : this.s.postHash) + t, n = this.getRouteData(t) || this.getRouteData("404"), r = this.getSection(n), a = this.useURL(r), i.location && a) {
                    var u = this.hasPushState ? i.location.pathname : i.location.hash.replace(/^#/, "");
                    u != s ? o.update(s, {
                        trigger: e && e.silent ? !1 : !0
                    }) : (r.duplicate || !r.useURL) && this.doRoute(n, r, t)
                } else i.location && a || this.doRoute(n, r, t)
            }, u.doRoute = function(t, e, i) {
                this.s;
                "string" == typeof e ? this.go(e) : (t.route !== this.lastResolvedRoute || e.duplicate) && (this.lastResolvedRoute = t.route, this.emit("route", {
                    section: e,
                    route: t,
                    path: i
                }))
            }, u.getRouteData = function(t) {
                var e = this.router.match(t);
                return e && (this.lastRoute = e.route), e
            }, u.getSection = function(t) {
                if (t) {
                    var e = t.route && (t.route.match(/.*[\[\]@!$&:'()*+,;=].*/g) || t.route instanceof RegExp),
                        i = this.s[t.route];
                    return e && void 0 === i.duplicate ? i.section ? (i.duplicate = !0, i) : {
                        section: i,
                        duplicate: !0
                    } : i
                }
                return null
            }, u.useURL = function(t) {
                return t && (void 0 === t.section || t.section && t.useURL || void 0 === t.useURL)
            }, u.onURL = function(t) {
                var e, n, r = "/";
                if (i.location && void 0 !== t) {
                    if ("/" != t.charAt(0) && (t = "/" + t), t === this.resolved) return;
                    this.resolved = t, r = this.hasPushState ? t : t.substr(1 + this.s.postHash.length)
                }
                e = this.getRouteData(r) || this.getRouteData("404"), n = this.getSection(e), this.useURL(n) ? this.doRoute(e, n, r) : this.s[404] && (e = this.getRouteData("404"), n = this.getSection(e), this.doRoute(e, n, r))
            }, e.exports = n
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        events: 26,
        "location-bar": 28,
        routes: 29
    }],
    28: [function(t, e, i) {
        ! function(t) {
            t(function() {
                function t(t, e, i) {
                    t.attachEvent ? (t["e" + e + i] = i, t[e + i] = function() {
                        t["e" + e + i](window.event)
                    }, t.attachEvent("on" + e, t[e + i])) : t.addEventListener(e, i, !1)
                }

                function e(t, e, i) {
                    t.detachEvent ? (t.detachEvent("on" + e, t[e + i]), t[e + i] = null) : t.removeEventListener(e, i, !1)
                }
                var i = {};
                i.extend = function(t, e) {
                    for (var i in e) t[i] = e[i];
                    return t
                }, i.any = function(t, e) {
                    for (var i = 0, n = t.length; n > i; i++)
                        if (e(t[i])) return !0;
                    return !1
                };
                var n = function() {
                        this.handlers = [];
                        var t = this,
                            e = this.checkUrl;
                        this.checkUrl = function() {
                            e.apply(t, arguments)
                        }, "undefined" != typeof window && (this.location = window.location, this.history = window.history)
                    },
                    r = /^[#\/]|\s+$/g,
                    s = /^\/+|\/+$/g,
                    o = /msie [\w.]+/,
                    a = /\/$/,
                    u = /#.*$/;
                return n.started = !1, i.extend(n.prototype, {
                    interval: 50,
                    atRoot: function() {
                        return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
                    },
                    getHash: function(t) {
                        var e = (t || this).location.href.match(/#(.*)$/);
                        return e ? e[1] : ""
                    },
                    getFragment: function(t, e) {
                        if (null == t)
                            if (this._hasPushState || !this._wantsHashChange || e) {
                                t = decodeURI(this.location.pathname + this.location.search);
                                var i = this.root.replace(a, "");
                                t.indexOf(i) || (t = t.slice(i.length))
                            } else t = this.getHash();
                        return t.replace(r, "")
                    },
                    start: function(e) {
                        if (n.started) throw new Error("LocationBar has already been started");
                        n.started = !0, this.options = i.extend({
                            root: "/"
                        }, e), this.location = this.options.location || this.location, this.history = this.options.history || this.history, this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                        var a = this.getFragment(),
                            u = document.documentMode,
                            l = o.exec(navigator.userAgent.toLowerCase()) && (!u || 7 >= u);
                        this.root = ("/" + this.root + "/").replace(s, "/"), l && this._wantsHashChange && (this.iframe = document.createElement("iframe"), this.iframe.setAttribute("src", "javascript:0"), this.iframe.setAttribute("tabindex", -1), this.iframe.style.display = "none", document.body.appendChild(this.iframe), this.iframe = this.iframe.contentWindow, this.navigate(a)), this._hasPushState ? t(window, "popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !l ? t(window, "hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = a;
                        var h = this.location;
                        if (this._wantsHashChange && this._wantsPushState) {
                            if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
                            this._hasPushState && this.atRoot() && h.hash && (this.fragment = this.getHash().replace(r, ""), this.history.replaceState({}, document.title, this.root + this.fragment))
                        }
                        return this.options.silent ? void 0 : this.loadUrl()
                    },
                    stop: function() {
                        e(window, "popstate", this.checkUrl), e(window, "hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), n.started = !1
                    },
                    route: function(t, e) {
                        this.handlers.unshift({
                            route: t,
                            callback: e
                        })
                    },
                    checkUrl: function() {
                        var t = this.getFragment();
                        return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))), t === this.fragment ? !1 : (this.iframe && this.navigate(t), void this.loadUrl())
                    },
                    loadUrl: function(t) {
                        return t = this.fragment = this.getFragment(t), i.any(this.handlers, function(e) {
                            return e.route.test(t) ? (e.callback(t), !0) : void 0
                        })
                    },
                    navigate: function(t, e) {
                        if (!n.started) return !1;
                        e && e !== !0 || (e = {
                            trigger: !!e
                        });
                        var i = this.root + (t = this.getFragment(t || ""));
                        if (t = t.replace(u, ""), this.fragment !== t) {
                            if (this.fragment = t, "" === t && "/" !== i && (i = i.slice(0, -1)), this._hasPushState) this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, i);
                            else {
                                if (!this._wantsHashChange) return this.location.assign(i);
                                this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, t, e.replace))
                            }
                            return e.trigger ? this.loadUrl(t) : void 0
                        }
                    },
                    _updateHash: function(t, e, i) {
                        if (i) {
                            var n = t.href.replace(/(javascript:|#).*$/, "");
                            t.replace(n + "#" + e)
                        } else t.hash = "#" + e
                    }
                }), n.prototype.update = function() {
                    this.navigate.apply(this, arguments)
                }, n.prototype.onChange = function(t) {
                    this.route(/^(.*?)$/, t)
                }, n.prototype.hasPushState = function() {
                    if (!n.started) throw new Error("only available after LocationBar.start()");
                    return this._hasPushState
                }, n
            })
        }("function" == typeof define && define.amd ? define : function(i) {
            e.exports = i(t)
        })
    }, {}],
    29: [function(t, e, i) {
        (function(n) {
            ! function(t) {
                if ("object" == typeof i) e.exports = t();
                else if ("function" == typeof define && define.amd) define(t);
                else {
                    var r;
                    "undefined" != typeof window ? r = window : "undefined" != typeof n ? r = n : "undefined" != typeof self && (r = self), r.routes = t()
                }
            }(function() {
                return function e(i, n, r) {
                    function s(a, u) {
                        if (!n[a]) {
                            if (!i[a]) {
                                var l = "function" == typeof t && t;
                                if (!u && l) return l(a, !0);
                                if (o) return o(a, !0);
                                throw new Error("Cannot find module '" + a + "'")
                            }
                            var h = n[a] = {
                                exports: {}
                            };
                            i[a][0].call(h.exports, function(t) {
                                var e = i[a][1][t];
                                return s(e ? e : t)
                            }, h, h.exports, e, i, n, r)
                        }
                        return n[a].exports
                    }
                    for (var o = "function" == typeof t && t, a = 0; a < r.length; a++) s(r[a]);
                    return s
                }({
                    1: [function(t, e, i) {
                        var n = function(t) {
                                var e, i, n = [];
                                return t instanceof RegExp ? (i = t, e = t.toString()) : (i = r(t, n), e = t), {
                                    re: i,
                                    src: t.toString(),
                                    keys: n
                                }
                            },
                            r = function(t, e) {
                                return t = t.concat("/?").replace(/\/\(/g, "(?:/").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?|\*/g, function(t, i, n, r, s, o) {
                                    return "*" === t ? (e.push(void 0), t) : (e.push(r), i = i || "", "" + (o ? "" : i) + "(?:" + (o ? i : "") + (n || "") + (s || "([^/]+?)") + ")" + (o || ""))
                                }).replace(/([\/.])/g, "\\$1").replace(/\*/g, "(.*)"), new RegExp("^" + t + "$", "i")
                            },
                            s = function(t, e, i) {
                                for (var n, r = i || 0, s = t.length; s > r; ++r) {
                                    var o = t[r],
                                        a = o.re,
                                        u = o.keys,
                                        l = [],
                                        h = {};
                                    if (n = e.match(a)) {
                                        for (var c = 1, s = n.length; s > c; ++c) {
                                            var f = u[c - 1],
                                                d = "string" == typeof n[c] ? unescape(n[c]) : n[c];
                                            f ? h[f] = d : l.push(d)
                                        }
                                        return {
                                            params: h,
                                            splats: l,
                                            route: o.src,
                                            next: r + 1
                                        }
                                    }
                                }
                            },
                            o = function() {
                                return {
                                    routes: [],
                                    routeMap: {},
                                    addRoute: function(t, e) {
                                        if (!t) throw new Error(" route requires a path");
                                        if (!e) throw new Error(" route " + t.toString() + " requires a callback");
                                        var i = n(t);
                                        i.fn = e, this.routes.push(i), this.routeMap[t] = e
                                    },
                                    match: function(t, e) {
                                        var i = s(this.routes, t, e);
                                        return i && (i.fn = this.routeMap[i.route], i.next = this.match.bind(this, t, i.next)), i
                                    }
                                }
                            };
                        o.Route = n, o.pathToRegExp = r, o.match = s, o.Router = o, e.exports = o
                    }, {}]
                }, {}, [1])(1)
            })
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    30: [function(t, e, i) {
        (function(t) {
            var i = function() {
                "use strict";

                function e(i, n, r, s) {
                    function a(i, r) {
                        if (null === i) return null;
                        if (0 == r) return i;
                        var u, f;
                        if ("object" != typeof i) return i;
                        if (e.__isArray(i)) u = [];
                        else if (e.__isRegExp(i)) u = new RegExp(i.source, o(i)), i.lastIndex && (u.lastIndex = i.lastIndex);
                        else if (e.__isDate(i)) u = new Date(i.getTime());
                        else {
                            if (c && t.isBuffer(i)) return u = new t(i.length), i.copy(u), u;
                            "undefined" == typeof s ? (f = Object.getPrototypeOf(i), u = Object.create(f)) : (u = Object.create(s), f = s)
                        }
                        if (n) {
                            var d = l.indexOf(i);
                            if (-1 != d) return h[d];
                            l.push(i), h.push(u)
                        }
                        for (var p in i) {
                            var m;
                            f && (m = Object.getOwnPropertyDescriptor(f, p)), m && null == m.set || (u[p] = a(i[p], r - 1))
                        }
                        return u
                    }
                    var u;
                    "object" == typeof n && (r = n.depth, s = n.prototype, u = n.filter, n = n.circular);
                    var l = [],
                        h = [],
                        c = "undefined" != typeof t;
                    return "undefined" == typeof n && (n = !0), "undefined" == typeof r && (r = 1 / 0), a(i, r)
                }

                function i(t) {
                    return Object.prototype.toString.call(t)
                }

                function n(t) {
                    return "object" == typeof t && "[object Date]" === i(t)
                }

                function r(t) {
                    return "object" == typeof t && "[object Array]" === i(t)
                }

                function s(t) {
                    return "object" == typeof t && "[object RegExp]" === i(t)
                }

                function o(t) {
                    var e = "";
                    return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), e
                }
                return e.clonePrototype = function(t) {
                    if (null === t) return null;
                    var e = function() {};
                    return e.prototype = t, new e
                }, e.__objToStr = i, e.__isDate = n, e.__isArray = r, e.__isRegExp = s, e.__getRegExpFlags = o, e
            }();
            "object" == typeof e && e.exports && (e.exports = i)
        }).call(this, t("buffer").Buffer)
    }, {
        buffer: 22
    }],
    31: [function(t, e, i) {
        var n = t("clone");
        e.exports = function(t, e) {
            return t = t || {}, Object.keys(e).forEach(function(i) {
                "undefined" == typeof t[i] && (t[i] = n(e[i]))
            }), t
        }
    }, {
        clone: 30
    }],
    32: [function(t, e, i) {
        function n(t) {
            if (t.classList) return t.classList;
            var e = t.className.replace(/^\s+|\s+$/g, ""),
                i = e.split(h);
            return "" === i[0] && i.shift(), i
        }

        function r(t, e) {
            if (t.classList) return void t.classList.add(e);
            var i = n(t),
                r = l(i, e);
            ~r || i.push(e), t.className = i.join(" ")
        }

        function s(t, e) {
            return t.classList ? t.classList.contains(e) : !!~l(n(t), e)
        }

        function o(t, e) {
            if ("[object RegExp]" == c.call(e)) return a(t, e);
            if (t.classList) return void t.classList.remove(e);
            var i = n(t),
                r = l(i, e);
            ~r && i.splice(r, 1), t.className = i.join(" ")
        }

        function a(t, e, i) {
            for (var r = Array.prototype.slice.call(n(t)), s = 0; s < r.length; s++) e.test(r[s]) && o(t, r[s])
        }

        function u(t, e) {
            return t.classList ? t.classList.toggle(e) : void(s(t, e) ? o(t, e) : r(t, e))
        }
        var l = t("indexof"),
            h = /\s+/,
            c = Object.prototype.toString;
        e.exports = n, e.exports.add = r, e.exports.contains = s, e.exports.has = s, e.exports.toggle = u, e.exports.remove = o, e.exports.removeMatching = a
    }, {
        indexof: 33
    }],
    33: [function(t, e, i) {
        var n = [].indexOf;
        e.exports = function(t, e) {
            if (n) return t.indexOf(e);
            for (var i = 0; i < t.length; ++i)
                if (t[i] === e) return i;
            return -1
        }
    }, {}],
    34: [function(t, e, i) {
        function n(t) {
            t = t || {};
            var e = document.createElement(t.selector);
            if (t.attr)
                for (var i in t.attr) t.attr.hasOwnProperty(i) && e.setAttribute(i, t.attr[i]);
            return "a" == t.selector && t.link && (e.href = t.link, t.target && e.setAttribute("target", t.target)), "img" == t.selector && t.src && (e.src = t.src, t.lazyload && (r(e, "opacity", "0"), e.onload = function() {
                r(e, "opacity", "1")
            })), t.id && (e.id = t.id), t.styles && (e.className = t.styles), t.html && (e.innerHTML = t.html), t.children && e.appendChild(t.children), e
        }
        var r = t("dom-css");
        e.exports = n
    }, {
        "dom-css": 35
    }],
    35: [function(t, e, i) {
        function n(t, e, i) {
            var n = l[e];
            if ("undefined" == typeof n && (n = s(e)), n) {
                if (void 0 === i) return t.style[n];
                "number" == typeof i && (i += h[n] || ""), t.style[n] = i
            }
        }

        function r(t, e) {
            for (var i in e) e.hasOwnProperty(i) && n(t, i, e[i])
        }

        function s(t) {
            var e = u(t),
                i = a(e);
            return l[e] = l[t] = l[i] = i, i
        }

        function o() {
            2 === arguments.length ? r(arguments[0], arguments[1]) : n(arguments[0], arguments[1], arguments[2])
        }
        var a = t("prefix-style"),
            u = t("to-camel-case"),
            l = {
                "float": "cssFloat"
            },
            h = {};
        ["top", "right", "bottom", "left", "width", "height", "fontSize", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "padding", "margin", "perspective"].forEach(function(t) {
            h[t] = "px"
        }), e.exports = o, e.exports.set = o, e.exports.get = function(t, e) {
            return Array.isArray(e) ? e.reduce(function(e, i) {
                return e[i] = n(t, i || ""), e
            }, {}) : n(t, e || "")
        }
    }, {
        "prefix-style": 36,
        "to-camel-case": 37
    }],
    36: [function(t, e, i) {
        var n = null;
        e.exports = function(t) {
            var e = ["Moz", "Khtml", "Webkit", "O", "ms"],
                i = t.charAt(0).toUpperCase() + t.slice(1);
            if (n || (n = document.createElement("div")), t in n.style) return t;
            for (var r = e.length; r--;)
                if (e[r] + i in n.style) return e[r] + i;
            return !1
        }
    }, {}],
    37: [function(t, e, i) {
        function n(t) {
            return r(t).replace(/\s(\w)/g, function(t, e) {
                return e.toUpperCase()
            })
        }
        var r = t("to-space-case");
        e.exports = n
    }, {
        "to-space-case": 38
    }],
    38: [function(t, e, i) {
        function n(t) {
            return r(t).replace(/[\W_]+(.|$)/g, function(t, e) {
                return e ? " " + e : ""
            })
        }
        var r = t("to-no-case");
        e.exports = n
    }, {
        "to-no-case": 39
    }],
    39: [function(t, e, i) {
        function n(t) {
            return o.test(t) ? t.toLowerCase() : (u.test(t) && (t = r(t)), a.test(t) && (t = s(t)), t.toLowerCase())
        }

        function r(t) {
            return t.replace(l, function(t, e) {
                return e ? " " + e : ""
            })
        }

        function s(t) {
            return t.replace(h, function(t, e, i) {
                return e + " " + i.toLowerCase().split("").join(" ")
            })
        }
        e.exports = n;
        var o = /\s/,
            a = /[a-z][A-Z]/,
            u = /[\W_]/,
            l = /[\W_]+(.|$)/g,
            h = /(.)([A-Z]+)/g
    }, {}],
    40: [function(t, e, i) {
        function n(t, e) {
            return s(t, e)
        }

        function r(t, e) {
            return n(t, e)[0]
        }
        var s = t("qwery");
        e.exports = {
            one: r,
            all: n
        }
    }, {
        qwery: 42
    }],
    41: [function(t, e, i) {
        function n(t, e) {
            return e || (e = document), e.querySelector ? e.querySelector(t) : s.one(t, e)
        }

        function r(t, e) {
            return e || (e = document), e.querySelectorAll ? e.querySelectorAll(t) : s.all(t, e)
        }
        var s = t("./fallback");
        e.exports = n, e.exports.all = r
    }, {
        "./fallback": 40
    }],
    42: [function(t, e, i) {
        ! function(t, i, n) {
            "undefined" != typeof e && e.exports ? e.exports = n() : "function" == typeof define && define.amd ? define(n) : i[t] = n()
        }("qwery", this, function() {
            function t() {
                this.c = {}
            }

            function e(t) {
                return Y.g(t) || Y.s(t, "(^|\\s+)" + t + "(\\s+|$)", 1)
            }

            function i(t, e) {
                for (var i = 0, n = t.length; n > i; i++) e(t[i])
            }

            function n(t) {
                for (var e = [], i = 0, n = t.length; n > i; ++i) m(t[i]) ? e = e.concat(t[i]) : e[e.length] = t[i];
                return e
            }

            function r(t) {
                for (var e = 0, i = t.length, n = []; i > e; e++) n[e] = t[e];
                return n
            }

            function s(t) {
                for (;
                    (t = t.previousSibling) && 1 != t[E];);
                return t
            }

            function o(t) {
                return t.match(z)
            }

            function a(t, i, n, r, s, o, a, u, h, c, f) {
                var d, p, m, g, v;
                if (1 !== this[E]) return !1;
                if (i && "*" !== i && this[M] && this[M].toLowerCase() !== i) return !1;
                if (n && (p = n.match(C)) && p[1] !== this.id) return !1;
                if (n && (v = n.match(O)))
                    for (d = v.length; d--;)
                        if (!e(v[d].slice(1)).test(this.className)) return !1;
                if (h && y.pseudos[h] && !y.pseudos[h](this, f)) return !1;
                if (r && !a) {
                    g = this.attributes;
                    for (m in g)
                        if (Object.prototype.hasOwnProperty.call(g, m) && (g[m].name || m) == s) return this
                }
                return r && !l(o, J(this, s) || "", a) ? !1 : this
            }

            function u(t) {
                return $.g(t) || $.s(t, t.replace(N, "\\$1"))
            }

            function l(t, e, i) {
                switch (t) {
                    case "=":
                        return e == i;
                    case "^=":
                        return e.match(K.g("^=" + i) || K.s("^=" + i, "^" + u(i), 1));
                    case "$=":
                        return e.match(K.g("$=" + i) || K.s("$=" + i, u(i) + "$", 1));
                    case "*=":
                        return e.match(K.g(i) || K.s(i, u(i), 1));
                    case "~=":
                        return e.match(K.g("~=" + i) || K.s("~=" + i, "(?:^|\\s+)" + u(i) + "(?:\\s+|$)", 1));
                    case "|=":
                        return e.match(K.g("|=" + i) || K.s("|=" + i, "^" + u(i) + "(-|$)", 1))
                }
                return 0
            }

            function h(t, e) {
                var n, r, s, u, l, h, c, d = [],
                    p = [],
                    m = e,
                    g = Q.g(t) || Q.s(t, t.split(W)),
                    y = t.match(U);
                if (!g.length) return d;
                if (u = (g = g.slice(0)).pop(), g.length && (s = g[g.length - 1].match(D)) && (m = v(e, s[1])), !m) return d;
                for (h = o(u), l = m !== e && 9 !== m[E] && y && /^[+~]$/.test(y[y.length - 1]) ? function(t) {
                        for (; m = m.nextSibling;) 1 == m[E] && (h[1] ? h[1] == m[M].toLowerCase() : 1) && (t[t.length] = m);
                        return t
                    }([]) : m[x](h[1] || "*"), n = 0, r = l.length; r > n; n++)(c = a.apply(l[n], h)) && (d[d.length] = c);
                return g.length ? (i(d, function(t) {
                    f(t, g, y) && (p[p.length] = t)
                }), p) : d
            }

            function c(t, e, i) {
                if (d(e)) return t == e;
                if (m(e)) return !!~n(e).indexOf(t);
                for (var r, s, u = e.split(","); e = u.pop();)
                    if (r = Q.g(e) || Q.s(e, e.split(W)), s = e.match(U), r = r.slice(0), a.apply(t, o(r.pop())) && (!r.length || f(t, r, s, i))) return !0;
                return !1
            }

            function f(t, e, i, n) {
                function r(t, n, u) {
                    for (; u = q[i[n]](u, t);)
                        if (d(u) && a.apply(u, o(e[n]))) {
                            if (!n) return u;
                            if (s = r(u, n - 1, u)) return s
                        }
                }
                var s;
                return (s = r(t, e.length - 1, t)) && (!n || Z(s, n))
            }

            function d(t, e) {
                return t && "object" == typeof t && (e = t[E]) && (1 == e || 9 == e)
            }

            function p(t) {
                var e, i, n = [];
                t: for (e = 0; e < t.length; ++e) {
                    for (i = 0; i < n.length; ++i)
                        if (n[i] == t[e]) continue t;
                    n[n.length] = t[e]
                }
                return n
            }

            function m(t) {
                return "object" == typeof t && isFinite(t.length)
            }

            function g(t) {
                return t ? "string" == typeof t ? y(t)[0] : !t[E] && m(t) ? t[0] : t : b
            }

            function v(t, e, i) {
                return 9 === t[E] ? t.getElementById(e) : t.ownerDocument && ((i = t.ownerDocument.getElementById(e)) && Z(i, t) && i || !Z(t, t.ownerDocument) && _('[id="' + e + '"]', t)[0])
            }

            function y(t, e) {
                var i, s, o = g(e);
                if (!o || !t) return [];
                if (t === window || d(t)) return !e || t !== window && d(o) && Z(t, o) ? [t] : [];
                if (t && m(t)) return n(t);
                if (i = t.match(V)) {
                    if (i[1]) return (s = v(o, i[1])) ? [s] : [];
                    if (i[2]) return r(o[x](i[2]));
                    if (tt && i[3]) return r(o[S](i[3]))
                }
                return _(t, o)
            }

            function T(t, e) {
                return function(i) {
                    var n, r;
                    return R.test(i) ? void(9 !== t[E] && ((r = n = t.getAttribute("id")) || t.setAttribute("id", r = "__qwerymeupscotty"), i = '[id="' + r + '"]' + i, e(t.parentNode || t, i, !0), n || t.removeAttribute("id"))) : void(i.length && e(t, i, !1))
                }
            }
            var _, b = document,
                w = b.documentElement,
                S = "getElementsByClassName",
                x = "getElementsByTagName",
                P = "querySelectorAll",
                A = "useNativeQSA",
                M = "tagName",
                E = "nodeType",
                C = /#([\w\-]+)/,
                O = /\.[\w\-]+/g,
                D = /^#([\w\-]+)$/,
                I = /^\.([\w\-]+)$/,
                k = /^([\w\-]+)$/,
                G = /^([\w]+)?\.([\w\-]+)$/,
                R = /(^|,)\s*[>~+]/,
                B = /^\s+|\s*([,\s\+\~>]|$)\s*/g,
                H = /[\s\>\+\~]/,
                L = /(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/,
                N = /([.*+?\^=!:${}()|\[\]\/\\])/g,
                j = /^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/,
                F = /\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/,
                X = /:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/,
                V = new RegExp(D.source + "|" + k.source + "|" + I.source),
                U = new RegExp("(" + H.source + ")" + L.source, "g"),
                W = new RegExp(H.source + L.source),
                z = new RegExp(j.source + "(" + F.source + ")?(" + X.source + ")?"),
                q = {
                    " ": function(t) {
                        return t && t !== w && t.parentNode
                    },
                    ">": function(t, e) {
                        return t && t.parentNode == e.parentNode && t.parentNode
                    },
                    "~": function(t) {
                        return t && t.previousSibling
                    },
                    "+": function(t, e, i, n) {
                        return t ? (i = s(t)) && (n = s(e)) && i == n && i : !1
                    }
                };
            t.prototype = {
                g: function(t) {
                    return this.c[t] || void 0
                },
                s: function(t, e, i) {
                    return e = i ? new RegExp(e) : e, this.c[t] = e
                }
            };
            var Y = new t,
                $ = new t,
                K = new t,
                Q = new t,
                Z = "compareDocumentPosition" in w ? function(t, e) {
                    return 16 == (16 & e.compareDocumentPosition(t))
                } : "contains" in w ? function(t, e) {
                    return e = 9 === e[E] || e == window ? w : e, e !== t && e.contains(t)
                } : function(t, e) {
                    for (; t = t.parentNode;)
                        if (t === e) return 1;
                    return 0
                },
                J = function() {
                    var t = b.createElement("p");
                    return (t.innerHTML = '<a href="#x">x</a>') && "#x" != t.firstChild.getAttribute("href") ? function(t, e) {
                        return "class" === e ? t.className : "href" === e || "src" === e ? t.getAttribute(e, 2) : t.getAttribute(e)
                    } : function(t, e) {
                        return t.getAttribute(e)
                    }
                }(),
                tt = !!b[S],
                et = b.querySelector && b[P],
                it = function(t, e) {
                    var n, s, o = [];
                    try {
                        return 9 !== e[E] && R.test(t) ? (i(n = t.split(","), T(e, function(t, e) {
                            s = t[P](e), 1 == s.length ? o[o.length] = s.item(0) : s.length && (o = o.concat(r(s)))
                        })), n.length > 1 && o.length > 1 ? p(o) : o) : r(e[P](t))
                    } catch (a) {}
                    return nt(t, e)
                },
                nt = function(t, n) {
                    var r, s, o, a, u, l, c = [];
                    if (t = t.replace(B, "$1"), s = t.match(G)) {
                        for (u = e(s[2]), r = n[x](s[1] || "*"), o = 0, a = r.length; a > o; o++) u.test(r[o].className) && (c[c.length] = r[o]);
                        return c
                    }
                    return i(l = t.split(","), T(n, function(t, e, i) {
                        for (u = h(e, t), o = 0, a = u.length; a > o; o++)(9 === t[E] || i || Z(u[o], n)) && (c[c.length] = u[o])
                    })), l.length > 1 && c.length > 1 ? p(c) : c
                },
                rt = function(t) {
                    "undefined" != typeof t[A] && (_ = t[A] && et ? it : nt)
                };
            return rt({
                useNativeQSA: !0
            }), y.configure = rt, y.uniq = p, y.is = c, y.pseudos = {}, y
        })
    }, {}],
    43: [function(t, e, i) {
        (function(t) {
            var i = "undefined" != typeof e && e.exports && "undefined" != typeof t ? t : this || window;
            (i._gsQueue || (i._gsQueue = [])).push(function() {
                    "use strict";
                    i._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                            var n = function(t) {
                                    var e, i = [],
                                        n = t.length;
                                    for (e = 0; e !== n; i.push(t[e++]));
                                    return i
                                },
                                r = function(t, e, i) {
                                    var n, r, s = t.cycle;
                                    for (n in s) r = s[n], t[n] = "function" == typeof r ? r.call(e[i], i) : r[i % r.length];
                                    delete t.cycle
                                },
                                s = function(t, e, n) {
                                    i.call(this, t, e, n), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = s.prototype.render
                                },
                                o = 1e-10,
                                a = i._internals,
                                u = a.isSelector,
                                l = a.isArray,
                                h = s.prototype = i.to({}, .1, {}),
                                c = [];
                            s.version = "1.18.1", h.constructor = s, h.kill()._gc = !1, s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf, s.getTweensOf = i.getTweensOf, s.lagSmoothing = i.lagSmoothing, s.ticker = i.ticker, s.render = i.render, h.invalidate = function() {
                                return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), i.prototype.invalidate.call(this)
                            }, h.updateTo = function(t, e) {
                                var n, r = this.ratio,
                                    s = this.vars.immediateRender || t.immediateRender;
                                e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                                for (n in t) this.vars[n] = t[n];
                                if (this._initted || s)
                                    if (e) this._initted = !1, s && this.render(0, !0, !0);
                                    else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                                    var o = this._totalTime;
                                    this.render(0, !0, !1), this._initted = !1, this.render(o, !0, !1)
                                } else if (this._initted = !1, this._init(), this._time > 0 || s)
                                    for (var a, u = 1 / (1 - r), l = this._firstPT; l;) a = l.s + l.c, l.c *= u, l.s = a - l.c, l = l._next;
                                return this
                            }, h.render = function(t, e, i) {
                                this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                                var n, r, s, u, l, h, c, f, d = this._dirty ? this.totalDuration() : this._totalDuration,
                                    p = this._time,
                                    m = this._totalTime,
                                    g = this._cycle,
                                    v = this._duration,
                                    y = this._rawPrevTime;
                                if (t >= d - 1e-7 ? (this._totalTime = d, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === v && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 > y || 0 >= t && t >= -1e-7 || y === o && "isPause" !== this.data) && y !== t && (i = !0, y > o && (r = "onReverseComplete")), this._rawPrevTime = f = !e || t || y === t ? t : o)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === v && y > 0) && (r = "onReverseComplete", n = this._reversed), 0 > t && (this._active = !1, 0 === v && (this._initted || !this.vars.lazy || i) && (y >= 0 && (i = !0), this._rawPrevTime = f = !e || t || y === t ? t : o)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (u = v + this._repeatDelay, this._cycle = this._totalTime / u >> 0, 0 !== this._cycle && this._cycle === this._totalTime / u && this._cycle--, this._time = this._totalTime - this._cycle * u, this._yoyo && 0 !== (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : this._time < 0 && (this._time = 0)), this._easeType ? (l = this._time / v, h = this._easeType, c = this._easePower, (1 === h || 3 === h && l >= .5) && (l = 1 - l), 3 === h && (l *= 2), 1 === c ? l *= l : 2 === c ? l *= l * l : 3 === c ? l *= l * l * l : 4 === c && (l *= l * l * l * l), 1 === h ? this.ratio = 1 - l : 2 === h ? this.ratio = l : this._time / v < .5 ? this.ratio = l / 2 : this.ratio = 1 - l / 2) : this.ratio = this._ease.getRatio(this._time / v)), p === this._time && !i && g === this._cycle) return void(m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                                if (!this._initted) {
                                    if (this._init(), !this._initted || this._gc) return;
                                    if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = p, this._totalTime = m, this._rawPrevTime = y, this._cycle = g, a.lazyTweens.push(this), void(this._lazy = [t, e]);
                                    this._time && !n ? this.ratio = this._ease.getRatio(this._time / v) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                                }
                                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== p && t >= 0 && (this._active = !0), 0 === m && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                                this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== m || n) && this._callback("onUpdate")), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === v && this._rawPrevTime === o && f !== o && (this._rawPrevTime = 0))
                            }, s.to = function(t, e, i) {
                                return new s(t, e, i)
                            }, s.from = function(t, e, i) {
                                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new s(t, e, i)
                            }, s.fromTo = function(t, e, i, n) {
                                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new s(t, e, n)
                            }, s.staggerTo = s.allTo = function(t, e, o, a, h, f, d) {
                                a = a || 0;
                                var p, m, g, v, y = 0,
                                    T = [],
                                    _ = function() {
                                        o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments), h.apply(d || o.callbackScope || this, f || c)
                                    },
                                    b = o.cycle,
                                    w = o.startAt && o.startAt.cycle;
                                for (l(t) || ("string" == typeof t && (t = i.selector(t) || t), u(t) && (t = n(t))), t = t || [], 0 > a && (t = n(t), t.reverse(), a *= -1), p = t.length - 1, g = 0; p >= g; g++) {
                                    m = {};
                                    for (v in o) m[v] = o[v];
                                    if (b && r(m, t, g), w) {
                                        w = m.startAt = {};
                                        for (v in o.startAt) w[v] = o.startAt[v];
                                        r(m.startAt, t, g)
                                    }
                                    m.delay = y + (m.delay || 0), g === p && h && (m.onComplete = _), T[g] = new s(t[g], e, m), y += a
                                }
                                return T
                            }, s.staggerFrom = s.allFrom = function(t, e, i, n, r, o, a) {
                                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, s.staggerTo(t, e, i, n, r, o, a)
                            }, s.staggerFromTo = s.allFromTo = function(t, e, i, n, r, o, a, u) {
                                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, s.staggerTo(t, e, n, r, o, a, u)
                            }, s.delayedCall = function(t, e, i, n, r) {
                                return new s(e, 0, {
                                    delay: t,
                                    onComplete: e,
                                    onCompleteParams: i,
                                    callbackScope: n,
                                    onReverseComplete: e,
                                    onReverseCompleteParams: i,
                                    immediateRender: !1,
                                    useFrames: r,
                                    overwrite: 0
                                })
                            }, s.set = function(t, e) {
                                return new s(t, 0, e)
                            }, s.isTweening = function(t) {
                                return i.getTweensOf(t, !0).length > 0
                            };
                            var f = function(t, e) {
                                    for (var n = [], r = 0, s = t._first; s;) s instanceof i ? n[r++] = s : (e && (n[r++] = s), n = n.concat(f(s, e)), r = n.length), s = s._next;
                                    return n
                                },
                                d = s.getAllTweens = function(e) {
                                    return f(t._rootTimeline, e).concat(f(t._rootFramesTimeline, e))
                                };
                            s.killAll = function(t, i, n, r) {
                                null == i && (i = !0), null == n && (n = !0);
                                var s, o, a, u = d(0 != r),
                                    l = u.length,
                                    h = i && n && r;
                                for (a = 0; l > a; a++) o = u[a], (h || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && (t ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
                            }, s.killChildTweensOf = function(t, e) {
                                if (null != t) {
                                    var r, o, h, c, f, d = a.tweenLookup;
                                    if ("string" == typeof t && (t = i.selector(t) || t), u(t) && (t = n(t)), l(t))
                                        for (c = t.length; --c > -1;) s.killChildTweensOf(t[c], e);
                                    else {
                                        r = [];
                                        for (h in d)
                                            for (o = d[h].target.parentNode; o;) o === t && (r = r.concat(d[h].tweens)), o = o.parentNode;
                                        for (f = r.length, c = 0; f > c; c++) e && r[c].totalTime(r[c].totalDuration()), r[c]._enabled(!1, !1)
                                    }
                                }
                            };
                            var p = function(t, i, n, r) {
                                i = i !== !1, n = n !== !1, r = r !== !1;
                                for (var s, o, a = d(r), u = i && n && r, l = a.length; --l > -1;) o = a[l], (u || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && o.paused(t)
                            };
                            return s.pauseAll = function(t, e, i) {
                                p(!0, t, e, i)
                            }, s.resumeAll = function(t, e, i) {
                                p(!1, t, e, i)
                            }, s.globalTimeScale = function(e) {
                                var n = t._rootTimeline,
                                    r = i.ticker.time;
                                return arguments.length ? (e = e || o, n._startTime = r - (r - n._startTime) * n._timeScale / e, n = t._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / e, n._timeScale = t._rootTimeline._timeScale = e, e) : n._timeScale
                            }, h.progress = function(t) {
                                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                            }, h.totalProgress = function(t) {
                                return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
                            }, h.time = function(t, e) {
                                return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                            }, h.duration = function(e) {
                                return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                            }, h.totalDuration = function(t) {
                                return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                            }, h.repeat = function(t) {
                                return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                            }, h.repeatDelay = function(t) {
                                return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                            }, h.yoyo = function(t) {
                                return arguments.length ? (this._yoyo = t, this) : this._yoyo
                            }, s
                        }, !0), i._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, n) {
                            var r = function(t) {
                                    e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                                    var i, n, r = this.vars;
                                    for (n in r) i = r[n], l(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
                                    l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                                },
                                s = 1e-10,
                                o = n._internals,
                                a = r._internals = {},
                                u = o.isSelector,
                                l = o.isArray,
                                h = o.lazyTweens,
                                c = o.lazyRender,
                                f = i._gsDefine.globals,
                                d = function(t) {
                                    var e, i = {};
                                    for (e in t) i[e] = t[e];
                                    return i
                                },
                                p = function(t, e, i) {
                                    var n, r, s = t.cycle;
                                    for (n in s) r = s[n], t[n] = "function" == typeof r ? r.call(e[i], i) : r[i % r.length];
                                    delete t.cycle
                                },
                                m = a.pauseCallback = function() {},
                                g = function(t) {
                                    var e, i = [],
                                        n = t.length;
                                    for (e = 0; e !== n; i.push(t[e++]));
                                    return i
                                },
                                v = r.prototype = new e;
                            return r.version = "1.18.1", v.constructor = r, v.kill()._gc = v._forcingPlayhead = v._hasPause = !1, v.to = function(t, e, i, r) {
                                var s = i.repeat && f.TweenMax || n;
                                return e ? this.add(new s(t, e, i), r) : this.set(t, i, r)
                            }, v.from = function(t, e, i, r) {
                                return this.add((i.repeat && f.TweenMax || n).from(t, e, i), r)
                            }, v.fromTo = function(t, e, i, r, s) {
                                var o = r.repeat && f.TweenMax || n;
                                return e ? this.add(o.fromTo(t, e, i, r), s) : this.set(t, r, s)
                            }, v.staggerTo = function(t, e, i, s, o, a, l, h) {
                                var c, f, m = new r({
                                        onComplete: a,
                                        onCompleteParams: l,
                                        callbackScope: h,
                                        smoothChildTiming: this.smoothChildTiming
                                    }),
                                    v = i.cycle;
                                for ("string" == typeof t && (t = n.selector(t) || t), t = t || [], u(t) && (t = g(t)), s = s || 0, 0 > s && (t = g(t), t.reverse(), s *= -1), f = 0; f < t.length; f++) c = d(i), c.startAt && (c.startAt = d(c.startAt), c.startAt.cycle && p(c.startAt, t, f)), v && p(c, t, f), m.to(t[f], e, c, f * s);
                                return this.add(m, o)
                            }, v.staggerFrom = function(t, e, i, n, r, s, o, a) {
                                return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, s, o, a)
                            }, v.staggerFromTo = function(t, e, i, n, r, s, o, a, u) {
                                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, s, o, a, u)
                            }, v.call = function(t, e, i, r) {
                                return this.add(n.delayedCall(0, t, e, i), r)
                            }, v.set = function(t, e, i) {
                                return i = this._parseTimeOrLabel(i, 0, !0), null == e.immediateRender && (e.immediateRender = i === this._time && !this._paused), this.add(new n(t, 0, e), i)
                            }, r.exportRoot = function(t, e) {
                                t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                                var i, s, o = new r(t),
                                    a = o._timeline;
                                for (null == e && (e = !0), a._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = a._time, i = a._first; i;) s = i._next, e && i instanceof n && i.target === i.vars.onComplete || o.add(i, i._startTime - i._delay), i = s;
                                return a.add(o, 0), o
                            }, v.add = function(i, s, o, a) {
                                var u, h, c, f, d, p;
                                if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, i)), !(i instanceof t)) {
                                    if (i instanceof Array || i && i.push && l(i)) {
                                        for (o = o || "normal", a = a || 0, u = s, h = i.length, c = 0; h > c; c++) l(f = i[c]) && (f = new r({
                                            tweens: f
                                        })), this.add(f, u), "string" != typeof f && "function" != typeof f && ("sequence" === o ? u = f._startTime + f.totalDuration() / f._timeScale : "start" === o && (f._startTime -= f.delay())), u += a;
                                        return this._uncache(!0)
                                    }
                                    if ("string" == typeof i) return this.addLabel(i, s);
                                    if ("function" != typeof i) throw "Cannot add " + i + " into the timeline; it is not a tween, timeline, function, or string.";
                                    i = n.delayedCall(0, i)
                                }
                                if (e.prototype.add.call(this, i, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                                    for (d = this, p = d.rawTime() > i._startTime; d._timeline;) p && d._timeline.smoothChildTiming ? d.totalTime(d._totalTime, !0) : d._gc && d._enabled(!0, !1), d = d._timeline;
                                return this
                            }, v.remove = function(e) {
                                if (e instanceof t) {
                                    this._remove(e, !1);
                                    var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                                    return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
                                }
                                if (e instanceof Array || e && e.push && l(e)) {
                                    for (var n = e.length; --n > -1;) this.remove(e[n]);
                                    return this
                                }
                                return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                            }, v._remove = function(t, i) {
                                e.prototype._remove.call(this, t, i);
                                var n = this._last;
                                return n ? this._time > n._startTime + n._totalDuration / n._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                            }, v.append = function(t, e) {
                                return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                            }, v.insert = v.insertMultiple = function(t, e, i, n) {
                                return this.add(t, e || 0, i, n)
                            }, v.appendMultiple = function(t, e, i, n) {
                                return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
                            }, v.addLabel = function(t, e) {
                                return this._labels[t] = this._parseTimeOrLabel(e), this
                            }, v.addPause = function(t, e, i, r) {
                                var s = n.delayedCall(0, m, i, r || this);
                                return s.vars.onComplete = s.vars.onReverseComplete = e, s.data = "isPause", this._hasPause = !0, this.add(s, t)
                            }, v.removeLabel = function(t) {
                                return delete this._labels[t], this
                            }, v.getLabelTime = function(t) {
                                return null != this._labels[t] ? this._labels[t] : -1
                            }, v._parseTimeOrLabel = function(e, i, n, r) {
                                var s;
                                if (r instanceof t && r.timeline === this) this.remove(r);
                                else if (r && (r instanceof Array || r.push && l(r)))
                                    for (s = r.length; --s > -1;) r[s] instanceof t && r[s].timeline === this && this.remove(r[s]);
                                if ("string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, n);
                                if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                                else {
                                    if (s = e.indexOf("="), -1 === s) return null == this._labels[e] ? n ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                                    i = parseInt(e.charAt(s - 1) + "1", 10) * Number(e.substr(s + 1)), e = s > 1 ? this._parseTimeOrLabel(e.substr(0, s - 1), 0, n) : this.duration()
                                }
                                return Number(e) + i
                            }, v.seek = function(t, e) {
                                return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
                            }, v.stop = function() {
                                return this.paused(!0)
                            }, v.gotoAndPlay = function(t, e) {
                                return this.play(t, e)
                            }, v.gotoAndStop = function(t, e) {
                                return this.pause(t, e)
                            }, v.render = function(t, e, i) {
                                this._gc && this._enabled(!0, !1);
                                var n, r, o, a, u, l, f, d = this._dirty ? this.totalDuration() : this._totalDuration,
                                    p = this._time,
                                    m = this._startTime,
                                    g = this._timeScale,
                                    v = this._paused;
                                if (t >= d - 1e-7) this._totalTime = this._time = d, this._reversed || this._hasPausedChild() || (r = !0, a = "onComplete", u = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === s) && this._rawPrevTime !== t && this._first && (u = !0, this._rawPrevTime > s && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s, t = d + 1e-4;
                                else if (1e-7 > t)
                                    if (this._totalTime = this._time = 0, (0 !== p || 0 === this._duration && this._rawPrevTime !== s && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (a = "onReverseComplete", r = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (u = r = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (u = !0), this._rawPrevTime = t;
                                    else {
                                        if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s, 0 === t && r)
                                            for (n = this._first; n && 0 === n._startTime;) n._duration || (r = !1), n = n._next;
                                        t = 0, this._initted || (u = !0)
                                    } else {
                                    if (this._hasPause && !this._forcingPlayhead && !e) {
                                        if (t >= p)
                                            for (n = this._first; n && n._startTime <= t && !l;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (l = n), n = n._next;
                                        else
                                            for (n = this._last; n && n._startTime >= t && !l;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (l = n), n = n._prev;
                                        l && (this._time = t = l._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                                    }
                                    this._totalTime = this._time = this._rawPrevTime = t
                                }
                                if (this._time !== p && this._first || i || u || l) {
                                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== p && t > 0 && (this._active = !0), 0 === p && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")), f = this._time, f >= p)
                                        for (n = this._first; n && (o = n._next, f === this._time && (!this._paused || v));)(n._active || n._startTime <= f && !n._paused && !n._gc) && (l === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o;
                                    else
                                        for (n = this._last; n && (o = n._prev, f === this._time && (!this._paused || v));) {
                                            if (n._active || n._startTime <= p && !n._paused && !n._gc) {
                                                if (l === n) {
                                                    for (l = n._prev; l && l.endTime() > this._time;) l.render(l._reversed ? l.totalDuration() - (t - l._startTime) * l._timeScale : (t - l._startTime) * l._timeScale, e, i), l = l._prev;
                                                    l = null, this.pause()
                                                }
                                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                                            }
                                            n = o
                                        }
                                    this._onUpdate && (e || (h.length && c(), this._callback("onUpdate"))), a && (this._gc || (m === this._startTime || g !== this._timeScale) && (0 === this._time || d >= this.totalDuration()) && (r && (h.length && c(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this._callback(a)))
                                }
                            }, v._hasPausedChild = function() {
                                for (var t = this._first; t;) {
                                    if (t._paused || t instanceof r && t._hasPausedChild()) return !0;
                                    t = t._next
                                }
                                return !1
                            }, v.getChildren = function(t, e, i, r) {
                                r = r || -9999999999;
                                for (var s = [], o = this._first, a = 0; o;) o._startTime < r || (o instanceof n ? e !== !1 && (s[a++] = o) : (i !== !1 && (s[a++] = o), t !== !1 && (s = s.concat(o.getChildren(!0, e, i)), a = s.length))), o = o._next;
                                return s
                            }, v.getTweensOf = function(t, e) {
                                var i, r, s = this._gc,
                                    o = [],
                                    a = 0;
                                for (s && this._enabled(!0, !0), i = n.getTweensOf(t), r = i.length; --r > -1;)(i[r].timeline === this || e && this._contains(i[r])) && (o[a++] = i[r]);
                                return s && this._enabled(!1, !0), o
                            }, v.recent = function() {
                                return this._recent
                            }, v._contains = function(t) {
                                for (var e = t.timeline; e;) {
                                    if (e === this) return !0;
                                    e = e.timeline
                                }
                                return !1
                            }, v.shiftChildren = function(t, e, i) {
                                i = i || 0;
                                for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                                if (e)
                                    for (n in s) s[n] >= i && (s[n] += t);
                                return this._uncache(!0)
                            }, v._kill = function(t, e) {
                                if (!t && !e) return this._enabled(!1, !1);
                                for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);
                                return r
                            }, v.clear = function(t) {
                                var e = this.getChildren(!1, !0, !0),
                                    i = e.length;
                                for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                                return t !== !1 && (this._labels = {}), this._uncache(!0)
                            }, v.invalidate = function() {
                                for (var e = this._first; e;) e.invalidate(), e = e._next;
                                return t.prototype.invalidate.call(this)
                            }, v._enabled = function(t, i) {
                                if (t === this._gc)
                                    for (var n = this._first; n;) n._enabled(t, !0), n = n._next;
                                return e.prototype._enabled.call(this, t, i)
                            }, v.totalTime = function(e, i, n) {
                                this._forcingPlayhead = !0;
                                var r = t.prototype.totalTime.apply(this, arguments);
                                return this._forcingPlayhead = !1, r
                            }, v.duration = function(t) {
                                return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                            }, v.totalDuration = function(t) {
                                if (!arguments.length) {
                                    if (this._dirty) {
                                        for (var e, i, n = 0, r = this._last, s = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = e;
                                        this._duration = this._totalDuration = n, this._dirty = !1
                                    }
                                    return this._totalDuration
                                }
                                return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
                            }, v.paused = function(e) {
                                if (!e)
                                    for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                                return t.prototype.paused.apply(this, arguments)
                            }, v.usesFrames = function() {
                                for (var e = this._timeline; e._timeline;) e = e._timeline;
                                return e === t._rootFramesTimeline
                            }, v.rawTime = function() {
                                return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                            }, r
                        }, !0), i._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
                            var n = function(e) {
                                    t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                                },
                                r = 1e-10,
                                s = e._internals,
                                o = s.lazyTweens,
                                a = s.lazyRender,
                                u = new i(null, null, 1, 0),
                                l = n.prototype = new t;
                            return l.constructor = n, l.kill()._gc = !1, n.version = "1.18.1", l.invalidate = function() {
                                return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                            }, l.addCallback = function(t, i, n, r) {
                                return this.add(e.delayedCall(0, t, n, r), i)
                            }, l.removeCallback = function(t, e) {
                                if (t)
                                    if (null == e) this._kill(null, t);
                                    else
                                        for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
                                return this
                            }, l.removePause = function(e) {
                                return this.removeCallback(t._internals.pauseCallback, e)
                            }, l.tweenTo = function(t, i) {
                                i = i || {};
                                var n, r, s, o = {
                                    ease: u,
                                    useFrames: this.usesFrames(),
                                    immediateRender: !1
                                };
                                for (r in i) o[r] = i[r];
                                return o.time = this._parseTimeOrLabel(t), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, s = new e(this, n, o), o.onStart = function() {
                                    s.target.paused(!0), s.vars.time !== s.target.time() && n === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale), i.onStart && s._callback("onStart")
                                }, s
                            }, l.tweenFromTo = function(t, e, i) {
                                i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                                    onComplete: this.seek,
                                    onCompleteParams: [t],
                                    callbackScope: this
                                }, i.immediateRender = i.immediateRender !== !1;
                                var n = this.tweenTo(e, i);
                                return n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001)
                            }, l.render = function(t, e, i) {
                                this._gc && this._enabled(!0, !1);
                                var n, s, u, l, h, c, f, d, p = this._dirty ? this.totalDuration() : this._totalDuration,
                                    m = this._duration,
                                    g = this._time,
                                    v = this._totalTime,
                                    y = this._startTime,
                                    T = this._timeScale,
                                    _ = this._rawPrevTime,
                                    b = this._paused,
                                    w = this._cycle;
                                if (t >= p - 1e-7) this._locked || (this._totalTime = p, this._cycle = this._repeat),
                                    this._reversed || this._hasPausedChild() || (s = !0, l = "onComplete", h = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || 0 > _ || _ === r) && _ !== t && this._first && (h = !0, _ > r && (l = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = m, t = m + 1e-4);
                                else if (1e-7 > t)
                                    if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== g || 0 === m && _ !== r && (_ > 0 || 0 > t && _ >= 0) && !this._locked) && (l = "onReverseComplete", s = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (h = s = !0, l = "onReverseComplete") : _ >= 0 && this._first && (h = !0), this._rawPrevTime = t;
                                    else {
                                        if (this._rawPrevTime = m || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s)
                                            for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                                        t = 0, this._initted || (h = !0)
                                    } else if (0 === m && 0 > _ && (h = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (c = m + this._repeatDelay, this._cycle = this._totalTime / c >> 0, 0 !== this._cycle && this._cycle === this._totalTime / c && this._cycle--, this._time = this._totalTime - this._cycle * c, this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time), this._time > m ? (this._time = m, t = m + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)), this._hasPause && !this._forcingPlayhead && !e) {
                                    if (t = this._time, t >= g)
                                        for (n = this._first; n && n._startTime <= t && !f;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (f = n), n = n._next;
                                    else
                                        for (n = this._last; n && n._startTime >= t && !f;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (f = n), n = n._prev;
                                    f && (this._time = t = f._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                                }
                                if (this._cycle !== w && !this._locked) {
                                    var S = this._yoyo && 0 !== (1 & w),
                                        x = S === (this._yoyo && 0 !== (1 & this._cycle)),
                                        P = this._totalTime,
                                        A = this._cycle,
                                        M = this._rawPrevTime,
                                        E = this._time;
                                    if (this._totalTime = w * m, this._cycle < w ? S = !S : this._totalTime += m, this._time = g, this._rawPrevTime = 0 === m ? _ - 1e-4 : _, this._cycle = w, this._locked = !0, g = S ? 0 : m, this.render(g, e, 0 === m), e || this._gc || this.vars.onRepeat && this._callback("onRepeat"), g !== this._time) return;
                                    if (x && (g = S ? m + 1e-4 : -1e-4, this.render(g, !0, !1)), this._locked = !1, this._paused && !b) return;
                                    this._time = E, this._totalTime = P, this._cycle = A, this._rawPrevTime = M
                                }
                                if (!(this._time !== g && this._first || i || h || f)) return void(v !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                                if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== v && t > 0 && (this._active = !0), 0 === v && this.vars.onStart && 0 !== this._totalTime && (e || this._callback("onStart")), d = this._time, d >= g)
                                    for (n = this._first; n && (u = n._next, d === this._time && (!this._paused || b));)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (f === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = u;
                                else
                                    for (n = this._last; n && (u = n._prev, d === this._time && (!this._paused || b));) {
                                        if (n._active || n._startTime <= g && !n._paused && !n._gc) {
                                            if (f === n) {
                                                for (f = n._prev; f && f.endTime() > this._time;) f.render(f._reversed ? f.totalDuration() - (t - f._startTime) * f._timeScale : (t - f._startTime) * f._timeScale, e, i), f = f._prev;
                                                f = null, this.pause()
                                            }
                                            n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                                        }
                                        n = u
                                    }
                                this._onUpdate && (e || (o.length && a(), this._callback("onUpdate"))), l && (this._locked || this._gc || (y === this._startTime || T !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (s && (o.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[l] && this._callback(l)))
                            }, l.getActive = function(t, e, i) {
                                null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                                var n, r, s = [],
                                    o = this.getChildren(t, e, i),
                                    a = 0,
                                    u = o.length;
                                for (n = 0; u > n; n++) r = o[n], r.isActive() && (s[a++] = r);
                                return s
                            }, l.getLabelAfter = function(t) {
                                t || 0 !== t && (t = this._time);
                                var e, i = this.getLabelsArray(),
                                    n = i.length;
                                for (e = 0; n > e; e++)
                                    if (i[e].time > t) return i[e].name;
                                return null
                            }, l.getLabelBefore = function(t) {
                                null == t && (t = this._time);
                                for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                                    if (e[i].time < t) return e[i].name;
                                return null
                            }, l.getLabelsArray = function() {
                                var t, e = [],
                                    i = 0;
                                for (t in this._labels) e[i++] = {
                                    time: this._labels[t],
                                    name: t
                                };
                                return e.sort(function(t, e) {
                                    return t.time - e.time
                                }), e
                            }, l.progress = function(t, e) {
                                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
                            }, l.totalProgress = function(t, e) {
                                return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
                            }, l.totalDuration = function(e) {
                                return arguments.length ? -1 !== this._repeat && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                            }, l.time = function(t, e) {
                                return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                            }, l.repeat = function(t) {
                                return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                            }, l.repeatDelay = function(t) {
                                return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                            }, l.yoyo = function(t) {
                                return arguments.length ? (this._yoyo = t, this) : this._yoyo
                            }, l.currentLabel = function(t) {
                                return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                            }, n
                        }, !0),
                        function() {
                            var t = 180 / Math.PI,
                                e = [],
                                n = [],
                                r = [],
                                s = {},
                                o = i._gsDefine.globals,
                                a = function(t, e, i, n) {
                                    this.a = t, this.b = e, this.c = i, this.d = n, this.da = n - t, this.ca = i - t, this.ba = e - t
                                },
                                u = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                                l = function(t, e, i, n) {
                                    var r = {
                                            a: t
                                        },
                                        s = {},
                                        o = {},
                                        a = {
                                            c: n
                                        },
                                        u = (t + e) / 2,
                                        l = (e + i) / 2,
                                        h = (i + n) / 2,
                                        c = (u + l) / 2,
                                        f = (l + h) / 2,
                                        d = (f - c) / 8;
                                    return r.b = u + (t - u) / 4, s.b = c + d, r.c = s.a = (r.b + s.b) / 2, s.c = o.a = (c + f) / 2, o.b = f - d, a.b = h + (n - h) / 4, o.c = a.a = (o.b + a.b) / 2, [r, s, o, a]
                                },
                                h = function(t, i, s, o, a) {
                                    var u, h, c, f, d, p, m, g, v, y, T, _, b, w = t.length - 1,
                                        S = 0,
                                        x = t[0].a;
                                    for (u = 0; w > u; u++) d = t[S], h = d.a, c = d.d, f = t[S + 1].d, a ? (T = e[u], _ = n[u], b = (_ + T) * i * .25 / (o ? .5 : r[u] || .5), p = c - (c - h) * (o ? .5 * i : 0 !== T ? b / T : 0), m = c + (f - c) * (o ? .5 * i : 0 !== _ ? b / _ : 0), g = c - (p + ((m - p) * (3 * T / (T + _) + .5) / 4 || 0))) : (p = c - (c - h) * i * .5, m = c + (f - c) * i * .5, g = c - (p + m) / 2), p += g, m += g, d.c = v = p, 0 !== u ? d.b = x : d.b = x = d.a + .6 * (d.c - d.a), d.da = c - h, d.ca = v - h, d.ba = x - h, s ? (y = l(h, x, v, c), t.splice(S, 1, y[0], y[1], y[2], y[3]), S += 4) : S++, x = m;
                                    d = t[S], d.b = x, d.c = x + .4 * (d.d - x), d.da = d.d - d.a, d.ca = d.c - d.a, d.ba = x - d.a, s && (y = l(d.a, x, d.c, d.d), t.splice(S, 1, y[0], y[1], y[2], y[3]))
                                },
                                c = function(t, i, r, s) {
                                    var o, u, l, h, c, f, d = [];
                                    if (s)
                                        for (t = [s].concat(t), u = t.length; --u > -1;) "string" == typeof(f = t[u][i]) && "=" === f.charAt(1) && (t[u][i] = s[i] + Number(f.charAt(0) + f.substr(2)));
                                    if (o = t.length - 2, 0 > o) return d[0] = new a(t[0][i], 0, 0, t[-1 > o ? 0 : 1][i]), d;
                                    for (u = 0; o > u; u++) l = t[u][i], h = t[u + 1][i], d[u] = new a(l, 0, 0, h), r && (c = t[u + 2][i], e[u] = (e[u] || 0) + (h - l) * (h - l), n[u] = (n[u] || 0) + (c - h) * (c - h));
                                    return d[u] = new a(t[u][i], 0, 0, t[u + 1][i]), d
                                },
                                f = function(t, i, o, a, l, f) {
                                    var d, p, m, g, v, y, T, _, b = {},
                                        w = [],
                                        S = f || t[0];
                                    l = "string" == typeof l ? "," + l + "," : u, null == i && (i = 1);
                                    for (p in t[0]) w.push(p);
                                    if (t.length > 1) {
                                        for (_ = t[t.length - 1], T = !0, d = w.length; --d > -1;)
                                            if (p = w[d], Math.abs(S[p] - _[p]) > .05) {
                                                T = !1;
                                                break
                                            }
                                        T && (t = t.concat(), f && t.unshift(f), t.push(t[1]), f = t[t.length - 3])
                                    }
                                    for (e.length = n.length = r.length = 0, d = w.length; --d > -1;) p = w[d], s[p] = -1 !== l.indexOf("," + p + ","), b[p] = c(t, p, s[p], f);
                                    for (d = e.length; --d > -1;) e[d] = Math.sqrt(e[d]), n[d] = Math.sqrt(n[d]);
                                    if (!a) {
                                        for (d = w.length; --d > -1;)
                                            if (s[p])
                                                for (m = b[w[d]], y = m.length - 1, g = 0; y > g; g++) v = m[g + 1].da / n[g] + m[g].da / e[g], r[g] = (r[g] || 0) + v * v;
                                        for (d = r.length; --d > -1;) r[d] = Math.sqrt(r[d])
                                    }
                                    for (d = w.length, g = o ? 4 : 1; --d > -1;) p = w[d], m = b[p], h(m, i, o, a, s[p]), T && (m.splice(0, g), m.splice(m.length - g, g));
                                    return b
                                },
                                d = function(t, e, i) {
                                    e = e || "soft";
                                    var n, r, s, o, u, l, h, c, f, d, p, m = {},
                                        g = "cubic" === e ? 3 : 2,
                                        v = "soft" === e,
                                        y = [];
                                    if (v && i && (t = [i].concat(t)), null == t || t.length < g + 1) throw "invalid Bezier data";
                                    for (f in t[0]) y.push(f);
                                    for (l = y.length; --l > -1;) {
                                        for (f = y[l], m[f] = u = [], d = 0, c = t.length, h = 0; c > h; h++) n = null == i ? t[h][f] : "string" == typeof(p = t[h][f]) && "=" === p.charAt(1) ? i[f] + Number(p.charAt(0) + p.substr(2)) : Number(p), v && h > 1 && c - 1 > h && (u[d++] = (n + u[d - 2]) / 2), u[d++] = n;
                                        for (c = d - g + 1, d = 0, h = 0; c > h; h += g) n = u[h], r = u[h + 1], s = u[h + 2], o = 2 === g ? 0 : u[h + 3], u[d++] = p = 3 === g ? new a(n, r, s, o) : new a(n, (2 * r + n) / 3, (2 * r + s) / 3, s);
                                        u.length = d
                                    }
                                    return m
                                },
                                p = function(t, e, i) {
                                    for (var n, r, s, o, a, u, l, h, c, f, d, p = 1 / i, m = t.length; --m > -1;)
                                        for (f = t[m], s = f.a, o = f.d - s, a = f.c - s, u = f.b - s, n = r = 0, h = 1; i >= h; h++) l = p * h, c = 1 - l, n = r - (r = (l * l * o + 3 * c * (l * a + c * u)) * l), d = m * i + h - 1, e[d] = (e[d] || 0) + n * n
                                },
                                m = function(t, e) {
                                    e = e >> 0 || 6;
                                    var i, n, r, s, o = [],
                                        a = [],
                                        u = 0,
                                        l = 0,
                                        h = e - 1,
                                        c = [],
                                        f = [];
                                    for (i in t) p(t[i], o, e);
                                    for (r = o.length, n = 0; r > n; n++) u += Math.sqrt(o[n]), s = n % e, f[s] = u, s === h && (l += u, s = n / e >> 0, c[s] = f, a[s] = l, u = 0, f = []);
                                    return {
                                        length: l,
                                        lengths: a,
                                        segments: c
                                    }
                                },
                                g = i._gsDefine.plugin({
                                    propName: "bezier",
                                    priority: -1,
                                    version: "1.3.4",
                                    API: 2,
                                    global: !0,
                                    init: function(t, e, i) {
                                        this._target = t, e instanceof Array && (e = {
                                            values: e
                                        }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                                        var n, r, s, o, a, u = e.values || [],
                                            l = {},
                                            h = u[0],
                                            c = e.autoRotate || i.vars.orientToBezier;
                                        this._autoRotate = c ? c instanceof Array ? c : [
                                            ["x", "y", "rotation", c === !0 ? 0 : Number(c) || 0]
                                        ] : null;
                                        for (n in h) this._props.push(n);
                                        for (s = this._props.length; --s > -1;) n = this._props[s], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof t[n], l[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), a || l[n] !== u[0][n] && (a = l);
                                        if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? f(u, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : d(u, e.type, l), this._segCount = this._beziers[n].length, this._timeRes) {
                                            var p = m(this._beziers, this._timeRes);
                                            this._length = p.length, this._lengths = p.lengths, this._segments = p.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                                        }
                                        if (c = this._autoRotate)
                                            for (this._initialRotations = [], c[0] instanceof Array || (this._autoRotate = c = [c]), s = c.length; --s > -1;) {
                                                for (o = 0; 3 > o; o++) n = c[s][o], this._func[n] = "function" == typeof t[n] ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)] : !1;
                                                n = c[s][2], this._initialRotations[s] = this._func[n] ? this._func[n].call(this._target) : this._target[n]
                                            }
                                        return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                                    },
                                    set: function(e) {
                                        var i, n, r, s, o, a, u, l, h, c, f = this._segCount,
                                            d = this._func,
                                            p = this._target,
                                            m = e !== this._startRatio;
                                        if (this._timeRes) {
                                            if (h = this._lengths, c = this._curSeg, e *= this._length, r = this._li, e > this._l2 && f - 1 > r) {
                                                for (l = f - 1; l > r && (this._l2 = h[++r]) <= e;);
                                                this._l1 = h[r - 1], this._li = r, this._curSeg = c = this._segments[r], this._s2 = c[this._s1 = this._si = 0]
                                            } else if (e < this._l1 && r > 0) {
                                                for (; r > 0 && (this._l1 = h[--r]) >= e;);
                                                0 === r && e < this._l1 ? this._l1 = 0 : r++, this._l2 = h[r], this._li = r, this._curSeg = c = this._segments[r], this._s1 = c[(this._si = c.length - 1) - 1] || 0, this._s2 = c[this._si]
                                            }
                                            if (i = r, e -= this._l1, r = this._si, e > this._s2 && r < c.length - 1) {
                                                for (l = c.length - 1; l > r && (this._s2 = c[++r]) <= e;);
                                                this._s1 = c[r - 1], this._si = r
                                            } else if (e < this._s1 && r > 0) {
                                                for (; r > 0 && (this._s1 = c[--r]) >= e;);
                                                0 === r && e < this._s1 ? this._s1 = 0 : r++, this._s2 = c[r], this._si = r
                                            }
                                            a = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                                        } else i = 0 > e ? 0 : e >= 1 ? f - 1 : f * e >> 0, a = (e - i * (1 / f)) * f;
                                        for (n = 1 - a, r = this._props.length; --r > -1;) s = this._props[r], o = this._beziers[s][i], u = (a * a * o.da + 3 * n * (a * o.ca + n * o.ba)) * a + o.a, this._round[s] && (u = Math.round(u)), d[s] ? p[s](u) : p[s] = u;
                                        if (this._autoRotate) {
                                            var g, v, y, T, _, b, w, S = this._autoRotate;
                                            for (r = S.length; --r > -1;) s = S[r][2], b = S[r][3] || 0, w = S[r][4] === !0 ? 1 : t, o = this._beziers[S[r][0]], g = this._beziers[S[r][1]], o && g && (o = o[i], g = g[i], v = o.a + (o.b - o.a) * a, T = o.b + (o.c - o.b) * a, v += (T - v) * a, T += (o.c + (o.d - o.c) * a - T) * a, y = g.a + (g.b - g.a) * a, _ = g.b + (g.c - g.b) * a, y += (_ - y) * a, _ += (g.c + (g.d - g.c) * a - _) * a, u = m ? Math.atan2(_ - y, T - v) * w + b : this._initialRotations[r], d[s] ? p[s](u) : p[s] = u)
                                        }
                                    }
                                }),
                                v = g.prototype;
                            g.bezierThrough = f, g.cubicToQuadratic = l, g._autoCSS = !0, g.quadraticToCubic = function(t, e, i) {
                                return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
                            }, g._cssRegister = function() {
                                var t = o.CSSPlugin;
                                if (t) {
                                    var e = t._internals,
                                        i = e._parseToProxy,
                                        n = e._setPluginRatio,
                                        r = e.CSSPropTween;
                                    e._registerComplexSpecialProp("bezier", {
                                        parser: function(t, e, s, o, a, u) {
                                            e instanceof Array && (e = {
                                                values: e
                                            }), u = new g;
                                            var l, h, c, f = e.values,
                                                d = f.length - 1,
                                                p = [],
                                                m = {};
                                            if (0 > d) return a;
                                            for (l = 0; d >= l; l++) c = i(t, f[l], o, a, u, d !== l), p[l] = c.end;
                                            for (h in e) m[h] = e[h];
                                            return m.values = p, a = new r(t, "bezier", 0, 0, c.pt, 2), a.data = c, a.plugin = u, a.setRatio = n, 0 === m.autoRotate && (m.autoRotate = !0), !m.autoRotate || m.autoRotate instanceof Array || (l = m.autoRotate === !0 ? 0 : Number(m.autoRotate), m.autoRotate = null != c.end.left ? [
                                                ["left", "top", "rotation", l, !1]
                                            ] : null != c.end.x ? [
                                                ["x", "y", "rotation", l, !1]
                                            ] : !1), m.autoRotate && (o._transform || o._enableTransforms(!1), c.autoRotate = o._target._gsTransform), u._onInitTween(c.proxy, m, o._tween), a
                                        }
                                    })
                                }
                            }, v._roundProps = function(t, e) {
                                for (var i = this._overwriteProps, n = i.length; --n > -1;)(t[i[n]] || t.bezier || t.bezierThrough) && (this._round[i[n]] = e)
                            }, v._kill = function(t) {
                                var e, i, n = this._props;
                                for (e in this._beziers)
                                    if (e in t)
                                        for (delete this._beziers[e], delete this._func[e], i = n.length; --i > -1;) n[i] === e && n.splice(i, 1);
                                return this._super._kill.call(this, t)
                            }
                        }(), i._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                            var n, r, s, o, a = function() {
                                    t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
                                },
                                u = i._gsDefine.globals,
                                l = {},
                                h = a.prototype = new t("css");
                            h.constructor = a, a.version = "1.18.1", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", a.defaultSmoothOrigin = !0, h = "px", a.suffixMap = {
                                top: h,
                                right: h,
                                bottom: h,
                                left: h,
                                width: h,
                                height: h,
                                fontSize: h,
                                padding: h,
                                margin: h,
                                perspective: h,
                                lineHeight: ""
                            };
                            var c, f, d, p, m, g, v = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                                y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                                T = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                                _ = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                                b = /(?:\d|\-|\+|=|#|\.)*/g,
                                w = /opacity *= *([^)]*)/i,
                                S = /opacity:([^;]*)/i,
                                x = /alpha\(opacity *=.+?\)/i,
                                P = /^(rgb|hsl)/,
                                A = /([A-Z])/g,
                                M = /-([a-z])/gi,
                                E = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                                C = function(t, e) {
                                    return e.toUpperCase()
                                },
                                O = /(?:Left|Right|Width)/i,
                                D = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                                I = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                                k = /,(?=[^\)]*(?:\(|$))/gi,
                                G = Math.PI / 180,
                                R = 180 / Math.PI,
                                B = {},
                                H = document,
                                L = function(t) {
                                    return H.createElementNS ? H.createElementNS("http://www.w3.org/1999/xhtml", t) : H.createElement(t)
                                },
                                N = L("div"),
                                j = L("img"),
                                F = a._internals = {
                                    _specialProps: l
                                },
                                X = navigator.userAgent,
                                V = function() {
                                    var t = X.indexOf("Android"),
                                        e = L("a");
                                    return d = -1 !== X.indexOf("Safari") && -1 === X.indexOf("Chrome") && (-1 === t || Number(X.substr(t + 8, 1)) > 3), m = d && Number(X.substr(X.indexOf("Version/") + 8, 1)) < 6, p = -1 !== X.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(X)) && (g = parseFloat(RegExp.$1)), e ? (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity)) : !1
                                }(),
                                U = function(t) {
                                    return w.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                                },
                                W = function(t) {
                                    window.console && console.log(t)
                                },
                                z = "",
                                q = "",
                                Y = function(t, e) {
                                    e = e || N;
                                    var i, n, r = e.style;
                                    if (void 0 !== r[t]) return t;
                                    for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];);
                                    return n >= 0 ? (q = 3 === n ? "ms" : i[n], z = "-" + q.toLowerCase() + "-", q + t) : null
                                },
                                $ = H.defaultView ? H.defaultView.getComputedStyle : function() {},
                                K = a.getStyle = function(t, e, i, n, r) {
                                    var s;
                                    return V || "opacity" !== e ? (!n && t.style[e] ? s = t.style[e] : (i = i || $(t)) ? s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(A, "-$1").toLowerCase()) : t.currentStyle && (s = t.currentStyle[e]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : U(t)
                                },
                                Q = F.convertToPixels = function(t, i, n, r, s) {
                                    if ("px" === r || !r) return n;
                                    if ("auto" === r || !n) return 0;
                                    var o, u, l, h = O.test(i),
                                        c = t,
                                        f = N.style,
                                        d = 0 > n;
                                    if (d && (n = -n), "%" === r && -1 !== i.indexOf("border")) o = n / 100 * (h ? t.clientWidth : t.clientHeight);
                                    else {
                                        if (f.cssText = "border:0 solid red;position:" + K(t, "position") + ";line-height:0;", "%" !== r && c.appendChild && "v" !== r.charAt(0) && "rem" !== r) f[h ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                                        else {
                                            if (c = t.parentNode || H.body, u = c._gsCache, l = e.ticker.frame, u && h && u.time === l) return u.width * n / 100;
                                            f[h ? "width" : "height"] = n + r
                                        }
                                        c.appendChild(N), o = parseFloat(N[h ? "offsetWidth" : "offsetHeight"]), c.removeChild(N), h && "%" === r && a.cacheWidths !== !1 && (u = c._gsCache = c._gsCache || {}, u.time = l, u.width = o / n * 100), 0 !== o || s || (o = Q(t, i, n, r, !0))
                                    }
                                    return d ? -o : o
                                },
                                Z = F.calculateOffset = function(t, e, i) {
                                    if ("absolute" !== K(t, "position", i)) return 0;
                                    var n = "left" === e ? "Left" : "Top",
                                        r = K(t, "margin" + n, i);
                                    return t["offset" + n] - (Q(t, e, parseFloat(r), r.replace(b, "")) || 0)
                                },
                                J = function(t, e) {
                                    var i, n, r, s = {};
                                    if (e = e || $(t, null))
                                        if (i = e.length)
                                            for (; --i > -1;) r = e[i], (-1 === r.indexOf("-transform") || At === r) && (s[r.replace(M, C)] = e.getPropertyValue(r));
                                        else
                                            for (i in e)(-1 === i.indexOf("Transform") || Pt === i) && (s[i] = e[i]);
                                    else if (e = t.currentStyle || t.style)
                                        for (i in e) "string" == typeof i && void 0 === s[i] && (s[i.replace(M, C)] = e[i]);
                                    return V || (s.opacity = U(t)), n = Lt(t, e, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, Et && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
                                },
                                tt = function(t, e, i, n, r) {
                                    var s, o, a, u = {},
                                        l = t.style;
                                    for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (s = i[o]) || r && r[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (u[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[o] || "" === e[o].replace(_, "") ? s : 0 : Z(t, o), void 0 !== l[o] && (a = new mt(l, o, l[o], a)));
                                    if (n)
                                        for (o in n) "className" !== o && (u[o] = n[o]);
                                    return {
                                        difs: u,
                                        firstMPT: a
                                    }
                                },
                                et = {
                                    width: ["Left", "Right"],
                                    height: ["Top", "Bottom"]
                                },
                                it = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                                nt = function(t, e, i) {
                                    var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                                        r = et[e],
                                        s = r.length;
                                    for (i = i || $(t, null); --s > -1;) n -= parseFloat(K(t, "padding" + r[s], i, !0)) || 0, n -= parseFloat(K(t, "border" + r[s] + "Width", i, !0)) || 0;
                                    return n
                                },
                                rt = function(t, e) {
                                    if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
                                    (null == t || "" === t) && (t = "0 0");
                                    var i = t.split(" "),
                                        n = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
                                        r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
                                    return null == r ? r = "center" === n ? "50%" : "0" : "center" === r && (r = "50%"), ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"), t = n + " " + r + (i.length > 2 ? " " + i[2] : ""), e && (e.oxp = -1 !== n.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === n.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(n.replace(_, "")), e.oy = parseFloat(r.replace(_, "")), e.v = t), e || t
                                },
                                st = function(t, e) {
                                    return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
                                },
                                ot = function(t, e) {
                                    return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
                                },
                                at = function(t, e, i, n) {
                                    var r, s, o, a, u, l = 1e-6;
                                    return null == t ? a = e : "number" == typeof t ? a = t : (r = 360, s = t.split("_"), u = "=" === t.charAt(1), o = (u ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === t.indexOf("rad") ? 1 : R) - (u ? 0 : e), s.length && (n && (n[i] = e + o), -1 !== t.indexOf("short") && (o %= r, o !== o % (r / 2) && (o = 0 > o ? o + r : o - r)), -1 !== t.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : -1 !== t.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)), a = e + o), l > a && a > -l && (a = 0), a
                                },
                                ut = {
                                    aqua: [0, 255, 255],
                                    lime: [0, 255, 0],
                                    silver: [192, 192, 192],
                                    black: [0, 0, 0],
                                    maroon: [128, 0, 0],
                                    teal: [0, 128, 128],
                                    blue: [0, 0, 255],
                                    navy: [0, 0, 128],
                                    white: [255, 255, 255],
                                    fuchsia: [255, 0, 255],
                                    olive: [128, 128, 0],
                                    yellow: [255, 255, 0],
                                    orange: [255, 165, 0],
                                    gray: [128, 128, 128],
                                    purple: [128, 0, 128],
                                    green: [0, 128, 0],
                                    red: [255, 0, 0],
                                    pink: [255, 192, 203],
                                    cyan: [0, 255, 255],
                                    transparent: [255, 255, 255, 0]
                                },
                                lt = function(t, e, i) {
                                    return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 255 * (1 > 6 * t ? e + (i - e) * t * 6 : .5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
                                },
                                ht = a.parseColor = function(t, e) {
                                    var i, n, r, s, o, a, u, l, h, c, f;
                                    if (t)
                                        if ("number" == typeof t) i = [t >> 16, t >> 8 & 255, 255 & t];
                                        else {
                                            if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ut[t]) i = ut[t];
                                            else if ("#" === t.charAt(0)) 4 === t.length && (n = t.charAt(1), r = t.charAt(2), s = t.charAt(3), t = "#" + n + n + r + r + s + s), t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & 255, 255 & t];
                                            else if ("hsl" === t.substr(0, 3))
                                                if (i = f = t.match(v), e) {
                                                    if (-1 !== t.indexOf("=")) return t.match(y)
                                                } else o = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, u = Number(i[2]) / 100, r = .5 >= u ? u * (a + 1) : u + a - u * a, n = 2 * u - r, i.length > 3 && (i[3] = Number(t[3])), i[0] = lt(o + 1 / 3, n, r), i[1] = lt(o, n, r), i[2] = lt(o - 1 / 3, n, r);
                                            else i = t.match(v) || ut.transparent;
                                            i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
                                        } else i = ut.black;
                                    return e && !f && (n = i[0] / 255, r = i[1] / 255, s = i[2] / 255, l = Math.max(n, r, s), h = Math.min(n, r, s), u = (l + h) / 2, l === h ? o = a = 0 : (c = l - h, a = u > .5 ? c / (2 - l - h) : c / (l + h), o = l === n ? (r - s) / c + (s > r ? 6 : 0) : l === r ? (s - n) / c + 2 : (n - r) / c + 4, o *= 60), i[0] = o + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * u + .5 | 0), i
                                },
                                ct = function(t, e) {
                                    var i, n, r, s = t.match(ft) || [],
                                        o = 0,
                                        a = s.length ? "" : t;
                                    for (i = 0; i < s.length; i++) n = s[i], r = t.substr(o, t.indexOf(n, o) - o), o += r.length + n.length, n = ht(n, e), 3 === n.length && n.push(1), a += r + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
                                    return a
                                },
                                ft = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
                            for (h in ut) ft += "|" + h + "\\b";
                            ft = new RegExp(ft + ")", "gi"), a.colorStringFilter = function(t) {
                                var e, i = t[0] + t[1];
                                ft.lastIndex = 0, ft.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), t[0] = ct(t[0], e), t[1] = ct(t[1], e))
                            }, e.defaultStringFilter || (e.defaultStringFilter = a.colorStringFilter);
                            var dt = function(t, e, i, n) {
                                    if (null == t) return function(t) {
                                        return t
                                    };
                                    var r, s = e ? (t.match(ft) || [""])[0] : "",
                                        o = t.split(s).join("").match(T) || [],
                                        a = t.substr(0, t.indexOf(o[0])),
                                        u = ")" === t.charAt(t.length - 1) ? ")" : "",
                                        l = -1 !== t.indexOf(" ") ? " " : ",",
                                        h = o.length,
                                        c = h > 0 ? o[0].replace(v, "") : "";
                                    return h ? r = e ? function(t) {
                                        var e, f, d, p;
                                        if ("number" == typeof t) t += c;
                                        else if (n && k.test(t)) {
                                            for (p = t.replace(k, "|").split("|"), d = 0; d < p.length; d++) p[d] = r(p[d]);
                                            return p.join(",")
                                        }
                                        if (e = (t.match(ft) || [s])[0], f = t.split(e).join("").match(T) || [], d = f.length, h > d--)
                                            for (; ++d < h;) f[d] = i ? f[(d - 1) / 2 | 0] : o[d];
                                        return a + f.join(l) + l + e + u + (-1 !== t.indexOf("inset") ? " inset" : "")
                                    } : function(t) {
                                        var e, s, f;
                                        if ("number" == typeof t) t += c;
                                        else if (n && k.test(t)) {
                                            for (s = t.replace(k, "|").split("|"), f = 0; f < s.length; f++) s[f] = r(s[f]);
                                            return s.join(",")
                                        }
                                        if (e = t.match(T) || [], f = e.length, h > f--)
                                            for (; ++f < h;) e[f] = i ? e[(f - 1) / 2 | 0] : o[f];
                                        return a + e.join(l) + u
                                    } : function(t) {
                                        return t
                                    }
                                },
                                pt = function(t) {
                                    return t = t.split(","),
                                        function(e, i, n, r, s, o, a) {
                                            var u, l = (i + "").split(" ");
                                            for (a = {}, u = 0; 4 > u; u++) a[t[u]] = l[u] = l[u] || l[(u - 1) / 2 >> 0];
                                            return r.parse(e, a, s, o)
                                        }
                                },
                                mt = (F._setPluginRatio = function(t) {
                                    this.plugin.setRatio(t);
                                    for (var e, i, n, r, s, o = this.data, a = o.proxy, u = o.firstMPT, l = 1e-6; u;) e = a[u.v], u.r ? e = Math.round(e) : l > e && e > -l && (e = 0), u.t[u.p] = e, u = u._next;
                                    if (o.autoRotate && (o.autoRotate.rotation = a.rotation), 1 === t || 0 === t)
                                        for (u = o.firstMPT, s = 1 === t ? "e" : "b"; u;) {
                                            if (i = u.t, i.type) {
                                                if (1 === i.type) {
                                                    for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                                    i[s] = r
                                                }
                                            } else i[s] = i.s + i.xs0;
                                            u = u._next
                                        }
                                }, function(t, e, i, n, r) {
                                    this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
                                }),
                                gt = (F._parseToProxy = function(t, e, i, n, r, s) {
                                    var o, a, u, l, h, c = n,
                                        f = {},
                                        d = {},
                                        p = i._transform,
                                        m = B;
                                    for (i._transform = null, B = e, n = h = i.parse(t, e, n, r), B = m, s && (i._transform = p, c && (c._prev = null, c._prev && (c._prev._next = null))); n && n !== c;) {
                                        if (n.type <= 1 && (a = n.p, d[a] = n.s + n.c, f[a] = n.s, s || (l = new mt(n, "s", a, l, n.r), n.c = 0), 1 === n.type))
                                            for (o = n.l; --o > 0;) u = "xn" + o, a = n.p + "_" + u, d[a] = n.data[u], f[a] = n[u], s || (l = new mt(n, u, a, l, n.rxp[u]));
                                        n = n._next
                                    }
                                    return {
                                        proxy: f,
                                        end: d,
                                        firstMPT: l,
                                        pt: h
                                    }
                                }, F.CSSPropTween = function(t, e, i, r, s, a, u, l, h, c, f) {
                                    this.t = t, this.p = e, this.s = i, this.c = r, this.n = u || e, t instanceof gt || o.push(this.n), this.r = l, this.type = a || 0, h && (this.pr = h, n = !0), this.b = void 0 === c ? i : c, this.e = void 0 === f ? i + r : f, s && (this._next = s, s._prev = this)
                                }),
                                vt = function(t, e, i, n, r, s) {
                                    var o = new gt(t, e, i, n - i, r, -1, s);
                                    return o.b = i, o.e = o.xs0 = n, o
                                },
                                yt = a.parseComplex = function(t, e, i, n, r, s, o, a, u, l) {
                                    i = i || s || "", o = new gt(t, e, 0, 0, o, l ? 2 : 1, null, !1, a, i, n), n += "";
                                    var h, f, d, p, m, g, T, _, b, w, S, x, P, A = i.split(", ").join(",").split(" "),
                                        M = n.split(", ").join(",").split(" "),
                                        E = A.length,
                                        C = c !== !1;
                                    for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (A = A.join(" ").replace(k, ", ").split(" "), M = M.join(" ").replace(k, ", ").split(" "), E = A.length), E !== M.length && (A = (s || "").split(" "), E = A.length), o.plugin = u, o.setRatio = l, ft.lastIndex = 0, h = 0; E > h; h++)
                                        if (p = A[h], m = M[h], _ = parseFloat(p), _ || 0 === _) o.appendXtra("", _, st(m, _), m.replace(y, ""), C && -1 !== m.indexOf("px"), !0);
                                        else if (r && ft.test(p)) x = "," === m.charAt(m.length - 1) ? ")," : ")", P = -1 !== m.indexOf("hsl") && V, p = ht(p, P), m = ht(m, P), b = p.length + m.length > 6, b && !V && 0 === m[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(M[h]).join("transparent")) : (V || (b = !1), P ? o.appendXtra(b ? "hsla(" : "hsl(", p[0], st(m[0], p[0]), ",", !1, !0).appendXtra("", p[1], st(m[1], p[1]), "%,", !1).appendXtra("", p[2], st(m[2], p[2]), b ? "%," : "%" + x, !1) : o.appendXtra(b ? "rgba(" : "rgb(", p[0], m[0] - p[0], ",", !0, !0).appendXtra("", p[1], m[1] - p[1], ",", !0).appendXtra("", p[2], m[2] - p[2], b ? "," : x, !0), b && (p = p.length < 4 ? 1 : p[3], o.appendXtra("", p, (m.length < 4 ? 1 : m[3]) - p, x, !1))), ft.lastIndex = 0;
                                    else if (g = p.match(v)) {
                                        if (T = m.match(y), !T || T.length !== g.length) return o;
                                        for (d = 0, f = 0; f < g.length; f++) S = g[f], w = p.indexOf(S, d), o.appendXtra(p.substr(d, w - d), Number(S), st(T[f], S), "", C && "px" === p.substr(w + S.length, 2), 0 === f), d = w + S.length;
                                        o["xs" + o.l] += p.substr(d)
                                    } else o["xs" + o.l] += o.l ? " " + m : m;
                                    if (-1 !== n.indexOf("=") && o.data) {
                                        for (x = o.xs0 + o.data.s, h = 1; h < o.l; h++) x += o["xs" + h] + o.data["xn" + h];
                                        o.e = x + o["xs" + h]
                                    }
                                    return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
                                },
                                Tt = 9;
                            for (h = gt.prototype, h.l = h.pr = 0; --Tt > 0;) h["xn" + Tt] = 0, h["xs" + Tt] = "";
                            h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function(t, e, i, n, r, s) {
                                var o = this,
                                    a = o.l;
                                return o["xs" + a] += s && a ? " " + t : t || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = e + i, o.rxp["xn" + a] = r, o["xn" + a] = e, o.plugin || (o.xfirst = new gt(o, "xn" + a, e, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                                    s: e + i
                                }, o.rxp = {}, o.s = e, o.c = i, o.r = r, o)) : (o["xs" + a] += e + (n || ""), o)
                            };
                            var _t = function(t, e) {
                                    e = e || {}, this.p = e.prefix ? Y(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || dt(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                                },
                                bt = F._registerComplexSpecialProp = function(t, e, i) {
                                    "object" != typeof e && (e = {
                                        parser: i
                                    });
                                    var n, r, s = t.split(","),
                                        o = e.defaultValue;
                                    for (i = i || [o], n = 0; n < s.length; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || o, r = new _t(s[n], e)
                                },
                                wt = function(t) {
                                    if (!l[t]) {
                                        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                                        bt(t, {
                                            parser: function(t, i, n, r, s, o, a) {
                                                var h = u.com.greensock.plugins[e];
                                                return h ? (h._cssRegister(), l[n].parse(t, i, n, r, s, o, a)) : (W("Error: " + e + " js file not loaded."), s)
                                            }
                                        })
                                    }
                                };
                            h = _t.prototype, h.parseComplex = function(t, e, i, n, r, s) {
                                var o, a, u, l, h, c, f = this.keyword;
                                if (this.multi && (k.test(i) || k.test(e) ? (a = e.replace(k, "|").split("|"), u = i.replace(k, "|").split("|")) : f && (a = [e], u = [i])), u) {
                                    for (l = u.length > a.length ? u.length : a.length, o = 0; l > o; o++) e = a[o] = a[o] || this.dflt, i = u[o] = u[o] || this.dflt, f && (h = e.indexOf(f), c = i.indexOf(f), h !== c && (-1 === c ? a[o] = a[o].split(f).join("") : -1 === h && (a[o] += " " + f)));
                                    e = a.join(", "), i = u.join(", ")
                                }
                                return yt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, s)
                            }, h.parse = function(t, e, i, n, r, o, a) {
                                return this.parseComplex(t.style, this.format(K(t, this.p, s, !1, this.dflt)), this.format(e), r, o)
                            }, a.registerSpecialProp = function(t, e, i) {
                                bt(t, {
                                    parser: function(t, n, r, s, o, a, u) {
                                        var l = new gt(t, r, 0, 0, o, 2, r, !1, i);
                                        return l.plugin = a, l.setRatio = e(t, n, s._tween, r), l
                                    },
                                    priority: i
                                })
                            }, a.useSVGTransformAttr = d || p;
                            var St, xt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                                Pt = Y("transform"),
                                At = z + "transform",
                                Mt = Y("transformOrigin"),
                                Et = null !== Y("perspective"),
                                Ct = F.Transform = function() {
                                    this.perspective = parseFloat(a.defaultTransformPerspective) || 0, this.force3D = a.defaultForce3D !== !1 && Et ? a.defaultForce3D || "auto" : !1
                                },
                                Ot = window.SVGElement,
                                Dt = function(t, e, i) {
                                    var n, r = H.createElementNS("http://www.w3.org/2000/svg", t),
                                        s = /([a-z])([A-Z])/g;
                                    for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
                                    return e.appendChild(r), r
                                },
                                It = H.documentElement,
                                kt = function() {
                                    var t, e, i, n = g || /Android/i.test(X) && !window.chrome;
                                    return H.createElementNS && !n && (t = Dt("svg", It), e = Dt("rect", t, {
                                        width: 100,
                                        height: 50,
                                        x: 100
                                    }), i = e.getBoundingClientRect().width, e.style[Mt] = "50% 50%", e.style[Pt] = "scaleX(0.5)", n = i === e.getBoundingClientRect().width && !(p && Et), It.removeChild(t)), n
                                }(),
                                Gt = function(t, e, i, n, r) {
                                    var s, o, u, l, h, c, f, d, p, m, g, v, y, T, _ = t._gsTransform,
                                        b = Ht(t, !0);
                                    _ && (y = _.xOrigin, T = _.yOrigin), (!n || (s = n.split(" ")).length < 2) && (f = t.getBBox(), e = rt(e).split(" "), s = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * f.width : parseFloat(e[0])) + f.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * f.height : parseFloat(e[1])) + f.y]), i.xOrigin = l = parseFloat(s[0]), i.yOrigin = h = parseFloat(s[1]), n && b !== Bt && (c = b[0], f = b[1], d = b[2], p = b[3], m = b[4], g = b[5], v = c * p - f * d, o = l * (p / v) + h * (-d / v) + (d * g - p * m) / v, u = l * (-f / v) + h * (c / v) - (c * g - f * m) / v, l = i.xOrigin = s[0] = o, h = i.yOrigin = s[1] = u), _ && (r || r !== !1 && a.defaultSmoothOrigin !== !1 ? (o = l - y, u = h - T, _.xOffset += o * b[0] + u * b[2] - o, _.yOffset += o * b[1] + u * b[3] - u) : _.xOffset = _.yOffset = 0), t.setAttribute("data-svg-origin", s.join(" "))
                                },
                                Rt = function(t) {
                                    return !!(Ot && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
                                },
                                Bt = [1, 0, 0, 1, 0, 0],
                                Ht = function(t, e) {
                                    var i, n, r, s, o, a = t._gsTransform || new Ct,
                                        u = 1e5;
                                    if (Pt ? n = K(t, At, null, !0) : t.currentStyle && (n = t.currentStyle.filter.match(D), n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), a.x || 0, a.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, (a.svg || t.getBBox && Rt(t)) && (i && -1 !== (t.style[Pt] + "").indexOf("matrix") && (n = t.style[Pt], i = 0), r = t.getAttribute("transform"), i && r && (-1 !== r.indexOf("matrix") ? (n = r, i = 0) : -1 !== r.indexOf("translate") && (n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Bt;
                                    for (r = (n || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], Tt = r.length; --Tt > -1;) s = Number(r[Tt]), r[Tt] = (o = s - (s |= 0)) ? (o * u + (0 > o ? -.5 : .5) | 0) / u + s : s;
                                    return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
                                },
                                Lt = F.getTransform = function(t, i, n, r) {
                                    if (t._gsTransform && n && !r) return t._gsTransform;
                                    var o, u, l, h, c, f, d = n ? t._gsTransform || new Ct : new Ct,
                                        p = d.scaleX < 0,
                                        m = 2e-5,
                                        g = 1e5,
                                        v = Et ? parseFloat(K(t, Mt, i, !1, "0 0 0").split(" ")[2]) || d.zOrigin || 0 : 0,
                                        y = parseFloat(a.defaultTransformPerspective) || 0;
                                    if (d.svg = !(!t.getBBox || !Rt(t)), d.svg && (Gt(t, K(t, Mt, s, !1, "50% 50%") + "", d, t.getAttribute("data-svg-origin")), St = a.useSVGTransformAttr || kt), o = Ht(t), o !== Bt) {
                                        if (16 === o.length) {
                                            var T, _, b, w, S, x = o[0],
                                                P = o[1],
                                                A = o[2],
                                                M = o[3],
                                                E = o[4],
                                                C = o[5],
                                                O = o[6],
                                                D = o[7],
                                                I = o[8],
                                                k = o[9],
                                                G = o[10],
                                                B = o[12],
                                                H = o[13],
                                                L = o[14],
                                                N = o[11],
                                                j = Math.atan2(O, G);
                                            d.zOrigin && (L = -d.zOrigin, B = I * L - o[12], H = k * L - o[13], L = G * L + d.zOrigin - o[14]), d.rotationX = j * R, j && (w = Math.cos(-j), S = Math.sin(-j), T = E * w + I * S, _ = C * w + k * S, b = O * w + G * S, I = E * -S + I * w, k = C * -S + k * w, G = O * -S + G * w, N = D * -S + N * w, E = T, C = _, O = b), j = Math.atan2(-A, G), d.rotationY = j * R, j && (w = Math.cos(-j), S = Math.sin(-j), T = x * w - I * S, _ = P * w - k * S, b = A * w - G * S, k = P * S + k * w, G = A * S + G * w, N = M * S + N * w, x = T, P = _, A = b), j = Math.atan2(P, x), d.rotation = j * R, j && (w = Math.cos(-j), S = Math.sin(-j), x = x * w + E * S, _ = P * w + C * S, C = P * -S + C * w, O = A * -S + O * w, P = _), d.rotationX && Math.abs(d.rotationX) + Math.abs(d.rotation) > 359.9 && (d.rotationX = d.rotation = 0, d.rotationY = 180 - d.rotationY), d.scaleX = (Math.sqrt(x * x + P * P) * g + .5 | 0) / g, d.scaleY = (Math.sqrt(C * C + k * k) * g + .5 | 0) / g, d.scaleZ = (Math.sqrt(O * O + G * G) * g + .5 | 0) / g, d.skewX = 0, d.perspective = N ? 1 / (0 > N ? -N : N) : 0, d.x = B, d.y = H, d.z = L, d.svg && (d.x -= d.xOrigin - (d.xOrigin * x - d.yOrigin * E), d.y -= d.yOrigin - (d.yOrigin * P - d.xOrigin * C))
                                        } else if ((!Et || r || !o.length || d.x !== o[4] || d.y !== o[5] || !d.rotationX && !d.rotationY) && (void 0 === d.x || "none" !== K(t, "display", i))) {
                                            var F = o.length >= 6,
                                                X = F ? o[0] : 1,
                                                V = o[1] || 0,
                                                U = o[2] || 0,
                                                W = F ? o[3] : 1;
                                            d.x = o[4] || 0, d.y = o[5] || 0, l = Math.sqrt(X * X + V * V), h = Math.sqrt(W * W + U * U), c = X || V ? Math.atan2(V, X) * R : d.rotation || 0,
                                                f = U || W ? Math.atan2(U, W) * R + c : d.skewX || 0, Math.abs(f) > 90 && Math.abs(f) < 270 && (p ? (l *= -1, f += 0 >= c ? 180 : -180, c += 0 >= c ? 180 : -180) : (h *= -1, f += 0 >= f ? 180 : -180)), d.scaleX = l, d.scaleY = h, d.rotation = c, d.skewX = f, Et && (d.rotationX = d.rotationY = d.z = 0, d.perspective = y, d.scaleZ = 1), d.svg && (d.x -= d.xOrigin - (d.xOrigin * X + d.yOrigin * U), d.y -= d.yOrigin - (d.xOrigin * V + d.yOrigin * W))
                                        }
                                        d.zOrigin = v;
                                        for (u in d) d[u] < m && d[u] > -m && (d[u] = 0)
                                    }
                                    return n && (t._gsTransform = d, d.svg && (St && t.style[Pt] ? e.delayedCall(.001, function() {
                                        Xt(t.style, Pt)
                                    }) : !St && t.getAttribute("transform") && e.delayedCall(.001, function() {
                                        t.removeAttribute("transform")
                                    }))), d
                                },
                                Nt = function(t) {
                                    var e, i, n = this.data,
                                        r = -n.rotation * G,
                                        s = r + n.skewX * G,
                                        o = 1e5,
                                        a = (Math.cos(r) * n.scaleX * o | 0) / o,
                                        u = (Math.sin(r) * n.scaleX * o | 0) / o,
                                        l = (Math.sin(s) * -n.scaleY * o | 0) / o,
                                        h = (Math.cos(s) * n.scaleY * o | 0) / o,
                                        c = this.t.style,
                                        f = this.t.currentStyle;
                                    if (f) {
                                        i = u, u = -l, l = -i, e = f.filter, c.filter = "";
                                        var d, p, m = this.t.offsetWidth,
                                            v = this.t.offsetHeight,
                                            y = "absolute" !== f.position,
                                            T = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + u + ", M21=" + l + ", M22=" + h,
                                            _ = n.x + m * n.xPercent / 100,
                                            S = n.y + v * n.yPercent / 100;
                                        if (null != n.ox && (d = (n.oxp ? m * n.ox * .01 : n.ox) - m / 2, p = (n.oyp ? v * n.oy * .01 : n.oy) - v / 2, _ += d - (d * a + p * u), S += p - (d * l + p * h)), y ? (d = m / 2, p = v / 2, T += ", Dx=" + (d - (d * a + p * u) + _) + ", Dy=" + (p - (d * l + p * h) + S) + ")") : T += ", sizingMethod='auto expand')", -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? c.filter = e.replace(I, T) : c.filter = T + " " + e, (0 === t || 1 === t) && 1 === a && 0 === u && 0 === l && 1 === h && (y && -1 === T.indexOf("Dx=0, Dy=0") || w.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && c.removeAttribute("filter")), !y) {
                                            var x, P, A, M = 8 > g ? 1 : -1;
                                            for (d = n.ieOffsetX || 0, p = n.ieOffsetY || 0, n.ieOffsetX = Math.round((m - ((0 > a ? -a : a) * m + (0 > u ? -u : u) * v)) / 2 + _), n.ieOffsetY = Math.round((v - ((0 > h ? -h : h) * v + (0 > l ? -l : l) * m)) / 2 + S), Tt = 0; 4 > Tt; Tt++) P = it[Tt], x = f[P], i = -1 !== x.indexOf("px") ? parseFloat(x) : Q(this.t, P, parseFloat(x), x.replace(b, "")) || 0, A = i !== n[P] ? 2 > Tt ? -n.ieOffsetX : -n.ieOffsetY : 2 > Tt ? d - n.ieOffsetX : p - n.ieOffsetY, c[P] = (n[P] = Math.round(i - A * (0 === Tt || 2 === Tt ? 1 : M))) + "px"
                                        }
                                    }
                                },
                                jt = F.set3DTransformRatio = F.setTransformRatio = function(t) {
                                    var e, i, n, r, s, o, a, u, l, h, c, f, d, m, g, v, y, T, _, b, w, S, x, P = this.data,
                                        A = this.t.style,
                                        M = P.rotation,
                                        E = P.rotationX,
                                        C = P.rotationY,
                                        O = P.scaleX,
                                        D = P.scaleY,
                                        I = P.scaleZ,
                                        k = P.x,
                                        R = P.y,
                                        B = P.z,
                                        H = P.svg,
                                        L = P.perspective,
                                        N = P.force3D;
                                    if (((1 === t || 0 === t) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !B && !L && !C && !E && 1 === I || St && H || !Et) return void(M || P.skewX || H ? (M *= G, S = P.skewX * G, x = 1e5, e = Math.cos(M) * O, r = Math.sin(M) * O, i = Math.sin(M - S) * -D, s = Math.cos(M - S) * D, S && "simple" === P.skewType && (y = Math.tan(S), y = Math.sqrt(1 + y * y), i *= y, s *= y, P.skewY && (e *= y, r *= y)), H && (k += P.xOrigin - (P.xOrigin * e + P.yOrigin * i) + P.xOffset, R += P.yOrigin - (P.xOrigin * r + P.yOrigin * s) + P.yOffset, St && (P.xPercent || P.yPercent) && (m = this.t.getBBox(), k += .01 * P.xPercent * m.width, R += .01 * P.yPercent * m.height), m = 1e-6, m > k && k > -m && (k = 0), m > R && R > -m && (R = 0)), _ = (e * x | 0) / x + "," + (r * x | 0) / x + "," + (i * x | 0) / x + "," + (s * x | 0) / x + "," + k + "," + R + ")", H && St ? this.t.setAttribute("transform", "matrix(" + _) : A[Pt] = (P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) matrix(" : "matrix(") + _) : A[Pt] = (P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) matrix(" : "matrix(") + O + ",0,0," + D + "," + k + "," + R + ")");
                                    if (p && (m = 1e-4, m > O && O > -m && (O = I = 2e-5), m > D && D > -m && (D = I = 2e-5), !L || P.z || P.rotationX || P.rotationY || (L = 0)), M || P.skewX) M *= G, g = e = Math.cos(M), v = r = Math.sin(M), P.skewX && (M -= P.skewX * G, g = Math.cos(M), v = Math.sin(M), "simple" === P.skewType && (y = Math.tan(P.skewX * G), y = Math.sqrt(1 + y * y), g *= y, v *= y, P.skewY && (e *= y, r *= y))), i = -v, s = g;
                                    else {
                                        if (!(C || E || 1 !== I || L || H)) return void(A[Pt] = (P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) translate3d(" : "translate3d(") + k + "px," + R + "px," + B + "px)" + (1 !== O || 1 !== D ? " scale(" + O + "," + D + ")" : ""));
                                        e = s = 1, i = r = 0
                                    }
                                    l = 1, n = o = a = u = h = c = 0, f = L ? -1 / L : 0, d = P.zOrigin, m = 1e-6, b = ",", w = "0", M = C * G, M && (g = Math.cos(M), v = Math.sin(M), a = -v, h = f * -v, n = e * v, o = r * v, l = g, f *= g, e *= g, r *= g), M = E * G, M && (g = Math.cos(M), v = Math.sin(M), y = i * g + n * v, T = s * g + o * v, u = l * v, c = f * v, n = i * -v + n * g, o = s * -v + o * g, l *= g, f *= g, i = y, s = T), 1 !== I && (n *= I, o *= I, l *= I, f *= I), 1 !== D && (i *= D, s *= D, u *= D, c *= D), 1 !== O && (e *= O, r *= O, a *= O, h *= O), (d || H) && (d && (k += n * -d, R += o * -d, B += l * -d + d), H && (k += P.xOrigin - (P.xOrigin * e + P.yOrigin * i) + P.xOffset, R += P.yOrigin - (P.xOrigin * r + P.yOrigin * s) + P.yOffset), m > k && k > -m && (k = w), m > R && R > -m && (R = w), m > B && B > -m && (B = 0)), _ = P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) matrix3d(" : "matrix3d(", _ += (m > e && e > -m ? w : e) + b + (m > r && r > -m ? w : r) + b + (m > a && a > -m ? w : a), _ += b + (m > h && h > -m ? w : h) + b + (m > i && i > -m ? w : i) + b + (m > s && s > -m ? w : s), E || C || 1 !== I ? (_ += b + (m > u && u > -m ? w : u) + b + (m > c && c > -m ? w : c) + b + (m > n && n > -m ? w : n), _ += b + (m > o && o > -m ? w : o) + b + (m > l && l > -m ? w : l) + b + (m > f && f > -m ? w : f) + b) : _ += ",0,0,0,0,1,0,", _ += k + b + R + b + B + b + (L ? 1 + -B / L : 1) + ")", A[Pt] = _
                                };
                            h = Ct.prototype, h.x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0, h.scaleX = h.scaleY = h.scaleZ = 1, bt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                                parser: function(t, e, i, n, r, o, u) {
                                    if (n._lastParsedTransform === u) return r;
                                    n._lastParsedTransform = u;
                                    var l, h, c, f, d, p, m, g, v, y, T = t._gsTransform,
                                        _ = t.style,
                                        b = 1e-6,
                                        w = xt.length,
                                        S = u,
                                        x = {},
                                        P = "transformOrigin";
                                    if (u.display ? (f = K(t, "display"), _.display = "block", l = Lt(t, s, !0, u.parseTransform), _.display = f) : l = Lt(t, s, !0, u.parseTransform), n._transform = l, "string" == typeof S.transform && Pt) f = N.style, f[Pt] = S.transform, f.display = "block", f.position = "absolute", H.body.appendChild(N), h = Lt(N, null, !1), H.body.removeChild(N), h.perspective || (h.perspective = l.perspective), null != S.xPercent && (h.xPercent = ot(S.xPercent, l.xPercent)), null != S.yPercent && (h.yPercent = ot(S.yPercent, l.yPercent));
                                    else if ("object" == typeof S) {
                                        if (h = {
                                                scaleX: ot(null != S.scaleX ? S.scaleX : S.scale, l.scaleX),
                                                scaleY: ot(null != S.scaleY ? S.scaleY : S.scale, l.scaleY),
                                                scaleZ: ot(S.scaleZ, l.scaleZ),
                                                x: ot(S.x, l.x),
                                                y: ot(S.y, l.y),
                                                z: ot(S.z, l.z),
                                                xPercent: ot(S.xPercent, l.xPercent),
                                                yPercent: ot(S.yPercent, l.yPercent),
                                                perspective: ot(S.transformPerspective, l.perspective)
                                            }, g = S.directionalRotation, null != g)
                                            if ("object" == typeof g)
                                                for (f in g) S[f] = g[f];
                                            else S.rotation = g;
                                            "string" == typeof S.x && -1 !== S.x.indexOf("%") && (h.x = 0, h.xPercent = ot(S.x, l.xPercent)), "string" == typeof S.y && -1 !== S.y.indexOf("%") && (h.y = 0, h.yPercent = ot(S.y, l.yPercent)), h.rotation = at("rotation" in S ? S.rotation : "shortRotation" in S ? S.shortRotation + "_short" : "rotationZ" in S ? S.rotationZ : l.rotation, l.rotation, "rotation", x), Et && (h.rotationX = at("rotationX" in S ? S.rotationX : "shortRotationX" in S ? S.shortRotationX + "_short" : l.rotationX || 0, l.rotationX, "rotationX", x), h.rotationY = at("rotationY" in S ? S.rotationY : "shortRotationY" in S ? S.shortRotationY + "_short" : l.rotationY || 0, l.rotationY, "rotationY", x)), h.skewX = null == S.skewX ? l.skewX : at(S.skewX, l.skewX), h.skewY = null == S.skewY ? l.skewY : at(S.skewY, l.skewY), (c = h.skewY - l.skewY) && (h.skewX += c, h.rotation += c)
                                    }
                                    for (Et && null != S.force3D && (l.force3D = S.force3D, m = !0), l.skewType = S.skewType || l.skewType || a.defaultSkewType, p = l.force3D || l.z || l.rotationX || l.rotationY || h.z || h.rotationX || h.rotationY || h.perspective, p || null == S.scale || (h.scaleZ = 1); --w > -1;) i = xt[w], d = h[i] - l[i], (d > b || -b > d || null != S[i] || null != B[i]) && (m = !0, r = new gt(l, i, l[i], d, r), i in x && (r.e = x[i]), r.xs0 = 0, r.plugin = o, n._overwriteProps.push(r.n));
                                    return d = S.transformOrigin, l.svg && (d || S.svgOrigin) && (v = l.xOffset, y = l.yOffset, Gt(t, rt(d), h, S.svgOrigin, S.smoothOrigin), r = vt(l, "xOrigin", (T ? l : h).xOrigin, h.xOrigin, r, P), r = vt(l, "yOrigin", (T ? l : h).yOrigin, h.yOrigin, r, P), (v !== l.xOffset || y !== l.yOffset) && (r = vt(l, "xOffset", T ? v : l.xOffset, l.xOffset, r, P), r = vt(l, "yOffset", T ? y : l.yOffset, l.yOffset, r, P)), d = St ? null : "0px 0px"), (d || Et && p && l.zOrigin) && (Pt ? (m = !0, i = Mt, d = (d || K(t, i, s, !1, "50% 50%")) + "", r = new gt(_, i, 0, 0, r, -1, P), r.b = _[i], r.plugin = o, Et ? (f = l.zOrigin, d = d.split(" "), l.zOrigin = (d.length > 2 && (0 === f || "0px" !== d[2]) ? parseFloat(d[2]) : f) || 0, r.xs0 = r.e = d[0] + " " + (d[1] || "50%") + " 0px", r = new gt(l, "zOrigin", 0, 0, r, -1, r.n), r.b = f, r.xs0 = r.e = l.zOrigin) : r.xs0 = r.e = d) : rt(d + "", l)), m && (n._transformType = l.svg && St || !p && 3 !== this._transformType ? 2 : 3), r
                                },
                                prefix: !0
                            }), bt("boxShadow", {
                                defaultValue: "0px 0px 0px 0px #999",
                                prefix: !0,
                                color: !0,
                                multi: !0,
                                keyword: "inset"
                            }), bt("borderRadius", {
                                defaultValue: "0px",
                                parser: function(t, e, i, n, o, a) {
                                    e = this.format(e);
                                    var u, l, h, c, f, d, p, m, g, v, y, T, _, b, w, S, x = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                                        P = t.style;
                                    for (g = parseFloat(t.offsetWidth), v = parseFloat(t.offsetHeight), u = e.split(" "), l = 0; l < x.length; l++) this.p.indexOf("border") && (x[l] = Y(x[l])), f = c = K(t, x[l], s, !1, "0px"), -1 !== f.indexOf(" ") && (c = f.split(" "), f = c[0], c = c[1]), d = h = u[l], p = parseFloat(f), T = f.substr((p + "").length), _ = "=" === d.charAt(1), _ ? (m = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), m *= parseFloat(d), y = d.substr((m + "").length - (0 > m ? 1 : 0)) || "") : (m = parseFloat(d), y = d.substr((m + "").length)), "" === y && (y = r[i] || T), y !== T && (b = Q(t, "borderLeft", p, T), w = Q(t, "borderTop", p, T), "%" === y ? (f = b / g * 100 + "%", c = w / v * 100 + "%") : "em" === y ? (S = Q(t, "borderLeft", 1, "em"), f = b / S + "em", c = w / S + "em") : (f = b + "px", c = w + "px"), _ && (d = parseFloat(f) + m + y, h = parseFloat(c) + m + y)), o = yt(P, x[l], f + " " + c, d + " " + h, !1, "0px", o);
                                    return o
                                },
                                prefix: !0,
                                formatter: dt("0px 0px 0px 0px", !1, !0)
                            }), bt("backgroundPosition", {
                                defaultValue: "0 0",
                                parser: function(t, e, i, n, r, o) {
                                    var a, u, l, h, c, f, d = "background-position",
                                        p = s || $(t, null),
                                        m = this.format((p ? g ? p.getPropertyValue(d + "-x") + " " + p.getPropertyValue(d + "-y") : p.getPropertyValue(d) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                                        v = this.format(e);
                                    if (-1 !== m.indexOf("%") != (-1 !== v.indexOf("%")) && (f = K(t, "backgroundImage").replace(E, ""), f && "none" !== f)) {
                                        for (a = m.split(" "), u = v.split(" "), j.setAttribute("src", f), l = 2; --l > -1;) m = a[l], h = -1 !== m.indexOf("%"), h !== (-1 !== u[l].indexOf("%")) && (c = 0 === l ? t.offsetWidth - j.width : t.offsetHeight - j.height, a[l] = h ? parseFloat(m) / 100 * c + "px" : parseFloat(m) / c * 100 + "%");
                                        m = a.join(" ")
                                    }
                                    return this.parseComplex(t.style, m, v, r, o)
                                },
                                formatter: rt
                            }), bt("backgroundSize", {
                                defaultValue: "0 0",
                                formatter: rt
                            }), bt("perspective", {
                                defaultValue: "0px",
                                prefix: !0
                            }), bt("perspectiveOrigin", {
                                defaultValue: "50% 50%",
                                prefix: !0
                            }), bt("transformStyle", {
                                prefix: !0
                            }), bt("backfaceVisibility", {
                                prefix: !0
                            }), bt("userSelect", {
                                prefix: !0
                            }), bt("margin", {
                                parser: pt("marginTop,marginRight,marginBottom,marginLeft")
                            }), bt("padding", {
                                parser: pt("paddingTop,paddingRight,paddingBottom,paddingLeft")
                            }), bt("clip", {
                                defaultValue: "rect(0px,0px,0px,0px)",
                                parser: function(t, e, i, n, r, o) {
                                    var a, u, l;
                                    return 9 > g ? (u = t.currentStyle, l = 8 > g ? " " : ",", a = "rect(" + u.clipTop + l + u.clipRight + l + u.clipBottom + l + u.clipLeft + ")", e = this.format(e).split(",").join(l)) : (a = this.format(K(t, this.p, s, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, r, o)
                                }
                            }), bt("textShadow", {
                                defaultValue: "0px 0px 0px #999",
                                color: !0,
                                multi: !0
                            }), bt("autoRound,strictUnits", {
                                parser: function(t, e, i, n, r) {
                                    return r
                                }
                            }), bt("border", {
                                defaultValue: "0px solid #000",
                                parser: function(t, e, i, n, r, o) {
                                    return this.parseComplex(t.style, this.format(K(t, "borderTopWidth", s, !1, "0px") + " " + K(t, "borderTopStyle", s, !1, "solid") + " " + K(t, "borderTopColor", s, !1, "#000")), this.format(e), r, o)
                                },
                                color: !0,
                                formatter: function(t) {
                                    var e = t.split(" ");
                                    return e[0] + " " + (e[1] || "solid") + " " + (t.match(ft) || ["#000"])[0]
                                }
                            }), bt("borderWidth", {
                                parser: pt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                            }), bt("float,cssFloat,styleFloat", {
                                parser: function(t, e, i, n, r, s) {
                                    var o = t.style,
                                        a = "cssFloat" in o ? "cssFloat" : "styleFloat";
                                    return new gt(o, a, 0, 0, r, -1, i, !1, 0, o[a], e)
                                }
                            });
                            var Ft = function(t) {
                                var e, i = this.t,
                                    n = i.filter || K(this.data, "filter") || "",
                                    r = this.s + this.c * t | 0;
                                100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), e = !K(this.data, "filter")) : (i.filter = n.replace(x, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(w, "opacity=" + r))
                            };
                            bt("opacity,alpha,autoAlpha", {
                                defaultValue: "1",
                                parser: function(t, e, i, n, r, o) {
                                    var a = parseFloat(K(t, "opacity", s, !1, "1")),
                                        u = t.style,
                                        l = "autoAlpha" === i;
                                    return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), l && 1 === a && "hidden" === K(t, "visibility", s) && 0 !== e && (a = 0), V ? r = new gt(u, "opacity", a, e - a, r) : (r = new gt(u, "opacity", 100 * a, 100 * (e - a), r), r.xn1 = l ? 1 : 0, u.zoom = 1, r.type = 2, r.b = "alpha(opacity=" + r.s + ")", r.e = "alpha(opacity=" + (r.s + r.c) + ")", r.data = t, r.plugin = o, r.setRatio = Ft), l && (r = new gt(u, "visibility", 0, 0, r, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), r.xs0 = "inherit", n._overwriteProps.push(r.n), n._overwriteProps.push(i)), r
                                }
                            });
                            var Xt = function(t, e) {
                                    e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(A, "-$1").toLowerCase())) : t.removeAttribute(e))
                                },
                                Vt = function(t) {
                                    if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                                        this.t.setAttribute("class", 0 === t ? this.b : this.e);
                                        for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Xt(i, e.p), e = e._next;
                                        1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                                    } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                                };
                            bt("className", {
                                parser: function(t, e, i, r, o, a, u) {
                                    var l, h, c, f, d, p = t.getAttribute("class") || "",
                                        m = t.style.cssText;
                                    if (o = r._classNamePT = new gt(t, i, 0, 0, o, 2), o.setRatio = Vt, o.pr = -11, n = !0, o.b = p, h = J(t, s), c = t._gsClassPT) {
                                        for (f = {}, d = c.data; d;) f[d.p] = 1, d = d._next;
                                        c.setRatio(1)
                                    }
                                    return t._gsClassPT = o, o.e = "=" !== e.charAt(1) ? e : p.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", o.e), l = tt(t, h, J(t), u, f), t.setAttribute("class", p), o.data = l.firstMPT, t.style.cssText = m, o = o.xfirst = r.parse(t, l.difs, o, a)
                                }
                            });
                            var Ut = function(t) {
                                if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                                    var e, i, n, r, s, o = this.t.style,
                                        a = l.transform.parse;
                                    if ("all" === this.e) o.cssText = "", r = !0;
                                    else
                                        for (e = this.e.split(" ").join("").split(","), n = e.length; --n > -1;) i = e[n], l[i] && (l[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Mt : l[i].p), Xt(o, i);
                                    r && (Xt(o, Pt), s = this.t._gsTransform, s && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                                }
                            };
                            for (bt("clearProps", {
                                    parser: function(t, e, i, r, s) {
                                        return s = new gt(t, i, 0, 0, s, 2), s.setRatio = Ut, s.e = e, s.pr = -10, s.data = r._tween, n = !0, s
                                    }
                                }), h = "bezier,throwProps,physicsProps,physics2D".split(","), Tt = h.length; Tt--;) wt(h[Tt]);
                            h = a.prototype, h._firstPT = h._lastParsedTransform = h._transform = null, h._onInitTween = function(t, e, i) {
                                if (!t.nodeType) return !1;
                                this._target = t, this._tween = i, this._vars = e, c = e.autoRound, n = !1, r = e.suffixMap || a.suffixMap, s = $(t, ""), o = this._overwriteProps;
                                var u, h, p, g, v, y, T, _, b, w = t.style;
                                if (f && "" === w.zIndex && (u = K(t, "zIndex", s), ("auto" === u || "" === u) && this._addLazySet(w, "zIndex", 0)), "string" == typeof e && (g = w.cssText, u = J(t, s), w.cssText = g + ";" + e, u = tt(t, u, J(t)).difs, !V && S.test(e) && (u.opacity = parseFloat(RegExp.$1)), e = u, w.cssText = g), e.className ? this._firstPT = h = l.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = h = this.parse(t, e, null), this._transformType) {
                                    for (b = 3 === this._transformType, Pt ? d && (f = !0, "" === w.zIndex && (T = K(t, "zIndex", s), ("auto" === T || "" === T) && this._addLazySet(w, "zIndex", 0)), m && this._addLazySet(w, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (b ? "visible" : "hidden"))) : w.zoom = 1, p = h; p && p._next;) p = p._next;
                                    _ = new gt(t, "transform", 0, 0, null, 2), this._linkCSSP(_, null, p), _.setRatio = Pt ? jt : Nt, _.data = this._transform || Lt(t, s, !0), _.tween = i, _.pr = -1, o.pop()
                                }
                                if (n) {
                                    for (; h;) {
                                        for (y = h._next, p = g; p && p.pr > h.pr;) p = p._next;
                                        (h._prev = p ? p._prev : v) ? h._prev._next = h: g = h, (h._next = p) ? p._prev = h : v = h, h = y
                                    }
                                    this._firstPT = g
                                }
                                return !0
                            }, h.parse = function(t, e, i, n) {
                                var o, a, u, h, f, d, p, m, g, v, y = t.style;
                                for (o in e) d = e[o], a = l[o], a ? i = a.parse(t, d, o, this, i, n, e) : (f = K(t, o, s) + "", g = "string" == typeof d, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || g && P.test(d) ? (g || (d = ht(d), d = (d.length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"), i = yt(y, o, f, d, !0, "transparent", i, 0, n)) : !g || -1 === d.indexOf(" ") && -1 === d.indexOf(",") ? (u = parseFloat(f), p = u || 0 === u ? f.substr((u + "").length) : "", ("" === f || "auto" === f) && ("width" === o || "height" === o ? (u = nt(t, o, s), p = "px") : "left" === o || "top" === o ? (u = Z(t, o, s), p = "px") : (u = "opacity" !== o ? 0 : 1, p = "")), v = g && "=" === d.charAt(1), v ? (h = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), h *= parseFloat(d), m = d.replace(b, "")) : (h = parseFloat(d), m = g ? d.replace(b, "") : ""), "" === m && (m = o in r ? r[o] : p), d = h || 0 === h ? (v ? h + u : h) + m : e[o], p !== m && "" !== m && (h || 0 === h) && u && (u = Q(t, o, u, p), "%" === m ? (u /= Q(t, o, 100, "%") / 100, e.strictUnits !== !0 && (f = u + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? u /= Q(t, o, 1, m) : "px" !== m && (h = Q(t, o, h, m), m = "px"), v && (h || 0 === h) && (d = h + u + m)), v && (h += u), !u && 0 !== u || !h && 0 !== h ? void 0 !== y[o] && (d || d + "" != "NaN" && null != d) ? (i = new gt(y, o, h || u || 0, 0, i, -1, o, !1, 0, f, d), i.xs0 = "none" !== d || "display" !== o && -1 === o.indexOf("Style") ? d : f) : W("invalid " + o + " tween value: " + e[o]) : (i = new gt(y, o, u, h - u, i, 0, o, c !== !1 && ("px" === m || "zIndex" === o), 0, f, d), i.xs0 = m)) : i = yt(y, o, f, d, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
                                return i
                            }, h.setRatio = function(t) {
                                var e, i, n, r = this._firstPT,
                                    s = 1e-6;
                                if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                                    if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                                        for (; r;) {
                                            if (e = r.c * t + r.s, r.r ? e = Math.round(e) : s > e && e > -s && (e = 0), r.type)
                                                if (1 === r.type)
                                                    if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                                    else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                            else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                            else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                            else {
                                                for (i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                                r.t[r.p] = i
                                            } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                                            else r.t[r.p] = e + r.xs0;
                                            r = r._next
                                        } else
                                            for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
                                    else
                                        for (; r;) {
                                            if (2 !== r.type)
                                                if (r.r && -1 !== r.type)
                                                    if (e = Math.round(r.s + r.c), r.type) {
                                                        if (1 === r.type) {
                                                            for (n = r.l, i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                                            r.t[r.p] = i
                                                        }
                                                    } else r.t[r.p] = e + r.xs0;
                                            else r.t[r.p] = r.e;
                                            else r.setRatio(t);
                                            r = r._next
                                        }
                            }, h._enableTransforms = function(t) {
                                this._transform = this._transform || Lt(this._target, s, !0), this._transformType = this._transform.svg && St || !t && 3 !== this._transformType ? 2 : 3
                            };
                            var Wt = function(t) {
                                this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                            };
                            h._addLazySet = function(t, e, i) {
                                var n = this._firstPT = new gt(t, e, 0, 0, this._firstPT, 2);
                                n.e = i, n.setRatio = Wt, n.data = this
                            }, h._linkCSSP = function(t, e, i, n) {
                                return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
                            }, h._kill = function(e) {
                                var i, n, r, s = e;
                                if (e.autoAlpha || e.alpha) {
                                    s = {};
                                    for (n in e) s[n] = e[n];
                                    s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                                }
                                return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, s)
                            };
                            var zt = function(t, e, i) {
                                var n, r, s, o;
                                if (t.slice)
                                    for (r = t.length; --r > -1;) zt(t[r], e, i);
                                else
                                    for (n = t.childNodes, r = n.length; --r > -1;) s = n[r], o = s.type, s.style && (e.push(J(s)), i && i.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || zt(s, e, i)
                            };
                            return a.cascadeTo = function(t, i, n) {
                                var r, s, o, a, u = e.to(t, i, n),
                                    l = [u],
                                    h = [],
                                    c = [],
                                    f = [],
                                    d = e._internals.reservedProps;
                                for (t = u._targets || u.target, zt(t, h, f), u.render(i, !0, !0), zt(t, c), u.render(0, !0, !0), u._enabled(!0), r = f.length; --r > -1;)
                                    if (s = tt(f[r], h[r], c[r]), s.firstMPT) {
                                        s = s.difs;
                                        for (o in n) d[o] && (s[o] = n[o]);
                                        a = {};
                                        for (o in s) a[o] = h[r][o];
                                        l.push(e.fromTo(f[r], i, a, s))
                                    }
                                return l
                            }, t.activate([a]), a
                        }, !0),
                        function() {
                            var t = i._gsDefine.plugin({
                                    propName: "roundProps",
                                    version: "1.5",
                                    priority: -1,
                                    API: 2,
                                    init: function(t, e, i) {
                                        return this._tween = i, !0
                                    }
                                }),
                                e = function(t) {
                                    for (; t;) t.f || t.blob || (t.r = 1), t = t._next
                                },
                                n = t.prototype;
                            n._onInitAllProps = function() {
                                for (var t, i, n, r = this._tween, s = r.vars.roundProps.join ? r.vars.roundProps : r.vars.roundProps.split(","), o = s.length, a = {}, u = r._propLookup.roundProps; --o > -1;) a[s[o]] = 1;
                                for (o = s.length; --o > -1;)
                                    for (t = s[o], i = r._firstPT; i;) n = i._next, i.pg ? i.t._roundProps(a, !0) : i.n === t && (2 === i.f && i.t ? e(i.t._firstPT) : (this._add(i.t, t, i.s, i.c), n && (n._prev = i._prev), i._prev ? i._prev._next = n : r._firstPT === i && (r._firstPT = n), i._next = i._prev = null, r._propLookup[t] = u)), i = n;
                                return !1
                            }, n._add = function(t, e, i, n) {
                                this._addTween(t, e, i, i + n, e, !0), this._overwriteProps.push(e)
                            }
                        }(),
                        function() {
                            i._gsDefine.plugin({
                                propName: "attr",
                                API: 2,
                                version: "0.5.0",
                                init: function(t, e, i) {
                                    var n;
                                    if ("function" != typeof t.setAttribute) return !1;
                                    for (n in e) this._addTween(t, "setAttribute", t.getAttribute(n) + "", e[n] + "", n, !1, n), this._overwriteProps.push(n);
                                    return !0
                                }
                            })
                        }(), i._gsDefine.plugin({
                            propName: "directionalRotation",
                            version: "0.2.1",
                            API: 2,
                            init: function(t, e, i) {
                                "object" != typeof e && (e = {
                                    rotation: e
                                }), this.finals = {};
                                var n, r, s, o, a, u, l = e.useRadians === !0 ? 2 * Math.PI : 360,
                                    h = 1e-6;
                                for (n in e) "useRadians" !== n && (u = (e[n] + "").split("_"), r = u[0], s = parseFloat("function" != typeof t[n] ? t[n] : t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]()), o = this.finals[n] = "string" == typeof r && "=" === r.charAt(1) ? s + parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)) : Number(r) || 0, a = o - s, u.length && (r = u.join("_"), -1 !== r.indexOf("short") && (a %= l, a !== a % (l / 2) && (a = 0 > a ? a + l : a - l)), -1 !== r.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * l) % l - (a / l | 0) * l : -1 !== r.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * l) % l - (a / l | 0) * l)), (a > h || -h > a) && (this._addTween(t, n, s, s + a, n), this._overwriteProps.push(n)));
                                return !0
                            },
                            set: function(t) {
                                var e;
                                if (1 !== t) this._super.setRatio.call(this, t);
                                else
                                    for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                            }
                        })._autoCSS = !0, i._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                            var e, n, r, s = i.GreenSockGlobals || i,
                                o = s.com.greensock,
                                a = 2 * Math.PI,
                                u = Math.PI / 2,
                                l = o._class,
                                h = function(e, i) {
                                    var n = l("easing." + e, function() {}, !0),
                                        r = n.prototype = new t;
                                    return r.constructor = n, r.getRatio = i, n
                                },
                                c = t.register || function() {},
                                f = function(t, e, i, n, r) {
                                    var s = l("easing." + t, {
                                        easeOut: new e,
                                        easeIn: new i,
                                        easeInOut: new n
                                    }, !0);
                                    return c(s, t), s
                                },
                                d = function(t, e, i) {
                                    this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                                },
                                p = function(e, i) {
                                    var n = l("easing." + e, function(t) {
                                            this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                                        }, !0),
                                        r = n.prototype = new t;
                                    return r.constructor = n, r.getRatio = i, r.config = function(t) {
                                        return new n(t)
                                    }, n
                                },
                                m = f("Back", p("BackOut", function(t) {
                                    return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                                }), p("BackIn", function(t) {
                                    return t * t * ((this._p1 + 1) * t - this._p1)
                                }), p("BackInOut", function(t) {
                                    return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                                })),
                                g = l("easing.SlowMo", function(t, e, i) {
                                    e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                                }, !0),
                                v = g.prototype = new t;
                            return v.constructor = g, v.getRatio = function(t) {
                                var e = t + (.5 - t) * this._p;
                                return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                            }, g.ease = new g(.7, .7), v.config = g.config = function(t, e, i) {
                                return new g(t, e, i)
                            }, e = l("easing.SteppedEase", function(t) {
                                t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
                            }, !0), v = e.prototype = new t, v.constructor = e, v.getRatio = function(t) {
                                return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
                            }, v.config = e.config = function(t) {
                                return new e(t)
                            }, n = l("easing.RoughEase", function(e) {
                                e = e || {};
                                for (var i, n, r, s, o, a, u = e.taper || "none", l = [], h = 0, c = 0 | (e.points || 20), f = c, p = e.randomize !== !1, m = e.clamp === !0, g = e.template instanceof t ? e.template : null, v = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) i = p ? Math.random() : 1 / c * f, n = g ? g.getRatio(i) : i, "none" === u ? r = v : "out" === u ? (s = 1 - i, r = s * s * v) : "in" === u ? r = i * i * v : .5 > i ? (s = 2 * i, r = s * s * .5 * v) : (s = 2 * (1 - i), r = s * s * .5 * v), p ? n += Math.random() * r - .5 * r : f % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : 0 > n && (n = 0)), l[h++] = {
                                    x: i,
                                    y: n
                                };
                                for (l.sort(function(t, e) {
                                        return t.x - e.x
                                    }), a = new d(1, 1, null), f = c; --f > -1;) o = l[f], a = new d(o.x, o.y, a);
                                this._prev = new d(0, 0, 0 !== a.t ? a : a.next)
                            }, !0), v = n.prototype = new t, v.constructor = n, v.getRatio = function(t) {
                                var e = this._prev;
                                if (t > e.t) {
                                    for (; e.next && t >= e.t;) e = e.next;
                                    e = e.prev
                                } else
                                    for (; e.prev && t <= e.t;) e = e.prev;
                                return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                            }, v.config = function(t) {
                                return new n(t)
                            }, n.ease = new n, f("Bounce", h("BounceOut", function(t) {
                                return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                            }), h("BounceIn", function(t) {
                                return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                            }), h("BounceInOut", function(t) {
                                var e = .5 > t;
                                return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                            })), f("Circ", h("CircOut", function(t) {
                                return Math.sqrt(1 - (t -= 1) * t)
                            }), h("CircIn", function(t) {
                                return -(Math.sqrt(1 - t * t) - 1)
                            }), h("CircInOut", function(t) {
                                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                            })), r = function(e, i, n) {
                                var r = l("easing." + e, function(t, e) {
                                        this._p1 = t >= 1 ? t : 1, this._p2 = (e || n) / (1 > t ? t : 1), this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0), this._p2 = a / this._p2
                                    }, !0),
                                    s = r.prototype = new t;
                                return s.constructor = r, s.getRatio = i, s.config = function(t, e) {
                                    return new r(t, e)
                                }, r
                            }, f("Elastic", r("ElasticOut", function(t) {
                                return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
                            }, .3), r("ElasticIn", function(t) {
                                return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2))
                            }, .3), r("ElasticInOut", function(t) {
                                return (t *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
                            }, .45)), f("Expo", h("ExpoOut", function(t) {
                                return 1 - Math.pow(2, -10 * t)
                            }), h("ExpoIn", function(t) {
                                return Math.pow(2, 10 * (t - 1)) - .001
                            }), h("ExpoInOut", function(t) {
                                return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                            })), f("Sine", h("SineOut", function(t) {
                                return Math.sin(t * u)
                            }), h("SineIn", function(t) {
                                return -Math.cos(t * u) + 1
                            }), h("SineInOut", function(t) {
                                return -.5 * (Math.cos(Math.PI * t) - 1)
                            })), l("easing.EaseLookup", {
                                find: function(e) {
                                    return t.map[e]
                                }
                            }, !0), c(s.SlowMo, "SlowMo", "ease,"), c(n, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), m
                        }, !0)
                }), i._gsDefine && i._gsQueue.pop()(),
                function(t, i) {
                    "use strict";
                    var n = t.GreenSockGlobals = t.GreenSockGlobals || t;
                    if (!n.TweenLite) {
                        var r, s, o, a, u, l = function(t) {
                                var e, i = t.split("."),
                                    r = n;
                                for (e = 0; e < i.length; e++) r[i[e]] = r = r[i[e]] || {};
                                return r
                            },
                            h = l("com.greensock"),
                            c = 1e-10,
                            f = function(t) {
                                var e, i = [],
                                    n = t.length;
                                for (e = 0; e !== n; i.push(t[e++]));
                                return i
                            },
                            d = function() {},
                            p = function() {
                                var t = Object.prototype.toString,
                                    e = t.call([]);
                                return function(i) {
                                    return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                                }
                            }(),
                            m = {},
                            g = function(r, s, o, a) {
                                this.sc = m[r] ? m[r].sc : [], m[r] = this, this.gsClass = null, this.func = o;
                                var u = [];
                                this.check = function(h) {
                                    for (var c, f, d, p, v, y = s.length, T = y; --y > -1;)(c = m[s[y]] || new g(s[y], [])).gsClass ? (u[y] = c.gsClass, T--) : h && c.sc.push(this);
                                    if (0 === T && o)
                                        for (f = ("com.greensock." + r).split("."), d = f.pop(), p = l(f.join("."))[d] = this.gsClass = o.apply(o, u), a && (n[d] = p, v = "undefined" != typeof e && e.exports, !v && "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + r.split(".").pop(), [], function() {
                                                return p
                                            }) : r === i && v && (e.exports = p)), y = 0; y < this.sc.length; y++) this.sc[y].check()
                                }, this.check(!0)
                            },
                            v = t._gsDefine = function(t, e, i, n) {
                                return new g(t, e, i, n)
                            },
                            y = h._class = function(t, e, i) {
                                return e = e || function() {}, v(t, [], function() {
                                    return e
                                }, i), e
                            };
                        v.globals = n;
                        var T = [0, 0, 1, 1],
                            _ = [],
                            b = y("easing.Ease", function(t, e, i, n) {
                                this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? T.concat(e) : T
                            }, !0),
                            w = b.map = {},
                            S = b.register = function(t, e, i, n) {
                                for (var r, s, o, a, u = e.split(","), l = u.length, c = (i || "easeIn,easeOut,easeInOut").split(","); --l > -1;)
                                    for (s = u[l], r = n ? y("easing." + s, null, !0) : h.easing[s] || {}, o = c.length; --o > -1;) a = c[o], w[s + "." + a] = w[a + s] = r[a] = t.getRatio ? t : t[a] || new t
                            };
                        for (o = b.prototype, o._calcEnd = !1, o.getRatio = function(t) {
                                if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                                var e = this._type,
                                    i = this._power,
                                    n = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                                return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : .5 > t ? n / 2 : 1 - n / 2
                            }, r = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], s = r.length; --s > -1;) o = r[s] + ",Power" + s, S(new b(null, null, 1, s), o, "easeOut", !0), S(new b(null, null, 2, s), o, "easeIn" + (0 === s ? ",easeNone" : "")), S(new b(null, null, 3, s), o, "easeInOut");
                        w.linear = h.easing.Linear.easeIn, w.swing = h.easing.Quad.easeInOut;
                        var x = y("events.EventDispatcher", function(t) {
                            this._listeners = {}, this._eventTarget = t || this
                        });
                        o = x.prototype, o.addEventListener = function(t, e, i, n, r) {
                            r = r || 0;
                            var s, o, l = this._listeners[t],
                                h = 0;
                            for (null == l && (this._listeners[t] = l = []), o = l.length; --o > -1;) s = l[o], s.c === e && s.s === i ? l.splice(o, 1) : 0 === h && s.pr < r && (h = o + 1);
                            l.splice(h, 0, {
                                c: e,
                                s: i,
                                up: n,
                                pr: r
                            }), this !== a || u || a.wake()
                        }, o.removeEventListener = function(t, e) {
                            var i, n = this._listeners[t];
                            if (n)
                                for (i = n.length; --i > -1;)
                                    if (n[i].c === e) return void n.splice(i, 1)
                        }, o.dispatchEvent = function(t) {
                            var e, i, n, r = this._listeners[t];
                            if (r)
                                for (e = r.length, i = this._eventTarget; --e > -1;) n = r[e], n && (n.up ? n.c.call(n.s || i, {
                                    type: t,
                                    target: i
                                }) : n.c.call(n.s || i))
                        };
                        var P = t.requestAnimationFrame,
                            A = t.cancelAnimationFrame,
                            M = Date.now || function() {
                                return (new Date).getTime()
                            },
                            E = M();
                        for (r = ["ms", "moz", "webkit", "o"], s = r.length; --s > -1 && !P;) P = t[r[s] + "RequestAnimationFrame"], A = t[r[s] + "CancelAnimationFrame"] || t[r[s] + "CancelRequestAnimationFrame"];
                        y("Ticker", function(t, e) {
                            var i, n, r, s, o, l = this,
                                h = M(),
                                f = e !== !1 && P ? "auto" : !1,
                                p = 500,
                                m = 33,
                                g = "tick",
                                v = function(t) {
                                    var e, a, u = M() - E;
                                    u > p && (h += u - m), E += u, l.time = (E - h) / 1e3, e = l.time - o, (!i || e > 0 || t === !0) && (l.frame++, o += e + (e >= s ? .004 : s - e), a = !0), t !== !0 && (r = n(v)), a && l.dispatchEvent(g)
                                };
                            x.call(l), l.time = l.frame = 0, l.tick = function() {
                                v(!0)
                            }, l.lagSmoothing = function(t, e) {
                                p = t || 1 / c, m = Math.min(e, p, 0)
                            }, l.sleep = function() {
                                null != r && (f && A ? A(r) : clearTimeout(r), n = d, r = null, l === a && (u = !1))
                            }, l.wake = function(t) {
                                null !== r ? l.sleep() : t ? h += -E + (E = M()) : l.frame > 10 && (E = M() - p + 5), n = 0 === i ? d : f && P ? P : function(t) {
                                    return setTimeout(t, 1e3 * (o - l.time) + 1 | 0)
                                }, l === a && (u = !0), v(2)
                            }, l.fps = function(t) {
                                return arguments.length ? (i = t, s = 1 / (i || 60), o = this.time + s, void l.wake()) : i
                            }, l.useRAF = function(t) {
                                return arguments.length ? (l.sleep(), f = t, void l.fps(i)) : f
                            }, l.fps(t), setTimeout(function() {
                                "auto" === f && l.frame < 5 && "hidden" !== document.visibilityState && l.useRAF(!1)
                            }, 1500)
                        }), o = h.Ticker.prototype = new h.events.EventDispatcher, o.constructor = h.Ticker;
                        var C = y("core.Animation", function(t, e) {
                            if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, Y) {
                                u || a.wake();
                                var i = this.vars.useFrames ? q : Y;
                                i.add(this, i._time), this.vars.paused && this.paused(!0)
                            }
                        });
                        a = C.ticker = new h.Ticker, o = C.prototype, o._dirty = o._gc = o._initted = o._paused = !1, o._totalTime = o._time = 0, o._rawPrevTime = -1, o._next = o._last = o._onUpdate = o._timeline = o.timeline = null, o._paused = !1;
                        var O = function() {
                            u && M() - E > 2e3 && a.wake(), setTimeout(O, 2e3)
                        };
                        O(), o.play = function(t, e) {
                            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
                        }, o.pause = function(t, e) {
                            return null != t && this.seek(t, e), this.paused(!0)
                        }, o.resume = function(t, e) {
                            return null != t && this.seek(t, e), this.paused(!1)
                        }, o.seek = function(t, e) {
                            return this.totalTime(Number(t), e !== !1)
                        }, o.restart = function(t, e) {
                            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
                        }, o.reverse = function(t, e) {
                            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
                        }, o.render = function(t, e, i) {}, o.invalidate = function() {
                            return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
                        }, o.isActive = function() {
                            var t, e = this._timeline,
                                i = this._startTime;
                            return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && t < i + this.totalDuration() / this._timeScale
                        }, o._enabled = function(t, e) {
                            return u || a.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
                        }, o._kill = function(t, e) {
                            return this._enabled(!1, !1)
                        }, o.kill = function(t, e) {
                            return this._kill(t, e), this
                        }, o._uncache = function(t) {
                            for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                            return this
                        }, o._swapSelfInParams = function(t) {
                            for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                            return i
                        }, o._callback = function(t) {
                            var e = this.vars;
                            e[t].apply(e[t + "Scope"] || e.callbackScope || this, e[t + "Params"] || _)
                        }, o.eventCallback = function(t, e, i, n) {
                            if ("on" === (t || "").substr(0, 2)) {
                                var r = this.vars;
                                if (1 === arguments.length) return r[t];
                                null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = p(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
                            }
                            return this
                        }, o.delay = function(t) {
                            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
                        }, o.duration = function(t) {
                            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
                        }, o.totalDuration = function(t) {
                            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
                        }, o.time = function(t, e) {
                            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
                        }, o.totalTime = function(t, e, i) {
                            if (u || a.wake(), !arguments.length) return this._totalTime;
                            if (this._timeline) {
                                if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                                    this._dirty && this.totalDuration();
                                    var n = this._totalDuration,
                                        r = this._timeline;
                                    if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                                        for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                                }
                                this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (R.length && K(), this.render(t, e, !1), R.length && K())
                            }
                            return this
                        }, o.progress = o.totalProgress = function(t, e) {
                            var i = this.duration();
                            return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
                        }, o.startTime = function(t) {
                            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
                        }, o.endTime = function(t) {
                            return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
                        }, o.timeScale = function(t) {
                            if (!arguments.length) return this._timeScale;
                            if (t = t || c, this._timeline && this._timeline.smoothChildTiming) {
                                var e = this._pauseTime,
                                    i = e || 0 === e ? e : this._timeline.totalTime();
                                this._startTime = i - (i - this._startTime) * this._timeScale / t
                            }
                            return this._timeScale = t, this._uncache(!1)
                        }, o.reversed = function(t) {
                            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
                        }, o.paused = function(t) {
                            if (!arguments.length) return this._paused;
                            var e, i, n = this._timeline;
                            return t != this._paused && n && (u || t || a.wake(), e = n.rawTime(), i = e - this._pauseTime, !t && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
                        };
                        var D = y("core.SimpleTimeline", function(t) {
                            C.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
                        });
                        o = D.prototype = new C, o.constructor = D, o.kill()._gc = !1, o._first = o._last = o._recent = null, o._sortChildren = !1, o.add = o.insert = function(t, e, i, n) {
                            var r, s;
                            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren)
                                for (s = t._startTime; r && r._startTime > s;) r = r._prev;
                            return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this
                        }, o._remove = function(t, e) {
                            return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
                        }, o.render = function(t, e, i) {
                            var n, r = this._first;
                            for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
                        }, o.rawTime = function() {
                            return u || a.wake(), this._totalTime
                        };
                        var I = y("TweenLite", function(e, i, n) {
                                if (C.call(this, i, n), this.render = I.prototype.render, null == e) throw "Cannot tween a null target.";
                                this.target = e = "string" != typeof e ? e : I.selector(e) || e;
                                var r, s, o, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                                    u = this.vars.overwrite;
                                if (this._overwrite = u = null == u ? z[I.defaultOverwrite] : "number" == typeof u ? u >> 0 : z[u], (a || e instanceof Array || e.push && p(e)) && "number" != typeof e[0])
                                    for (this._targets = o = f(e), this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) s = o[r], s ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(f(s))) : (this._siblings[r] = Q(s, this, !1), 1 === u && this._siblings[r].length > 1 && J(s, this, null, 1, this._siblings[r])) : (s = o[r--] = I.selector(s), "string" == typeof s && o.splice(r + 1, 1)) : o.splice(r--, 1);
                                else this._propLookup = {}, this._siblings = Q(e, this, !1), 1 === u && this._siblings.length > 1 && J(e, this, null, 1, this._siblings);
                                (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -c, this.render(-this._delay))
                            }, !0),
                            k = function(e) {
                                return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                            },
                            G = function(t, e) {
                                var i, n = {};
                                for (i in t) W[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!X[i] || X[i] && X[i]._autoCSS) || (n[i] = t[i], delete t[i]);
                                t.css = n
                            };
                        o = I.prototype = new C, o.constructor = I, o.kill()._gc = !1, o.ratio = 0, o._firstPT = o._targets = o._overwrittenProps = o._startAt = null, o._notifyPluginsOfEnabled = o._lazy = !1, I.version = "1.18.1", I.defaultEase = o._ease = new b(null, null, 1, 1), I.defaultOverwrite = "auto", I.ticker = a, I.autoSleep = 120, I.lagSmoothing = function(t, e) {
                            a.lagSmoothing(t, e)
                        }, I.selector = t.$ || t.jQuery || function(e) {
                            var i = t.$ || t.jQuery;
                            return i ? (I.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
                        };
                        var R = [],
                            B = {},
                            H = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                            L = function(t) {
                                for (var e, i = this._firstPT, n = 1e-6; i;) e = i.blob ? t ? this.join("") : this.start : i.c * t + i.s, i.r ? e = Math.round(e) : n > e && e > -n && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
                            },
                            N = function(t, e, i, n) {
                                var r, s, o, a, u, l, h, c = [t, e],
                                    f = 0,
                                    d = "",
                                    p = 0;
                                for (c.start = t, i && (i(c), t = c[0], e = c[1]), c.length = 0, r = t.match(H) || [], s = e.match(H) || [], n && (n._next = null, n.blob = 1, c._firstPT = n), u = s.length, a = 0; u > a; a++) h = s[a], l = e.substr(f, e.indexOf(h, f) - f), d += l || !a ? l : ",", f += l.length, p ? p = (p + 1) % 5 : "rgba(" === l.substr(-5) && (p = 1), h === r[a] || r.length <= a ? d += h : (d && (c.push(d), d = ""), o = parseFloat(r[a]), c.push(o), c._firstPT = {
                                    _next: c._firstPT,
                                    t: c,
                                    p: c.length - 1,
                                    s: o,
                                    c: ("=" === h.charAt(1) ? parseInt(h.charAt(0) + "1", 10) * parseFloat(h.substr(2)) : parseFloat(h) - o) || 0,
                                    f: 0,
                                    r: p && 4 > p
                                }), f += h.length;
                                return d += e.substr(f), d && c.push(d), c.setRatio = L, c
                            },
                            j = function(t, e, i, n, r, s, o, a) {
                                var u, l, h = "get" === i ? t[e] : i,
                                    c = typeof t[e],
                                    f = "string" == typeof n && "=" === n.charAt(1),
                                    d = {
                                        t: t,
                                        p: e,
                                        s: h,
                                        f: "function" === c,
                                        pg: 0,
                                        n: r || e,
                                        r: s,
                                        pr: 0,
                                        c: f ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - h || 0
                                    };
                                return "number" !== c && ("function" === c && "get" === i && (l = e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3), d.s = h = o ? t[l](o) : t[l]()), "string" == typeof h && (o || isNaN(h)) ? (d.fp = o, u = N(h, n, a || I.defaultStringFilter, d), d = {
                                    t: u,
                                    p: "setRatio",
                                    s: 0,
                                    c: 1,
                                    f: 2,
                                    pg: 0,
                                    n: r || e,
                                    pr: 0
                                }) : f || (d.s = parseFloat(h), d.c = parseFloat(n) - d.s || 0)), d.c ? ((d._next = this._firstPT) && (d._next._prev = d), this._firstPT = d, d) : void 0
                            },
                            F = I._internals = {
                                isArray: p,
                                isSelector: k,
                                lazyTweens: R,
                                blobDif: N
                            },
                            X = I._plugins = {},
                            V = F.tweenLookup = {},
                            U = 0,
                            W = F.reservedProps = {
                                ease: 1,
                                delay: 1,
                                overwrite: 1,
                                onComplete: 1,
                                onCompleteParams: 1,
                                onCompleteScope: 1,
                                useFrames: 1,
                                runBackwards: 1,
                                startAt: 1,
                                onUpdate: 1,
                                onUpdateParams: 1,
                                onUpdateScope: 1,
                                onStart: 1,
                                onStartParams: 1,
                                onStartScope: 1,
                                onReverseComplete: 1,
                                onReverseCompleteParams: 1,
                                onReverseCompleteScope: 1,
                                onRepeat: 1,
                                onRepeatParams: 1,
                                onRepeatScope: 1,
                                easeParams: 1,
                                yoyo: 1,
                                immediateRender: 1,
                                repeat: 1,
                                repeatDelay: 1,
                                data: 1,
                                paused: 1,
                                reversed: 1,
                                autoCSS: 1,
                                lazy: 1,
                                onOverwrite: 1,
                                callbackScope: 1,
                                stringFilter: 1
                            },
                            z = {
                                none: 0,
                                all: 1,
                                auto: 2,
                                concurrent: 3,
                                allOnStart: 4,
                                preexisting: 5,
                                "true": 1,
                                "false": 0
                            },
                            q = C._rootFramesTimeline = new D,
                            Y = C._rootTimeline = new D,
                            $ = 30,
                            K = F.lazyRender = function() {
                                var t, e = R.length;
                                for (B = {}; --e > -1;) t = R[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                                R.length = 0
                            };
                        Y._startTime = a.time, q._startTime = a.frame, Y._active = q._active = !0, setTimeout(K, 1), C._updateRoot = I.render = function() {
                            var t, e, i;
                            if (R.length && K(), Y.render((a.time - Y._startTime) * Y._timeScale, !1, !1), q.render((a.frame - q._startTime) * q._timeScale, !1, !1), R.length && K(), a.frame >= $) {
                                $ = a.frame + (parseInt(I.autoSleep, 10) || 120);
                                for (i in V) {
                                    for (e = V[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                                    0 === e.length && delete V[i]
                                }
                                if (i = Y._first, (!i || i._paused) && I.autoSleep && !q._first && 1 === a._listeners.tick.length) {
                                    for (; i && i._paused;) i = i._next;
                                    i || a.sleep()
                                }
                            }
                        }, a.addEventListener("tick", C._updateRoot);
                        var Q = function(t, e, i) {
                                var n, r, s = t._gsTweenID;
                                if (V[s || (t._gsTweenID = s = "t" + U++)] || (V[s] = {
                                        target: t,
                                        tweens: []
                                    }), e && (n = V[s].tweens, n[r = n.length] = e, i))
                                    for (; --r > -1;) n[r] === e && n.splice(r, 1);
                                return V[s].tweens
                            },
                            Z = function(t, e, i, n) {
                                var r, s, o = t.vars.onOverwrite;
                                return o && (r = o(t, e, i, n)), o = I.onOverwrite, o && (s = o(t, e, i, n)), r !== !1 && s !== !1
                            },
                            J = function(t, e, i, n, r) {
                                var s, o, a, u;
                                if (1 === n || n >= 4) {
                                    for (u = r.length, s = 0; u > s; s++)
                                        if ((a = r[s]) !== e) a._gc || a._kill(null, t, e) && (o = !0);
                                        else if (5 === n) break;
                                    return o
                                }
                                var l, h = e._startTime + c,
                                    f = [],
                                    d = 0,
                                    p = 0 === e._duration;
                                for (s = r.length; --s > -1;)(a = r[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (l = l || tt(e, 0, p), 0 === tt(a, l, p) && (f[d++] = a)) : a._startTime <= h && a._startTime + a.totalDuration() / a._timeScale > h && ((p || !a._initted) && h - a._startTime <= 2e-10 || (f[d++] = a)));
                                for (s = d; --s > -1;)
                                    if (a = f[s], 2 === n && a._kill(i, t, e) && (o = !0), 2 !== n || !a._firstPT && a._initted) {
                                        if (2 !== n && !Z(a, e)) continue;
                                        a._enabled(!1, !1) && (o = !0)
                                    }
                                return o
                            },
                            tt = function(t, e, i) {
                                for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline;) {
                                    if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
                                    n = n._timeline
                                }
                                return s /= r, s > e ? s - e : i && s === e || !t._initted && 2 * c > s - e ? c : (s += t.totalDuration() / t._timeScale / r) > e + c ? 0 : s - e - c
                            };
                        o._init = function() {
                            var t, e, i, n, r, s = this.vars,
                                o = this._overwrittenProps,
                                a = this._duration,
                                u = !!s.immediateRender,
                                l = s.ease;
                            if (s.startAt) {
                                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                                for (n in s.startAt) r[n] = s.startAt[n];
                                if (r.overwrite = !1, r.immediateRender = !0, r.lazy = u && s.lazy !== !1, r.startAt = r.delay = null, this._startAt = I.to(this.target, 0, r), u)
                                    if (this._time > 0) this._startAt = null;
                                    else if (0 !== a) return
                            } else if (s.runBackwards && 0 !== a)
                                if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                                else {
                                    0 !== this._time && (u = !1), i = {};
                                    for (n in s) W[n] && "autoCSS" !== n || (i[n] = s[n]);
                                    if (i.overwrite = 0, i.data = "isFromStart", i.lazy = u && s.lazy !== !1, i.immediateRender = u, this._startAt = I.to(this.target, 0, i), u) {
                                        if (0 === this._time) return
                                    } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                                }
                            if (this._ease = l = l ? l instanceof b ? l : "function" == typeof l ? new b(l, s.easeParams) : w[l] || I.defaultEase : I.defaultEase, s.easeParams instanceof Array && l.config && (this._ease = l.config.apply(l, s.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                                for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], o ? o[t] : null) && (e = !0);
                            else e = this._initProps(this.target, this._propLookup, this._siblings, o);
                            if (e && I._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), s.runBackwards)
                                for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                            this._onUpdate = s.onUpdate, this._initted = !0
                        }, o._initProps = function(e, i, n, r) {
                            var s, o, a, u, l, h;
                            if (null == e) return !1;
                            B[e._gsTweenID] && K(), this.vars.css || e.style && e !== t && e.nodeType && X.css && this.vars.autoCSS !== !1 && G(this.vars, e);
                            for (s in this.vars)
                                if (h = this.vars[s], W[s]) h && (h instanceof Array || h.push && p(h)) && -1 !== h.join("").indexOf("{self}") && (this.vars[s] = h = this._swapSelfInParams(h, this));
                                else if (X[s] && (u = new X[s])._onInitTween(e, this.vars[s], this)) {
                                for (this._firstPT = l = {
                                        _next: this._firstPT,
                                        t: u,
                                        p: "setRatio",
                                        s: 0,
                                        c: 1,
                                        f: 1,
                                        n: s,
                                        pg: 1,
                                        pr: u._priority
                                    }, o = u._overwriteProps.length; --o > -1;) i[u._overwriteProps[o]] = this._firstPT;
                                (u._priority || u._onInitAllProps) && (a = !0), (u._onDisable || u._onEnable) && (this._notifyPluginsOfEnabled = !0), l._next && (l._next._prev = l)
                            } else i[s] = j.call(this, e, s, "get", h, s, 0, null, this.vars.stringFilter);
                            return r && this._kill(r, e) ? this._initProps(e, i, n, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && J(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (B[e._gsTweenID] = !0), a)
                        }, o.render = function(t, e, i) {
                            var n, r, s, o, a = this._time,
                                u = this._duration,
                                l = this._rawPrevTime;
                            if (t >= u - 1e-7) this._totalTime = this._time = u, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === u && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 > l || 0 >= t && t >= -1e-7 || l === c && "isPause" !== this.data) && l !== t && (i = !0, l > c && (r = "onReverseComplete")), this._rawPrevTime = o = !e || t || l === t ? t : c);
                            else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === u && l > 0) && (r = "onReverseComplete", n = this._reversed), 0 > t && (this._active = !1, 0 === u && (this._initted || !this.vars.lazy || i) && (l >= 0 && (l !== c || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !e || t || l === t ? t : c)), this._initted || (i = !0);
                            else if (this._totalTime = this._time = t, this._easeType) {
                                var h = t / u,
                                    f = this._easeType,
                                    d = this._easePower;
                                (1 === f || 3 === f && h >= .5) && (h = 1 - h), 3 === f && (h *= 2), 1 === d ? h *= h : 2 === d ? h *= h * h : 3 === d ? h *= h * h * h : 4 === d && (h *= h * h * h * h), 1 === f ? this.ratio = 1 - h : 2 === f ? this.ratio = h : .5 > t / u ? this.ratio = h / 2 : this.ratio = 1 - h / 2
                            } else this.ratio = this._ease.getRatio(t / u);
                            if (this._time !== a || i) {
                                if (!this._initted) {
                                    if (this._init(), !this._initted || this._gc) return;
                                    if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = l, R.push(this), void(this._lazy = [t, e]);
                                    this._time && !n ? this.ratio = this._ease.getRatio(this._time / u) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                                }
                                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === u) && (e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                                this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i), e || (this._time !== a || n) && this._callback("onUpdate")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === u && this._rawPrevTime === c && o !== c && (this._rawPrevTime = 0))
                            }
                        }, o._kill = function(t, e, i) {
                            if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                            e = "string" != typeof e ? e || this._targets || this.target : I.selector(e) || e;
                            var n, r, s, o, a, u, l, h, c, f = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                            if ((p(e) || k(e)) && "number" != typeof e[0])
                                for (n = e.length; --n > -1;) this._kill(t, e[n], i) && (u = !0);
                            else {
                                if (this._targets) {
                                    for (n = this._targets.length; --n > -1;)
                                        if (e === this._targets[n]) {
                                            a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                                            break
                                        }
                                } else {
                                    if (e !== this.target) return !1;
                                    a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                                }
                                if (a) {
                                    if (l = t || a, h = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), i && (I.onOverwrite || this.vars.onOverwrite)) {
                                        for (s in l) a[s] && (c || (c = []), c.push(s));
                                        if ((c || !t) && !Z(this, i, e, c)) return !1
                                    }
                                    for (s in l)(o = a[s]) && (f && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, u = !0), o.pg && o.t._kill(l) && (u = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), h && (r[s] = 1);
                                    !this._firstPT && this._initted && this._enabled(!1, !1)
                                }
                            }
                            return u
                        }, o.invalidate = function() {
                            return this._notifyPluginsOfEnabled && I._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], C.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -c, this.render(-this._delay)), this
                        }, o._enabled = function(t, e) {
                            if (u || a.wake(), t && this._gc) {
                                var i, n = this._targets;
                                if (n)
                                    for (i = n.length; --i > -1;) this._siblings[i] = Q(n[i], this, !0);
                                else this._siblings = Q(this.target, this, !0)
                            }
                            return C.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? I._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
                        }, I.to = function(t, e, i) {
                            return new I(t, e, i)
                        }, I.from = function(t, e, i) {
                            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new I(t, e, i)
                        }, I.fromTo = function(t, e, i, n) {
                            return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new I(t, e, n)
                        }, I.delayedCall = function(t, e, i, n, r) {
                            return new I(e, 0, {
                                delay: t,
                                onComplete: e,
                                onCompleteParams: i,
                                callbackScope: n,
                                onReverseComplete: e,
                                onReverseCompleteParams: i,
                                immediateRender: !1,
                                lazy: !1,
                                useFrames: r,
                                overwrite: 0
                            })
                        }, I.set = function(t, e) {
                            return new I(t, 0, e)
                        }, I.getTweensOf = function(t, e) {
                            if (null == t) return [];
                            t = "string" != typeof t ? t : I.selector(t) || t;
                            var i, n, r, s;
                            if ((p(t) || k(t)) && "number" != typeof t[0]) {
                                for (i = t.length, n = []; --i > -1;) n = n.concat(I.getTweensOf(t[i], e));
                                for (i = n.length; --i > -1;)
                                    for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
                            } else
                                for (n = Q(t).concat(), i = n.length; --i > -1;)(n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
                            return n
                        }, I.killTweensOf = I.killDelayedCallsTo = function(t, e, i) {
                            "object" == typeof e && (i = e, e = !1);
                            for (var n = I.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
                        };
                        var et = y("plugins.TweenPlugin", function(t, e) {
                            this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = et.prototype
                        }, !0);
                        if (o = et.prototype, et.version = "1.18.0", et.API = 2, o._firstPT = null, o._addTween = j, o.setRatio = L, o._kill = function(t) {
                                var e, i = this._overwriteProps,
                                    n = this._firstPT;
                                if (null != t[this._propName]) this._overwriteProps = [];
                                else
                                    for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                                for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                                return !1
                            }, o._roundProps = function(t, e) {
                                for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
                            }, I._onPluginEvent = function(t, e) {
                                var i, n, r, s, o, a = e._firstPT;
                                if ("_onInitAllProps" === t) {
                                    for (; a;) {
                                        for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;
                                        (a._prev = n ? n._prev : s) ? a._prev._next = a: r = a, (a._next = n) ? n._prev = a : s = a, a = o
                                    }
                                    a = e._firstPT = r
                                }
                                for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
                                return i
                            }, et.activate = function(t) {
                                for (var e = t.length; --e > -1;) t[e].API === et.API && (X[(new t[e])._propName] = t[e]);
                                return !0
                            }, v.plugin = function(t) {
                                if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                                var e, i = t.propName,
                                    n = t.priority || 0,
                                    r = t.overwriteProps,
                                    s = {
                                        init: "_onInitTween",
                                        set: "setRatio",
                                        kill: "_kill",
                                        round: "_roundProps",
                                        initAll: "_onInitAllProps"
                                    },
                                    o = y("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                                        et.call(this, i, n), this._overwriteProps = r || []
                                    }, t.global === !0),
                                    a = o.prototype = new et(i);
                                a.constructor = o, o.API = t.API;
                                for (e in s) "function" == typeof t[e] && (a[s[e]] = t[e]);
                                return o.version = t.version, et.activate([o]), o
                            }, r = t._gsQueue) {
                            for (s = 0; s < r.length; s++) r[s]();
                            for (o in m) m[o].func || t.console.log("GSAP encountered missing dependency: com.greensock." + o)
                        }
                        u = !1
                    }
                }("undefined" != typeof e && e.exports && "undefined" != typeof t ? t : this || window, "TweenMax")
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    44: [function(t, e, i) {
        ! function(t, i, n, r) {
            "use strict";

            function s(t, e, i) {
                return setTimeout(c(t, i), e)
            }

            function o(t, e, i) {
                return Array.isArray(t) ? (a(t, i[e], i), !0) : !1
            }

            function a(t, e, i) {
                var n;
                if (t)
                    if (t.forEach) t.forEach(e, i);
                    else if (t.length !== r)
                    for (n = 0; n < t.length;) e.call(i, t[n], n, t), n++;
                else
                    for (n in t) t.hasOwnProperty(n) && e.call(i, t[n], n, t)
            }

            function u(t, e, i) {
                for (var n = Object.keys(e), s = 0; s < n.length;)(!i || i && t[n[s]] === r) && (t[n[s]] = e[n[s]]), s++;
                return t
            }

            function l(t, e) {
                return u(t, e, !0)
            }

            function h(t, e, i) {
                var n, r = e.prototype;
                n = t.prototype = Object.create(r), n.constructor = t, n._super = r, i && u(n, i)
            }

            function c(t, e) {
                return function() {
                    return t.apply(e, arguments)
                }
            }

            function f(t, e) {
                return typeof t == ct ? t.apply(e ? e[0] || r : r, e) : t
            }

            function d(t, e) {
                return t === r ? e : t
            }

            function p(t, e, i) {
                a(y(e), function(e) {
                    t.addEventListener(e, i, !1)
                })
            }

            function m(t, e, i) {
                a(y(e), function(e) {
                    t.removeEventListener(e, i, !1)
                })
            }

            function g(t, e) {
                for (; t;) {
                    if (t == e) return !0;
                    t = t.parentNode
                }
                return !1
            }

            function v(t, e) {
                return t.indexOf(e) > -1
            }

            function y(t) {
                return t.trim().split(/\s+/g)
            }

            function T(t, e, i) {
                if (t.indexOf && !i) return t.indexOf(e);
                for (var n = 0; n < t.length;) {
                    if (i && t[n][i] == e || !i && t[n] === e) return n;
                    n++
                }
                return -1
            }

            function _(t) {
                return Array.prototype.slice.call(t, 0)
            }

            function b(t, e, i) {
                for (var n = [], r = [], s = 0; s < t.length;) {
                    var o = e ? t[s][e] : t[s];
                    T(r, o) < 0 && n.push(t[s]), r[s] = o, s++
                }
                return i && (n = e ? n.sort(function(t, i) {
                    return t[e] > i[e]
                }) : n.sort()), n
            }

            function w(t, e) {
                for (var i, n, s = e[0].toUpperCase() + e.slice(1), o = 0; o < lt.length;) {
                    if (i = lt[o], n = i ? i + s : e, n in t) return n;
                    o++
                }
                return r
            }

            function S() {
                return mt++
            }

            function x(t) {
                var e = t.ownerDocument;
                return e.defaultView || e.parentWindow
            }

            function P(t, e) {
                var i = this;
                this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function(e) {
                    f(t.options.enable, [t]) && i.handler(e)
                }, this.init()
            }

            function A(t) {
                var e, i = t.options.inputClass;
                return new(e = i ? i : yt ? j : Tt ? V : vt ? W : N)(t, M)
            }

            function M(t, e, i) {
                var n = i.pointers.length,
                    r = i.changedPointers.length,
                    s = e & Pt && n - r === 0,
                    o = e & (Mt | Et) && n - r === 0;
                i.isFirst = !!s, i.isFinal = !!o, s && (t.session = {}), i.eventType = e, E(t, i), t.emit("hammer.input", i), t.recognize(i), t.session.prevInput = i
            }

            function E(t, e) {
                var i = t.session,
                    n = e.pointers,
                    r = n.length;
                i.firstInput || (i.firstInput = D(e)), r > 1 && !i.firstMultiple ? i.firstMultiple = D(e) : 1 === r && (i.firstMultiple = !1);
                var s = i.firstInput,
                    o = i.firstMultiple,
                    a = o ? o.center : s.center,
                    u = e.center = I(n);
                e.timeStamp = pt(), e.deltaTime = e.timeStamp - s.timeStamp, e.angle = B(a, u), e.distance = R(a, u), C(i, e), e.offsetDirection = G(e.deltaX, e.deltaY), e.scale = o ? L(o.pointers, n) : 1, e.rotation = o ? H(o.pointers, n) : 0, O(i, e);
                var l = t.element;
                g(e.srcEvent.target, l) && (l = e.srcEvent.target), e.target = l
            }

            function C(t, e) {
                var i = e.center,
                    n = t.offsetDelta || {},
                    r = t.prevDelta || {},
                    s = t.prevInput || {};
                (e.eventType === Pt || s.eventType === Mt) && (r = t.prevDelta = {
                    x: s.deltaX || 0,
                    y: s.deltaY || 0
                }, n = t.offsetDelta = {
                    x: i.x,
                    y: i.y
                }), e.deltaX = r.x + (i.x - n.x), e.deltaY = r.y + (i.y - n.y)
            }

            function O(t, e) {
                var i, n, s, o, a = t.lastInterval || e,
                    u = e.timeStamp - a.timeStamp;
                if (e.eventType != Et && (u > xt || a.velocity === r)) {
                    var l = a.deltaX - e.deltaX,
                        h = a.deltaY - e.deltaY,
                        c = k(u, l, h);
                    n = c.x, s = c.y, i = dt(c.x) > dt(c.y) ? c.x : c.y, o = G(l, h), t.lastInterval = e
                } else i = a.velocity, n = a.velocityX, s = a.velocityY, o = a.direction;
                e.velocity = i, e.velocityX = n, e.velocityY = s, e.direction = o
            }

            function D(t) {
                for (var e = [], i = 0; i < t.pointers.length;) e[i] = {
                    clientX: ft(t.pointers[i].clientX),
                    clientY: ft(t.pointers[i].clientY)
                }, i++;
                return {
                    timeStamp: pt(),
                    pointers: e,
                    center: I(e),
                    deltaX: t.deltaX,
                    deltaY: t.deltaY
                }
            }

            function I(t) {
                var e = t.length;
                if (1 === e) return {
                    x: ft(t[0].clientX),
                    y: ft(t[0].clientY)
                };
                for (var i = 0, n = 0, r = 0; e > r;) i += t[r].clientX, n += t[r].clientY, r++;
                return {
                    x: ft(i / e),
                    y: ft(n / e)
                }
            }

            function k(t, e, i) {
                return {
                    x: e / t || 0,
                    y: i / t || 0
                }
            }

            function G(t, e) {
                return t === e ? Ct : dt(t) >= dt(e) ? t > 0 ? Ot : Dt : e > 0 ? It : kt
            }

            function R(t, e, i) {
                i || (i = Ht);
                var n = e[i[0]] - t[i[0]],
                    r = e[i[1]] - t[i[1]];
                return Math.sqrt(n * n + r * r)
            }

            function B(t, e, i) {
                i || (i = Ht);
                var n = e[i[0]] - t[i[0]],
                    r = e[i[1]] - t[i[1]];
                return 180 * Math.atan2(r, n) / Math.PI
            }

            function H(t, e) {
                return B(e[1], e[0], Lt) - B(t[1], t[0], Lt)
            }

            function L(t, e) {
                return R(e[0], e[1], Lt) / R(t[0], t[1], Lt)
            }

            function N() {
                this.evEl = jt, this.evWin = Ft, this.allow = !0, this.pressed = !1, P.apply(this, arguments)
            }

            function j() {
                this.evEl = Ut, this.evWin = Wt, P.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
            }

            function F() {
                this.evTarget = qt, this.evWin = Yt, this.started = !1, P.apply(this, arguments)
            }

            function X(t, e) {
                var i = _(t.touches),
                    n = _(t.changedTouches);
                return e & (Mt | Et) && (i = b(i.concat(n), "identifier", !0)), [i, n]
            }

            function V() {
                this.evTarget = Kt, this.targetIds = {}, P.apply(this, arguments)
            }

            function U(t, e) {
                var i = _(t.touches),
                    n = this.targetIds;
                if (e & (Pt | At) && 1 === i.length) return n[i[0].identifier] = !0, [i, i];
                var r, s, o = _(t.changedTouches),
                    a = [],
                    u = this.target;
                if (s = i.filter(function(t) {
                        return g(t.target, u)
                    }), e === Pt)
                    for (r = 0; r < s.length;) n[s[r].identifier] = !0, r++;
                for (r = 0; r < o.length;) n[o[r].identifier] && a.push(o[r]), e & (Mt | Et) && delete n[o[r].identifier], r++;
                return a.length ? [b(s.concat(a), "identifier", !0), a] : void 0
            }

            function W() {
                P.apply(this, arguments);
                var t = c(this.handler, this);
                this.touch = new V(this.manager, t), this.mouse = new N(this.manager, t)
            }

            function z(t, e) {
                this.manager = t, this.set(e)
            }

            function q(t) {
                if (v(t, ie)) return ie;
                var e = v(t, ne),
                    i = v(t, re);
                return e && i ? ne + " " + re : e || i ? e ? ne : re : v(t, ee) ? ee : te
            }

            function Y(t) {
                this.id = S(), this.manager = null, this.options = l(t || {}, this.defaults), this.options.enable = d(this.options.enable, !0), this.state = se, this.simultaneous = {}, this.requireFail = []
            }

            function $(t) {
                return t & he ? "cancel" : t & ue ? "end" : t & ae ? "move" : t & oe ? "start" : ""
            }

            function K(t) {
                return t == kt ? "down" : t == It ? "up" : t == Ot ? "left" : t == Dt ? "right" : ""
            }

            function Q(t, e) {
                var i = e.manager;
                return i ? i.get(t) : t
            }

            function Z() {
                Y.apply(this, arguments)
            }

            function J() {
                Z.apply(this, arguments), this.pX = null, this.pY = null
            }

            function tt() {
                Z.apply(this, arguments)
            }

            function et() {
                Y.apply(this, arguments), this._timer = null, this._input = null
            }

            function it() {
                Z.apply(this, arguments)
            }

            function nt() {
                Z.apply(this, arguments)
            }

            function rt() {
                Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
            }

            function st(t, e) {
                return e = e || {}, e.recognizers = d(e.recognizers, st.defaults.preset), new ot(t, e)
            }

            function ot(t, e) {
                e = e || {}, this.options = l(e, st.defaults), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = t, this.input = A(this), this.touchAction = new z(this, this.options.touchAction), at(this, !0), a(e.recognizers, function(t) {
                    var e = this.add(new t[0](t[1]));
                    t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
                }, this)
            }

            function at(t, e) {
                var i = t.element;
                a(t.options.cssProps, function(t, n) {
                    i.style[w(i.style, n)] = e ? t : ""
                })
            }

            function ut(t, e) {
                var n = i.createEvent("Event");
                n.initEvent(t, !0, !0), n.gesture = e, e.target.dispatchEvent(n)
            }
            var lt = ["", "webkit", "moz", "MS", "ms", "o"],
                ht = i.createElement("div"),
                ct = "function",
                ft = Math.round,
                dt = Math.abs,
                pt = Date.now,
                mt = 1,
                gt = /mobile|tablet|ip(ad|hone|od)|android/i,
                vt = "ontouchstart" in t,
                yt = w(t, "PointerEvent") !== r,
                Tt = vt && gt.test(navigator.userAgent),
                _t = "touch",
                bt = "pen",
                wt = "mouse",
                St = "kinect",
                xt = 25,
                Pt = 1,
                At = 2,
                Mt = 4,
                Et = 8,
                Ct = 1,
                Ot = 2,
                Dt = 4,
                It = 8,
                kt = 16,
                Gt = Ot | Dt,
                Rt = It | kt,
                Bt = Gt | Rt,
                Ht = ["x", "y"],
                Lt = ["clientX", "clientY"];
            P.prototype = {
                handler: function() {},
                init: function() {
                    this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(x(this.element), this.evWin, this.domHandler)
                },
                destroy: function() {
                    this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(x(this.element), this.evWin, this.domHandler)
                }
            };
            var Nt = {
                    mousedown: Pt,
                    mousemove: At,
                    mouseup: Mt
                },
                jt = "mousedown",
                Ft = "mousemove mouseup";
            h(N, P, {
                handler: function(t) {
                    var e = Nt[t.type];
                    e & Pt && 0 === t.button && (this.pressed = !0), e & At && 1 !== t.which && (e = Mt), this.pressed && this.allow && (e & Mt && (this.pressed = !1), this.callback(this.manager, e, {
                        pointers: [t],
                        changedPointers: [t],
                        pointerType: wt,
                        srcEvent: t
                    }))
                }
            });
            var Xt = {
                    pointerdown: Pt,
                    pointermove: At,
                    pointerup: Mt,
                    pointercancel: Et,
                    pointerout: Et
                },
                Vt = {
                    2: _t,
                    3: bt,
                    4: wt,
                    5: St
                },
                Ut = "pointerdown",
                Wt = "pointermove pointerup pointercancel";
            t.MSPointerEvent && (Ut = "MSPointerDown", Wt = "MSPointerMove MSPointerUp MSPointerCancel"), h(j, P, {
                handler: function(t) {
                    var e = this.store,
                        i = !1,
                        n = t.type.toLowerCase().replace("ms", ""),
                        r = Xt[n],
                        s = Vt[t.pointerType] || t.pointerType,
                        o = s == _t,
                        a = T(e, t.pointerId, "pointerId");
                    r & Pt && (0 === t.button || o) ? 0 > a && (e.push(t), a = e.length - 1) : r & (Mt | Et) && (i = !0), 0 > a || (e[a] = t, this.callback(this.manager, r, {
                        pointers: e,
                        changedPointers: [t],
                        pointerType: s,
                        srcEvent: t
                    }), i && e.splice(a, 1))
                }
            });
            var zt = {
                    touchstart: Pt,
                    touchmove: At,
                    touchend: Mt,
                    touchcancel: Et
                },
                qt = "touchstart",
                Yt = "touchstart touchmove touchend touchcancel";
            h(F, P, {
                handler: function(t) {
                    var e = zt[t.type];
                    if (e === Pt && (this.started = !0), this.started) {
                        var i = X.call(this, t, e);
                        e & (Mt | Et) && i[0].length - i[1].length === 0 && (this.started = !1), this.callback(this.manager, e, {
                            pointers: i[0],
                            changedPointers: i[1],
                            pointerType: _t,
                            srcEvent: t
                        })
                    }
                }
            });
            var $t = {
                    touchstart: Pt,
                    touchmove: At,
                    touchend: Mt,
                    touchcancel: Et
                },
                Kt = "touchstart touchmove touchend touchcancel";
            h(V, P, {
                handler: function(t) {
                    var e = $t[t.type],
                        i = U.call(this, t, e);
                    i && this.callback(this.manager, e, {
                        pointers: i[0],
                        changedPointers: i[1],
                        pointerType: _t,
                        srcEvent: t
                    })
                }
            }), h(W, P, {
                handler: function(t, e, i) {
                    var n = i.pointerType == _t,
                        r = i.pointerType == wt;
                    if (n) this.mouse.allow = !1;
                    else if (r && !this.mouse.allow) return;
                    e & (Mt | Et) && (this.mouse.allow = !0), this.callback(t, e, i)
                },
                destroy: function() {
                    this.touch.destroy(), this.mouse.destroy()
                }
            });
            var Qt = w(ht.style, "touchAction"),
                Zt = Qt !== r,
                Jt = "compute",
                te = "auto",
                ee = "manipulation",
                ie = "none",
                ne = "pan-x",
                re = "pan-y";
            z.prototype = {
                set: function(t) {
                    t == Jt && (t = this.compute()), Zt && (this.manager.element.style[Qt] = t), this.actions = t.toLowerCase().trim()
                },
                update: function() {
                    this.set(this.manager.options.touchAction)
                },
                compute: function() {
                    var t = [];
                    return a(this.manager.recognizers, function(e) {
                        f(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
                    }), q(t.join(" "))
                },
                preventDefaults: function(t) {
                    if (!Zt) {
                        var e = t.srcEvent,
                            i = t.offsetDirection;
                        if (this.manager.session.prevented) return void e.preventDefault();
                        var n = this.actions,
                            r = v(n, ie),
                            s = v(n, re),
                            o = v(n, ne);
                        return r || s && i & Gt || o && i & Rt ? this.preventSrc(e) : void 0
                    }
                },
                preventSrc: function(t) {
                    this.manager.session.prevented = !0, t.preventDefault()
                }
            };
            var se = 1,
                oe = 2,
                ae = 4,
                ue = 8,
                le = ue,
                he = 16,
                ce = 32;
            Y.prototype = {
                defaults: {},
                set: function(t) {
                    return u(this.options, t), this.manager && this.manager.touchAction.update(), this
                },
                recognizeWith: function(t) {
                    if (o(t, "recognizeWith", this)) return this;
                    var e = this.simultaneous;
                    return t = Q(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this
                },
                dropRecognizeWith: function(t) {
                    return o(t, "dropRecognizeWith", this) ? this : (t = Q(t, this), delete this.simultaneous[t.id], this)
                },
                requireFailure: function(t) {
                    if (o(t, "requireFailure", this)) return this;
                    var e = this.requireFail;
                    return t = Q(t, this), -1 === T(e, t) && (e.push(t), t.requireFailure(this)), this
                },
                dropRequireFailure: function(t) {
                    if (o(t, "dropRequireFailure", this)) return this;
                    t = Q(t, this);
                    var e = T(this.requireFail, t);
                    return e > -1 && this.requireFail.splice(e, 1), this
                },
                hasRequireFailures: function() {
                    return this.requireFail.length > 0;
                },
                canRecognizeWith: function(t) {
                    return !!this.simultaneous[t.id]
                },
                emit: function(t) {
                    function e(e) {
                        i.manager.emit(i.options.event + (e ? $(n) : ""), t)
                    }
                    var i = this,
                        n = this.state;
                    ue > n && e(!0), e(), n >= ue && e(!0)
                },
                tryEmit: function(t) {
                    return this.canEmit() ? this.emit(t) : void(this.state = ce)
                },
                canEmit: function() {
                    for (var t = 0; t < this.requireFail.length;) {
                        if (!(this.requireFail[t].state & (ce | se))) return !1;
                        t++
                    }
                    return !0
                },
                recognize: function(t) {
                    var e = u({}, t);
                    return f(this.options.enable, [this, e]) ? (this.state & (le | he | ce) && (this.state = se), this.state = this.process(e), void(this.state & (oe | ae | ue | he) && this.tryEmit(e))) : (this.reset(), void(this.state = ce))
                },
                process: function(t) {},
                getTouchAction: function() {},
                reset: function() {}
            }, h(Z, Y, {
                defaults: {
                    pointers: 1
                },
                attrTest: function(t) {
                    var e = this.options.pointers;
                    return 0 === e || t.pointers.length === e
                },
                process: function(t) {
                    var e = this.state,
                        i = t.eventType,
                        n = e & (oe | ae),
                        r = this.attrTest(t);
                    return n && (i & Et || !r) ? e | he : n || r ? i & Mt ? e | ue : e & oe ? e | ae : oe : ce
                }
            }), h(J, Z, {
                defaults: {
                    event: "pan",
                    threshold: 10,
                    pointers: 1,
                    direction: Bt
                },
                getTouchAction: function() {
                    var t = this.options.direction,
                        e = [];
                    return t & Gt && e.push(re), t & Rt && e.push(ne), e
                },
                directionTest: function(t) {
                    var e = this.options,
                        i = !0,
                        n = t.distance,
                        r = t.direction,
                        s = t.deltaX,
                        o = t.deltaY;
                    return r & e.direction || (e.direction & Gt ? (r = 0 === s ? Ct : 0 > s ? Ot : Dt, i = s != this.pX, n = Math.abs(t.deltaX)) : (r = 0 === o ? Ct : 0 > o ? It : kt, i = o != this.pY, n = Math.abs(t.deltaY))), t.direction = r, i && n > e.threshold && r & e.direction
                },
                attrTest: function(t) {
                    return Z.prototype.attrTest.call(this, t) && (this.state & oe || !(this.state & oe) && this.directionTest(t))
                },
                emit: function(t) {
                    this.pX = t.deltaX, this.pY = t.deltaY;
                    var e = K(t.direction);
                    e && this.manager.emit(this.options.event + e, t), this._super.emit.call(this, t)
                }
            }), h(tt, Z, {
                defaults: {
                    event: "pinch",
                    threshold: 0,
                    pointers: 2
                },
                getTouchAction: function() {
                    return [ie]
                },
                attrTest: function(t) {
                    return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & oe)
                },
                emit: function(t) {
                    if (this._super.emit.call(this, t), 1 !== t.scale) {
                        var e = t.scale < 1 ? "in" : "out";
                        this.manager.emit(this.options.event + e, t)
                    }
                }
            }), h(et, Y, {
                defaults: {
                    event: "press",
                    pointers: 1,
                    time: 500,
                    threshold: 5
                },
                getTouchAction: function() {
                    return [te]
                },
                process: function(t) {
                    var e = this.options,
                        i = t.pointers.length === e.pointers,
                        n = t.distance < e.threshold,
                        r = t.deltaTime > e.time;
                    if (this._input = t, !n || !i || t.eventType & (Mt | Et) && !r) this.reset();
                    else if (t.eventType & Pt) this.reset(), this._timer = s(function() {
                        this.state = le, this.tryEmit()
                    }, e.time, this);
                    else if (t.eventType & Mt) return le;
                    return ce
                },
                reset: function() {
                    clearTimeout(this._timer)
                },
                emit: function(t) {
                    this.state === le && (t && t.eventType & Mt ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = pt(), this.manager.emit(this.options.event, this._input)))
                }
            }), h(it, Z, {
                defaults: {
                    event: "rotate",
                    threshold: 0,
                    pointers: 2
                },
                getTouchAction: function() {
                    return [ie]
                },
                attrTest: function(t) {
                    return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & oe)
                }
            }), h(nt, Z, {
                defaults: {
                    event: "swipe",
                    threshold: 10,
                    velocity: .65,
                    direction: Gt | Rt,
                    pointers: 1
                },
                getTouchAction: function() {
                    return J.prototype.getTouchAction.call(this)
                },
                attrTest: function(t) {
                    var e, i = this.options.direction;
                    return i & (Gt | Rt) ? e = t.velocity : i & Gt ? e = t.velocityX : i & Rt && (e = t.velocityY), this._super.attrTest.call(this, t) && i & t.direction && t.distance > this.options.threshold && dt(e) > this.options.velocity && t.eventType & Mt
                },
                emit: function(t) {
                    var e = K(t.direction);
                    e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
                }
            }), h(rt, Y, {
                defaults: {
                    event: "tap",
                    pointers: 1,
                    taps: 1,
                    interval: 300,
                    time: 250,
                    threshold: 2,
                    posThreshold: 10
                },
                getTouchAction: function() {
                    return [ee]
                },
                process: function(t) {
                    var e = this.options,
                        i = t.pointers.length === e.pointers,
                        n = t.distance < e.threshold,
                        r = t.deltaTime < e.time;
                    if (this.reset(), t.eventType & Pt && 0 === this.count) return this.failTimeout();
                    if (n && r && i) {
                        if (t.eventType != Mt) return this.failTimeout();
                        var o = this.pTime ? t.timeStamp - this.pTime < e.interval : !0,
                            a = !this.pCenter || R(this.pCenter, t.center) < e.posThreshold;
                        this.pTime = t.timeStamp, this.pCenter = t.center, a && o ? this.count += 1 : this.count = 1, this._input = t;
                        var u = this.count % e.taps;
                        if (0 === u) return this.hasRequireFailures() ? (this._timer = s(function() {
                            this.state = le, this.tryEmit()
                        }, e.interval, this), oe) : le
                    }
                    return ce
                },
                failTimeout: function() {
                    return this._timer = s(function() {
                        this.state = ce
                    }, this.options.interval, this), ce
                },
                reset: function() {
                    clearTimeout(this._timer)
                },
                emit: function() {
                    this.state == le && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
                }
            }), st.VERSION = "2.0.4", st.defaults = {
                domEvents: !1,
                touchAction: Jt,
                enable: !0,
                inputTarget: null,
                inputClass: null,
                preset: [
                    [it, {
                        enable: !1
                    }],
                    [tt, {
                            enable: !1
                        },
                        ["rotate"]
                    ],
                    [nt, {
                        direction: Gt
                    }],
                    [J, {
                            direction: Gt
                        },
                        ["swipe"]
                    ],
                    [rt],
                    [rt, {
                            event: "doubletap",
                            taps: 2
                        },
                        ["tap"]
                    ],
                    [et]
                ],
                cssProps: {
                    userSelect: "none",
                    touchSelect: "none",
                    touchCallout: "none",
                    contentZooming: "none",
                    userDrag: "none",
                    tapHighlightColor: "rgba(0,0,0,0)"
                }
            };
            var fe = 1,
                de = 2;
            ot.prototype = {
                set: function(t) {
                    return u(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
                },
                stop: function(t) {
                    this.session.stopped = t ? de : fe
                },
                recognize: function(t) {
                    var e = this.session;
                    if (!e.stopped) {
                        this.touchAction.preventDefaults(t);
                        var i, n = this.recognizers,
                            r = e.curRecognizer;
                        (!r || r && r.state & le) && (r = e.curRecognizer = null);
                        for (var s = 0; s < n.length;) i = n[s], e.stopped === de || r && i != r && !i.canRecognizeWith(r) ? i.reset() : i.recognize(t), !r && i.state & (oe | ae | ue) && (r = e.curRecognizer = i), s++
                    }
                },
                get: function(t) {
                    if (t instanceof Y) return t;
                    for (var e = this.recognizers, i = 0; i < e.length; i++)
                        if (e[i].options.event == t) return e[i];
                    return null
                },
                add: function(t) {
                    if (o(t, "add", this)) return this;
                    var e = this.get(t.options.event);
                    return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t
                },
                remove: function(t) {
                    if (o(t, "remove", this)) return this;
                    var e = this.recognizers;
                    return t = this.get(t), e.splice(T(e, t), 1), this.touchAction.update(), this
                },
                on: function(t, e) {
                    var i = this.handlers;
                    return a(y(t), function(t) {
                        i[t] = i[t] || [], i[t].push(e)
                    }), this
                },
                off: function(t, e) {
                    var i = this.handlers;
                    return a(y(t), function(t) {
                        e ? i[t].splice(T(i[t], e), 1) : delete i[t]
                    }), this
                },
                emit: function(t, e) {
                    this.options.domEvents && ut(t, e);
                    var i = this.handlers[t] && this.handlers[t].slice();
                    if (i && i.length) {
                        e.type = t, e.preventDefault = function() {
                            e.srcEvent.preventDefault()
                        };
                        for (var n = 0; n < i.length;) i[n](e), n++
                    }
                },
                destroy: function() {
                    this.element && at(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
                }
            }, u(st, {
                INPUT_START: Pt,
                INPUT_MOVE: At,
                INPUT_END: Mt,
                INPUT_CANCEL: Et,
                STATE_POSSIBLE: se,
                STATE_BEGAN: oe,
                STATE_CHANGED: ae,
                STATE_ENDED: ue,
                STATE_RECOGNIZED: le,
                STATE_CANCELLED: he,
                STATE_FAILED: ce,
                DIRECTION_NONE: Ct,
                DIRECTION_LEFT: Ot,
                DIRECTION_RIGHT: Dt,
                DIRECTION_UP: It,
                DIRECTION_DOWN: kt,
                DIRECTION_HORIZONTAL: Gt,
                DIRECTION_VERTICAL: Rt,
                DIRECTION_ALL: Bt,
                Manager: ot,
                Input: P,
                TouchAction: z,
                TouchInput: V,
                MouseInput: N,
                PointerEventInput: j,
                TouchMouseInput: W,
                SingleTouchInput: F,
                Recognizer: Y,
                AttrRecognizer: Z,
                Tap: rt,
                Pan: J,
                Swipe: nt,
                Pinch: tt,
                Rotate: it,
                Press: et,
                on: p,
                off: m,
                each: a,
                merge: l,
                extend: u,
                inherit: h,
                bindFn: c,
                prefixed: w
            }), typeof define == ct && define.amd ? define(function() {
                return st
            }) : "undefined" != typeof e && e.exports ? e.exports = st : t[n] = st
        }(window, document, "Hammer")
    }, {}],
    45: [function(t, e, i) {
        ! function(t) {
            "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof i ? e.exports = t : t(jQuery)
        }(function(t) {
            function e(e) {
                var o = e || window.event,
                    a = u.call(arguments, 1),
                    l = 0,
                    c = 0,
                    f = 0,
                    d = 0,
                    p = 0,
                    m = 0;
                if (e = t.event.fix(o), e.type = "mousewheel", "detail" in o && (f = -1 * o.detail), "wheelDelta" in o && (f = o.wheelDelta), "wheelDeltaY" in o && (f = o.wheelDeltaY), "wheelDeltaX" in o && (c = -1 * o.wheelDeltaX), "axis" in o && o.axis === o.HORIZONTAL_AXIS && (c = -1 * f, f = 0), l = 0 === f ? c : f, "deltaY" in o && (f = -1 * o.deltaY, l = f), "deltaX" in o && (c = o.deltaX, 0 === f && (l = -1 * c)), 0 !== f || 0 !== c) {
                    if (1 === o.deltaMode) {
                        var g = t.data(this, "mousewheel-line-height");
                        l *= g, f *= g, c *= g
                    } else if (2 === o.deltaMode) {
                        var v = t.data(this, "mousewheel-page-height");
                        l *= v, f *= v, c *= v
                    }
                    if (d = Math.max(Math.abs(f), Math.abs(c)), (!s || s > d) && (s = d, n(o, d) && (s /= 40)), n(o, d) && (l /= 40, c /= 40, f /= 40), l = Math[l >= 1 ? "floor" : "ceil"](l / s), c = Math[c >= 1 ? "floor" : "ceil"](c / s), f = Math[f >= 1 ? "floor" : "ceil"](f / s), h.settings.normalizeOffset && this.getBoundingClientRect) {
                        var y = this.getBoundingClientRect();
                        p = e.clientX - y.left, m = e.clientY - y.top
                    }
                    return e.deltaX = c, e.deltaY = f, e.deltaFactor = s, e.offsetX = p, e.offsetY = m, e.deltaMode = 0, a.unshift(e, l, c, f), r && clearTimeout(r), r = setTimeout(i, 200), (t.event.dispatch || t.event.handle).apply(this, a)
                }
            }

            function i() {
                s = null
            }

            function n(t, e) {
                return h.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 === 0
            }
            var r, s, o = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                a = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                u = Array.prototype.slice;
            if (t.event.fixHooks)
                for (var l = o.length; l;) t.event.fixHooks[o[--l]] = t.event.mouseHooks;
            var h = t.event.special.mousewheel = {
                version: "3.1.12",
                setup: function() {
                    if (this.addEventListener)
                        for (var i = a.length; i;) this.addEventListener(a[--i], e, !1);
                    else this.onmousewheel = e;
                    t.data(this, "mousewheel-line-height", h.getLineHeight(this)), t.data(this, "mousewheel-page-height", h.getPageHeight(this))
                },
                teardown: function() {
                    if (this.removeEventListener)
                        for (var i = a.length; i;) this.removeEventListener(a[--i], e, !1);
                    else this.onmousewheel = null;
                    t.removeData(this, "mousewheel-line-height"), t.removeData(this, "mousewheel-page-height")
                },
                getLineHeight: function(e) {
                    var i = t(e),
                        n = i["offsetParent" in t.fn ? "offsetParent" : "parent"]();
                    return n.length || (n = t("body")), parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
                },
                getPageHeight: function(e) {
                    return t(e).height()
                },
                settings: {
                    adjustOldDeltas: !0,
                    normalizeOffset: !0
                }
            };
            t.fn.extend({
                mousewheel: function(t) {
                    return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
                },
                unmousewheel: function(t) {
                    return this.unbind("mousewheel", t)
                }
            })
        })
    }, {}],
    46: [function(t, e, i) {
        ! function(t, i) {
            "object" == typeof e && "object" == typeof e.exports ? e.exports = t.document ? i(t, !0) : function(t) {
                if (!t.document) throw new Error("jQuery requires a window with a document");
                return i(t)
            } : i(t)
        }("undefined" != typeof window ? window : this, function(t, e) {
            function i(t) {
                var e = "length" in t && t.length,
                    i = J.type(t);
                return "function" === i || J.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
            }

            function n(t, e, i) {
                if (J.isFunction(e)) return J.grep(t, function(t, n) {
                    return !!e.call(t, n, t) !== i
                });
                if (e.nodeType) return J.grep(t, function(t) {
                    return t === e !== i
                });
                if ("string" == typeof e) {
                    if (at.test(e)) return J.filter(e, t, i);
                    e = J.filter(e, t)
                }
                return J.grep(t, function(t) {
                    return z.call(e, t) >= 0 !== i
                })
            }

            function r(t, e) {
                for (;
                    (t = t[e]) && 1 !== t.nodeType;);
                return t
            }

            function s(t) {
                var e = pt[t] = {};
                return J.each(t.match(dt) || [], function(t, i) {
                    e[i] = !0
                }), e
            }

            function o() {
                Q.removeEventListener("DOMContentLoaded", o, !1), t.removeEventListener("load", o, !1), J.ready()
            }

            function a() {
                Object.defineProperty(this.cache = {}, 0, {
                    get: function() {
                        return {}
                    }
                }), this.expando = J.expando + a.uid++
            }

            function u(t, e, i) {
                var n;
                if (void 0 === i && 1 === t.nodeType)
                    if (n = "data-" + e.replace(_t, "-$1").toLowerCase(), i = t.getAttribute(n), "string" == typeof i) {
                        try {
                            i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : Tt.test(i) ? J.parseJSON(i) : i
                        } catch (r) {}
                        yt.set(t, e, i)
                    } else i = void 0;
                return i
            }

            function l() {
                return !0
            }

            function h() {
                return !1
            }

            function c() {
                try {
                    return Q.activeElement
                } catch (t) {}
            }

            function f(t, e) {
                return J.nodeName(t, "table") && J.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
            }

            function d(t) {
                return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
            }

            function p(t) {
                var e = Bt.exec(t.type);
                return e ? t.type = e[1] : t.removeAttribute("type"), t
            }

            function m(t, e) {
                for (var i = 0, n = t.length; n > i; i++) vt.set(t[i], "globalEval", !e || vt.get(e[i], "globalEval"))
            }

            function g(t, e) {
                var i, n, r, s, o, a, u, l;
                if (1 === e.nodeType) {
                    if (vt.hasData(t) && (s = vt.access(t), o = vt.set(e, s), l = s.events)) {
                        delete o.handle, o.events = {};
                        for (r in l)
                            for (i = 0, n = l[r].length; n > i; i++) J.event.add(e, r, l[r][i])
                    }
                    yt.hasData(t) && (a = yt.access(t), u = J.extend({}, a), yt.set(e, u))
                }
            }

            function v(t, e) {
                var i = t.getElementsByTagName ? t.getElementsByTagName(e || "*") : t.querySelectorAll ? t.querySelectorAll(e || "*") : [];
                return void 0 === e || e && J.nodeName(t, e) ? J.merge([t], i) : i
            }

            function y(t, e) {
                var i = e.nodeName.toLowerCase();
                "input" === i && xt.test(t.type) ? e.checked = t.checked : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue)
            }

            function T(e, i) {
                var n, r = J(i.createElement(e)).appendTo(i.body),
                    s = t.getDefaultComputedStyle && (n = t.getDefaultComputedStyle(r[0])) ? n.display : J.css(r[0], "display");
                return r.detach(), s
            }

            function _(t) {
                var e = Q,
                    i = jt[t];
                return i || (i = T(t, e), "none" !== i && i || (Nt = (Nt || J("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = Nt[0].contentDocument, e.write(), e.close(), i = T(t, e), Nt.detach()), jt[t] = i), i
            }

            function b(t, e, i) {
                var n, r, s, o, a = t.style;
                return i = i || Vt(t), i && (o = i.getPropertyValue(e) || i[e]), i && ("" !== o || J.contains(t.ownerDocument, t) || (o = J.style(t, e)), Xt.test(o) && Ft.test(e) && (n = a.width, r = a.minWidth, s = a.maxWidth, a.minWidth = a.maxWidth = a.width = o, o = i.width, a.width = n, a.minWidth = r, a.maxWidth = s)), void 0 !== o ? o + "" : o
            }

            function w(t, e) {
                return {
                    get: function() {
                        return t() ? void delete this.get : (this.get = e).apply(this, arguments)
                    }
                }
            }

            function S(t, e) {
                if (e in t) return e;
                for (var i = e[0].toUpperCase() + e.slice(1), n = e, r = $t.length; r--;)
                    if (e = $t[r] + i, e in t) return e;
                return n
            }

            function x(t, e, i) {
                var n = Wt.exec(e);
                return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
            }

            function P(t, e, i, n, r) {
                for (var s = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, o = 0; 4 > s; s += 2) "margin" === i && (o += J.css(t, i + wt[s], !0, r)), n ? ("content" === i && (o -= J.css(t, "padding" + wt[s], !0, r)), "margin" !== i && (o -= J.css(t, "border" + wt[s] + "Width", !0, r))) : (o += J.css(t, "padding" + wt[s], !0, r), "padding" !== i && (o += J.css(t, "border" + wt[s] + "Width", !0, r)));
                return o
            }

            function A(t, e, i) {
                var n = !0,
                    r = "width" === e ? t.offsetWidth : t.offsetHeight,
                    s = Vt(t),
                    o = "border-box" === J.css(t, "boxSizing", !1, s);
                if (0 >= r || null == r) {
                    if (r = b(t, e, s), (0 > r || null == r) && (r = t.style[e]), Xt.test(r)) return r;
                    n = o && (K.boxSizingReliable() || r === t.style[e]), r = parseFloat(r) || 0
                }
                return r + P(t, e, i || (o ? "border" : "content"), n, s) + "px"
            }

            function M(t, e) {
                for (var i, n, r, s = [], o = 0, a = t.length; a > o; o++) n = t[o], n.style && (s[o] = vt.get(n, "olddisplay"), i = n.style.display, e ? (s[o] || "none" !== i || (n.style.display = ""), "" === n.style.display && St(n) && (s[o] = vt.access(n, "olddisplay", _(n.nodeName)))) : (r = St(n), "none" === i && r || vt.set(n, "olddisplay", r ? i : J.css(n, "display"))));
                for (o = 0; a > o; o++) n = t[o], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? s[o] || "" : "none"));
                return t
            }

            function E(t, e, i, n, r) {
                return new E.prototype.init(t, e, i, n, r)
            }

            function C() {
                return setTimeout(function() {
                    Kt = void 0
                }), Kt = J.now()
            }

            function O(t, e) {
                var i, n = 0,
                    r = {
                        height: t
                    };
                for (e = e ? 1 : 0; 4 > n; n += 2 - e) i = wt[n], r["margin" + i] = r["padding" + i] = t;
                return e && (r.opacity = r.width = t), r
            }

            function D(t, e, i) {
                for (var n, r = (ie[e] || []).concat(ie["*"]), s = 0, o = r.length; o > s; s++)
                    if (n = r[s].call(i, e, t)) return n
            }

            function I(t, e, i) {
                var n, r, s, o, a, u, l, h, c = this,
                    f = {},
                    d = t.style,
                    p = t.nodeType && St(t),
                    m = vt.get(t, "fxshow");
                i.queue || (a = J._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, u = a.empty.fire, a.empty.fire = function() {
                    a.unqueued || u()
                }), a.unqueued++, c.always(function() {
                    c.always(function() {
                        a.unqueued--, J.queue(t, "fx").length || a.empty.fire()
                    })
                })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [d.overflow, d.overflowX, d.overflowY], l = J.css(t, "display"), h = "none" === l ? vt.get(t, "olddisplay") || _(t.nodeName) : l, "inline" === h && "none" === J.css(t, "float") && (d.display = "inline-block")), i.overflow && (d.overflow = "hidden", c.always(function() {
                    d.overflow = i.overflow[0], d.overflowX = i.overflow[1], d.overflowY = i.overflow[2]
                }));
                for (n in e)
                    if (r = e[n], Zt.exec(r)) {
                        if (delete e[n], s = s || "toggle" === r, r === (p ? "hide" : "show")) {
                            if ("show" !== r || !m || void 0 === m[n]) continue;
                            p = !0
                        }
                        f[n] = m && m[n] || J.style(t, n)
                    } else l = void 0;
                if (J.isEmptyObject(f)) "inline" === ("none" === l ? _(t.nodeName) : l) && (d.display = l);
                else {
                    m ? "hidden" in m && (p = m.hidden) : m = vt.access(t, "fxshow", {}), s && (m.hidden = !p), p ? J(t).show() : c.done(function() {
                        J(t).hide()
                    }), c.done(function() {
                        var e;
                        vt.remove(t, "fxshow");
                        for (e in f) J.style(t, e, f[e])
                    });
                    for (n in f) o = D(p ? m[n] : 0, n, c), n in m || (m[n] = o.start, p && (o.end = o.start, o.start = "width" === n || "height" === n ? 1 : 0))
                }
            }

            function k(t, e) {
                var i, n, r, s, o;
                for (i in t)
                    if (n = J.camelCase(i), r = e[n], s = t[i], J.isArray(s) && (r = s[1], s = t[i] = s[0]), i !== n && (t[n] = s, delete t[i]), o = J.cssHooks[n], o && "expand" in o) {
                        s = o.expand(s), delete t[n];
                        for (i in s) i in t || (t[i] = s[i], e[i] = r)
                    } else e[n] = r
            }

            function G(t, e, i) {
                var n, r, s = 0,
                    o = ee.length,
                    a = J.Deferred().always(function() {
                        delete u.elem
                    }),
                    u = function() {
                        if (r) return !1;
                        for (var e = Kt || C(), i = Math.max(0, l.startTime + l.duration - e), n = i / l.duration || 0, s = 1 - n, o = 0, u = l.tweens.length; u > o; o++) l.tweens[o].run(s);
                        return a.notifyWith(t, [l, s, i]), 1 > s && u ? i : (a.resolveWith(t, [l]), !1)
                    },
                    l = a.promise({
                        elem: t,
                        props: J.extend({}, e),
                        opts: J.extend(!0, {
                            specialEasing: {}
                        }, i),
                        originalProperties: e,
                        originalOptions: i,
                        startTime: Kt || C(),
                        duration: i.duration,
                        tweens: [],
                        createTween: function(e, i) {
                            var n = J.Tween(t, l.opts, e, i, l.opts.specialEasing[e] || l.opts.easing);
                            return l.tweens.push(n), n
                        },
                        stop: function(e) {
                            var i = 0,
                                n = e ? l.tweens.length : 0;
                            if (r) return this;
                            for (r = !0; n > i; i++) l.tweens[i].run(1);
                            return e ? a.resolveWith(t, [l, e]) : a.rejectWith(t, [l, e]), this
                        }
                    }),
                    h = l.props;
                for (k(h, l.opts.specialEasing); o > s; s++)
                    if (n = ee[s].call(l, t, h, l.opts)) return n;
                return J.map(h, D, l), J.isFunction(l.opts.start) && l.opts.start.call(t, l), J.fx.timer(J.extend(u, {
                    elem: t,
                    anim: l,
                    queue: l.opts.queue
                })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
            }

            function R(t) {
                return function(e, i) {
                    "string" != typeof e && (i = e, e = "*");
                    var n, r = 0,
                        s = e.toLowerCase().match(dt) || [];
                    if (J.isFunction(i))
                        for (; n = s[r++];) "+" === n[0] ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
                }
            }

            function B(t, e, i, n) {
                function r(a) {
                    var u;
                    return s[a] = !0, J.each(t[a] || [], function(t, a) {
                        var l = a(e, i, n);
                        return "string" != typeof l || o || s[l] ? o ? !(u = l) : void 0 : (e.dataTypes.unshift(l), r(l), !1)
                    }), u
                }
                var s = {},
                    o = t === Te;
                return r(e.dataTypes[0]) || !s["*"] && r("*")
            }

            function H(t, e) {
                var i, n, r = J.ajaxSettings.flatOptions || {};
                for (i in e) void 0 !== e[i] && ((r[i] ? t : n || (n = {}))[i] = e[i]);
                return n && J.extend(!0, t, n), t
            }

            function L(t, e, i) {
                for (var n, r, s, o, a = t.contents, u = t.dataTypes;
                    "*" === u[0];) u.shift(), void 0 === n && (n = t.mimeType || e.getResponseHeader("Content-Type"));
                if (n)
                    for (r in a)
                        if (a[r] && a[r].test(n)) {
                            u.unshift(r);
                            break
                        }
                if (u[0] in i) s = u[0];
                else {
                    for (r in i) {
                        if (!u[0] || t.converters[r + " " + u[0]]) {
                            s = r;
                            break
                        }
                        o || (o = r)
                    }
                    s = s || o
                }
                return s ? (s !== u[0] && u.unshift(s), i[s]) : void 0
            }

            function N(t, e, i, n) {
                var r, s, o, a, u, l = {},
                    h = t.dataTypes.slice();
                if (h[1])
                    for (o in t.converters) l[o.toLowerCase()] = t.converters[o];
                for (s = h.shift(); s;)
                    if (t.responseFields[s] && (i[t.responseFields[s]] = e), !u && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), u = s, s = h.shift())
                        if ("*" === s) s = u;
                        else if ("*" !== u && u !== s) {
                    if (o = l[u + " " + s] || l["* " + s], !o)
                        for (r in l)
                            if (a = r.split(" "), a[1] === s && (o = l[u + " " + a[0]] || l["* " + a[0]])) {
                                o === !0 ? o = l[r] : l[r] !== !0 && (s = a[0], h.unshift(a[1]));
                                break
                            }
                    if (o !== !0)
                        if (o && t["throws"]) e = o(e);
                        else try {
                            e = o(e)
                        } catch (c) {
                            return {
                                state: "parsererror",
                                error: o ? c : "No conversion from " + u + " to " + s
                            }
                        }
                }
                return {
                    state: "success",
                    data: e
                }
            }

            function j(t, e, i, n) {
                var r;
                if (J.isArray(e)) J.each(e, function(e, r) {
                    i || xe.test(t) ? n(t, r) : j(t + "[" + ("object" == typeof r ? e : "") + "]", r, i, n)
                });
                else if (i || "object" !== J.type(e)) n(t, e);
                else
                    for (r in e) j(t + "[" + r + "]", e[r], i, n)
            }

            function F(t) {
                return J.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
            }
            var X = [],
                V = X.slice,
                U = X.concat,
                W = X.push,
                z = X.indexOf,
                q = {},
                Y = q.toString,
                $ = q.hasOwnProperty,
                K = {},
                Q = t.document,
                Z = "2.1.4",
                J = function(t, e) {
                    return new J.fn.init(t, e)
                },
                tt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                et = /^-ms-/,
                it = /-([\da-z])/gi,
                nt = function(t, e) {
                    return e.toUpperCase()
                };
            J.fn = J.prototype = {
                jquery: Z,
                constructor: J,
                selector: "",
                length: 0,
                toArray: function() {
                    return V.call(this)
                },
                get: function(t) {
                    return null != t ? 0 > t ? this[t + this.length] : this[t] : V.call(this)
                },
                pushStack: function(t) {
                    var e = J.merge(this.constructor(), t);
                    return e.prevObject = this, e.context = this.context, e
                },
                each: function(t, e) {
                    return J.each(this, t, e)
                },
                map: function(t) {
                    return this.pushStack(J.map(this, function(e, i) {
                        return t.call(e, i, e)
                    }))
                },
                slice: function() {
                    return this.pushStack(V.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(t) {
                    var e = this.length,
                        i = +t + (0 > t ? e : 0);
                    return this.pushStack(i >= 0 && e > i ? [this[i]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: W,
                sort: X.sort,
                splice: X.splice
            }, J.extend = J.fn.extend = function() {
                var t, e, i, n, r, s, o = arguments[0] || {},
                    a = 1,
                    u = arguments.length,
                    l = !1;
                for ("boolean" == typeof o && (l = o, o = arguments[a] || {}, a++), "object" == typeof o || J.isFunction(o) || (o = {}), a === u && (o = this, a--); u > a; a++)
                    if (null != (t = arguments[a]))
                        for (e in t) i = o[e], n = t[e], o !== n && (l && n && (J.isPlainObject(n) || (r = J.isArray(n))) ? (r ? (r = !1, s = i && J.isArray(i) ? i : []) : s = i && J.isPlainObject(i) ? i : {}, o[e] = J.extend(l, s, n)) : void 0 !== n && (o[e] = n));
                return o
            }, J.extend({
                expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(t) {
                    throw new Error(t)
                },
                noop: function() {},
                isFunction: function(t) {
                    return "function" === J.type(t)
                },
                isArray: Array.isArray,
                isWindow: function(t) {
                    return null != t && t === t.window
                },
                isNumeric: function(t) {
                    return !J.isArray(t) && t - parseFloat(t) + 1 >= 0
                },
                isPlainObject: function(t) {
                    return "object" !== J.type(t) || t.nodeType || J.isWindow(t) ? !1 : t.constructor && !$.call(t.constructor.prototype, "isPrototypeOf") ? !1 : !0
                },
                isEmptyObject: function(t) {
                    var e;
                    for (e in t) return !1;
                    return !0
                },
                type: function(t) {
                    return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? q[Y.call(t)] || "object" : typeof t
                },
                globalEval: function(t) {
                    var e, i = eval;
                    t = J.trim(t), t && (1 === t.indexOf("use strict") ? (e = Q.createElement("script"), e.text = t, Q.head.appendChild(e).parentNode.removeChild(e)) : i(t))
                },
                camelCase: function(t) {
                    return t.replace(et, "ms-").replace(it, nt)
                },
                nodeName: function(t, e) {
                    return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
                },
                each: function(t, e, n) {
                    var r, s = 0,
                        o = t.length,
                        a = i(t);
                    if (n) {
                        if (a)
                            for (; o > s && (r = e.apply(t[s], n), r !== !1); s++);
                        else
                            for (s in t)
                                if (r = e.apply(t[s], n), r === !1) break
                    } else if (a)
                        for (; o > s && (r = e.call(t[s], s, t[s]), r !== !1); s++);
                    else
                        for (s in t)
                            if (r = e.call(t[s], s, t[s]), r === !1) break; return t
                },
                trim: function(t) {
                    return null == t ? "" : (t + "").replace(tt, "")
                },
                makeArray: function(t, e) {
                    var n = e || [];
                    return null != t && (i(Object(t)) ? J.merge(n, "string" == typeof t ? [t] : t) : W.call(n, t)), n
                },
                inArray: function(t, e, i) {
                    return null == e ? -1 : z.call(e, t, i)
                },
                merge: function(t, e) {
                    for (var i = +e.length, n = 0, r = t.length; i > n; n++) t[r++] = e[n];
                    return t.length = r, t
                },
                grep: function(t, e, i) {
                    for (var n, r = [], s = 0, o = t.length, a = !i; o > s; s++) n = !e(t[s], s), n !== a && r.push(t[s]);
                    return r
                },
                map: function(t, e, n) {
                    var r, s = 0,
                        o = t.length,
                        a = i(t),
                        u = [];
                    if (a)
                        for (; o > s; s++) r = e(t[s], s, n), null != r && u.push(r);
                    else
                        for (s in t) r = e(t[s], s, n), null != r && u.push(r);
                    return U.apply([], u)
                },
                guid: 1,
                proxy: function(t, e) {
                    var i, n, r;
                    return "string" == typeof e && (i = t[e], e = t, t = i), J.isFunction(t) ? (n = V.call(arguments, 2), r = function() {
                        return t.apply(e || this, n.concat(V.call(arguments)))
                    }, r.guid = t.guid = t.guid || J.guid++, r) : void 0
                },
                now: Date.now,
                support: K
            }), J.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
                q["[object " + e + "]"] = e.toLowerCase()
            });
            var rt = function(t) {
                function e(t, e, i, n) {
                    var r, s, o, a, u, l, c, d, p, m;
                    if ((e ? e.ownerDocument || e : j) !== I && D(e), e = e || I, i = i || [], a = e.nodeType, "string" != typeof t || !t || 1 !== a && 9 !== a && 11 !== a) return i;
                    if (!n && G) {
                        if (11 !== a && (r = yt.exec(t)))
                            if (o = r[1]) {
                                if (9 === a) {
                                    if (s = e.getElementById(o), !s || !s.parentNode) return i;
                                    if (s.id === o) return i.push(s), i
                                } else if (e.ownerDocument && (s = e.ownerDocument.getElementById(o)) && L(e, s) && s.id === o) return i.push(s), i
                            } else {
                                if (r[2]) return Z.apply(i, e.getElementsByTagName(t)), i;
                                if ((o = r[3]) && b.getElementsByClassName) return Z.apply(i, e.getElementsByClassName(o)), i
                            }
                        if (b.qsa && (!R || !R.test(t))) {
                            if (d = c = N, p = e, m = 1 !== a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                                for (l = P(t), (c = e.getAttribute("id")) ? d = c.replace(_t, "\\$&") : e.setAttribute("id", d), d = "[id='" + d + "'] ", u = l.length; u--;) l[u] = d + f(l[u]);
                                p = Tt.test(t) && h(e.parentNode) || e, m = l.join(",")
                            }
                            if (m) try {
                                return Z.apply(i, p.querySelectorAll(m)), i
                            } catch (g) {} finally {
                                c || e.removeAttribute("id")
                            }
                        }
                    }
                    return M(t.replace(ut, "$1"), e, i, n)
                }

                function i() {
                    function t(i, n) {
                        return e.push(i + " ") > w.cacheLength && delete t[e.shift()], t[i + " "] = n
                    }
                    var e = [];
                    return t
                }

                function n(t) {
                    return t[N] = !0, t
                }

                function r(t) {
                    var e = I.createElement("div");
                    try {
                        return !!t(e)
                    } catch (i) {
                        return !1
                    } finally {
                        e.parentNode && e.parentNode.removeChild(e), e = null
                    }
                }

                function s(t, e) {
                    for (var i = t.split("|"), n = t.length; n--;) w.attrHandle[i[n]] = e
                }

                function o(t, e) {
                    var i = e && t,
                        n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || q) - (~t.sourceIndex || q);
                    if (n) return n;
                    if (i)
                        for (; i = i.nextSibling;)
                            if (i === e) return -1;
                    return t ? 1 : -1
                }

                function a(t) {
                    return function(e) {
                        var i = e.nodeName.toLowerCase();
                        return "input" === i && e.type === t
                    }
                }

                function u(t) {
                    return function(e) {
                        var i = e.nodeName.toLowerCase();
                        return ("input" === i || "button" === i) && e.type === t
                    }
                }

                function l(t) {
                    return n(function(e) {
                        return e = +e, n(function(i, n) {
                            for (var r, s = t([], i.length, e), o = s.length; o--;) i[r = s[o]] && (i[r] = !(n[r] = i[r]))
                        })
                    })
                }

                function h(t) {
                    return t && "undefined" != typeof t.getElementsByTagName && t
                }

                function c() {}

                function f(t) {
                    for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e].value;
                    return n
                }

                function d(t, e, i) {
                    var n = e.dir,
                        r = i && "parentNode" === n,
                        s = X++;
                    return e.first ? function(e, i, s) {
                        for (; e = e[n];)
                            if (1 === e.nodeType || r) return t(e, i, s)
                    } : function(e, i, o) {
                        var a, u, l = [F, s];
                        if (o) {
                            for (; e = e[n];)
                                if ((1 === e.nodeType || r) && t(e, i, o)) return !0
                        } else
                            for (; e = e[n];)
                                if (1 === e.nodeType || r) {
                                    if (u = e[N] || (e[N] = {}), (a = u[n]) && a[0] === F && a[1] === s) return l[2] = a[2];
                                    if (u[n] = l, l[2] = t(e, i, o)) return !0
                                }
                    }
                }

                function p(t) {
                    return t.length > 1 ? function(e, i, n) {
                        for (var r = t.length; r--;)
                            if (!t[r](e, i, n)) return !1;
                        return !0
                    } : t[0]
                }

                function m(t, i, n) {
                    for (var r = 0, s = i.length; s > r; r++) e(t, i[r], n);
                    return n
                }

                function g(t, e, i, n, r) {
                    for (var s, o = [], a = 0, u = t.length, l = null != e; u > a; a++)(s = t[a]) && (!i || i(s, n, r)) && (o.push(s), l && e.push(a));
                    return o
                }

                function v(t, e, i, r, s, o) {
                    return r && !r[N] && (r = v(r)), s && !s[N] && (s = v(s, o)), n(function(n, o, a, u) {
                        var l, h, c, f = [],
                            d = [],
                            p = o.length,
                            v = n || m(e || "*", a.nodeType ? [a] : a, []),
                            y = !t || !n && e ? v : g(v, f, t, a, u),
                            T = i ? s || (n ? t : p || r) ? [] : o : y;
                        if (i && i(y, T, a, u), r)
                            for (l = g(T, d), r(l, [], a, u), h = l.length; h--;)(c = l[h]) && (T[d[h]] = !(y[d[h]] = c));
                        if (n) {
                            if (s || t) {
                                if (s) {
                                    for (l = [], h = T.length; h--;)(c = T[h]) && l.push(y[h] = c);
                                    s(null, T = [], l, u)
                                }
                                for (h = T.length; h--;)(c = T[h]) && (l = s ? tt(n, c) : f[h]) > -1 && (n[l] = !(o[l] = c))
                            }
                        } else T = g(T === o ? T.splice(p, T.length) : T), s ? s(null, o, T, u) : Z.apply(o, T)
                    })
                }

                function y(t) {
                    for (var e, i, n, r = t.length, s = w.relative[t[0].type], o = s || w.relative[" "], a = s ? 1 : 0, u = d(function(t) {
                            return t === e
                        }, o, !0), l = d(function(t) {
                            return tt(e, t) > -1
                        }, o, !0), h = [function(t, i, n) {
                            var r = !s && (n || i !== E) || ((e = i).nodeType ? u(t, i, n) : l(t, i, n));
                            return e = null, r
                        }]; r > a; a++)
                        if (i = w.relative[t[a].type]) h = [d(p(h), i)];
                        else {
                            if (i = w.filter[t[a].type].apply(null, t[a].matches), i[N]) {
                                for (n = ++a; r > n && !w.relative[t[n].type]; n++);
                                return v(a > 1 && p(h), a > 1 && f(t.slice(0, a - 1).concat({
                                    value: " " === t[a - 2].type ? "*" : ""
                                })).replace(ut, "$1"), i, n > a && y(t.slice(a, n)), r > n && y(t = t.slice(n)), r > n && f(t))
                            }
                            h.push(i)
                        }
                    return p(h)
                }

                function T(t, i) {
                    var r = i.length > 0,
                        s = t.length > 0,
                        o = function(n, o, a, u, l) {
                            var h, c, f, d = 0,
                                p = "0",
                                m = n && [],
                                v = [],
                                y = E,
                                T = n || s && w.find.TAG("*", l),
                                _ = F += null == y ? 1 : Math.random() || .1,
                                b = T.length;
                            for (l && (E = o !== I && o); p !== b && null != (h = T[p]); p++) {
                                if (s && h) {
                                    for (c = 0; f = t[c++];)
                                        if (f(h, o, a)) {
                                            u.push(h);
                                            break
                                        }
                                    l && (F = _)
                                }
                                r && ((h = !f && h) && d--, n && m.push(h))
                            }
                            if (d += p, r && p !== d) {
                                for (c = 0; f = i[c++];) f(m, v, o, a);
                                if (n) {
                                    if (d > 0)
                                        for (; p--;) m[p] || v[p] || (v[p] = K.call(u));
                                    v = g(v)
                                }
                                Z.apply(u, v), l && !n && v.length > 0 && d + i.length > 1 && e.uniqueSort(u)
                            }
                            return l && (F = _, E = y), m
                        };
                    return r ? n(o) : o
                }
                var _, b, w, S, x, P, A, M, E, C, O, D, I, k, G, R, B, H, L, N = "sizzle" + 1 * new Date,
                    j = t.document,
                    F = 0,
                    X = 0,
                    V = i(),
                    U = i(),
                    W = i(),
                    z = function(t, e) {
                        return t === e && (O = !0), 0
                    },
                    q = 1 << 31,
                    Y = {}.hasOwnProperty,
                    $ = [],
                    K = $.pop,
                    Q = $.push,
                    Z = $.push,
                    J = $.slice,
                    tt = function(t, e) {
                        for (var i = 0, n = t.length; n > i; i++)
                            if (t[i] === e) return i;
                        return -1
                    },
                    et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    it = "[\\x20\\t\\r\\n\\f]",
                    nt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    rt = nt.replace("w", "w#"),
                    st = "\\[" + it + "*(" + nt + ")(?:" + it + "*([*^$|!~]?=)" + it + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + rt + "))|)" + it + "*\\]",
                    ot = ":(" + nt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + st + ")*)|.*)\\)|)",
                    at = new RegExp(it + "+", "g"),
                    ut = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$", "g"),
                    lt = new RegExp("^" + it + "*," + it + "*"),
                    ht = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"),
                    ct = new RegExp("=" + it + "*([^\\]'\"]*?)" + it + "*\\]", "g"),
                    ft = new RegExp(ot),
                    dt = new RegExp("^" + rt + "$"),
                    pt = {
                        ID: new RegExp("^#(" + nt + ")"),
                        CLASS: new RegExp("^\\.(" + nt + ")"),
                        TAG: new RegExp("^(" + nt.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + st),
                        PSEUDO: new RegExp("^" + ot),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + et + ")$", "i"),
                        needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)", "i")
                    },
                    mt = /^(?:input|select|textarea|button)$/i,
                    gt = /^h\d$/i,
                    vt = /^[^{]+\{\s*\[native \w/,
                    yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    Tt = /[+~]/,
                    _t = /'|\\/g,
                    bt = new RegExp("\\\\([\\da-f]{1,6}" + it + "?|(" + it + ")|.)", "ig"),
                    wt = function(t, e, i) {
                        var n = "0x" + e - 65536;
                        return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
                    },
                    St = function() {
                        D()
                    };
                try {
                    Z.apply($ = J.call(j.childNodes), j.childNodes), $[j.childNodes.length].nodeType
                } catch (xt) {
                    Z = {
                        apply: $.length ? function(t, e) {
                            Q.apply(t, J.call(e))
                        } : function(t, e) {
                            for (var i = t.length, n = 0; t[i++] = e[n++];);
                            t.length = i - 1
                        }
                    }
                }
                b = e.support = {}, x = e.isXML = function(t) {
                    var e = t && (t.ownerDocument || t).documentElement;
                    return e ? "HTML" !== e.nodeName : !1
                }, D = e.setDocument = function(t) {
                    var e, i, n = t ? t.ownerDocument || t : j;
                    return n !== I && 9 === n.nodeType && n.documentElement ? (I = n, k = n.documentElement, i = n.defaultView, i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", St, !1) : i.attachEvent && i.attachEvent("onunload", St)), G = !x(n), b.attributes = r(function(t) {
                        return t.className = "i", !t.getAttribute("className")
                    }), b.getElementsByTagName = r(function(t) {
                        return t.appendChild(n.createComment("")), !t.getElementsByTagName("*").length
                    }), b.getElementsByClassName = vt.test(n.getElementsByClassName), b.getById = r(function(t) {
                        return k.appendChild(t).id = N, !n.getElementsByName || !n.getElementsByName(N).length
                    }), b.getById ? (w.find.ID = function(t, e) {
                        if ("undefined" != typeof e.getElementById && G) {
                            var i = e.getElementById(t);
                            return i && i.parentNode ? [i] : []
                        }
                    }, w.filter.ID = function(t) {
                        var e = t.replace(bt, wt);
                        return function(t) {
                            return t.getAttribute("id") === e
                        }
                    }) : (delete w.find.ID, w.filter.ID = function(t) {
                        var e = t.replace(bt, wt);
                        return function(t) {
                            var i = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                            return i && i.value === e
                        }
                    }), w.find.TAG = b.getElementsByTagName ? function(t, e) {
                        return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : b.qsa ? e.querySelectorAll(t) : void 0
                    } : function(t, e) {
                        var i, n = [],
                            r = 0,
                            s = e.getElementsByTagName(t);
                        if ("*" === t) {
                            for (; i = s[r++];) 1 === i.nodeType && n.push(i);
                            return n
                        }
                        return s
                    }, w.find.CLASS = b.getElementsByClassName && function(t, e) {
                        return G ? e.getElementsByClassName(t) : void 0
                    }, B = [], R = [], (b.qsa = vt.test(n.querySelectorAll)) && (r(function(t) {
                        k.appendChild(t).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && R.push("[*^$]=" + it + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || R.push("\\[" + it + "*(?:value|" + et + ")"), t.querySelectorAll("[id~=" + N + "-]").length || R.push("~="), t.querySelectorAll(":checked").length || R.push(":checked"), t.querySelectorAll("a#" + N + "+*").length || R.push(".#.+[+~]")
                    }), r(function(t) {
                        var e = n.createElement("input");
                        e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && R.push("name" + it + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || R.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), R.push(",.*:")
                    })), (b.matchesSelector = vt.test(H = k.matches || k.webkitMatchesSelector || k.mozMatchesSelector || k.oMatchesSelector || k.msMatchesSelector)) && r(function(t) {
                        b.disconnectedMatch = H.call(t, "div"),
                            H.call(t, "[s!='']:x"), B.push("!=", ot)
                    }), R = R.length && new RegExp(R.join("|")), B = B.length && new RegExp(B.join("|")), e = vt.test(k.compareDocumentPosition), L = e || vt.test(k.contains) ? function(t, e) {
                        var i = 9 === t.nodeType ? t.documentElement : t,
                            n = e && e.parentNode;
                        return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
                    } : function(t, e) {
                        if (e)
                            for (; e = e.parentNode;)
                                if (e === t) return !0;
                        return !1
                    }, z = e ? function(t, e) {
                        if (t === e) return O = !0, 0;
                        var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                        return i ? i : (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & i || !b.sortDetached && e.compareDocumentPosition(t) === i ? t === n || t.ownerDocument === j && L(j, t) ? -1 : e === n || e.ownerDocument === j && L(j, e) ? 1 : C ? tt(C, t) - tt(C, e) : 0 : 4 & i ? -1 : 1)
                    } : function(t, e) {
                        if (t === e) return O = !0, 0;
                        var i, r = 0,
                            s = t.parentNode,
                            a = e.parentNode,
                            u = [t],
                            l = [e];
                        if (!s || !a) return t === n ? -1 : e === n ? 1 : s ? -1 : a ? 1 : C ? tt(C, t) - tt(C, e) : 0;
                        if (s === a) return o(t, e);
                        for (i = t; i = i.parentNode;) u.unshift(i);
                        for (i = e; i = i.parentNode;) l.unshift(i);
                        for (; u[r] === l[r];) r++;
                        return r ? o(u[r], l[r]) : u[r] === j ? -1 : l[r] === j ? 1 : 0
                    }, n) : I
                }, e.matches = function(t, i) {
                    return e(t, null, null, i)
                }, e.matchesSelector = function(t, i) {
                    if ((t.ownerDocument || t) !== I && D(t), i = i.replace(ct, "='$1']"), b.matchesSelector && G && (!B || !B.test(i)) && (!R || !R.test(i))) try {
                        var n = H.call(t, i);
                        if (n || b.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
                    } catch (r) {}
                    return e(i, I, null, [t]).length > 0
                }, e.contains = function(t, e) {
                    return (t.ownerDocument || t) !== I && D(t), L(t, e)
                }, e.attr = function(t, e) {
                    (t.ownerDocument || t) !== I && D(t);
                    var i = w.attrHandle[e.toLowerCase()],
                        n = i && Y.call(w.attrHandle, e.toLowerCase()) ? i(t, e, !G) : void 0;
                    return void 0 !== n ? n : b.attributes || !G ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
                }, e.error = function(t) {
                    throw new Error("Syntax error, unrecognized expression: " + t)
                }, e.uniqueSort = function(t) {
                    var e, i = [],
                        n = 0,
                        r = 0;
                    if (O = !b.detectDuplicates, C = !b.sortStable && t.slice(0), t.sort(z), O) {
                        for (; e = t[r++];) e === t[r] && (n = i.push(r));
                        for (; n--;) t.splice(i[n], 1)
                    }
                    return C = null, t
                }, S = e.getText = function(t) {
                    var e, i = "",
                        n = 0,
                        r = t.nodeType;
                    if (r) {
                        if (1 === r || 9 === r || 11 === r) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling) i += S(t)
                        } else if (3 === r || 4 === r) return t.nodeValue
                    } else
                        for (; e = t[n++];) i += S(e);
                    return i
                }, w = e.selectors = {
                    cacheLength: 50,
                    createPseudo: n,
                    match: pt,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(t) {
                            return t[1] = t[1].replace(bt, wt), t[3] = (t[3] || t[4] || t[5] || "").replace(bt, wt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                        },
                        CHILD: function(t) {
                            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                        },
                        PSEUDO: function(t) {
                            var e, i = !t[6] && t[2];
                            return pt.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && ft.test(i) && (e = P(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(t) {
                            var e = t.replace(bt, wt).toLowerCase();
                            return "*" === t ? function() {
                                return !0
                            } : function(t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            }
                        },
                        CLASS: function(t) {
                            var e = V[t + " "];
                            return e || (e = new RegExp("(^|" + it + ")" + t + "(" + it + "|$)")) && V(t, function(t) {
                                return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(t, i, n) {
                            return function(r) {
                                var s = e.attr(r, t);
                                return null == s ? "!=" === i : i ? (s += "", "=" === i ? s === n : "!=" === i ? s !== n : "^=" === i ? n && 0 === s.indexOf(n) : "*=" === i ? n && s.indexOf(n) > -1 : "$=" === i ? n && s.slice(-n.length) === n : "~=" === i ? (" " + s.replace(at, " ") + " ").indexOf(n) > -1 : "|=" === i ? s === n || s.slice(0, n.length + 1) === n + "-" : !1) : !0
                            }
                        },
                        CHILD: function(t, e, i, n, r) {
                            var s = "nth" !== t.slice(0, 3),
                                o = "last" !== t.slice(-4),
                                a = "of-type" === e;
                            return 1 === n && 0 === r ? function(t) {
                                return !!t.parentNode
                            } : function(e, i, u) {
                                var l, h, c, f, d, p, m = s !== o ? "nextSibling" : "previousSibling",
                                    g = e.parentNode,
                                    v = a && e.nodeName.toLowerCase(),
                                    y = !u && !a;
                                if (g) {
                                    if (s) {
                                        for (; m;) {
                                            for (c = e; c = c[m];)
                                                if (a ? c.nodeName.toLowerCase() === v : 1 === c.nodeType) return !1;
                                            p = m = "only" === t && !p && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (p = [o ? g.firstChild : g.lastChild], o && y) {
                                        for (h = g[N] || (g[N] = {}), l = h[t] || [], d = l[0] === F && l[1], f = l[0] === F && l[2], c = d && g.childNodes[d]; c = ++d && c && c[m] || (f = d = 0) || p.pop();)
                                            if (1 === c.nodeType && ++f && c === e) {
                                                h[t] = [F, d, f];
                                                break
                                            }
                                    } else if (y && (l = (e[N] || (e[N] = {}))[t]) && l[0] === F) f = l[1];
                                    else
                                        for (;
                                            (c = ++d && c && c[m] || (f = d = 0) || p.pop()) && ((a ? c.nodeName.toLowerCase() !== v : 1 !== c.nodeType) || !++f || (y && ((c[N] || (c[N] = {}))[t] = [F, f]), c !== e)););
                                    return f -= r, f === n || f % n === 0 && f / n >= 0
                                }
                            }
                        },
                        PSEUDO: function(t, i) {
                            var r, s = w.pseudos[t] || w.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                            return s[N] ? s(i) : s.length > 1 ? (r = [t, t, "", i], w.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function(t, e) {
                                for (var n, r = s(t, i), o = r.length; o--;) n = tt(t, r[o]), t[n] = !(e[n] = r[o])
                            }) : function(t) {
                                return s(t, 0, r)
                            }) : s
                        }
                    },
                    pseudos: {
                        not: n(function(t) {
                            var e = [],
                                i = [],
                                r = A(t.replace(ut, "$1"));
                            return r[N] ? n(function(t, e, i, n) {
                                for (var s, o = r(t, null, n, []), a = t.length; a--;)(s = o[a]) && (t[a] = !(e[a] = s))
                            }) : function(t, n, s) {
                                return e[0] = t, r(e, null, s, i), e[0] = null, !i.pop()
                            }
                        }),
                        has: n(function(t) {
                            return function(i) {
                                return e(t, i).length > 0
                            }
                        }),
                        contains: n(function(t) {
                            return t = t.replace(bt, wt),
                                function(e) {
                                    return (e.textContent || e.innerText || S(e)).indexOf(t) > -1
                                }
                        }),
                        lang: n(function(t) {
                            return dt.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(bt, wt).toLowerCase(),
                                function(e) {
                                    var i;
                                    do
                                        if (i = G ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return i = i.toLowerCase(), i === t || 0 === i.indexOf(t + "-");
                                    while ((e = e.parentNode) && 1 === e.nodeType);
                                    return !1
                                }
                        }),
                        target: function(e) {
                            var i = t.location && t.location.hash;
                            return i && i.slice(1) === e.id
                        },
                        root: function(t) {
                            return t === k
                        },
                        focus: function(t) {
                            return t === I.activeElement && (!I.hasFocus || I.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                        },
                        enabled: function(t) {
                            return t.disabled === !1
                        },
                        disabled: function(t) {
                            return t.disabled === !0
                        },
                        checked: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && !!t.checked || "option" === e && !!t.selected
                        },
                        selected: function(t) {
                            return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                        },
                        empty: function(t) {
                            for (t = t.firstChild; t; t = t.nextSibling)
                                if (t.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(t) {
                            return !w.pseudos.empty(t)
                        },
                        header: function(t) {
                            return gt.test(t.nodeName)
                        },
                        input: function(t) {
                            return mt.test(t.nodeName)
                        },
                        button: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && "button" === t.type || "button" === e
                        },
                        text: function(t) {
                            var e;
                            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                        },
                        first: l(function() {
                            return [0]
                        }),
                        last: l(function(t, e) {
                            return [e - 1]
                        }),
                        eq: l(function(t, e, i) {
                            return [0 > i ? i + e : i]
                        }),
                        even: l(function(t, e) {
                            for (var i = 0; e > i; i += 2) t.push(i);
                            return t
                        }),
                        odd: l(function(t, e) {
                            for (var i = 1; e > i; i += 2) t.push(i);
                            return t
                        }),
                        lt: l(function(t, e, i) {
                            for (var n = 0 > i ? i + e : i; --n >= 0;) t.push(n);
                            return t
                        }),
                        gt: l(function(t, e, i) {
                            for (var n = 0 > i ? i + e : i; ++n < e;) t.push(n);
                            return t
                        })
                    }
                }, w.pseudos.nth = w.pseudos.eq;
                for (_ in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) w.pseudos[_] = a(_);
                for (_ in {
                        submit: !0,
                        reset: !0
                    }) w.pseudos[_] = u(_);
                return c.prototype = w.filters = w.pseudos, w.setFilters = new c, P = e.tokenize = function(t, i) {
                    var n, r, s, o, a, u, l, h = U[t + " "];
                    if (h) return i ? 0 : h.slice(0);
                    for (a = t, u = [], l = w.preFilter; a;) {
                        (!n || (r = lt.exec(a))) && (r && (a = a.slice(r[0].length) || a), u.push(s = [])), n = !1, (r = ht.exec(a)) && (n = r.shift(), s.push({
                            value: n,
                            type: r[0].replace(ut, " ")
                        }), a = a.slice(n.length));
                        for (o in w.filter) !(r = pt[o].exec(a)) || l[o] && !(r = l[o](r)) || (n = r.shift(), s.push({
                            value: n,
                            type: o,
                            matches: r
                        }), a = a.slice(n.length));
                        if (!n) break
                    }
                    return i ? a.length : a ? e.error(t) : U(t, u).slice(0)
                }, A = e.compile = function(t, e) {
                    var i, n = [],
                        r = [],
                        s = W[t + " "];
                    if (!s) {
                        for (e || (e = P(t)), i = e.length; i--;) s = y(e[i]), s[N] ? n.push(s) : r.push(s);
                        s = W(t, T(r, n)), s.selector = t
                    }
                    return s
                }, M = e.select = function(t, e, i, n) {
                    var r, s, o, a, u, l = "function" == typeof t && t,
                        c = !n && P(t = l.selector || t);
                    if (i = i || [], 1 === c.length) {
                        if (s = c[0] = c[0].slice(0), s.length > 2 && "ID" === (o = s[0]).type && b.getById && 9 === e.nodeType && G && w.relative[s[1].type]) {
                            if (e = (w.find.ID(o.matches[0].replace(bt, wt), e) || [])[0], !e) return i;
                            l && (e = e.parentNode), t = t.slice(s.shift().value.length)
                        }
                        for (r = pt.needsContext.test(t) ? 0 : s.length; r-- && (o = s[r], !w.relative[a = o.type]);)
                            if ((u = w.find[a]) && (n = u(o.matches[0].replace(bt, wt), Tt.test(s[0].type) && h(e.parentNode) || e))) {
                                if (s.splice(r, 1), t = n.length && f(s), !t) return Z.apply(i, n), i;
                                break
                            }
                    }
                    return (l || A(t, c))(n, e, !G, i, Tt.test(t) && h(e.parentNode) || e), i
                }, b.sortStable = N.split("").sort(z).join("") === N, b.detectDuplicates = !!O, D(), b.sortDetached = r(function(t) {
                    return 1 & t.compareDocumentPosition(I.createElement("div"))
                }), r(function(t) {
                    return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
                }) || s("type|href|height|width", function(t, e, i) {
                    return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
                }), b.attributes && r(function(t) {
                    return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
                }) || s("value", function(t, e, i) {
                    return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
                }), r(function(t) {
                    return null == t.getAttribute("disabled")
                }) || s(et, function(t, e, i) {
                    var n;
                    return i ? void 0 : t[e] === !0 ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
                }), e
            }(t);
            J.find = rt, J.expr = rt.selectors, J.expr[":"] = J.expr.pseudos, J.unique = rt.uniqueSort, J.text = rt.getText, J.isXMLDoc = rt.isXML, J.contains = rt.contains;
            var st = J.expr.match.needsContext,
                ot = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                at = /^.[^:#\[\.,]*$/;
            J.filter = function(t, e, i) {
                var n = e[0];
                return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? J.find.matchesSelector(n, t) ? [n] : [] : J.find.matches(t, J.grep(e, function(t) {
                    return 1 === t.nodeType
                }))
            }, J.fn.extend({
                find: function(t) {
                    var e, i = this.length,
                        n = [],
                        r = this;
                    if ("string" != typeof t) return this.pushStack(J(t).filter(function() {
                        for (e = 0; i > e; e++)
                            if (J.contains(r[e], this)) return !0
                    }));
                    for (e = 0; i > e; e++) J.find(t, r[e], n);
                    return n = this.pushStack(i > 1 ? J.unique(n) : n), n.selector = this.selector ? this.selector + " " + t : t, n
                },
                filter: function(t) {
                    return this.pushStack(n(this, t || [], !1))
                },
                not: function(t) {
                    return this.pushStack(n(this, t || [], !0))
                },
                is: function(t) {
                    return !!n(this, "string" == typeof t && st.test(t) ? J(t) : t || [], !1).length
                }
            });
            var ut, lt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                ht = J.fn.init = function(t, e) {
                    var i, n;
                    if (!t) return this;
                    if ("string" == typeof t) {
                        if (i = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : lt.exec(t), !i || !i[1] && e) return !e || e.jquery ? (e || ut).find(t) : this.constructor(e).find(t);
                        if (i[1]) {
                            if (e = e instanceof J ? e[0] : e, J.merge(this, J.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : Q, !0)), ot.test(i[1]) && J.isPlainObject(e))
                                for (i in e) J.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                            return this
                        }
                        return n = Q.getElementById(i[2]), n && n.parentNode && (this.length = 1, this[0] = n), this.context = Q, this.selector = t, this
                    }
                    return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : J.isFunction(t) ? "undefined" != typeof ut.ready ? ut.ready(t) : t(J) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), J.makeArray(t, this))
                };
            ht.prototype = J.fn, ut = J(Q);
            var ct = /^(?:parents|prev(?:Until|All))/,
                ft = {
                    children: !0,
                    contents: !0,
                    next: !0,
                    prev: !0
                };
            J.extend({
                dir: function(t, e, i) {
                    for (var n = [], r = void 0 !== i;
                        (t = t[e]) && 9 !== t.nodeType;)
                        if (1 === t.nodeType) {
                            if (r && J(t).is(i)) break;
                            n.push(t)
                        }
                    return n
                },
                sibling: function(t, e) {
                    for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
                    return i
                }
            }), J.fn.extend({
                has: function(t) {
                    var e = J(t, this),
                        i = e.length;
                    return this.filter(function() {
                        for (var t = 0; i > t; t++)
                            if (J.contains(this, e[t])) return !0
                    })
                },
                closest: function(t, e) {
                    for (var i, n = 0, r = this.length, s = [], o = st.test(t) || "string" != typeof t ? J(t, e || this.context) : 0; r > n; n++)
                        for (i = this[n]; i && i !== e; i = i.parentNode)
                            if (i.nodeType < 11 && (o ? o.index(i) > -1 : 1 === i.nodeType && J.find.matchesSelector(i, t))) {
                                s.push(i);
                                break
                            }
                    return this.pushStack(s.length > 1 ? J.unique(s) : s)
                },
                index: function(t) {
                    return t ? "string" == typeof t ? z.call(J(t), this[0]) : z.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(t, e) {
                    return this.pushStack(J.unique(J.merge(this.get(), J(t, e))))
                },
                addBack: function(t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                }
            }), J.each({
                parent: function(t) {
                    var e = t.parentNode;
                    return e && 11 !== e.nodeType ? e : null
                },
                parents: function(t) {
                    return J.dir(t, "parentNode")
                },
                parentsUntil: function(t, e, i) {
                    return J.dir(t, "parentNode", i)
                },
                next: function(t) {
                    return r(t, "nextSibling")
                },
                prev: function(t) {
                    return r(t, "previousSibling")
                },
                nextAll: function(t) {
                    return J.dir(t, "nextSibling")
                },
                prevAll: function(t) {
                    return J.dir(t, "previousSibling")
                },
                nextUntil: function(t, e, i) {
                    return J.dir(t, "nextSibling", i)
                },
                prevUntil: function(t, e, i) {
                    return J.dir(t, "previousSibling", i)
                },
                siblings: function(t) {
                    return J.sibling((t.parentNode || {}).firstChild, t)
                },
                children: function(t) {
                    return J.sibling(t.firstChild)
                },
                contents: function(t) {
                    return t.contentDocument || J.merge([], t.childNodes)
                }
            }, function(t, e) {
                J.fn[t] = function(i, n) {
                    var r = J.map(this, e, i);
                    return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (r = J.filter(n, r)), this.length > 1 && (ft[t] || J.unique(r), ct.test(t) && r.reverse()), this.pushStack(r)
                }
            });
            var dt = /\S+/g,
                pt = {};
            J.Callbacks = function(t) {
                t = "string" == typeof t ? pt[t] || s(t) : J.extend({}, t);
                var e, i, n, r, o, a, u = [],
                    l = !t.once && [],
                    h = function(s) {
                        for (e = t.memory && s, i = !0, a = r || 0, r = 0, o = u.length, n = !0; u && o > a; a++)
                            if (u[a].apply(s[0], s[1]) === !1 && t.stopOnFalse) {
                                e = !1;
                                break
                            }
                        n = !1, u && (l ? l.length && h(l.shift()) : e ? u = [] : c.disable())
                    },
                    c = {
                        add: function() {
                            if (u) {
                                var i = u.length;
                                ! function s(e) {
                                    J.each(e, function(e, i) {
                                        var n = J.type(i);
                                        "function" === n ? t.unique && c.has(i) || u.push(i) : i && i.length && "string" !== n && s(i)
                                    })
                                }(arguments), n ? o = u.length : e && (r = i, h(e))
                            }
                            return this
                        },
                        remove: function() {
                            return u && J.each(arguments, function(t, e) {
                                for (var i;
                                    (i = J.inArray(e, u, i)) > -1;) u.splice(i, 1), n && (o >= i && o--, a >= i && a--)
                            }), this
                        },
                        has: function(t) {
                            return t ? J.inArray(t, u) > -1 : !(!u || !u.length)
                        },
                        empty: function() {
                            return u = [], o = 0, this
                        },
                        disable: function() {
                            return u = l = e = void 0, this
                        },
                        disabled: function() {
                            return !u
                        },
                        lock: function() {
                            return l = void 0, e || c.disable(), this
                        },
                        locked: function() {
                            return !l
                        },
                        fireWith: function(t, e) {
                            return !u || i && !l || (e = e || [], e = [t, e.slice ? e.slice() : e], n ? l.push(e) : h(e)), this
                        },
                        fire: function() {
                            return c.fireWith(this, arguments), this
                        },
                        fired: function() {
                            return !!i
                        }
                    };
                return c
            }, J.extend({
                Deferred: function(t) {
                    var e = [
                            ["resolve", "done", J.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", J.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", J.Callbacks("memory")]
                        ],
                        i = "pending",
                        n = {
                            state: function() {
                                return i
                            },
                            always: function() {
                                return r.done(arguments).fail(arguments), this
                            },
                            then: function() {
                                var t = arguments;
                                return J.Deferred(function(i) {
                                    J.each(e, function(e, s) {
                                        var o = J.isFunction(t[e]) && t[e];
                                        r[s[1]](function() {
                                            var t = o && o.apply(this, arguments);
                                            t && J.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[s[0] + "With"](this === n ? i.promise() : this, o ? [t] : arguments)
                                        })
                                    }), t = null
                                }).promise()
                            },
                            promise: function(t) {
                                return null != t ? J.extend(t, n) : n
                            }
                        },
                        r = {};
                    return n.pipe = n.then, J.each(e, function(t, s) {
                        var o = s[2],
                            a = s[3];
                        n[s[1]] = o.add, a && o.add(function() {
                            i = a
                        }, e[1 ^ t][2].disable, e[2][2].lock), r[s[0]] = function() {
                            return r[s[0] + "With"](this === r ? n : this, arguments), this
                        }, r[s[0] + "With"] = o.fireWith
                    }), n.promise(r), t && t.call(r, r), r
                },
                when: function(t) {
                    var e, i, n, r = 0,
                        s = V.call(arguments),
                        o = s.length,
                        a = 1 !== o || t && J.isFunction(t.promise) ? o : 0,
                        u = 1 === a ? t : J.Deferred(),
                        l = function(t, i, n) {
                            return function(r) {
                                i[t] = this, n[t] = arguments.length > 1 ? V.call(arguments) : r, n === e ? u.notifyWith(i, n) : --a || u.resolveWith(i, n)
                            }
                        };
                    if (o > 1)
                        for (e = new Array(o), i = new Array(o), n = new Array(o); o > r; r++) s[r] && J.isFunction(s[r].promise) ? s[r].promise().done(l(r, n, s)).fail(u.reject).progress(l(r, i, e)) : --a;
                    return a || u.resolveWith(n, s), u.promise()
                }
            });
            var mt;
            J.fn.ready = function(t) {
                return J.ready.promise().done(t), this
            }, J.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function(t) {
                    t ? J.readyWait++ : J.ready(!0)
                },
                ready: function(t) {
                    (t === !0 ? --J.readyWait : J.isReady) || (J.isReady = !0, t !== !0 && --J.readyWait > 0 || (mt.resolveWith(Q, [J]), J.fn.triggerHandler && (J(Q).triggerHandler("ready"), J(Q).off("ready"))))
                }
            }), J.ready.promise = function(e) {
                return mt || (mt = J.Deferred(), "complete" === Q.readyState ? setTimeout(J.ready) : (Q.addEventListener("DOMContentLoaded", o, !1), t.addEventListener("load", o, !1))), mt.promise(e)
            }, J.ready.promise();
            var gt = J.access = function(t, e, i, n, r, s, o) {
                var a = 0,
                    u = t.length,
                    l = null == i;
                if ("object" === J.type(i)) {
                    r = !0;
                    for (a in i) J.access(t, e, a, i[a], !0, s, o)
                } else if (void 0 !== n && (r = !0, J.isFunction(n) || (o = !0), l && (o ? (e.call(t, n), e = null) : (l = e, e = function(t, e, i) {
                        return l.call(J(t), i)
                    })), e))
                    for (; u > a; a++) e(t[a], i, o ? n : n.call(t[a], a, e(t[a], i)));
                return r ? t : l ? e.call(t) : u ? e(t[0], i) : s
            };
            J.acceptData = function(t) {
                return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
            }, a.uid = 1, a.accepts = J.acceptData, a.prototype = {
                key: function(t) {
                    if (!a.accepts(t)) return 0;
                    var e = {},
                        i = t[this.expando];
                    if (!i) {
                        i = a.uid++;
                        try {
                            e[this.expando] = {
                                value: i
                            }, Object.defineProperties(t, e)
                        } catch (n) {
                            e[this.expando] = i, J.extend(t, e)
                        }
                    }
                    return this.cache[i] || (this.cache[i] = {}), i
                },
                set: function(t, e, i) {
                    var n, r = this.key(t),
                        s = this.cache[r];
                    if ("string" == typeof e) s[e] = i;
                    else if (J.isEmptyObject(s)) J.extend(this.cache[r], e);
                    else
                        for (n in e) s[n] = e[n];
                    return s
                },
                get: function(t, e) {
                    var i = this.cache[this.key(t)];
                    return void 0 === e ? i : i[e]
                },
                access: function(t, e, i) {
                    var n;
                    return void 0 === e || e && "string" == typeof e && void 0 === i ? (n = this.get(t, e), void 0 !== n ? n : this.get(t, J.camelCase(e))) : (this.set(t, e, i), void 0 !== i ? i : e)
                },
                remove: function(t, e) {
                    var i, n, r, s = this.key(t),
                        o = this.cache[s];
                    if (void 0 === e) this.cache[s] = {};
                    else {
                        J.isArray(e) ? n = e.concat(e.map(J.camelCase)) : (r = J.camelCase(e), e in o ? n = [e, r] : (n = r, n = n in o ? [n] : n.match(dt) || [])), i = n.length;
                        for (; i--;) delete o[n[i]]
                    }
                },
                hasData: function(t) {
                    return !J.isEmptyObject(this.cache[t[this.expando]] || {})
                },
                discard: function(t) {
                    t[this.expando] && delete this.cache[t[this.expando]]
                }
            };
            var vt = new a,
                yt = new a,
                Tt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                _t = /([A-Z])/g;
            J.extend({
                hasData: function(t) {
                    return yt.hasData(t) || vt.hasData(t)
                },
                data: function(t, e, i) {
                    return yt.access(t, e, i)
                },
                removeData: function(t, e) {
                    yt.remove(t, e)
                },
                _data: function(t, e, i) {
                    return vt.access(t, e, i)
                },
                _removeData: function(t, e) {
                    vt.remove(t, e)
                }
            }), J.fn.extend({
                data: function(t, e) {
                    var i, n, r, s = this[0],
                        o = s && s.attributes;
                    if (void 0 === t) {
                        if (this.length && (r = yt.get(s), 1 === s.nodeType && !vt.get(s, "hasDataAttrs"))) {
                            for (i = o.length; i--;) o[i] && (n = o[i].name, 0 === n.indexOf("data-") && (n = J.camelCase(n.slice(5)), u(s, n, r[n])));
                            vt.set(s, "hasDataAttrs", !0)
                        }
                        return r
                    }
                    return "object" == typeof t ? this.each(function() {
                        yt.set(this, t)
                    }) : gt(this, function(e) {
                        var i, n = J.camelCase(t);
                        if (s && void 0 === e) {
                            if (i = yt.get(s, t), void 0 !== i) return i;
                            if (i = yt.get(s, n), void 0 !== i) return i;
                            if (i = u(s, n, void 0), void 0 !== i) return i
                        } else this.each(function() {
                            var i = yt.get(this, n);
                            yt.set(this, n, e), -1 !== t.indexOf("-") && void 0 !== i && yt.set(this, t, e)
                        })
                    }, null, e, arguments.length > 1, null, !0)
                },
                removeData: function(t) {
                    return this.each(function() {
                        yt.remove(this, t)
                    })
                }
            }), J.extend({
                queue: function(t, e, i) {
                    var n;
                    return t ? (e = (e || "fx") + "queue", n = vt.get(t, e), i && (!n || J.isArray(i) ? n = vt.access(t, e, J.makeArray(i)) : n.push(i)), n || []) : void 0
                },
                dequeue: function(t, e) {
                    e = e || "fx";
                    var i = J.queue(t, e),
                        n = i.length,
                        r = i.shift(),
                        s = J._queueHooks(t, e),
                        o = function() {
                            J.dequeue(t, e)
                        };
                    "inprogress" === r && (r = i.shift(), n--), r && ("fx" === e && i.unshift("inprogress"), delete s.stop, r.call(t, o, s)), !n && s && s.empty.fire()
                },
                _queueHooks: function(t, e) {
                    var i = e + "queueHooks";
                    return vt.get(t, i) || vt.access(t, i, {
                        empty: J.Callbacks("once memory").add(function() {
                            vt.remove(t, [e + "queue", i])
                        })
                    })
                }
            }), J.fn.extend({
                queue: function(t, e) {
                    var i = 2;
                    return "string" != typeof t && (e = t, t = "fx", i--), arguments.length < i ? J.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                        var i = J.queue(this, t, e);
                        J._queueHooks(this, t), "fx" === t && "inprogress" !== i[0] && J.dequeue(this, t)
                    })
                },
                dequeue: function(t) {
                    return this.each(function() {
                        J.dequeue(this, t)
                    })
                },
                clearQueue: function(t) {
                    return this.queue(t || "fx", [])
                },
                promise: function(t, e) {
                    var i, n = 1,
                        r = J.Deferred(),
                        s = this,
                        o = this.length,
                        a = function() {
                            --n || r.resolveWith(s, [s])
                        };
                    for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; o--;) i = vt.get(s[o], t + "queueHooks"), i && i.empty && (n++, i.empty.add(a));
                    return a(), r.promise(e)
                }
            });
            var bt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                wt = ["Top", "Right", "Bottom", "Left"],
                St = function(t, e) {
                    return t = e || t, "none" === J.css(t, "display") || !J.contains(t.ownerDocument, t)
                },
                xt = /^(?:checkbox|radio)$/i;
            ! function() {
                var t = Q.createDocumentFragment(),
                    e = t.appendChild(Q.createElement("div")),
                    i = Q.createElement("input");
                i.setAttribute("type", "radio"), i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), e.appendChild(i), K.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", K.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
            }();
            var Pt = "undefined";
            K.focusinBubbles = "onfocusin" in t;
            var At = /^key/,
                Mt = /^(?:mouse|pointer|contextmenu)|click/,
                Et = /^(?:focusinfocus|focusoutblur)$/,
                Ct = /^([^.]*)(?:\.(.+)|)$/;
            J.event = {
                global: {},
                add: function(t, e, i, n, r) {
                    var s, o, a, u, l, h, c, f, d, p, m, g = vt.get(t);
                    if (g)
                        for (i.handler && (s = i, i = s.handler, r = s.selector), i.guid || (i.guid = J.guid++), (u = g.events) || (u = g.events = {}), (o = g.handle) || (o = g.handle = function(e) {
                                return typeof J !== Pt && J.event.triggered !== e.type ? J.event.dispatch.apply(t, arguments) : void 0
                            }), e = (e || "").match(dt) || [""], l = e.length; l--;) a = Ct.exec(e[l]) || [], d = m = a[1], p = (a[2] || "").split(".").sort(), d && (c = J.event.special[d] || {}, d = (r ? c.delegateType : c.bindType) || d, c = J.event.special[d] || {}, h = J.extend({
                            type: d,
                            origType: m,
                            data: n,
                            handler: i,
                            guid: i.guid,
                            selector: r,
                            needsContext: r && J.expr.match.needsContext.test(r),
                            namespace: p.join(".")
                        }, s), (f = u[d]) || (f = u[d] = [], f.delegateCount = 0, c.setup && c.setup.call(t, n, p, o) !== !1 || t.addEventListener && t.addEventListener(d, o, !1)), c.add && (c.add.call(t, h), h.handler.guid || (h.handler.guid = i.guid)), r ? f.splice(f.delegateCount++, 0, h) : f.push(h), J.event.global[d] = !0)
                },
                remove: function(t, e, i, n, r) {
                    var s, o, a, u, l, h, c, f, d, p, m, g = vt.hasData(t) && vt.get(t);
                    if (g && (u = g.events)) {
                        for (e = (e || "").match(dt) || [""], l = e.length; l--;)
                            if (a = Ct.exec(e[l]) || [], d = m = a[1], p = (a[2] || "").split(".").sort(), d) {
                                for (c = J.event.special[d] || {}, d = (n ? c.delegateType : c.bindType) || d, f = u[d] || [], a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = f.length; s--;) h = f[s], !r && m !== h.origType || i && i.guid !== h.guid || a && !a.test(h.namespace) || n && n !== h.selector && ("**" !== n || !h.selector) || (f.splice(s, 1), h.selector && f.delegateCount--, c.remove && c.remove.call(t, h));
                                o && !f.length && (c.teardown && c.teardown.call(t, p, g.handle) !== !1 || J.removeEvent(t, d, g.handle), delete u[d])
                            } else
                                for (d in u) J.event.remove(t, d + e[l], i, n, !0);
                        J.isEmptyObject(u) && (delete g.handle, vt.remove(t, "events"))
                    }
                },
                trigger: function(e, i, n, r) {
                    var s, o, a, u, l, h, c, f = [n || Q],
                        d = $.call(e, "type") ? e.type : e,
                        p = $.call(e, "namespace") ? e.namespace.split(".") : [];
                    if (o = a = n = n || Q, 3 !== n.nodeType && 8 !== n.nodeType && !Et.test(d + J.event.triggered) && (d.indexOf(".") >= 0 && (p = d.split("."), d = p.shift(), p.sort()), l = d.indexOf(":") < 0 && "on" + d, e = e[J.expando] ? e : new J.Event(d, "object" == typeof e && e), e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), i = null == i ? [e] : J.makeArray(i, [e]), c = J.event.special[d] || {}, r || !c.trigger || c.trigger.apply(n, i) !== !1)) {
                        if (!r && !c.noBubble && !J.isWindow(n)) {
                            for (u = c.delegateType || d, Et.test(u + d) || (o = o.parentNode); o; o = o.parentNode) f.push(o), a = o;
                            a === (n.ownerDocument || Q) && f.push(a.defaultView || a.parentWindow || t)
                        }
                        for (s = 0;
                            (o = f[s++]) && !e.isPropagationStopped();) e.type = s > 1 ? u : c.bindType || d, h = (vt.get(o, "events") || {})[e.type] && vt.get(o, "handle"), h && h.apply(o, i), h = l && o[l], h && h.apply && J.acceptData(o) && (e.result = h.apply(o, i), e.result === !1 && e.preventDefault());
                        return e.type = d, r || e.isDefaultPrevented() || c._default && c._default.apply(f.pop(), i) !== !1 || !J.acceptData(n) || l && J.isFunction(n[d]) && !J.isWindow(n) && (a = n[l], a && (n[l] = null), J.event.triggered = d, n[d](), J.event.triggered = void 0, a && (n[l] = a)), e.result
                    }
                },
                dispatch: function(t) {
                    t = J.event.fix(t);
                    var e, i, n, r, s, o = [],
                        a = V.call(arguments),
                        u = (vt.get(this, "events") || {})[t.type] || [],
                        l = J.event.special[t.type] || {};
                    if (a[0] = t, t.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, t) !== !1) {
                        for (o = J.event.handlers.call(this, t, u), e = 0;
                            (r = o[e++]) && !t.isPropagationStopped();)
                            for (t.currentTarget = r.elem, i = 0;
                                (s = r.handlers[i++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(s.namespace)) && (t.handleObj = s, t.data = s.data, n = ((J.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, a), void 0 !== n && (t.result = n) === !1 && (t.preventDefault(), t.stopPropagation()));
                        return l.postDispatch && l.postDispatch.call(this, t), t.result
                    }
                },
                handlers: function(t, e) {
                    var i, n, r, s, o = [],
                        a = e.delegateCount,
                        u = t.target;
                    if (a && u.nodeType && (!t.button || "click" !== t.type))
                        for (; u !== this; u = u.parentNode || this)
                            if (u.disabled !== !0 || "click" !== t.type) {
                                for (n = [], i = 0; a > i; i++) s = e[i], r = s.selector + " ", void 0 === n[r] && (n[r] = s.needsContext ? J(r, this).index(u) >= 0 : J.find(r, this, null, [u]).length), n[r] && n.push(s);
                                n.length && o.push({
                                    elem: u,
                                    handlers: n
                                })
                            }
                    return a < e.length && o.push({
                        elem: this,
                        handlers: e.slice(a)
                    }), o
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(t, e) {
                        return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(t, e) {
                        var i, n, r, s = e.button;
                        return null == t.pageX && null != e.clientX && (i = t.target.ownerDocument || Q, n = i.documentElement, r = i.body, t.pageX = e.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n && n.clientLeft || r && r.clientLeft || 0), t.pageY = e.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n && n.clientTop || r && r.clientTop || 0)), t.which || void 0 === s || (t.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), t
                    }
                },
                fix: function(t) {
                    if (t[J.expando]) return t;
                    var e, i, n, r = t.type,
                        s = t,
                        o = this.fixHooks[r];
                    for (o || (this.fixHooks[r] = o = Mt.test(r) ? this.mouseHooks : At.test(r) ? this.keyHooks : {}), n = o.props ? this.props.concat(o.props) : this.props, t = new J.Event(s), e = n.length; e--;) i = n[e], t[i] = s[i];
                    return t.target || (t.target = Q), 3 === t.target.nodeType && (t.target = t.target.parentNode), o.filter ? o.filter(t, s) : t
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            return this !== c() && this.focus ? (this.focus(), !1) : void 0
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            return this === c() && this.blur ? (this.blur(), !1) : void 0
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            return "checkbox" === this.type && this.click && J.nodeName(this, "input") ? (this.click(), !1) : void 0
                        },
                        _default: function(t) {
                            return J.nodeName(t.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(t) {
                            void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                        }
                    }
                },
                simulate: function(t, e, i, n) {
                    var r = J.extend(new J.Event, i, {
                        type: t,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    n ? J.event.trigger(r, null, e) : J.event.dispatch.call(e, r), r.isDefaultPrevented() && i.preventDefault()
                }
            }, J.removeEvent = function(t, e, i) {
                t.removeEventListener && t.removeEventListener(e, i, !1)
            }, J.Event = function(t, e) {
                return this instanceof J.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? l : h) : this.type = t, e && J.extend(this, e), this.timeStamp = t && t.timeStamp || J.now(), void(this[J.expando] = !0)) : new J.Event(t, e)
            }, J.Event.prototype = {
                isDefaultPrevented: h,
                isPropagationStopped: h,
                isImmediatePropagationStopped: h,
                preventDefault: function() {
                    var t = this.originalEvent;
                    this.isDefaultPrevented = l, t && t.preventDefault && t.preventDefault()
                },
                stopPropagation: function() {
                    var t = this.originalEvent;
                    this.isPropagationStopped = l, t && t.stopPropagation && t.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var t = this.originalEvent;
                    this.isImmediatePropagationStopped = l, t && t.stopImmediatePropagation && t.stopImmediatePropagation(), this.stopPropagation()
                }
            }, J.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(t, e) {
                J.event.special[t] = {
                    delegateType: e,
                    bindType: e,
                    handle: function(t) {
                        var i, n = this,
                            r = t.relatedTarget,
                            s = t.handleObj;
                        return (!r || r !== n && !J.contains(n, r)) && (t.type = s.origType, i = s.handler.apply(this, arguments), t.type = e), i
                    }
                }
            }), K.focusinBubbles || J.each({
                focus: "focusin",
                blur: "focusout"
            }, function(t, e) {
                var i = function(t) {
                    J.event.simulate(e, t.target, J.event.fix(t), !0)
                };
                J.event.special[e] = {
                    setup: function() {
                        var n = this.ownerDocument || this,
                            r = vt.access(n, e);
                        r || n.addEventListener(t, i, !0), vt.access(n, e, (r || 0) + 1)
                    },
                    teardown: function() {
                        var n = this.ownerDocument || this,
                            r = vt.access(n, e) - 1;
                        r ? vt.access(n, e, r) : (n.removeEventListener(t, i, !0), vt.remove(n, e))
                    }
                }
            }), J.fn.extend({
                on: function(t, e, i, n, r) {
                    var s, o;
                    if ("object" == typeof t) {
                        "string" != typeof e && (i = i || e, e = void 0);
                        for (o in t) this.on(o, e, i, t[o], r);
                        return this
                    }
                    if (null == i && null == n ? (n = e, i = e = void 0) : null == n && ("string" == typeof e ? (n = i, i = void 0) : (n = i, i = e, e = void 0)), n === !1) n = h;
                    else if (!n) return this;
                    return 1 === r && (s = n, n = function(t) {
                        return J().off(t), s.apply(this, arguments)
                    }, n.guid = s.guid || (s.guid = J.guid++)), this.each(function() {
                        J.event.add(this, t, n, i, e)
                    })
                },
                one: function(t, e, i, n) {
                    return this.on(t, e, i, n, 1)
                },
                off: function(t, e, i) {
                    var n, r;
                    if (t && t.preventDefault && t.handleObj) return n = t.handleObj, J(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
                    if ("object" == typeof t) {
                        for (r in t) this.off(r, e, t[r]);
                        return this
                    }
                    return (e === !1 || "function" == typeof e) && (i = e, e = void 0), i === !1 && (i = h), this.each(function() {
                        J.event.remove(this, t, i, e)
                    })
                },
                trigger: function(t, e) {
                    return this.each(function() {
                        J.event.trigger(t, e, this)
                    })
                },
                triggerHandler: function(t, e) {
                    var i = this[0];
                    return i ? J.event.trigger(t, e, i, !0) : void 0
                }
            });
            var Ot = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                Dt = /<([\w:]+)/,
                It = /<|&#?\w+;/,
                kt = /<(?:script|style|link)/i,
                Gt = /checked\s*(?:[^=]|=\s*.checked.)/i,
                Rt = /^$|\/(?:java|ecma)script/i,
                Bt = /^true\/(.*)/,
                Ht = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                Lt = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };
            Lt.optgroup = Lt.option, Lt.tbody = Lt.tfoot = Lt.colgroup = Lt.caption = Lt.thead, Lt.th = Lt.td, J.extend({
                clone: function(t, e, i) {
                    var n, r, s, o, a = t.cloneNode(!0),
                        u = J.contains(t.ownerDocument, t);
                    if (!(K.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || J.isXMLDoc(t)))
                        for (o = v(a), s = v(t), n = 0, r = s.length; r > n; n++) y(s[n], o[n]);
                    if (e)
                        if (i)
                            for (s = s || v(t), o = o || v(a), n = 0, r = s.length; r > n; n++) g(s[n], o[n]);
                        else g(t, a);
                    return o = v(a, "script"), o.length > 0 && m(o, !u && v(t, "script")), a
                },
                buildFragment: function(t, e, i, n) {
                    for (var r, s, o, a, u, l, h = e.createDocumentFragment(), c = [], f = 0, d = t.length; d > f; f++)
                        if (r = t[f], r || 0 === r)
                            if ("object" === J.type(r)) J.merge(c, r.nodeType ? [r] : r);
                            else if (It.test(r)) {
                        for (s = s || h.appendChild(e.createElement("div")), o = (Dt.exec(r) || ["", ""])[1].toLowerCase(), a = Lt[o] || Lt._default, s.innerHTML = a[1] + r.replace(Ot, "<$1></$2>") + a[2], l = a[0]; l--;) s = s.lastChild;
                        J.merge(c, s.childNodes), s = h.firstChild, s.textContent = ""
                    } else c.push(e.createTextNode(r));
                    for (h.textContent = "", f = 0; r = c[f++];)
                        if ((!n || -1 === J.inArray(r, n)) && (u = J.contains(r.ownerDocument, r), s = v(h.appendChild(r), "script"), u && m(s), i))
                            for (l = 0; r = s[l++];) Rt.test(r.type || "") && i.push(r);
                    return h
                },
                cleanData: function(t) {
                    for (var e, i, n, r, s = J.event.special, o = 0; void 0 !== (i = t[o]); o++) {
                        if (J.acceptData(i) && (r = i[vt.expando], r && (e = vt.cache[r]))) {
                            if (e.events)
                                for (n in e.events) s[n] ? J.event.remove(i, n) : J.removeEvent(i, n, e.handle);
                            vt.cache[r] && delete vt.cache[r]
                        }
                        delete yt.cache[i[yt.expando]]
                    }
                }
            }), J.fn.extend({
                text: function(t) {
                    return gt(this, function(t) {
                        return void 0 === t ? J.text(this) : this.empty().each(function() {
                            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = t)
                        })
                    }, null, t, arguments.length)
                },
                append: function() {
                    return this.domManip(arguments, function(t) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var e = f(this, t);
                            e.appendChild(t)
                        }
                    })
                },
                prepend: function() {
                    return this.domManip(arguments, function(t) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var e = f(this, t);
                            e.insertBefore(t, e.firstChild);
                        }
                    })
                },
                before: function() {
                    return this.domManip(arguments, function(t) {
                        this.parentNode && this.parentNode.insertBefore(t, this)
                    })
                },
                after: function() {
                    return this.domManip(arguments, function(t) {
                        this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                    })
                },
                remove: function(t, e) {
                    for (var i, n = t ? J.filter(t, this) : this, r = 0; null != (i = n[r]); r++) e || 1 !== i.nodeType || J.cleanData(v(i)), i.parentNode && (e && J.contains(i.ownerDocument, i) && m(v(i, "script")), i.parentNode.removeChild(i));
                    return this
                },
                empty: function() {
                    for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (J.cleanData(v(t, !1)), t.textContent = "");
                    return this
                },
                clone: function(t, e) {
                    return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
                        return J.clone(this, t, e)
                    })
                },
                html: function(t) {
                    return gt(this, function(t) {
                        var e = this[0] || {},
                            i = 0,
                            n = this.length;
                        if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                        if ("string" == typeof t && !kt.test(t) && !Lt[(Dt.exec(t) || ["", ""])[1].toLowerCase()]) {
                            t = t.replace(Ot, "<$1></$2>");
                            try {
                                for (; n > i; i++) e = this[i] || {}, 1 === e.nodeType && (J.cleanData(v(e, !1)), e.innerHTML = t);
                                e = 0
                            } catch (r) {}
                        }
                        e && this.empty().append(t)
                    }, null, t, arguments.length)
                },
                replaceWith: function() {
                    var t = arguments[0];
                    return this.domManip(arguments, function(e) {
                        t = this.parentNode, J.cleanData(v(this)), t && t.replaceChild(e, this)
                    }), t && (t.length || t.nodeType) ? this : this.remove()
                },
                detach: function(t) {
                    return this.remove(t, !0)
                },
                domManip: function(t, e) {
                    t = U.apply([], t);
                    var i, n, r, s, o, a, u = 0,
                        l = this.length,
                        h = this,
                        c = l - 1,
                        f = t[0],
                        m = J.isFunction(f);
                    if (m || l > 1 && "string" == typeof f && !K.checkClone && Gt.test(f)) return this.each(function(i) {
                        var n = h.eq(i);
                        m && (t[0] = f.call(this, i, n.html())), n.domManip(t, e)
                    });
                    if (l && (i = J.buildFragment(t, this[0].ownerDocument, !1, this), n = i.firstChild, 1 === i.childNodes.length && (i = n), n)) {
                        for (r = J.map(v(i, "script"), d), s = r.length; l > u; u++) o = i, u !== c && (o = J.clone(o, !0, !0), s && J.merge(r, v(o, "script"))), e.call(this[u], o, u);
                        if (s)
                            for (a = r[r.length - 1].ownerDocument, J.map(r, p), u = 0; s > u; u++) o = r[u], Rt.test(o.type || "") && !vt.access(o, "globalEval") && J.contains(a, o) && (o.src ? J._evalUrl && J._evalUrl(o.src) : J.globalEval(o.textContent.replace(Ht, "")))
                    }
                    return this
                }
            }), J.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(t, e) {
                J.fn[t] = function(t) {
                    for (var i, n = [], r = J(t), s = r.length - 1, o = 0; s >= o; o++) i = o === s ? this : this.clone(!0), J(r[o])[e](i), W.apply(n, i.get());
                    return this.pushStack(n)
                }
            });
            var Nt, jt = {},
                Ft = /^margin/,
                Xt = new RegExp("^(" + bt + ")(?!px)[a-z%]+$", "i"),
                Vt = function(e) {
                    return e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e, null) : t.getComputedStyle(e, null)
                };
            ! function() {
                function e() {
                    o.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", o.innerHTML = "", r.appendChild(s);
                    var e = t.getComputedStyle(o, null);
                    i = "1%" !== e.top, n = "4px" === e.width, r.removeChild(s)
                }
                var i, n, r = Q.documentElement,
                    s = Q.createElement("div"),
                    o = Q.createElement("div");
                o.style && (o.style.backgroundClip = "content-box", o.cloneNode(!0).style.backgroundClip = "", K.clearCloneStyle = "content-box" === o.style.backgroundClip, s.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", s.appendChild(o), t.getComputedStyle && J.extend(K, {
                    pixelPosition: function() {
                        return e(), i
                    },
                    boxSizingReliable: function() {
                        return null == n && e(), n
                    },
                    reliableMarginRight: function() {
                        var e, i = o.appendChild(Q.createElement("div"));
                        return i.style.cssText = o.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", o.style.width = "1px", r.appendChild(s), e = !parseFloat(t.getComputedStyle(i, null).marginRight), r.removeChild(s), o.removeChild(i), e
                    }
                }))
            }(), J.swap = function(t, e, i, n) {
                var r, s, o = {};
                for (s in e) o[s] = t.style[s], t.style[s] = e[s];
                r = i.apply(t, n || []);
                for (s in e) t.style[s] = o[s];
                return r
            };
            var Ut = /^(none|table(?!-c[ea]).+)/,
                Wt = new RegExp("^(" + bt + ")(.*)$", "i"),
                zt = new RegExp("^([+-])=(" + bt + ")", "i"),
                qt = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                Yt = {
                    letterSpacing: "0",
                    fontWeight: "400"
                },
                $t = ["Webkit", "O", "Moz", "ms"];
            J.extend({
                cssHooks: {
                    opacity: {
                        get: function(t, e) {
                            if (e) {
                                var i = b(t, "opacity");
                                return "" === i ? "1" : i
                            }
                        }
                    }
                },
                cssNumber: {
                    columnCount: !0,
                    fillOpacity: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": "cssFloat"
                },
                style: function(t, e, i, n) {
                    if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                        var r, s, o, a = J.camelCase(e),
                            u = t.style;
                        return e = J.cssProps[a] || (J.cssProps[a] = S(u, a)), o = J.cssHooks[e] || J.cssHooks[a], void 0 === i ? o && "get" in o && void 0 !== (r = o.get(t, !1, n)) ? r : u[e] : (s = typeof i, "string" === s && (r = zt.exec(i)) && (i = (r[1] + 1) * r[2] + parseFloat(J.css(t, e)), s = "number"), null != i && i === i && ("number" !== s || J.cssNumber[a] || (i += "px"), K.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (u[e] = "inherit"), o && "set" in o && void 0 === (i = o.set(t, i, n)) || (u[e] = i)), void 0)
                    }
                },
                css: function(t, e, i, n) {
                    var r, s, o, a = J.camelCase(e);
                    return e = J.cssProps[a] || (J.cssProps[a] = S(t.style, a)), o = J.cssHooks[e] || J.cssHooks[a], o && "get" in o && (r = o.get(t, !0, i)), void 0 === r && (r = b(t, e, n)), "normal" === r && e in Yt && (r = Yt[e]), "" === i || i ? (s = parseFloat(r), i === !0 || J.isNumeric(s) ? s || 0 : r) : r
                }
            }), J.each(["height", "width"], function(t, e) {
                J.cssHooks[e] = {
                    get: function(t, i, n) {
                        return i ? Ut.test(J.css(t, "display")) && 0 === t.offsetWidth ? J.swap(t, qt, function() {
                            return A(t, e, n)
                        }) : A(t, e, n) : void 0
                    },
                    set: function(t, i, n) {
                        var r = n && Vt(t);
                        return x(t, i, n ? P(t, e, n, "border-box" === J.css(t, "boxSizing", !1, r), r) : 0)
                    }
                }
            }), J.cssHooks.marginRight = w(K.reliableMarginRight, function(t, e) {
                return e ? J.swap(t, {
                    display: "inline-block"
                }, b, [t, "marginRight"]) : void 0
            }), J.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(t, e) {
                J.cssHooks[t + e] = {
                    expand: function(i) {
                        for (var n = 0, r = {}, s = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) r[t + wt[n] + e] = s[n] || s[n - 2] || s[0];
                        return r
                    }
                }, Ft.test(t) || (J.cssHooks[t + e].set = x)
            }), J.fn.extend({
                css: function(t, e) {
                    return gt(this, function(t, e, i) {
                        var n, r, s = {},
                            o = 0;
                        if (J.isArray(e)) {
                            for (n = Vt(t), r = e.length; r > o; o++) s[e[o]] = J.css(t, e[o], !1, n);
                            return s
                        }
                        return void 0 !== i ? J.style(t, e, i) : J.css(t, e)
                    }, t, e, arguments.length > 1)
                },
                show: function() {
                    return M(this, !0)
                },
                hide: function() {
                    return M(this)
                },
                toggle: function(t) {
                    return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                        St(this) ? J(this).show() : J(this).hide()
                    })
                }
            }), J.Tween = E, E.prototype = {
                constructor: E,
                init: function(t, e, i, n, r, s) {
                    this.elem = t, this.prop = i, this.easing = r || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = s || (J.cssNumber[i] ? "" : "px")
                },
                cur: function() {
                    var t = E.propHooks[this.prop];
                    return t && t.get ? t.get(this) : E.propHooks._default.get(this)
                },
                run: function(t) {
                    var e, i = E.propHooks[this.prop];
                    return this.options.duration ? this.pos = e = J.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : E.propHooks._default.set(this), this
                }
            }, E.prototype.init.prototype = E.prototype, E.propHooks = {
                _default: {
                    get: function(t) {
                        var e;
                        return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = J.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
                    },
                    set: function(t) {
                        J.fx.step[t.prop] ? J.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[J.cssProps[t.prop]] || J.cssHooks[t.prop]) ? J.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                    }
                }
            }, E.propHooks.scrollTop = E.propHooks.scrollLeft = {
                set: function(t) {
                    t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
                }
            }, J.easing = {
                linear: function(t) {
                    return t
                },
                swing: function(t) {
                    return .5 - Math.cos(t * Math.PI) / 2
                }
            }, J.fx = E.prototype.init, J.fx.step = {};
            var Kt, Qt, Zt = /^(?:toggle|show|hide)$/,
                Jt = new RegExp("^(?:([+-])=|)(" + bt + ")([a-z%]*)$", "i"),
                te = /queueHooks$/,
                ee = [I],
                ie = {
                    "*": [function(t, e) {
                        var i = this.createTween(t, e),
                            n = i.cur(),
                            r = Jt.exec(e),
                            s = r && r[3] || (J.cssNumber[t] ? "" : "px"),
                            o = (J.cssNumber[t] || "px" !== s && +n) && Jt.exec(J.css(i.elem, t)),
                            a = 1,
                            u = 20;
                        if (o && o[3] !== s) {
                            s = s || o[3], r = r || [], o = +n || 1;
                            do a = a || ".5", o /= a, J.style(i.elem, t, o + s); while (a !== (a = i.cur() / n) && 1 !== a && --u)
                        }
                        return r && (o = i.start = +o || +n || 0, i.unit = s, i.end = r[1] ? o + (r[1] + 1) * r[2] : +r[2]), i
                    }]
                };
            J.Animation = J.extend(G, {
                    tweener: function(t, e) {
                        J.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                        for (var i, n = 0, r = t.length; r > n; n++) i = t[n], ie[i] = ie[i] || [], ie[i].unshift(e)
                    },
                    prefilter: function(t, e) {
                        e ? ee.unshift(t) : ee.push(t)
                    }
                }), J.speed = function(t, e, i) {
                    var n = t && "object" == typeof t ? J.extend({}, t) : {
                        complete: i || !i && e || J.isFunction(t) && t,
                        duration: t,
                        easing: i && e || e && !J.isFunction(e) && e
                    };
                    return n.duration = J.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in J.fx.speeds ? J.fx.speeds[n.duration] : J.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                        J.isFunction(n.old) && n.old.call(this), n.queue && J.dequeue(this, n.queue)
                    }, n
                }, J.fn.extend({
                    fadeTo: function(t, e, i, n) {
                        return this.filter(St).css("opacity", 0).show().end().animate({
                            opacity: e
                        }, t, i, n)
                    },
                    animate: function(t, e, i, n) {
                        var r = J.isEmptyObject(t),
                            s = J.speed(e, i, n),
                            o = function() {
                                var e = G(this, J.extend({}, t), s);
                                (r || vt.get(this, "finish")) && e.stop(!0)
                            };
                        return o.finish = o, r || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
                    },
                    stop: function(t, e, i) {
                        var n = function(t) {
                            var e = t.stop;
                            delete t.stop, e(i)
                        };
                        return "string" != typeof t && (i = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                            var e = !0,
                                r = null != t && t + "queueHooks",
                                s = J.timers,
                                o = vt.get(this);
                            if (r) o[r] && o[r].stop && n(o[r]);
                            else
                                for (r in o) o[r] && o[r].stop && te.test(r) && n(o[r]);
                            for (r = s.length; r--;) s[r].elem !== this || null != t && s[r].queue !== t || (s[r].anim.stop(i), e = !1, s.splice(r, 1));
                            (e || !i) && J.dequeue(this, t)
                        })
                    },
                    finish: function(t) {
                        return t !== !1 && (t = t || "fx"), this.each(function() {
                            var e, i = vt.get(this),
                                n = i[t + "queue"],
                                r = i[t + "queueHooks"],
                                s = J.timers,
                                o = n ? n.length : 0;
                            for (i.finish = !0, J.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = s.length; e--;) s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
                            for (e = 0; o > e; e++) n[e] && n[e].finish && n[e].finish.call(this);
                            delete i.finish
                        })
                    }
                }), J.each(["toggle", "show", "hide"], function(t, e) {
                    var i = J.fn[e];
                    J.fn[e] = function(t, n, r) {
                        return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(O(e, !0), t, n, r)
                    }
                }), J.each({
                    slideDown: O("show"),
                    slideUp: O("hide"),
                    slideToggle: O("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(t, e) {
                    J.fn[t] = function(t, i, n) {
                        return this.animate(e, t, i, n)
                    }
                }), J.timers = [], J.fx.tick = function() {
                    var t, e = 0,
                        i = J.timers;
                    for (Kt = J.now(); e < i.length; e++) t = i[e], t() || i[e] !== t || i.splice(e--, 1);
                    i.length || J.fx.stop(), Kt = void 0
                }, J.fx.timer = function(t) {
                    J.timers.push(t), t() ? J.fx.start() : J.timers.pop()
                }, J.fx.interval = 13, J.fx.start = function() {
                    Qt || (Qt = setInterval(J.fx.tick, J.fx.interval))
                }, J.fx.stop = function() {
                    clearInterval(Qt), Qt = null
                }, J.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, J.fn.delay = function(t, e) {
                    return t = J.fx ? J.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, i) {
                        var n = setTimeout(e, t);
                        i.stop = function() {
                            clearTimeout(n)
                        }
                    })
                },
                function() {
                    var t = Q.createElement("input"),
                        e = Q.createElement("select"),
                        i = e.appendChild(Q.createElement("option"));
                    t.type = "checkbox", K.checkOn = "" !== t.value, K.optSelected = i.selected, e.disabled = !0, K.optDisabled = !i.disabled, t = Q.createElement("input"), t.value = "t", t.type = "radio", K.radioValue = "t" === t.value
                }();
            var ne, re, se = J.expr.attrHandle;
            J.fn.extend({
                attr: function(t, e) {
                    return gt(this, J.attr, t, e, arguments.length > 1)
                },
                removeAttr: function(t) {
                    return this.each(function() {
                        J.removeAttr(this, t)
                    })
                }
            }), J.extend({
                attr: function(t, e, i) {
                    var n, r, s = t.nodeType;
                    if (t && 3 !== s && 8 !== s && 2 !== s) return typeof t.getAttribute === Pt ? J.prop(t, e, i) : (1 === s && J.isXMLDoc(t) || (e = e.toLowerCase(), n = J.attrHooks[e] || (J.expr.match.bool.test(e) ? re : ne)), void 0 === i ? n && "get" in n && null !== (r = n.get(t, e)) ? r : (r = J.find.attr(t, e), null == r ? void 0 : r) : null !== i ? n && "set" in n && void 0 !== (r = n.set(t, i, e)) ? r : (t.setAttribute(e, i + ""), i) : void J.removeAttr(t, e))
                },
                removeAttr: function(t, e) {
                    var i, n, r = 0,
                        s = e && e.match(dt);
                    if (s && 1 === t.nodeType)
                        for (; i = s[r++];) n = J.propFix[i] || i, J.expr.match.bool.test(i) && (t[n] = !1), t.removeAttribute(i)
                },
                attrHooks: {
                    type: {
                        set: function(t, e) {
                            if (!K.radioValue && "radio" === e && J.nodeName(t, "input")) {
                                var i = t.value;
                                return t.setAttribute("type", e), i && (t.value = i), e
                            }
                        }
                    }
                }
            }), re = {
                set: function(t, e, i) {
                    return e === !1 ? J.removeAttr(t, i) : t.setAttribute(i, i), i
                }
            }, J.each(J.expr.match.bool.source.match(/\w+/g), function(t, e) {
                var i = se[e] || J.find.attr;
                se[e] = function(t, e, n) {
                    var r, s;
                    return n || (s = se[e], se[e] = r, r = null != i(t, e, n) ? e.toLowerCase() : null, se[e] = s), r
                }
            });
            var oe = /^(?:input|select|textarea|button)$/i;
            J.fn.extend({
                prop: function(t, e) {
                    return gt(this, J.prop, t, e, arguments.length > 1)
                },
                removeProp: function(t) {
                    return this.each(function() {
                        delete this[J.propFix[t] || t]
                    })
                }
            }), J.extend({
                propFix: {
                    "for": "htmlFor",
                    "class": "className"
                },
                prop: function(t, e, i) {
                    var n, r, s, o = t.nodeType;
                    if (t && 3 !== o && 8 !== o && 2 !== o) return s = 1 !== o || !J.isXMLDoc(t), s && (e = J.propFix[e] || e, r = J.propHooks[e]), void 0 !== i ? r && "set" in r && void 0 !== (n = r.set(t, i, e)) ? n : t[e] = i : r && "get" in r && null !== (n = r.get(t, e)) ? n : t[e]
                },
                propHooks: {
                    tabIndex: {
                        get: function(t) {
                            return t.hasAttribute("tabindex") || oe.test(t.nodeName) || t.href ? t.tabIndex : -1
                        }
                    }
                }
            }), K.optSelected || (J.propHooks.selected = {
                get: function(t) {
                    var e = t.parentNode;
                    return e && e.parentNode && e.parentNode.selectedIndex, null
                }
            }), J.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                J.propFix[this.toLowerCase()] = this
            });
            var ae = /[\t\r\n\f]/g;
            J.fn.extend({
                addClass: function(t) {
                    var e, i, n, r, s, o, a = "string" == typeof t && t,
                        u = 0,
                        l = this.length;
                    if (J.isFunction(t)) return this.each(function(e) {
                        J(this).addClass(t.call(this, e, this.className))
                    });
                    if (a)
                        for (e = (t || "").match(dt) || []; l > u; u++)
                            if (i = this[u], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(ae, " ") : " ")) {
                                for (s = 0; r = e[s++];) n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                                o = J.trim(n), i.className !== o && (i.className = o)
                            }
                    return this
                },
                removeClass: function(t) {
                    var e, i, n, r, s, o, a = 0 === arguments.length || "string" == typeof t && t,
                        u = 0,
                        l = this.length;
                    if (J.isFunction(t)) return this.each(function(e) {
                        J(this).removeClass(t.call(this, e, this.className))
                    });
                    if (a)
                        for (e = (t || "").match(dt) || []; l > u; u++)
                            if (i = this[u], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(ae, " ") : "")) {
                                for (s = 0; r = e[s++];)
                                    for (; n.indexOf(" " + r + " ") >= 0;) n = n.replace(" " + r + " ", " ");
                                o = t ? J.trim(n) : "", i.className !== o && (i.className = o)
                            }
                    return this
                },
                toggleClass: function(t, e) {
                    var i = typeof t;
                    return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : J.isFunction(t) ? this.each(function(i) {
                        J(this).toggleClass(t.call(this, i, this.className, e), e)
                    }) : this.each(function() {
                        if ("string" === i)
                            for (var e, n = 0, r = J(this), s = t.match(dt) || []; e = s[n++];) r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
                        else(i === Pt || "boolean" === i) && (this.className && vt.set(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : vt.get(this, "__className__") || "")
                    })
                },
                hasClass: function(t) {
                    for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++)
                        if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(ae, " ").indexOf(e) >= 0) return !0;
                    return !1
                }
            });
            var ue = /\r/g;
            J.fn.extend({
                val: function(t) {
                    var e, i, n, r = this[0]; {
                        if (arguments.length) return n = J.isFunction(t), this.each(function(i) {
                            var r;
                            1 === this.nodeType && (r = n ? t.call(this, i, J(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : J.isArray(r) && (r = J.map(r, function(t) {
                                return null == t ? "" : t + ""
                            })), e = J.valHooks[this.type] || J.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, r, "value") || (this.value = r))
                        });
                        if (r) return e = J.valHooks[r.type] || J.valHooks[r.nodeName.toLowerCase()], e && "get" in e && void 0 !== (i = e.get(r, "value")) ? i : (i = r.value, "string" == typeof i ? i.replace(ue, "") : null == i ? "" : i)
                    }
                }
            }), J.extend({
                valHooks: {
                    option: {
                        get: function(t) {
                            var e = J.find.attr(t, "value");
                            return null != e ? e : J.trim(J.text(t))
                        }
                    },
                    select: {
                        get: function(t) {
                            for (var e, i, n = t.options, r = t.selectedIndex, s = "select-one" === t.type || 0 > r, o = s ? null : [], a = s ? r + 1 : n.length, u = 0 > r ? a : s ? r : 0; a > u; u++)
                                if (i = n[u], (i.selected || u === r) && (K.optDisabled ? !i.disabled : null === i.getAttribute("disabled")) && (!i.parentNode.disabled || !J.nodeName(i.parentNode, "optgroup"))) {
                                    if (e = J(i).val(), s) return e;
                                    o.push(e)
                                }
                            return o
                        },
                        set: function(t, e) {
                            for (var i, n, r = t.options, s = J.makeArray(e), o = r.length; o--;) n = r[o], (n.selected = J.inArray(n.value, s) >= 0) && (i = !0);
                            return i || (t.selectedIndex = -1), s
                        }
                    }
                }
            }), J.each(["radio", "checkbox"], function() {
                J.valHooks[this] = {
                    set: function(t, e) {
                        return J.isArray(e) ? t.checked = J.inArray(J(t).val(), e) >= 0 : void 0
                    }
                }, K.checkOn || (J.valHooks[this].get = function(t) {
                    return null === t.getAttribute("value") ? "on" : t.value
                })
            }), J.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
                J.fn[e] = function(t, i) {
                    return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
                }
            }), J.fn.extend({
                hover: function(t, e) {
                    return this.mouseenter(t).mouseleave(e || t)
                },
                bind: function(t, e, i) {
                    return this.on(t, null, e, i)
                },
                unbind: function(t, e) {
                    return this.off(t, null, e)
                },
                delegate: function(t, e, i, n) {
                    return this.on(e, t, i, n)
                },
                undelegate: function(t, e, i) {
                    return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
                }
            });
            var le = J.now(),
                he = /\?/;
            J.parseJSON = function(t) {
                return JSON.parse(t + "")
            }, J.parseXML = function(t) {
                var e, i;
                if (!t || "string" != typeof t) return null;
                try {
                    i = new DOMParser, e = i.parseFromString(t, "text/xml")
                } catch (n) {
                    e = void 0
                }
                return (!e || e.getElementsByTagName("parsererror").length) && J.error("Invalid XML: " + t), e
            };
            var ce = /#.*$/,
                fe = /([?&])_=[^&]*/,
                de = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                pe = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                me = /^(?:GET|HEAD)$/,
                ge = /^\/\//,
                ve = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
                ye = {},
                Te = {},
                _e = "*/".concat("*"),
                be = t.location.href,
                we = ve.exec(be.toLowerCase()) || [];
            J.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: be,
                    type: "GET",
                    isLocal: pe.test(we[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": _e,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": J.parseJSON,
                        "text xml": J.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(t, e) {
                    return e ? H(H(t, J.ajaxSettings), e) : H(J.ajaxSettings, t)
                },
                ajaxPrefilter: R(ye),
                ajaxTransport: R(Te),
                ajax: function(t, e) {
                    function i(t, e, i, o) {
                        var u, h, v, y, _, w = e;
                        2 !== T && (T = 2, a && clearTimeout(a), n = void 0, s = o || "", b.readyState = t > 0 ? 4 : 0, u = t >= 200 && 300 > t || 304 === t, i && (y = L(c, b, i)), y = N(c, y, b, u), u ? (c.ifModified && (_ = b.getResponseHeader("Last-Modified"), _ && (J.lastModified[r] = _), _ = b.getResponseHeader("etag"), _ && (J.etag[r] = _)), 204 === t || "HEAD" === c.type ? w = "nocontent" : 304 === t ? w = "notmodified" : (w = y.state, h = y.data, v = y.error, u = !v)) : (v = w, (t || !w) && (w = "error", 0 > t && (t = 0))), b.status = t, b.statusText = (e || w) + "", u ? p.resolveWith(f, [h, w, b]) : p.rejectWith(f, [b, w, v]), b.statusCode(g), g = void 0, l && d.trigger(u ? "ajaxSuccess" : "ajaxError", [b, c, u ? h : v]), m.fireWith(f, [b, w]), l && (d.trigger("ajaxComplete", [b, c]), --J.active || J.event.trigger("ajaxStop")))
                    }
                    "object" == typeof t && (e = t, t = void 0), e = e || {};
                    var n, r, s, o, a, u, l, h, c = J.ajaxSetup({}, e),
                        f = c.context || c,
                        d = c.context && (f.nodeType || f.jquery) ? J(f) : J.event,
                        p = J.Deferred(),
                        m = J.Callbacks("once memory"),
                        g = c.statusCode || {},
                        v = {},
                        y = {},
                        T = 0,
                        _ = "canceled",
                        b = {
                            readyState: 0,
                            getResponseHeader: function(t) {
                                var e;
                                if (2 === T) {
                                    if (!o)
                                        for (o = {}; e = de.exec(s);) o[e[1].toLowerCase()] = e[2];
                                    e = o[t.toLowerCase()]
                                }
                                return null == e ? null : e
                            },
                            getAllResponseHeaders: function() {
                                return 2 === T ? s : null
                            },
                            setRequestHeader: function(t, e) {
                                var i = t.toLowerCase();
                                return T || (t = y[i] = y[i] || t, v[t] = e), this
                            },
                            overrideMimeType: function(t) {
                                return T || (c.mimeType = t), this
                            },
                            statusCode: function(t) {
                                var e;
                                if (t)
                                    if (2 > T)
                                        for (e in t) g[e] = [g[e], t[e]];
                                    else b.always(t[b.status]);
                                return this
                            },
                            abort: function(t) {
                                var e = t || _;
                                return n && n.abort(e), i(0, e), this
                            }
                        };
                    if (p.promise(b).complete = m.add, b.success = b.done, b.error = b.fail, c.url = ((t || c.url || be) + "").replace(ce, "").replace(ge, we[1] + "//"), c.type = e.method || e.type || c.method || c.type, c.dataTypes = J.trim(c.dataType || "*").toLowerCase().match(dt) || [""], null == c.crossDomain && (u = ve.exec(c.url.toLowerCase()), c.crossDomain = !(!u || u[1] === we[1] && u[2] === we[2] && (u[3] || ("http:" === u[1] ? "80" : "443")) === (we[3] || ("http:" === we[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = J.param(c.data, c.traditional)), B(ye, c, e, b), 2 === T) return b;
                    l = J.event && c.global, l && 0 === J.active++ && J.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !me.test(c.type), r = c.url, c.hasContent || (c.data && (r = c.url += (he.test(r) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = fe.test(r) ? r.replace(fe, "$1_=" + le++) : r + (he.test(r) ? "&" : "?") + "_=" + le++)), c.ifModified && (J.lastModified[r] && b.setRequestHeader("If-Modified-Since", J.lastModified[r]), J.etag[r] && b.setRequestHeader("If-None-Match", J.etag[r])), (c.data && c.hasContent && c.contentType !== !1 || e.contentType) && b.setRequestHeader("Content-Type", c.contentType), b.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + _e + "; q=0.01" : "") : c.accepts["*"]);
                    for (h in c.headers) b.setRequestHeader(h, c.headers[h]);
                    if (c.beforeSend && (c.beforeSend.call(f, b, c) === !1 || 2 === T)) return b.abort();
                    _ = "abort";
                    for (h in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) b[h](c[h]);
                    if (n = B(Te, c, e, b)) {
                        b.readyState = 1, l && d.trigger("ajaxSend", [b, c]), c.async && c.timeout > 0 && (a = setTimeout(function() {
                            b.abort("timeout")
                        }, c.timeout));
                        try {
                            T = 1, n.send(v, i)
                        } catch (w) {
                            if (!(2 > T)) throw w;
                            i(-1, w)
                        }
                    } else i(-1, "No Transport");
                    return b
                },
                getJSON: function(t, e, i) {
                    return J.get(t, e, i, "json")
                },
                getScript: function(t, e) {
                    return J.get(t, void 0, e, "script")
                }
            }), J.each(["get", "post"], function(t, e) {
                J[e] = function(t, i, n, r) {
                    return J.isFunction(i) && (r = r || n, n = i, i = void 0), J.ajax({
                        url: t,
                        type: e,
                        dataType: r,
                        data: i,
                        success: n
                    })
                }
            }), J._evalUrl = function(t) {
                return J.ajax({
                    url: t,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }, J.fn.extend({
                wrapAll: function(t) {
                    var e;
                    return J.isFunction(t) ? this.each(function(e) {
                        J(this).wrapAll(t.call(this, e))
                    }) : (this[0] && (e = J(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                        for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                        return t
                    }).append(this)), this)
                },
                wrapInner: function(t) {
                    return J.isFunction(t) ? this.each(function(e) {
                        J(this).wrapInner(t.call(this, e))
                    }) : this.each(function() {
                        var e = J(this),
                            i = e.contents();
                        i.length ? i.wrapAll(t) : e.append(t)
                    })
                },
                wrap: function(t) {
                    var e = J.isFunction(t);
                    return this.each(function(i) {
                        J(this).wrapAll(e ? t.call(this, i) : t)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        J.nodeName(this, "body") || J(this).replaceWith(this.childNodes)
                    }).end()
                }
            }), J.expr.filters.hidden = function(t) {
                return t.offsetWidth <= 0 && t.offsetHeight <= 0
            }, J.expr.filters.visible = function(t) {
                return !J.expr.filters.hidden(t)
            };
            var Se = /%20/g,
                xe = /\[\]$/,
                Pe = /\r?\n/g,
                Ae = /^(?:submit|button|image|reset|file)$/i,
                Me = /^(?:input|select|textarea|keygen)/i;
            J.param = function(t, e) {
                var i, n = [],
                    r = function(t, e) {
                        e = J.isFunction(e) ? e() : null == e ? "" : e, n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                    };
                if (void 0 === e && (e = J.ajaxSettings && J.ajaxSettings.traditional), J.isArray(t) || t.jquery && !J.isPlainObject(t)) J.each(t, function() {
                    r(this.name, this.value)
                });
                else
                    for (i in t) j(i, t[i], e, r);
                return n.join("&").replace(Se, "+")
            }, J.fn.extend({
                serialize: function() {
                    return J.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var t = J.prop(this, "elements");
                        return t ? J.makeArray(t) : this
                    }).filter(function() {
                        var t = this.type;
                        return this.name && !J(this).is(":disabled") && Me.test(this.nodeName) && !Ae.test(t) && (this.checked || !xt.test(t))
                    }).map(function(t, e) {
                        var i = J(this).val();
                        return null == i ? null : J.isArray(i) ? J.map(i, function(t) {
                            return {
                                name: e.name,
                                value: t.replace(Pe, "\r\n")
                            }
                        }) : {
                            name: e.name,
                            value: i.replace(Pe, "\r\n")
                        }
                    }).get()
                }
            }), J.ajaxSettings.xhr = function() {
                try {
                    return new XMLHttpRequest
                } catch (t) {}
            };
            var Ee = 0,
                Ce = {},
                Oe = {
                    0: 200,
                    1223: 204
                },
                De = J.ajaxSettings.xhr();
            t.attachEvent && t.attachEvent("onunload", function() {
                for (var t in Ce) Ce[t]()
            }), K.cors = !!De && "withCredentials" in De, K.ajax = De = !!De, J.ajaxTransport(function(t) {
                var e;
                return K.cors || De && !t.crossDomain ? {
                    send: function(i, n) {
                        var r, s = t.xhr(),
                            o = ++Ee;
                        if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                            for (r in t.xhrFields) s[r] = t.xhrFields[r];
                        t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                        for (r in i) s.setRequestHeader(r, i[r]);
                        e = function(t) {
                            return function() {
                                e && (delete Ce[o], e = s.onload = s.onerror = null, "abort" === t ? s.abort() : "error" === t ? n(s.status, s.statusText) : n(Oe[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
                                    text: s.responseText
                                } : void 0, s.getAllResponseHeaders()))
                            }
                        }, s.onload = e(), s.onerror = e("error"), e = Ce[o] = e("abort");
                        try {
                            s.send(t.hasContent && t.data || null)
                        } catch (a) {
                            if (e) throw a
                        }
                    },
                    abort: function() {
                        e && e()
                    }
                } : void 0
            }), J.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /(?:java|ecma)script/
                },
                converters: {
                    "text script": function(t) {
                        return J.globalEval(t), t
                    }
                }
            }), J.ajaxPrefilter("script", function(t) {
                void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
            }), J.ajaxTransport("script", function(t) {
                if (t.crossDomain) {
                    var e, i;
                    return {
                        send: function(n, r) {
                            e = J("<script>").prop({
                                async: !0,
                                charset: t.scriptCharset,
                                src: t.url
                            }).on("load error", i = function(t) {
                                e.remove(), i = null, t && r("error" === t.type ? 404 : 200, t.type)
                            }), Q.head.appendChild(e[0])
                        },
                        abort: function() {
                            i && i()
                        }
                    }
                }
            });
            var Ie = [],
                ke = /(=)\?(?=&|$)|\?\?/;
            J.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var t = Ie.pop() || J.expando + "_" + le++;
                    return this[t] = !0, t
                }
            }), J.ajaxPrefilter("json jsonp", function(e, i, n) {
                var r, s, o, a = e.jsonp !== !1 && (ke.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && ke.test(e.data) && "data");
                return a || "jsonp" === e.dataTypes[0] ? (r = e.jsonpCallback = J.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(ke, "$1" + r) : e.jsonp !== !1 && (e.url += (he.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
                    return o || J.error(r + " was not called"), o[0]
                }, e.dataTypes[0] = "json", s = t[r], t[r] = function() {
                    o = arguments
                }, n.always(function() {
                    t[r] = s, e[r] && (e.jsonpCallback = i.jsonpCallback, Ie.push(r)), o && J.isFunction(s) && s(o[0]), o = s = void 0
                }), "script") : void 0
            }), J.parseHTML = function(t, e, i) {
                if (!t || "string" != typeof t) return null;
                "boolean" == typeof e && (i = e, e = !1), e = e || Q;
                var n = ot.exec(t),
                    r = !i && [];
                return n ? [e.createElement(n[1])] : (n = J.buildFragment([t], e, r), r && r.length && J(r).remove(), J.merge([], n.childNodes))
            };
            var Ge = J.fn.load;
            J.fn.load = function(t, e, i) {
                if ("string" != typeof t && Ge) return Ge.apply(this, arguments);
                var n, r, s, o = this,
                    a = t.indexOf(" ");
                return a >= 0 && (n = J.trim(t.slice(a)), t = t.slice(0, a)), J.isFunction(e) ? (i = e, e = void 0) : e && "object" == typeof e && (r = "POST"), o.length > 0 && J.ajax({
                    url: t,
                    type: r,
                    dataType: "html",
                    data: e
                }).done(function(t) {
                    s = arguments, o.html(n ? J("<div>").append(J.parseHTML(t)).find(n) : t)
                }).complete(i && function(t, e) {
                    o.each(i, s || [t.responseText, e, t])
                }), this
            }, J.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
                J.fn[e] = function(t) {
                    return this.on(e, t)
                }
            }), J.expr.filters.animated = function(t) {
                return J.grep(J.timers, function(e) {
                    return t === e.elem
                }).length
            };
            var Re = t.document.documentElement;
            J.offset = {
                setOffset: function(t, e, i) {
                    var n, r, s, o, a, u, l, h = J.css(t, "position"),
                        c = J(t),
                        f = {};
                    "static" === h && (t.style.position = "relative"), a = c.offset(), s = J.css(t, "top"), u = J.css(t, "left"), l = ("absolute" === h || "fixed" === h) && (s + u).indexOf("auto") > -1, l ? (n = c.position(), o = n.top, r = n.left) : (o = parseFloat(s) || 0, r = parseFloat(u) || 0), J.isFunction(e) && (e = e.call(t, i, a)), null != e.top && (f.top = e.top - a.top + o), null != e.left && (f.left = e.left - a.left + r), "using" in e ? e.using.call(t, f) : c.css(f)
                }
            }, J.fn.extend({
                offset: function(t) {
                    if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                        J.offset.setOffset(this, t, e)
                    });
                    var e, i, n = this[0],
                        r = {
                            top: 0,
                            left: 0
                        },
                        s = n && n.ownerDocument;
                    if (s) return e = s.documentElement, J.contains(e, n) ? (typeof n.getBoundingClientRect !== Pt && (r = n.getBoundingClientRect()), i = F(s), {
                        top: r.top + i.pageYOffset - e.clientTop,
                        left: r.left + i.pageXOffset - e.clientLeft
                    }) : r
                },
                position: function() {
                    if (this[0]) {
                        var t, e, i = this[0],
                            n = {
                                top: 0,
                                left: 0
                            };
                        return "fixed" === J.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), J.nodeName(t[0], "html") || (n = t.offset()), n.top += J.css(t[0], "borderTopWidth", !0), n.left += J.css(t[0], "borderLeftWidth", !0)), {
                            top: e.top - n.top - J.css(i, "marginTop", !0),
                            left: e.left - n.left - J.css(i, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var t = this.offsetParent || Re; t && !J.nodeName(t, "html") && "static" === J.css(t, "position");) t = t.offsetParent;
                        return t || Re
                    })
                }
            }), J.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(e, i) {
                var n = "pageYOffset" === i;
                J.fn[e] = function(r) {
                    return gt(this, function(e, r, s) {
                        var o = F(e);
                        return void 0 === s ? o ? o[i] : e[r] : void(o ? o.scrollTo(n ? t.pageXOffset : s, n ? s : t.pageYOffset) : e[r] = s)
                    }, e, r, arguments.length, null)
                }
            }), J.each(["top", "left"], function(t, e) {
                J.cssHooks[e] = w(K.pixelPosition, function(t, i) {
                    return i ? (i = b(t, e), Xt.test(i) ? J(t).position()[e] + "px" : i) : void 0
                })
            }), J.each({
                Height: "height",
                Width: "width"
            }, function(t, e) {
                J.each({
                    padding: "inner" + t,
                    content: e,
                    "": "outer" + t
                }, function(i, n) {
                    J.fn[n] = function(n, r) {
                        var s = arguments.length && (i || "boolean" != typeof n),
                            o = i || (n === !0 || r === !0 ? "margin" : "border");
                        return gt(this, function(e, i, n) {
                            var r;
                            return J.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) : void 0 === n ? J.css(e, i, o) : J.style(e, i, n, o)
                        }, e, s ? n : void 0, s, null)
                    }
                })
            }), J.fn.size = function() {
                return this.length
            }, J.fn.andSelf = J.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
                return J
            });
            var Be = t.jQuery,
                He = t.$;
            return J.noConflict = function(e) {
                return t.$ === J && (t.$ = He), e && t.jQuery === J && (t.jQuery = Be), J
            }, typeof e === Pt && (t.jQuery = t.$ = J), J
        })
    }, {}],
    47: [function(t, e, i) {
        (function() {
            var t;
            t = "undefined" != typeof i && null !== i ? i : this, t.Lethargy = function() {
                function t(t, e, i, n) {
                    this.stability = null != t ? Math.abs(t) : 8, this.sensitivity = null != e ? 1 + Math.abs(e) : 100, this.tolerance = null != i ? 1 + Math.abs(i) : 1.1, this.delay = null != n ? n : 150, this.lastUpDeltas = function() {
                        var t, e, i;
                        for (i = [], t = 1, e = 2 * this.stability; e >= 1 ? e >= t : t >= e; e >= 1 ? t++ : t--) i.push(null);
                        return i
                    }.call(this), this.lastDownDeltas = function() {
                        var t, e, i;
                        for (i = [], t = 1, e = 2 * this.stability; e >= 1 ? e >= t : t >= e; e >= 1 ? t++ : t--) i.push(null);
                        return i
                    }.call(this), this.deltasTimestamp = function() {
                        var t, e, i;
                        for (i = [], t = 1, e = 2 * this.stability; e >= 1 ? e >= t : t >= e; e >= 1 ? t++ : t--) i.push(null);
                        return i
                    }.call(this)
                }
                return t.prototype.check = function(t) {
                    var e;
                    return t = t.originalEvent || t, null != t.wheelDelta ? e = t.wheelDelta : null != t.deltaY ? e = -40 * t.deltaY : (null != t.detail || 0 === t.detail) && (e = -40 * t.detail), this.deltasTimestamp.push(Date.now()), this.deltasTimestamp.shift(), e > 0 ? (this.lastUpDeltas.push(e), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(e), this.lastDownDeltas.shift(), this.isInertia(-1))
                }, t.prototype.isInertia = function(t) {
                    var e, i, n, r, s, o, a;
                    return e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas, null === e[0] ? t : this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e[0] === e[2 * this.stability - 1] ? !1 : (n = e.slice(0, this.stability), i = e.slice(this.stability, 2 * this.stability), a = n.reduce(function(t, e) {
                        return t + e
                    }), s = i.reduce(function(t, e) {
                        return t + e
                    }), o = a / n.length, r = s / i.length, Math.abs(o) < Math.abs(r * this.tolerance) && this.sensitivity < Math.abs(r) ? t : !1)
                }, t.prototype.showLastUpDeltas = function() {
                    return this.lastUpDeltas
                }, t.prototype.showLastDownDeltas = function() {
                    return this.lastDownDeltas
                }, t
            }()
        }).call(this)
    }, {}],
    48: [function(t, e, i) {
        ! function(t, e) {
            t(function() {
                "use strict";

                function t(t, e) {
                    return null != t && null != e && t.toLowerCase() === e.toLowerCase()
                }

                function i(t, e) {
                    var i, n, r = t.length;
                    if (!r || !e) return !1;
                    for (i = e.toLowerCase(), n = 0; r > n; ++n)
                        if (i === t[n].toLowerCase()) return !0;
                    return !1
                }

                function n(t) {
                    for (var e in t) a.call(t, e) && (t[e] = new RegExp(t[e], "i"))
                }

                function r(t, e) {
                    this.ua = t || "", this._cache = {}, this.maxPhoneWidth = e || 600
                }
                var s = {};
                s.mobileDetectRules = {
                    phones: {
                        iPhone: "\\biPhone\\b|\\biPod\\b",
                        BlackBerry: "BlackBerry|\\bBB10\\b|rim[0-9]+",
                        HTC: "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m",
                        Nexus: "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",
                        Dell: "Dell.*Streak|Dell.*Aero|Dell.*Venue|DELL.*Venue Pro|Dell Flash|Dell Smoke|Dell Mini 3iX|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
                        Motorola: "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b",
                        Samsung: "Samsung|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205",
                        LG: "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802)",
                        Sony: "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",
                        Asus: "Asus.*Galaxy|PadFone.*Mobile",
                        Micromax: "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
                        Palm: "PalmSource|Palm",
                        Vertu: "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
                        Pantech: "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
                        Fly: "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
                        Wiko: "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
                        iMobile: "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
                        SimValley: "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
                        Wolfgang: "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
                        Alcatel: "Alcatel",
                        Nintendo: "Nintendo 3DS",
                        Amoi: "Amoi",
                        INQ: "INQ",
                        GenericPhone: "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"
                    },
                    tablets: {
                        iPad: "iPad|iPad.*Mobile",
                        NexusTablet: "Android.*Nexus[\\s]+(7|9|10)",
                        SamsungTablet: "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T360",
                        Kindle: "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI)\\b",
                        SurfaceTablet: "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
                        HPTablet: "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
                        AsusTablet: "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K017 |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C",
                        BlackBerryTablet: "PlayBook|RIM Tablet",
                        HTCtablet: "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
                        MotorolaTablet: "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
                        NookTablet: "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
                        AcerTablet: "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b",
                        ToshibaTablet: "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
                        LGTablet: "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
                        FujitsuTablet: "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
                        PrestigioTablet: "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
                        LenovoTablet: "Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)",
                        DellTablet: "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
                        YarvikTablet: "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
                        MedionTablet: "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
                        ArnovaTablet: "AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
                        IntensoTablet: "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
                        IRUTablet: "M702pro",
                        MegafonTablet: "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
                        EbodaTablet: "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
                        AllViewTablet: "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
                        ArchosTablet: "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
                        AinolTablet: "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
                        SonyTablet: "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31",
                        PhilipsTablet: "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
                        CubeTablet: "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
                        CobyTablet: "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
                        MIDTablet: "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733",
                        MSITablet: "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
                        SMiTTablet: "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
                        RockChipTablet: "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
                        FlyTablet: "IQ310|Fly Vision",
                        bqTablet: "Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris E10)|Maxwell.*Lite|Maxwell.*Plus",
                        HuaweiTablet: "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim",
                        NecTablet: "\\bN-06D|\\bN-08D",
                        PantechTablet: "Pantech.*P4100",
                        BronchoTablet: "Broncho.*(N701|N708|N802|a710)",
                        VersusTablet: "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
                        ZyncTablet: "z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900",
                        PositivoTablet: "TB07STA|TB10STA|TB07FTA|TB10FTA",
                        NabiTablet: "Android.*\\bNabi",
                        KoboTablet: "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
                        DanewTablet: "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
                        TexetTablet: "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
                        PlaystationTablet: "Playstation.*(Portable|Vita)",
                        TrekstorTablet: "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
                        PyleAudioTablet: "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
                        AdvanTablet: "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
                        DanyTechTablet: "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
                        GalapadTablet: "Android.*\\bG1\\b",
                        MicromaxTablet: "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
                        KarbonnTablet: "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
                        AllFineTablet: "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
                        PROSCANTablet: "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
                        YONESTablet: "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
                        ChangJiaTablet: "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
                        GUTablet: "TX-A1301|TX-M9002|Q702|kf026",
                        PointOfViewTablet: "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
                        OvermaxTablet: "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)",
                        HCLTablet: "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
                        DPSTablet: "DPS Dream 9|DPS Dual 7",
                        VistureTablet: "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
                        CrestaTablet: "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
                        MediatekTablet: "\\bMT8125|MT8389|MT8135|MT8377\\b",
                        ConcordeTablet: "Concorde([ ]+)?Tab|ConCorde ReadMan",
                        GoCleverTablet: "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
                        ModecomTablet: "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
                        VoninoTablet: "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
                        ECSTablet: "V07OT2|TM105A|S10OT1|TR10CS1",
                        StorexTablet: "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
                        VodafoneTablet: "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7",
                        EssentielBTablet: "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
                        RossMoorTablet: "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
                        iMobileTablet: "i-mobile i-note",
                        TolinoTablet: "tolino tab [0-9.]+|tolino shine",
                        AudioSonicTablet: "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
                        AMPETablet: "Android.* A78 ",
                        SkkTablet: "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
                        TecnoTablet: "TECNO P9",
                        JXDTablet: "Android.*\\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
                        iJoyTablet: "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
                        FX2Tablet: "FX2 PAD7|FX2 PAD10",
                        XoroTablet: "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
                        ViewsonicTablet: "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
                        OdysTablet: "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
                        CaptivaTablet: "CAPTIVA PAD",
                        IconbitTablet: "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
                        TeclastTablet: "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
                        OndaTablet: "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+",
                        JaytechTablet: "TPC-PA762",
                        BlaupunktTablet: "Endeavour 800NG|Endeavour 1010",
                        DigmaTablet: "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
                        EvolioTablet: "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
                        LavaTablet: "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
                        CelkonTablet: "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
                        WolderTablet: "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
                        MiTablet: "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
                        NibiruTablet: "Nibiru M1|Nibiru Jupiter One",
                        NexoTablet: "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
                        LeaderTablet: "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
                        UbislateTablet: "UbiSlate[\\s]?7C",
                        PocketBookTablet: "Pocketbook",
                        Hudl: "Hudl HT7S3",
                        TelstraTablet: "T-Hub2",
                        GenericTablet: "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bJolla\\b|\\bTP750\\b"
                    },
                    oss: {
                        AndroidOS: "Android",
                        BlackBerryOS: "blackberry|\\bBB10\\b|rim tablet os",
                        PalmOS: "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
                        SymbianOS: "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
                        WindowsMobileOS: "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;",
                        WindowsPhoneOS: "Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
                        iOS: "\\biPhone.*Mobile|\\biPod|\\biPad",
                        MeeGoOS: "MeeGo",
                        MaemoOS: "Maemo",
                        JavaOS: "J2ME/|\\bMIDP\\b|\\bCLDC\\b",
                        webOS: "webOS|hpwOS",
                        badaOS: "\\bBada\\b",
                        BREWOS: "BREW"
                    },
                    uas: {
                        Chrome: "\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?",
                        Dolfin: "\\bDolfin\\b",
                        Opera: "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+|Coast/[0-9.]+",
                        Skyfire: "Skyfire",
                        IE: "IEMobile|MSIEMobile",
                        Firefox: "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile",
                        Bolt: "bolt",
                        TeaShark: "teashark",
                        Blazer: "Blazer",
                        Safari: "Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",
                        Tizen: "Tizen",
                        UCBrowser: "UC.*Browser|UCWEB",
                        baiduboxapp: "baiduboxapp",
                        baidubrowser: "baidubrowser",
                        DiigoBrowser: "DiigoBrowser",
                        Puffin: "Puffin",
                        Mercury: "\\bMercury\\b",
                        ObigoBrowser: "Obigo",
                        NetFront: "NF-Browser",
                        GenericBrowser: "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger"
                    },
                    props: {
                        Mobile: "Mobile/[VER]",
                        Build: "Build/[VER]",
                        Version: "Version/[VER]",
                        VendorID: "VendorID/[VER]",
                        iPad: "iPad.*CPU[a-z ]+[VER]",
                        iPhone: "iPhone.*CPU[a-z ]+[VER]",
                        iPod: "iPod.*CPU[a-z ]+[VER]",
                        Kindle: "Kindle/[VER]",
                        Chrome: ["Chrome/[VER]", "CriOS/[VER]", "CrMo/[VER]"],
                        Coast: ["Coast/[VER]"],
                        Dolfin: "Dolfin/[VER]",
                        Firefox: "Firefox/[VER]",
                        Fennec: "Fennec/[VER]",
                        IE: ["IEMobile/[VER];", "IEMobile [VER]", "MSIE [VER];", "Trident/[0-9.]+;.*rv:[VER]"],
                        NetFront: "NetFront/[VER]",
                        NokiaBrowser: "NokiaBrowser/[VER]",
                        Opera: [" OPR/[VER]", "Opera Mini/[VER]", "Version/[VER]"],
                        "Opera Mini": "Opera Mini/[VER]",
                        "Opera Mobi": "Version/[VER]",
                        "UC Browser": "UC Browser[VER]",
                        MQQBrowser: "MQQBrowser/[VER]",
                        MicroMessenger: "MicroMessenger/[VER]",
                        baiduboxapp: "baiduboxapp/[VER]",
                        baidubrowser: "baidubrowser/[VER]",
                        Iron: "Iron/[VER]",
                        Safari: ["Version/[VER]", "Safari/[VER]"],
                        Skyfire: "Skyfire/[VER]",
                        Tizen: "Tizen/[VER]",
                        Webkit: "webkit[ /][VER]",
                        Gecko: "Gecko/[VER]",
                        Trident: "Trident/[VER]",
                        Presto: "Presto/[VER]",
                        iOS: " \\bi?OS\\b [VER][ ;]{1}",
                        Android: "Android [VER]",
                        BlackBerry: ["BlackBerry[\\w]+/[VER]", "BlackBerry.*Version/[VER]", "Version/[VER]"],
                        BREW: "BREW [VER]",
                        Java: "Java/[VER]",
                        "Windows Phone OS": ["Windows Phone OS [VER]", "Windows Phone [VER]"],
                        "Windows Phone": "Windows Phone [VER]",
                        "Windows CE": "Windows CE/[VER]",
                        "Windows NT": "Windows NT [VER]",
                        Symbian: ["SymbianOS/[VER]", "Symbian/[VER]"],
                        webOS: ["webOS/[VER]", "hpwOS/[VER];"]
                    },
                    utils: {
                        Bot: "Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom",
                        MobileBot: "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2",
                        DesktopMode: "WPDesktop",
                        TV: "SonyDTV|HbbTV",
                        WebKit: "(webkit)[ /]([\\w.]+)",
                        Console: "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|PLAYSTATION|Xbox)\\b",
                        Watch: "SM-V700"
                    }
                }, s.detectMobileBrowsers = {
                    fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
                    shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
                    tabletPattern: /android|ipad|playbook|silk/i
                };
                var o, a = Object.prototype.hasOwnProperty;
                return s.FALLBACK_PHONE = "UnknownPhone", s.FALLBACK_TABLET = "UnknownTablet", s.FALLBACK_MOBILE = "UnknownMobile", o = "isArray" in Array ? Array.isArray : function(t) {
                        return "[object Array]" === Object.prototype.toString.call(t)
                    },
                    function() {
                        var t, e, i, r, u, l, h = s.mobileDetectRules;
                        for (t in h.props)
                            if (a.call(h.props, t)) {
                                for (e = h.props[t], o(e) || (e = [e]), u = e.length, r = 0; u > r; ++r) i = e[r], l = i.indexOf("[VER]"), l >= 0 && (i = i.substring(0, l) + "([\\w._\\+]+)" + i.substring(l + 5)), e[r] = new RegExp(i, "i");
                                h.props[t] = e
                            }
                        n(h.oss), n(h.phones), n(h.tablets), n(h.uas), n(h.utils), h.oss0 = {
                            WindowsPhoneOS: h.oss.WindowsPhoneOS,
                            WindowsMobileOS: h.oss.WindowsMobileOS
                        }
                    }(), s.findMatch = function(t, e) {
                        for (var i in t)
                            if (a.call(t, i) && t[i].test(e)) return i;
                        return null
                    }, s.findMatches = function(t, e) {
                        var i = [];
                        for (var n in t) a.call(t, n) && t[n].test(e) && i.push(n);
                        return i
                    }, s.getVersionStr = function(t, e) {
                        var i, n, r, o, u = s.mobileDetectRules.props;
                        if (a.call(u, t))
                            for (i = u[t], r = i.length, n = 0; r > n; ++n)
                                if (o = i[n].exec(e), null !== o) return o[1];
                        return null
                    }, s.getVersion = function(t, e) {
                        var i = s.getVersionStr(t, e);
                        return i ? s.prepareVersionNo(i) : NaN
                    }, s.prepareVersionNo = function(t) {
                        var e;
                        return e = t.split(/[a-z._ \/\-]/i), 1 === e.length && (t = e[0]), e.length > 1 && (t = e[0] + ".", e.shift(), t += e.join("")), Number(t)
                    }, s.isMobileFallback = function(t) {
                        return s.detectMobileBrowsers.fullPattern.test(t) || s.detectMobileBrowsers.shortPattern.test(t.substr(0, 4))
                    }, s.isTabletFallback = function(t) {
                        return s.detectMobileBrowsers.tabletPattern.test(t)
                    }, s.prepareDetectionCache = function(t, i, n) {
                        if (t.mobile === e) {
                            var o, a, u;
                            return (a = s.findMatch(s.mobileDetectRules.tablets, i)) ? (t.mobile = t.tablet = a, void(t.phone = null)) : (o = s.findMatch(s.mobileDetectRules.phones, i)) ? (t.mobile = t.phone = o, void(t.tablet = null)) : void(s.isMobileFallback(i) ? (u = r.isPhoneSized(n), u === e ? (t.mobile = s.FALLBACK_MOBILE, t.tablet = t.phone = null) : u ? (t.mobile = t.phone = s.FALLBACK_PHONE, t.tablet = null) : (t.mobile = t.tablet = s.FALLBACK_TABLET, t.phone = null)) : s.isTabletFallback(i) ? (t.mobile = t.tablet = s.FALLBACK_TABLET, t.phone = null) : t.mobile = t.tablet = t.phone = null)
                        }
                    }, s.mobileGrade = function(t) {
                        var e = null !== t.mobile();
                        return t.os("iOS") && t.version("iPad") >= 4.3 || t.os("iOS") && t.version("iPhone") >= 3.1 || t.os("iOS") && t.version("iPod") >= 3.1 || t.version("Android") > 2.1 && t.is("Webkit") || t.version("Windows Phone OS") >= 7 || t.is("BlackBerry") && t.version("BlackBerry") >= 6 || t.match("Playbook.*Tablet") || t.version("webOS") >= 1.4 && t.match("Palm|Pre|Pixi") || t.match("hp.*TouchPad") || t.is("Firefox") && t.version("Firefox") >= 12 || t.is("Chrome") && t.is("AndroidOS") && t.version("Android") >= 4 || t.is("Skyfire") && t.version("Skyfire") >= 4.1 && t.is("AndroidOS") && t.version("Android") >= 2.3 || t.is("Opera") && t.version("Opera Mobi") > 11 && t.is("AndroidOS") || t.is("MeeGoOS") || t.is("Tizen") || t.is("Dolfin") && t.version("Bada") >= 2 || (t.is("UC Browser") || t.is("Dolfin")) && t.version("Android") >= 2.3 || t.match("Kindle Fire") || t.is("Kindle") && t.version("Kindle") >= 3 || t.is("AndroidOS") && t.is("NookTablet") || t.version("Chrome") >= 11 && !e || t.version("Safari") >= 5 && !e || t.version("Firefox") >= 4 && !e || t.version("MSIE") >= 7 && !e || t.version("Opera") >= 10 && !e ? "A" : t.os("iOS") && t.version("iPad") < 4.3 || t.os("iOS") && t.version("iPhone") < 3.1 || t.os("iOS") && t.version("iPod") < 3.1 || t.is("Blackberry") && t.version("BlackBerry") >= 5 && t.version("BlackBerry") < 6 || t.version("Opera Mini") >= 5 && t.version("Opera Mini") <= 6.5 && (t.version("Android") >= 2.3 || t.is("iOS")) || t.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3") || t.version("Opera Mobi") >= 11 && t.is("SymbianOS") ? "B" : (t.version("BlackBerry") < 5 || t.match("MSIEMobile|Windows CE.*Mobile") || t.version("Windows Mobile") <= 5.2, "C")
                    }, s.detectOS = function(t) {
                        return s.findMatch(s.mobileDetectRules.oss0, t) || s.findMatch(s.mobileDetectRules.oss, t)
                    }, s.getDeviceSmallerSide = function() {
                        return window.screen.width < window.screen.height ? window.screen.width : window.screen.height
                    }, r.prototype = {
                        constructor: r,
                        mobile: function() {
                            return s.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.mobile
                        },
                        phone: function() {
                            return s.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.phone
                        },
                        tablet: function() {
                            return s.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.tablet
                        },
                        userAgent: function() {
                            return this._cache.userAgent === e && (this._cache.userAgent = s.findMatch(s.mobileDetectRules.uas, this.ua)), this._cache.userAgent
                        },
                        userAgents: function() {
                            return this._cache.userAgents === e && (this._cache.userAgents = s.findMatches(s.mobileDetectRules.uas, this.ua)), this._cache.userAgents
                        },
                        os: function() {
                            return this._cache.os === e && (this._cache.os = s.detectOS(this.ua)), this._cache.os
                        },
                        version: function(t) {
                            return s.getVersion(t, this.ua)
                        },
                        versionStr: function(t) {
                            return s.getVersionStr(t, this.ua)
                        },
                        is: function(e) {
                            return i(this.userAgents(), e) || t(e, this.os()) || t(e, this.phone()) || t(e, this.tablet()) || i(s.findMatches(s.mobileDetectRules.utils, this.ua), e)
                        },
                        match: function(t) {
                            return t instanceof RegExp || (t = new RegExp(t, "i")), t.test(this.ua)
                        },
                        isPhoneSized: function(t) {
                            return r.isPhoneSized(t || this.maxPhoneWidth)
                        },
                        mobileGrade: function() {
                            return this._cache.grade === e && (this._cache.grade = s.mobileGrade(this)), this._cache.grade
                        }
                    }, "undefined" != typeof window && window.screen ? r.isPhoneSized = function(t) {
                        return 0 > t ? e : s.getDeviceSmallerSide() <= t
                    } : r.isPhoneSized = function() {}, r._impl = s, r
            })
        }(function(t) {
            if ("undefined" != typeof e && e.exports) return function(t) {
                e.exports = t()
            };
            if ("function" == typeof define && define.amd) return define;
            if ("undefined" != typeof window) return function(t) {
                window.MobileDetect = t()
            };
            throw new Error("unknown environment")
        }())
    }, {}],
    49: [function(t, e, i) {
        (function() {
            "use strict";
            var t = {},
                i = function(t) {
                    var e;
                    try {
                        e = JSON.parse(t.responseText)
                    } catch (i) {
                        e = t.responseText
                    }
                    return {
                        data: e,
                        request: t
                    }
                },
                n = function(t, e, n, r) {
                    var s, o = {
                            fileForm: r.fileForm || !1,
                            promise: r.promise || !1,
                            headers: r.headers || {},
                            success: r.success || function() {},
                            error: r.error || function() {},
                            loadstart: r.loadstart || function() {},
                            progress: r.progress || function() {},
                            load: r.load || function() {}
                        },
                        a = "string" == typeof n,
                        u = !1;
                    if (a) try {
                        u = !!JSON.parse(n)
                    } catch (l) {
                        u = !1
                    }
                    if (o.fileForm && a) {
                        var h = document.createElement("iframe");
                        s = {
                            readyState: !1,
                            status: !1,
                            onload: function() {},
                            onerror: function() {},
                            send: function() {
                                h.style.display = "none", h.name = h.id = "iframe" + Math.ceil(1e5 * Math.random()).toString(), document.body.appendChild(h), h.addEventListener("load", function() {
                                    var t = this.responseText = h.contentDocument.body.innerHTML;
                                    t.toString().match(/^20\d\b/) ? (this.readyState = 4, this.status = 200, o.success(), this.onload()) : (o.error(), this.onerror()), document.body.removeChild(h), o.fileForm.action = o.fileForm.action.slice(o.fileForm.action.search(/\?ie9/), 4)
                                }.bind(this)), o.fileForm.action.search(/\?ie9/) < 0 && (o.fileForm.action = o.fileForm.action ? o.fileForm.action + "?ie9" : "?ie9"), o.fileForm.target = h.id, o.fileForm.submit(), o.loadstart()
                            }
                        }
                    } else {
                        var c = window.XMLHttpRequest || ActiveXObject;
                        s = new c("MSXML2.XMLHTTP.3.0"), s.open(t, e, !0), s.setRequestHeader("X-Requested-With", "XMLHttpRequest"), a && (u ? s.setRequestHeader("Content-type", "application/json; charset=utf-8") : s.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8")), s.upload && (s.upload.addEventListener("loadstart", o.loadstart, !1), s.upload.addEventListener("progress", o.progress, !1), s.upload.addEventListener("load", o.load, !1)), s.onreadystatechange = function() {
                            4 === s.readyState && (s.status >= 200 && s.status < 300 ? o.success(i(s)) : o.error(i(s)))
                        }
                    }
                    for (var f in o.headers) o.headers.hasOwnProperty(f) && s.setRequestHeader(f, o.headers[f]);
                    return window.Promise && o.promise ? new Promise(function(t, e) {
                        s.onload = function() {
                            s.status >= 200 && s.status < 300 ? t(s.response ? s.response : s.responseText) : e(Error(s.statusText))
                        }, s.onerror = function() {
                            e(Error("Network Error"))
                        }, s.send(n)
                    }) : (s.send(n), s)
                };
            t.get = function(t, e) {
                var i = e || {};
                return n("GET", t, void 0, i)
            }, t.put = function(t, e, i) {
                var r = i || {};
                return n("PUT", t, e, r)
            }, t.patch = function(t, e, i) {
                var r = i || {};
                return n("PATCH", t, e, r)
            }, t.post = function(t, e, i) {
                var r = i || {};
                return n("POST", t, e, r)
            }, t.del = t["delete"] = function(t, e) {
                var i = e || {};
                return n("DELETE", t, void 0, i)
            }, "function" == typeof define && define.amd ? define(function() {
                return t
            }) : "undefined" != typeof e && e.exports ? e.exports = t : "undefined" != typeof this && (this.please = t)
        }).call(this)
    }, {}],
    50: [function(t, e, i) {
        function n(t) {
            if (t = t.replace(/-([a-z])/g, function(t, e) {
                    return e.toUpperCase()
                }), void 0 !== o[t]) return t;
            for (var e = r(t), i = a.length; i--;) {
                var n = a[i] + e;
                if (void 0 !== o[n]) return n
            }
            throw new Error("unable to prefix " + t)
        }

        function r(t) {
            return t.charAt(0).toUpperCase() + t.slice(1)
        }

        function s(t) {
            return t = n(t), u.test(t) && (t = "-" + t.replace(u, "-$1"), u.lastIndex = 0), t.toLowerCase()
        }
        var o = document.createElement("p").style,
            a = "O ms Moz Webkit".split(" "),
            u = /([A-Z])/g,
            l = {};
        e.exports = i = function(t) {
            return t in l ? l[t] : l[t] = n(t)
        }, i.prefix = n, i.dash = s
    }, {}],
    51: [function(t, e, i) {
        "use strict";
        var n = t("./lib/camelCase");
        e.exports = function(t) {
            var e = {},
                i = t || {},
                r = i.el || document.body,
                s = i.prefix || "js-",
                o = "undefined" != typeof jQuery;
            if (!r) return console.warn("queryDom warning: the container specified in empty");
            var a;
            a = o ? jQuery(r).find('*[class*="' + s + '"]') : r.querySelectorAll('*[class*="' + s + '"]');
            for (var u = 0; u < a.length; u++) {
                var l = a[u],
                    h = l.className;
                "string" != typeof h && (h = l.getAttribute("class"));
                var c = h.split(s)[1],
                    f = c.split(" ")[0],
                    d = n(f);
                if (d) {
                    var p = e[d];
                    p && !p._isAllSelected && (e[d] = o ? jQuery("." + s + f) : r.querySelectorAll("." + s + f), e[d]._isAllSelected = !0), o && (l = jQuery(l)), p || (e[d] = l)
                } else console.warn("queryDom warning: one of your prefix is empty")
            }
            return e
        }
    }, {
        "./lib/camelCase": 52
    }],
    52: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return t.toLowerCase().replace(/-(.)/g, function(t, e) {
                return e.toUpperCase()
            })
        }
    }, {}],
    53: [function(t, e, i) {
        function n() {}
        n.prototype = {
            on: function(t, e, i) {
                var n = this.e || (this.e = {});
                return (n[t] || (n[t] = [])).push({
                    fn: e,
                    ctx: i
                }), this
            },
            once: function(t, e, i) {
                function n() {
                    r.off(t, n), e.apply(i, arguments)
                }
                var r = this;
                return n._ = e, this.on(t, n, i)
            },
            emit: function(t) {
                var e = [].slice.call(arguments, 1),
                    i = ((this.e || (this.e = {}))[t] || []).slice(),
                    n = 0,
                    r = i.length;
                for (n; r > n; n++) i[n].fn.apply(i[n].ctx, e);
                return this
            },
            off: function(t, e) {
                var i = this.e || (this.e = {}),
                    n = i[t],
                    r = [];
                if (n && e)
                    for (var s = 0, o = n.length; o > s; s++) n[s].fn !== e && n[s].fn._ !== e && r.push(n[s]);
                return r.length ? i[t] = r : delete i[t], this
            }
        }, e.exports = n
    }, {}],
    54: [function(t, e, i) {
        (function() {
            function t(t) {
                function e(e, i, n, r, s, o) {
                    for (; s >= 0 && o > s; s += t) {
                        var a = r ? r[s] : s;
                        n = i(n, e[a], a, e)
                    }
                    return n
                }
                return function(i, n, r, s) {
                    n = b(n, s, 4);
                    var o = !E(i) && _.keys(i),
                        a = (o || i).length,
                        u = t > 0 ? 0 : a - 1;
                    return arguments.length < 3 && (r = i[o ? o[u] : u], u += t), e(i, n, r, o, u, a)
                }
            }

            function n(t) {
                return function(e, i, n) {
                    i = w(i, n);
                    for (var r = M(e), s = t > 0 ? 0 : r - 1; s >= 0 && r > s; s += t)
                        if (i(e[s], s, e)) return s;
                    return -1
                }
            }

            function r(t, e, i) {
                return function(n, r, s) {
                    var o = 0,
                        a = M(n);
                    if ("number" == typeof s) t > 0 ? o = s >= 0 ? s : Math.max(s + a, o) : a = s >= 0 ? Math.min(s + 1, a) : s + a + 1;
                    else if (i && s && a) return s = i(n, r), n[s] === r ? s : -1;
                    if (r !== r) return s = e(f.call(n, o, a), _.isNaN), s >= 0 ? s + o : -1;
                    for (s = t > 0 ? o : a - 1; s >= 0 && a > s; s += t)
                        if (n[s] === r) return s;
                    return -1
                }
            }

            function s(t, e) {
                var i = k.length,
                    n = t.constructor,
                    r = _.isFunction(n) && n.prototype || l,
                    s = "constructor";
                for (_.has(t, s) && !_.contains(e, s) && e.push(s); i--;) s = k[i], s in t && t[s] !== r[s] && !_.contains(e, s) && e.push(s)
            }
            var o = this,
                a = o._,
                u = Array.prototype,
                l = Object.prototype,
                h = Function.prototype,
                c = u.push,
                f = u.slice,
                d = l.toString,
                p = l.hasOwnProperty,
                m = Array.isArray,
                g = Object.keys,
                v = h.bind,
                y = Object.create,
                T = function() {},
                _ = function(t) {
                    return t instanceof _ ? t : this instanceof _ ? void(this._wrapped = t) : new _(t)
                };
            "undefined" != typeof i ? ("undefined" != typeof e && e.exports && (i = e.exports = _), i._ = _) : o._ = _, _.VERSION = "1.8.3";
            var b = function(t, e, i) {
                    if (void 0 === e) return t;
                    switch (null == i ? 3 : i) {
                        case 1:
                            return function(i) {
                                return t.call(e, i)
                            };
                        case 2:
                            return function(i, n) {
                                return t.call(e, i, n)
                            };
                        case 3:
                            return function(i, n, r) {
                                return t.call(e, i, n, r)
                            };
                        case 4:
                            return function(i, n, r, s) {
                                return t.call(e, i, n, r, s)
                            }
                    }
                    return function() {
                        return t.apply(e, arguments)
                    }
                },
                w = function(t, e, i) {
                    return null == t ? _.identity : _.isFunction(t) ? b(t, e, i) : _.isObject(t) ? _.matcher(t) : _.property(t)
                };
            _.iteratee = function(t, e) {
                return w(t, e, 1 / 0)
            };
            var S = function(t, e) {
                    return function(i) {
                        var n = arguments.length;
                        if (2 > n || null == i) return i;
                        for (var r = 1; n > r; r++)
                            for (var s = arguments[r], o = t(s), a = o.length, u = 0; a > u; u++) {
                                var l = o[u];
                                e && void 0 !== i[l] || (i[l] = s[l])
                            }
                        return i
                    }
                },
                x = function(t) {
                    if (!_.isObject(t)) return {};
                    if (y) return y(t);
                    T.prototype = t;
                    var e = new T;
                    return T.prototype = null, e
                },
                P = function(t) {
                    return function(e) {
                        return null == e ? void 0 : e[t]
                    }
                },
                A = Math.pow(2, 53) - 1,
                M = P("length"),
                E = function(t) {
                    var e = M(t);
                    return "number" == typeof e && e >= 0 && A >= e
                };
            _.each = _.forEach = function(t, e, i) {
                e = b(e, i);
                var n, r;
                if (E(t))
                    for (n = 0, r = t.length; r > n; n++) e(t[n], n, t);
                else {
                    var s = _.keys(t);
                    for (n = 0, r = s.length; r > n; n++) e(t[s[n]], s[n], t)
                }
                return t
            }, _.map = _.collect = function(t, e, i) {
                e = w(e, i);
                for (var n = !E(t) && _.keys(t), r = (n || t).length, s = Array(r), o = 0; r > o; o++) {
                    var a = n ? n[o] : o;
                    s[o] = e(t[a], a, t)
                }
                return s
            }, _.reduce = _.foldl = _.inject = t(1), _.reduceRight = _.foldr = t(-1), _.find = _.detect = function(t, e, i) {
                var n;
                return n = E(t) ? _.findIndex(t, e, i) : _.findKey(t, e, i), void 0 !== n && -1 !== n ? t[n] : void 0
            }, _.filter = _.select = function(t, e, i) {
                var n = [];
                return e = w(e, i), _.each(t, function(t, i, r) {
                    e(t, i, r) && n.push(t)
                }), n
            }, _.reject = function(t, e, i) {
                return _.filter(t, _.negate(w(e)), i)
            }, _.every = _.all = function(t, e, i) {
                e = w(e, i);
                for (var n = !E(t) && _.keys(t), r = (n || t).length, s = 0; r > s; s++) {
                    var o = n ? n[s] : s;
                    if (!e(t[o], o, t)) return !1
                }
                return !0
            }, _.some = _.any = function(t, e, i) {
                e = w(e, i);
                for (var n = !E(t) && _.keys(t), r = (n || t).length, s = 0; r > s; s++) {
                    var o = n ? n[s] : s;
                    if (e(t[o], o, t)) return !0
                }
                return !1
            }, _.contains = _.includes = _.include = function(t, e, i, n) {
                return E(t) || (t = _.values(t)), ("number" != typeof i || n) && (i = 0), _.indexOf(t, e, i) >= 0
            }, _.invoke = function(t, e) {
                var i = f.call(arguments, 2),
                    n = _.isFunction(e);
                return _.map(t, function(t) {
                    var r = n ? e : t[e];
                    return null == r ? r : r.apply(t, i)
                })
            }, _.pluck = function(t, e) {
                return _.map(t, _.property(e))
            }, _.where = function(t, e) {
                return _.filter(t, _.matcher(e))
            }, _.findWhere = function(t, e) {
                return _.find(t, _.matcher(e))
            }, _.max = function(t, e, i) {
                var n, r, s = -(1 / 0),
                    o = -(1 / 0);
                if (null == e && null != t) {
                    t = E(t) ? t : _.values(t);
                    for (var a = 0, u = t.length; u > a; a++) n = t[a], n > s && (s = n)
                } else e = w(e, i), _.each(t, function(t, i, n) {
                    r = e(t, i, n), (r > o || r === -(1 / 0) && s === -(1 / 0)) && (s = t, o = r)
                });
                return s
            }, _.min = function(t, e, i) {
                var n, r, s = 1 / 0,
                    o = 1 / 0;
                if (null == e && null != t) {
                    t = E(t) ? t : _.values(t);
                    for (var a = 0, u = t.length; u > a; a++) n = t[a], s > n && (s = n)
                } else e = w(e, i), _.each(t, function(t, i, n) {
                    r = e(t, i, n), (o > r || r === 1 / 0 && s === 1 / 0) && (s = t, o = r)
                });
                return s
            }, _.shuffle = function(t) {
                for (var e, i = E(t) ? t : _.values(t), n = i.length, r = Array(n), s = 0; n > s; s++) e = _.random(0, s), e !== s && (r[s] = r[e]), r[e] = i[s];
                return r
            }, _.sample = function(t, e, i) {
                return null == e || i ? (E(t) || (t = _.values(t)), t[_.random(t.length - 1)]) : _.shuffle(t).slice(0, Math.max(0, e))
            }, _.sortBy = function(t, e, i) {
                return e = w(e, i), _.pluck(_.map(t, function(t, i, n) {
                    return {
                        value: t,
                        index: i,
                        criteria: e(t, i, n)
                    }
                }).sort(function(t, e) {
                    var i = t.criteria,
                        n = e.criteria;
                    if (i !== n) {
                        if (i > n || void 0 === i) return 1;
                        if (n > i || void 0 === n) return -1
                    }
                    return t.index - e.index
                }), "value")
            };
            var C = function(t) {
                return function(e, i, n) {
                    var r = {};
                    return i = w(i, n), _.each(e, function(n, s) {
                        var o = i(n, s, e);
                        t(r, n, o)
                    }), r
                }
            };
            _.groupBy = C(function(t, e, i) {
                _.has(t, i) ? t[i].push(e) : t[i] = [e]
            }), _.indexBy = C(function(t, e, i) {
                t[i] = e
            }), _.countBy = C(function(t, e, i) {
                _.has(t, i) ? t[i]++ : t[i] = 1
            }), _.toArray = function(t) {
                return t ? _.isArray(t) ? f.call(t) : E(t) ? _.map(t, _.identity) : _.values(t) : []
            }, _.size = function(t) {
                return null == t ? 0 : E(t) ? t.length : _.keys(t).length
            }, _.partition = function(t, e, i) {
                e = w(e, i);
                var n = [],
                    r = [];
                return _.each(t, function(t, i, s) {
                    (e(t, i, s) ? n : r).push(t)
                }), [n, r]
            }, _.first = _.head = _.take = function(t, e, i) {
                return null != t ? null == e || i ? t[0] : _.initial(t, t.length - e) : void 0
            }, _.initial = function(t, e, i) {
                return f.call(t, 0, Math.max(0, t.length - (null == e || i ? 1 : e)))
            }, _.last = function(t, e, i) {
                return null != t ? null == e || i ? t[t.length - 1] : _.rest(t, Math.max(0, t.length - e)) : void 0
            }, _.rest = _.tail = _.drop = function(t, e, i) {
                return f.call(t, null == e || i ? 1 : e)
            }, _.compact = function(t) {
                return _.filter(t, _.identity)
            };
            var O = function(t, e, i, n) {
                for (var r = [], s = 0, o = n || 0, a = M(t); a > o; o++) {
                    var u = t[o];
                    if (E(u) && (_.isArray(u) || _.isArguments(u))) {
                        e || (u = O(u, e, i));
                        var l = 0,
                            h = u.length;
                        for (r.length += h; h > l;) r[s++] = u[l++]
                    } else i || (r[s++] = u)
                }
                return r
            };
            _.flatten = function(t, e) {
                return O(t, e, !1)
            }, _.without = function(t) {
                return _.difference(t, f.call(arguments, 1))
            }, _.uniq = _.unique = function(t, e, i, n) {
                _.isBoolean(e) || (n = i, i = e, e = !1), null != i && (i = w(i, n));
                for (var r = [], s = [], o = 0, a = M(t); a > o; o++) {
                    var u = t[o],
                        l = i ? i(u, o, t) : u;
                    e ? (o && s === l || r.push(u), s = l) : i ? _.contains(s, l) || (s.push(l), r.push(u)) : _.contains(r, u) || r.push(u)
                }
                return r
            }, _.union = function() {
                return _.uniq(O(arguments, !0, !0))
            }, _.intersection = function(t) {
                for (var e = [], i = arguments.length, n = 0, r = M(t); r > n; n++) {
                    var s = t[n];
                    if (!_.contains(e, s)) {
                        for (var o = 1; i > o && _.contains(arguments[o], s); o++);
                        o === i && e.push(s)
                    }
                }
                return e
            }, _.difference = function(t) {
                var e = O(arguments, !0, !0, 1);
                return _.filter(t, function(t) {
                    return !_.contains(e, t)
                })
            }, _.zip = function() {
                return _.unzip(arguments)
            }, _.unzip = function(t) {
                for (var e = t && _.max(t, M).length || 0, i = Array(e), n = 0; e > n; n++) i[n] = _.pluck(t, n);
                return i
            }, _.object = function(t, e) {
                for (var i = {}, n = 0, r = M(t); r > n; n++) e ? i[t[n]] = e[n] : i[t[n][0]] = t[n][1];
                return i
            }, _.findIndex = n(1), _.findLastIndex = n(-1), _.sortedIndex = function(t, e, i, n) {
                i = w(i, n, 1);
                for (var r = i(e), s = 0, o = M(t); o > s;) {
                    var a = Math.floor((s + o) / 2);
                    i(t[a]) < r ? s = a + 1 : o = a
                }
                return s
            }, _.indexOf = r(1, _.findIndex, _.sortedIndex), _.lastIndexOf = r(-1, _.findLastIndex), _.range = function(t, e, i) {
                null == e && (e = t || 0, t = 0), i = i || 1;
                for (var n = Math.max(Math.ceil((e - t) / i), 0), r = Array(n), s = 0; n > s; s++, t += i) r[s] = t;
                return r
            };
            var D = function(t, e, i, n, r) {
                if (!(n instanceof e)) return t.apply(i, r);
                var s = x(t.prototype),
                    o = t.apply(s, r);
                return _.isObject(o) ? o : s
            };
            _.bind = function(t, e) {
                if (v && t.bind === v) return v.apply(t, f.call(arguments, 1));
                if (!_.isFunction(t)) throw new TypeError("Bind must be called on a function");
                var i = f.call(arguments, 2),
                    n = function() {
                        return D(t, n, e, this, i.concat(f.call(arguments)))
                    };
                return n
            }, _.partial = function(t) {
                var e = f.call(arguments, 1),
                    i = function() {
                        for (var n = 0, r = e.length, s = Array(r), o = 0; r > o; o++) s[o] = e[o] === _ ? arguments[n++] : e[o];
                        for (; n < arguments.length;) s.push(arguments[n++]);
                        return D(t, i, this, this, s)
                    };
                return i
            }, _.bindAll = function(t) {
                var e, i, n = arguments.length;
                if (1 >= n) throw new Error("bindAll must be passed function names");
                for (e = 1; n > e; e++) i = arguments[e], t[i] = _.bind(t[i], t);
                return t
            }, _.memoize = function(t, e) {
                var i = function(n) {
                    var r = i.cache,
                        s = "" + (e ? e.apply(this, arguments) : n);
                    return _.has(r, s) || (r[s] = t.apply(this, arguments)), r[s]
                };
                return i.cache = {}, i
            }, _.delay = function(t, e) {
                var i = f.call(arguments, 2);
                return setTimeout(function() {
                    return t.apply(null, i)
                }, e)
            }, _.defer = _.partial(_.delay, _, 1), _.throttle = function(t, e, i) {
                var n, r, s, o = null,
                    a = 0;
                i || (i = {});
                var u = function() {
                    a = i.leading === !1 ? 0 : _.now(), o = null, s = t.apply(n, r), o || (n = r = null)
                };
                return function() {
                    var l = _.now();
                    a || i.leading !== !1 || (a = l);
                    var h = e - (l - a);
                    return n = this, r = arguments, 0 >= h || h > e ? (o && (clearTimeout(o), o = null), a = l, s = t.apply(n, r), o || (n = r = null)) : o || i.trailing === !1 || (o = setTimeout(u, h)), s
                }
            }, _.debounce = function(t, e, i) {
                var n, r, s, o, a, u = function() {
                    var l = _.now() - o;
                    e > l && l >= 0 ? n = setTimeout(u, e - l) : (n = null, i || (a = t.apply(s, r), n || (s = r = null)))
                };
                return function() {
                    s = this, r = arguments, o = _.now();
                    var l = i && !n;
                    return n || (n = setTimeout(u, e)), l && (a = t.apply(s, r), s = r = null), a
                }
            }, _.wrap = function(t, e) {
                return _.partial(e, t)
            }, _.negate = function(t) {
                return function() {
                    return !t.apply(this, arguments)
                }
            }, _.compose = function() {
                var t = arguments,
                    e = t.length - 1;
                return function() {
                    for (var i = e, n = t[e].apply(this, arguments); i--;) n = t[i].call(this, n);
                    return n
                }
            }, _.after = function(t, e) {
                return function() {
                    return --t < 1 ? e.apply(this, arguments) : void 0
                }
            }, _.before = function(t, e) {
                var i;
                return function() {
                    return --t > 0 && (i = e.apply(this, arguments)), 1 >= t && (e = null), i
                }
            }, _.once = _.partial(_.before, 2);
            var I = !{
                    toString: null
                }.propertyIsEnumerable("toString"),
                k = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
            _.keys = function(t) {
                if (!_.isObject(t)) return [];
                if (g) return g(t);
                var e = [];
                for (var i in t) _.has(t, i) && e.push(i);
                return I && s(t, e), e
            }, _.allKeys = function(t) {
                if (!_.isObject(t)) return [];
                var e = [];
                for (var i in t) e.push(i);
                return I && s(t, e), e
            }, _.values = function(t) {
                for (var e = _.keys(t), i = e.length, n = Array(i), r = 0; i > r; r++) n[r] = t[e[r]];
                return n
            }, _.mapObject = function(t, e, i) {
                e = w(e, i);
                for (var n, r = _.keys(t), s = r.length, o = {}, a = 0; s > a; a++) n = r[a], o[n] = e(t[n], n, t);
                return o
            }, _.pairs = function(t) {
                for (var e = _.keys(t), i = e.length, n = Array(i), r = 0; i > r; r++) n[r] = [e[r], t[e[r]]];
                return n
            }, _.invert = function(t) {
                for (var e = {}, i = _.keys(t), n = 0, r = i.length; r > n; n++) e[t[i[n]]] = i[n];
                return e
            }, _.functions = _.methods = function(t) {
                var e = [];
                for (var i in t) _.isFunction(t[i]) && e.push(i);
                return e.sort()
            }, _.extend = S(_.allKeys), _.extendOwn = _.assign = S(_.keys), _.findKey = function(t, e, i) {
                e = w(e, i);
                for (var n, r = _.keys(t), s = 0, o = r.length; o > s; s++)
                    if (n = r[s], e(t[n], n, t)) return n
            }, _.pick = function(t, e, i) {
                var n, r, s = {},
                    o = t;
                if (null == o) return s;
                _.isFunction(e) ? (r = _.allKeys(o), n = b(e, i)) : (r = O(arguments, !1, !1, 1), n = function(t, e, i) {
                    return e in i
                }, o = Object(o));
                for (var a = 0, u = r.length; u > a; a++) {
                    var l = r[a],
                        h = o[l];
                    n(h, l, o) && (s[l] = h)
                }
                return s
            }, _.omit = function(t, e, i) {
                if (_.isFunction(e)) e = _.negate(e);
                else {
                    var n = _.map(O(arguments, !1, !1, 1), String);
                    e = function(t, e) {
                        return !_.contains(n, e)
                    }
                }
                return _.pick(t, e, i)
            }, _.defaults = S(_.allKeys, !0), _.create = function(t, e) {
                var i = x(t);
                return e && _.extendOwn(i, e), i
            }, _.clone = function(t) {
                return _.isObject(t) ? _.isArray(t) ? t.slice() : _.extend({}, t) : t
            }, _.tap = function(t, e) {
                return e(t), t
            }, _.isMatch = function(t, e) {
                var i = _.keys(e),
                    n = i.length;
                if (null == t) return !n;
                for (var r = Object(t), s = 0; n > s; s++) {
                    var o = i[s];
                    if (e[o] !== r[o] || !(o in r)) return !1
                }
                return !0
            };
            var G = function(t, e, i, n) {
                if (t === e) return 0 !== t || 1 / t === 1 / e;
                if (null == t || null == e) return t === e;
                t instanceof _ && (t = t._wrapped), e instanceof _ && (e = e._wrapped);
                var r = d.call(t);
                if (r !== d.call(e)) return !1;
                switch (r) {
                    case "[object RegExp]":
                    case "[object String]":
                        return "" + t == "" + e;
                    case "[object Number]":
                        return +t !== +t ? +e !== +e : 0 === +t ? 1 / +t === 1 / e : +t === +e;
                    case "[object Date]":
                    case "[object Boolean]":
                        return +t === +e
                }
                var s = "[object Array]" === r;
                if (!s) {
                    if ("object" != typeof t || "object" != typeof e) return !1;
                    var o = t.constructor,
                        a = e.constructor;
                    if (o !== a && !(_.isFunction(o) && o instanceof o && _.isFunction(a) && a instanceof a) && "constructor" in t && "constructor" in e) return !1
                }
                i = i || [], n = n || [];
                for (var u = i.length; u--;)
                    if (i[u] === t) return n[u] === e;
                if (i.push(t), n.push(e), s) {
                    if (u = t.length, u !== e.length) return !1;
                    for (; u--;)
                        if (!G(t[u], e[u], i, n)) return !1
                } else {
                    var l, h = _.keys(t);
                    if (u = h.length, _.keys(e).length !== u) return !1;
                    for (; u--;)
                        if (l = h[u], !_.has(e, l) || !G(t[l], e[l], i, n)) return !1
                }
                return i.pop(), n.pop(), !0
            };
            _.isEqual = function(t, e) {
                return G(t, e)
            }, _.isEmpty = function(t) {
                return null == t ? !0 : E(t) && (_.isArray(t) || _.isString(t) || _.isArguments(t)) ? 0 === t.length : 0 === _.keys(t).length
            }, _.isElement = function(t) {
                return !(!t || 1 !== t.nodeType)
            }, _.isArray = m || function(t) {
                return "[object Array]" === d.call(t)
            }, _.isObject = function(t) {
                var e = typeof t;
                return "function" === e || "object" === e && !!t
            }, _.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(t) {
                _["is" + t] = function(e) {
                    return d.call(e) === "[object " + t + "]"
                }
            }), _.isArguments(arguments) || (_.isArguments = function(t) {
                return _.has(t, "callee")
            }), "function" != typeof /./ && "object" != typeof Int8Array && (_.isFunction = function(t) {
                return "function" == typeof t || !1
            }), _.isFinite = function(t) {
                return isFinite(t) && !isNaN(parseFloat(t))
            }, _.isNaN = function(t) {
                return _.isNumber(t) && t !== +t
            }, _.isBoolean = function(t) {
                return t === !0 || t === !1 || "[object Boolean]" === d.call(t)
            }, _.isNull = function(t) {
                return null === t
            }, _.isUndefined = function(t) {
                return void 0 === t
            }, _.has = function(t, e) {
                return null != t && p.call(t, e)
            }, _.noConflict = function() {
                return o._ = a, this
            }, _.identity = function(t) {
                return t
            }, _.constant = function(t) {
                return function() {
                    return t
                }
            }, _.noop = function() {}, _.property = P, _.propertyOf = function(t) {
                return null == t ? function() {} : function(e) {
                    return t[e]
                }
            }, _.matcher = _.matches = function(t) {
                return t = _.extendOwn({}, t),
                    function(e) {
                        return _.isMatch(e, t)
                    }
            }, _.times = function(t, e, i) {
                var n = Array(Math.max(0, t));
                e = b(e, i, 1);
                for (var r = 0; t > r; r++) n[r] = e(r);
                return n
            }, _.random = function(t, e) {
                return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
            }, _.now = Date.now || function() {
                return (new Date).getTime()
            };
            var R = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                },
                B = _.invert(R),
                H = function(t) {
                    var e = function(e) {
                            return t[e]
                        },
                        i = "(?:" + _.keys(t).join("|") + ")",
                        n = RegExp(i),
                        r = RegExp(i, "g");
                    return function(t) {
                        return t = null == t ? "" : "" + t, n.test(t) ? t.replace(r, e) : t
                    }
                };
            _.escape = H(R), _.unescape = H(B), _.result = function(t, e, i) {
                var n = null == t ? void 0 : t[e];
                return void 0 === n && (n = i), _.isFunction(n) ? n.call(t) : n
            };
            var L = 0;
            _.uniqueId = function(t) {
                var e = ++L + "";
                return t ? t + e : e
            }, _.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
            var N = /(.)^/,
                j = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                },
                F = /\\|'|\r|\n|\u2028|\u2029/g,
                X = function(t) {
                    return "\\" + j[t]
                };
            _.template = function(t, e, i) {
                !e && i && (e = i), e = _.defaults({}, e, _.templateSettings);
                var n = RegExp([(e.escape || N).source, (e.interpolate || N).source, (e.evaluate || N).source].join("|") + "|$", "g"),
                    r = 0,
                    s = "__p+='";
                t.replace(n, function(e, i, n, o, a) {
                    return s += t.slice(r, a).replace(F, X), r = a + e.length, i ? s += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'" : n ? s += "'+\n((__t=(" + n + "))==null?'':__t)+\n'" : o && (s += "';\n" + o + "\n__p+='"), e
                }), s += "';\n", e.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
                try {
                    var o = new Function(e.variable || "obj", "_", s)
                } catch (a) {
                    throw a.source = s, a
                }
                var u = function(t) {
                        return o.call(this, t, _)
                    },
                    l = e.variable || "obj";
                return u.source = "function(" + l + "){\n" + s + "}", u
            }, _.chain = function(t) {
                var e = _(t);
                return e._chain = !0, e
            };
            var V = function(t, e) {
                return t._chain ? _(e).chain() : e
            };
            _.mixin = function(t) {
                _.each(_.functions(t), function(e) {
                    var i = _[e] = t[e];
                    _.prototype[e] = function() {
                        var t = [this._wrapped];
                        return c.apply(t, arguments), V(this, i.apply(_, t))
                    }
                })
            }, _.mixin(_), _.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
                var e = u[t];
                _.prototype[t] = function() {
                    var i = this._wrapped;
                    return e.apply(i, arguments), "shift" !== t && "splice" !== t || 0 !== i.length || delete i[0], V(this, i)
                }
            }), _.each(["concat", "join", "slice"], function(t) {
                var e = u[t];
                _.prototype[t] = function() {
                    return V(this, e.apply(this._wrapped, arguments))
                }
            }), _.prototype.value = function() {
                return this._wrapped
            }, _.prototype.valueOf = _.prototype.toJSON = _.prototype.value, _.prototype.toString = function() {
                return "" + this._wrapped
            }, "function" == typeof define && define.amd && define("underscore", [], function() {
                return _
            })
        }).call(this)
    }, {}],
    55: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return JSON.parse(JSON.stringify(t))
        }
    }, {}],
    56: [function(t, e, i) {
        "use strict";

        function n(t) {
            u(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"), this.options = r(t || {}, {
                mouseMultiplier: 1,
                touchMultiplier: 2,
                firefoxMultiplier: 15,
                keyStep: 120,
                preventTouch: !1,
                unpreventTouchClass: "vs-touchmove-allowed",
                limitInertia: !1,
                lethargyOptions: {
                    stability: 7,
                    sensitivity: 100,
                    tolerance: .05,
                    delay: 0
                }
            }), this.options.limitInertia && (this._lethargy = new o(this.options.lethargyOptions.stability, this.options.lethargyOptions.sensitivity, this.options.lethargyOptions.tolerance, this.options.lethargyOptions.delay)), this._emitter = new s, this._event = {
                y: 0,
                x: 0,
                deltaX: 0,
                deltaY: 0
            }, this.touchStartX = null, this.touchStartY = null, this.bodyTouchAction = null
        }
        var r = t("defaults"),
            s = t("tiny-emitter"),
            o = t("lethargy").Lethargy,
            a = t("./support"),
            u = (t("./clone"), t("bindall-standalone")),
            l = "virtualscroll";
        e.exports = n;
        var h = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };
        n.prototype._notify = function(t) {
            var e = this._event;
            e.x += e.deltaX, e.y += e.deltaY, this._emitter.emit(l, {
                x: e.x,
                y: e.y,
                deltaX: e.deltaX,
                deltaY: e.deltaY,
                originalEvent: t
            })
        }, n.prototype._onWheel = function(t) {
            var e = this.options;
            if (!this._lethargy || this._lethargy.check(t) !== !1) {
                var i = this._event;
                i.deltaX = t.wheelDeltaX || -1 * t.deltaX, i.deltaY = t.wheelDeltaY || -1 * t.deltaY, a.isFirefox && 1 == t.deltaMode && (i.deltaX *= e.firefoxMultiplier, i.deltaY *= e.firefoxMultiplier), i.deltaX *= e.mouseMultiplier, i.deltaY *= e.mouseMultiplier, this._notify(t)
            }
        }, n.prototype._onMouseWheel = function(t) {
            if (!this.options.limitInertia || this._lethargy.check(t) !== !1) {
                var e = this._event;
                e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0, e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta, this._notify(t)
            }
        }, n.prototype._onTouchStart = function(t) {
            var e = t.targetTouches ? t.targetTouches[0] : t;
            this.touchStartX = e.pageX, this.touchStartY = e.pageY
        }, n.prototype._onTouchMove = function(t) {
            var e = this.options;
            e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
            var i = this._event,
                n = t.targetTouches ? t.targetTouches[0] : t;
            i.deltaX = (n.pageX - this.touchStartX) * e.touchMultiplier, i.deltaY = (n.pageY - this.touchStartY) * e.touchMultiplier, this.touchStartX = n.pageX, this.touchStartY = n.pageY, this._notify(t)
        }, n.prototype._onKeyDown = function(t) {
            var e = this._event;
            switch (e.deltaX = e.deltaY = 0, t.keyCode) {
                case h.LEFT:
                case h.UP:
                    e.deltaY = this.options.keyStep;
                    break;
                case h.RIGHT:
                case h.DOWN:
                    e.deltaY = -this.options.keyStep;
                    break;
                default:
                    return
            }
            this._notify(t)
        }, n.prototype._bind = function() {
            a.hasWheelEvent && document.addEventListener("wheel", this._onWheel), a.hasMouseWheelEvent && document.addEventListener("mousewheel", this._onMouseWheel), a.hasTouch && (document.addEventListener("touchstart", this._onTouchStart), document.addEventListener("touchmove", this._onTouchMove)), a.hasPointer && a.hasTouchWin && (this.bodyTouchAction = document.body.style.msTouchAction, document.body.style.msTouchAction = "none", document.addEventListener("MSPointerDown", this._onTouchStart, !0), document.addEventListener("MSPointerMove", this._onTouchMove, !0)), a.hasKeyDown && document.addEventListener("keydown", this._onKeyDown)
        }, n.prototype._unbind = function() {
            a.hasWheelEvent && document.removeEventListener("wheel", this._onWheel), a.hasMouseWheelEvent && document.removeEventListener("mousewheel", this._onMouseWheel), a.hasTouch && (document.removeEventListener("touchstart", this._onTouchStart), document.removeEventListener("touchmove", this._onTouchMove)), a.hasPointer && a.hasTouchWin && (document.body.style.msTouchAction = this.bodyTouchAction, document.removeEventListener("MSPointerDown", this._onTouchStart, !0), document.removeEventListener("MSPointerMove", this._onTouchMove, !0)), a.hasKeyDown && document.removeEventListener("keydown", this._onKeyDown)
        }, n.prototype.on = function(t, e) {
            this._emitter.on(l, t, e);
            var i = this._emitter.e;
            i && i[l] && 1 === i[l].length && this._bind()
        }, n.prototype.off = function(t, e) {
            this._emitter.off(l, t, e);
            var i = this._emitter.e;
            (!i[l] || i[l].length <= 0) && this._unbind()
        }, n.prototype.reset = function() {
            var t = this._event;
            t.x = 0, t.y = 0
        }, n.prototype.destroy = function() {
            this._emitter.off(), this._unbind()
        }
    }, {
        "./clone": 55,
        "./support": 57,
        "bindall-standalone": 21,
        defaults: 31,
        lethargy: 47,
        "tiny-emitter": 53
    }],
    57: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            return {
                hasWheelEvent: "onwheel" in document,
                hasMouseWheelEvent: "onmousewheel" in document,
                hasTouch: "ontouchstart" in document,
                hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
                hasPointer: !!window.navigator.msPointerEnabled,
                hasKeyDown: "onkeydown" in document,
                isFirefox: navigator.userAgent.indexOf("Firefox") > -1
            }
        }()
    }, {}]
}, {}, [8]);