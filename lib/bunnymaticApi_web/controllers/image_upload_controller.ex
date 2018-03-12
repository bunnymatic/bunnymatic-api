 defmodule BunnymaticApiWeb.ImageUploadController do
  use BunnymaticApiWeb, :controller
  use ExTus.Controller

  import Inspector

  def on_begin_upload(file_info) do
    file_info |> inspector("on_begin_upload")
  end

  def on_complete_upload(file_info) do
    file_info |> inspector("on_completed_upload")
  end
end
