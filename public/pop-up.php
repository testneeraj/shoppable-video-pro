<?php
if (is_admin() || $GLOBALS['pagenow'] === 'wp-login.php' || $GLOBALS['pagenow'] === 'wp-logout.php') {
    return;
}
?>

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
      crossorigin="anonymous" referrerpolicy="no-referrer"/>
<!-- Swiper CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
<link rel="stylesheet" href="<?php echo SVP_PLUGIN_URL ?>public/assets/style.css"/>
<style>
    :root {
        --theme-primary: #AC87C5;
        --comment-input-bg: rgba(6, 6, 6, 0.35);
        --input-color: #FFFFFF;
        --font-color: #212529;
        --white: #FFFFFF;
        --white-50: rgba(255, 255, 255, .5);
        --white-80: rgba(255, 255, 255, .8);
        --cubic-transition: 500ms cubic-bezier(0.6, 0.01, 0.1, 0.96);
    }

    .action-btn-wrapper {
        position: absolute;
        right: 10px;
        top: 100px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1;
    }

    .action-btn-wrapper > .action-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, .5);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 10px #0003;
        color: var(--white);
        border-radius: 50%;
        font-size: 18px;
        transition: .3s ease-out;
        text-decoration: none;
    }

    .action-btn-wrapper > .action-btn:hover {
        background-color: var(--white);
        color: var(--font-color);
        text-decoration: none;
    }

    .action-btn-wrapper > .action-btn:focus {
        text-decoration: none;
    }

    .share-navigator {
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: absolute;
        top: 150px;
        right: 0;
        z-index: 2;
        height: 0;
        opacity: 0;
        transition: height 0.3s ease, opacity 0.3s ease;
    }

    .share-navigator.open {
        height: auto;
        opacity: 1;
    }

    .share-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, .5);
        color: var(--white);
        border-radius: 50%;
        font-size: 18px;
        transition: .3s ease-out;
        text-decoration: none;
    }

    .share-btn:hover {
        background-color: var(--white);
        color: var(--font-color);
        text-decoration: none;
    }

    .share-btn:focus {
        text-decoration: none;
    }

    .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        transform: translate(-50%, -50%);
        font-size: 18px;
        color: var(--white);
        background: rgba(0, 0, 0, 0.5);
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 2;
        display: none;
        height: 40px;
        align-items: center;
        justify-content: center;
    }

    .fixed-video-bubble .video-bubble__wrapper {
        z-index: 2;
    }

</style>
<?php
$posts = get_posts([
    'post_type' => 'shoppable_video',
    'post_status' => 'publish',
    'numberposts' => -1
]);
foreach ($posts as $post) {
    $videos = get_post_meta($post->ID, '_svp_uploaded_videos', true);
    $svp_ctas = get_post_meta($post->ID, '_svp_ctas', true);
    $svp_pop_ups = get_post_meta($post->ID, '_svp_pop_ups', true);
    $navigation = get_post_meta($post->ID, '_svp_navigation', true);
    $mute = get_post_meta($post->ID, '_svp_mute', true);
    $share = get_post_meta($post->ID, '_svp_share', true);
    $play_pause = get_post_meta($post->ID, '_svp_play_pause', true);
}
?>
<?php if (get_post_meta($post->ID, '_svp_background_color', true)) { ?>
    <style>
        .video-bubble__modal .modal-header .btn-close, .video-bubble__modal .modal-cta .cta .btn-wrapper > *, .story__prev, .story__next, .story__next.swiper-button-next, .story__prev.swiper-button-prev, .story__product-card-cta a {
            background: <?php echo get_post_meta($post->ID, '_svp_background_color', true) ?>;
        }
    </style>
<?php } ?>
<?php if (get_post_meta($post->ID, '_svp_hover_color', true)) { ?>
    <style>
        .video-bubble__modal .modal-header .btn-close:hover, .video-bubble__modal .modal-cta .cta .btn-wrapper > *:hover, .story__prev:not(.swiper-button-disabled):hover, .story__next:not(.swiper-button-disabled):hover, .story__next.swiper-button-next:not(.swiper-button-disabled):hover, .story__prev.swiper-button-prev:not(.swiper-button-disabled):hover, .story__product-card-cta a:hover {
            background: <?php echo get_post_meta($post->ID, '_svp_hover_color', true) ?>;
        }
    </style>
<?php } ?>
<?php if (isset($videos["0"])): ?>
    <section class="fixed-video-bubble">
        <div class="video-bubble__wrapper">
            <div class="video-bubble__wrapper-box" data-bs-toggle="modal" data-bs-target="#videoModal">
                <div class="video-bubble__wrapper-video">
                    <video poster="<?php echo $videos["0"] ?>"
                           autoplay loop muted playsinline>
                        <source src="<?php echo $videos["0"] ?>"
                                type="video/mp4" playsinline>
                    </video>
                </div>
            </div>
        </div>
    </section>
    <!-- End: Fixed Video Bubble -->
<?php endif; ?>

<!-- Story Slider Modal -->
<div class="modal fade video-bubble__modal" id="videoModal" aria-labelledby="videoModalLabel" aria-hidden="true">
    <!-- Start: Slider -->
    <div class="story__modal modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="story">
                    <div class="story__slider swiper">
                        <div class="story__wrapper swiper-wrapper">
                            <?php foreach ($videos as $video): ?>
                                <div class="story__slide swiper-slide">
                                    <video class="video-player"
                                           poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg"
                                           autoplay>
                                        <source src="<?php echo $video ?>"
                                                type="video/mp4">
                                    </video>
                                    <?php if ($play_pause == "on") { ?>
                                        <div class="play-button" style="display: none;">
                                            <i class="fa-solid fa-play"></i>
                                        </div>
                                    <?php } ?>
                                </div>
                            <?php endforeach; ?>
                        </div>
                        <?php if ($navigation == "on") { ?>
                            <!-- Navigation Arrows -->
                            <div class="story__next swiper-button-next"></div>
                            <div class="story__prev swiper-button-prev"></div>
                        <?php } ?>
                        <!-- Progress pagination -->
                        <div class="story__pagination swiper-pagination"></div>

                    </div>
                </div>
            </div>

            <div class="modal-cta">
                <div class="cta cta--left">
                    <div class="btn-wrapper">
                        <?php if ($svp_pop_ups):
                            foreach ($svp_pop_ups as $popups):
                                $popup_class = "";
                                if ($popups["size"] == "fullsize") {
                                    $popup_class = "fullsize";
                                }
                                ?>
                                <a href="#" class="open-popup <?= $popup_class ?>" title="Open Popup">
                                    <?php if ($popups["display_as_button"] == "on"): ?>
                                      <i class="fa-solid fa-eye" ></i>
                                    <?php else: ?>
                                        <img src="<?php echo $popups["image"] ?>">
                                    <?php endif; ?>
                                </a>
                            <?php endforeach; endif; ?>
                        <?php foreach ($svp_ctas as $cta):
                            if ($cta["position"] == "cta--left"):
                                ?>
                                <a href="<?php echo $cta["url"] ?>" title="" <?php if ($cta["new_tab"] == "on") {
                                    echo 'target="_blank"';
                                } ?>>
                                    <img src="<?php echo $cta["icon"] ?>">
                                </a>
                            <?php endif; endforeach; ?>
                    </div>
                </div>

                <!-- If buttons are on bottom -->
                <div class="cta cta--bottom">
                    <div class="btn-wrapper">
                        <?php foreach ($svp_ctas as $cta):
                            if ($cta["position"] == "cta--bottom"):
                                ?>
                                <a href="<?php echo $cta["url"] ?>" title="">
                                    <img src="<?php echo $cta["icon"] ?>">
                                </a>
                            <?php endif; endforeach; ?>
                    </div>
                </div>

                <!-- If buttons are on right side -->
                <div class="cta cta--right">
                    <div class="btn-wrapper">

                        <?php foreach ($svp_ctas as $cta):
                            if ($cta["position"] == "cta--right"):
                                ?>
                                <a href="<?php echo $cta["url"] ?>" title="">
                                    <img src="<?php echo $cta["icon"] ?>">
                                </a>
                            <?php endif; endforeach; ?>
                    </div>
                </div>
            </div>

            <div class="action-btn-wrapper">
                <?php if ($mute == "on") { ?>
                    <a href="#" class="action-btn action-btn--mute" title="Mute">
                        <i class="fa-solid fa-volume-xmark"></i>
                    </a>
                <?php } ?>
                <?php if ($share == "on") { ?>
                    <a href="#" class="action-btn action-btn--share" title="Share">
                        <i class="fa-solid fa-share"></i>
                    </a>
                    <div class="share-navigator" style="display: none;">
                        <a href="#" class="share-btn share-btn--facebook" title="Share on Facebook">
                            <i class="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="#" class="share-btn share-btn--twitter" title="Share on X">
                            <i class="fa-brands fa-twitter"></i>
                        </a>
                        <a href="#" class="share-btn share-btn--email" title="Share via Email">
                            <i class="fa-solid fa-envelope"></i>
                        </a>
                    </div>
                <?php } ?>
            </div>

            <?php if ($svp_pop_ups): foreach ($svp_pop_ups as $popups):
                if ($popups["position"] == "popup--left"):
                    $pp_width_class = "";
                    if ($popups["size"] == "fullsize") {
                        $pp_width_class = "h-full";
                    }
                    ?>
                    <!-- Full height Info Popup -->
                    <div class="story-popup <?= $pp_width_class ?>">
                        <div class="story-popup__content">
                            <div class="story-popup__header">
                                <h3><?php echo $popups["title"] ?></h3>
                                <button class="story-popup__close">&times;</button>
                            </div>
                            <div class="story-popup__body">
                                <p><?php echo $popups["content"] ?></p>
                            </div>
                        </div>
                    </div>
                <?php endif; endforeach; endif; ?>

            <!-- Btn to toggle product popup -->
            <div class="story__product-popup-cta active">
                <i class="fa-solid fa-chevron-up"></i>
            </div>

            <!-- Product popup -->
            <div class="story__product-popup active">
                <div class="story__product-card">
                    <div class="story__product-card-img">
                        <div class="image">
                            <img src="https://picsum.photos/450/900" alt="Product Image"/>
                        </div>
                    </div>
                    <div class="story__product-card-body">
                        <div class="story__product-card-content">
                            <div class="product-title">Product title</div>
                            <div class="product-price">
                                <div class="original-price">$20.00</div>
                                <div class="offered-price">$11.00</div>
                            </div>
                        </div>
                        <div class="story__product-card-cta">
                            <a href="#" title="Shop">Shop</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End: Slider -->
</div>

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<!-- Jquery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<!-- GSAP -->
<script src="https://unpkg.co/gsap@3/dist/gsap.min.js"></script>
<script src="<?php echo SVP_PLUGIN_URL ?>public/assets/main.js"></script>
<script>
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
                    slideDown(shareNavigator);
                } else {
                    slideUp(shareNavigator);
                }
            });
        }

        function slideDown(element) {
            element.style.display = 'flex';
            const height = element.scrollHeight + 'px';
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.opacity = '1';
                element.classList.add('open');
            }, 10);
        }

        function slideUp(element) {
            element.style.height = element.scrollHeight + 'px';
            setTimeout(() => {
                element.style.opacity = '0';
                element.classList.remove('open');
            }, 10);
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
                        v.currentTime = 0;
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


</script>