<?php get_header(); ?>
<section class="Intro">
  <h1><?php the_title(); ?></h1>
  <h2><?php bloginfo('description'); ?></h2>
</section>
<?php $dkowpt::render('views/partials/carousel.php'); ?>
<?php get_footer();
