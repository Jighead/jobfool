var App = function() {
    function e() {
        jQuery(window).scroll(function() {
            jQuery(window).scrollTop() > 100 ? jQuery(".header-fixed .header-sticky").addClass("header-fixed-shrink") : jQuery(".header-fixed .header-sticky").removeClass("header-fixed-shrink")
        })
    }

    function o() {
        jQuery(document).on("click", ".mega-menu .dropdown-menu", function(e) {
            e.stopPropagation()
        })
    }

    function i() {
        jQuery(".search").on("click", function() {
            jQuery(".search-btn").hasClass("fa-search") ? (jQuery(".search-open").fadeIn(500), jQuery(".search-btn").removeClass("fa-search"), jQuery(".search-btn").addClass("fa-times")) : (jQuery(".search-open").fadeOut(500), jQuery(".search-btn").addClass("fa-search"), jQuery(".search-btn").removeClass("fa-times"))
        })
    }

    function r() {
        jQuery(".header-v5 .search-button").click(function() {
            jQuery(".header-v5 .search-open").slideDown()
        }), jQuery(".header-v5 .search-close").click(function() {
            jQuery(".header-v5 .search-open").slideUp()
        }), jQuery(window).scroll(function() {
            jQuery(this).scrollTop() > 1 && jQuery(".header-v5 .search-open").fadeOut("fast")
        })
    }

    function t() {
        $(".blog-topbar .search-btn").on("click", function() {
            jQuery(".topbar-search-block").hasClass("topbar-search-visible") ? (jQuery(".topbar-search-block").slideUp(), jQuery(".topbar-search-block").removeClass("topbar-search-visible")) : (jQuery(".topbar-search-block").slideDown(), jQuery(".topbar-search-block").addClass("topbar-search-visible"))
        }), $(".blog-topbar .search-close").on("click", function() {
            jQuery(".topbar-search-block").slideUp(), jQuery(".topbar-search-block").removeClass("topbar-search-visible")
        }), jQuery(window).scroll(function() {
            jQuery(".topbar-search-block").slideUp(), jQuery(".topbar-search-block").removeClass("topbar-search-visible")
        })
    }

    function n() {
        $(".topbar-toggler").on("click", function() {
            jQuery(".topbar-toggler").hasClass("topbar-list-visible") ? (jQuery(".topbar-menu").slideUp(), jQuery(this).removeClass("topbar-list-visible")) : (jQuery(".topbar-menu").slideDown(), jQuery(this).addClass("topbar-list-visible"))
        })
    }

    function s() {
        $(".topbar-list > li").on("click", function(e) {
            jQuery(this).children("ul").hasClass("topbar-dropdown") && (jQuery(this).children("ul").hasClass("topbar-dropdown-visible") ? (jQuery(this).children(".topbar-dropdown").slideUp(), jQuery(this).children(".topbar-dropdown").removeClass("topbar-dropdown-visible")) : (jQuery(this).children(".topbar-dropdown").slideDown(), jQuery(this).children(".topbar-dropdown").addClass("topbar-dropdown-visible")))
        })
    }

    function a() {
        jQuery(".list-toggle").on("click", function() {
            jQuery(this).toggleClass("active")
        })
    }

    function l() {
        var e = function() {
            $(".equal-height-columns").each(function() {
                heights = [], $(".equal-height-column", this).each(function() {
                    $(this).removeAttr("style"), heights.push($(this).height())
                }), $(".equal-height-column", this).height(Math.max.apply(Math, heights))
            })
        };
        e(), $(window).resize(function() {
            e()
        }), $(window).load(function() {
            e()
        })
    }

    function u() {
        var e = function() {
            $(".equal-height-columns-v2").each(function() {
                var e = [];
                $(".equal-height-column-v2", this).each(function() {
                    $(this).removeAttr("style"), e.push($(this).height())
                }), $(".equal-height-column-v2", this).height(Math.max.apply(Math, e)), $(".equal-height-column-v2", this).each(function() {
                    $(this).hasAttr("data-image-src") && $(this).css("background", "url(" + $(this).attr("data-image-src") + ") no-repeat scroll 50% 0 / cover")
                })
            })
        };
        $(".equal-height-columns-v2").ready(function() {
            e()
        }), $(window).resize(function() {
            e()
        })
    }

    function h() {
        $(".hoverSelector").on("click", function(e) {
            jQuery(this).children("ul").hasClass("languages") && (jQuery(this).children("ul").hasClass("languages-visible") ? (jQuery(this).children(".languages").slideUp(), jQuery(this).children(".languages").removeClass("languages-visible")) : (jQuery(this).children(".languages").slideDown(), jQuery(this).children(".languages").addClass("languages-visible")))
        })
    }

    function c() {
        jQuery(".carousel").carousel({
            interval: 15e3,
            pause: "hover"
        }), jQuery(".tooltips").tooltip(), jQuery(".tooltips-show").tooltip("show"), jQuery(".tooltips-hide").tooltip("hide"), jQuery(".tooltips-toggle").tooltip("toggle"), jQuery(".tooltips-destroy").tooltip("destroy"), jQuery(".popovers").popover(), jQuery(".popovers-show").popover("show"), jQuery(".popovers-hide").popover("hide"), jQuery(".popovers-toggle").popover("toggle"), jQuery(".popovers-destroy").popover("destroy")
    }
    $.fn.hasAttr = function(e) {
        return void 0 !== this.attr(e)
    };
    var d = function() {
            var e = $(window).height(),
                o = 0;
            o = $(document.body).hasClass("promo-padding-top") ? $(".header").height() : 0, $(".fullheight").css("height", e - o), $(window).resize(function() {
                var e = $(window).height();
                $(".fullheight").css("height", e - o)
            })
        },
        p = function() {
            $(".valign__middle").each(function() {
                $(this).css("padding-top", $(this).parent().height() / 2 - $(this).height() / 2)
            }), $(window).resize(function() {
                $(".valign__middle").each(function() {
                    $(this).css("padding-top", $(this).parent().height() / 2 - $(this).height() / 2)
                })
            })
        };
    return {
        init: function() {
            c(), i(), r(), t(), n(), s(), a(), e(), o(), h(), d(), p(), l(), u()
        },
        initCounter: function() {
            jQuery(".counter").counterUp({
                delay: 10,
                time: 1e3
            })
        },
        initParallaxBg: function() {
            jQuery(window).load(function() {
                jQuery(".parallaxBg").parallax("50%", .2), jQuery(".parallaxBg1").parallax("50%", .4)
            })
        },
        initScrollBar: function() {
            jQuery(".mCustomScrollbar").mCustomScrollbar({
                theme: "minimal",
                scrollInertia: 200,
                scrollEasing: "linear"
            })
        },
        initSidebarMenuDropdown: function() {
            function e() {
                jQuery(".header-v7 .dropdown-toggle").on("click", function() {
                    jQuery(".header-v7 .dropdown-menu").stop(!0, !1).slideUp(), jQuery(".header-v7 .dropdown").removeClass("open"), 1 == jQuery(this).siblings(".dropdown-menu").is(":hidden") && (jQuery(this).siblings(".dropdown-menu").stop(!0, !1).slideDown(), jQuery(this).parents(".dropdown").addClass("open"))
                })
            }
            e()
        },
        initAnimateDropdown: function() {
            function e() {
                jQuery(".dropdown").on("show.bs.dropdown", function() {
                    jQuery(this).find(".dropdown-menu").first().stop(!0, !0).slideDown()
                }), jQuery(".dropdown").on("hide.bs.dropdown", function() {
                    jQuery(this).find(".dropdown-menu").first().stop(!0, !0).slideUp()
                })
            }
            jQuery(window).resize(function() {
                jQuery(window).width() > 768 && e()
            }), jQuery(window).width() > 768 && e()
        },
        offCanvas: function() {
            $('[data-toggle="offcanvas"]').click(function() {
                $(".row-offcanvas").toggleClass("active")
            })
        }
    }
}();