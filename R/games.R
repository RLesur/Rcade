#' @importFrom crayon green yellow
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

#' @export
print.Html5_games <- function(x, ...) {
  is_installed <- sapply(x, function(x) x$is_installed())
  cat(paste0(sort(
    paste(names(is_installed),
          ifelse(is_installed,
                 crayon::green("(installed)"),
                 crayon::yellow("(not yet installed)")
          )
    )
  ), collapse = "\n"))
}
