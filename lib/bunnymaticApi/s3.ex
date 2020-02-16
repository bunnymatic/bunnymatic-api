defmodule BunnymaticApi.S3 do

  require Logger

  def delete_file(file) do

    case file
    |> extract_object_name()
    |> raw_delete_file() do
      {:error, {:http_error, _status_code, %{body: response_body}}} ->
        Logger.error("Failed to delete file #{file} from S3")
        Logger.error(response_body)
        {:error, "Failed to delete file #{file} from S3"}
      {:ok, resp} ->
        {:ok, resp}
    end
  end

  def config do
    bucket = Application.get_env(:ex_aws, :bucket)
    region = Application.get_env(:ex_aws, :region)
    IO.puts("REGION")
    IO.inspect(region)
    IO.puts("BUCKET")
    IO.inspect(bucket)
    host = "s3." <> region <> ".amazonaws.com"

    ExAws.Config.new(:s3)
    |> Map.merge(
      %{
        host: host,
        region: region,
        bucket: bucket
      }
    )
  end

  defp bucket_url_prefix do
    cfg = config()
    cfg[:scheme] <> cfg[:host] <> "/" <> cfg[:bucket]
  end

  defp raw_delete_file(file) do
    config()[:bucket]
    |> ExAws.S3.delete_object(file)
    |> ExAws.request
  end

  defp extract_object_name(file) do
    file
    |> String.replace( ~r/^#{bucket_url_prefix()}/i, "")
    |> URI.decode
  end

end
