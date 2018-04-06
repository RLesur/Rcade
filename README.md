# rcade

The goal of `rcade` is to provide games in order to waste some times in RStudio.

## Installation

This package will never be released on CRAN.  
You can install the development version from [GitHub](https://github.com/) with:

``` r
# install.packages("devtools")
wd_back <- getwd()
tmp_dir <- tempfile("dir")
dir.create(tmp_dir)
setwd(tmp_dir)
system('git clone --recursive https://github.com/RLesur/rcade.git')
setwd(wd_back)
devtools::install(file.path(tmp_dir, "rcade"))
```

## Example

``` r
rcade::play_2048()
```

``` r
rcade::play_green_mahjong()
```

