defmodule BunnymaticApi.ControllerHelpers do

  import Plug.Conn

  def using_basic_auth(conn, username, password) do
    header_content = "Basic " <> Base.encode64("#{username}:#{password}")
    conn |> put_req_header("authorization", header_content)
  end
end
