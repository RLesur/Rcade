# Rcade

The goal of `Rcade` is to provide access to games in order to waste some times in RStudio.

## Installation

This package will never be released on CRAN.  
You can install the development version from [GitHub](https://github.com/) with:

``` r
# install.packages("devtools")
devtools::install_github('RLesur/Rcade')
```

## Usage

### List available games

``` r
Rcade::games
```

### Play a game

The first time you launch a game, you will be asked for installation.  
Playing a game is quite easy. Here are some examples:

``` r
Rcade::games$`2048`
```

``` r
Rcade::games$Pacman
```

## Motivation

I always read the `Motivation` section first. Packages should always have a `Motivation` section in their `README` files.  

So, what is the motivation behind this useless package?  
My first motivation was to test the RStudio viewer and I had this stupid idea to try some `HTML5` games. WHy? I don't know.  
Some folks loved the idea of playing in RStudio. So, I took some times to develop this package. That's all.

## How to contribute

### Try a new game 

There are hundreds of `HTML5` games on `GitHub`. You can try a new game with the non exported `R6` constructor `Rcade:::HTML5Game`.

Here's an example with the following repo: https://github.com/TomMalbran/games

``` r
TMgames <- Rcade:::HTML5Game$new(name = "TMgames", github = "TomMalbran/games", branch = "gh-pages", need_servr = FALSE, path = "index.html")
```

Therefore, you can try to launch the game with:

``` r
TMgames
```

If you get some troubles, you may try with a `HTTP` server:

``` r
TMgames$play(TRUE)
```

### Do a pull request

Games metadata are stored in a `YAML` file (`inst/games/games.yml`). You only have to add extra games to this file.

## Credits

This package includes some non exported functions of the `webshot` package.  
`webshot` package author: Winston Chang  
`webshot` package contributors: Yihui Xie, Francois Guillem, Barret Schloerke  
License: GPL-2

