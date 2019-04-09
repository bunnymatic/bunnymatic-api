defmodule BunnymaticApi_Web.DeleteImageAction do

  alias BunnymaticApi.Repo
  alias BunnymaticApi.S3

  def delete_image(image) do
    with { :ok, img } <- (image |> Repo.delete),
         { :ok, _response } <- (img.file |> S3.delete_file) do
      {:ok, image }
    else
      { :error, error } ->
        { :error, error }
      err ->
        { :error, err }
    end
  end
end
