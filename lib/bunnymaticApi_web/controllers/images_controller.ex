 defmodule BunnymaticApiWeb.ImagesController do
  use BunnymaticApiWeb, :controller

  def index(conn, _params) do
    conn |> render("index.html")
  end

end
