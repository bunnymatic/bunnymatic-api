defmodule BunnymaticApiWeb.Api.ImagesView do
  use BunnymaticApiWeb, :view

  def render("index.json", %{images: data}), do: %{images: data}
  def render("show.json", %{image: data}), do: %{image: data}
  def render("422.json", %{errors: errors}), do: %{errors: errors}

end
