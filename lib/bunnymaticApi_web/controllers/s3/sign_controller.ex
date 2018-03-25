defmodule BunnymaticApiWeb.S3.SignController do
  use BunnymaticApiWeb, :controller

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
      {:query_params, %{ "x-amz-acl": "public-read" }}
    ]

    aws_config()
    |> ExAws.S3.presigned_url(
      :put,
      Application.get_env(:ex_aws, :bucket),
      params["filename"], opts )
    |> case do
         {:ok, result} ->
           conn |> render_json(%{url: result})
         {:error, error} ->
           conn |> render_json(%{error: error}, 404)
       end
  end

  defp aws_config() do
    host = "s3." <> Application.get_env(:ex_aws, :region) <> ".amazonaws.com"
    %{ ExAws.Config.new(:s3) | host: host }
  end
end
