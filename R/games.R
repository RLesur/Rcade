#' @importFrom yaml read_yaml
#' @importFrom purrr imap
#' @include HTML5Game.R
NULL

load_games <- function() {
  meta <- yaml::read_yaml(system.file("games", "games.yml", package = "Rcade"))
  meta <- purrr::imap(meta, ~ c(list(name = .y), .x))
  structure(lapply(meta, function(x) do.call(HTML5Game$new, x)),
            class = c("Html5_games", "list"))
}

#' Games for procRastinatoRs
#'
#'
#'
#' @export
games <- load_games()
