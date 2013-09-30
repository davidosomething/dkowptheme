# Compass config.rb

preferred_syntax    = :scss
trace = true

sass_dir            = 'source/assets/sass'
fonts_dir           = 'source/assets/fonts'
images_dir          = 'source/assets/img'
javascripts_dir     = 'source/assets/js'

if environment == :development
  relative_assets = true
  http_path       = '/'
  css_dir         = 'build/assets/css'
  output_style    = :expanded
  line_comments   = true

elsif environment == :production
  relative_assets = true
  http_path       = '/'
  #relative_assets = false
  #http_path       = 'http://cdn.davidosomething.com/'
  css_dir         = 'release/assets/css'
  output_style    = :expanded   # CSSO will compress it
  line_comments   = false
end
