defmodule BunnymaticApiWeb.Router do
  use BunnymaticApiWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug BasicAuth, Application.fetch_env!(:bunnymaticApi, BasicAuth)
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug BasicAuth, Application.fetch_env!(:bunnymaticApi, BasicAuth)
  end

  scope "/", BunnymaticApiWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", BunnymaticApiWeb do
  #   pipe_through :api
  # end
end
