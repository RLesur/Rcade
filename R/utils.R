#' @importFrom yaml read_yaml
NULL

installed_games <- function() {
  dir(system.file("h", package = "Rcade"))
}

games_metadata <- function() {
  yaml::read_yaml(system.file("games.yml", package = "Rcade"))
}

available_games <- function() {
  names(games_metadata())
}

is_available <- function(name) {
  name %in% available_games()
}

game <- function(name) {
  assertthat::assert_that(assertthat::is.string(name))
  assertthat::assert_that(is_available(name), msg = "game not available.")
  structure(c(list(name = name), games_metadata()[[name]]), class = "RcadeGame")
}

as.list.RcadeGame <- function(x, ...) {
  l <- list(x[-1])
  names(l) <- x[[1]]
  l
}

install <- function(x, ...) UseMethod("install", x)

download <- function(x, ...) UseMethod("download", x)

as_yaml <- function(x, ...) UseMethod("as_yaml", x)

#' @export
as_yaml.RcadeGame <- function(x, ...) {
  yaml::as.yaml(as.list(x))
}

