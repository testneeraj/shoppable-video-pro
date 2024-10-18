$(document).ready(function () {
    var slider = document.getElementsByClassName("story__slider");

    var lastVideoTime = 0;
    var lastSlideIndex = 0;

    // When modal shows
    $("#videoModal").on("show.bs.modal", function (e) {
        // Set video duration
        const videos = document.querySelectorAll(".story__slide video");
        videos.forEach((video) => {
            $(video)
                .parent(".story__slide")
                .attr("data-swiper-autoplay", video.duration * 1000);
        });

        slider = new Swiper(".story__slider", {
            speed: 1,
            watchSlidesProgress: true,
            slidesPerView: 1,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                stopOnLastSlide: true,
            },
            navigation: {
                nextEl: ".story__next",
                prevEl: ".story__prev",
            },
            pagination: {
                el: ".story__pagination",
                renderBullet: function (index, className) {
                    return '<div class="' + className + '"><div class="swiper-pagination-progress"></div> </div>';
                },
            },
            on: {
                autoplayTimeLeft(swiper, time, progress) {
                    let currentSlide = document.querySelectorAll(".story__slider .swiper-slide")[swiper.activeIndex];
                    let currentBullet = document.querySelectorAll(".story__slider .swiper-pagination-progress")[swiper.realIndex];
                    let fullTime = currentSlide.dataset.swiperAutoplay
                        ? parseInt(currentSlide.dataset.swiperAutoplay)
                        : swiper.params.autoplay.delay;

                    let percentage =
                        Math.min(Math.max(parseFloat((((fullTime - time) * 100) / fullTime).toFixed(1)), 0), 100) + "%";

                    gsap.set(currentBullet, {width: percentage});
                },
                transitionEnd(swiper) {
                    let allBullets = $(".story__slider .swiper-pagination-progress");
                    let bulletsBefore = allBullets.slice(0, swiper.realIndex);
                    let bulletsAfter = allBullets.slice(swiper.realIndex, allBullets.length);
                    if (bulletsBefore.length) {
                        gsap.set(bulletsBefore, {width: "100%"});
                    }
                    if (bulletsAfter.length) {
                        gsap.set(bulletsAfter, {width: "0%"});
                    }

                    let activeSlide = document.querySelectorAll(".story__slider .swiper-slide")[swiper.realIndex];
                    if (activeSlide.querySelector("video")) {
                        activeSlide.querySelector("video").currentTime = 0;
                    }
                },
                slideChange: function (swiper) {
                    // Pause the video of the previous slide
                    let previousSlide = document.querySelectorAll(".story__slider .swiper-slide")[swiper.previousIndex];
                    if (previousSlide.querySelector("video")) {
                        previousSlide.querySelector("video").pause();
                    }

                    // Play or reset the video of the active slide if needed
                    let activeSlide = document.querySelectorAll(".story__slider .swiper-slide")[swiper.activeIndex];
                    if (activeSlide.querySelector("video")) {
                        activeSlide.querySelector("video").play(); // Optional: auto-play the video
                    }
                },
            },
        });

        // setTimeout(function () {
        // 	$("#userComment").focus();
        // }, 300);

        slider.init();
    });

    $("#videoModal").on("hidden.bs.modal", function (e) {
        // slider.update();
        // var $invoker = $(e.relatedTarget);
        // slider.slideTo($invoker.data("slider"));
        // slider.update();

        if (slider) {
            slider.destroy();
        }
        $("#userComment").val("");
        $(".story__modal").removeClass("full-height-popup");
        $(".story__prev").removeClass("active-popup");
        $(".story__next").removeClass("active-popup");

        $('.story__product-popup-cta').addClass("active");
        $('.story__product-popup').addClass('active');
        closeStoryPopup();
    });

    function openProductLandingPopup() {
        $(".products__landing-wrapper").addClass("active");
        $(".products").addClass("hide");
    }

    function closeProductLandingPopup() {
        $(".products__landing-wrapper").removeClass("active");
        $(".products").removeClass("hide");
        $(".search-input").val("");
        closeSearchBar();
    }

    function openProductLandingSinglePopup() {
        $(".products__single-wrapper").addClass("active");
    }

    function closeProductLandingSinglePopup() {
        $(".products__single-wrapper").removeClass("active");
    }

    function openProductSinglePopup() {
        $(".products__single-wrapper").addClass("active");
        $(".products").addClass("hide");
    }

    function closeProductSinglePopup() {
        $(".products__single-wrapper").removeClass("active");
        $(".products").removeClass("hide");
    }

    function openSearchBar() {
        $(".search__bar-wrapper").addClass("active");
        $(".search-icon").addClass("hide");
    }

    function closeSearchBar() {
        $(".search__bar-wrapper").removeClass("active");
        $(".search-icon").removeClass("hide");
    }

    // Open All Product popup
    $(".link-all-products").click(function () {
        openProductLandingPopup();
    });

    // Close All Product popup
    $(".products__landing .back-link").click(function () {
        closeProductLandingPopup();
    });

    // Open Single Product popup from landing popup
    $(".open-landing-product").click(function () {
        openProductLandingSinglePopup();
    });

    // Close Single Product popup from landing popup
    $(".products__single .back-link").click(function () {
        closeProductLandingSinglePopup();
    });

    // Open Single Product popup from stacked imgs
    $(".products__wrapper-stacked").click(function () {
        openProductSinglePopup();
    });

    // Close Single Product popup from stacked imgs
    $(".products__single .back-link").click(function () {
        closeProductSinglePopup();
        openProductLandingPopup();
    });

    // Open Searchbar
    $(".search-icon").click(function () {
        openSearchBar();
    });

    // Close Searchbar
    $(".btn-search-close").click(function () {
        closeSearchBar();
        $(".search-input").val("");
    });

    // Quantity Input
    var QtyInput = (function () {
        var $qtyInputs = $(".qty-input");

        if (!$qtyInputs.length) {
            return;
        }

        var $inputs = $qtyInputs.find(".product-qty");
        var $countBtn = $qtyInputs.find(".qty-count");
        var qtyMin = parseInt($inputs.attr("min"));
        var qtyMax = parseInt($inputs.attr("max"));

        $inputs.change(function () {
            var $this = $(this);
            var $minusBtn = $this.siblings(".qty-count--minus");
            var $addBtn = $this.siblings(".qty-count--add");
            var qty = parseInt($this.val());

            if (isNaN(qty) || qty <= qtyMin) {
                $this.val(qtyMin);
                $minusBtn.attr("disabled", true);
            } else {
                $minusBtn.attr("disabled", false);

                if (qty >= qtyMax) {
                    $this.val(qtyMax);
                    $addBtn.attr("disabled", true);
                } else {
                    $this.val(qty);
                    $addBtn.attr("disabled", false);
                }
            }
        });

        $countBtn.click(function () {
            var operator = this.dataset.action;
            var $this = $(this);
            var $input = $this.siblings(".product-qty");
            var qty = parseInt($input.val());

            if (operator == "add") {
                qty += 1;
                if (qty >= qtyMin + 1) {
                    $this.siblings(".qty-count--minus").attr("disabled", false);
                }

                if (qty >= qtyMax) {
                    $this.attr("disabled", true);
                }
            } else {
                qty = qty <= qtyMin ? qtyMin : (qty -= 1);

                if (qty == qtyMin) {
                    $this.attr("disabled", true);
                }

                if (qty < qtyMax) {
                    $this.siblings(".qty-count--add").attr("disabled", false);
                }
            }

            $input.val(qty);
        });
    })();





    // Story slider - Product popup
    $('.story__product-popup-cta').on('click', function () {
        $(this).toggleClass('active');
        $(this).next('.story__product-popup').toggleClass('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Mute Button Click Handler
    const muteButton = document.querySelector('.action-btn--mute');
    const videos = document.querySelectorAll('video');
    const shareButton = document.querySelector('.action-btn--share');
    const shareNavigator = document.querySelector('.share-navigator');
    const shareFacebook = document.querySelector('.share-btn--facebook');
    const shareTwitter = document.querySelector('.share-btn--twitter');
    const shareEmail = document.querySelector('.share-btn--email');
    const videoUrl = "<?php echo get_permalink($post->ID); ?>";

    if (muteButton) {
        muteButton.addEventListener('click', function (e) {
            e.preventDefault();
            videos.forEach(video => {
                video.muted = !video.muted;
            });
            if (videos[0].muted) {
                muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            } else {
                muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            }
        });
    }

    if (shareButton && shareNavigator) {
        shareButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (!shareNavigator.classList.contains('open')) {
                showTooltip(shareNavigator);
            } else {
                hideTooltip(shareNavigator);
            }
        });

        // Close the popup when clicking outside
        document.addEventListener('click', function (e) {
            if (!shareButton.contains(e.target) && !shareNavigator.contains(e.target)) {
                hideTooltip(shareNavigator);
            }
        });
    }

    function showTooltip(element) {
        element.style.display = 'flex';
        setTimeout(() => {
            element.classList.add('open');
        }, 10);
    }

    function hideTooltip(element) {
        element.classList.remove('open');
        setTimeout(() => {
            element.style.display = 'none';
        }, 300); // Wait for the opacity transition to finish
    }

    if (shareFacebook) {
        shareFacebook.addEventListener('click', function (e) {
            e.preventDefault();
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`;
            window.open(facebookUrl, '_blank');
        });
    }

    if (shareTwitter) {
        shareTwitter.addEventListener('click', function (e) {
            e.preventDefault();
            const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}&text=Check out this video!`;
            window.open(twitterUrl, '_blank');
        });
    }

    if (shareEmail) {
        shareEmail.addEventListener('click', function (e) {
            e.preventDefault();
            const emailSubject = 'Check out this video';
            const emailBody = `I thought you'd like this video: ${videoUrl}`;
            window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        });
    }

    document.querySelectorAll('.story__slide').forEach(slide => {
        const video = slide.querySelector('.video-player');
        const playButton = slide.querySelector('.play-button');

        // Function to handle play/pause
        const toggleVideo = () => {
            if (video.paused) {
                document.querySelectorAll('.video-player').forEach(v => {
                    v.pause();
                });
                video.play();
                playButton.style.display = 'none';
            } else {
                video.pause();
                playButton.style.display = 'block';
            }
        };

        // Click event on play button
        playButton.addEventListener('click', toggleVideo);

        // Click event on video
        video.addEventListener('click', toggleVideo);

        // Optional: Show play button again when video is paused
        video.addEventListener('pause', () => {
            playButton.style.display = 'flex';
        });

        // Hide play button when video is playing
        video.addEventListener('play', () => {
            playButton.style.display = 'none';
        });
        videoModal.addEventListener('hide.bs.modal', function () {
            document.querySelectorAll('.video-player').forEach(v => {
                v.pause();
                v.currentTime = 0;
            });
        });
    });
});