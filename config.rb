# Compass config.rb

preferred_syntax    = :scss

http_path           = '/'
sass_dir            = 'source/assets/sass'
images_dir          = 'source/assets/img'
javascripts_dir     = 'source/assets/js'
relative_assets     = true

css_dir             = (environment == :production) ? 'release/assets/css' : 'source/assets/css'

line_comments       = (environment == :production) ? false : true
output_style        = (environment == :production) ? :compressed : :expanded
