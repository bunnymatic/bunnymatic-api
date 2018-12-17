defmodule BunnymaticApiWeb.S3.SignController do
  use BunnymaticApiWeb, :controller

  alias BunnymaticApi.S3

  def sign(conn, params) do
    opts = [
      {:expires_in, 3600},
      {:virtual_host, false},
      {:query_params, %{ "x-amz-acl": "public-read" }}
    ]

    S3.config()
    |> ExAws.S3.presigned_url(
      :put,
      Application.get_env(:ex_aws, :bucket),
      params["filename"], opts )
    |> case do
         {:ok, result} ->
           conn |> json(%{url: result})
         {:error, error} ->
           conn
           |> put_status(:bad_request)
           |> json(%{error: error})
       end
  end

end
