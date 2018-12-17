defmodule BunnymaticApiWeb.ImageControllerTest do
  use BunnymaticApiWeb.ConnCase
  import BunnymaticApi.ControllerHelpers

  @username Application.get_env(:bunnymaticApi, BasicAuth)[:username]
  @password Application.get_env(:bunnymaticApi, BasicAuth)[:password]

  test "index/2 / page", %{conn: conn} do
    insert_list(2, :image, %{})
    conn = conn
    |> using_basic_auth(@username, @password)
    |> get("/")

    assert html_response(conn, 200) =~ ~r/<body>/
  end

end
