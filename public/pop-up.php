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

    .video-bubble__modal .modal-cta .cta {
        background: transparent;
    }

    .story__slider .swiper-button-prev:after,
    .story__slider .swiper-button-next:after {
        content: '';
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
    $cta_type = get_post_meta($post->ID, '_svp_cta_type', true);
    if($cta_type = "yes"){
        $cta_url = get_post_meta($post->ID, '_svp_woocommerce_product', true);
    }else{
        $cta_url = get_post_meta($post->ID, '_svp_button_link', true);
    }
}
?>
<?php if(isset($videos["0"])): ?>
<!-- Start: Fixed Video Bubble -->
<section class="fixed-video-bubble">
    <div class="video-bubble__wrapper">
        <div class="video-bubble__wrapper-box" data-bs-toggle="modal" data-bs-target="#videoModal">
            <div class="video-bubble__wrapper-video">
                <!-- Poster will be the image which will be seen when video won't work -->

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
    <div class="modal-dialog modal-lg">
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
                                    <video poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg"
                                           autoplay muted>
                                        <source src="<?php echo $video ?>"
                                                type="video/mp4">
                                    </video>

                                    <div class="modal-cta">
                                        <!-- If buttons are on right side -->
                                        <div class="cta cta--bottom">
                                            <div class="btn-wrapper">
                                                <a href="<?php echo $cta_url ?>" title="Like" tabindex="2">
                                                    <i class="fa-regular fa-heart"></i>
                                                </a>
                                                <a href="<?php echo $cta_url ?>" title="Share" tabindex="2">
                                                    <i class="fa-brands fa-whatsapp"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                        <!-- Navigation Arrows -->
                        <div class="story__next swiper-button-next"></div>
                        <div class="story__prev swiper-button-prev"></div>
                        <!-- Progress pagination -->
                        <div class="story__pagination swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End: Slider -->
</div>
<!-- Story Slider Modal -->

<!-- Boostrap & Custom JS -->

<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

<!-- Jquery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>

<!-- GSAP -->
<script src="https://unpkg.co/gsap@3/dist/gsap.min.js"></script>

<script src="<?php echo SVP_PLUGIN_URL ?>public/assets/main.js"></script>
