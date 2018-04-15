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
Rcade::games$`2048`$play()
```

``` r
Rcade::games$GreenMahjong$play()
```

## Credits

This package includes non exported functions of the `webshot` package: since they are not exported, the source code is included in the `Rcade` package.  
`webshot` package author: Winston Chang  
`webshot` package contributors: Yihui Xie, Francois Guillem, Barret Schloerke

