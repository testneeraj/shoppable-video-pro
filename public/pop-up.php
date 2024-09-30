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

<!-- Start: Fixed Video Bubble -->
<section class="fixed-video-bubble">
    <div class="video-bubble__wrapper">
        <div class="video-bubble__wrapper-box" data-bs-toggle="modal" data-bs-target="#videoModal">
            <div class="video-bubble__wrapper-video">
                <!-- Poster will be the image which will be seen when video won't work -->
                <video poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg"
                       autoplay loop muted playsinline>
                    <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                            type="video/mp4" playsinline>
                </video>
            </div>
        </div>
    </div>
</section>
<!-- End: Fixed Video Bubble -->

<!-- Story Slider Modal -->
<div class="modal fade video-bubble__modal" id="videoModal" aria-labelledby="videoModalLabel" aria-hidden="true">
    <!-- Start: Fixed Comment section -->
    <section class="comments">
        <div class="comments__wrapper">
            <div class="comments__wrapper-box">
                <div class="comments__wrapper-items">
                    <div class="comments__wrapper-item">
                        <div class="comments__wrapper-item-avatar">
                            <img src="https://placehold.co/50x50" alt="User Img">
                        </div>
                        <div class="comments__wrapper-item-text">
                            <div class="name">User name</div>
                            <div class="message">This is a test comment</div>
                        </div>
                    </div>

                    <div class="comments__wrapper-item">
                        <div class="comments__wrapper-item-avatar">
                            <img src="https://placehold.co/50x50" alt="User Img">
                        </div>
                        <div class="comments__wrapper-item-text">
                            <div class="name">User name</div>
                            <div class="message">This is a test comment This is a test comment This is a test comment
                            </div>
                        </div>
                    </div>

                    <div class="comments__wrapper-item">
                        <div class="comments__wrapper-item-avatar">
                            <img src="https://placehold.co/50x50" alt="User Img">
                        </div>
                        <div class="comments__wrapper-item-text">
                            <div class="name">User name</div>
                            <div class="message">This is a test comment</div>
                        </div>
                    </div>

                    <div class="comments__wrapper-item">
                        <div class="comments__wrapper-item-avatar">
                            <img src="https://placehold.co/50x50" alt="User Img">
                        </div>
                        <div class="comments__wrapper-item-text">
                            <div class="name">User name</div>
                            <div class="message">This is a test comment</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="comments__wrapper-input">
                <input type="text" tabindex="1" name="userComment" id="userComment" placeholder="Type your message...">

                <div class="mention-link">
                    <i class="fa-solid fa-at"></i>
                    <!-- <span>@</span> -->
                </div>

                <div class="enter-link">
                    <i class="fa-solid fa-arrow-up"></i>
                    <!-- <svg width="44" height="44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="12" fill="#000"></circle><path d="M22.848 26.8v-7.552L25.6 22a.849.849 0 001.2-1.2l-4.2-4.2a.849.849 0 00-1.2 0l-4.2 4.2a.849.849 0 001.2 1.2l2.752-2.752V26.8a.848.848 0 101.696 0z" fill="#fff"></path></svg> -->
                </div>
            </div>
        </div>
    </section>
    <!-- End: Fixed Comment section -->

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
                            <!-- Slide 1 -->
                            <div class="story__slide swiper-slide">
                                <img src="https://picsum.photos/450/800"/>
                            </div>

                            <!-- Slide 2 -->
                            <div class="story__slide swiper-slide">
                                <video poster="https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg"
                                       autoplay muted>
                                    <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                                            type="video/mp4">
                                </video>
                            </div>

                            <!-- Slide 3 -->
                            <div class="story__slide swiper-slide">
                                <img src="https://picsum.photos/450/810"/>
                            </div>
                        </div>

                        <!-- Navigation Arrows -->
                        <div class="story__next swiper-button-next"></div>
                        <div class="story__prev swiper-button-prev"></div>

                        <!-- Progress pagination -->
                        <div class="story__pagination swiper-pagination"></div>
                    </div>
                </div>
            </div>
            <div class="modal-cta">
                <!-- If buttons are on left side -->
                <div class="cta cta--left">
                    <div class="btn-wrapper">
                        <a href="#" title="Like">
                            <i class="fa-regular fa-heart"></i>
                        </a>
                        <a href="#" title="Share">
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
                    </div>
                </div>

                <!-- If buttons are on bottom -->
                <div class="cta cta--bottom">
                    <div class="btn-wrapper">
                        <a href="#" title="Like">
                            <i class="fa-regular fa-heart"></i>
                        </a>
                        <a href="#" title="Share">
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
                    </div>
                </div>

                <!-- If buttons are on right side -->
                <div class="cta cta--right">
                    <div class="btn-wrapper">
                        <a href="#" title="Like">
                            <i class="fa-regular fa-heart"></i>
                        </a>
                        <a href="#" title="Share">
                            <i class="fa-brands fa-whatsapp"></i>
                        </a>
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
