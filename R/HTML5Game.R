#' @import R6 assertthat
#' @importFrom stringr str_split
#' @importFrom servr httd
#' @include utils.R
NULL

HTML5Game <- R6Class("HTML5Game",
  public = list(
    # relative path inside the directory
    initialize = function(name, github = NULL, branch = "master", path, use_servr, img = NULL, author = NULL, description = NULL) {
      assert_that(is.string(name))
      if (!is.null(github)) assert_that(is.string(github))
      if (!is.null(github)) assert_that(length(stringr::str_split(github, "/")[[1]]) == 2, msg = "Invalid github argument.")
      if (!is.null(branch)) assert_that(is.string(branch))
      assert_that(is.string(path))
      assert_that(is.scalar(use_servr))
      assert_that(is.logical(use_servr))
      if (!is.null(img)) assert_that(is.string(img))
      if (!is.null(author)) assert_that(is.string(author))
      if (!is.null(description)) assert_that(is.string(description))
      private$name <- name
      private$github <- github
      private$branch <- branch
      private$path <- path
      private$use_servr <- use_servr
      private$img <- img
      private$author <- author
      private$description <- description
    },
    play = function(use_servr) {
      if (!self$is_installed()) self$install()
      if (missing(use_servr))
        use_servr <- private$use_servr
      tmp_dir <- private$copy_ressources()
      if (use_servr) {
        servr::httd(file.path(tmp_dir, private$name), initpath = private$path)
      } else {
        private$launch_game(tmp_dir)
      }
    },
    install = function() {
      repo_name <- stringr::str_split(private$github, "/")[[1]][2]
      url <- paste0("https://github.com/", private$github, "/archive/", private$branch, ".zip")
      owd <- setwd(tempdir())
      on.exit(setwd(owd), add = TRUE)
      zipfile <- paste0(private$name, ".zip")
      download(url, zipfile, mode = 'wb')
      utils::unzip(zipfile)
      unlink(zipfile, force = TRUE)
      assert_that(file.rename(paste0(repo_name, "-", private$branch), private$name),
                  msg = "Unable to rename temporary directory.")
      dest_dir <- system.file("games", package = "Rcade")[1]
      assert_that(file.copy(private$name, dest_dir, recursive = TRUE),
                  msg = paste0("Unable to copy source game in ", dest_dir, "."))
      unlink(private$name, recursive = TRUE, force = TRUE)
      invisible(self)
    },
    is_installed = function() nzchar(system.file("games", private$name, package = "Rcade")[1]),
    print = function(...) {
      self$play()
    }
  ),
  private = list(
    # name of the game, it will be the name of the directory inside games
    name = NULL,
    github = NULL,
    branch = NULL,
    path = NULL,
    use_servr = NULL,
    img = NULL,
    author = NULL,
    description = NULL,
    copy_ressources = function() {
      game_dir <- system.file("games", private$name, package = "Rcade", mustWork = TRUE)[1]
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
        file.path_args <- as.list(c(tmp_dir, private$name, stringr::str_split(private$path, "/")[[1]]))
        game_file <- do.call(file.path, args = file.path_args)
        #game_file <- file.path(tmp_dir, private$name, private$path)
        viewer <- getOption("viewer")
        if (is.null(viewer)) {
          utils::browseURL(game_file)
        } else {
          viewer(game_file, "maximize")
        }
      }
    }
  )
)
