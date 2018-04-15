# Rcade

The goal of `Rcade` is to provide access to games in order to waste some times in RStudio.

## Installation

This package will never be released on CRAN.  
You can install the development version from [GitHub](https://github.com/) with:

``` r
# install.packages("devtools")
devtools::install_github('RLesur/Rcade')
```

## Example

``` r
Rcade::games$`2048`
```

``` r
Rcade::games$GreenMahjong
```

## How to contribute

### Try a new game 

``` r
TMgames <- Rcade:::HTML5Game$new(name = "TMgames", github = "TomMalbran/games", branch = "gh-pages", need_servr = FALSE, path = "index.html")
```

``` r
TMgames
```

Try with `servr`:

``` r
TMgames$play(TRUE)
```

## Credits

This package includes non exported functions of the `webshot` package: since they are not exported, the source code is included in the `Rcade` package.  
`webshot` package author: Winston Chang  
`webshot` package contributors: Yihui Xie, Francois Guillem, Barret Schloerke

