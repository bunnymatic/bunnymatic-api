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

    get "/", PageController, :index
    get "/images", ImagesController, :index
    post "/images/uploads", ImageUploadController, :post
  end

  # scope "/files", BunnymaticApiWeb do
  #   options "/",        ImageUploadController, :options
  #   options "/:file",     ImageUploadController, :options
  #   match :head, "/:file",  ImageUploadController, :head
  #   post "/",         ImageUploadController, :post
  #   patch "/:file",     ImageUploadController, :patch
  #   delete "/:file",      ImageUploadController, :delete
  # end

  # Other scopes may use custom stacks.
  # scope "/api", BunnymaticApiWeb do
  #   pipe_through :api
  # end
end
