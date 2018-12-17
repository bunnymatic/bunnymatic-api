defmodule BunnymaticApiWeb.Api.ImageControllerTest do
  use BunnymaticApiWeb.ConnCase
  import BunnymaticApi.ControllerHelpers

  @username Application.get_env(:bunnymaticApi, BasicAuth)[:username]
  @password Application.get_env(:bunnymaticApi, BasicAuth)[:password]

  test "index/2 /api/images returns images as json", %{conn: conn} do
    insert_list(2, :image, %{})
    conn = conn
    |> using_basic_auth(@username, @password)
    |> get("/api/images")

    assert ((json_response(conn, 200))["images"] |> length) == 2
    assert (
      %{ "title" => _n,
         "id" => _id,
         "year" => _y,
         "medium" => _m,
         "inserted_at" => _ia,
         "dimensions" => _dd,
         "file" => _ff
      } = (json_response(conn, 200))["images"] |> Enum.at(1))
  end

  test "update/2 /api/images/:id updates the existing image", %{conn: conn} do
    image = insert(:image, %{})

    id = image |> Map.get(:id)

    updates = %{
      "title" => "New title",
      "year" => 2020
    }

    conn = conn
    |> using_basic_auth(@username, @password)
    |> put("/api/images/#{id}", %{ "image" => updates })

    assert (
      %{ "title" => _n,
         "id" => _id,
         "year" => _y,
         "medium" => _m,
         "inserted_at" => _ia,
         "dimensions" => _dd,
         "file" => _ff
      } = (json_response(conn, 201))["image"])
  end

end
