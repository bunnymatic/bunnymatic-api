 defmodule BunnymaticApiWeb.ImagesController do
  use BunnymaticApiWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

end
