defmodule BasicAuth do
  import Plug.Conn

  import Inspector

  @realm "Basic realm=\"Bunnymatic API\""

  def init(opts), do: opts

  def call(conn, correct_auth) do
    correct_auth |> inspector
    case get_req_header(conn, "authorization") |> inspector("get_req_header") do
      ["Basic " <> attempted_auth] -> verify(conn, attempted_auth, correct_auth)
      _ -> unauthorized(conn)
    end
  end

  defp verify(conn, attempted_auth, [username: username, password: password]) do
    case encode(username, password) do
      ^attempted_auth -> conn
      _ -> unauthorized(conn)
    end
  end

  def encode(username, password), do: Base.encode64(username <> ":" <> password)

  def unauthorized(conn) do
    conn
    |> put_resp_header("www-authenticate", @realm)
    |> send_resp(401, "Unauthorized")
    |> halt()
  end
end
