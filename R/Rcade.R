#' 2048
#'
#' Game created by [Gabriele Cirulli](https://gabrielecirulli.com/), based on
#' [1024 by Veewo Studio](https://itunes.apple.com/us/app/1024!/id823499224)
#' and conceptually similar to [Threes by Asher Vollmer](http://asherv.com/threes/).
#'
#' @export
#'
#' @examples
#' \dontrun{
#' play_2048()
#' }
play_2048 <- function() {
  tmp_dir <- copy_ressources("2048")
  launch_game(tmp_dir, "2048", "index.html")
}

#' Green Mahjong
#'
#' Game created by [Daniel Beck](https://daniel-beck.org/impressum/).
#' [Github repository](https://github.com/danbeck/green-mahjong).
#'
#' @export
#'
#' @examples
#' \dontrun{
#' play_2048()
#' }
play_green_mahjong <- function() {
  tmp_dir <- copy_ressources("green-mahjong")
  launch_game(tmp_dir, "green-mahjong", "GreenMahjong", "www", "index.html")
}


copy_ressources <- function(game) {
  pkg_source <- find.package("Rcade")
  game_dir <- normalizePath(file.path(pkg_source, "h", game))
  tmp_dir <- file.path(tempdir(), "Rcade_game")
  if (!dir.exists(tmp_dir)) dir.create(tmp_dir)
  if (file.copy(game_dir, tmp_dir, recursive = TRUE)) {
    return(tmp_dir)
  } else {
    NULL
  }
}

launch_game <- function(tmp_dir, ...) {
  if (!is.null(tmp_dir)) {
    game_file <- file.path(tmp_dir, ...)
    getOption("viewer")(game_file, "maximize")
  }
}
