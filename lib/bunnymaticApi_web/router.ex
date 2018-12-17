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

  pipeline :s3 do
    plug :accepts, ["json"]
    plug BasicAuth, Application.fetch_env!(:bunnymaticApi, BasicAuth)
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug BasicAuth, Application.fetch_env!(:bunnymaticApi, BasicAuth)
  end

  scope "/s3", BunnymaticApiWeb do
    pipe_through :s3
    post "/sign", S3.SignController, :sign
  end

  scope "/", BunnymaticApiWeb do
    pipe_through :browser # Use the default browser stack

    get "/", ImagesController, :index
    post "/images/uploads", ImageUploadController, :post
  end

  # Other scopes may use custom stacks.
  scope "/api", BunnymaticApiWeb do
    pipe_through :api

    get "/images", Api.ImagesController, :index
    post "/images", Api.ImagesController, :create
    put "/images/:id", Api.ImagesController, :update
    delete "/images/:id", Api.ImagesController, :destroy
  end
end
