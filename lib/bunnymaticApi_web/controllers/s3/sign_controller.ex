defmodule BunnymaticApiWeb.S3.SignController do
  use BunnymaticApiWeb, :controller

  import Inspector

  def render_json(conn, data, http_code) do
    conn
    |> Plug.Conn.put_resp_header("content-type", "application/json; charset=utf-8")
    |> Plug.Conn.send_resp(http_code, Poison.encode!(data, pretty: true))
  end

  def render_json(conn, data), do: render_json(conn, data, 200)

  def sign(conn, params) do
    opts = [
      {:expires_in, 3600},
      {:virtual_host, false},
      {:query_params, []}
    ]
    object = "/Users/jon/projects/bunnymatic-api/README.ad"

    aws_config()
    |> ExAws.S3.presigned_url(:post, "bunnymatic_dev", object, opts)
    |> case do
         {:ok, result} ->
           conn |> render_json(%{url: result})
         {:error, error} ->
           error |> inspector("presigned_url error")
           conn |> render_json(%{error: error}, 404)
       end
  end

  defp aws_config() do
    [:secret_access_key, :access_key_id, :region]
    |> Enum.map( fn(key) -> {key, Application.get_env(:ex_aws, key)} end )
    |> Enum.into( %{} )
    |> inspector("aws_config")
  end
end
