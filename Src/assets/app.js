$(document).ready(function () {
    configToggleMenu();
    configLoadmore();
    setupCustomSelect();
    configHorizontalScrollList();
    setShowImageEvent();

    const header = $("#header");
    const logo = $("#logo");
    const isHome = window.location.pathname === "/";
    window.addEventListener("scroll", (e) => {
        if (scrollY > 80) {
            if (!header.hasClass("menu-fixed")) {
                header.addClass("menu-fixed");
                if (isHome) {
                    logo.attr(
                        "src",
                        "/wp-content/themes/dvfacebook/assets/img/logo.svg"
                    );
                }
            }
        } else {
            if (header.hasClass("menu-fixed")) {
                header.removeClass("menu-fixed");
                if (isHome) {
                    logo.attr(
                        "src",
                        "/wp-content/themes/dvfacebook/assets/img/logo_white.svg"
                    );
                }
            }
        }
    });

    let currentSubMenu = null;
    $(".next-menu").on("click", function () {
        currentSubMenu = $(this).next();
        $(currentSubMenu).addClass("open-submenu");
        $("#transit-menu").addClass("transform-left");
    });
    $("#back-menu").on("click", function () {
        $(currentSubMenu).removeClass("open-submenu");
        $("#transit-menu").removeClass("transform-left");
    });

    setupZalo();
});

function setupZalo() {
    $("#btnZalo").hover(
        () => {
            $("#qrModal").addClass("!flex");
        },
        () => {
            $("#qrModal").removeClass("!flex");
        }
    );
    $("#btnZalo").click(() => {
        $("#qrModal").toggleClass("!flex");
    });

    const qrModal = document.getElementById("qrModal");
    const zaloPhone = document.getElementById("zaloPhone");

    if (!qrModal) return;
    qrModal.addEventListener("touchstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.target === zaloPhone) {
            const phone = e.target.innerText;
            navigator.clipboard.writeText(phone);
            alert("Đã copy số điện thoại: " + phone);
        }

        qrModal.classList.remove("!flex");
    });

    $("#btnCloseZalo").click((e) => {
        $("#qrModal").removeClass("!flex");
    });
}

function setShowImageEvent() {
    const modal = $("#modalImage");
    const modalImg = $("#modalImageContent");
    const captionText = $("#modalImageCaption");

    $(".show-img").on("click", function () {
        $(modal).css("display", "block");

        const src = $(this).attr("src");
        $(modalImg).attr("src", src);
        const alt = $(this).attr("alt");
        $(captionText).html(alt);
    });

    $(modal).on("click", function () {
        $(this).css("display", "none");
    });

    $("#modalImage .close").on("click", function () {
        $(modal).css("display", "none");
    });
}

function configToggleMenu() {
    const toggleMenuButton = document.getElementById("toggleMenuButton");
    toggleMenuButton?.addEventListener("click", () => {
        const headerMenuMb = document.getElementById("header-menu-mb-wrapper");
        const toggleMenuButtonIcon = document.getElementById(
            "toggleMenuButtonIcon"
        );
        headerMenuMb.classList.toggle("hidden");
        headerMenuMb.classList.toggle("open-mb");
        toggleMenuButtonIcon.classList.toggle("open");
    });

    document.getElementById("header-menu").addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

function configHorizontalScrollList() {
    $(".scroll-horizontal-wrapper .arrow.next").click(function (event) {
        const list = $($(this).prev().prev());
        list.stop().animate({ scrollLeft: list.scrollLeft() + 600 }, 500);
        event.preventDefault();
    });
    $(".scroll-horizontal-wrapper .arrow.prev").click(function (event) {
        const list = $($(this).prev());
        list.stop().animate({ scrollLeft: list.scrollLeft() - 600 }, 500);
        event.preventDefault();
    });

    checkHorizontalScrollListItems(".list-evidence");
    checkHorizontalScrollListItems(".list-customer");
}

function checkHorizontalScrollListItems(wrapperClassName) {
    const total = $(wrapperClassName).data("total");
    if (total < 4) {
        $(`${wrapperClassName} .prev`).addClass("d-none");
        $(`${wrapperClassName} .next`).addClass("d-none");
    }
}

/**
 * the w3 school custom select
 */
function setupCustomSelect() {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /*when an item is clicked, update the original select box,
        and the selected item:*/
                var y, i, k, s, h, sl, yl;
                s =
                    this.parentNode.parentNode.getElementsByTagName(
                        "select"
                    )[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y =
                            this.parentNode.getElementsByClassName(
                                "same-as-selected"
                            );
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
  except the current select box:*/
        var x,
            y,
            i,
            xl,
            yl,
            arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
}

function configLoadmore() {
    const btnLoadmore = document.getElementById("btnLoadmore");
    const listPost = document.getElementById("listPost");
    if (!btnLoadmore || !listPost) return;

    btnLoadmore.addEventListener("click", (e) => {
        e.preventDefault();
        btnLoadmore.innerHTML = "Đang tải...";
        btnLoadmore.setAttribute("disabled", "disabled");
        const http = new XMLHttpRequest();

        let { cate, offset, limit, admin } = listPost.dataset;
        const url = admin || "/admin-ajax.php";

        let data = "";
        data = data + "action=loadmore_post_ajax";
        data = data + "&" + "cate=" + cate;
        data = data + "&" + "offset=" + parseInt(offset);
        data = data + "&" + "limit=" + parseInt(limit);
        http.open("POST", url, true);
        http.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
        );
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                const rs = JSON.parse(this.responseText);
                if (rs.success) {
                    if (rs.data.posts.length > 0) {
                        btnLoadmore.innerHTML = `Xem thêm`;
                        btnLoadmore.removeAttribute("disabled");
                        rs.data.posts.forEach(function (post) {
                            const row = `
                            <a class="flex md:flex-row flex-col rounded-md drop-shadow-md bg-white p-4" href="${post.url}">
                                ${post.thumbnail}
                                <div class="flex flex-col md:ml-2 md:mt-0 mt-1">
                                    <div class="post-datetime mb-1 italic text-xs">
                                        Cách đây ${post.time}
                                    </div>
                                    <h3 class="my-0 font-bold">${post.title}</h3>
                                    <div class="mt-1 text-sm line-clamp-3">${post.excerpt}</div>
                                </div>
                            </a>
                            `;
                            listPost.innerHTML += row;
                        });
                        listPost.setAttribute("data-offset", rs.data.offset);
                        if (parseInt(rs.data.posts.length) < parseInt(limit)) {
                            btnLoadmore.innerHTML = "Không còn bài nào!";
                            btnLoadmore.setAttribute("disabled", "disabled");
                        }
                    } else {
                        btnLoadmore.innerHTML = "Không còn bài nào!";
                        btnLoadmore.setAttribute("disabled", "disabled");
                    }
                }
            }
        };
        http.send(data);
    });
}
