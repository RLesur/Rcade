#' @import R6 assertthat
#' @importFrom yaml read_yaml
#' @importFrom stringr str_split
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
HTML5Game <- R6Class("HTML5Game",
  public = list(
    # name of the game, it will be the name of the directory inside h
    name = NULL,
    github = NULL,
    use_servr = NULL,
    # relative path inside the directory
    path = NULL,
    img = NULL,
    author = NULL,
    description = NULL,
    initialize = function(name, github = NULL, use_servr, path, img = NULL, author = NULL, description = NULL) {
      assert_that(is.string(name))
      if (!is.null(github)) assert_that(is.string(github))
      assert_that(length(stringr::str_split(github, "/")[[1]]) == 2, msg = "Invalid github argument.")
      assert_that(is.scalar(use_servr))
      assert_that(is.logical(use_servr))
      assert_that(is.string(path))
      if (!is.null(img)) assert_that(is.string(img))
      if (!is.null(author)) assert_that(is.string(author))
      if (!is.null(description)) assert_that(is.string(description))
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
      #utils::browseURL(file.path(tmp_dir, self$name, self$path))
      self$launch_game(tmp_dir)
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
    launch_game = function(tmp_dir) {
      if (!is.null(tmp_dir)) {
        file.path_args <- as.list(c(tmp_dir, self$name, stringr::str_split(self$path, "/")[[1]]))
        game_file <- do.call(file.path, args = file.path_args)
        #game_file <- file.path(tmp_dir, self$name, self$path)
        getOption("viewer")(game_file, "maximize")
      }
    },
    install = function() {
      repo_name <- stringr::str_split(self$github, "/")[[1]][2]
      url <- paste0("https://github.com/", self$github, "/archive/master.zip")
      owd <- setwd(tempdir())
      on.exit(setwd(owd), add = TRUE)
      zipfile <- paste0(self$name, ".zip")
      download(url, zipfile, mode = 'wb')
      utils::unzip(zipfile)
      assert_that(file.rename(paste0(repo_name, "-master"), self$name),
                  msg = "Unable to rename temporary directory.")
      dest_dir <- system.file("h", package = "Rcade")[1]
      assert_that(file.copy(self$name, dest_dir, recursive = TRUE),
                  msg = paste0("Unable to copy source game in ", dest_dir, "."))
      invisible(self)
    }
  ),
  active = list(
    installed = function() nzchar(system.file("h", self$name, package = "Rcade")[1])
  )
)

#' @export
as.list.HTML5Game <- function(x, ...) {
  l <- list(x$github, x$use_servr, x$path, x$img, x$author, x$description)
  names(l) <- c("github", "use_servr", "path", "img", "author", "description")
  game <- list(l)
  names(game) <- x$name
  game
}

# a <- HTML5Game$new("2048", path = "index.html", use_servr = FALSE)
# mario <- HTML5Game$new("mario", "RcadeRepos/mariohtml5", FALSE, "main.html")
# a
# sapply(c(a, a), as.list)
