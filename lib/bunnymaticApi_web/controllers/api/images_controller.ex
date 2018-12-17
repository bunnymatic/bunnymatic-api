 defmodule BunnymaticApiWeb.Api.ImagesController do
  use BunnymaticApiWeb, :controller

  alias BunnymaticApi.Image
  alias BunnymaticApi.Repo
  alias BunnymaticApi_Web.DeleteImageAction

  def index(conn, _params) do
    images = Repo.all(Image)
    conn |> render("index.json", %{images: images})
  end

  def create(conn, %{ "image" => image_params }) do
    changeset = Image.create_changeset(%Image{}, image_params)

    case Repo.insert(changeset) do
      {:ok, image} ->
        conn
        |> put_status(201)
        |> render("show.json", image: image)
      {:error, %{errors: errors}} ->
        conn
        |> put_status(422)
        |> render("422.json", %{errors: errors})
    end
  end

  def update(conn, %{ "id" => id, "image" => image_params }) do
    image = Repo.get!(Image, id)
    changeset = Image.update_changeset(image, image_params)

    case Repo.update(changeset) do
      {:ok, image} ->
        conn
        |> put_status(201)
        |> render("show.json", image: image)
      {:error, %{errors: errors}} ->
        conn
        |> put_status(422)
        |> render("422.json", %{errors: errors})
    end
  end

  def destroy(conn, %{"id" => id}) do
    image = Image |> Repo.get(id)
    case (image |> DeleteImageAction.delete_image) do
      {:ok, image } ->
        conn
        |> put_status(201)
        |> render("show.json", image: image)
      {:error, error } ->
        conn
        |> put_status(422)
        |> render("422.json", %{errors: error})
    end
  end
end
