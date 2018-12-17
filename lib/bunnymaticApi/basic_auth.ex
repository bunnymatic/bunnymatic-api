defmodule BasicAuth do
  import Plug.Conn
  require Logger
  @realm "Basic realm=\"Bunnymatic API\""

  def init(opts), do: opts

  def call(conn, correct_auth) do
    case get_req_header(conn, "authorization") do
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

  def encode(username, password) do
    Logger.debug("BasicAuth: Trying #{username}/#{password}")
    Base.encode64(username <> ":" <> password)
  end

  def unauthorized(conn) do
    conn
    |> put_resp_header("www-authenticate", @realm)
    |> send_resp(401, "Unauthorized")
    |> halt()
  end
end
