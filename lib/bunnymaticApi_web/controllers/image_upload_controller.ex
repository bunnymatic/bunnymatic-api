 defmodule BunnymaticApiWeb.ImageUploadController do
  use BunnymaticApiWeb, :controller
  use ExTus.Controller

  def on_begin_upload(file_info) do
    file_info |> IO.inspect(label: "on_begin_upload")
  end

  def on_complete_upload(file_info) do
    file_info |> IO.inspect(label: "on_completed_upload")
  end
end
