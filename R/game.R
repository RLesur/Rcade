#' @import R6
#' @importFrom yaml read_yaml
#' @importFrom assertthat assert_that "%has_name%"
NULL

GameCatalog <- R6Class("GameCatalog",
  public = list(
    games = NULL,
    required_meta = c("github", "use_servr", "path"),
    opt_meta = c("img", "author", "description"),
    initialize = function(..., package = NULL, lib.loc = NULL) {
      meta <- yaml::read_yaml(system.file("games.yml", package = "Rcade"))
    },
    validate_catalog = function(catalog_meta) {

    },
    validate_game_meta = function(game_meta, name) {
      assert_that(game_meta %has_name% "github", sprintf("%s "))
    }
  )
)


#' @export
Game <- R6Class("Game",
  public = list(
    name = NULL,
    github = NULL,
    use_servr = NULL,
    path = NULL,
    img = NULL,
    author = NULL,
    description = NULL,
    installed = NULL,
    initialize = function(name, github = NULL, use_servr, path, img = NULL, author = NULL, description = NULL) {
      self$name <- name
      self$github <- github
      self$use_servr <- use_servr
      self$path <- path
      self$img <- img
      self$author <- author
      self$description <- description
    },
    play = function(use_servr) {
      if (missing(use_servr))
        use_servr <- self$use_servr
      tmp_dir <- self$copy_ressources()
      utils::browseURL(file.path(tmp_dir, self$name, self$path))
    },
    copy_ressources = function() {
      game_dir <- system.file("h", self$name, package = "Rcade", mustWork = TRUE)[1]
      tmp_dir <- file.path(tempdir(), "Rcade_game")
      if (!dir.exists(tmp_dir)) dir.create(tmp_dir)
      if (file.copy(game_dir, tmp_dir, recursive = TRUE)) {
        return(tmp_dir)
      } else {
        NULL
      }
    },
    is_installed = function() {
      game_dir <- system.file("h", self$name, package = "Rcade")[1]
      game_dir != ""
    }

  )
)
